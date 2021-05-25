// https://thebrickyblog.wordpress.com/2011/01/27/ultrastar-txt-files-in-more-depth/

// Parses content of UltraStar TXT song file and returns parsed data as object.
export function parseUltraStarTxt(data) {
  let bpm; // beats per quarter minute
  let beatDuration; // duration of a beat in milliseconds

  let gap = 0;
  const notes = [];
  const lines = data.split('\n');

  function setBPM(value) {
    bpm = value;
    beatDuration = 60000 / value / 4;
  }

  setBPM(180); // default

  function parseHeader(line) {
    const parts = line.substr(1).split(':');
    const key = parts[0].toLowerCase();
    const value = parts[1];
    if (key === 'bpm') {
      const numValue = parseFloat(value.replace(',', '.'), 10);
      setBPM(numValue);
    } else if (key === 'gap') {
      gap = parseFloat(value.replace(',', '.'), 10);
    } else if (key === 'relative') {
      throw new Error('Relative notes not supported!');
    }
  }

  function parseNote(line) {
    const parts = line.substr(2).split(' ');
    if (parts.length > 3) {
      const start = gap + parseInt(parts[0], 10) * beatDuration;
      const duration = parseInt(parts[1], 10) * beatDuration;
      const pitch = parseInt(parts[2], 10);

      const floorStart = Math.floor(start);

      // truncate previous note if needed
      if (notes.length > 0) {
        const prevNote = notes[notes.length - 1];
        if (prevNote.start + prevNote.duration >= floorStart) {
          prevNote.duration = floorStart - prevNote.start;
        }
      }

      notes.push({
        start: floorStart,
        duration: Math.floor(duration),
        pitch: pitch,
      });
    }
  }

  // start parsing
  let section = 'header';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (section === 'header') {
      if (line.startsWith(': ')) {
        section = 'notes';
      } else if (line.startsWith('#')) {
        parseHeader(line);
      }
    }
    if (section === 'notes') {
      if (
        line.startsWith(': ') || // regular note
        line.startsWith('G ') || // golden note
        line.startsWith('F ')
      ) {
        // freestyle note
        parseNote(line);
      }
    }
  }

  return {
    bpm: bpm,
    gap: gap,
    notes: notes,
  };
}
