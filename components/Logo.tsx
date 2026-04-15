export default function Logo({ size = "default" }: { variant?: string; size?: "default" | "large" }) {
  const isLarge = size === "large";

  return (
    <div className="flex items-center gap-1.5">
      <span className={`${isLarge ? "text-xl" : "text-base"} font-bold tracking-tight text-gray-900`}>
        JobsAIWillReplace
      </span>
      <span className={`${isLarge ? "text-xl" : "text-base"} font-bold text-red-600`}>.</span>
    </div>
  );
}
