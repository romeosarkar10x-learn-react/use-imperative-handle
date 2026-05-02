import { forwardRef, useEffect, useState } from "react";
import type { Track } from "@/types/Track";
import type { MusicPlayerHandle } from "@/types/MusicPlayerHandle";
import { TRACKS } from "@/data/tracks";

// ════════════════════════════════════════════════
// PLAYLIST DATA
// ════════════════════════════════════════════════
type MusicPlayerProps = {
    onStateChange?: (state: { track: Track; playing: boolean; volume: number; progress: number }) => void;
};

// ════════════════════════════════════════════════
// MUSIC PLAYER — this component OWNS the state
//
// 🎯 YOUR TASK:
// This component has internal state: trackIndex, playing, volume, progress.
// Use useImperativeHandle to expose methods and getters so the parent
// (and siblings) can control and read from this component via a ref.
//
// Expose the following on the ref (matching MusicPlayerHandle):
//   play()            → set playing to true
//   pause()           → set playing to false
//   nextTrack()       → go to next track (wrap around), reset progress to 0, call onStateChange
//   prevTrack()       → go to previous track (wrap around), reset progress to 0, call onStateChange
//   setVolume(v)      → set the volume
//   getCurrentTrack() → return TRACKS[trackIndex]
//   isPlaying()       → return playing
//   getVolume()       → return volume
//   getProgress()     → return progress
//
// Don't forget the dependency array!
// After exposing, also call onStateChange() inside play/pause/nextTrack/prevTrack/setVolume
// so the parent can mirror state for sibling re-renders.
// ════════════════════════════════════════════════
const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({ onStateChange }, ref) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(75);
    const [progress, setProgress] = useState(0);

    const track = TRACKS[trackIndex];

    // Simulate playback progress
    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    setPlaying(false);
                    onStateChange?.({
                        track,
                        playing: false,
                        volume,
                        progress: 100,
                    });
                    return 100;
                }
                const next = p + 0.5;
                onStateChange?.({ track, playing: true, volume, progress: next });
                return next;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [playing, track, volume]);

    // ──────────────────────────────────────────
    // 🎯 YOUR CODE HERE
    // Add useImperativeHandle(ref, () => ({ ... }), [deps])
    // ──────────────────────────────────────────

    // Format time
    const elapsed = Math.floor((progress / 100) * track.duration);
    const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                🎵 Music Player <span className="text-gray-600">(owns internal state)</span>
            </div>

            {/* Track info */}
            <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shrink-0">
                    {playing ? "▶" : "⏸"}
                </div>
                <div className="min-w-0">
                    <div className="text-white font-semibold text-lg truncate">{track.title}</div>
                    <div className="text-gray-400 text-sm">{track.artist}</div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{fmtTime(elapsed)}</span>
                    <span>{fmtTime(track.duration)}</span>
                </div>
            </div>

            {/* Volume indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🔊</span>
                <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500 rounded-full transition-all" style={{ width: `${volume}%` }} />
                </div>
                <span>{volume}%</span>
            </div>
        </div>
    );
});

export default MusicPlayer;
