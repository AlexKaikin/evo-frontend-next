export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

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


export function getNoun(number: number, words: string[]) {
  let n = Math.abs(number) % 100

  if (n > 10 && n < 20) return `${words[2]}`

  n = n % 10

  if (n > 1 && n < 5) return `${words[1]}`
  if (n === 1) return `${words[0]}`

  return `${words[2]}`
}