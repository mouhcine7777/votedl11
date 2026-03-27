// Simple global state using localStorage
export const saveVotes = (votes) => {
    localStorage.setItem('votes', JSON.stringify(votes));
  };
  
  export const getVotes = () => {
    const v = localStorage.getItem('votes');
    return v ? JSON.parse(v) : {};
  };
  
  export const saveSelectedCities = (cities) => {
    localStorage.setItem('selectedCities', JSON.stringify(cities));
  };
  
  export const getSelectedCities = () => {
    const c = localStorage.getItem('selectedCities');
    return c ? JSON.parse(c) : [];
  };
  
  export const clearAll = () => {
    localStorage.removeItem('votes');
    localStorage.removeItem('selectedCities');
  };