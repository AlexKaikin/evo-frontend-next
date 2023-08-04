export function getLocalStorage(item: string) {
  const data = localStorage.getItem(item)

  return data ? JSON.parse(data) : []
}
