import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_STEPS = [
    { threshold: 0, text: 'INITIALIZING SECURE ENVIRONMENT' },
    { threshold: 25, text: 'CONFIGURING FULL-STACK RUNTIME' },
    { threshold: 50, text: 'LOADING NEURAL & SECURITY MATRIX' },
    { threshold: 75, text: 'DECRYPTING PORTFOLIO ASSETS' },
    { threshold: 95, text: 'SYSTEM READY • WELCOME' },
];

function IslamicIntro({ onComplete, duration = 3.0 }) {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        const start = Date.now();
        const totalDurationMs = duration * 1000;

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min(100, Math.floor((elapsed / totalDurationMs) * 100));
            setProgress(pct);

            const currentStep = [...STATUS_STEPS].reverse().find(s => pct >= s.threshold);
            if (currentStep) {
                setStatusIndex(STATUS_STEPS.indexOf(currentStep));
            }

            if (pct >= 100) {
                clearInterval(interval);
                setTimeout(onComplete, 350);
            }
        }, 25);

        const handleKeyDown = (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                clearInterval(interval);
                onComplete();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(interval);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [duration, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-between py-10 sm:py-12 px-6 overflow-hidden bg-black text-white select-none cursor-pointer"
            onClick={onComplete}
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.03,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }}
        >
            {/* ── Background Obsidian Lights ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/[0.08] rounded-full blur-[160px]" />
                <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-rose-950/[0.08] rounded-full blur-[140px]" />
                <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-rose-900/[0.06] rounded-full blur-[140px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            </div>

            {/* ── Top Bar: Telemetry & Controls ── */}
            <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]" />
                    <span className="tracking-widest uppercase text-slate-200 font-semibold">MD MAHABUBUR RAHMAN</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-slate-400">
                    <span className="text-white/20">•</span>
                    <span className="tracking-wider uppercase">PORTFOLIO INITIALIZATION</span>
                    <span className="text-white/20">•</span>
                    <span className="text-rose-400 font-bold">2024–2026</span>
                </div>
                <div className="text-[10px] tracking-widest text-slate-300 uppercase bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors">
                    CLICK TO ENTER
                </div>
            </div>

            {/* ── Center Content: Monogram + Crystal-Clear Bismillah + Titles ── */}
            <div className="relative flex flex-col items-center text-center my-auto z-10 max-w-4xl px-4">

                {/* Orbiting Monogram Emblem */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 mb-8 flex items-center justify-center"
                >
                    {/* Outer Dashed Orbit Ring */}
                    <div
                        className="absolute inset-0 rounded-full border border-dashed border-rose-500/40 animate-spin"
                        style={{ animationDuration: '18s', animationTimingFunction: 'linear' }}
                    />
                    {/* Inner Rotating Ring */}
                    <div
                        className="absolute -inset-3 rounded-full border border-white/15 animate-spin"
                        style={{ animationDuration: '28s', animationDirection: 'reverse', animationTimingFunction: 'linear' }}
                    />

                    {/* Central Obsidian Glass Badge */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#090a10] border border-rose-500/50 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(244,63,94,0.25)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-rose-500/10 to-transparent" />
                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                            MR<span className="text-rose-500">.</span>
                        </span>
                        <span className="text-[8px] font-mono tracking-widest text-rose-300 -mt-0.5 uppercase font-semibold">
                            TECH & SEC
                        </span>
                    </div>
                </motion.div>

                {/* 100% Crystal-Clear, High-Definition Bismillah Calligraphy */}
                <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full mb-6"
                >
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
                        <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-rose-500/60" />
                        <span className="text-rose-400 text-xs">✦</span>
                        <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-rose-500/60" />
                    </div>

                    {/* Crisp, Sharp Arabic Calligraphy Text */}
                    <h2
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-normal leading-[1.6] py-1 select-text drop-shadow-[0_4px_25px_rgba(255,255,255,0.35)]"
                        style={{
                            fontFamily: "'Amiri', 'Noto Naskh Arabic', 'Scheherazade New', serif",
                            textRendering: 'optimizeLegibility',
                        }}
                    >
                        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </h2>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
                        <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-rose-500/60" />
                        <span className="text-rose-400 text-xs">✦</span>
                        <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-rose-500/60" />
                    </div>
                </motion.div>

                {/* Name & Role Subtitles */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="space-y-1.5"
                >
                    <h1 className="text-base sm:text-lg md:text-xl font-black tracking-[0.25em] text-white uppercase font-mono">
                        MD MAHABUBUR RAHMAN
                    </h1>
                    <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-rose-400 uppercase font-medium">
                        Full-Stack Developer • Cybersecurity Specialist • ML Engineer
                    </p>
                </motion.div>
            </div>

            {/* ── Bottom Section: Precision Progress Bar & Telemetry Status ── */}
            <div className="w-full max-w-md flex flex-col items-center gap-3 relative z-10">

                {/* Dynamic Status Step */}
                <div className="h-5 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={STATUS_STEPS[statusIndex].text}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.18 }}
                            className="text-xs font-mono tracking-widest text-slate-300 uppercase flex items-center gap-2 font-medium"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            {STATUS_STEPS[statusIndex].text}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-full flex items-center gap-3">
                    <div className="flex-1 h-[4px] rounded-full bg-white/10 overflow-hidden relative">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 shadow-[0_0_15px_#f43f5e]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <span className="text-xs font-mono font-bold text-rose-400 w-12 text-right">
                        {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : '100'}%
                    </span>
                </div>

                {/* Keyboard & Click hint */}
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200 border border-white/10 font-bold">Space</kbd> or click anywhere to enter
                </span>
            </div>
        </motion.div>
    );
}

export default IslamicIntro;
