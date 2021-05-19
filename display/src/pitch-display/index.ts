import { scaleLinear, ScaleLinear } from 'd3-scale';

import { NOTE_OFFSET, NOTE_STRINGS } from '../constants';

import { noteFromPitch, colorFromNote, centsOffFromPitch } from '../utils';

interface IFrequency {
  frequency: number;
  clarity: number;
  time: number;
  // pitch is calculated from frequency
  pitch: number;
  // melodyPitch is the pitch that is nearest to the melody note,
  // it can be same as pitch or in different octave
  melodyPitch: number;
}

interface IMelodyNote {
  start: number;
  duration: number;
  pitch: number;
}

class PitchDisplay {
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
  now: number; // Time at the last call to render()
  container: HTMLElement;
  bgCanvas: HTMLCanvasElement;
  melodyCanvas: HTMLCanvasElement;
  noteCanvas: HTMLCanvasElement;
  bgContext: CanvasRenderingContext2D;
  melodyContext: CanvasRenderingContext2D;
  noteContext: CanvasRenderingContext2D;
  timeSpan: number;
  lastSongPos: number;
  playingSpeed: number;
  speedChanged: number;
  frequencies: IFrequency[] = [];
  melodyNotes: IMelodyNote[] = [];
  melodyStart: number;
  inIntro: boolean;
  introStateListeners: Function[] = [];
  background: string = '#efefef';
  highlight: string = '#888888';

  constructor(container: HTMLElement, timeSpan: number = 15000) {
    this.container = container;

    this.container.style.position = 'relative';
    const canvasStyle = 'position: absolute; width: 100%; height: 100%;';
    this.bgCanvas = document.createElement('canvas');
    this.bgCanvas.setAttribute('style', canvasStyle);
    this.bgContext = this.bgCanvas.getContext('2d');

    this.melodyCanvas = document.createElement('canvas');
    this.melodyCanvas.setAttribute('style', canvasStyle);
    this.melodyContext = this.melodyCanvas.getContext('2d');

    this.noteCanvas = document.createElement('canvas');
    this.noteCanvas.setAttribute('style', canvasStyle);
    this.noteContext = this.noteCanvas.getContext('2d');

    this.container.appendChild(this.bgCanvas);
    this.container.appendChild(this.melodyCanvas);
    this.container.appendChild(this.noteCanvas);

    this.timeSpan = timeSpan;

    this.lastSongPos = 0;
    this.speedChanged = undefined;
    this.playingSpeed = 0;
    this.melodyStart = 0;
    this.inIntro = false;

    this.resize();
  }

  subscribeToIntroState(callback: Function) {
    this.introStateListeners.push(callback);
    return () => {
      // unsubscribe function
      for (let i = 0; i < this.introStateListeners.length; i++) {
        if (this.introStateListeners[i] === callback) {
          this.introStateListeners.splice(i, 1);
          return;
        }
      }
    };
  }

  resize() {
    let w = this.container.clientWidth;
    let h = this.container.clientHeight;

    this.bgCanvas.width = w;
    this.bgCanvas.height = h;
    this.melodyCanvas.width = w;
    this.melodyCanvas.height = h;
    this.noteCanvas.width = w;
    this.noteCanvas.height = h;

    this.scaleX = scaleLinear()
      .domain([-(this.timeSpan / 2), this.timeSpan / 2])
      .range([0, w]);

    let margin = h / (NOTE_STRINGS.length + 4);
    this.scaleY = scaleLinear()
      .domain([0, 2 * NOTE_STRINGS.length - 1])
      .range([h - margin, margin]);

    this.render();
  }

  // Returns nearest melody note by given time.
  getNearestMelodyNote(time: number) {
    if (!this.melodyNotes.length) {
      return undefined;
    }

    const songPos = this.calculateSongPos(time);
    for (let i = 0; i < this.melodyNotes.length; i++) {
      const note = this.melodyNotes[i];

      let start = 0;
      if (i > 0) {
        const prevNote = this.melodyNotes[i - 1];
        // calculate time between two notes
        start = (prevNote.start + prevNote.duration + note.start) / 2;
      }

      let end = Infinity;
      if (i < this.melodyNotes.length - 1) {
        // calculate time between two notes
        const nextNote = this.melodyNotes[i + 1];
        end = (note.start + note.duration + nextNote.start) / 2;
      }

      if (songPos >= start && songPos < end) {
        return note;
      }
    }

    // no note found
    return undefined;
  }

  pushFrequency(frequency: IFrequency) {
    // calculate pitch of the frequency
    const f: number = frequency.frequency;
    const note = noteFromPitch(f);
    const centsOff = centsOffFromPitch(f, note);
    const pitch = note + centsOff / 100;

    let melodyPitch;
    const nearestMelodyNote = this.getNearestMelodyNote(frequency.time);
    if (nearestMelodyNote) {
      // check if other octaves of this pitch are closer to the melody note
      let diff = (pitch - nearestMelodyNote.pitch) % 12;
      if (diff > 6) {
        diff -= 12;
      } else if (diff < -6) {
        diff += 12;
      }
      melodyPitch = nearestMelodyNote.pitch + diff;
    }

    this.frequencies.push({
      ...frequency,
      pitch,
      melodyPitch,
    });
  }

  cleanupFrequencies() {
    // Throw away the frequencies that are out of the current display window
    this.frequencies = this.frequencies.filter(
      (val) => this.now - val.time < this.timeSpan / 2
    );
  }

