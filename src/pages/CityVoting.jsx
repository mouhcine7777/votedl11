import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import buttonImg from '../assets/button.png';

import tangerImg from '../assets/cities/Tanger.jpg';
import taroudantImg from '../assets/cities/Taroudant.jpg';
import taounatImg from '../assets/cities/Taounat.jpg';
import casablancaImg from '../assets/cities/Casablanca.jpg';
import dakhlaImg from '../assets/cities/Dakhla.jpg';
import fesImg from '../assets/cities/Fes.jpg';
import allemagnImg from '../assets/cities/Allemagne.jpg';

import score0 from '../assets/scores/0.png';
import score1 from '../assets/scores/1.png';
import score2 from '../assets/scores/2.png';
import score3 from '../assets/scores/3.png';
import score4 from '../assets/scores/4.png';
import score5 from '../assets/scores/5.png';
import score6 from '../assets/scores/6.png';

const ALL_CITIES = [
  { id: 1, name: 'Tanger', label: 'طنجة', image: tangerImg },
  { id: 2, name: 'Taroudant', label: 'تارودانت', image: taroudantImg },
  { id: 3, name: 'Taounat', label: 'تاونات', image: taounatImg },
  { id: 4, name: 'Casablanca', label: 'الدار البيضاء', image: casablancaImg },
  { id: 5, name: 'Dakhla', label: 'الداخلة', image: dakhlaImg },
  { id: 6, name: 'Fes', label: 'فاس', image: fesImg },
  { id: 7, name: 'Allemagne', label: 'ألمانيا', image: allemagnImg },
];

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
  0: score0, 1: score1, 2: score2, 3: score3,
  4: score4, 5: score5, 6: score6,
};

const SCORES = [0, 1, 2, 3, 4, 5, 6];

