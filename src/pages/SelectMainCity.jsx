import { useNavigate } from 'react-router-dom';

import tangerImg from '../assets/cities/Tanger.jpg';
import taroudantImg from '../assets/cities/Taroudant.jpg';
import taounatImg from '../assets/cities/Taounat.jpg';
import casablancaImg from '../assets/cities/Casablanca.jpg';
import dakhlaImg from '../assets/cities/Dakhla.jpg';
import fesImg from '../assets/cities/Fes.jpg';
import allemagnImg from '../assets/cities/Allemagne.jpg';

const ALL_CITIES = [
  { id: 1, name: 'Tanger', image: tangerImg },
  { id: 2, name: 'Taroudant', image: taroudantImg },
  { id: 3, name: 'Taounat', image: taounatImg },
  { id: 4, name: 'Casablanca', image: casablancaImg },
  { id: 5, name: 'Dakhla', image: dakhlaImg },
  { id: 6, name: 'Fes', image: fesImg },
  { id: 7, name: 'Allemagne', image: allemagnImg },
];

export default function SelectMainCity() {
  const navigate = useNavigate();

  const handleSelect = (city) => {
    localStorage.setItem('mainCity', JSON.stringify(city));
    localStorage.removeItem('cityVotes');
    navigate('/city-voting');
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <h1 style={styles.title}>Mode 2</h1>
        <p style={styles.subtitle}>Choose the city to be voted on</p>

        <div style={styles.grid}>
          {ALL_CITIES.map(city => (
            <div
              key={city.id}
              onClick={() => handleSelect(city)}
              style={styles.card}
            >
              <img src={city.image} alt={city.name} style={styles.cardImg} />
              <div style={styles.cityLabel}>{city.name}</div>
            </div>
          ))}
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
    marginBottom: 60,
    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 28,
    width: '100%',
    maxWidth: 1100,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    border: '4px solid transparent',
  },
  cardImg: {
    width: '100%',
    height: 'clamp(160px, 20vw, 300px)',
    objectFit: 'cover',
    display: 'block',
  },
  cityLabel: {
    background: 'rgba(0,0,0,0.75)',
    color: '#fff',
    textAlign: 'center',
    padding: 'clamp(10px, 1.5vw, 20px)',
    fontSize: 'clamp(18px, 2.5vw, 34px)',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
};