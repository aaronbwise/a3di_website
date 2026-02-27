export default function CodeBlock({ filename, code }) {
  return (
    <div className="bg-[#1e1e2e] rounded-lg overflow-hidden my-6">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2a2a3c]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        {filename && (
          <span className="ml-2 text-xs text-[#888] font-mono">{filename}</span>
        )}
      </div>
      <pre className="m-0 px-5 py-4 max-md:px-3.5 max-md:py-3 overflow-x-auto">
        <code className="font-mono text-[0.8rem] leading-relaxed text-[#cdd6f4]">
          {code}
        </code>
      </pre>
    </div>
  )
}
