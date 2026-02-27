export default function CaseStudySection({ title, children }) {
  return (
    <section className="mb-7">
      <h2 className="font-bold text-[1.3rem] mb-3">{title}</h2>
      {children}
    </section>
  )
}
