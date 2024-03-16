import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MatrixNumbers from './MatrixNumber/matrixNumber';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Layout/Navbar';
import ToBet from './Bets/ToBet';
import AllBets from './Bets/AllBets';

function App() {
  // const [count, setCount] = useState();

  return (
    <div className='App'>

      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<ToBet />}/>
          <Route path="/Allbets" element={<AllBets />}/>
          {/* <Route path="/matrixNumber" element={<MatrixNumbers />}/> */}
          {/* <Route path="/matrixNumber/:username/:cpf" component={MatrixNumbers} /> */}

        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
