import React, { useState, useEffect, useMemo } from 'react';
import { WORDS, SENTENCES } from '../data';
import { AudioButton } from '../components/AudioButton';

export const StudyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'WORDS' | 'SENTENCES'>('WORDS');
  
  // Calculate unique categories based on active tab
  const uniqueCategories = useMemo(() => {
    const data = activeTab === 'WORDS' ? WORDS : SENTENCES;
    return Array.from(new Set(data.map(item => item.category)));
  }, [activeTab]);

  // Determine available filters. 
  // User Request: Remove 'All' for Sentences as it's redundant. Keep 'All' for Words.
  const categories = useMemo(() => {
    return activeTab === 'WORDS' ? ['全部', ...uniqueCategories] : uniqueCategories;
  }, [activeTab, uniqueCategories]);

  // Initialize selectedCategory. 
  // If we switch tabs, we want to reset to the first available option.
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  // Reset selection when tab changes
  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const filteredData = useMemo(() => {
    const data = activeTab === 'WORDS' ? WORDS : SENTENCES;
    if (selectedCategory === '全部') return data;
    return data.filter(item => item.category === selectedCategory);
  }, [activeTab, selectedCategory]);

  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans">
      {/* Header Area */}
      <div className="bg-white pb-2 sticky top-0 z-20 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        {/* Top Bar */}
        <div className="px-5 py-4 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className="text-lg font-bold text-gray-800 tracking-tight">学习模式</span>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Segmented Control for Tab Switching */}
        <div className="px-5 mb-4">
          <div className="bg-gray-100 p-1 rounded-xl flex relative">
            {/* Sliding Background (Simplified logic for visual indication) */}
            <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${activeTab === 'SENTENCES' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}></div>
            
            <button 
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold text-center rounded-lg transition-colors ${activeTab === 'WORDS' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('WORDS')}
            >
              单词
            </button>
            <button 
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold text-center rounded-lg transition-colors ${activeTab === 'SENTENCES' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('SENTENCES')}
            >
              句型
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-5 overflow-x-auto no-scrollbar pb-2 flex gap-2.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {filteredData.map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex items-start gap-4">
            <div className="pt-1">
               <AudioButton text={item.french} size="md" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-lg font-bold text-gray-800 leading-snug">{item.french}</h3>
                {'ipa' in item && (
                  <span className="font-mono text-xs text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                    {item.ipa}
                  </span>
                )}
              </div>
              
              {'homophone' in item ? (
                 <p className="text-sm text-pink-500 mt-1 font-medium">{item.homophone}</p>
              ) : (
                <p className="text-xs text-pink-500 mt-1 font-medium opacity-90">
                  {(item as any).parts?.map((p: any) => p.homophone).filter(Boolean).join(' ')}
                </p>
              )}
              
              <div className="mt-3 pt-2 border-t border-dashed border-gray-100">
                <p className="text-gray-600 font-medium">{item.chinese}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <div className="text-4xl mb-2">🤔</div>
            <p>暂无相关内容</p>
          </div>
        )}
        
        {/* Bottom padding for scroll */}
        <div className="h-6"></div>
      </div>
    </div>
  );
};