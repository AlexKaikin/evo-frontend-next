export function formatTime(time: string | undefined) {
  let formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (!time) return time

  return formatter.format(new Date(+time))
}
