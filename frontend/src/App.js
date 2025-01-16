// router
import { Routes, Route } from 'react-router-dom';
import { Home, Laboratory, Archives,  FinancialManagement} from './pages/index';
import './App.css';
import Address from './components/Address';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Laboratory" element={<Laboratory />} />
      <Route path="/Archives" element={<Archives />} >
        <Route path="address" element={<Address />} />
      </Route>
      <Route path="/Accounts" element={<FinancialManagement />} />
    </Routes>
  );
}

export default App;
