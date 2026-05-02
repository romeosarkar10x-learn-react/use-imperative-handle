// ════════════════════════════════════════════════
// REMOTE CONTROL — sibling that calls methods
// on the MusicPlayer ref (passed from parent)
// ════════════════════════════════════════════════

import type { MusicPlayerHandle } from "../types/MusicPlayerHandle";

export default function RemoteControl({ playerRef }: { playerRef: React.RefObject<MusicPlayerHandle | null> }) {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                🎮 Remote Control <span className="text-gray-600">(calls ref methods)</span>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-3 mb-5">
                <button
                    onClick={() => playerRef.current?.prevTrack()}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition flex items-center justify-center text-sm"
                >
                    ⏮
                </button>
                <button
                    onClick={() => playerRef.current?.play()}
                    className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center text-lg"
                >
                    ▶
                </button>
                <button
                    onClick={() => playerRef.current?.pause()}
                    className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-500 text-white transition flex items-center justify-center text-lg"
                >
                    ⏸
                </button>
                <button
                    onClick={() => playerRef.current?.nextTrack()}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition flex items-center justify-center text-sm"
                >
                    ⏭
                </button>
            </div>

            {/* Volume controls */}
            <div className="text-xs text-gray-500 mb-2 text-center">Volume</div>
            <div className="flex items-center justify-center gap-2">
                {[0, 25, 50, 75, 100].map((v) => (
                    <button
                        key={v}
                        onClick={() => playerRef.current?.setVolume(v)}
                        className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-mono transition"
                    >
                        {v}%
                    </button>
                ))}
            </div>

            <p className="text-xs text-gray-600 mt-4 text-center leading-relaxed">
                Each button calls{" "}
                <code className="text-indigo-400 bg-gray-800 px-1 rounded">playerRef.current?.method()</code>
            </p>
        </div>
    );
}
