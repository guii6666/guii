import React, { useState } from 'react';
import { StudyView } from './views/StudyView';
import { QuizView } from './views/QuizView';
import { Button } from './components/Button';

type ViewState = 'HOME' | 'STUDY' | 'QUIZ_SELECT' | 'QUIZ_RUNNING';

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [quizMode, setQuizMode] = useState<'TRANSLATION' | 'PHONETIC' | 'ORDERING' | 'RANDOM'>('RANDOM');

  const startQuiz = (mode: typeof quizMode) => {
    setQuizMode(mode);
    setView('QUIZ_RUNNING');
  };

  if (view === 'STUDY') {
    return <StudyView onBack={() => setView('HOME')} />;
  }

  if (view === 'QUIZ_RUNNING') {
    return <QuizView mode={quizMode} onExit={() => setView('HOME')} />;
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative font-sans">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-[35vh] bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-b-[2.5rem] shadow-lg z-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
       </div>
       
       <div className="relative z-10 flex flex-col h-full px-6 pt-12 pb-6">
          <div className="text-white mb-10 pl-2">
            <span className="text-indigo-200 text-sm font-semibold tracking-wider uppercase">French Master</span>
            <h1 className="text-4xl font-extrabold tracking-tight mt-1 mb-2">Bonjour! 👋</h1>
            <p className="text-indigo-100 opacity-90 text-lg font-light">今天想学点什么？</p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-6 flex-1 flex flex-col relative overflow-hidden">
             
             {view === 'HOME' && (
               <div className="flex flex-col h-full">
                 <div className="flex-1 space-y-5 py-4">
                    <button 
                      onClick={() => setView('STUDY')} 
                      className="w-full group relative overflow-hidden bg-white border border-gray-100 hover:border-indigo-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 text-left"
                    >
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <span className="text-6xl">📖</span>
                       </div>
                       <div className="flex items-center gap-5 relative z-10">
                         <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                           📚
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">单词学习</h3>
                            <p className="text-sm text-gray-500 mt-1">浏览全套词汇、句型与发音</p>
                         </div>
                       </div>
                    </button>

                    <button 
                      onClick={() => setView('QUIZ_SELECT')} 
                      className="w-full group relative overflow-hidden bg-white border border-gray-100 hover:border-pink-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 text-left"
                    >
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <span className="text-6xl">🎯</span>
                       </div>
                       <div className="flex items-center gap-5 relative z-10">
                         <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                           📝
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">闯关测试</h3>
                            <p className="text-sm text-gray-500 mt-1">翻译、听音、组句大挑战</p>
                         </div>
                       </div>
                    </button>
                 </div>
                 
                 <div className="mt-auto pt-6 text-center">
                   <p className="text-xs text-gray-300 font-medium tracking-wide">DESIGNED FOR FRENCH LEARNERS</p>
                 </div>
               </div>
             )}

             {view === 'QUIZ_SELECT' && (
               <div className="flex flex-col h-full animate-fadeIn">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">选择测试模式</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose your challenge</p>
                  </div>
                  
                  <div className="space-y-4 flex-1 px-1">
                    <Button 
                      fullWidth 
                      variant="secondary"
                      onClick={() => startQuiz('TRANSLATION')} 
                      className="justify-between group h-20 bg-white border-2 border-indigo-50 hover:border-indigo-600 hover:shadow-md transition-all relative overflow-hidden"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">Aa</div>
                        <div className="text-left">
                          <span className="block font-bold text-gray-800 text-lg">词义互译</span>
                          <span className="block text-xs text-gray-400 font-medium">中法互选</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </Button>

                    <Button 
                      fullWidth 
                      variant="secondary"
                      onClick={() => startQuiz('PHONETIC')} 
                      className="justify-between group h-20 bg-white border-2 border-indigo-50 hover:border-indigo-600 hover:shadow-md transition-all relative overflow-hidden"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">🔊</div>
                        <div className="text-left">
                          <span className="block font-bold text-gray-800 text-lg">音标辨析</span>
                          <span className="block text-xs text-gray-400 font-medium">听音识词</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </Button>

                    <Button 
                      fullWidth 
                      variant="secondary"
                      onClick={() => startQuiz('ORDERING')} 
                      className="justify-between group h-20 bg-white border-2 border-indigo-50 hover:border-indigo-600 hover:shadow-md transition-all relative overflow-hidden"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold">🧩</div>
                        <div className="text-left">
                          <span className="block font-bold text-gray-800 text-lg">连词成句</span>
                          <span className="block text-xs text-gray-400 font-medium">重组句子</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </Button>

                    <div className="py-2 flex items-center gap-4">
                      <div className="h-px bg-gray-100 flex-1"></div>
                      <span className="text-xs text-gray-400 font-medium">OR</span>
                      <div className="h-px bg-gray-100 flex-1"></div>
                    </div>

                    <Button fullWidth variant="primary" onClick={() => startQuiz('RANDOM')} className="shadow-lg shadow-indigo-200 h-14 text-lg">
                      🎲 随机综合测试
                    </Button>
                  </div>
                  <Button variant="secondary" onClick={() => setView('HOME')} className="mt-4 border-none text-gray-400 hover:text-gray-600 hover:bg-transparent shadow-none">
                    返回
                  </Button>
               </div>
             )}
          </div>
       </div>
    </div>
  );
}