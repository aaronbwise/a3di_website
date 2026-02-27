import { Link } from 'react-router-dom'
import Badge from './Badge'

export default function CaseStudyCard({ slug, title, subtitle, tags, clientLogo, clientLogoAlt }) {
  return (
    <Link
      to={`/case-studies/${slug}`}
      className="group block bg-white rounded-md border-l-4 border-primary px-7 py-6 max-md:px-5 max-md:py-5 no-underline transition-all duration-200 hover:shadow-[0_3px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-6 max-md:flex-col max-md:gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[1.15rem] mb-1 text-secondary">{title}</h3>
          <p className="text-[0.9rem] text-secondary/70 mb-3">{subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between self-stretch max-md:flex-row max-md:items-center max-md:w-full max-md:justify-between">
          {clientLogo && (
            <img
              src={clientLogo}
              alt={clientLogoAlt}
              className="w-auto max-w-[90px] max-h-[35px] object-contain opacity-50"
            />
          )}
          <span className="text-[0.85rem] text-primary font-normal mt-auto group-hover:translate-x-1 transition-transform duration-200">
            Read more &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
