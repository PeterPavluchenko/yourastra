import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./routes/header/header.component";
import WholeUniverse from "./routes/whole-universe/whole-universe.component";
import LifeInYears from './routes/life-in-years/life-in-years';
import LifeInMonths from './routes/life-in-months/life-in-months';
import LifeInWeeks from './routes/life-in-weeks/life-in-weeks';
import LifeInDays from './routes/life-in-days/life-in-days';
import { GlobalStyle } from './styles/global-style';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<WholeUniverse />} />
          <Route path="/life-in-years" element={<LifeInYears />} />
          <Route path="/life-in-months" element={<LifeInMonths />} />
          <Route path="/life-in-weeks" element={<LifeInWeeks />} />
          <Route path="/life-in-days" element={<LifeInDays />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
