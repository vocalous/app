import {
  action,
  Action,
  createStore,
  createTypedHooks,
  thunk,
  Thunk,
} from 'easy-peasy';
import { Connection, ParentHandshake, WorkerMessenger } from 'post-me';

type Detector = 'mcleod' | 'autocorrelation';

type ErrorType = 'audio-context' | 'mic-stream' | 'worker';

interface IMelodyNote {
  start: number;
  duration: number;
  pitch: number;
}

type IMelodyNotes = IMelodyNote[];

interface Melody {
  title: string;
  notes: IMelodyNotes;
}

interface StoreModel {
  windowSize: number;
  setWindowSize: Action<StoreModel, number>;

  detectorName: Detector;
  setDetectorName: Action<StoreModel, Detector>;

  clarityThreshold: number;
  setClarityThreshold: Action<StoreModel, number>;

  enabled: boolean;
  setEnabled: Action<StoreModel, boolean>;

  stream: MediaStream | null | undefined;
  audioOptions: MediaStreamConstraints;
  setStream: Action<StoreModel, MediaStream | null>;
  loading: boolean;
  setLoading: Action<StoreModel, boolean>;
  loaded: boolean;
  setLoaded: Action<StoreModel, boolean>;
  initializeStream: Thunk<StoreModel, void>;
  stopStream: Thunk<StoreModel, void>;

  workerConnection: Connection | null | undefined;
  setWorkerConnection: Action<StoreModel, Connection | null>;
  initializeWorker: Thunk<StoreModel, void>;

  melody: Melody;
  setMelodyNotes: Action<StoreModel, IMelodyNotes>;
  error: ErrorType;
}

export const store = createStore<StoreModel>({
  // Default values
  windowSize: 2048, // 1024
  detectorName: 'mcleod',
  clarityThreshold: 0.7, // 0.5
  enabled: false,
  loading: false,
  loaded: false,
  stream: null,
  audioOptions: { audio: { echoCancellation: true, autoGainControl: true } },
  workerConnection: null,
  melody: {},
  error: null,

  setWindowSize: action((state, payload) => {
    state.windowSize = payload;
  }),
  setDetectorName: action((state, payload) => {
    state.detectorName = payload;
  }),
  setClarityThreshold: action((state, payload) => {
    state.clarityThreshold = payload;
  }),
  setEnabled: action((state, payload) => {
    state.enabled = payload;
  }),
  setStream: action((state, payload) => {
    state.stream = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setLoaded: action((state, payload) => {
    state.loaded = payload;
  }),
  setWorkerConnection: action((state, payload) => {
    state.workerConnection = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  checkAudioContextSupport: thunk((actions, payload, { getState }) => {
    // Safari and old versions of Chrome use window.webkitAudioContext
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext === undefined) {
      // browser does not support Audio Context
      actions.setError('audio-context');
      console.error('Browser does not have window.AudioContext support');
    }
  }),
  initializeStream: thunk(async (actions, payload, { getState }) => {
    const state = getState();
    const options = state.audioOptions;

    actions.setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia(options);
      actions.setStream(stream);
      actions.setLoading(false);
      actions.setLoaded(true);
    } catch (e) {
      actions.setError('mic-stream');
      console.error(e);
      actions.setStream(null);
      actions.setLoading(false);
      actions.setLoaded(false);
    }
  }),
  stopStream: thunk(async (actions, payload, { getState }) => {
    const stream = getState().stream;

    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }

    actions.setStream(null);
    actions.setLoading(false);
    actions.setLoaded(false);
  }),
  initializeWorker: thunk(async (actions) => {
    const worker = new Worker(
      `${process.env.PUBLIC_URL}/pitch-detection/worker.js`
    );

    const messenger = new WorkerMessenger({ worker });

    try {
      const connection = await ParentHandshake(messenger, {}, 5, 1000);
      actions.setWorkerConnection(connection);
    } catch (e) {
      actions.setError('worker');
      console.error('Failed to connect to worker', e);
      actions.setWorkerConnection(null);
    }
  }),

  setMelodyNotes: action((state, payload) => {
    state.melody.notes = payload;
  }),
});

// Create a version of the standard hooks that always references our `StoreModel` type
const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
