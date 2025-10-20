interface WismaLogoProps {
  className?: string;
  size?: number;
}

export const WismaLogo = ({ className = "", size = 32 }: WismaLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with tropical turquoise */}
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="hsl(181, 100%, 21%)"
        stroke="hsl(181, 100%, 15%)"
        strokeWidth="1"
      />

      {/* Building structure with warm beige */}
      <rect
        x="8"
        y="10"
        width="16"
        height="14"
        fill="hsl(42, 56%, 89%)"
        stroke="hsl(42, 56%, 70%)"
        strokeWidth="0.8"
      />

      {/* Roof with golden yellow accent */}
      <polygon
        points="7,10 16,4 25,10"
        fill="hsl(45, 92%, 48%)"
        stroke="hsl(45, 92%, 35%)"
        strokeWidth="0.8"
      />

      {/* Windows with turquoise */}
      <rect
        x="10"
        y="13"
        width="3"
        height="3"
        fill="hsl(181, 100%, 35%)"
        stroke="hsl(181, 100%, 21%)"
        strokeWidth="0.3"
      />
      <rect
        x="14"
        y="13"
        width="3"
        height="3"
        fill="hsl(181, 100%, 35%)"
        stroke="hsl(181, 100%, 21%)"
        strokeWidth="0.3"
      />
      <rect
        x="18"
        y="13"
        width="3"
        height="3"
        fill="hsl(181, 100%, 35%)"
        stroke="hsl(181, 100%, 21%)"
        strokeWidth="0.3"
      />

      <rect
        x="10"
        y="17"
        width="3"
        height="3"
        fill="hsl(181, 100%, 35%)"
        stroke="hsl(181, 100%, 21%)"
        strokeWidth="0.3"
      />
      <rect
        x="14"
        y="17"
        width="3"
        height="3"
        fill="hsl(181, 100%, 35%)"
        stroke="hsl(181, 100%, 21%)"
        strokeWidth="0.3"
      />
      <rect
        x="18"
        y="17"
        width="3"
        height="3"
        fill="hsl(181, 100%, 35%)"
        stroke="hsl(181, 100%, 21%)"
        strokeWidth="0.3"
      />

      {/* Door with warm brown */}
      <rect
        x="14"
        y="20"
        width="4"
        height="4"
        fill="hsl(30, 40%, 35%)"
        stroke="hsl(30, 40%, 25%)"
        strokeWidth="0.3"
      />
      <circle cx="16" cy="22" r="0.4" fill="hsl(45, 92%, 48%)" />
    </svg>
  );
};

