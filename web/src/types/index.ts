export type Language = 'ur' | 'sd' | 'en';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Subject = 'literacy' | 'math' | 'physics' | 'chemistry' | 'agriculture' | 'health';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  roleUr: string;
  roleSd: string;
  avatar: string;
  pathway: string;
  pathwayUr: string;
  pathwaySd: string;
  level: string;
  levelUr: string;
  levelSd: string;
  stars: number;
  pin: string[];
}

export interface QuizQuestion {
  id: number;
  questionUr: string;
  questionSd: string;
  questionEn: string;
  visualEmoji: string;
  optionsUr: string[];
  optionsSd: string[];
  optionsEn: string[];
  correctIndex: number;
  category: 'literacy' | 'numeracy' | 'practical';
}

export interface SafetyRuleMatch {
  matched: boolean;
  type: 'emergency' | 'refusal' | 'safe';
  ruleId?: string;
  titleUr?: string;
  titleSd?: string;
  instructionsUr?: string;
  instructionsSd?: string;
  referralTarget?: string;
}

export interface CohortStudent {
  id: string;
  name: string;
  avatar: string;
  level: string;
  pathway: string;
  progress: number;
  stars: number;
  lastSync: string;
}
