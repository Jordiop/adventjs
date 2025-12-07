type ElfDateTime
  = `${number}*${number}*${number}@${number}|${number}|${number} NP`

function timeUntilTakeOff(
  fromTime: ElfDateTime,
  takeOffTime: ElfDateTime
): number {
  const parseElfDateTime = (elfTime: ElfDateTime): number => {
    const timeStr = elfTime.replace(' NP', '')
    const [datePart, timePart] = timeStr.split('@')
    const [year, month, day] = datePart.split('*').map(Number)
    const [hours, minutes, seconds] = timePart.split('|').map(Number)
    const date = Date.UTC(year, month - 1, day, hours, minutes, seconds)
    return Math.floor(date / 1000)
  }

  const fromTimestamp = parseElfDateTime(fromTime)
  const takeOffTimestamp = parseElfDateTime(takeOffTime)

  return takeOffTimestamp - fromTimestamp
}

timeUntilTakeOff('2025*12*24@18|30|00 NP', '2025*12*25@06|00|00 NP')
