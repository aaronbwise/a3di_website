export default function HeroSection({ onLearnMore }) {
  function handleClick(e) {
    e.preventDefault()
    const el = document.getElementById('services')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="showcase"
      className="relative min-h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/img/showcase1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/55">
        <div className="mx-auto max-w-[1100px] px-10 max-md:px-4 grid grid-cols-2 max-md:grid-cols-1 items-center justify-center h-full">
          <div className="text-center mt-10 mb-10 max-md:col-span-1">
            <h1 className="text-[clamp(1.75rem,5vw,3.125rem)] font-bold text-white">
              Better results through data
            </h1>
            <p className="my-5 text-[20px] font-bold text-white">
              A3DI helps development &amp; humanitarian organisations use data to generate
              evidence-based, actionable insights for their programmes
            </p>
            <a
              href="#services"
              onClick={handleClick}
              className="inline-block bg-primary text-white px-5 py-2 rounded text-sm hover:bg-primary/90 transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
