import moment from 'moment'
// input start = 7:00AM, end 2:00PM
const generateTimeslots = (start: string, end: string) => {
  const slots = []
  // console.log(start, end)
  // results should be
  // return ['7:00AM - 7:30AM', '7:30AM - 8:00AM']

  let startTime = moment(start, 'h:mma')
  const endTime = moment(end, 'h:mma')
  const interval = 30

  while (startTime.isBefore(endTime)) {
    const nextTime = startTime.clone().add(interval, 'minutes')
    // console.log(nextTime, 'nextTime')
    slots.push(`${startTime.format('h:mma')} - ${nextTime.format('h:mma')}`)
    startTime = nextTime
    // console.log(startTime, 'startTime')
  }

  return slots
}

export default generateTimeslots
