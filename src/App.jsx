import { useState, useCallback } from 'react'
import { getRandomText } from './texts'
import { scoreAttempt } from './scoring'
import { useSpeechRecognition } from './useSpeechRecognition'
import './App.css'

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [challengeText, setChallengeText] = useState(() => getRandomText('medium'))
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const { transcript, isListening, isSupported, start, stop, reset } =
    useSpeechRecognition()

  const newChallenge = useCallback(
    (diff) => {
      const d = diff || difficulty
      setChallengeText(getRandomText(d))
      setResult(null)
      reset()
    },
    [difficulty, reset],
  )

  const handleDifficulty = (d) => {
    setDifficulty(d)
    newChallenge(d)
  }

  const handleRecord = () => {
    if (isListening) {
      stop()
    } else {
      setResult(null)
      start()
    }
  }

  const handleScore = () => {
    if (!transcript.trim()) return
    const res = scoreAttempt(challengeText, transcript)
    setResult(res)
    setHistory((prev) => [
      { text: challengeText, score: res.score, difficulty, timestamp: Date.now() },
      ...prev.slice(0, 9),
    ])
  }

  if (!isSupported) {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Speakeasy</h1>
        </div>
        <div className="unsupported">
          <h2>Browser Not Supported</h2>
          <p>
            Your browser does not support the Web Speech API. Please try Chrome,
            Edge, or Safari.
          </p>
        </div>
      </div>
    )
  }

  const scoreClass =
    result && (result.score >= 80 ? 'high' : result.score >= 50 ? 'medium' : 'low')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Speakeasy</h1>
        <p>Read aloud. Get scored. Improve.</p>
      </header>

      {/* Challenge */}
      <div className="challenge-card">
        <div className="label">Read this aloud</div>
        <div className="challenge-text">{challengeText}</div>
        <div className="difficulty-selector">
          {['easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              className={`difficulty-btn ${d === difficulty ? 'active' : ''}`}
              onClick={() => handleDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          className={`btn ${isListening ? 'btn-recording' : 'btn-primary'}`}
          onClick={handleRecord}
        >
          {isListening ? 'Stop' : 'Record'}
        </button>

        <button
          className="btn btn-primary"
          onClick={handleScore}
          disabled={!transcript.trim() || isListening}
        >
          Score
        </button>

        <button className="btn btn-secondary" onClick={() => newChallenge()}>
          New
        </button>
      </div>

      {/* Transcript / Diff */}
      {(transcript || result) && (
        <div className="transcript-card">
          <div className="label">
            {result ? 'Comparison' : 'What you said'}
          </div>
          {result ? (
            <div className="diff-view">
              {result.words.map((w, i) => (
                <span key={i} className={`word ${w.status}`}>
                  {w.text}{' '}
                </span>
              ))}
            </div>
          ) : (
            <div className={`transcript-text ${transcript ? 'has-text' : ''}`}>
              {transcript || 'Listening...'}
            </div>
          )}
        </div>
      )}

      {/* Score */}
      {result && (
        <div className="score-card">
          <div className="label">Score</div>
          <div className="score-display">
            <div className={`score-circle ${scoreClass}`}>{result.score}%</div>
            <div className="score-details">
              <p>
                Words correct: <span>{result.stats.correct}/{result.stats.total}</span>
              </p>
              <p>
                Missed: <span>{result.stats.missed}</span>
              </p>
              <p>
                Extra words: <span>{result.stats.extra}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="history-section">
          <h3>Recent Attempts</h3>
          <div className="history-list">
            {history.map((h) => (
              <div key={h.timestamp} className="history-item">
                <span className="history-text">{h.text}</span>
                <span
                  className="history-score"
                  style={{
                    color:
                      h.score >= 80
                        ? 'var(--success)'
                        : h.score >= 50
                          ? 'var(--warning)'
                          : 'var(--danger)',
                  }}
                >
                  {h.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
