import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import CarSpare from './Pages/CarSpare';
import BikeSpare from './Pages/BikeSpare';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/carspare' Component={CarSpare}/>
      <Route path='/bikespare' Component={BikeSpare}/>

     </Routes>
    </div>
  );
}

export default App;
