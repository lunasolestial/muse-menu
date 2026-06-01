'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

// ── Muse Reveal → Black Page Pull ─────────────────────────────────────────
// Scroll-linked reveal:
//   0%:   only hands + MENU visible at bottom of viewport
//   25%:  arms + partial torso
//   60%:  torso + draping
//   100%: full Muse revealed
// At ~90%: black curtain rises, covering the screen, then content loads under it.

export default function MuseRevealHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Clip-path: expand from bottom (0%) to full reveal (100%)
  // clipPath inset-bottom goes from 85% (show only hands) → 0% (fully revealed)
  const clipInset = useTransform(scrollYProgress, [0, 1], ['85%', '0%'])
  const clipPath  = useTransform(clipInset, (v) => `inset(${v} 0% 0% 0%)`)

  // Curtain: rises from below at 85% scroll progress
  const curtainY = useTransform(scrollYProgress, [0.82, 1], ['100%', '0%'])

  // Gold glint on MENU rect at 88% scroll
  const glintOpacity = useTransform(scrollYProgress, [0.85, 0.88, 0.92], [0, 1, 0])

  // Content fade in after curtain clears
  const contentOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1])

  return (
    <div ref={containerRef} className="relative h-[400vh]">

      {/* ── Sticky scroll stage ──────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-carbon grain">

        {/* ── Muse figure — masked reveal ─────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center"
          style={{ clipPath }}
        >
          {/* Placeholder for the actual Muse image — replace src with final asset */}
          {/* [TODO: replace with real Muse emblem illustration] */}
          <div
            className="relative w-[420px] h-[680px] flex flex-col items-center justify-end pb-0"
            aria-hidden="true"
          >
            {/* Muse silhouette placeholder — styled as a dark standing figure */}
            <div className="absolute inset-0 flex flex-col items-center justify-end">
              {/* Body draping */}
              <div
                className="w-48 h-[520px] rounded-t-full opacity-90"
                style={{
                  background: 'linear-gradient(180deg, #1a0d24 0%, #0d0810 60%, #07080A 100%)',
                  boxShadow: '0 0 80px rgba(42, 22, 54, 0.4)',
                }}
              />
              {/* Arms extended — holding menu */}
              <div className="absolute bottom-20 w-72 flex justify-between items-end">
                <div
                  className="w-16 h-32 rounded-b-full"
                  style={{ background: 'linear-gradient(180deg, #1a0d24, #0d0810)', transform: 'rotate(25deg)', transformOrigin: 'top center' }}
                />
                <div
                  className="w-16 h-32 rounded-b-full"
                  style={{ background: 'linear-gradient(180deg, #1a0d24, #0d0810)', transform: 'rotate(-25deg)', transformOrigin: 'top center' }}
                />
              </div>
            </div>

            {/* MENU card — held between hands */}
            <div className="relative z-10 mb-2">
              <div
                className="w-40 h-52 border border-antique-gold/40 flex flex-col items-center justify-center gap-3"
                style={{ background: 'rgba(10, 8, 12, 0.95)' }}
              >
                {/* Gold glint sweep across the MENU */}
                <motion.div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ opacity: glintOpacity }}
                >
                  <div
                    className="absolute inset-y-0 w-12 -skew-x-12"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
                  />
                </motion.div>

                <div className="w-8 h-px bg-antique-gold/40" />
                <span className="font-serif text-xs tracking-[0.3em] uppercase text-antique-gold/70">Menu</span>
                <div className="space-y-1 text-center">
                  {['—', '—', '—', '—', '—'].map((_, i) => (
                    <div key={i} className="w-20 h-px bg-bone/10 mx-auto" />
                  ))}
                </div>
                <div className="w-8 h-px bg-antique-gold/40" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Ambient vignette ────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 100%, transparent 30%, #07080A 85%)',
          }}
        />

        {/* ── Initial copy — visible before scroll ────────────────────────── */}
        <motion.div
          className="absolute top-1/3 inset-x-0 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        >
          <p className="font-serif text-sm italic text-ash tracking-widest">
            Scroll to be received
          </p>
          <div className="w-px h-8 bg-antique-gold/30 animate-pulse" />
        </motion.div>

        {/* ── Black curtain overlay ────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0 bg-carbon z-20 pointer-events-none"
          style={{ y: curtainY }}
        />

        {/* ── Content that loads under the curtain ────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-10 px-6 pointer-events-none"
          style={{ opacity: contentOpacity }}
        >
          <div className="text-center max-w-2xl space-y-6">
            <p className="font-serif text-display text-bone leading-none font-light">
              Muse &amp; Menu<br />
              <em className="text-antique-gold/80">Society</em>
            </p>
            <p className="text-body text-ash max-w-md mx-auto leading-relaxed">
              {/* [TODO: refine with internal Muse & Menu copy] */}
              A private, reservation-only supper society convened around
              intentional hospitality — where the room is curated, the table composed,
              and every detail deliberate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
              <Link
                href="/membership"
                className="text-caption tracking-widest uppercase border border-antique-gold/30 text-bone px-8 py-3 hover:border-antique-gold/60 hover:text-porcelain transition-all"
              >
                Request Consideration
              </Link>
              <Link
                href="/about"
                className="text-caption tracking-widest uppercase text-ash hover:text-bone transition-colors underline underline-offset-4 decoration-antique-gold/20"
              >
                Learn more
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
