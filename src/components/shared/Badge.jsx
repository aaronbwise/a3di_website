export default function Badge({ label }) {
  return (
    <span className="inline-block bg-primary text-white text-[0.7rem] font-normal px-2 py-0.5 rounded-sm">
      {label}
    </span>
  )
}
