'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const SERIF = 'var(--font-cormorant), Georgia, serif'
const CAPS  = 'var(--font-cinzel), "Trajan Pro", serif'
const SANS  = 'var(--font-dm-sans), system-ui, sans-serif'

// ── Classical gallery niche — gold linework + concave depth illusion ──────────
function ArchFrame({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 'clamp(0px, 1vh, 16px)',
        left: '50%',
        x: '-50%',
        width: 'clamp(280px, 32vw, 440px)',
        height: 'clamp(500px, 86vh, 800px)',
        pointerEvents: 'none',
        zIndex: 5,
        opacity,
      }}
    >
      <svg viewBox="0 0 440 800" width="100%" height="100%" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          {/* Back wall of the niche — plum-dark, lit softly at top-center */}
          <radialGradient id="nicheWall" cx="50%" cy="38%" r="55%" gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="0" y2="800">
            <stop offset="0%"   stopColor="rgba(32,10,52,0.60)" />
            <stop offset="50%"  stopColor="rgba(16,6,28,0.40)" />
            <stop offset="100%" stopColor="rgba(5,3,10,0.0)" />
          </radialGradient>
          {/* Downward spotlight inside the arch */}
          <linearGradient id="archBeam" x1="220" y1="0" x2="220" y2="480"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(214,163,74,0.07)" />
            <stop offset="60%"  stopColor="rgba(214,163,74,0.02)" />
            <stop offset="100%" stopColor="rgba(214,163,74,0)" />
          </linearGradient>
          {/* Left wall shadow — creates side-wall depth */}
          <linearGradient id="wallL" x1="42" y1="0" x2="120" y2="0"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.52)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          {/* Right wall shadow */}
          <linearGradient id="wallR" x1="398" y1="0" x2="320" y2="0"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.52)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          {/* Soft glow behind the gold lines */}
          <filter id="lineGlow" x="-20%" y="-10%" width="140%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Clip to interior arch shape */}
          <clipPath id="archInterior">
            <path d="M 42 800 L 42 238 A 178 178 0 0 1 398 238 L 398 800 Z" />
          </clipPath>
        </defs>

        {/* ── Interior fills ── */}
        {/* Back wall */}
        <rect x="0" y="0" width="440" height="800"
          fill="url(#nicheWall)" clipPath="url(#archInterior)" />
        {/* Downward beam */}
        <rect x="0" y="0" width="440" height="480"
          fill="url(#archBeam)" clipPath="url(#archInterior)" />
        {/* Left wall depth */}
        <rect x="42" y="238" width="78" height="562"
          fill="url(#wallL)" clipPath="url(#archInterior)" />
        {/* Right wall depth */}
        <rect x="320" y="238" width="78" height="562"
          fill="url(#wallR)" clipPath="url(#archInterior)" />

        {/* ── Soft glow halo behind outer arch ── */}
        <path
          d="M 20 800 L 20 220 A 200 200 0 0 1 420 220 L 420 800"
          stroke="rgba(214,163,74,0.28)" strokeWidth="9"
          filter="url(#lineGlow)"
        />

        {/* ── Outer arch — principal frame ── */}
        <path
          d="M 20 800 L 20 220 A 200 200 0 0 1 420 220 L 420 800"
          stroke="rgba(214,163,74,0.62)" strokeWidth="1.6"
        />

        {/* ── Inner arch — secondary depth line ── */}
        <path
          d="M 42 800 L 42 238 A 178 178 0 0 1 398 238 L 398 800"
          stroke="rgba(214,163,74,0.20)" strokeWidth="1.0"
        />

        {/* ── Keystone ── */}
        <circle cx="220" cy="14"  r="6.5" stroke="rgba(214,163,74,0.58)" strokeWidth="1.2" />
        <circle cx="220" cy="14"  r="2.8" fill="rgba(214,163,74,0.32)" />
        <line x1="220" y1="20.5" x2="220" y2="40" stroke="rgba(214,163,74,0.38)" strokeWidth="0.9" />

        {/* ── Spring tick marks ── */}
        <line x1="4"   y1="220" x2="26"  y2="220" stroke="rgba(214,163,74,0.32)" strokeWidth="1.0" />
        <line x1="414" y1="220" x2="436" y2="220" stroke="rgba(214,163,74,0.32)" strokeWidth="1.0" />

        {/* ── Base line ── */}
        <line x1="20" y1="796" x2="420" y2="796" stroke="rgba(214,163,74,0.18)" strokeWidth="1.0" />
      </svg>
    </motion.div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function MuseRevealHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Muse drifts UPWARD on scroll (0 → -100px) with spring damping for smoothness
  const settleYRaw = useTransform(scrollYProgress, [0, 0.44], [0, -100])
  const settleY    = useSpring(settleYRaw, { stiffness: 52, damping: 18, mass: 0.9 })

  // Arch: present at low opacity from start, fully revealed mid-scroll
  const archOp = useTransform(scrollYProgress, [0, 0.25, 0.60], [0.42, 0.42, 1])

  // Spotlight: strengthens as muse settles
  const glowOp = useTransform(scrollYProgress, [0, 0.44], [0.45, 1])

  // Floor shadow
  const shadowOp = useTransform(scrollYProgress, [0.36, 0.56], [0, 1])

  // Muse fades as About rises
  const museExitOp = useTransform(scrollYProgress, [0.72, 0.88], [1, 0])

  // About section
  const aboutY  = useTransform(scrollYProgress, [0.68, 0.80, 1.0], ['100%', '0%', '0%'])
  const aboutOp = useTransform(scrollYProgress, [0.70, 0.84, 1.0], [0, 1, 1])

  // Scroll hint
  const hintOp = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: '#0a0710' }}
      >
        <div className="grain absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

        {/* ── Overhead spotlight — tight gallery beam ── */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '80vh', zIndex: 2, opacity: glowOp,
            background: [
              'radial-gradient(ellipse  9% 26% at 50% 0%, rgba(255,245,210,0.18) 0%, transparent 100%)',
              'radial-gradient(ellipse 20% 52% at 50% 0%, rgba(244,215,150,0.11) 0%, transparent 100%)',
              'radial-gradient(ellipse 36% 80% at 50% 0%, rgba(214,163,74,0.06)  0%, transparent 100%)',
            ].join(', '),
          }}
        />

        {/* ── Scene vignette — crushes the sides, keeps only arch lit ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: [
              'radial-gradient(ellipse 50% 88% at 50% 46%, transparent 28%, rgba(3,2,7,0.74) 100%)',
              'linear-gradient(to bottom, rgba(3,2,7,0.22) 0%, transparent 18%, transparent 82%, rgba(3,2,7,0.35) 100%)',
            ].join(', '),
          }}
        />

        {/* ── Arch ── */}
        <ArchFrame opacity={archOp} />

        {/* ── Floor shadow ── */}
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'clamp(5vh, 8vh, 12vh)',
            left: '50%', x: '-50%',
            width: 'clamp(140px, 16vw, 240px)',
            height: 'clamp(12px, 1.8vh, 24px)',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,0,0,0.80) 0%, transparent 100%)',
            filter: 'blur(8px)',
            opacity: shadowOp,
            zIndex: 6, pointerEvents: 'none',
          }}
        />

        {/* ── MUSE ── */}
        <div style={{
          position: 'absolute',
          top: 'calc(50vh - 42vh)',   // ~8vh from top — upper portion of viewport
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, pointerEvents: 'none',
        }}>
          {/* Entry: dramatic descent from above */}
          <motion.div
            initial={{ y: '-72vh', opacity: 0 }}
            animate={{ y: '0vh',   opacity: 1 }}
            transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Scroll settle: smooth spring upward drift */}
            <motion.div style={{
              y: settleY,
              opacity: museExitOp,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Image
                src="/muse/muse-hero-pedestal.png"
                alt="The Muse — Muse & Menu Society"
                width={864}
                height={1821}
                priority
                unoptimized
                style={{
                  width: 'clamp(280px, 70vw, 360px)',
                  height: 'auto',
                  display: 'block',
                  filter: [
                    'drop-shadow(0 -2px 22px rgba(214,163,74,0.10))',
                    'drop-shadow(0 28px 64px rgba(7,8,10,0.94))',
                  ].join(' '),
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div style={{
          position: 'absolute',
          bottom: 'clamp(16px, 2.2vh, 36px)',
          left: '50%', x: '-50%',
          opacity: hintOp, zIndex: 22, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          <p style={{
            fontFamily: CAPS, fontSize: 8, letterSpacing: '0.36em',
            textTransform: 'uppercase', color: 'rgba(169,163,154,0.36)',
          }}>
            Scroll to receive
          </p>
          <motion.div
            style={{ width: 1, height: 28, background: 'rgba(212,175,55,0.18)' }}
            animate={{ opacity: [0.18, 0.6, 0.18] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ── About section — rises after muse settles ── */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          y: aboutY, opacity: aboutOp, zIndex: 30,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 clamp(24px, 5vw, 80px)',
          background: 'linear-gradient(180deg, rgba(24,11,36,0.55) 0%, #0D1014 18%, #0D1014 100%)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '36%',
            background: 'radial-gradient(ellipse 44% 80% at 50% 0%, rgba(24,11,36,0.55) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 520, textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: CAPS, fontSize: 9, letterSpacing: '0.30em',
              textTransform: 'uppercase', color: 'rgba(214,163,74,0.40)', marginBottom: 22,
            }}>
              About the Society
            </p>
            <h2 style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(2.1rem, 5.2vw, 4.2rem)',
              lineHeight: 1.08, letterSpacing: '-0.015em',
              color: 'rgba(244,239,230,0.95)', marginBottom: 28,
            }}>
              Where meals<br />meet meaning.
            </h2>
            <div style={{ width: 32, height: 1, background: 'rgba(214,163,74,0.22)', margin: '0 auto 28px' }} />
            <p style={{
              fontFamily: SERIF, fontWeight: 300, fontStyle: 'normal',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              lineHeight: 1.75, color: 'rgba(169,163,154,0.82)',
              marginBottom: 42, letterSpacing: '0.01em',
            }}>
              A privately convened supper society. We gather a small,
              considered number of people around a table shaped by a
              single idea. Nothing arrives without intention.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <Link href="/about" style={{
                fontFamily: CAPS, fontSize: 9, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'rgba(244,239,230,0.90)',
                border: '1px solid rgba(214,163,74,0.28)', padding: '14px 38px',
                display: 'inline-block', transition: 'border-color 0.3s, color 0.3s',
                textDecoration: 'none',
              }} className="hover:border-antique-gold/60 hover:text-porcelain">
                The Society
              </Link>
              <Link href="/membership" style={{
                fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                color: 'rgba(214,163,74,0.52)',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(214,163,74,0.18)',
                textUnderlineOffset: 5, display: 'inline-block',
                transition: 'color 0.3s', letterSpacing: '0.01em',
              }} className="hover:text-antique-gold">
                Request consideration
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
