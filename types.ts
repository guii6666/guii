export interface WordItem {
  id: string;
  french: string;
  chinese: string;
  ipa: string;
  homophone: string; // The Chinese harmonic sound
  category: string;
}

export interface SentencePart {
  text: string;
  homophone?: string; // Derived from words or manual override
}

export interface SentenceItem {
  id: string;
  french: string; // Full sentence
  chinese: string;
  parts: SentencePart[]; // For ordering questions
  category: string;
}

export enum QuizType {
  TRANSLATION = 'TRANSLATION', // FR <-> CN
  PHONETIC = 'PHONETIC', // FR -> IPA (Select correct IPA)
  ORDERING = 'ORDERING', // Scrambled sentence
}

export interface Question {
  id: string;
  type: QuizType;
  prompt: string; // The question text (could be French word, Chinese meaning, or instructions)
  promptSub?: string; // Extra info (e.g. homophone for translation context)
  correctAnswer: string; // For Translation/Phonetic
  options?: string[]; // For multiple choice
  sentenceParts?: SentencePart[]; // For Ordering type
  explanation?: string;
}
