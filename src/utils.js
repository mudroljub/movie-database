export function removeDupes(arr) {
  const ids = new Set()
  return arr.filter(obj => {
    if (!ids.has(obj.id)) {
      ids.add(obj.id)
      return true
    }
    return false
  })
}
