import SocialLinks from '../shared/SocialLinks'
import ArrowUpCircleIcon from '../../icons/ArrowUpCircleIcon'

export default function Footer() {
  return (
    <footer className="bg-secondary p-7 text-center text-white">
      <div className="mx-auto max-w-[1100px] px-10 max-md:px-4 grid grid-cols-3 max-md:grid-cols-1 gap-5 items-center">
        <div>
          <p className="text-white"><strong>Advanced Analytics for Actionable Development Insights</strong></p>
          <p className="text-white">Copyright &copy; {new Date().getFullYear()}</p>
        </div>
        <SocialLinks />
        <div>
          <a
            href="#"
            aria-label="Back to top"
            className="inline-flex text-white hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <ArrowUpCircleIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
