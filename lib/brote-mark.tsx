// PlagueAtlas "Brote" brand mark: a central virion spreading through a
// contact network. The top-left node is sprouting spikes (infection taking
// hold); the core is iridescent violet → magenta → red. Shared by every icon
// size and the OG image so the mark stays identical everywhere. DeathVault's
// mark (sealed-pulse shield) lives inline in each icon file.
// Rendered via Satori (next/og): static coordinates only, no transforms/defs.

const VIOLET = "#7C3AED";
const MAGENTA = "#C026D3";

type BroteMarkProps = {
  size: number;
  /** Fill for virion bodies and network nodes */
  body: string;
  /** Stroke for network links and spikes */
  line: string;
  /** Innermost core color (brand red) */
  core?: string;
  /** Optional stroke around bodies, for dark backgrounds (OG) */
  outline?: string;
  /** "small" drops the network to 2 nodes for 16-32px favicons */
  detail?: "full" | "small";
};

export function BroteMark({
  size,
  body,
  line,
  core = "#DC2626",
  outline,
  detail = "full",
}: BroteMarkProps) {
  const o = outline
    ? { stroke: outline, strokeWidth: 1.5, strokeOpacity: 0.8 }
    : {};

  if (detail === "small") {
    return (
      <svg width={size} height={size} viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
        <line x1="55" y1="55" x2="18.6" y2="22.5" stroke={line} strokeWidth="4.2" />
        <line x1="55" y1="55" x2="94" y2="86.2" stroke={line} strokeWidth="4.2" />
        <line x1="73.2" y1="55" x2="82.3" y2="55" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="67.87" y1="67.87" x2="74.3" y2="74.3" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="55" y1="73.2" x2="55" y2="82.3" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="42.13" y1="67.87" x2="35.7" y2="74.3" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="36.8" y1="55" x2="27.7" y2="55" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="42.13" y1="42.13" x2="35.7" y2="35.7" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="55" y1="36.8" x2="55" y2="27.7" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <line x1="67.87" y1="42.13" x2="74.3" y2="35.7" stroke={line} strokeWidth="4" strokeLinecap="round" />
        <circle cx="85.55" cy="55" r="3.1" fill={line} />
        <circle cx="76.6" cy="76.6" r="3.1" fill={line} />
        <circle cx="55" cy="85.55" r="3.1" fill={line} />
        <circle cx="33.4" cy="76.6" r="3.1" fill={line} />
        <circle cx="24.45" cy="55" r="3.1" fill={line} />
        <circle cx="33.4" cy="33.4" r="3.1" fill={line} />
        <circle cx="55" cy="24.45" r="3.1" fill={line} />
        <circle cx="76.6" cy="33.4" r="3.1" fill={line} />
        <circle cx="55" cy="55" r="20.8" fill={body} {...o} />
        <circle cx="55" cy="55" r="10.4" fill={VIOLET} />
        <circle cx="55" cy="55" r="6" fill={core} />
        <circle cx="18.6" cy="22.5" r="9.75" fill={body} {...o} />
        <circle cx="94" cy="86.2" r="8.45" fill={body} {...o} />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
      <line x1="55" y1="55" x2="29" y2="33" stroke={line} strokeWidth="2.4" />
      <line x1="55" y1="55" x2="83" y2="40" stroke={line} strokeWidth="2.4" />
      <line x1="55" y1="55" x2="72" y2="82" stroke={line} strokeWidth="2.4" />
      <line x1="55" y1="55" x2="31" y2="78" stroke={line} strokeWidth="2.4" />
      <line x1="66.5" y1="55" x2="72" y2="55" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="63.13" y1="63.13" x2="67.02" y2="67.02" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="66.5" x2="55" y2="72" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="46.87" y1="63.13" x2="42.98" y2="67.02" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="43.5" y1="55" x2="38" y2="55" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="46.87" y1="46.87" x2="42.98" y2="42.98" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="43.5" x2="55" y2="38" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <line x1="63.13" y1="46.87" x2="67.02" y2="42.98" stroke={line} strokeWidth="2" strokeLinecap="round" />
      <circle cx="74" cy="55" r="1.6" fill={line} />
      <circle cx="68.44" cy="68.44" r="1.6" fill={line} />
      <circle cx="55" cy="74" r="1.6" fill={line} />
      <circle cx="41.56" cy="68.44" r="1.6" fill={line} />
      <circle cx="36" cy="55" r="1.6" fill={line} />
      <circle cx="41.56" cy="41.56" r="1.6" fill={line} />
      <circle cx="55" cy="36" r="1.6" fill={line} />
      <circle cx="68.44" cy="41.56" r="1.6" fill={line} />
      <circle cx="55" cy="55" r="13" fill={body} {...o} />
      <circle cx="55" cy="55" r="6.5" fill={VIOLET} />
      <circle cx="55" cy="55" r="4.5" fill={MAGENTA} />
      <circle cx="55" cy="55" r="2.6" fill={core} />
      <line x1="34.5" y1="33" x2="37.5" y2="33" stroke={line} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="31.75" y1="37.76" x2="33.25" y2="40.36" stroke={line} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="26.25" y1="37.76" x2="24.75" y2="40.36" stroke={line} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="23.5" y1="33" x2="20.5" y2="33" stroke={line} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="26.25" y1="28.24" x2="24.75" y2="25.64" stroke={line} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="31.75" y1="28.24" x2="33.25" y2="25.64" stroke={line} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="39" cy="33" r="1.1" fill={line} />
      <circle cx="34" cy="41.66" r="1.1" fill={line} />
      <circle cx="24" cy="41.66" r="1.1" fill={line} />
      <circle cx="19" cy="33" r="1.1" fill={line} />
      <circle cx="24" cy="24.34" r="1.1" fill={line} />
      <circle cx="34" cy="24.34" r="1.1" fill={line} />
      <circle cx="29" cy="33" r="6.2" fill={body} {...o} />
      <circle cx="29" cy="33" r="2.4" fill={MAGENTA} />
      <circle cx="83" cy="40" r="6.9" fill={body} {...o} />
      <circle cx="72" cy="82" r="6.2" fill={body} {...o} />
      <circle cx="31" cy="78" r="5.5" fill={body} {...o} />
    </svg>
  );
}
