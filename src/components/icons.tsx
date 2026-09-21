/**
 * Inline SVG icon set. Airbnb's own icons are 32x32 line art at ~2px stroke;
 * these are redrawn to that grid so they sit correctly next to 16px text.
 *
 * Every icon inherits `currentColor` and is `aria-hidden` — icons here are
 * always paired with a visible text label, so they carry no semantics.
 */

type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

function Svg({
  size = 24,
  className,
  children,
  fill = "none",
  strokeWidth = 2,
  viewBox = "0 0 32 32",
}: IconProps & {
  children: React.ReactNode;
  fill?: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Solid star — the only icon that fills rather than strokes. */
export function Star({ size = 12, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M15.1 1.6a1 1 0 0 1 1.8 0l4 8.5 9.1 1.4a1 1 0 0 1 .6 1.7l-6.6 6.7 1.6 9.5a1 1 0 0 1-1.5 1l-8.1-4.4-8.1 4.4a1 1 0 0 1-1.5-1l1.6-9.5-6.6-6.7a1 1 0 0 1 .6-1.7l9.1-1.4z" />
    </svg>
  );
}

export function ChevronLeft(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={p.strokeWidth ?? 3}>
      <path d="M20 28 8 16 20 4" />
    </Svg>
  );
}

export function ChevronRight(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={p.strokeWidth ?? 3}>
      <path d="M12 4l12 12-12 12" />
    </Svg>
  );
}

export function ChevronDown(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={p.strokeWidth ?? 3}>
      <path d="M4 10l12 12 12-12" />
    </Svg>
  );
}

export function Close(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={p.strokeWidth ?? 3}>
      <path d="M6 6l20 20M26 6 6 26" />
    </Svg>
  );
}

export function Search(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={p.strokeWidth ?? 4}>
      <circle cx="14" cy="14" r="9" />
      <path d="M21 21l7 7" />
    </Svg>
  );
}

export function Globe(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="16" cy="16" r="13" />
      <path d="M3 16h26M16 3c3.5 3.7 5.3 8.2 5.3 13S19.5 28.3 16 29c-3.5-3.7-5.3-8.2-5.3-13S12.5 3.7 16 3z" />
    </Svg>
  );
}

export function Menu(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 9h26M3 16h26M3 23h26" />
    </Svg>
  );
}

export function Grid(p: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={p.size ?? 16}
      height={p.size ?? 16}
      className={p.className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      {[3, 13, 23].map((y) =>
        [3, 13, 23].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1.5" />
        )),
      )}
    </svg>
  );
}

export function Heart({ size = 16, className, filled }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill={filled ? "currentColor" : "rgba(0,0,0,0.5)"}
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M16 28c7-4.7 12-9.6 12-15a6.5 6.5 0 0 0-12-3.6A6.5 6.5 0 0 0 4 13c0 5.4 5 10.3 12 15z" />
    </svg>
  );
}

export function Share(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M16 3v20M8 11l8-8 8 8" />
      <path d="M6 18v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9" />
    </Svg>
  );
}

export function Flag(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 29V4M7 5h17l-3 6 3 6H7" />
    </Svg>
  );
}

/* --- Highlight icons ------------------------------------------------- */

export function Outdoor(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M2 24h28" />
      <path d="M6 24v-7a10 10 0 0 1 20 0v7" />
      <path d="M16 7V3" />
    </Svg>
  );
}

export function Cooling(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M16 2v28M2 16h28M6 6l20 20M26 6 6 26" />
    </Svg>
  );
}

export function CheckIn(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <rect x="5" y="3" width="22" height="26" rx="2" />
      <path d="M12 16l3 3 6-6" />
    </Svg>
  );
}

/* --- Sleeping / amenity icons ---------------------------------------- */

export function Bed(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M3 26v-6h26v6M3 20v-9M29 20v-4a3 3 0 0 0-3-3H14v7" />
      <circle cx="8.5" cy="15.5" r="2.5" />
    </Svg>
  );
}

