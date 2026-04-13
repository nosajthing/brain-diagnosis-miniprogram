export interface DimensionScores {
  mem: number;
  att: number;
  lang: number;
  exec: number;
  emo: number;
}

export interface AnswerOption {
  label: string;
  text: string;
  scores: DimensionScores;
}

export interface Question {
  id: number;
  emoji: string;
  text: string;
  section: number;
  dimension: string;
  dimensionLabel: string;
  options: [AnswerOption, AnswerOption, AnswerOption];
}

export interface Section {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
}

export interface Diagnosis {
  id: string;
  name: string;
  englishName: string;
  emoji: string;
  tagline: string;
  symptoms: string;
  doctorNote: string;
  soulLabels: string[];
  pattern: DimensionScores;
  gradient: [string, string];
}
