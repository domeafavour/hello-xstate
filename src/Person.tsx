export interface PersonProps {
  walking?: boolean;
}

export function Person({ walking = false }: PersonProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 80"
      width="64"
      height="80"
      aria-label={walking ? "Walking" : "Standing"}
    >
      {/* Hair */}
      <ellipse cx="32" cy="10" rx="11" ry="7" fill="#3b2e2a" />
      {/* Head */}
      <circle
        cx="32"
        cy="16"
        r="10"
        fill="#ffcc99"
        stroke="#e0b97f"
        strokeWidth="1.5"
      />
      {/* Ears */}
      <ellipse cx="21.5" cy="16" rx="2" ry="3" fill="#ffcc99" />
      <ellipse cx="42.5" cy="16" rx="2" ry="3" fill="#ffcc99" />
      {/* Face: Eyes, Smile */}
      <ellipse cx="28" cy="15" rx="1.2" ry="1.5" fill="#222" />
      <ellipse cx="36" cy="15" rx="1.2" ry="1.5" fill="#222" />
      <path
        d="M28 20 Q32 24 36 20"
        stroke="#b97a56"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Neck */}
      <rect x="29" y="25" width="6" height="6" rx="2" fill="#ffcc99" />
      {/* Body (rounded) */}
      <rect
        x="22"
        y="30"
        width="20"
        height="28"
        rx="10"
        fill="#3399ff"
        stroke="#1a5fb4"
        strokeWidth="2"
      />
      {/* Shirt collar */}
      <ellipse cx="32" cy="30" rx="7" ry="3" fill="#fff" opacity="0.7" />
      {/* Left Arm */}
      <g>
        <line
          x1="22"
          y1="36"
          x2="14"
          y2="56"
          stroke="#ffcc99"
          strokeWidth="4"
          strokeLinecap="round"
        >
          {walking && (
            <animate
              attributeName="x2"
              values="14;8;14"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="y2"
              values="56;46;56"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        {/* Left Hand */}
        <circle cx="14" cy="56" r="2.2" fill="#ffcc99">
          {walking && (
            <animate
              attributeName="cx"
              values="14;8;14"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="cy"
              values="56;46;56"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>
      {/* Right Arm */}
      <g>
        <line
          x1="42"
          y1="36"
          x2="50"
          y2="56"
          stroke="#ffcc99"
          strokeWidth="4"
          strokeLinecap="round"
        >
          {walking && (
            <animate
              attributeName="x2"
              values="50;56;50"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="y2"
              values="56;46;56"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        {/* Right Hand */}
        <circle cx="50" cy="56" r="2.2" fill="#ffcc99">
          {walking && (
            <animate
              attributeName="cx"
              values="50;56;50"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="cy"
              values="56;46;56"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>
      {/* Left Leg */}
      <g>
        <line
          x1="27"
          y1="58"
          x2="22"
          y2="78"
          stroke="#b97a56"
          strokeWidth="4"
          strokeLinecap="round"
        >
          {walking && (
            <animate
              attributeName="x2"
              values="22;14;22"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="y2"
              values="78;68;78"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        {/* Left Shoe */}
        <ellipse cx="22" cy="78" rx="3.2" ry="2" fill="#333">
          {walking && (
            <animate
              attributeName="cx"
              values="22;14;22"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="cy"
              values="78;68;78"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>
      </g>
      {/* Right Leg */}
      <g>
        <line
          x1="37"
          y1="58"
          x2="42"
          y2="78"
          stroke="#b97a56"
          strokeWidth="4"
          strokeLinecap="round"
        >
          {walking && (
            <animate
              attributeName="x2"
              values="42;50;42"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="y2"
              values="78;68;78"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
        {/* Right Shoe */}
        <ellipse cx="42" cy="78" rx="3.2" ry="2" fill="#333">
          {walking && (
            <animate
              attributeName="cx"
              values="42;50;42"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
          {walking && (
            <animate
              attributeName="cy"
              values="78;68;78"
              keyTimes="0;0.5;1"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </ellipse>
      </g>
    </svg>
  );
}
