'use client'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="w-full py-8 xl:px-[150px] lg:px-[150px] px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-xs tracking-widest text-slate-500 uppercase font-medium font-sans">
            EVENTIGO · BUILT FOR MODERN EVENTS
          </div>
          <div className="flex items-center gap-8 font-sans text-main">
            <p
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Code of Conduct
            </p>
            <p
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Sponsors
            </p>
            <p
              className="text-sm text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Press Kit
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
