import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from "./routes/header/header.component";
import WholeUniverse from "./routes/whole-universe/whole-universe.component";
import LifeInYears from './routes/life-in-years/life-in-years';
import LifeInMonths from './routes/life-in-months/life-in-months';
import LifeInWeeks from './routes/life-in-weeks/life-in-weeks';
import YearDetails from './routes/life-in-years/YearDetails/YearDetails';
import MonthDetails from './routes/life-in-months/MonthDetails/MonthDetails';
import WeekDetails from './routes/life-in-weeks/WeekDetails/WeekDetails';
import DayDetails from './routes/life-in-days/DayDetails/DayDetails';
import LifeInDays from './routes/life-in-days/life-in-days';
import { GlobalStyle } from './styles/global-style';
import LastFiveHundredThousandYears from './routes/last-five-hundred-thousand-years/last-five-hundred-thousand-years';
import Auth from './components/auth/Auth';
import PrivateRoute from './PrivateRoute';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token && userData) {
      setUser(userData);
    }

    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="container">
        <Header user={user} setUser={setUser} />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<WholeUniverse />} />
          <Route path="/last-five-hundred-thousand-years" element={
            <PrivateRoute user={user}>
              <LastFiveHundredThousandYears />
            </PrivateRoute>
          } />
          <Route path="/life-in-years" element={
            <PrivateRoute user={user}>
              <LifeInYears user={user} />
            </PrivateRoute>
          } />
          <Route path="/year/:yearIndex" element={
            <PrivateRoute user={user}>
                <YearDetails user={user} />
            </PrivateRoute>
          } />
          <Route path="/life-in-months" element={
            <PrivateRoute user={user}>
              <LifeInMonths user={user} />
            </PrivateRoute>
          } />
          <Route path="/month/:year/:month" element={
            <PrivateRoute user={user}>
                <MonthDetails user={user} />
            </PrivateRoute>
          } />
          <Route path="/life-in-weeks" element={
            <PrivateRoute user={user}>
              <LifeInWeeks user={user} />
            </PrivateRoute>
          } />
          <Route path="/week/:weekIndex" element={
            <PrivateRoute user={user}>
              <WeekDetails user={user} />
            </PrivateRoute>
          } />
          <Route path="/life-in-days" element={
            <PrivateRoute user={user}>
              <LifeInDays user={user} />
            </PrivateRoute>
          } />
          <Route path="/day/:dayIndex" element={
            <PrivateRoute user={user}>
              <DayDetails user={user} />
            </PrivateRoute>
          } />
          <Route path="/auth" element={<Auth handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
