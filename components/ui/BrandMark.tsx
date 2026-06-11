// DeathVault brand mark — "the sealed pulse": a flatline heartbeat enclosed in
// the vault frame. Scales cleanly from 16px favicon to large hero. Amber reads
// on both light and dark surfaces, so one color works in both themes.
export function BrandMark({
  size = 28,
  color = "#F59E0B",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Vault frame */}
      <rect x="15" y="15" width="70" height="70" rx="20" stroke={color} strokeWidth="7" />
      {/* Flatline pulse — one beat, then flat */}
      <path
        d="M26 50 H42 L48 34 L55 66 L61 50 H74"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Origin point */}
      <circle cx="26" cy="50" r="3.4" fill={color} />
    </svg>
  );
}
