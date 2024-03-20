import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MatrixNumbers from './MatrixNumber/matrixNumber';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Layout/Navbar';
import ToBet from './Bets/ToBet';
import AllBets from './Bets/AllBets';
import Draw from './Draw/Draw';
import Home from './Home/Home';
import AwardPage from './Draw/AwardPage';

function App() {

  return (
    <div className='App'>

      <Router>
        <Navbar />
    
        <Routes>

          <Route path="/" element={<Home />}/>
          <Route path="/ToBet" element={<ToBet />}/>
          <Route path="/Allbets" element={<AllBets />}/>
          <Route path="/Draw" element={<Draw />}/>
          <Route path="/AwardPage" element={<AwardPage />}/>

        
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
