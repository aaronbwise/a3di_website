import { useEffect, useRef, useState, useCallback } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3075ff',
    primaryTextColor: '#fff',
    primaryBorderColor: '#3075ff',
    lineColor: '#0d1d3f',
    secondaryColor: '#e8f0ff',
    tertiaryColor: '#e8f0ff',
    fontFamily: 'Montserrat',
    fontSize: '18px',
    nodePadding: 16,
  },
})

let renderCounter = 0

export default function MermaidDiagram({ chart }) {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const renderChart = useCallback(async () => {
    if (!containerRef.current) return

    // Unique ID per render call — avoids StrictMode duplicate-ID crash
    renderCounter += 1
    const uniqueId = `mermaid-diagram-${renderCounter}`

    try {
      const { svg } = await mermaid.render(uniqueId, chart)
      if (containerRef.current) {
        containerRef.current.innerHTML = svg
        setIsLoaded(true)
      }
    } catch (err) {
      // Mermaid creates a broken element on failure — clean it up
      const broken = document.getElementById(uniqueId)
      broken?.remove()
      console.error('Mermaid render failed:', err)
    }
  }, [chart])

  useEffect(() => {
    renderChart()
  }, [renderChart])

  return (
    <div
      ref={containerRef}
      className={`mermaid-wrapper my-6 text-center ${isLoaded ? '' : 'min-h-[200px]'}`}
    />
  )
}
