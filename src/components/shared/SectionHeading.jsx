export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="max-w-[500px] mx-auto text-center my-2.5">
      <h2 className="text-[30px] font-bold">{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
