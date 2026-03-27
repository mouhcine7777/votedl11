import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CityResults() {
  const navigate = useNavigate();
  const [mainCity, setMainCity] = useState(null);
  const [cityVotes, setCityVotes] = useState({});
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const mc = localStorage.getItem('mainCity');
    const cv = localStorage.getItem('cityVotes');
    if (!mc) { navigate('/select-main'); return; }
    setMainCity(JSON.parse(mc));
    if (cv) setCityVotes(JSON.parse(cv));
  }, []);

  const results = Object.entries(cityVotes)
    .map(([city, data]) => ({ city, score: data.score }))
    .sort((a, b) => b.score - a.score);

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const medals = ['1st', '2nd', '3rd'];

  const handleReset = () => {
    localStorage.removeItem('mainCity');
    localStorage.removeItem('cityVotes');
    navigate('/select-main');
  };

  if (!mainCity) return null;

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.title}>Results</h1>
        <p style={styles.subtitle}>Scores given to <span style={{ color: '#f59e0b' }}>{mainCity.name}</span></p>

        {!revealed ? (
          <button onClick={() => setRevealed(true)} style={styles.revealBtn}>
            View Scores
          </button>
        ) : (
          <>
            {/* Total */}
            <div style={styles.totalBox}>
              <span style={styles.totalLabel}>Total Score</span>
              <span style={styles.totalScore}>{totalScore}</span>
            </div>

            {/* Per city breakdown */}
            <div style={styles.list}>
              {results.map((item, index) => (
                <div
                  key={item.city}
                  style={{
                    ...styles.row,
                    background: index === 0 ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)',
                    borderColor: index === 0 ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                  }}
                >
                  <span style={styles.rank}>{medals[index] || `#${index + 1}`}</span>
                  <span style={styles.cityName}>{item.city}</span>
                  <span style={styles.score}>{item.score} pts</span>
                </div>
              ))}
            </div>

            <button onClick={handleReset} style={styles.resetBtn}>
              New Vote
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    fontFamily: "'Georgia', serif",
  },
  inner: {
    minHeight: '100vh',
    width: '100%',
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#f1f5f9',
    padding: 'clamp(60px, 8vw, 120px) clamp(24px, 4vw, 60px)',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: 'clamp(48px, 7vw, 90px)',
    color: '#f59e0b',
    margin: 0,
    letterSpacing: '-2px',
    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  },
  subtitle: {
    color: '#fff',
    marginTop: 12,
    marginBottom: 'clamp(40px, 6vw, 80px)',
    fontSize: 'clamp(18px, 2.5vw, 32px)',
    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
  revealBtn: {
    background: '#f59e0b',
    color: '#0f172a',
    border: 'none',
    padding: 'clamp(18px, 2.5vw, 34px) clamp(60px, 8vw, 120px)',
    fontSize: 'clamp(20px, 3vw, 40px)',
    fontWeight: 'bold',
    borderRadius: 60,
    cursor: 'pointer',
    boxShadow: '0 4px 30px rgba(245,158,11,0.5)',
    marginTop: 40,
  },
  totalBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(245,158,11,0.15)',
    border: '2px solid #f59e0b',
    borderRadius: 20,
    padding: 'clamp(20px, 3vw, 40px) clamp(40px, 6vw, 100px)',
    marginBottom: 'clamp(24px, 3vw, 48px)',
    backdropFilter: 'blur(8px)',
  },
  totalLabel: {
    fontSize: 'clamp(16px, 2vw, 28px)',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: 8,
  },
  totalScore: {
    fontSize: 'clamp(48px, 8vw, 100px)',
    color: '#f59e0b',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    lineHeight: 1,
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 2vw, 24px)',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: 'clamp(20px, 3vw, 40px) clamp(24px, 3.5vw, 48px)',
    borderRadius: 20,
    border: '1px solid',
    backdropFilter: 'blur(8px)',
  },
  rank: {
    fontSize: 'clamp(14px, 1.8vw, 24px)',
    fontWeight: 'bold',
    color: '#f59e0b',
    width: 'clamp(50px, 7vw, 90px)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  cityName: {
    flex: 1,
    fontSize: 'clamp(22px, 3.5vw, 48px)',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 'clamp(24px, 3.5vw, 48px)',
    color: '#f59e0b',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  resetBtn: {
    marginTop: 'clamp(40px, 6vw, 80px)',
    background: 'transparent',
    color: '#f59e0b',
    border: '2px solid #f59e0b',
    padding: 'clamp(14px, 2vw, 28px) clamp(48px, 6vw, 90px)',
    fontSize: 'clamp(16px, 2.5vw, 32px)',
    fontWeight: 'bold',
    borderRadius: 60,
    cursor: 'pointer',
  },
};