export default function StateGame({ isOpen, resultData, onRestart }) {
    if (!isOpen) return null;

    const { status, title, desc, prize } = resultData;

    let iconBoxClass = "w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-xl ";
    let iconInner = null;

    if (status === 'win') {
        iconBoxClass += "bg-amber-500/20 text-amber-400 border border-amber-500/50";
        iconInner = <i className="fa-solid fa-crown"></i>;
    } else if (status === 'walkaway') {
        iconBoxClass += "bg-sky-500/20 text-sky-400 border border-sky-500/50";
        iconInner = <i className="fa-solid fa-sack-dollar"></i>;
    } else {
        iconBoxClass += "bg-rose-500/20 text-rose-400 border border-rose-500/50";
        iconInner = <i className="fa-solid fa-circle-xmark"></i>;
    }

    return (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-custom z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-500/80 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
                <div className={iconBoxClass}>
                    {iconInner}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-amber-300 mb-2">{title}</h2>
                <p className="text-slate-300 text-sm sm:text-base mb-6">{desc}</p>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Số tiền thưởng của bạn</div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400">{prize}</div>
                </div>

                <button onClick={onRestart} className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-extrabold text-base rounded-xl shadow-lg hover:scale-105 transition duration-200">
                    THỬ SỨC LẠI <i className="fa-solid fa-rotate-right ml-2"></i>
                </button>
            </div>
        </div>
    );
}