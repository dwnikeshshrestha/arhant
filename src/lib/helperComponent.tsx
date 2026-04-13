export function SectionBadge({
  label,
  color,
  centered = false,
}: {
  label: string;
  color: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
    >
      <div className="w-10 h-[2px] bg-primary rounded-full" />
      <span
        className="text-primary text-xs font-bold uppercase tracking-widest"
        // style={{ color }}
      >
        {label}
      </span>
      {/* <div className="w-8 h-[2px] rounded-full" style={{ background: color }} /> */}
    </div>
  );
}