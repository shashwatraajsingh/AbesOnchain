"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Download, ArrowLeft, Share2, Sparkles, Fingerprint, ScanLine } from "lucide-react";
import { NFTConfig } from "@/types";
import { motion } from "framer-motion";

interface GeneratedCardProps {
    type: string;
    data: any;
    txDigest: string;
    config: NFTConfig;
    onBack: () => void;
}

export function GeneratedCard({ type, data, txDigest, config, onBack }: GeneratedCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);


    const handleDownload = async () => {
        if (!cardRef.current) return;

        setIsDownloading(true);
        try {
            // Ensure all images are loaded
            const images = cardRef.current.querySelectorAll('img');
            await Promise.all(
                Array.from(images).map(img => {
                    if (img.complete) return Promise.resolve<void>(undefined);
                    return new Promise<void>((resolve, reject) => {
                        img.onload = () => resolve();
                        img.onerror = reject;
                        // Timeout after 5 seconds
                        setTimeout(() => resolve(), 5000);
                    });
                })
            );

            // Wait for fonts and animations to settle
            await new Promise(resolve => setTimeout(resolve, 1000));

            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: true,
                imageTimeout: 15000,
                onclone: (clonedDoc) => {
                    const element = clonedDoc.getElementById('nft-card-capture');
                    if (element) {
                        element.style.transform = 'none';
                    }
                }
            });

            // Convert to blob for better download handling
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.download = `SuiNFT-${type}-${Date.now().toString().slice(-6)}.png`;
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    setIsDownloading(false);
                } else {
                    throw new Error('Failed to create blob');
                }
            }, 'image/png', 1.0);
        } catch (err) {
            console.error("Download failed:", err);
            alert(`Failed to download card: ${err instanceof Error ? err.message : 'Unknown error'}\n\nTry taking a screenshot instead.`);
            setIsDownloading(false);
        }
    };

    // Dynamic gradient based on type
    const getTheme = () => {
        switch (type) {
            case "id_card": return { bg: "from-cyan-500/20 to-blue-600/20", border: "border-cyan-400/30", glow: "shadow-cyan-500/20", accent: "bg-cyan-400" };
            case "event_pass": return { bg: "from-fuchsia-500/20 to-purple-600/20", border: "border-fuchsia-400/30", glow: "shadow-fuchsia-500/20", accent: "bg-fuchsia-400" };
            case "attendance_report": return { bg: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-400/30", glow: "shadow-emerald-500/20", accent: "bg-emerald-400" };
            case "bunk_pass": return { bg: "from-amber-500/20 to-orange-600/20", border: "border-amber-400/30", glow: "shadow-amber-500/20", accent: "bg-amber-400" };
            case "hostel_complaint": return { bg: "from-rose-500/20 to-red-600/20", border: "border-rose-400/30", glow: "shadow-rose-500/20", accent: "bg-rose-400" };
            default: return { bg: "from-gray-500/20 to-slate-600/20", border: "border-gray-400/30", glow: "shadow-gray-500/20", accent: "bg-gray-400" };
        }
    };

    const theme = getTheme();

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white backdrop-blur-md border border-white/10"
                >
                    <ArrowLeft className="w-4 h-4" /> Mint Another
                </button>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-medium shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50"
                >
                    {isDownloading ? (
                        <span className="animate-pulse">Generating...</span>
                    ) : (
                        <>
                            <Download className="w-4 h-4" /> Download Card
                        </>
                    )}
                </button>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative group perspective-1000"
            >
                {/* Card Container */}
                <div
                    id="nft-card-capture"
                    ref={cardRef}
                    className={`
                        relative w-[420px] h-[640px] rounded-[40px] overflow-hidden 
                        bg-gradient-to-br ${theme.bg} 
                        backdrop-blur-2xl border ${theme.border}
                        shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)]
                        ${theme.glow}
                    `}
                >
                    {/* Nano Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
                    </div>

                    {/* Holographic Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none" />

                    {/* Neon Accent Line */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] ${theme.accent} shadow-[0_0_20px_2px_currentColor]`} />

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col justify-between z-10">

                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`w-2 h-2 rounded-full ${theme.accent} animate-pulse`} />
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">Sui Network</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-tight font-sans">{config.title}</h2>
                            </div>
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md overflow-hidden p-2`}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/sui-logo.png" alt="Sui Logo" className="w-full h-full object-contain opacity-90" />
                                </div>
                                <div className={`absolute -inset-2 ${theme.accent} opacity-20 blur-xl rounded-full`} />
                            </div>
                        </div>

                        {/* Holographic Badge */}
                        <div className="absolute top-32 right-[-20px] opacity-20 rotate-12 pointer-events-none">
                            <Fingerprint className="w-48 h-48 text-white" />
                        </div>

                        {/* Body Fields */}
                        <div className="space-y-5 my-auto relative">
                            {config.fields.map((field, i) => (
                                <div key={field.name} className="relative group/field">
                                    <div className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover/field:opacity-100 transition-opacity" />
                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                                        {field.label}
                                    </p>
                                    <p className="text-xl font-medium text-white/90 break-words font-mono tracking-tight">
                                        {data[field.name]}
                                    </p>
                                    {i < config.fields.length - 1 && (
                                        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent mt-4" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="pt-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className={`px-2 py-1 rounded text-[10px] font-bold bg-white/10 border border-white/5 text-white/70`}>
                                        VERIFIED
                                    </div>
                                    <div className="text-[10px] text-white/40 font-mono">
                                        #{Date.now().toString().slice(-4)}
                                    </div>
                                </div>
                                <ScanLine className="w-5 h-5 text-white/30" />
                            </div>

                            {/* Glass Transaction Box */}
                            <div className="relative overflow-hidden rounded-xl bg-black/40 border border-white/10 p-4 backdrop-blur-md group-hover:border-white/20 transition-colors">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.accent}`} />
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-[9px] text-white/40 uppercase tracking-widest">Transaction Hash</p>
                                    <div className={`w-1.5 h-1.5 rounded-full ${theme.accent}`} />
                                </div>
                                <p className="text-[10px] text-white/70 font-mono break-all leading-relaxed opacity-80">
                                    {txDigest}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
