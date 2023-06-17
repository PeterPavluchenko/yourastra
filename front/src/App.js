import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./routes/header/header.component";
import WholeUniverse from "./routes/whole-universe/whole-universe.component";
import LifeInYears from './routes/life-in-years/life-in-years';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
