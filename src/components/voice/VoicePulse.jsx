/**
 * VoicePulse
 *
 * Animated waveform/pulse shown while voice recognition is active.
 */
export default function VoicePulse({ active = false }) {
  if (!active) return null;

  const bars = [3, 6, 9, 12, 9, 6, 3, 6, 9, 12, 9];

  return (
    <div className="flex items-center justify-center gap-1 h-10">
      {bars.map((height, i) => (
        <span
          key={i}
          className="w-1 rounded-full bg-[#3b6ef8] animate-wave-bar"
          style={{
            height: `${height}px`,
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${0.7 + (i % 3) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
