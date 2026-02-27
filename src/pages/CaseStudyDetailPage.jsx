import { useParams, Link, useOutletContext } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { caseStudies } from '../content/caseStudies'
import CaseStudyHeader from '../components/case-study/CaseStudyHeader'
import MetaBar from '../components/case-study/MetaBar'

// Content components keyed by slug
import AliveAndThriveContent from '../content/case-studies/alive-and-thrive'

const contentMap = {
  'alive-and-thrive': AliveAndThriveContent,
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams()
  const { openContactModal } = useOutletContext()

  const caseStudy = caseStudies.find((cs) => cs.slug === slug)

  if (!caseStudy) {
    return (
      <div className="mx-auto max-w-[1100px] px-10 max-md:px-4 py-20 text-center">
        <h1 className="font-bold text-2xl">Case study not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">
          &larr; Back to home
        </Link>
      </div>
    )
  }

  const ContentComponent = contentMap[slug]

  return (
    <article className="py-5 pb-10">
      <Helmet>
        <title>{caseStudy.meta.title}</title>
        <meta name="description" content={caseStudy.meta.description} />
        <meta property="og:title" content={caseStudy.meta.title} />
        <meta property="og:description" content={caseStudy.meta.description} />
        <meta property="og:type" content={caseStudy.meta.ogType} />
        <meta property="og:url" content={caseStudy.meta.ogUrl} />
        <meta property="og:image" content={caseStudy.meta.ogImage} />
      </Helmet>

      <div className="mx-auto max-w-[1100px] px-10 max-md:px-4">
        <Link
          to="/#case-studies"
          className="inline-block text-sm text-primary mb-5"
        >
          &larr; All case studies
        </Link>

        <CaseStudyHeader
          title={caseStudy.title}
          subtitle={caseStudy.subtitle}
          tags={caseStudy.tags}
          clientLogo={caseStudy.clientLogo}
          clientLogoAlt={caseStudy.clientLogoAlt}
        />

        <MetaBar items={caseStudy.metaBar} />

        {ContentComponent && <ContentComponent />}

        <div className="text-center py-7">
          <p className="text-[1.1rem] mb-3">Have a similar challenge?</p>
          <button
            type="button"
            onClick={openContactModal}
            className="bg-primary text-white px-5 py-2 rounded text-sm font-normal cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Get in touch
          </button>
        </div>
      </div>
    </article>
  )
}
