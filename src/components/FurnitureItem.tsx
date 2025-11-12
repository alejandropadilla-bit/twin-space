'use client';
import { motion } from 'framer-motion';
import { CSSProperties, useMemo } from 'react';

export type FurnType =
  | 'Bed'
  | 'Desk'
  | 'Chair'
  | 'Dresser'
  | 'Bookshelf'
  | 'Nightstand'
  | 'Lamp'
  | 'Rug'
  | 'Plant';

export interface Furn {
  id: string;
  type: FurnType;
  x: number;
  y: number;
  w: number; // width in px
  h: number; // height in px
  rotation?: number; // deg
  color?: string;
  label?: string;
  selected?: boolean;
}

const stroke = '#2b2b2b';
const fillMuted = '#fff';

function BedSVG({ color = '#e9e5db', strokeColor = stroke }: { color?: string; strokeColor?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 110" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="g-bed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopOpacity="0.08" stopColor="#fff" />
          <stop offset="100%" stopOpacity="0" stopColor="#fff" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="194" height="104" rx="10" fill={color} stroke={strokeColor} strokeWidth="3" />
      <rect x="12" y="14" width="176" height="40" rx="8" fill="#f7f5f0" stroke={strokeColor} strokeWidth="2" />
      <rect x="12" y="60" width="176" height="37" rx="8" fill="#f1efe8" stroke={strokeColor} strokeWidth="2" />
      <rect x="3" y="3" width="194" height="50" rx="10" fill="url(#g-bed)" />
    </svg>
  );
}

function DeskSVG({ color = '#e0eedf', strokeColor = stroke }: { color?: string; strokeColor?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 180 100">
      <rect x="3" y="3" width="174" height="60" rx="10" fill={color} stroke={strokeColor} strokeWidth="3" />
      <rect x="18" y="65" width="18" height="30" rx="3" fill={fillMuted} stroke={strokeColor} strokeWidth="2" />
      <rect x="144" y="65" width="18" height="30" rx="3" fill={fillMuted} stroke={strokeColor} strokeWidth="2" />
    </svg>
  );
}

function ChairSVG({ color = '#dfe8f6', strokeColor = stroke }: { color?: string; strokeColor?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 90 90">
      <rect x="10" y="30" width="70" height="40" rx="8" fill={color} stroke={strokeColor} strokeWidth="3" />
      <rect x="20" y="10" width="50" height="18" rx="6" fill={fillMuted} stroke={strokeColor} strokeWidth="2" />
      <rect x="20" y="72" width="10" height="10" rx="2" fill={fillMuted} stroke={strokeColor} />
      <rect x="60" y="72" width="10" height="10" rx="2" fill={fillMuted} stroke={strokeColor} />
    </svg>
  );
}

const TypeToSVG: Record<Furn['type'], (props: { color?: string }) => JSX.Element> = {
  Bed: (p) => <BedSVG color={p.color} />,
  Desk: (p) => <DeskSVG color={p.color} />,
  Chair: (p) => <ChairSVG color={p.color} />,
  Dresser: (p) => <DeskSVG color={p.color} />,
  Bookshelf: (p) => <DeskSVG color={p.color} />,
  Nightstand: (p) => <ChairSVG color={p.color} />,
  Lamp: (p) => <ChairSVG color={p.color} />,
  Rug: (p) => <BedSVG color={p.color} />,
  Plant: (p) => <ChairSVG color={p.color} />,
};

export function FurnitureItem({
  data,
  onMove,
  onSelect,
}: {
  data: Furn;
  onMove: (id: string, nx: number, ny: number) => void;
  onSelect: (id: string) => void;
}) {
  const { id, x, y, w, h, rotation = 0, color = '#e9e5db', label, selected } = data;

  // Snap to 8px and clamp before writing
  const handleDragEnd = (_: any, info: { point: { x: number; y: number } }) => {
    const nx = Math.round(info.point.x / 8) * 8;
    const ny = Math.round(info.point.y / 8) * 8;
    onMove(id, nx, ny);
  };

  const WrapperStyle: CSSProperties = useMemo(
    () => ({
      width: w,
      height: h,
      borderRadius: 12,
      boxShadow: selected
        ? '0 10px 24px rgba(0,0,0,.18), 0 0 0 2px #5c0a0a inset'
        : '0 8px 18px rgba(0,0,0,.10)',
      background: '#fff',
      transform: `rotate(${rotation}deg)`,
      touchAction: 'none',
    }),
    [w, h, rotation, selected]
  );

  const SVG = TypeToSVG[data.type];

  return (
    <motion.div
      role="button"
      aria-label={label ?? data.type}
      initial={false}
      drag
      dragMomentum={false}
      dragElastic={0.12}
      onDragEnd={handleDragEnd}
      onMouseDown={() => onSelect(id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      style={{ position: 'absolute', left: x, top: y, ...WrapperStyle }}
      className="cursor-grab active:cursor-grabbing"
    >
      <div className="h-full w-full p-2">
        <SVG color={color} />
      </div>
      <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] text-[#666]">
        {label ?? data.type}
      </div>

      {/* color swatches when selected */}
      {selected && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm ring-1 ring-[#e5e5e5]">
          {['#e9e5db', '#e0eedf', '#dfe8f6', '#fde1d6', '#fff'].map((c) => (
            <button
              key={c}
              aria-label={`color ${c}`}
              onClick={(e) => {
                e.stopPropagation();
                // bubble up via onMove abuse: move by +0, +0 to trigger state change externally (keeps API tiny)
                onMove(id, x, y); // parent should update color when selected & swatch clicked
                (data as any).color = c;
              }}
              className="h-4 w-4 rounded-full border border-[#d5d5d5]"
              style={{ background: c }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
