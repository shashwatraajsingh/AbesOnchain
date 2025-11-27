#!/bin/bash

# Sui Smart Contract Deployment Script for Student NFTs

set -e

echo "🚀 Starting Sui Contract Deployment..."
echo ""

# Check if Sui CLI is installed
if ! command -v sui &> /dev/null; then
    echo "❌ Sui CLI is not installed or not in PATH"
    echo "Please wait for the installation to complete or install manually:"
    echo "cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui"
    exit 1
fi

echo "✅ Sui CLI found: $(sui --version)"
echo ""

# Navigate to contract directory
cd "$(dirname "$0")"

# Check if wallet is configured
if ! sui client active-address &> /dev/null; then
    echo "🔧 No active Sui wallet found. Initializing..."
    sui client
fi

echo ""
echo "📍 Active Address: $(sui client active-address)"
echo ""

# Request testnet tokens
echo "💰 Requesting testnet SUI tokens from faucet..."
sui client faucet || echo "⚠️  Faucet request may have failed. Continuing..."
echo ""

# Build the contract
echo "🔨 Building the contract..."
sui move build
echo ""

# Publish the contract
echo "📤 Publishing to Sui Testnet..."
PUBLISH_OUTPUT=$(sui client publish --gas-budget 100000000 --json)

# Extract Package ID
PACKAGE_ID=$(echo $PUBLISH_OUTPUT | jq -r '.objectChanges[] | select(.type == "published") | .packageId')

if [ -z "$PACKAGE_ID" ] || [ "$PACKAGE_ID" == "null" ]; then
    echo "❌ Failed to extract Package ID"
    echo "Full output:"
    echo "$PUBLISH_OUTPUT"
    exit 1
fi

echo ""
echo "✅ Contract deployed successfully!"
echo ""
echo "📦 Package ID: $PACKAGE_ID"
echo ""

# Update the frontend config file
FRONTEND_CONFIG="../sui-student-nfts/src/utils/contract.ts"

if [ -f "$FRONTEND_CONFIG" ]; then
    echo "🔧 Updating frontend configuration..."
    sed -i "s/export const PACKAGE_ID = \"0x0\"/export const PACKAGE_ID = \"$PACKAGE_ID\"/" "$FRONTEND_CONFIG"
    echo "✅ Frontend configuration updated!"
    echo ""
    echo "🎉 Deployment complete! You can now use the dApp."
    echo ""
    echo "Next steps:"
    echo "1. The frontend is already running at http://localhost:3000"
    echo "2. Connect your Sui wallet"
    echo "3. Start minting NFTs!"
else
    echo "⚠️  Frontend config not found at $FRONTEND_CONFIG"
    echo "Please manually update PACKAGE_ID to: $PACKAGE_ID"
fi

echo ""
echo "📝 Transaction Explorer:"
echo "https://testnet.suivision.xyz/package/$PACKAGE_ID"
