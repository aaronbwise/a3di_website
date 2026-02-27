import { useState, useEffect } from 'react'
import { loadGA } from '../../utils/analytics'

export default function CookieConsent() {
  const [status, setStatus] = useState('unknown')

  useEffect(() => {
    const match = document.cookie.match(/cookie_consent=([^;]+)/)
    if (match?.[1] === 'accepted') {
      loadGA()
      setStatus('accepted')
    } else if (match?.[1] === 'declined') {
      setStatus('declined')
    } else {
      setStatus('show')
    }
  }, [])

  function accept() {
    document.cookie = 'cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax'
    loadGA()
    setStatus('accepted')
  }

  function decline() {
    document.cookie = 'cookie_consent=declined; max-age=31536000; path=/; SameSite=Lax'
    setStatus('declined')
  }

  if (status !== 'show') return null

  return (
    <div className="fixed bottom-0 inset-x-0 bg-secondary text-white p-4 px-6 flex flex-wrap justify-center items-center gap-4 z-[9999]">
      <p className="text-white m-0 text-sm">
        This site uses cookies for analytics. Do you consent to the use of cookies?
      </p>
      <button
        onClick={accept}
        className="px-5 py-2 bg-primary text-white rounded text-sm border-none cursor-pointer font-[inherit]"
      >
        Accept
      </button>
      <button
        onClick={decline}
        className="px-5 py-2 bg-transparent text-white border border-white rounded text-sm cursor-pointer font-[inherit]"
      >
        Decline
      </button>
    </div>
  )
}
