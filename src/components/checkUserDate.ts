export default function checkUserDate(dateString: string): boolean {
  const pattern =
    /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{2}) ([0-1][0-9]|2[0-3]):([0-5][0-9])$/

  if (!pattern.test(dateString)) {
    return false
  }
  const [datePart, timePart] = dateString.split(' ')
  const [day, month, year] = datePart.split('/').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)
  if (year < 0 || year > 99) {
    return false
  }
  if (month < 1 || month > 12) {
    return false
  }
  if (day < 1 || day > 31) {
    return false
  }
  if (hours < 0 || hours > 23) {
    return false
  }
  if (minutes < 0 || minutes > 59) {
    return false
  }

  return true
}
