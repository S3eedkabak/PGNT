// Adapted from Spectrum UI Animated SVG Chart (Apache-2.0).
// Replaces the demo growth curve with counts derived from the supplied training catalogue.
import { motion, useReducedMotion } from "framer-motion";
export function Chart({ data }: { data: { label: string; value: number }[] }) {
  const reduce = useReducedMotion();
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="catalog-chart">
      <svg
        role="img"
        aria-labelledby="chart-title"
        viewBox={`0 0 500 ${data.length * 45 + 15}`}
      >
        <title id="chart-title">Catalogue courses by training area</title>
        {data.map((d, i) => (
          <g key={d.label}>
            <text x="0" y={i * 45 + 26} fill="currentColor" fontSize="12">
              {d.label}
            </text>
            <motion.rect
              x="145"
              y={i * 45 + 10}
              height="24"
              rx="3"
              fill="#11796f"
              initial={{ width: reduce ? (d.value / max) * 300 : 0 }}
              animate={{ width: (d.value / max) * 300 }}
              transition={{
                duration: reduce ? 0 : 0.6,
                delay: reduce ? 0 : i * 0.06,
              }}
            />
            <text
              x={155 + (d.value / max) * 300}
              y={i * 45 + 27}
              fill="currentColor"
              fontSize="12"
            >
              {d.value}
            </text>
          </g>
        ))}
      </svg>
      <p className="small">
        Catalogue distribution from the supplied Training List. Not live
        enrolment data.
      </p>
    </div>
  );
}
