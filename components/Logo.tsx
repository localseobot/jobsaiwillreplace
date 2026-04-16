export default function Logo({ size = "default" }: { variant?: string; size?: "default" | "large" | "hero" }) {
  const sizeClasses = {
    default: "text-lg",
    large: "text-2xl",
    hero: "text-5xl md:text-7xl lg:text-8xl",
  };

  return (
    <span
      className={`${sizeClasses[size]} font-semibold tracking-tight text-brand-black inline-flex flex-wrap`}
      style={{ fontFamily: "var(--font-inter-tight), system-ui, sans-serif", fontWeight: 600 }}
    >
      <span className="relative inline-block">
        jobs
        <span className="logo-strike" aria-hidden="true" />
      </span>
      &nbsp;ai will replace
    </span>
  );
}
