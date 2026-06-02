'use client'
import { motion } from 'framer-motion'

const SERIF  = 'var(--font-cormorant), Georgia, serif'
const SANS   = 'var(--font-dm-sans), system-ui, sans-serif'
// Gold stroke at low opacity — fine botanical linework
const G      = 'rgba(214,163,74,0.42)'
const G2     = 'rgba(214,163,74,0.28)'
const SW     = '0.75'

// Reusable draw-on animation for a single path
function Tendril({ d, delay = 0, stroke = G, strokeWidth = SW, duration = 3.5 }: {
  d: string; delay?: number; stroke?: string; strokeWidth?: string; duration?: number
}) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

function Leaf({ cx, cy, rx = 9, ry = 5, angle = 0, delay = 0 }: {
  cx: number; cy: number; rx?: number; ry?: number; angle?: number; delay?: number
}) {
  return (
    <motion.ellipse
      cx={cx} cy={cy} rx={rx} ry={ry}
      transform={`rotate(${angle} ${cx} ${cy})`}
      stroke={G2}
      strokeWidth="0.6"
      fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  )
}

function Berry({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r="2"
      stroke={G2} strokeWidth="0.5" fill="none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.7 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    />
  )
}

// ── Botanical ornament — grape vine inspired, 500×700 viewBox ─────────────────
function BotanicalFrame() {
  return (
    <svg
      viewBox="0 0 500 700"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── TOP CENTER — vine spreading from the figure's crown ── */}
      {/* Main stem up */}
      <Tendril d="M 250 195 L 250 115" delay={0.4} duration={2.5} />
      {/* Left branch from stem */}
      <Tendril d="M 250 140 C 235 132 215 128 198 135 C 186 140 178 132 172 120" delay={0.9} duration={3} />
      {/* Right branch */}
      <Tendril d="M 250 140 C 265 132 285 128 302 135 C 314 140 322 132 328 120" delay={0.9} duration={3} />
      {/* Left sub-tendril from branch */}
      <Tendril d="M 198 135 C 190 128 184 130 183 138 C 182 144 186 147 190 143" delay={1.6} duration={2} />
      {/* Right sub-tendril */}
      <Tendril d="M 302 135 C 310 128 316 130 317 138 C 318 144 314 147 310 143" delay={1.6} duration={2} />
      {/* Leaves */}
      <Leaf cx={168} cy={120} rx={10} ry={5} angle={-35} delay={1.9} />
      <Leaf cx={332} cy={120} rx={10} ry={5} angle={35} delay={1.9} />
      <Leaf cx={182} cy={138} rx={7} ry={3.5} angle={-20} delay={2.4} />
      <Leaf cx={318} cy={138} rx={7} ry={3.5} angle={20} delay={2.4} />
      {/* Berries — top cluster */}
      <Berry cx={250} cy={108} delay={3.0} />
      <Berry cx={243} cy={113} delay={3.1} />
      <Berry cx={257} cy={113} delay={3.2} />

      {/* ── BOTTOM CENTER — vine rising to meet the figure's base ── */}
      <Tendril d="M 250 505 L 250 585" delay={0.6} duration={2.5} />
      <Tendril d="M 250 560 C 235 568 215 572 198 565 C 186 560 178 568 172 580" delay={1.1} duration={3} />
      <Tendril d="M 250 560 C 265 568 285 572 302 565 C 314 560 322 568 328 580" delay={1.1} duration={3} />
      <Tendril d="M 198 565 C 190 572 184 570 183 562 C 182 556 186 553 190 557" delay={1.8} duration={2} />
      <Tendril d="M 302 565 C 310 572 316 570 317 562 C 318 556 314 553 310 557" delay={1.8} duration={2} />
      <Leaf cx={168} cy={580} rx={10} ry={5} angle={35} delay={2.1} />
      <Leaf cx={332} cy={580} rx={10} ry={5} angle={-35} delay={2.1} />
      <Berry cx={250} cy={592} delay={3.2} />
      <Berry cx={243} cy={586} delay={3.3} />
      <Berry cx={257} cy={586} delay={3.4} />

      {/* ── LEFT SIDE — climbing vine ── */}
      <Tendril d="M 108 350 C 88 330 72 340 60 325 C 52 315 58 300 48 290" delay={0.7} duration={3} />
      <Tendril d="M 108 350 C 88 370 75 380 60 375 C 48 371 42 382 38 395" delay={1.2} duration={3} />
      <Leaf cx={44} cy={287} rx={9} ry={4.5} angle={-50} delay={2.0} />
      <Leaf cx={34} cy={397} rx={9} ry={4.5} angle={-140} delay={2.3} />
      <Tendril d="M 60 325 C 50 318 44 320 44 328" delay={2.2} duration={1.5} />
      <Berry cx={47} cy={290} delay={3.1} />
      <Berry cx={52} cy={283} delay={3.2} />

      {/* ── RIGHT SIDE — mirror climbing vine ── */}
      <Tendril d="M 392 350 C 412 330 428 340 440 325 C 448 315 442 300 452 290" delay={0.7} duration={3} />
      <Tendril d="M 392 350 C 412 370 425 380 440 375 C 452 371 458 382 462 395" delay={1.2} duration={3} />
      <Leaf cx={456} cy={287} rx={9} ry={4.5} angle={50} delay={2.0} />
      <Leaf cx={466} cy={397} rx={9} ry={4.5} angle={140} delay={2.3} />
      <Tendril d="M 440 325 C 450 318 456 320 456 328" delay={2.2} duration={1.5} />
      <Berry cx={453} cy={290} delay={3.1} />
      <Berry cx={448} cy={283} delay={3.2} />

      {/* ── Hairline framing rule — top and bottom ── */}
      <motion.line
        x1="180" y1="88" x2="320" y2="88"
        stroke="rgba(214,163,74,0.18)" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: 'easeOut' }}
      />
      <motion.line
        x1="180" y1="612" x2="320" y2="612"
        stroke="rgba(214,163,74,0.18)" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  )
}

// ── Main overlay ──────────────────────────────────────────────────────────────
interface Props {
  message?: string
  subtext?: string
}

export default function SubmissionOverlay({
  message  = 'Receiving your consideration.',
  subtext  = 'This will only take a moment.',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'linear-gradient(180deg, #07080A 0%, #1E0C2C 55%, #07080A 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Botanical ornament frame — sits behind the figure */}
      <BotanicalFrame />

      {/* Plain Jane figure — transparent SVG on dark bg via screen blend */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <img
          src="/logo/Plain Jane.svg"
          alt=""
          aria-hidden="true"
          style={{
            height: 'clamp(180px, 36vh, 300px)',
            width: 'auto',
            display: 'block',
            // screen blend dissolves the dark plum background into the overlay
            mixBlendMode: 'screen',
            filter: 'brightness(0.9)',
          }}
        />
      </motion.div>

      {/* Thin gold rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 48, height: 1,
          background: 'rgba(214,163,74,0.35)',
          margin: '24px 0 20px',
          transformOrigin: 'center',
          position: 'relative', zIndex: 1,
        }}
      />

      {/* Primary message */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          color: 'rgba(244,239,230,0.75)',
          letterSpacing: '0.02em',
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        {message}
      </motion.p>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.6, ease: 'easeOut' }}
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(169,163,154,0.4)',
          position: 'relative', zIndex: 1,
        }}
      >
        {subtext}
      </motion.p>
    </motion.div>
  )
}
