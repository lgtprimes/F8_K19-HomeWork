export default function Header({ gameState, timeLeft, onOpenWalkAway }) {
    return (
        <header className="w-full bg-slate-900/80 border-b border-indigo-900/50 p-4 sticky top-0 z-30 backdrop-blur">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-300 flex items-center justify-center shadow-lg border border-amber-200">
                        <i className="fa-solid fa-trophy text-slate-950 text-xl"></i>
                    </div>
                    <div>
                        <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                            AI LÀ TRIỆU PHÚ
                        </h1>
                        <p className="text-xs text-slate-400 hidden sm:block">Thử thách trí tuệ & chinh phục 150 Triệu</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {gameState === 'PLAYING' && (
                        <>
                            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-1.5 rounded-full border border-amber-500/40">
                                <i className="fa-solid fa-clock text-amber-400 animate-pulse"></i>
                                <span className="font-bold text-amber-300 text-lg w-6 text-center">{timeLeft}</span>s
                            </div>

                            <button onClick={onOpenWalkAway} className="bg-rose-900/60 hover:bg-rose-700 text-rose-200 border border-rose-500/50 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2">
                                <i className="fa-solid fa-person-walking-arrow-right text-base"></i>
                                <span>Dừng cuộc chơi</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}