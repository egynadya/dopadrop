let audio: HTMLAudioElement | null = null;

export function playSound() {
  if (!audio) {
    audio = new Audio('https://drive.google.com/uc?export=download&id=1WhZgdL3fOrhL_AxcQ7F8HCv3kfZOr3wQ');
  }
  audio.play();
} 