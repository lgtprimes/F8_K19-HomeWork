
export default function Confirmation({ isOpen, onCancel, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Bạn có chắc chắn chọn đáp án này?</h3>
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={onCancel} // Nút hủy
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg"
                    >
                        Bỏ chọn
                    </button>
                    <button 
                        onClick={onConfirm} // Nút xác nhận chốt đáp án
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg"
                    >
                        Chốt đáp án
                    </button>
                </div>
            </div>
        </div>
    );
}