import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div >
     <Routes>
      <Route path='/' Component={Dashboard}/>
     </Routes>
    </div>
  );
}

export default App;
