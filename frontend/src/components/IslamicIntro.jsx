import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import IslamicPattern from './IslamicPattern';

const BISMILLAH_WORDS = ['بِسْمِ', 'اللَّهِ', 'الرَّحْمَٰنِ', 'الرَّحِيمِ'];

function TwinkleStar({ className = '', style = {}, delay = 0, duration = 3 }) {
    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            style={style}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1, 0], scale: [0, 1, 0.8, 1, 0] }}
            transition={{ delay, duration, repeat: Infinity, ease: 'easeInOut' }}
        >
            <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-amber-300"
                fill="currentColor"
                style={{ filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.6))' }}
            >
                <polygon points="12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10" />
            </svg>
        </motion.div>
    );
}

function MosqueArch({ className = '' }) {
    return (
        <svg viewBox="0 0 100 70" className={className} fill="currentColor" aria-hidden="true">
            <path d="M10 70 V42 C10 22 38 10 50 10 C62 10 90 22 90 42 V70 Z" />
            <path d="M24 70 V44 C24 30 40 22 50 22 C60 22 76 30 76 44 V70 Z" opacity="0.35" />
        </svg>
    );
}

function IslamicIntro({ onComplete, duration = 4.2 }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const start = Date.now();
        const tick = setInterval(() => {
            const pct = Math.min(100, ((Date.now() - start) / (duration * 1000)) * 100);
            setProgress(pct);
            if (pct >= 100) {
                clearInterval(tick);
                setTimeout(onComplete, 500);
            }
        }, 30);
        return () => clearInterval(tick);
    }, [duration, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
            style={{
                background: 'radial-gradient(1200px 800px at 50% 40%, #1b1030 0%, #0a0e1a 55%, #05070f 100%)',
            }}
            onClick={onComplete}
            exit={{
                opacity: 0,
                scale: 1.06,
                filter: 'blur(8px)',
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            }}
        >
            {/* Girih pattern overlay */}
            <div className="absolute inset-0 text-white opacity-[0.05] pointer-events-none">
                <IslamicPattern strokeWidth={1} />
            </div>

            {/* Ambience orbs */}
            <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-24 w-[420px] h-[420px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

            {/* Floating crescent moon & star */}
            <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.7 }}
                animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
                transition={{
                    opacity: { delay: 0.5, duration: 0.6 },
                    scale: { delay: 0.5, duration: 0.6 },
                    y: { delay: 1.5, duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute top-[12%] right-[12%] sm:right-[18%] text-amber-300/90 pointer-events-none"
                style={{ filter: 'drop-shadow(0 0 16px rgba(251,191,36,0.45))' }}
            >
                <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-14 sm:h-14" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                </svg>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute top-[20%] right-[19%] sm:right-[24.5%] text-amber-200 pointer-events-none"
                style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.6))' }}
            >
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" aria-hidden="true">
                    <polygon points="12,0 14.5,9.5 24,12 14.5,14.5 12,24 9.5,14.5 0,12 9.5,9.5" />
                </svg>
            </motion.div>

            {/* Twinkling 8-pointed stars */}
            <TwinkleStar className="w-4 h-4" style={{ top: '18%', left: '16%' }} delay={0.9} duration={3.2} />
            <TwinkleStar className="w-3 h-3" style={{ top: '32%', left: '8%' }} delay={1.4} duration={4} />
            <TwinkleStar className="w-3 h-3" style={{ top: '24%', right: '8%' }} delay={1.7} duration={3.5} />
            <TwinkleStar className="w-4 h-4" style={{ top: '42%', right: '16%' }} delay={1.1} duration={4.5} />
            <TwinkleStar className="w-2.5 h-2.5" style={{ bottom: '28%', left: '12%' }} delay={1.9} duration={3.8} />
            <TwinkleStar className="w-3 h-3" style={{ bottom: '24%', right: '10%' }} delay={1.3} duration={4.2} />

            {/* Center content */}
            <div className="relative flex flex-col items-center px-6 text-center pointer-events-none">

                {/* Star + orbit rings */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-8">
                    <div
                        className="absolute inset-0 rounded-full border border-dashed border-amber-400/30 animate-spin"
                        style={{ animationDuration: '18s', animationDirection: 'normal' }}
                    />
                    <div
                        className="absolute -inset-4 rounded-full border border-purple-400/20 animate-spin"
                        style={{ animationDuration: '26s', animationDirection: 'reverse' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <svg
                            viewBox="0 0 40 40"
                            className="w-full h-full"
                            style={{ filter: 'drop-shadow(0 0 18px rgba(251,191,36,0.45))' }}
                        >
                            <defs>
                                <linearGradient id="introStarGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                            <polygon
                                points="20,3 25,15 37,20 25,25 20,37 15,25 3,20 15,15"
                                fill="none"
                                stroke="url(#introStarGrad)"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                            />
                            <polygon
                                points="20,9 23.5,16.5 31,20 23.5,23.5 20,31 16.5,23.5 9,20 16.5,16.5"
                                fill="rgba(251,191,36,0.12)"
                                stroke="rgba(251,191,36,0.5)"
                                strokeWidth="1"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Bismillah — staggered words */}
                <div dir="rtl" lang="ar" className="font-arabic leading-relaxed mb-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                        {BISMILLAH_WORDS.map((word, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.6 + idx * 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-200"
                                style={{ textShadow: '0 0 30px rgba(251,191,36,0.35)' }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.6, ease: 'easeOut' }}
                    className="w-40 sm:w-56 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mb-5"
                />

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.1, duration: 0.6, ease: 'easeOut' }}
                >
                    <div dir="rtl" lang="ar" className="flex items-center justify-center gap-3 text-amber-300/80 mb-1">
                        <span className="text-[10px]">✦</span>
                        <span className="text-xs">۞</span>
                        <span className="text-[10px]">✦</span>
                    </div>
                    <p dir="rtl" lang="ar" className="font-arabic text-xl sm:text-2xl text-white mb-1">
                        مَحْبُوب
                    </p>
                    <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-white/40">
                        MD Mahabubur Rahman
                    </p>
                </motion.div>
            </div>

            {/* Mosque arch skyline */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.9, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 sm:gap-5 text-amber-300 pointer-events-none"
                style={{ filter: 'drop-shadow(0 -4px 24px rgba(251,191,36,0.12))' }}
            >
                <div className="w-16 sm:w-24 opacity-[0.12]"><MosqueArch className="w-full h-full" /></div>
                <div className="w-24 sm:w-40 opacity-[0.2]"><MosqueArch className="w-full h-full" /></div>
                <div className="w-16 sm:w-24 opacity-[0.12]"><MosqueArch className="w-full h-full" /></div>
            </motion.div>

            {/* Bottom: welcome + progress */}
            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-6 pointer-events-none">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-amber-200/80 text-sm"
                >
                    أَهْلًا وَسَهْلًا
                </motion.p>

                <div className="w-56 sm:w-72 h-[3px] rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #f97316, #a855f7, #fbbf24)',
                        }}
                    />
                </div>

                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                    {Math.round(progress)}%
                </p>
            </div>
        </motion.div>
    );
}

export default IslamicIntro;
