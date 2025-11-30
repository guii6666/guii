import React, { useState, useEffect } from 'react';
import { Question, QuizType, SentencePart } from '../types';
import { generateQuiz } from '../utils/quizGenerator';
import { Button } from '../components/Button';
import { AudioButton } from '../components/AudioButton';

interface QuizViewProps {
  mode: 'TRANSLATION' | 'PHONETIC' | 'ORDERING' | 'RANDOM';
  onExit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ mode, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [orderedParts, setOrderedParts] = useState<SentencePart[]>([]);
  const [availableParts, setAvailableParts] = useState<SentencePart[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const q = generateQuiz(mode, 10);
    setQuestions(q);
  }, [mode]);

  useEffect(() => {
    // Reset state for ordering questions
    if (questions[currentIndex]?.type === QuizType.ORDERING) {
      setAvailableParts([...(questions[currentIndex].sentenceParts || [])]);
      setOrderedParts([]);
    }
    setSelectedOption(null);
    setShowResult(false);
  }, [currentIndex, questions]);

  const handleOptionClick = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore(s => s + 1);
  };

  const handlePartClick = (part: SentencePart, index: number, isSelected: boolean) => {
    if (showResult) return;
    if (isSelected) {
      // Return to available
      const newOrdered = [...orderedParts];
      newOrdered.splice(index, 1);
      setOrderedParts(newOrdered);
      setAvailableParts([...availableParts, part]);
    } else {
      // Move to ordered
      const newAvailable = [...availableParts];
      newAvailable.splice(index, 1);
      setAvailableParts(newAvailable);
      setOrderedParts([...orderedParts, part]);
    }
  };

  const checkOrder = () => {
    const userAnswer = orderedParts.map(p => p.text).join(' ');
    
    // Normalize function: remove punctuation (.,?!), remove extra spaces, case insensitive
    const normalize = (str: string) => str.replace(/[.,?!;:]/g, '').replace(/\s+/g, '').toLowerCase();

    const target = normalize(questions[currentIndex].correctAnswer);
    const attempt = normalize(userAnswer);

    const correct = attempt === target;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setGameFinished(true);
    }
  };

  // Helper to strip punctuation for display
  const stripPunctuation = (str: string) => str.replace(/[.,?!;:]/g, '');

  if (questions.length === 0) return <div className="p-8 text-center text-gray-500">Loading Question...</div>;

  if (gameFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let emoji = '😐';
    if (percentage === 100) emoji = '🌟';
    else if (percentage >= 80) emoji = '🎉';
    else if (percentage >= 60) emoji = '👍';

    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-white text-center">
        <div className="text-8xl mb-6 animate-bounce">{emoji}</div>
        <h2 className="text-3xl font-bold mb-2 text-gray-800">测试完成!</h2>
        <div className="bg-gray-50 rounded-2xl p-6 w-full mb-8 border border-gray-100">
           <p className="text-gray-500 mb-1 uppercase tracking-widest text-xs font-bold">Total Score</p>
           <p className="text-5xl font-black text-indigo-600">{score} <span className="text-2xl text-gray-400 font-medium">/ {questions.length}</span></p>
        </div>
        <div className="space-y-4 w-full">
          <Button fullWidth onClick={() => { setGameFinished(false); window.location.reload(); }}>再来一次</Button>
          <Button fullWidth variant="secondary" onClick={onExit}>返回主页</Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white px-5 py-4 shadow-sm flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-100">
             {currentIndex + 1}
           </span>
           <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">of {questions.length}</span>
        </div>
        <button onClick={onExit} className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">退出</button>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1.5 bg-gray-100 w-full">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500 ease-out rounded-r-full" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-5 w-full max-w-lg mx-auto flex flex-col">
        <div className="mb-8 mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
              {currentQ.type === QuizType.TRANSLATION && 'Translation'}
              {currentQ.type === QuizType.PHONETIC && 'Phonetics'}
              {currentQ.type === QuizType.ORDERING && 'Sentence Building'}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {currentQ.prompt}
          </h2>
          
          {currentQ.promptSub && (
             <p className="text-pink-500 font-medium text-lg mt-1">{currentQ.promptSub}</p>
          )}
          
          {currentQ.type !== QuizType.ORDERING && currentQ.prompt && /[a-zA-Z]/.test(currentQ.prompt) && (
            <div className="mt-3">
                <AudioButton text={currentQ.prompt} size="md" />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Options for Translation / Phonetic */}
          {currentQ.type !== QuizType.ORDERING && (
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options?.map((opt, idx) => {
                let btnVariant: 'secondary' | 'success' | 'danger' = 'secondary';
                if (showResult) {
                  if (opt === currentQ.correctAnswer) btnVariant = 'success';
                  else if (opt === selectedOption) btnVariant = 'danger';
                }
                
                return (
                  <Button 
                    key={idx} 
                    variant={btnVariant}
                    onClick={() => handleOptionClick(opt)}
                    disabled={showResult}
                    className={`justify-start text-left py-4 px-5 text-base transition-all duration-200 ${
                      !showResult ? 'hover:scale-[1.02] hover:shadow-md' : ''
                    }`}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Ordering UI */}
          {currentQ.type === QuizType.ORDERING && (
            <div className="space-y-6">
              {/* Target Area */}
              <div className={`min-h-[120px] rounded-2xl p-4 flex flex-wrap content-start gap-2 transition-colors border-2 ${
                 showResult 
                   ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200')
                   : 'bg-white border-dashed border-gray-300'
              }`}>
                 {orderedParts.length === 0 && !showResult && (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-medium pointer-events-none select-none">
                       点击下方单词按顺序排列
                    </div>
                 )}
                 {orderedParts.map((part, idx) => (
                   <button
                      key={idx}
                      onClick={() => handlePartClick(part, idx, true)}
                      disabled={showResult}
                      className="bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg shadow-indigo-200 text-sm font-bold flex flex-col items-center animate-fadeIn active:scale-95 transition-transform"
                   >
                     <span>{part.text}</span>
                     {part.homophone && <span className="text-[10px] opacity-80 font-normal">{part.homophone}</span>}
                   </button>
                 ))}
              </div>
              
              {/* Source Area */}
              <div className="flex flex-wrap gap-2 justify-center py-4">
                {availableParts.map((part, idx) => (
                  <button
                     key={idx}
                     onClick={() => handlePartClick(part, idx, false)}
                     disabled={showResult}
                     className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg shadow-sm hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 text-sm font-bold flex flex-col items-center transition-all duration-200 active:scale-95"
                  >
                     <span>{part.text}</span>
                     {part.homophone && <span className="text-[10px] text-gray-400 font-normal">{part.homophone}</span>}
                  </button>
                ))}
              </div>

              {!showResult && (
                <Button fullWidth onClick={checkOrder} disabled={orderedParts.length === 0} className="mt-4 shadow-lg shadow-indigo-200">
                  确认答案
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Result Feedback Bottom Sheet */}
        {showResult && (
          <div className={`mt-6 p-5 rounded-2xl border animate-fadeUp ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
            <div className="flex items-center gap-3 mb-3">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                 {isCorrect ? '✓' : '✕'}
               </div>
               <span className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                 {isCorrect ? '回答正确!' : '回答错误'}
               </span>
            </div>
            {currentQ.type === QuizType.ORDERING ? (
               <div className="pl-11">
                  <p className="text-xs text-gray-500 mb-1">正确语序:</p>
                  <div className="bg-white/60 p-3 rounded-lg border border-gray-100">
                    {/* Only show the Cleaned version without punctuation for the user to compare */}
                    <p className="text-indigo-800 font-bold text-lg">
                      {stripPunctuation(currentQ.correctAnswer)}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{currentQ.prompt}</p>
                  </div>
               </div>
            ) : (
              currentQ.explanation && (
                <div className="pl-11">
                  <p className="text-gray-600 text-sm leading-relaxed bg-white/60 p-3 rounded-lg">
                      {currentQ.explanation}
                  </p>
                </div>
              )
            )}
            
            <div className="mt-5">
               <Button fullWidth onClick={nextQuestion} variant={isCorrect ? 'success' : 'primary'}>
                 {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
               </Button>
            </div>
          </div>
        )}
        
        {/* Bottom spacer */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};