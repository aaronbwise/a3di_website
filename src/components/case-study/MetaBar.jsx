export default function MetaBar({ items }) {
  return (
    <div className="flex flex-wrap gap-y-5 gap-x-10 max-md:gap-y-3 max-md:gap-x-5 py-5 border-y border-[#e0e0e0] mb-7">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col">
          <span className="text-[0.7rem] uppercase tracking-wide text-primary mb-0.5">
            {label}
          </span>
          <span className="text-[0.9rem] text-secondary">{value}</span>
        </div>
      ))}
    </div>
  )
}
