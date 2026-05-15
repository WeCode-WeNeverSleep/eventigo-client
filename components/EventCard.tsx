'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faLocationDot,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

import { EventCardProps } from '@/types/event'
import { isLiveStatus, formatEventDate } from '@/utils/eventUtils'

export function EventCard({
    startDate,
    endDate,
    title,
    description,
    time,
    location,
    cta,
}: EventCardProps) {
    const isLive = isLiveStatus(startDate, endDate);
    const { day, month } = formatEventDate(startDate)
    return (
        <div className="border border-border rounded-4xl p-6 bg-background hover:bg-surface transition-colors h-full flex flex-col w-full max-w-sm px-4">
            <div className="flex items-start justify-between mb-8">
                <div className='border-border border-2 py-2 px-5 rounded-2xl flex flex-col items-center'>
                    <h3 className="text-3xl font-bold text-primary">{day}</h3>
                    <h3 className='text-text-muted font-thin'>{month}</h3>
                </div>
                <span
                    className={`text-xs tracking-widest uppercase flex items-center gap-2 rounded-3xl border border-border px-3 py-1 ${isLive
                            ? 'text-live bg-red-500/5'
                            : 'text-text-muted'
                        }`}
                >
                    {isLive && (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                    {isLive ? 'LIVE' : 'UPCOMING'}
                </span>
            </div>

            <div className="flex-1 mb-6">
                <h2 className="text-xl font-bold font-title text-text-main mb-3">{title}</h2>
                <p className="text-text-muted text-base leading-relaxed">{description}</p>
            </div>

            <div className="space-y-2 mb-6 border-2 border-border pt-4 flex items-center rounded-2xl px-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-primary" />
                    <span>{time}</span>
                </div>
                <div className="w-px h-5 bg-border mx-4" />
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-primary" />
                    <span>{location}</span>
                </div>
            </div>

            <button className="flex items-center gap-2 text-primary hover:bg-background text-sm font-medium transition-colors group border border-border rounded-4xl py-2 justify-center">
                {cta}
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
        </div>
    )
}
