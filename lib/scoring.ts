import { DimensionScores, Diagnosis } from "../data/types";
import { diagnoses } from "../data/diagnoses";
import { questions } from "../data/questions";

const DIMS = ["mem", "att", "lang", "exec", "emo"] as const;

/** Compute the actual min/max possible raw score per dimension from question data */
function computeRanges(): Record<keyof DimensionScores, { min: number; max: number }> {
  const ranges = {} as Record<keyof DimensionScores, { min: number; max: number }>;
  for (const d of DIMS) {
    let min = 0, max = 0;
    for (const q of questions) {
      const vals = q.options.map((o) => o.scores[d]);
      min += Math.min(...vals);
      max += Math.max(...vals);
    }
    ranges[d] = { min, max };
  }
  return ranges;
}

const dimensionRanges = computeRanges();

/** Sum all answer score vectors into raw dimension totals */
export function sumScores(answerScores: DimensionScores[]): DimensionScores {
  const total: DimensionScores = { mem: 0, att: 0, lang: 0, exec: 0, emo: 0 };
  for (const s of answerScores) {
    total.mem += s.mem;
    total.att += s.att;
    total.lang += s.lang;
    total.exec += s.exec;
    total.emo += s.emo;
  }
  return total;
}

/**
 * Normalize raw scores to 0-100 range.
 * Each dimension uses its own min/max computed from the actual question data,
 * so every dimension spans the full 0-100 range.
 */
export function normalizeScores(raw: DimensionScores): DimensionScores {
  const result = {} as DimensionScores;
  for (const d of DIMS) {
    const { min, max } = dimensionRanges[d];
    const range = max - min;
    result[d] = range === 0 ? 50 : Math.round(Math.max(0, Math.min(100, ((raw[d] - min) / range) * 100)));
  }
  return result;
}

/** Cosine similarity between two dimension score vectors */
function cosineSimilarity(a: DimensionScores, b: DimensionScores): number {
  const keys: (keyof DimensionScores)[] = ["mem", "att", "lang", "exec", "emo"];
  let dot = 0, magA = 0, magB = 0;
  for (const k of keys) {
    dot += a[k] * b[k];
    magA += a[k] * a[k];
    magB += b[k] * b[k];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

export interface DiagnosisResult {
  primary: Diagnosis;
  secondary: Diagnosis;
  scores: DimensionScores;
  rawScores: DimensionScores;
}

/** Match normalized scores against diagnosis patterns, return top 2 */
export function matchDiagnosis(answerScores: DimensionScores[]): DiagnosisResult {
  const raw = sumScores(answerScores);
  const scores = normalizeScores(raw);

  const ranked = diagnoses
    .map((d) => ({ diagnosis: d, similarity: cosineSimilarity(scores, d.pattern) }))
    .sort((a, b) => b.similarity - a.similarity);

  return {
    primary: ranked[0].diagnosis,
    secondary: ranked[1].diagnosis,
    scores,
    rawScores: raw,
  };
}
