// ════════════════════════════════════════════════
// NOW PLAYING BAR — sibling that displays
// mirrored state (passed as props from parent)
// ════════════════════════════════════════════════

import type { Track } from "@/types/Track";

export default function NowPlayingBar({
    track,
    playing,
    volume,
    progress,
}: {
    track: Track | null;
    playing: boolean;
    volume: number;
    progress: number;
}) {
    if (!track) {
        return (
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 text-gray-500 text-sm">
                Nothing playing...
            </div>
        );
    }

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                📋 Now Playing Bar <span className="text-gray-600">(reads mirrored state via props)</span>
            </div>

            <div className="flex items-center gap-3">
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                        playing ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-500"
                    }`}
                >
                    {playing ? "♫" : "—"}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{track.title}</div>
                    <div className="text-gray-500 text-xs">{track.artist}</div>
                </div>
                <div className="text-right shrink-0">
                    <div className={`text-xs font-semibold ${playing ? "text-emerald-400" : "text-gray-500"}`}>
                        {playing ? "PLAYING" : "PAUSED"}
                    </div>
                    <div className="text-gray-600 text-xs font-mono">
                        Vol {volume}% · {Math.round(progress)}%
                    </div>
                </div>
            </div>
        </div>
    );
}