export default function CityVoting() {
  const navigate = useNavigate();
  const [mainCity, setMainCity] = useState(null);
  const [cityVotes, setCityVotes] = useState({});
  const [selectedVoterCity, setSelectedVoterCity] = useState('');
  const [selectedScore, setSelectedScore] = useState(null);
  const [pressed, setPressed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const mc = localStorage.getItem('mainCity');
    const cv = localStorage.getItem('cityVotes');
    if (!mc) { navigate('/select-main'); return; }
    setMainCity(JSON.parse(mc));
    if (cv) setCityVotes(JSON.parse(cv));
  }, []);

  // Cities that haven't voted yet
  const votedCities = Object.keys(cityVotes);
  const remainingCities = ALL_CITIES.filter(
    c => !votedCities.includes(c.name) && c.name !== mainCity?.name
  );

  const usedScores = Object.values(cityVotes).map(v => v.score);

  const handleValidate = () => {
    if (!selectedVoterCity) return alert('الرجاء اختيار مدينتك من القائمة.');
    if (selectedScore === null) return alert('الرجاء اختيار نقطة.');

    setPressed(true);
    setTimeout(() => setPressed(false), 200);

    const newVotes = {
      ...cityVotes,
      [selectedVoterCity]: { score: selectedScore },
    };
    setCityVotes(newVotes);
    localStorage.setItem('cityVotes', JSON.stringify(newVotes));
    setSelectedVoterCity('');
    setSelectedScore(null);

    setTimeout(() => {
      // Check if all cities have voted
      const remaining = ALL_CITIES.filter(
        c => !Object.keys(newVotes).includes(c.name) && c.name !== mainCity?.name
      );
      if (remaining.length === 0) {
        navigate('/city-results');
      }
    }, 200);
  };

  const handleFinish = () => {
    if (Object.keys(cityVotes).length === 0) return alert('لم يتم تسجيل أي أصوات بعد.');
    navigate('/city-results');
  };

  if (!mainCity) return null;

  // Get Arabic label for a city name key
  const getCityLabel = (name) => {
    const city = ALL_CITIES.find(c => c.name === name);
    return city ? city.label : name;
  };

  return (
    <div style={styles.page}>
      <div style={styles.inner}>

        {/* Progress */}
        <div style={styles.progressBar}>
          <div style={{
            ...styles.progressFill,
            width: `${(votedCities.length / (ALL_CITIES.length - 1)) * 100}%`
          }} />
        </div>

        <p style={styles.step}>
          {votedCities.length} / {ALL_CITIES.length - 1} مدن صوّتت
        </p>

        {/* Main city image */}
        <div style={styles.imageWrapper}>
          <img
            src={CITY_IMAGES[mainCity.name]}
            alt={mainCity.name}
            style={styles.cityImage}
          />
        </div>

        {/* Custom Dropdown */}
        <div style={styles.dropdownWrapper}>
          <div
            style={styles.dropdownSelected}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span style={{ direction: 'rtl' }}>
              {selectedVoterCity ? getCityLabel(selectedVoterCity) : 'اختر مدينتك...'}
            </span>
            <span style={{ color: '#f59e0b', fontSize: 'clamp(16px, 2vw, 26px)' }}>
              {dropdownOpen ? '▲' : '▼'}
            </span>
          </div>

          {dropdownOpen && (
            <div style={styles.dropdownList}>
              {remainingCities.length === 0 ? (
                <div style={{ ...styles.dropdownItem, direction: 'rtl' }}>كل المدن صوّتت</div>
              ) : (
                remainingCities.map(city => (
                  <div
                    key={city.id}
                    style={{ ...styles.dropdownItem, direction: 'rtl' }}
                    onClick={() => {
                      setSelectedVoterCity(city.name);
                      setDropdownOpen(false);
                    }}
                  >
                    {city.label}
                  </div>
                ))
              )}
            </div>
          )}
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

        {/* Validate button */}
        <div
          onClick={handleValidate}
          style={{
            ...styles.btnWrapper,
            opacity: (selectedScore === null || !selectedVoterCity) ? 0.4 : 1,
            cursor: (selectedScore === null || !selectedVoterCity) ? 'not-allowed' : 'pointer',
            transform: pressed ? 'scale(0.94)' : 'scale(1)',
          }}
        >
          <img src={buttonImg} alt="Next" style={styles.btnImage} />
        </div>

        {/* Finish early button */}
        {votedCities.length > 0 && remainingCities.length > 0 && (
          <button onClick={handleFinish} style={styles.finishBtn}>
            عرض النتائج
          </button>
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
    direction: 'rtl',
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
  dropdownWrapper: {
    width: '85%',
    marginTop: 'clamp(20px, 3vw, 44px)',
    position: 'relative',
    zIndex: 10,
  },
  dropdownSelected: {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(8px)',
    border: '2px solid #f59e0b',
    borderRadius: 16,
    padding: 'clamp(14px, 2vw, 28px) clamp(20px, 3vw, 40px)',
    fontSize: 'clamp(18px, 2.5vw, 34px)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    userSelect: 'none',
  },
  dropdownList: {
    position: 'absolute',
    top: '105%',
    left: 0,
    right: 0,
    background: 'rgba(15,23,42,0.97)',
    backdropFilter: 'blur(12px)',
    border: '2px solid #f59e0b',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
  },
  dropdownItem: {
    padding: 'clamp(14px, 2vw, 28px) clamp(20px, 3vw, 40px)',
    fontSize: 'clamp(18px, 2.5vw, 34px)',
    color: '#fff',
    cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    fontWeight: 'bold',
    transition: 'background 0.15s',
  },
  scoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 'clamp(6px, 1.2vw, 16px)',
    padding: '0 clamp(2px, 0.5vw, 10px)',
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
  finishBtn: {
    marginTop: 80,
    background: 'transparent',
    color: '#f59e0b',
    border: '2px solid #f59e0b',
    padding: 'clamp(12px, 1.5vw, 22px) clamp(40px, 5vw, 80px)',
    fontSize: 'clamp(16px, 2vw, 28px)',
    fontWeight: 'bold',
    borderRadius: 50,
    cursor: 'pointer',
    fontFamily: "'Georgia', serif",
  },
};