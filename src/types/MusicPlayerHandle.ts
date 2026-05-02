import type { Track } from "./Track";

export type MusicPlayerHandle = {
    play: () => void;
    pause: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    setVolume: (v: number) => void;
    // state getters
    getCurrentTrack: () => Track;
    isPlaying: () => boolean;
    getVolume: () => number;
    getProgress: () => number;
};
