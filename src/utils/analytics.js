let loaded = false

export function loadGA() {
  if (loaded) return
  loaded = true

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }

  const s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-431J69QZ4M'
  document.head.appendChild(s)

  gtag('js', new Date())
  gtag('config', 'G-431J69QZ4M')
}
