import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from "./routes/header/header.component";
import WholeUniverse from "./routes/whole-universe/whole-universe.component";
import LifeInYears from './routes/life-in-years/life-in-years';
import LifeInMonths from './routes/life-in-months/life-in-months';
import LifeInWeeks from './routes/life-in-weeks/life-in-weeks';
import LifeInDays from './routes/life-in-days/life-in-days';
import { GlobalStyle } from './styles/global-style';
import LastFiveHundredThousandYears from './routes/last-five-hundred-thousand-years/last-five-hundred-thousand-years';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token && userData) {
      setUser(userData);
    }
  }, []);

  return (
    <Router>
      <div className="container">
        <Header />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<WholeUniverse />} />
          <Route path="/last-five-hundred-thousand-years" element={<LastFiveHundredThousandYears />} />
          <Route path="/life-in-years" element={<LifeInYears user={user} />} />
          <Route path="/life-in-months" element={<LifeInMonths />} />
          <Route path="/life-in-weeks" element={<LifeInWeeks />} />
          <Route path="/life-in-days" element={<LifeInDays />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
