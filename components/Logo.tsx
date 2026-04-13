export default function Logo({ variant = "dark", size = "default" }: { variant?: "dark" | "light" | "red"; size?: "default" | "large" }) {
  const isLarge = size === "large";
  const iconSize = isLarge ? 48 : 32;
  const textClass = isLarge ? "text-base" : "text-xs";
  const boldClass = isLarge ? "text-2xl" : "text-lg";

  const colors = {
    dark: { jobs: "text-zinc-400", bold: "text-white", icon: "#ef4444", iconStroke: "#ef4444", dot: "#ef4444" },
    light: { jobs: "text-zinc-500", bold: "text-zinc-900", icon: "#ef4444", iconStroke: "#ef4444", dot: "#ef4444" },
    red: { jobs: "text-white/80", bold: "text-white", icon: "#ffffff", iconStroke: "#ffffff", dot: "#ffffff" },
  };

  const c = colors[variant];

  return (
    <div className="flex items-center gap-2">
      {/* Briefcase icon with arrow */}
      <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Briefcase body */}
        <rect x="4" y="16" width="40" height="26" rx="3" stroke={c.iconStroke} strokeWidth="2.5" fill="none" />
        {/* Handle */}
        <path d="M16 16V12C16 9.79086 17.7909 8 20 8H28C30.2091 8 32 9.79086 32 12V16" stroke={c.iconStroke} strokeWidth="2.5" fill="none" />
        {/* Down arrow */}
        <path d="M24 22V34" stroke={c.icon} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M19 30L24 35L29 30" stroke={c.icon} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className={`${textClass} font-medium tracking-[0.2em] uppercase ${c.jobs}`}>Jobs</span>
        <span className={`${boldClass} font-extrabold tracking-tight ${c.bold}`}>
          AI WILL REPLACE<span style={{ color: c.dot }}>.</span>
        </span>
      </div>
    </div>
  );
}
