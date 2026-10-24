import type { LevelProgress, ScoreResult } from './types'

/**
 * Calculates a score for completing a level.
 *
 * - iterationScore: max 40 pts, decreases with more iterations
 * - lossScore:      max 40 pts, based on how far below threshold
 * - efficiencyScore: max 20 pts, penalises α < 0.05 or α > 0.5
 * - total: sum capped at 100
 */
export function calculateScore(
  progress: LevelProgress,
  learningRate: number,
  lossThreshold: number,
): ScoreResult {
  // Iteration score: 40 pts for 1 iteration, decays toward 0 over 100 iterations
  const iterationScore = Math.max(0, Math.round(40 * Math.max(0, 1 - (progress.iterationCount - 1) / 99)))

  // Loss score: 40 pts when loss is 0, 0 pts when loss equals threshold
  const finalLoss = progress.lossHistory.length > 0
    ? progress.lossHistory[progress.lossHistory.length - 1]
    : lossThreshold
  const lossScore = Math.max(0, Math.round(40 * Math.max(0, 1 - finalLoss / lossThreshold)))

  // Efficiency score: 20 pts for α in [0.05, 0.5], penalised outside that range
  let efficiencyScore: number
  if (learningRate >= 0.05 && learningRate <= 0.5) {
    efficiencyScore = 20
  } else if (learningRate < 0.05) {
    efficiencyScore = Math.round(20 * (learningRate / 0.05))
  } else {
    // learningRate > 0.5
    efficiencyScore = Math.max(0, Math.round(20 * (1 - (learningRate - 0.5) / 0.5)))
  }

  const total = Math.min(100, iterationScore + lossScore + efficiencyScore)

  return { iterationScore, lossScore, efficiencyScore, total }
}
