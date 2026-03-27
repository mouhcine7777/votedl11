import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSelectedCities, clearAll } from '../store/voteStore';

import tangerImg from '../assets/cities/tanger.jpg';
import taroudantImg from '../assets/cities/taroudant.jpg';
import taounatImg from '../assets/cities/taounat.jpg';
import casablancaImg from '../assets/cities/casablanca.jpg';
import dakhlaImg from '../assets/cities/dakhla.jpg';
import fesImg from '../assets/cities/fes.jpg';
import allemagnImg from '../assets/cities/allemagne.jpg';

const ALL_CITIES = [
  { id: 1, name: 'Tanger', image: tangerImg },
  { id: 2, name: 'Taroudant', image: taroudantImg },
  { id: 3, name: 'Taounat', image: taounatImg },
  { id: 4, name: 'Casablanca', image: casablancaImg },
  { id: 5, name: 'Dakhla', image: dakhlaImg },
  { id: 6, name: 'Fes', image: fesImg },
  { id: 7, name: 'Allemagne', image: allemagnImg },
];

export default function SelectCities() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggle = (city) => {
    setSelected(prev =>
      prev.find(c => c.id === city.id)
        ? prev.filter(c => c.id !== city.id)
        : [...prev, city]
    );
  };

  const handleStart = () => {
    if (selected.length < 2) return alert('Please select at least 2 cities.');
    clearAll();
    saveSelectedCities(selected);
    navigate('/vote');
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <p style={styles.subtitle}>Choose the cities to compete</p>
        </div>

        <div style={styles.grid}>
          {ALL_CITIES.map(city => {
            const isSelected = selected.find(c => c.id === city.id);
            return (
              <div
                key={city.id}
                onClick={() => toggle(city)}
                style={{
                  ...styles.card,
                  border: isSelected ? '4px solid #f59e0b' : '4px solid transparent',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <img src={city.image} alt={city.name} style={styles.cardImg} />
                {isSelected && (
                  <div style={styles.selectedOverlay}>
                    <span style={styles.checkmark}>✓</span>
                  </div>
                )}
                <div style={styles.cityLabel}>{city.name}</div>
              </div>
            );
          })}
        </div>

        <div style={styles.footer}>
          <p style={styles.countText}>{selected.length} city(ies) selected</p>
          <button onClick={handleStart} style={styles.startBtn}>
            Start Voting
          </button>
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
    padding: '60px 40px',
    boxSizing: 'border-box',
    color: '#f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: { textAlign: 'center', marginBottom: 60 },
  title: {
    fontSize: 'clamp(48px, 7vw, 90px)',
    margin: 0,
    letterSpacing: '-2px',
    color: '#f59e0b',
    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  },
  subtitle: {
    fontSize: 'clamp(18px, 2.5vw, 32px)',
    color: '#fff',
    marginTop: 12,
    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 28,
    width: '100%',
    maxWidth: 1100,
    margin: '0 auto',
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImg: {
    width: '100%',
    height: 'clamp(160px, 20vw, 300px)',
    objectFit: 'cover',
    display: 'block',
  },
  selectedOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(245,158,11,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#f59e0b',
    fontSize: 'clamp(40px, 6vw, 80px)',
    fontWeight: 'bold',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  cityLabel: {
    background: 'rgba(0,0,0,0.75)',
    color: '#fff',
    textAlign: 'center',
    padding: 'clamp(10px, 1.5vw, 20px)',
    fontSize: 'clamp(18px, 2.5vw, 34px)',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    textShadow: '0 1px 6px rgba(0,0,0,0.5)',
  },
  footer: { textAlign: 'center', marginTop: 60 },
  countText: {
    color: '#fff',
    marginBottom: 24,
    fontSize: 'clamp(16px, 2vw, 28px)',
    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
  },
  startBtn: {
    background: '#f59e0b',
    color: '#0f172a',
    border: 'none',
    padding: 'clamp(16px, 2vw, 26px) clamp(48px, 6vw, 80px)',
    fontSize: 'clamp(18px, 2.5vw, 32px)',
    fontWeight: 'bold',
    borderRadius: 60,
    cursor: 'pointer',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 30px rgba(245,158,11,0.5)',
  },
};