export function Sofa(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M5 15v-4a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v4" />
      <path d="M3 24v-6a3 3 0 0 1 6 0v2h14v-2a3 3 0 0 1 6 0v6z" />
    </Svg>
  );
}

export function Kitchen(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <rect x="5" y="3" width="22" height="26" rx="2" />
      <path d="M5 13h22" />
      <circle cx="11" cy="8" r="1.5" />
      <circle cx="21" cy="8" r="1.5" />
    </Svg>
  );
}

export function Wifi(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M3 12a20 20 0 0 1 26 0M8 18a12 12 0 0 1 16 0" />
      <circle cx="16" cy="25" r="1.5" fill="currentColor" />
    </Svg>
  );
}

export function Workspace(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <rect x="3" y="5" width="26" height="17" rx="2" />
      <path d="M11 27h10M16 22v5" />
    </Svg>
  );
}

export function Parking(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <rect x="3" y="3" width="26" height="26" rx="4" />
      <path d="M12 24V9h5.5a4.5 4.5 0 0 1 0 9H12" />
    </Svg>
  );
}

export function Pool(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M2 24c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2" />
      <path d="M2 29c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2" />
      <path d="M10 20V6a3 3 0 0 1 6 0M22 20V6" />
      <path d="M10 12h12" />
    </Svg>
  );
}

export function HotTub(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M4 16h24v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M10 12V6M16 12V4M22 12V7" />
    </Svg>
  );
}

export function Pets(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <circle cx="9" cy="11" r="3" />
      <circle cx="16" cy="8" r="3" />
      <circle cx="23" cy="11" r="3" />
      <path d="M16 16c-4 0-7 3-7 6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4c0-3-3-6-7-6z" />
    </Svg>
  );
}

export function Camera(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M4 10l22-5 2 7-22 5z" />
      <path d="M6 17v9M14 15v4" />
    </Svg>
  );
}

export function Alarm(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <circle cx="16" cy="16" r="13" />
      <circle cx="16" cy="16" r="4" />
    </Svg>
  );
}

/* --- Rating category icons ------------------------------------------- */

export function Sparkle(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M16 3l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
    </Svg>
  );
}

export function Check(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M5 17l7 7L27 8" />
    </Svg>
  );
}

export function Key(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <circle cx="10" cy="22" r="6" />
      <path d="M14 18L27 5M23 9l3 3M20 12l3 3" />
    </Svg>
  );
}

export function Chat(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M28 15c0 6-5.4 11-12 11a13 13 0 0 1-4-.6L5 28l2-5.5A10.5 10.5 0 0 1 4 15C4 9 9.4 4 16 4s12 5 12 11z" />
    </Svg>
  );
}

export function Pin(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M16 29s10-9.4 10-16A10 10 0 0 0 6 13c0 6.6 10 16 10 16z" />
      <circle cx="16" cy="13" r="4" />
    </Svg>
  );
}

export function Tag(p: IconProps) {
  return (
    <Svg {...p} size={p.size ?? 24}>
      <path d="M3 3h11l15 15-11 11L3 14z" />
      <circle cx="9.5" cy="9.5" r="2" />
    </Svg>
  );
}

/** Maps a data-model icon key to its component. */
export const ICONS = {
  outdoor: Outdoor,
  cooling: Cooling,
  checkin: CheckIn,
  bed: Bed,
  sofa: Sofa,
  kitchen: Kitchen,
  wifi: Wifi,
  workspace: Workspace,
  parking: Parking,
  pool: Pool,
  hottub: HotTub,
  pets: Pets,
  camera: Camera,
  alarm: Alarm,
  sparkle: Sparkle,
  check: Check,
  key: Key,
  chat: Chat,
  pin: Pin,
  tag: Tag,
} as const;

export type IconKey = keyof typeof ICONS;
