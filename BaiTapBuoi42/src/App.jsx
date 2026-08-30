import { useState, useEffect, useCallback } from 'react';
import { QUESTION_DATABASE, BACKUP_QUESTIONS, PRIZE_LADDER } from './data/questions';
import { playSound } from './utils/sound';

import {
    Header,
    StartScreen,
    GameScreen,
    Confirmation,
    CallAFriend,
    AudiencePoll,
    WalkAwayConfirmation,
    StateGame,
    Footer
} from './components';

export default function App() {
    const [gameState, setGameState] = useState('START'); // 'START' | 'PLAYING' | 'ENDED'
    const [currentLevel, setCurrentLevel] = useState(0);
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // Dynamic Lifelines state
    const [usedLifelines, setUsedLifelines] = useState({ 5050: false, phone: false, audience: false, switch: false });
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [backupPool, setBackupPool] = useState([]);

    // Selection & Processing state
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [answerStatus, setAnswerStatus] = useState('none'); // 'none' | 'selected' | 'correct' | 'wrong'
    const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);

    // Modals visibility state
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPhoneOpen, setIsPhoneOpen] = useState(false);
    const [phoneText, setPhoneText] = useState('');
    const [isAudienceOpen, setIsAudienceOpen] = useState(false);
    const [audiencePolls, setAudiencePolls] = useState([0, 0, 0, 0]);
    const [isWalkAwayOpen, setIsWalkAwayOpen] = useState(false);

    // End Game result state
    const [resultData, setResultData] = useState({ status: 'lose', title: '', desc: '', prize: '0 VNĐ' });

    // Kết thúc trò chơi
    const endGame = useCallback((status, title, desc, prize) => {
        setIsTimerActive(false);
        setResultData({ status, title, desc, prize });
        setGameState('ENDED');
    }, []);

    // Hết giờ (Khai báo trước useEffect để tránh lỗi Hoisting/Stale Closure)
    const handleTimeOut = useCallback(() => {
        if (isProcessingAnswer) return;

        setIsProcessingAnswer(true);
        playSound('wrong');
        setAnswerStatus('wrong');

        setTimeout(() => {
            let prize = "0 VNĐ";
            if (currentLevel >= 10) prize = `${PRIZE_LADDER[9]} VNĐ`;
            else if (currentLevel >= 5) prize = `${PRIZE_LADDER[4]} VNĐ`;

            endGame('lose', "KẾT THÚC CUỘC CHƠI", "Đã hết thời gian suy nghĩ cho câu hỏi này!", prize);
        }, 2000);
    }, [isProcessingAnswer, currentLevel, endGame]);

    // Quản lý Bộ đếm thời gian
    useEffect(() => {
        let timer = null;

        if (isTimerActive) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsTimerActive(false);
                        handleTimeOut();
                        return 0;
                    }

                    if (prev <= 10) playSound('tick');
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isTimerActive, handleTimeOut]);

    // Chuẩn bị câu hỏi mới
    const resetQuestionState = () => {
        setSelectedOptionIndex(null);
        setAnswerStatus('none');
        setIsProcessingAnswer(false);
        setHiddenOptions([]);
        setTimeLeft(60);
        setIsTimerActive(true);
    };

    // Bắt đầu game
    const handleStartGame = () => {
        playSound('select');
        setActiveQuestions(JSON.parse(JSON.stringify(QUESTION_DATABASE)));
        setBackupPool(JSON.parse(JSON.stringify(BACKUP_QUESTIONS)));
        setUsedLifelines({ 5050: false, phone: false, audience: false, switch: false });
        setCurrentLevel(0);
        setGameState('PLAYING');
        resetQuestionState();
    };

    // Chọn đáp án
    const handleSelectOption = (index) => {
        if (isProcessingAnswer) return;
        playSound('select');
        setSelectedOptionIndex(index);
        setAnswerStatus('selected');
        setIsConfirmOpen(true);
    };

    // Hủy chọn đáp án
    const handleCancelSelection = () => {
        setSelectedOptionIndex(null);
        setAnswerStatus('none');
        setIsConfirmOpen(false);
    };

    // Chốt đáp án
    const handleConfirmAnswer = () => {
        setIsConfirmOpen(false);
        setIsTimerActive(false);
        setIsProcessingAnswer(true);

        const currentQ = activeQuestions[currentLevel];

        setTimeout(() => {
            const isCorrect = selectedOptionIndex === currentQ.correct;

            if (isCorrect) {
                playSound('correct');
                setAnswerStatus('correct');

                setTimeout(() => {
                    if (currentLevel === 14) {
                        endGame('win', "XUẤT SẮC! BẠN LÀ TRIỆU PHÚ!", "Chúc mừng bạn đã chinh phục thành công tất cả 15 câu hỏi!", `${PRIZE_LADDER[14]} VNĐ`);
                    } else {
                        setCurrentLevel(prev => prev + 1);
                        resetQuestionState();
                    }
                }, 2000);
            } else {
                playSound('wrong');
                setAnswerStatus('wrong');

                setTimeout(() => {
                    let prize = "0 VNĐ";
                    if (currentLevel >= 10) prize = `${PRIZE_LADDER[9]} VNĐ`;
                    else if (currentLevel >= 5) prize = `${PRIZE_LADDER[4]} VNĐ`;

                    endGame('lose', "KẾT THÚC CUỘC CHƠI", "Rất tiếc! Đáp án của bạn chưa chính xác.", prize);
                }, 2500);
            }
        }, 1500);
    };

    // Sử dụng quyền trợ giúp
    const handleUseLifeline = (type) => {
        if (usedLifelines[type] || isProcessingAnswer) return;
        playSound('lifeline');

        setUsedLifelines(prev => ({ ...prev, [type]: true }));
        const currentQ = activeQuestions[currentLevel];

        if (type === '5050') {
            let wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correct);
            wrongIndices.sort(() => Math.random() - 0.5);
            setHiddenOptions([wrongIndices[0], wrongIndices[1]]);
        } else if (type === 'phone') {
            const letters = ['A', 'B', 'C', 'D'];
            const correctLetter = letters[currentQ.correct];
            const dialogues = [
                `"Theo mình tìm hiểu thì đáp án chính xác chắc chắn là phương án ${correctLetter}."`,
                `"Chủ đề này mình đã đọc qua rồi, bạn hãy chọn phương án ${correctLetter} nhé!"`,
                `"Thực sự câu này hơi khó, nhưng mình nghiêng 80% về đáp án ${correctLetter}."`
            ];
            setPhoneText(dialogues[Math.floor(Math.random() * dialogues.length)]);
            setIsPhoneOpen(true);
        } else if (type === 'audience') {
            let percentCorrect = Math.floor(Math.random() * 30) + 55;
            let remaining = 100 - percentCorrect;
            let p = [0, 0, 0, 0];
            p[currentQ.correct] = percentCorrect;

            let otherIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correct);
            let p1 = Math.floor(Math.random() * remaining);
            remaining -= p1;
            let p2 = Math.floor(Math.random() * remaining);
            let p3 = remaining - p2;

            p[otherIndices[0]] = p1;
            p[otherIndices[1]] = p2;
            p[otherIndices[2]] = p3;

            setAudiencePolls(p);
            setIsAudienceOpen(true);
        } else if (type === 'switch') {
            if (backupPool.length > 0) {
                const newPool = [...backupPool];
                const newQ = newPool.pop();
                const newActive = [...activeQuestions];
                newActive[currentLevel] = newQ;

                setBackupPool(newPool);
                setActiveQuestions(newActive);
                resetQuestionState();
            }
        }
    };

    // Dừng cuộc chơi
    const handleOpenWalkAway = () => {
        if (isProcessingAnswer) return;
        setIsTimerActive(false);
        setIsWalkAwayOpen(true);
    };

    const handleConfirmWalkAway = () => {
        setIsWalkAwayOpen(false);
        let prize = currentLevel > 0 ? `${PRIZE_LADDER[currentLevel - 1]} VNĐ` : "0 VNĐ";
        endGame('walkaway', "DỪNG CUỘC CHƠI", `Bạn đã quyết định dừng cuộc chơi tại Câu số ${currentLevel + 1}.`, prize);
    };

    const handleCancelWalkAway = () => {
        setIsWalkAwayOpen(false);
        if (!isProcessingAnswer) setIsTimerActive(true);
    };

    const handleRestart = () => {
        setGameState('START');
    };

    return (
        <div id='gameapp' className="min-h-screen flex flex-col justify-between overflow-x-hidden">
            <Header 
                gameState={gameState} 
                timeLeft={timeLeft} 
                onOpenWalkAway={handleOpenWalkAway} 
            />

            <main className="flex-grow flex items-center justify-center p-2 sm:p-4 md:p-6 relative">
                {gameState === 'START' && (
                    <StartScreen onStart={handleStartGame} />
                )}

                {gameState === 'PLAYING' && (
                    <GameScreen
                        currentLevel={currentLevel}
                        questionData={activeQuestions[currentLevel]}
                        prizeLadder={PRIZE_LADDER}
                        usedLifelines={usedLifelines}
                        hiddenOptions={hiddenOptions}
                        selectedOptionIndex={selectedOptionIndex}
                        answerStatus={answerStatus}
                        onUseLifeline={handleUseLifeline}
                        onSelectOption={handleSelectOption}
                    />
                )}
            </main>

            {/* Các Modal Hỗ Trợ */}
            <Confirmation
                isOpen={isConfirmOpen}
                onCancel={handleCancelSelection}
                onConfirm={handleConfirmAnswer}
            />

            <CallAFriend
                isOpen={isPhoneOpen}
                text={phoneText}
                onClose={() => setIsPhoneOpen(false)}
            />

            <AudiencePoll
                isOpen={isAudienceOpen}
                percentages={audiencePolls}
                onClose={() => setIsAudienceOpen(false)}
            />

            <WalkAwayConfirmation
                isOpen={isWalkAwayOpen}
                prizeMoney={currentLevel > 0 ? PRIZE_LADDER[currentLevel - 1] : "0"}
                onCancel={handleCancelWalkAway}
                onConfirm={handleConfirmWalkAway}
            />

            <StateGame
                isOpen={gameState === 'ENDED'}
                resultData={resultData}
                onRestart={handleRestart}
            />

            <Footer />
        </div>
    );
}