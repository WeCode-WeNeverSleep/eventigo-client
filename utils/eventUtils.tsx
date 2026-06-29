export function isLiveStatus(start: string | Date, end: string | Date) {
    const now = new Date()
    const startDate = new Date(start)
    const endDate = new Date(end)

    return now >= startDate && now <= endDate
}

export function formatEventDate(dateString: string | Date) {
    const date = new Date(dateString)

    return {
        day: date.getDate(),
        month: date.toLocaleString('en-US', { month: 'short' }),
    }
}