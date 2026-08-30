export default function GameScreen({
    currentLevel,
    questionData,
    prizeLadder,
    usedLifelines,
    hiddenOptions,
    selectedOptionIndex,
    answerStatus,
    onUseLifeline,
    onSelectOption
}) {
    const labels = ['A', 'B', 'C', 'D'];
    const isBusy = answerStatus !== 'none'; // Đang chọn hoặc đang chấm điểm

    return (
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-3 space-y-6">
                {/* Trợ giúp */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 flex justify-around items-center gap-2 shadow-lg">
                    <button 
                        disabled={usedLifelines['5050'] || isBusy} 
                        onClick={() => onUseLifeline('5050')} 
                        className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-percent text-base sm:text-lg"></i>
                        <span>50:50</span>
                    </button>

                    <button 
                        disabled={usedLifelines['phone'] || isBusy} 
                        onClick={() => onUseLifeline('phone')} 
                        className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-sky-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-phone text-base sm:text-lg"></i>
                        <span className="hidden md:inline">Người thân</span>
                        <span className="md:hidden">Gọi điện</span>
                    </button>

                    <button 
                        disabled={usedLifelines['audience'] || isBusy} 
                        onClick={() => onUseLifeline('audience')} 
                        className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-users text-base sm:text-lg"></i>
                        <span>Khán giả</span>
                    </button>

                    <button 
                        disabled={usedLifelines['switch'] || isBusy} 
                        onClick={() => onUseLifeline('switch')} 
                        className="lifeline-btn flex-1 py-2 sm:py-3 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fa-solid fa-arrows-rotate text-base sm:text-lg"></i>
                        <span className="hidden md:inline">Đổi câu hỏi</span>
                        <span className="md:hidden">Đổi câu</span>
                    </button>
                </div>

                {/* Khung câu hỏi */}
                <div className="relative bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-indigo-500/60 rounded-2xl p-6 sm:p-8 min-h-[160px] sm:min-h-[200px] flex items-center justify-center text-center shadow-2xl">
                    <div className="absolute -top-3 left-6 bg-indigo-600 text-slate-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                        Câu hỏi số <span className="text-yellow-300">{currentLevel + 1}</span>
                    </div>
                    <p className="text-base sm:text-xl md:text-2xl font-bold text-slate-100 leading-relaxed">
                        {questionData?.question}
                    </p>
                </div>

                {/* Các đáp án */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questionData?.answers.map((ans, idx) => {
                        if (hiddenOptions.includes(idx)) {
                            return <div key={idx} className="p-4 hidden md:block"></div>;
                        }

                        let btnClass = "option-btn p-4 rounded-xl text-left flex items-center gap-3 transition-all duration-200";
                        
                        if (selectedOptionIndex === idx) {
                            if (answerStatus === 'selected') btnClass += " selected";
                            if (answerStatus === 'correct') btnClass += " correct";
                            if (answerStatus === 'wrong') btnClass += " wrong";
                        }
                        
                        if (answerStatus === 'wrong' && idx === questionData.correct) {
                            btnClass += " correct";
                        }

                        return (
                            <button 
                                key={idx} 
                                disabled={isBusy}
                                onClick={() => onSelectOption(idx)} 
                                className={`${btnClass} disabled:cursor-not-allowed`}
                            >
                                <span className="font-extrabold text-amber-400 text-base sm:text-lg w-8 h-8 rounded-lg bg-slate-900/80 border border-amber-500/30 flex items-center justify-center shrink-0">
                                    {labels[idx]}
                                </span>
                                <span className="text-sm sm:text-base font-semibold text-slate-200">
                                    {ans}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Cột mốc tiền thưởng */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thang tiền thưởng</span>
                    <i className="fa-solid fa-ranking-star text-amber-400"></i>
                </div>

                <div className="space-y-1 text-sm font-bold max-h-[380px] lg:max-h-none overflow-y-auto custom-scrollbar pr-1">
                    {prizeLadder.slice().reverse().map((prize, reverseIndex) => {
                        const i = 14 - reverseIndex;
                        const isMilestone = (i === 4 || i === 9 || i === 14);
                        const isCurrent = (i === currentLevel);
                        const isPassed = (i < currentLevel);

                        return (
                            <div key={i} className={`flex justify-between items-center px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                                isCurrent 
                                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black border-amber-300 shadow-md scale-[1.02]' 
                                    : isPassed 
                                        ? 'bg-slate-950/40 text-amber-500/60 border-slate-900' 
                                        : isMilestone 
                                            ? 'bg-slate-800/80 text-amber-300 border-amber-500/40 font-extrabold' 
                                            : 'text-slate-400 border-transparent hover:bg-slate-800/40'
                            }`}>
                                <span className={`text-xs ${isCurrent ? 'text-slate-950' : 'text-slate-500'}`}>Câu {i + 1}</span>
                                <span className={isMilestone && !isCurrent ? 'text-amber-300 font-black' : ''}>{prize} đ</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}