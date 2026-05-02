import "./App.css";
import { useState, useRef, useCallback } from "react";
import type { Track } from "./types/Track";
import type { MusicPlayerHandle } from "./types/MusicPlayerHandle";
import MusicPlayer from "./components/MusicPlayer";
import RemoteControl from "./components/RemoteControl";
import NowPlayingBar from "./components/NowPlayingBar";
import { TRACKS } from "./data/tracks";

// ════════════════════════════════════════════════
// APP — wires everything together
// ════════════════════════════════════════════════

export default function App() {
    const playerRef = useRef<MusicPlayerHandle>(null);

    // Mirrored state so siblings can re-render from it
    const [nowPlaying, setNowPlaying] = useState<{
        track: Track;
        playing: boolean;
        volume: number;
        progress: number;
    }>({
        track: TRACKS[0],
        playing: false,
        volume: 75,
        progress: 0,
    });

    const handleStateChange = useCallback(
        (state: { track: Track; playing: boolean; volume: number; progress: number }) => {
            setNowPlaying(state);
        },
        [],
    );

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-10">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-1">useImperativeHandle Exercise</h1>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                    The <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs">MusicPlayer</code>{" "}
                    owns its state internally. Your job: use{" "}
                    <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs">
                        useImperativeHandle
                    </code>{" "}
                    to expose controls and getters so the{" "}
                    <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs">RemoteControl</code> and{" "}
                    <code className="text-indigo-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs">NowPlayingBar</code>{" "}
                    siblings can interact with it.
                </p>

                <div className="space-y-4">
                    <MusicPlayer ref={playerRef} onStateChange={handleStateChange} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <RemoteControl playerRef={playerRef} />
                        <NowPlayingBar
                            track={nowPlaying.track}
                            playing={nowPlaying.playing}
                            volume={nowPlaying.volume}
                            progress={nowPlaying.progress}
                        />
                    </div>
                </div>

                {/* Hint box */}
                <div className="mt-8 bg-indigo-950/40 border border-indigo-800/50 rounded-xl p-5">
                    <div className="text-indigo-300 font-semibold text-sm mb-2">💡 What to implement</div>
                    <p className="text-indigo-200/70 text-sm leading-relaxed">
                        Find the <code className="text-indigo-400">🎯 YOUR CODE HERE</code> comment inside{" "}
                        <code className="text-indigo-400">MusicPlayer</code>. Add a{" "}
                        <code className="text-indigo-400">useImperativeHandle</code> call that exposes:{" "}
                        <code className="text-indigo-400">play()</code>,{" "}
                        <code className="text-indigo-400">pause()</code>,{" "}
                        <code className="text-indigo-400">nextTrack()</code>,{" "}
                        <code className="text-indigo-400">prevTrack()</code>,{" "}
                        <code className="text-indigo-400">setVolume(v)</code>,{" "}
                        <code className="text-indigo-400">getCurrentTrack()</code>,{" "}
                        <code className="text-indigo-400">isPlaying()</code>,{" "}
                        <code className="text-indigo-400">getVolume()</code>, and{" "}
                        <code className="text-indigo-400">getProgress()</code>. Remember to call{" "}
                        <code className="text-indigo-400">onStateChange()</code> in the action methods so siblings get
                        re-rendered!
                    </p>
                </div>
            </div>
        </div>
    );
}
