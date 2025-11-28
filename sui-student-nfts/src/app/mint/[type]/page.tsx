"use client";

import { NFT_TYPES } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { PACKAGE_ID, MODULE_NAME } from "@/utils/contract";
import { GeneratedCard } from "@/components/GeneratedCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MintPage() {
    const params = useParams();
    const type = params.type as string;
    const config = NFT_TYPES.find((t) => t.id === type);
    const account = useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isMinting, setIsMinting] = useState(false);
    const [mintedData, setMintedData] = useState<any>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    if (!config) return <div>Not Found</div>;

    const handleMint = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!account) {
            alert("Please connect your Sui wallet to mint NFTs");
            return;
        }



        setIsMinting(true);

        try {
            const txb = new Transaction();
            const args = config.fields.map(field => txb.pure.string(formData[field.name] || ""));

            // Function name mapping
            const functionName = `mint_${type}`; // e.g., mint_id_card

            txb.moveCall({
                target: `${PACKAGE_ID}::${MODULE_NAME}::${functionName}`,
                arguments: args,
            });

            signAndExecuteTransaction(
                {
                    transaction: txb,
                },
                {
                    onSuccess: (result) => {
                        console.log("Minted successfully", result);
                        setTxDigest(result.digest);
                        setMintedData(formData);
                        setIsMinting(false);
                    },
                    onError: (err) => {
                        console.error("Minting error:", err);
                        setIsMinting(false);
                        alert(`Minting failed: ${err.message || 'Unknown error'}`);
                    },
                }
            );
        } catch (e: any) {
            console.error("Transaction error:", e);
            setIsMinting(false);
            alert(`Transaction failed: ${e.message || 'Unknown error'}`);
        }
    };

    if (mintedData && txDigest) {
        return (
            <div className="min-h-screen p-8 flex flex-col items-center justify-center">
                <GeneratedCard
                    type={type}
                    data={mintedData}
                    txDigest={txDigest}
                    config={config}
                    onBack={() => {
                        setMintedData(null);
                        setTxDigest(null);
                        setFormData({});
                    }}
                />
            </div>
        );
    }

    return (
        <main className="min-h-screen p-8 lg:p-24 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 rounded-3xl"
                >
                    <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
                    <p className="text-white/60 mb-8">{config.description}</p>

                    <form onSubmit={handleMint} className="space-y-6">
                        {config.fields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-white/80 mb-2">
                                    {field.label}
                                </label>
                                {field.type === "select" ? (
                                    <select
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options?.map(opt => (
                                            <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        required
                                        placeholder={field.placeholder}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    />
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={isMinting}
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isMinting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Minting...
                                </>
                            ) : (
                                "Mint NFT"
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
