export function msToTime(duration) {
  let milliseconds = Math.floor(duration % 1000),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  if (milliseconds < 100) {
    if (milliseconds < 10) {
      milliseconds = '00' + milliseconds;
    } else {
      milliseconds = '0' + milliseconds;
    }
  }

  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

export function msToHHMMSS(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}

export function decimalToHHMMSS(duration) {
  let timeStringWithoutColons = ('000000' + duration).slice(-6);
  return timeStringWithoutColons.replace(/(..)/g, '$1:').slice(0, -1);
}
