import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelectedCities, getVotes, saveVotes } from '../store/voteStore';

import buttonImg from '../assets/button.png';

import tangerImg from '../assets/cities/tanger.jpg';
import taroudantImg from '../assets/cities/taroudant.jpg';
import taounatImg from '../assets/cities/taounat.jpg';
import casablancaImg from '../assets/cities/casablanca.jpg';
import dakhlaImg from '../assets/cities/dakhla.jpg';
import fesImg from '../assets/cities/fes.jpg';
import allemagnImg from '../assets/cities/allemagne.jpg';

import score0 from '../assets/scores/0.png';
import score1 from '../assets/scores/1.png';
import score2 from '../assets/scores/2.png';
import score3 from '../assets/scores/3.png';
import score4 from '../assets/scores/4.png';
import score5 from '../assets/scores/5.png';
import score6 from '../assets/scores/6.png';

const CITY_IMAGES = {
  'Tanger': tangerImg,
  'Taroudant': taroudantImg,
  'Taounat': taounatImg,
  'Casablanca': casablancaImg,
  'Dakhla': dakhlaImg,
  'Fes': fesImg,
  'Allemagne': allemagnImg,
};

const SCORE_IMAGES = {
  0: score0,
  1: score1,
  2: score2,
  3: score3,
  4: score4,
  5: score5,
  6: score6,
};

const SCORES = [0, 1, 2, 3, 4, 5, 6];

export default function VotingScreen() {
  const navigate = useNavigate();
  const cities = getSelectedCities();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState(getVotes());
  const [selectedScore, setSelectedScore] = useState(null);
  const [pressed, setPressed] = useState(false);

  const usedScores = Object.values(votes).map(v => v.score);
  const currentCity = cities[currentIndex];

  useEffect(() => {
    if (!cities.length) navigate('/');
  }, []);

  const handleValidate = () => {
    if (selectedScore === null) return alert('Please select a score.');

    setPressed(true);
    setTimeout(() => setPressed(false), 200);

    const newVotes = { ...votes, [currentCity.id]: { city: currentCity.name, score: selectedScore } };
    setVotes(newVotes);
    saveVotes(newVotes);
    setSelectedScore(null);

    setTimeout(() => {
      if (currentIndex + 1 >= cities.length) {
        navigate('/score');
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 200);
  };

  if (!currentCity) return null;

  const cityImage = CITY_IMAGES[currentCity.name];

  return (
    <div style={styles.page}>
      <div style={styles.inner}>

        {/* Progress */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${(currentIndex / cities.length) * 100}%` }} />
        </div>

        <p style={styles.step}>{currentIndex + 1} / {cities.length}</p>

        {/* City Image */}
        <div style={styles.imageWrapper}>
          <img src={cityImage} alt={currentCity.name} style={styles.cityImage} />
        </div>

        {/* Score PNG circles */}
        <div style={styles.scoresGrid}>
          {SCORES.map(score => {
            const isUsed = usedScores.includes(score);
            const isActive = selectedScore === score;
            return (
              <div
                key={score}
                onClick={() => !isUsed && setSelectedScore(score)}
                style={{
                  ...styles.scoreBtn,
                  cursor: isUsed ? 'not-allowed' : 'pointer',
                  opacity: isUsed ? 0.25 : 1,
                  transform: isActive ? 'scale(1.18)' : 'scale(1)',
                  filter: isActive ? 'drop-shadow(0 0 16px #f59e0b)' : 'none',
                  WebkitTapHighlightColor: 'transparent',
                  outline: 'none',
                }}
              >
                <img
                  src={SCORE_IMAGES[score]}
                  alt={`${score}`}
                  style={{
                    width: '100%',
                    display: 'block',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Button image */}
        <div
          onClick={handleValidate}
          style={{
            ...styles.btnWrapper,
            opacity: selectedScore === null ? 0.4 : 1,
            cursor: selectedScore === null ? 'not-allowed' : 'pointer',
            transform: pressed ? 'scale(0.94)' : 'scale(1)',
          }}
        >
          <img src={buttonImg} alt="Next" style={styles.btnImage} />
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
    maxWidth: 900,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#f1f5f9',
    padding: '0 0 80px',
    boxSizing: 'border-box',
  },
  progressBar: {
    width: '100%',
    height: 10,
    background: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    background: '#f59e0b',
    borderRadius: 5,
    transition: 'width 0.4s ease',
  },
  step: {
    fontSize: 'clamp(16px, 2vw, 28px)',
    color: '#fff',
    margin: '20px 0 0',
    textShadow: '0 1px 8px rgba(0,0,0,0.6)',
    fontWeight: 'bold',
  },
  imageWrapper: {
    width: '100%',
    marginTop: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  cityImage: {
    width: '70%',
    objectFit: 'contain',
    display: 'block',
  },
  scoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 'clamp(8px, 1.5vw, 20px)',
    padding: '0 clamp(20px, 4vw, 60px)',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 'clamp(28px, 4vw, 56px)',
    alignItems: 'center',
  },
  scoreBtn: {
    transition: 'all 0.15s ease',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
  btnWrapper: {
    marginTop: 'clamp(32px, 5vw, 70px)',
    transition: 'transform 0.15s ease, opacity 0.2s',
    userSelect: 'none',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
  },
  btnImage: {
    width: 'clamp(220px, 43vw, 500px)',
    display: 'block',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    pointerEvents: 'none',
  },
};