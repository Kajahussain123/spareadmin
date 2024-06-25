import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import CarSpare from './Pages/CarSpare';
import BikeSpare from './Pages/BikeSpare';
import AddBrand from './Pages/AddBrand';
import AddVehicle from './Pages/AddVehicle';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/carspare' Component={CarSpare}/>
      <Route path='/bikespare' Component={BikeSpare}/>
      <Route path='/addbrands' Component={AddBrand}/>
      <Route path='/addvehicle' Component={AddVehicle}/>


     </Routes>
    </div>
  );
}

export default App;
