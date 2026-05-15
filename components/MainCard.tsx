'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight, faBroadcastTower,
    faSmile,
} from '@fortawesome/free-solid-svg-icons'

export function MainCard() {
    return (
        <div className="relative overflow-hidden rounded-xl border border-border bg-background p-10 md:p-16">

            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-purple-900/10 -z-10" />

            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs tracking-widest text-red-400 uppercase font-medium">
          Welcome to EventiGO
        </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-main">
                Hello, builder.
                <br />
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Find your next event.
        </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-text-muted mb-10 max-w-2xl leading-relaxed">
                EventGO is the home for conferences, workshops and meetups curated for people building the modern web.
                Browse what's live now and what's coming up below.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">

                <button className="flex items-center gap-2 bg-primary hover:opacity-90 text-black font-semibold py-3 px-6 rounded-full transition-colors">
                    Browse events
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </button>

                <button className="flex items-center gap-2 border border-border hover:border-primary text-text-main hover:text-primary font-semibold py-3 px-6 rounded-full transition-colors">
                    <FontAwesomeIcon icon={faBroadcastTower} className="w-4 h-4" />
                    What's live right now
                </button>

            </div>
        </div>
    )
}