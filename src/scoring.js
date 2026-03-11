function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text) {
  return normalize(text).split(' ').filter(Boolean)
}

/**
 * Compare spoken words against target words using longest common subsequence.
 * Returns per-word annotations and an overall score.
 */
export function scoreAttempt(target, spoken) {
  const targetWords = tokenize(target)
  const spokenWords = tokenize(spoken)

  if (targetWords.length === 0) return { score: 0, words: [], stats: {} }

  // Build LCS table
  const m = targetWords.length
  const n = spokenWords.length
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (targetWords[i - 1] === spokenWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Backtrack to find which target words were matched
  const matched = new Set()
  let i = m, j = n
  while (i > 0 && j > 0) {
    if (targetWords[i - 1] === spokenWords[j - 1]) {
      matched.add(i - 1)
      i--
      j--
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--
    } else {
      j--
    }
  }

  // Build annotated word list
  const words = targetWords.map((word, idx) => ({
    text: word,
    status: matched.has(idx) ? 'correct' : 'missing',
  }))

  const correctCount = matched.size
  const score = Math.round((correctCount / m) * 100)

  return {
    score,
    words,
    stats: {
      total: m,
      correct: correctCount,
      missed: m - correctCount,
      extra: Math.max(0, n - correctCount),
    },
  }
}
