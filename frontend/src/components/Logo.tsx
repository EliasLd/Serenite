type LogoProps = {
  size?: string;
  variant?: "full" | "compact";
  className?: string;
};

export default function Logo({ size = "text-3xl", variant = "full", className = "" }: LogoProps) {
  if (variant === "compact") {
    return (
      <span className={`font-dmmono font-bold ${size} ${className}`}>
        <span className="text-white">S</span>
        <span className="text-sereniteAccent inline-block" style={{ transform: "rotate(-10deg)" }}>
          É
        </span>
      </span>
    );
  }
  return (
    <span className={`font-dmmono font-bold ${size} ${className}`}>
      <span className="text-white">Serenit</span>
      <span className="text-sereniteAccent inline-block" style={{ transform: "rotate(-10deg)" }}>
        É
      </span>
    </span>
  );
}
