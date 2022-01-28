
let todayGuess: string[] = [];
let lastPlayed = 0;

function load() {
  todayGuess = localStorage.getItem('today_guess')?.split(' ') || [];
  lastPlayed = parseInt(localStorage.getItem('last_played') || '0');
}

function pushGuess(guess: string) {
  todayGuess.push(guess);
  localStorage.setItem('today_guess', todayGuess.join(' '));
}

function pushLastPlayed(timestamp: number) {
  lastPlayed = timestamp;
  localStorage.setItem('last_played', timestamp.toString())
}

function getTodayGuess() {
  const today = new Date(Date.now()).setHours(0, 0, 0, 0);
  return today == lastPlayed ? todayGuess : [];
}

export default { load, pushGuess, getTodayGuess, pushLastPlayed };
