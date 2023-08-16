export const text = {
  getMetaTitle(text: string) {
    let result
    if (text.length > 80) result = text.slice(0, 77).concat('...')
    else result = text
    return result
  },

  getMetaDescription(text: string) {
    let result
    if (text.length > 180) result = text.slice(0, 177).concat('...')
    else result = text
    return result
  },

  cut(text: string, limit: number) {
    if(text.length > limit) return text.slice(0, limit) + '...'
    return text
  },
}
