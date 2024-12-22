import { TIME_CONSTRAINTS } from '../constants';

export function generateTimeOptions() {
  const options: string[] = [];
  let currentTime = TIME_CONSTRAINTS.START_TIME;

  while (currentTime <= TIME_CONSTRAINTS.END_TIME) {
    options.push(currentTime);
    const [hours, minutes] = currentTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + TIME_CONSTRAINTS.INTERVAL_MINUTES;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    currentTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }

  return options;
}

export function formatTime(time: string) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}