import SectionHeading from '../shared/SectionHeading'
import CaseStudyCard from '../shared/CaseStudyCard'
import { caseStudies } from '../../content/caseStudies'

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-7 bg-light">
      <div className="mx-auto max-w-[1100px] px-10 max-md:px-4">
        <SectionHeading
          title="Case Studies"
          subtitle="Selected examples of how A3DI has helped organisations turn data into evidence."
        />
        <div className="grid grid-cols-1 gap-7 justify-center p-0">
          {caseStudies.map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              slug={cs.slug}
              title={cs.title}
              subtitle={cs.subtitle}
              tags={cs.tags}
              clientLogo={cs.clientLogo}
              clientLogoAlt={cs.clientLogoAlt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
