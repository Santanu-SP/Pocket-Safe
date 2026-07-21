import { motion, AnimatePresence } from 'framer-motion';

// ─── Letter-reveal span ─────────────────────────────────────────────────────
function RevealLetter({ char, delay }) {
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {char}
    </motion.span>
  );
}

// ─── Main Splash Screen ─────────────────────────────────────────────────────
export default function SplashScreen({ isVisible }) {
  const pocketLetters = 'Pocket'.split('');
  const safeLetters   = 'Safe'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-color)' }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ── Ambient background glow ── */}
          <motion.div
            className="absolute"
            style={{
              width: 380,
              height: 380,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 60% 40%, rgba(5,150,105,0.10) 0%, rgba(217,119,6,0.05) 50%, transparent 70%)',
              top: '50%',
              left: '50%',
              marginTop: -190,
              marginLeft: -190,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* ── Logo ── */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -32, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <motion.div
              className="absolute"
              style={{
                inset: -12,
                borderRadius: 38,
                background:
                  'radial-gradient(circle, rgba(5,150,105,0.22) 0%, rgba(217,119,6,0.08) 55%, transparent 75%)',
                zIndex: 0,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
            />
            <img
              src="assets/logo.png"
              alt="PocketSafe Logo"
              className="relative z-10 object-cover"
              style={{
                width: 96,
                height: 96,
                borderRadius: 24,
                display: 'block',
                boxShadow: '0 12px 36px rgba(5,150,105,0.22), 0 3px 10px rgba(0,0,0,0.14)',
              }}
            />
          </motion.div>

          {/* ── Brand name reveal ── */}
          <motion.div
            className="relative z-10 mt-5 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01, delay: 0.55 }}
          >
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '2.1rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'var(--text-primary)' }}>
                {pocketLetters.map((char, i) => (
                  <RevealLetter key={i} char={char} delay={0.58 + i * 0.045} />
                ))}
              </span>
              <span style={{ color: 'var(--primary)' }}>
                {safeLetters.map((char, i) => (
                  <RevealLetter
                    key={i}
                    char={char}
                    delay={0.58 + pocketLetters.length * 0.045 + 0.05 + i * 0.045}
                  />
                ))}
              </span>
            </div>

            {/* Tagline */}
            <motion.div
              className="mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.58 + (pocketLetters.length + safeLetters.length) * 0.045 + 0.15,
                ease: 'easeOut',
              }}
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              Your money, your rules
            </motion.div>
          </motion.div>

          {/* ── Progress sweep bar ── */}
          <motion.div
            className="relative z-10 mt-10 overflow-hidden"
            style={{
              width: 100,
              height: 2,
              borderRadius: 9999,
              background: 'var(--border-color)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            <motion.div
              style={{
                height: '100%',
                borderRadius: 9999,
                background: 'linear-gradient(90deg, var(--primary), var(--gold))',
                originX: 0,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.85, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
