import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SelectCities from './pages/SelectCities';
import VotingScreen from './pages/VotingScreen';
import ScorePage from './pages/ScorePage';
import Home from './pages/Home';
import SelectMainCity from './pages/SelectMainCity';
import CityVoting from './pages/CityVoting';
import CityResults from './pages/CityResults';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home to choose which mode */}
        <Route path="/" element={<Home />} />

        {/* Mode 1 — original voting */}
        <Route path="/select" element={<SelectCities />} />
        <Route path="/vote" element={<VotingScreen />} />
        <Route path="/score" element={<ScorePage />} />

        {/* Mode 2 — city votes on a chosen city */}
        <Route path="/select-main" element={<SelectMainCity />} />
        <Route path="/city-voting" element={<CityVoting />} />
        <Route path="/city-results" element={<CityResults />} />
      </Routes>
    </BrowserRouter>
  );
}