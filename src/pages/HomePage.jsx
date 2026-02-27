import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { siteMetadata } from '../content/metadata'
import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
import CaseStudiesSection from '../components/sections/CaseStudiesSection'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [hash])

  return (
    <>
      <Helmet>
        <title>{siteMetadata.defaultTitle}</title>
        <meta name="description" content={siteMetadata.defaultDescription} />
        <meta property="og:title" content={siteMetadata.defaultTitle} />
        <meta property="og:description" content={siteMetadata.defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteMetadata.siteUrl} />
        <meta property="og:image" content={siteMetadata.defaultOgImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteMetadata.defaultTitle} />
        <meta name="twitter:description" content={siteMetadata.defaultDescription} />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
    </>
  )
}
