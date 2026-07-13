export function HeroIllustration() {
  return (
    <div
      className="animate-hero-in animate-hero-delay-2 relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:ml-auto lg:max-w-none"
      aria-hidden
    >
      <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-[#9945ff]/25 via-transparent to-[#f0b90b]/15 blur-3xl opacity-80" />
      <div className="animate-float">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-auto w-full drop-shadow-2xl"
        >
          <defs>
            <linearGradient id="ss-ring" x1="80" y1="60" x2="320" y2="340" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9945ff" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#c4b5fd" stopOpacity="0.25" />
              <stop offset="1" stopColor="#f0b90b" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="ss-bar-a" x1="0" y1="1" x2="0" y2="0">
              <stop stopColor="#7c3aed" />
              <stop offset="1" stopColor="#c4b5fd" />
            </linearGradient>
            <linearGradient id="ss-bar-b" x1="0" y1="1" x2="0" y2="0">
              <stop stopColor="#9945ff" />
              <stop offset="1" stopColor="#e9d5ff" />
            </linearGradient>
            <linearGradient id="ss-bar-c" x1="0" y1="1" x2="0" y2="0">
              <stop stopColor="#d97706" />
              <stop offset="1" stopColor="#fcd535" />
            </linearGradient>
            <linearGradient id="ss-coin" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#f0b90b" />
              <stop offset="1" stopColor="#fcd535" />
            </linearGradient>
            <filter id="ss-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="200" cy="200" r="148" stroke="url(#ss-ring)" strokeWidth="1.5" opacity="0.7" />
          <circle
            className="animate-orbit-slow"
            cx="200"
            cy="200"
            r="118"
            stroke="#ffffff"
            strokeOpacity="0.06"
            strokeWidth="1"
            strokeDasharray="6 10"
            fill="none"
          />
          <circle
            className="animate-pulse-ring"
            cx="200"
            cy="200"
            r="88"
            stroke="#9945ff"
            strokeOpacity="0.18"
            strokeWidth="1"
            fill="none"
          />

          <g opacity="0.35">
            <path d="M200 52v48M200 300v48M52 200h48M300 200h48" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
            <path
              d="M92 92l34 34M274 274l34 34M308 92l-34 34M126 274l-34 34"
              stroke="#f0b90b"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>

          <rect x="118" y="138" width="164" height="124" rx="18" fill="#12161c" stroke="#ffffff" strokeOpacity="0.12" />
          <rect x="134" y="154" width="88" height="8" rx="4" fill="#ffffff" fillOpacity="0.18" />
          <rect x="134" y="172" width="56" height="6" rx="3" fill="#ffffff" fillOpacity="0.08" />

          <rect x="134" y="194" width="132" height="14" rx="7" fill="#1a1f27" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="134" y="216" width="132" height="14" rx="7" fill="#1a1f27" stroke="#9945ff" strokeOpacity="0.35" />
          <circle cx="144" cy="223" r="4" fill="#9945ff" fillOpacity="0.8" />

          <rect x="134" y="238" width="132" height="1" fill="#ffffff" fillOpacity="0.08" />
          <text x="134" y="252" fill="#848e9c" fontSize="10" fontFamily="system-ui, sans-serif">
            Pool
          </text>
          <text x="266" y="252" fill="#f0b90b" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="end">
            0.42 SOL
          </text>

          <rect x="72" y="248" width="56" height="56" rx="16" fill="#1a1f27" stroke="#9945ff" strokeOpacity="0.35" />
          <path
            d="M88 272c0-6.627 5.373-12 12-12h12c6.627 0 12 5.373 12 12v4H88v-4z"
            stroke="#c4b5fd"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M94 276h28" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="264" r="6" stroke="#9945ff" strokeWidth="2" />

          <g className="animate-coin-pulse" filter="url(#ss-glow)">
            <circle cx="300" cy="118" r="30" fill="url(#ss-coin)" fillOpacity="0.95" />
            <text
              x="300"
              y="124"
              fill="#0b0e11"
              fontSize="14"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
            >
              SOL
            </text>
          </g>

          <path
            d="M128 276 C168 248, 228 210, 272 140"
            stroke="#f0b90b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 7"
            className="animate-dash-flow"
            opacity="0.75"
          />
          <polygon points="272,140 264,152 278,148" fill="#f0b90b" opacity="0.85" />

          <rect x="286" y="268" width="14" height="52" rx="4" fill="url(#ss-bar-a)" />
          <rect x="306" y="248" width="14" height="72" rx="4" fill="url(#ss-bar-b)" />
          <rect x="326" y="228" width="14" height="92" rx="4" fill="url(#ss-bar-c)" />

          <circle cx="200" cy="200" r="5" fill="#f0b90b" />
          <circle cx="200" cy="200" r="12" stroke="#f0b90b" strokeOpacity="0.35" fill="none" />
        </svg>
      </div>
    </div>
  );
}
