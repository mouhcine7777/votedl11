import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.title}>City Vote</h1>
        <p style={styles.subtitle}>Choose a voting mode</p>

        <div style={styles.cards}>
          <div style={styles.card} onClick={() => navigate('/select')}>
            <h2 style={styles.cardTitle}>Mode 1</h2>
            <p style={styles.cardDesc}>Vote and rank all cities against each other</p>
          </div>
          <div style={styles.card} onClick={() => navigate('/select-main')}>
            <h2 style={styles.cardTitle}>Mode 2</h2>
            <p style={styles.cardDesc}>Each city gives a score to one chosen city</p>
          </div>
        </div>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
    boxSizing: 'border-box',
    color: '#f1f5f9',
  },
  title: {
    fontSize: 'clamp(48px, 7vw, 90px)',
    margin: 0,
    letterSpacing: '-2px',
    color: '#f59e0b',
    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.5vw, 32px)',
    color: '#fff',
    marginTop: 12,
    marginBottom: 60,
    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    width: '100%',
    maxWidth: 700,
  },
  card: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(8px)',
    border: '2px solid rgba(245,158,11,0.4)',
    borderRadius: 24,
    padding: 'clamp(30px, 4vw, 56px) clamp(24px, 4vw, 56px)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  cardTitle: {
    fontSize: 'clamp(24px, 3.5vw, 48px)',
    color: '#f59e0b',
    margin: '0 0 12px',
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 'clamp(16px, 2vw, 28px)',
    color: '#fff',
    margin: 0,
    lineHeight: 1.5,
  },
};