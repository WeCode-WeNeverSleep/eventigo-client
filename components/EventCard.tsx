'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faLocationDot,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

interface EventCardProps {
    date: string;
    startTime: string
    endTime: string
    title: string
    description: string
    time: string
    location: string
    cta: string
}
function isLiveStatus(start: string, end: string) {
    const now = new Date()
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (now >= startDate && now <= endDate) {
        return true
    }

    if (now < startDate) {
        return false
    }

    return false
}
export function EventCard({
                              date,
                              startTime,
                              endTime,
                              title,
                              description,
                              time,
                              location,
                              cta,
                          }: EventCardProps) {
    const isLive = isLiveStatus(startTime, endTime);
    return (
        <div className="border border-border rounded-xl p-6 bg-background hover:bg-surface transition-colors h-full flex flex-col">
            <div className="flex items-start justify-between mb-8">
                <h3 className="text-4xl font-bold text-primary">{date}</h3>
                <span className={`text-xs tracking-widest uppercase ${isLive ? 'text-red-500' : 'text-text-muted'}`} >
                    {isLive ? 'LIVE' : 'UPCOMING'}
                </span>
            </div>

            <div className="flex-1 mb-6">
                <h2 className="text-xl font-semibold font-title text-white mb-3">{title}</h2>
                <p className="text-sm text-text-muted leading-relaxed">{description}</p>
            </div>

            <div className="space-y-2 mb-6 border-t border-border pt-4 flex items-center border-border border-2">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-primary" />
                    <span>{time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-primary" />
                    <span>{location}</span>
                </div>
            </div>

            <button className="flex items-center gap-2 text-primary hover:text-cyan-300 text-sm font-medium transition-colors group">
                {cta}
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
        </div>
    )
}