  setMelodyNotes(melodyNotes: IMelodyNote[]) {
    this.melodyNotes = melodyNotes;
    this.melodyStart = melodyNotes.length ? melodyNotes[0].start : 0;
  }

  playSong() {
    this.changePlayingSpeed(1);
  }

  fastForwardSong() {
    this.changePlayingSpeed(3);
  }

  pauseSong() {
    this.changePlayingSpeed(0);
  }

  calculateSongPos(now: number) {
    return this.lastSongPos + this.playingSpeed * (now - this.speedChanged);
  }

  changePlayingSpeed(speed: number) {
    const now = new Date().getTime();
    if (this.speedChanged === undefined) {
      this.speedChanged = now;
    }
    this.lastSongPos = this.calculateSongPos(now);
    this.playingSpeed = speed;
    this.speedChanged = now;
  }

  seekToFirstNote() {
    this.changePlayingSpeed(0);
    this.lastSongPos = this.melodyStart;
  }

  render(full: boolean = true) {
    this.now = new Date().getTime();
    // calculate song position
    const songPos = this.calculateSongPos(this.now);

    this.cleanupFrequencies();
    if (full) {
      this.drawBackground();
    }
    this.drawMelody(songPos);
    this.drawNotes();

    this.checkIntroState(songPos);
  }

  checkIntroState(songPos: number) {
    const nowInIntro = songPos < this.melodyStart;
    if (nowInIntro !== this.inIntro) {
      this.inIntro = nowInIntro;
      for (let i = 0; i < this.introStateListeners.length; i++) {
        this.introStateListeners[i](nowInIntro);
      }
    }
  }

  setBackgroundColor(color: string) {
    this.background = color;
    this.drawBackground();
  }

  setHighlightColor(color: string) {
    this.highlight = color;
    this.drawBackground();
  }

  drawBackground() {
    let w = this.bgCanvas.width;
    let h = this.bgCanvas.height;
    this.bgContext.fillStyle = this.background;
    this.bgContext.clearRect(0, 0, w, h);
    this.bgContext.fillRect(0, 0, w, h);

    for (let i = 0; i < 2 * NOTE_STRINGS.length; ++i) {
      let y = this.scaleY(i);
      this.bgContext.fillStyle = this.highlight + '55';
      this.bgContext.fillRect(0, y, w, 1);
      this.bgContext.fillStyle = this.highlight;
      this.bgContext.font = '14px Sans';
      this.bgContext.fillText(
        NOTE_STRINGS[i % NOTE_STRINGS.length],
        this.scaleX(0) + 20,
        y - 2
      );
    }

    this.bgContext.fillStyle = this.highlight + '55';
    this.bgContext.fillRect(this.scaleX(0), 0, 1, h);
  }

  drawNotes() {
    let w = this.noteCanvas.width;
    let h = this.noteCanvas.height;

    this.noteContext.clearRect(0, 0, w, h);
    this.noteContext.beginPath();
    this.noteContext.strokeStyle = 'rgba(0, 0, 0, 0.1)';

    // Calculate notes and colors from frequencies
    const notes = [];
    for (let frequency of this.frequencies) {
      let t: number = frequency.time;
      let c: number = frequency.clarity;
      let x = this.scaleX(t - this.now);
      const pitch = frequency.melodyPitch
        ? frequency.melodyPitch
        : frequency.pitch;
      let y = this.scaleY((pitch + NOTE_OFFSET) % 24);
      // let color = colorFromNote(Math.floor(frequency.pitch));
      const color = [254, 74, 73];
      notes.push({
        time: t,
        x,
        y,
        clarity: c,
        color,
      });
    }

    // Draw lines
    const timeCutoff = 500;
    this.noteContext.beginPath();
    for (let i = 1; i < notes.length; ++i) {
      const { x, y, time } = notes[i];
      const prevTime = notes[i - 1].time;
      if (time - prevTime > timeCutoff) {
        this.noteContext.stroke();
        this.noteContext.beginPath();
        this.noteContext.moveTo(x, y);
      } else {
        this.noteContext.lineTo(x, y);
      }
    }
    this.noteContext.stroke();

    // Draw circles
    for (let note of notes) {
      const { x, y, clarity, color } = note;
      this.noteContext.fillStyle = `rgba(${color[0]}, ${color[1]}, ${
        color[2]
      }, ${clarity * 0.5})`;
      this.noteContext.beginPath();
      this.noteContext.arc(x, y, 5, 0, Math.PI * 2);
      this.noteContext.fill();
    }
  }

  drawMelody(songPos: number) {
    let w = this.melodyCanvas.width;
    let h = this.melodyCanvas.height;

    const ctx: CanvasRenderingContext2D = this.melodyContext;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(32, 164, 243, 0.8)';
    ctx.lineWidth = h / 36;
    ctx.lineCap = 'round';
    for (let note of this.melodyNotes) {
      const { start, duration, pitch } = note;
      const startX = this.scaleX(start - songPos);
      const endX = this.scaleX(start - songPos + duration);
      const y = this.scaleY((pitch + NOTE_OFFSET) % 24);
      ctx.beginPath();
      // because lineCap is round, make line a bit shorter
      ctx.moveTo(startX + ctx.lineWidth / 2, y);
      ctx.lineTo(endX - ctx.lineWidth / 2, y);
      ctx.stroke();
    }
  }
}

export { PitchDisplay };
