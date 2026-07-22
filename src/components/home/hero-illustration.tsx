import { m, useReducedMotion } from "framer-motion";

/**
 * Custom geometric/isometric illustration for the hero section.
 * Features animated code blocks, floating elements, and a tech-inspired design.
 * Uses Blueprint palette colors (cobalt, teal, amber).
 */
export const HeroIllustration: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -8, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      };

  const pulseAnimation = shouldReduceMotion
    ? {}
    : {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]" aria-hidden="true">
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-200 dark:text-gray-800"
            />
          </pattern>
          <linearGradient id="cobaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3568e8" />
            <stop offset="100%" stopColor="#2a52c4" />
          </linearGradient>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2aab9a" />
            <stop offset="100%" stopColor="#1f8f80" />
          </linearGradient>
          <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        <rect width="600" height="500" fill="url(#grid)" />

        {/* Main isometric cube - center piece */}
        <g transform="translate(300, 220)">
          {/* Back face */}
          <path
            d="M0,-80 L120,-20 L0,40 L-120,-20 Z"
            fill="#2a52c4"
            opacity="0.3"
          />
          {/* Left face */}
          <path
            d="M-120,-20 L0,40 L0,120 L-120,60 Z"
            fill="#3568e8"
            opacity="0.5"
          />
          {/* Right face */}
          <path
            d="M120,-20 L0,40 L0,120 L120,60 Z"
            fill="#4a7af5"
            opacity="0.4"
          />
          {/* Top face */}
          <path
            d="M0,-80 L120,-20 L0,40 L-120,-20 Z"
            fill="#5a8aff"
            opacity="0.6"
          />
        </g>

        {/* Floating code block - left */}
        <m.g
          animate={floatAnimation}
          style={{ originX: "0%", originY: "0%" }}
        >
          <rect
            x="60"
            y="120"
            width="140"
            height="100"
            rx="8"
            fill="white"
            className="dark:fill-gray-900"
            stroke="#3568e8"
            strokeWidth="1"
            opacity="0.9"
          />
          <rect x="70" y="130" width="40" height="6" rx="3" fill="#3568e8" opacity="0.7" />
          <rect x="70" y="142" width="80" height="4" rx="2" fill="#2aab9a" opacity="0.5" />
          <rect x="70" y="152" width="60" height="4" rx="2" fill="#6b7280" opacity="0.4" />
          <rect x="70" y="162" width="100" height="4" rx="2" fill="#f59e0b" opacity="0.6" />
          <rect x="70" y="172" width="70" height="4" rx="2" fill="#3568e8" opacity="0.5" />
          <rect x="70" y="182" width="90" height="4" rx="2" fill="#6b7280" opacity="0.4" />
          <rect x="70" y="192" width="50" height="4" rx="2" fill="#2aab9a" opacity="0.5" />
        </m.g>

        {/* Floating terminal block - right */}
        <m.g
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <rect
            x="400"
            y="160"
            width="150"
            height="90"
            rx="8"
            fill="white"
            className="dark:fill-gray-900"
            stroke="#2aab9a"
            strokeWidth="1"
            opacity="0.9"
          />
          <rect x="400" y="160" width="150" height="24" rx="8" fill="#1a2332" opacity="0.1" />
          <circle cx="414" cy="172" r="4" fill="#ef4444" opacity="0.7" />
          <circle cx="428" cy="172" r="4" fill="#f59e0b" opacity="0.7" />
          <circle cx="442" cy="172" r="4" fill="#22c55e" opacity="0.7" />
          <rect x="410" y="196" width="60" height="4" rx="2" fill="#2aab9a" opacity="0.6" />
          <rect x="410" y="206" width="120" height="4" rx="2" fill="#3568e8" opacity="0.5" />
          <rect x="410" y="216" width="80" height="4" rx="2" fill="#6b7280" opacity="0.4" />
          <rect x="410" y="226" width="100" height="4" rx="2" fill="#f59e0b" opacity="0.6" />
        </m.g>

        {/* Floating circle elements */}
        <m.circle
          cx="120"
          cy="350"
          r="30"
          fill="#2aab9a"
          opacity="0.15"
          animate={pulseAnimation}
        />
        <m.circle
          cx="480"
          cy="320"
          r="20"
          fill="#3568e8"
          opacity="0.15"
          animate={shouldReduceMotion ? {} : { ...pulseAnimation, transition: { ...pulseAnimation.transition, delay: 1 } }}
        />
        <m.circle
          cx="540"
          cy="400"
          r="15"
          fill="#f59e0b"
          opacity="0.2"
          animate={shouldReduceMotion ? {} : { ...pulseAnimation, transition: { ...pulseAnimation.transition, delay: 0.5 } }}
        />

        {/* Connection lines */}
        <path
          d="M200,170 Q250,200 300,220"
          stroke="#3568e8"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="4 4"
        />
        <path
          d="M400,200 Q350,210 300,220"
          stroke="#2aab9a"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          strokeDasharray="4 4"
        />

        {/* Small floating squares */}
        <m.rect
          x="180"
          y="380"
          width="12"
          height="12"
          rx="2"
          fill="#f59e0b"
          opacity="0.3"
          animate={shouldReduceMotion ? {} : { rotate: [0, 90, 0], transition: { duration: 8, repeat: Infinity } }}
        />
        <m.rect
          x="500"
          y="250"
          width="10"
          height="10"
          rx="2"
          fill="#3568e8"
          opacity="0.3"
          animate={shouldReduceMotion ? {} : { rotate: [0, -90, 0], transition: { duration: 6, repeat: Infinity, delay: 2 } }}
        />

        {/* Bracket symbols */}
        <text
          x="150"
          y="280"
          fill="#3568e8"
          opacity="0.2"
          fontSize="32"
          fontFamily="monospace"
        >
          {"{ }"}
        </text>
        <text
          x="420"
          y="420"
          fill="#2aab9a"
          opacity="0.2"
          fontSize="24"
          fontFamily="monospace"
        >
          {"</>"}
        </text>
      </svg>
    </div>
  );
};
