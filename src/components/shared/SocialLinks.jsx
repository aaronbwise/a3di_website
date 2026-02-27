import LinkedInIcon from '../../icons/LinkedInIcon'
import GitHubIcon from '../../icons/GitHubIcon'
import TwitterIcon from '../../icons/TwitterIcon'

const links = [
  { href: 'https://www.linkedin.com/in/aaronbwise/', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://github.com/aaronbwise', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://twitter.com/AA3di', label: 'Twitter', Icon: TwitterIcon },
]

export default function SocialLinks() {
  return (
    <div className="flex justify-center gap-2">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-white hover:text-primary transition-colors"
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
