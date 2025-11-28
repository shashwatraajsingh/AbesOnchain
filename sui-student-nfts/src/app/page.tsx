"use client";

import { NFT_TYPES } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { ConnectButton } from "@mysten/dapp-kit";
import { ContractStatus } from "@/components/ContractStatus";
import {
  IdCard,
  Ticket,
  FileBarChart,
  Wind,
  AlertTriangle,
  Zap,
  Cpu,
  Globe,
  Scan
} from "lucide-react";

const iconMap: Record<string, any> = {
  "id-card": IdCard,
  "ticket": Ticket,
  "file-bar-chart": FileBarChart,
  "wind": Wind,
  "alert-triangle": AlertTriangle,
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#050505] text-white selection:bg-cyan-500/30">

      {/* Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] animate-scanline bg-gradient-to-b from-transparent via-white to-transparent h-[20%]" />

      <header className="w-full max-w-7xl px-8 py-6 flex justify-between items-center relative z-20 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-lg group-hover:bg-cyan-500/40 transition-all duration-500" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sui-logo.png" alt="Sui Logo" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-wider font-mono">
              SUI<span className="text-cyan-400">CAMPUS</span>
            </h1>
            <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase">Testnet V2.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-cyan-500/60 bg-cyan-950/20 px-3 py-1 rounded-full border border-cyan-900/50">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            SYSTEM ONLINE
          </div>
          <ConnectButton />
        </div>
      </header>

      <ContractStatus />

      <div className="relative z-10 w-full max-w-7xl px-8 pt-20 pb-32">

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-40 h-40 mb-12 animate-float"
          >
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sui-logo.png" alt="Sui Logo" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(6,182,212,0.6)]" />

            {/* Orbiting Elements */}
            <div className="absolute inset-[-20%] border border-cyan-500/30 rounded-full w-[140%] h-[140%] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-[-40%] border border-dashed border-white/10 rounded-full w-[180%] h-[180%] animate-[spin_20s_linear_infinite_reverse]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
          >
            MINT YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">DIGITAL LEGACY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-2xl mx-auto font-light tracking-wide"
          >
            Establish your on-chain student identity. Verifiable. Immutable. <span className="text-cyan-400">Forever.</span>
          </motion.p>

          {/* Stats / HUD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-8"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-mono text-white">0.4s</span>
              <span className="text-xs text-white/40 uppercase tracking-widest mt-1">Latency</span>
            </div>
            <div className="flex flex-col items-center border-l border-r border-white/10 px-12">
              <span className="text-2xl font-bold font-mono text-cyan-400">100%</span>
              <span className="text-xs text-white/40 uppercase tracking-widest mt-1">Uptime</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-mono text-white">&lt;0.01</span>
              <span className="text-xs text-white/40 uppercase tracking-widest mt-1">Gas Fees</span>
            </div>
          </motion.div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {NFT_TYPES.map((nft, index) => {
            const Icon = iconMap[nft.icon];
            return (
              <Link href={`/mint/${nft.id}`} key={nft.id}>
                <motion.div
                  initial={{ opacity: 0, rotateX: 20, y: 50 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, translateY: -10 }}
                  className="group relative h-full bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-1 overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full bg-[#0A0A0A] rounded-[20px] p-8 flex flex-col z-10 overflow-hidden">
                    {/* Decorative HUD Elements */}
                    <div className="absolute top-4 right-4 flex gap-1">
                      <div className="w-1 h-1 bg-white/20 rounded-full" />
                      <div className="w-1 h-1 bg-white/20 rounded-full" />
                      <div className="w-1 h-1 bg-white/20 rounded-full" />
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon className="w-7 h-7 text-white/90 relative z-10" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white font-sans tracking-tight group-hover:text-cyan-400 transition-colors">
                      {nft.title}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed mb-8">
                      {nft.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                      <span className="text-xs font-mono text-cyan-500/70 bg-cyan-950/30 px-2 py-1 rounded">
                        MINT_READY
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                        <Scan className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 relative z-10 bg-black/20 backdrop-blur-lg mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sui-logo.png" alt="Sui Logo" className="w-6 h-6 object-contain grayscale" />
            <span className="text-sm font-mono">POWERED BY SUI</span>
          </div>
          <div className="text-xs text-white/30 font-mono">
            BLOCK: #93284 • TPS: 5000+ • EPOCH: 420
          </div>
        </div>
      </footer>
    </main>
  );
}
