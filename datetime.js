// Shared date and 12-hour time controls for task deadlines and calendar events.
function setupTimeSelectors(prefix) {
  const hourMenu = document.getElementById(`${prefix}Hour`);
  const minuteMenu = document.getElementById(`${prefix}Minute`);
  if (!hourMenu || !minuteMenu) return;
  for (let hour = 1; hour <= 12; hour++) hourMenu.add(new Option(String(hour), String(hour)));
  for (let minute = 0; minute < 60; minute++) {
    const value = String(minute).padStart(2, '0');
    minuteMenu.add(new Option(value, value));
  }
}

function getTimeSelection(prefix) {
  const period = document.getElementById(`${prefix}Period`).value;
  const hourValue = document.getElementById(`${prefix}Hour`).value;
  const minute = document.getElementById(`${prefix}Minute`).value;
  if (!period || !hourValue) return '';
  const selectedMinute = minute || '00';
  let hour = Number(hourValue) % 12;
  if (period === 'PM') hour += 12;
  return String(hour).padStart(2, '0') + ':' + selectedMinute;
}

function fmtTime(value) {
  if (!value) return '';
  const [rawHour, minute] = value.split(':').map(Number);
  const period = rawHour < 12 ? '上午' : '下午';
  const hour = rawHour % 12 || 12;
  return `${period} ${hour}:${String(minute).padStart(2, '0')}`;
}

setupTimeSelectors('task');
setupTimeSelectors('event');