class SoundManager {
  private music: HTMLAudioElement | null = null;
  private muted = false;
  private musicPlaying = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.music = new Audio(`${import.meta.env.BASE_URL}assets/music/no_promises.mp3`);

      this.music.loop = true;
      this.music.volume = 0.35;

      this.music.addEventListener('play', () => {
        this.musicPlaying = true;
      });

      this.music.addEventListener('pause', () => {
        this.musicPlaying = false;
      });

      this.music.addEventListener('ended', () => {
        this.musicPlaying = false;
      });
    }
  }

  startMusic() {
    if (!this.music || this.muted) return;

    this.music.play().catch((error) => {
      console.warn('Music could not start:', error);
    });
  }

  stopMusic() {
    if (!this.music) return;

    this.music.pause();
    this.music.currentTime = 0;
    this.musicPlaying = false;
  }

  toggleMute() {
    this.muted = !this.muted;

    if (this.music) {
      this.music.muted = this.muted;

      if (!this.muted) {
        this.startMusic();
      }
    }

    return !this.muted;
  }

  getMuted() {
    return this.muted;
  }

  getMusicPlaying() {
    return this.musicPlaying;
  }

  playSoftClick() {
    // Optional UI sound.
    // Keeping this empty avoids errors if no click sound exists.
  }

  playEnvelopeSwoosh() {
    // Optional envelope sound.
    // Keeping this empty avoids errors if no swoosh sound exists.
  }

  playCelebrationFanfare() {
    // Optional celebration sound.
  }
}

export const sound = new SoundManager();
