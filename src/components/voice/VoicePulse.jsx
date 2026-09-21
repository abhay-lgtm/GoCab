/**
 * VoicePulse
 *
 * Animated waveform/pulse shown while voice recognition is active.
 * Bars animate with staggered delays to simulate a live audio waveform.
 */
export default function VoicePulse({ active = false, color = '#7c3aed', size = 'md' }) {
  if (!active) return null;

  const heights = [4, 8, 14, 20, 28, 20, 14, 28, 20, 14, 8, 14, 20, 28, 20, 14, 8, 4];
  const barW    = size === 'sm' ? 3 : 4;
  const maxH    = size === 'sm' ? 20 : 36;

  return (
    <div
      className="flex items-center justify-center gap-[3px]"
      style={{ height: maxH + 8 }}
      aria-hidden="true"
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="rounded-full animate-wave-bar"
          style={{
            width: barW,
            height: Math.min(h, maxH),
            background: color,
            opacity: 0.85,
            animationDelay: `${i * 0.06}s`,
            animationDuration: `${0.65 + (i % 4) * 0.12}s`,
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  );
}
