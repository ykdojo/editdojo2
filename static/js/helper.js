export function formatDate(dateString) {
  const givenDate = new Date(dateString);
  const milliSecondsSince = Date.now() - givenDate.getTime();
  const minutes = Math.round(milliSecondsSince / 1000 / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (days > 0) {
    const toAppend = days == 1 ? ' day ago' : ' days ago'
    return days + toAppend;
  }

  if (hours > 0) {
    const toAppend = hours == 1 ? ' hour ago' : ' hours ago'
    return hours + toAppend;
  }

  if (minutes > 0) {
    const toAppend = minutes == 1 ? ' minute ago' : ' minutes ago'
    return minutes + toAppend;
  }

  return 'just posted';
}
