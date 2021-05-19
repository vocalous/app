// Encoder and decoder for melody notes so that they can be added to URL.
// Binary data is base64 encoded with some characters replaced so that
// it is safe to be used in URL. Encoding uses lossy compression, original
// data loses some timing accuracy.
//
// Binary starts with 16-bit checksum.
//
// Notes follow either in 16-bit or 24-bit format.
// 16-bit:
// FXXXXXYYYYZZZZZZ
// 24-bit:
// FXXXXXXXXXXXYYYYYYZZZZZZ
//
// F: 0=16-bit note, 1=24-bit note
// X: silence before this note, relative to the end of previous note (0.1 ms)
// Y: duration (0.1 ms)
// Z: pitch

// To save space, use larger precision.
const PRECISION = 100; // in milliseconds

const SHORT_BITS = {
  start: 5,
  duration: 4,
  pitch: 6,
};

const LONG_BITS = {
  start: 11,
  duration: 6,
  pitch: 6,
};

// Returns true if this note can be encoded with 16 bits.
function canUseShort(start, duration) {
  return start < 1 << SHORT_BITS.start && duration < 1 << SHORT_BITS.duration;
}

// Replaces some characters in base64 encoded data to be URL safe (RFC 3986):
// '+' -> '_'
// '/' -> '.'
// '=' -> '-'
function safeBase64(data) {
  return data.replace(/\+/g, '_').replace(/\//g, '.').replace(/=/g, '-');
}

function unsafeBase64(data) {
  return data.replace(/_/g, '+').replace(/\./g, '/').replace(/-/g, '=');
}

export function decodeS1(data) {
  const notes = [];
  const base64 = unsafeBase64(data);
  const buffer = Buffer.from(base64, 'base64');

  if (buffer.length < 2) {
    throw new Error('No content');
  }

  let pos = 0;
  let checksum = 0;
  // read original 16-bit checksum
  const origChecksum = buffer.readUInt16BE(pos);
  pos += 2;

  // read 16-bit timestamp
  const days = buffer.readUInt16BE(pos);
  pos += 2;
  checksum += days;
  const created = new Date(days * 86400000);

  // read content
  let lastEnd = 0;
  while (pos < buffer.length) {
    // check first bit
    const isLong = buffer.readUIntBE(pos, 1) & 128;
    let bytes;
    let start;
    let duration;
    let pitch;
    if (isLong) {
      // read 24-bit value
      bytes = 3;
      const value = buffer.readUIntBE(pos, bytes);
      start =
        (value >> (LONG_BITS.duration + LONG_BITS.pitch)) &
        ((1 << LONG_BITS.start) - 1);
      duration = (value >> LONG_BITS.pitch) & ((1 << LONG_BITS.duration) - 1);
      pitch =
        value & ((1 << LONG_BITS.pitch) - 1) & ((1 << LONG_BITS.pitch) - 1);
      checksum += value;
    } else {
      // read 16-bit value
      bytes = 2;
      const value = buffer.readUIntBE(pos, bytes);
      start =
        (value >> (SHORT_BITS.duration + SHORT_BITS.pitch)) &
        ((1 << SHORT_BITS.start) - 1);
      duration = (value >> SHORT_BITS.pitch) & ((1 << SHORT_BITS.duration) - 1);
      pitch =
        value & ((1 << SHORT_BITS.pitch) - 1) & ((1 << SHORT_BITS.pitch) - 1);
      checksum += value;
    }

    const note = {
      start: lastEnd + start * PRECISION,
      duration: duration * PRECISION,
      pitch,
    };
    notes.push(note);
    lastEnd = note.start + note.duration;
    pos += bytes;
  }

  // 16-bit checksum
  if ((checksum & 65535) !== origChecksum) {
    throw new Error('Corrupted data: invalid checksum');
  }

  return {
    created,
    notes,
  };
}

export function encodeS1(data) {
  const buffers = [];
  let lastPos = 0;
  let checksum = 0;

  function bitHandle(value, valueBits, shiftBits) {
    const max = (1 << valueBits) - 1;
    if (value > max) {
      throw new Error(
        `${valueBits} bits not enough for value ${value}, use another encoding`
      );
    }
    return value << shiftBits;
  }

  function addTimestamp() {
    // add timestamp, days since epoch
    const days = Math.floor(new Date().getTime() / 86400000);
    const bytes = Buffer.alloc(2);
    bytes.writeUInt16BE(days);
    buffers.push(bytes);
    checksum += days;
  }

  addTimestamp();

  for (let i = 0; i < data.notes.length; i++) {
    const note = data.notes[i];
    const start = Math.floor((note.start - lastPos * PRECISION) / PRECISION);
    const duration = Math.floor(note.duration / PRECISION);
    lastPos += start + duration;
    const pitch = note.pitch;

    if (canUseShort(start, duration)) {
      // we can write a note with 16 bits
      let num = bitHandle(
        start,
        SHORT_BITS.start,
        SHORT_BITS.duration + SHORT_BITS.pitch
      );
      num += bitHandle(duration, SHORT_BITS.duration, SHORT_BITS.pitch);
      num += bitHandle(pitch, SHORT_BITS.pitch, 0);
      const bytes = Buffer.alloc(2);
      bytes.writeUInt16BE(num);
      buffers.push(bytes);
      checksum += num;
    } else {
      // write a note with 24 bits
      let num = 1 << 23; // first bit indicates 24-bit note
      num += bitHandle(
        start,
        LONG_BITS.start,
        LONG_BITS.duration + LONG_BITS.pitch
      );
      num += bitHandle(duration, LONG_BITS.duration, LONG_BITS.pitch);
      num += bitHandle(pitch, LONG_BITS.pitch, 0);
      const bytes = Buffer.alloc(3);
      bytes.writeUIntBE(num, 0, 3);
      buffers.push(bytes);
      checksum += num;
    }
  }

  // add 16-bit checksum to the beginning of buffer
  const checksumBuf = Buffer.alloc(2);
  checksumBuf.writeUInt16BE(checksum & 65535);
  buffers.unshift(checksumBuf);

  const output = Buffer.concat(buffers).toString('base64');
  return safeBase64(output);
}
