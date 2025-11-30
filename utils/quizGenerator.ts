import { WORDS, SENTENCES } from '../data';
import { Question, QuizType, WordItem, SentenceItem, SentencePart } from '../types';

// Helper to shuffle array
const shuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// Generate "Distorted" IPA for distractors
const generateIPADistractor = (correctIPA: string): string => {
  // Simple heuristics to create confusing phonetics
  let distractor = correctIPA;
  
  // Swap vowels
  if (distractor.includes('i')) distractor = distractor.replace('i', 'e');
  else if (distractor.includes('e')) distractor = distractor.replace('e', 'i');
  else if (distractor.includes('a')) distractor = distractor.replace('a', 'o');
  else if (distractor.includes('o')) distractor = distractor.replace('o', 'u');
  else if (distractor.includes('y')) distractor = distractor.replace('y', 'i');
  else if (distractor.includes('ɛ')) distractor = distractor.replace('ɛ', 'e');
  else if (distractor.includes('œ')) distractor = distractor.replace('œ', 'ø');
  
  // Swap some consonants
  if (distractor.includes('p')) distractor = distractor.replace('p', 'b');
  else if (distractor.includes('t')) distractor = distractor.replace('t', 'd');
  else if (distractor.includes('k')) distractor = distractor.replace('k', 'g');
  else if (distractor.includes('s')) distractor = distractor.replace('s', 'z');
  else if (distractor.includes('ʃ')) distractor = distractor.replace('ʃ', 's');

  // If no change (rare), just force a change
  if (distractor === correctIPA) {
    distractor = distractor + "ː"; 
  }
  
  return distractor;
};

// Mode 1: Translation (FR -> CN or CN -> FR)
const generateTranslationQuestion = (word: WordItem, isReverse: boolean = false): Question => {
  const otherWords = WORDS.filter(w => w.id !== word.id && w.category === word.category);
  const distractors = shuffle(otherWords).slice(0, 3).map(w => isReverse ? w.french : w.chinese);
  
  while(distractors.length < 3) {
      // Fallback if not enough in category
      const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      if(randomWord.id !== word.id && !distractors.includes(isReverse ? randomWord.french : randomWord.chinese)){
          distractors.push(isReverse ? randomWord.french : randomWord.chinese);
      }
  }

  const prompt = isReverse ? word.chinese : word.french;
  const promptSub = isReverse ? undefined : `(${word.homophone})`;
  const correctAnswer = isReverse ? word.french : word.chinese;
  const options = shuffle([...distractors, correctAnswer]);

  return {
    id: `q-trans-${word.id}-${Date.now()}`,
    type: QuizType.TRANSLATION,
    prompt,
    promptSub,
    correctAnswer,
    options,
    explanation: `${word.french} [${word.ipa}] (${word.homophone}) = ${word.chinese}`
  };
};

// Mode 2: Phonetic (FR -> IPA)
const generatePhoneticQuestion = (word: WordItem): Question => {
  const correctIPA = word.ipa;
  
  // Option 1: Generated mutation
  const fake1 = generateIPADistractor(correctIPA);
  // Option 2: Another word's IPA (formatted similar)
  const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  const fake2 = randomWord.ipa;
  // Option 3: Another mutation or random
  const fake3 = generateIPADistractor(fake2);

  const options = shuffle([...new Set([correctIPA, fake1, fake2, fake3])]);
  // Ensure we have 4 options, fill with randoms if dupes removed
  while (options.length < 4) {
     options.push(WORDS[Math.floor(Math.random() * WORDS.length)].ipa);
  }

  return {
    id: `q-ipa-${word.id}-${Date.now()}`,
    type: QuizType.PHONETIC,
    prompt: word.french,
    promptSub: `(${word.homophone})`,
    correctAnswer: correctIPA,
    options: options.slice(0, 4),
    explanation: `正确音标是: ${correctIPA}`
  };
};

// Mode 3: Sentence Ordering
const generateOrderingQuestion = (sentence: SentenceItem): Question => {
  const shuffledParts = shuffle([...sentence.parts]);
  
  return {
    id: `q-order-${sentence.id}-${Date.now()}`,
    type: QuizType.ORDERING,
    prompt: sentence.chinese, // Show Chinese
    correctAnswer: sentence.french, // Used for final verification string comparison if needed
    sentenceParts: shuffledParts, // The parts to click
    explanation: `${sentence.french} (${sentence.chinese})`
  };
};

export const generateQuiz = (mode: 'TRANSLATION' | 'PHONETIC' | 'ORDERING' | 'RANDOM', count: number = 10): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let q: Question | null = null;
    
    const randomMode = mode === 'RANDOM' 
      ? (['TRANSLATION', 'PHONETIC', 'ORDERING'][Math.floor(Math.random() * 3)]) 
      : mode;

    if (randomMode === 'ORDERING') {
      const s = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
      q = generateOrderingQuestion(s);
    } else if (randomMode === 'PHONETIC') {
      const w = WORDS[Math.floor(Math.random() * WORDS.length)];
      q = generatePhoneticQuestion(w);
    } else {
       // Translation
       const w = WORDS[Math.floor(Math.random() * WORDS.length)];
       q = generateTranslationQuestion(w, Math.random() > 0.5);
    }

    if (q) questions.push(q);
  }
  
  return questions;
};
