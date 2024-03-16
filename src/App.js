import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import MatrixNumbers from './MatrixNumber/matrixNumber';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Layout/Navbar';
import ToBet from './MatrixNumber/ToBet';
import AllBets from './MatrixNumber/AllBets';

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
