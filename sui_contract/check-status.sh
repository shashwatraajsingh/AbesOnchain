#!/bin/bash

echo "🔍 Checking Sui Development Environment Status"
echo "=============================================="
echo ""

# Check Sui CLI
if command -v sui &> /dev/null; then
    echo "✅ Sui CLI installed: $(sui --version)"
    
    # Check active address
    if sui client active-address &> /dev/null 2>&1; then
        echo "✅ Wallet configured"
        echo "   Address: $(sui client active-address 2>/dev/null || echo 'Not configured')"
    else
        echo "⚠️  Wallet not configured - run 'sui client' to set up"
    fi
else
    echo "❌ Sui CLI not installed or not in PATH"
    echo "   Installation may still be in progress..."
fi

echo ""

# Check if contract is deployed
PACKAGE_ID=$(grep "PACKAGE_ID" ../sui-student-nfts/src/utils/contract.ts 2>/dev/null | grep -o '"0x[^"]*"' | tr -d '"')

if [ "$PACKAGE_ID" == "0x0" ]; then
    echo "❌ Contract not deployed"
    echo "   Run './deploy.sh' to deploy"
else
    echo "✅ Contract deployed"
    echo "   Package ID: $PACKAGE_ID"
fi

echo ""

# Check frontend
if [ -d "../sui-student-nfts/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependencies missing"
    echo "   Run 'npm install' in sui-student-nfts/"
fi

echo ""
echo "=============================================="

if command -v sui &> /dev/null && [ "$PACKAGE_ID" != "0x0" ]; then
    echo "🎉 Ready to use! Start the frontend with:"
    echo "   cd ../sui-student-nfts && npm run dev"
else
    echo "⏳ Setup incomplete. See steps above."
fi

echo ""
