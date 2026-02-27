import Badge from '../shared/Badge'

export default function CaseStudyHeader({ title, subtitle, tags, clientLogo, clientLogoAlt }) {
  return (
    <header className="flex justify-between items-start gap-7 mb-6 max-md:flex-col max-md:items-center">
      <div>
        <h1 className="font-bold text-[clamp(1.5rem,4vw,2.2rem)]">{title}</h1>
        <p className="text-[1.05rem] text-primary mb-3">{subtitle}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </div>
      </div>
      {clientLogo && (
        <div className="shrink-0">
          <img
            src={clientLogo}
            alt={clientLogoAlt}
            className="w-[160px] max-w-[160px] max-md:w-[100px] object-contain opacity-85"
          />
        </div>
      )}
    </header>
  )
}
