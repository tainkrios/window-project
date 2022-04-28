export const timer = (id: string, deadline: string) => {

  const addZero = (num: number) => {
    if (num <=9) {
      return '0' + num
    } else {
      return num
    }
  }

  const getTimeRemaining = (endtime) => {
    const time = Date.parse(endtime) - Date.parse(new Date()),
          seconds = Math.floor((time/1000) % 60),
          minutes = Math.floor((time/1000/60) % 60),
          hours = Math.floor((time/(1000 * 60 * 60)) % 24),          
          days = Math.floor(time/(1000 * 60 * 60 * 24))
    return { time, seconds, minutes, hours, days }
  }

  const setClock = (selector, endtime: string) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const t = getTimeRemaining(endtime)

      days.textContent = addZero(t.days)
      hours.textContent = addZero(t.hours)
      minutes.textContent = addZero(t.minutes)
      seconds.textContent = addZero(t.seconds)

      if (t.time <= 0) {
        days.textContent = '00'
        hours.textContent = '00'
        minutes.textContent = '00'
        seconds.textContent = '00'

        clearInterval(timeInterval)
      }
    }
  }
  setClock(id, deadline)
}