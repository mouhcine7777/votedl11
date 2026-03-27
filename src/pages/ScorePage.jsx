import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVotes, clearAll } from '../store/voteStore';
import bg from '../assets/bg.jpg';

export default function ScorePage() {
  const navigate = useNavigate();
  const votes = getVotes();
  const [revealed, setRevealed] = useState(false);

  const results = Object.values(votes).sort((a, b) => b.score - a.score);
  const medals = ['1st', '2nd', '3rd'];

  const handleReset = () => {
    clearAll();
    navigate('/');
  };

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${bg})` }}>
      <div style={styles.inner}>
        <h1 style={styles.title}>Final Results</h1>
        <p style={styles.subtitle}>Voting is complete</p>

        {!revealed ? (
          <button onClick={() => setRevealed(true)} style={styles.revealBtn}>
            View Scores
          </button>
        ) : (
          <>
            <div style={styles.list}>
              {results.map((item, index) => (
                <div
                  key={item.city}
                  style={{
                    ...styles.row,
                    background: index === 0 ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.1)',
                    borderColor: index === 0 ? '#f59e0b' : 'rgba(255,255,255,0.25)',
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
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
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
    letterSpacing: '0.5px',
    boxShadow: '0 4px 30px rgba(245,158,11,0.5)',
    marginTop: 40,
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
    letterSpacing: '0.5px',
  },
};