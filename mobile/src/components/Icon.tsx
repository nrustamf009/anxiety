import Svg, { Circle, Path } from "react-native-svg";

/** Hand-drawn line icons (24×24, 1.6 stroke) — one per symptom plus UI glyphs. */
const P: Record<string, (c: string) => React.ReactNode> = {
  spiral: (c) => <Path d="M12 12.5a1.5 1.5 0 1 1 1.5-1.5c0 2.2-1.8 4-4 4a4.5 4.5 0 0 1-4.5-4.5A6 6 0 0 1 11 4.5a7.5 7.5 0 0 1 7.5 7.5A9 9 0 0 1 9.5 21" stroke={c} />,
  horizon: (c) => (<><Path d="M3 16h18M6 19.5h12" stroke={c} /><Path d="M7 16a5 5 0 0 1 10 0" stroke={c} /><Path d="M12 5.5v2.5M5.5 9l1.6 1.4M18.5 9l-1.6 1.4" stroke={c} /></>),
  heart: (c) => (<><Path d="M12 20s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" stroke={c} /><Path d="M6.5 12.5h3l1.2-2.2 2 4.2 1.3-2h3.5" stroke={c} /></>),
  moon: (c) => (<><Path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" stroke={c} /><Path d="M16 4.5v2M15 5.5h2" stroke={c} /></>),
  valley: (c) => (<><Path d="M2.5 18 8 9l4 6 3-4 6.5 7" stroke={c} /><Path d="M12 21v-3" stroke={c} /><Circle cx="16.5" cy="5.5" r="1.6" stroke={c} /></>),
  leaf: (c) => (<><Path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" stroke={c} /><Path d="M5 19 13 11" stroke={c} /></>),
  bird: (c) => (<><Path d="M3 13c3-1 5 0 7 2 1-4 4-7 9-7-1 1-1.5 2-1.5 3.5 0 4-3.5 6.5-7.5 6.5H6" stroke={c} /><Path d="M16 9.8h.01" stroke={c} /></>),
  hands: (c) => (<><Path d="M4 13c2.5 0 4 1 5.5 2.5L12 18l2.5-2.5C16 14 17.5 13 20 13" stroke={c} /><Path d="M12 18v3" stroke={c} /><Path d="M12 11.5s-3.5-2-3.5-4.5a1.9 1.9 0 0 1 3.5-1 1.9 1.9 0 0 1 3.5 1c0 2.5-3.5 4.5-3.5 4.5Z" stroke={c} /></>),
  people: (c) => (<><Circle cx="9" cy="8" r="3" stroke={c} /><Path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke={c} /><Path d="M16 5.3a3 3 0 0 1 0 5.4M17.5 14a5.5 5.5 0 0 1 3 5" stroke={c} /></>),
  lamp: (c) => (<><Path d="M12 3.5c1.6 2 2.5 3.5 2.5 5a2.5 2.5 0 0 1-5 0c0-1.5.9-3 2.5-5Z" stroke={c} /><Path d="M9 13h6l-1 7h-4l-1-7Z" stroke={c} /><Path d="M7.5 20.5h9" stroke={c} /></>),
  stillwater: (c) => (<><Path d="M3 10c2 0 2-1.2 4.5-1.2S10 10 12 10s2-1.2 4.5-1.2S19 10 21 10" stroke={c} /><Path d="M5 14.5h14M8 18.5h8" stroke={c} /></>),
  tree: (c) => (<><Path d="M12 21v-6" stroke={c} /><Path d="M12 3c3.5 2.5 6 5.5 6 8.5a6 6 0 0 1-12 0C6 8.5 8.5 5.5 12 3Z" stroke={c} /><Path d="M12 15l-2.5-2.5M12 12.5l2-2" stroke={c} /></>),
  dawn: (c) => (<><Path d="M4 17h16" stroke={c} /><Path d="M7.5 17a4.5 4.5 0 0 1 9 0" stroke={c} /><Path d="M12 7v3M5.8 10.2l1.6 1.4M18.2 10.2l-1.6 1.4M8 20.5h8" stroke={c} /></>),
  path: (c) => (<><Path d="M7 21c0-4 10-5 10-9s-6-3.5-6-6.5S14 3 14 3" stroke={c} /><Circle cx="14" cy="3" r=".2" stroke={c} /></>),
  wave: (c) => (<><Path d="M2.5 15c2.2 0 3-3.5 6-3.5s3.2 3.5 6 3.5 3.3-2 7-2" stroke={c} /><Path d="M6 7.5c1.5-2.3 4-3.5 6.5-3a5 5 0 0 1 3.5 7" stroke={c} /><Path d="M3 19.5h18" stroke={c} /></>),
  // UI
  back: (c) => <Path d="M14.5 5.5 8 12l6.5 6.5" stroke={c} />,
  chevron: (c) => <Path d="m9.5 6 6 6-6 6" stroke={c} />,
  close: (c) => <Path d="M6 6l12 12M18 6 6 18" stroke={c} />,
  phone: (c) => <Path d="M5.5 4h3l1.5 4-2 1.3a10 10 0 0 0 6.7 6.7L16 14l4 1.5v3A1.5 1.5 0 0 1 18.5 20 14.5 14.5 0 0 1 4 5.5 1.5 1.5 0 0 1 5.5 4Z" stroke={c} />,
  lifebuoy: (c) => (<><Circle cx="12" cy="12" r="8.5" stroke={c} /><Circle cx="12" cy="12" r="3.5" stroke={c} /><Path d="m6 6 3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" stroke={c} /></>),
  settings: (c) => (<><Path d="M4 7h10M18 7h2M4 17h4M12 17h8" stroke={c} /><Circle cx="16" cy="7" r="2" stroke={c} /><Circle cx="10" cy="17" r="2" stroke={c} /></>),
  breath: (c) => (<><Circle cx="12" cy="12" r="3" stroke={c} /><Circle cx="12" cy="12" r="6.5" stroke={c} opacity={0.6} /><Circle cx="12" cy="12" r="9.5" stroke={c} opacity={0.3} /></>),
  quill: (c) => (<><Path d="M19.5 4.5C12 5 7.5 10 6 17.5L5 20" stroke={c} /><Path d="M8 14.5h5.5M10 11h5.5M19.5 4.5c-.5 6-4 10.5-11 11" stroke={c} /></>),
  play: (c) => <Path d="M8 5.5v13l10-6.5-10-6.5Z" stroke={c} />,
  check: (c) => <Path d="m5 12.5 4.5 4.5L19 7.5" stroke={c} />,
  book: (c) => (<><Path d="M12 6.5C10 5 7 4.5 4 5v13.5c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Z" stroke={c} /><Path d="M12 6.5V20" stroke={c} /></>),
};

export function Icon({ name, color, size = 24 }: { name: string; color: string; size?: number }) {
  const draw = P[name] ?? P.stillwater;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {draw(color)}
    </Svg>
  );
}
