import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import CarSpare from './Pages/CarSpare';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/carspare' Component={CarSpare}/>
     </Routes>
    </div>
  );
}

export default App;
