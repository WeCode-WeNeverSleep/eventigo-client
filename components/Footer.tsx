'use client'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-xs tracking-widest text-slate-500 uppercase font-medium font-sans">
            EVENTIGO · BUILT FOR MODERN EVENTS
          </div>
          <div className="flex items-center gap-8 font-sans text-main">
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              Code of Conduct
            </a>
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              Sponsors
            </a>
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
            >
              Press Kit
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
