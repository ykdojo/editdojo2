// This function converts a date string into a format
// that should be shown on the UI.
// Currently, the output should be something like:
// '2 days ago', '1 hour ago', '3 minutes ago', or 'just posted'.
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

// Got these options here: https://spin.js.org/#?lines=13&length=38&width=17&radius=45&scale=0.15&corners=1&speed=0.8&rotate=0&animation=spinner-line-fade-quick&direction=1&color=%23ffffff&fadeColor=transparent&top=50&left=50&shadow=0%200%201px%20transparent
export const spinnerOpts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 0.2, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#fff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 0.8, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};