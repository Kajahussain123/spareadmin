import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import CarSpare from './Pages/CarSpare';
import BikeSpare from './Pages/BikeSpare';
import AddBrand from './Pages/AddBrand';
import AddVehicle from './Pages/AddVehicle';
import ViewBrand from './Pages/ViewBrand';
import AddAccessories from './Pages/AddAccessories';
import ViewAccessories from './Pages/ViewAccessories';
import ViewCarSpare from './Pages/ViewCarSpare';
import ViewBikeSpare from './Pages/ViewBikeSpare';
import ViewVechicle from './Pages/ViewVechicle';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/carspare' Component={CarSpare}/>
      <Route path='/bikespare' Component={BikeSpare}/>
      <Route path='/addbrand' Component={AddBrand}/>
      <Route path='/addvehicle' Component={AddVehicle}/>
      <Route path='/viewbrand' Component={ViewBrand}/>
      <Route path='/addaccessories' Component={AddAccessories}/>
      <Route path='/viewaccessories' Component={ViewAccessories}/>
      <Route path='/viewcarspare' Component={ViewCarSpare}/>
      <Route path='/viewbikespare' Component={ViewBikeSpare}/>
      <Route path='/viewvehicle' Component={ViewVechicle}/>


     </Routes>
    </div>
  );
}

export default App;
