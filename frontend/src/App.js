import './App.css';
import { Route, BrowserRouter, Routes,Navigate } from 'react-router-dom'  
import Login from './components/login'
import Register from './components/register'
import CreateEmployee from './components/createEmployee'
import UdateEmployee from './components/updateEmployee';
import Employees from './components/employees';




function App() {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>  
          <Route path="/" element={ <Login /> } />  
          <Route path="/register" element={ <Register /> } />
          <Route path="/create-employee" element={ token ?  <CreateEmployee /> : <Navigate to="/" />} /> 
          <Route path="/update-employee/:id" element={ token ?  <UdateEmployee /> : <Navigate to="/" />} /> 
          <Route path="/employees" element={ token ?  <Employees /> : <Navigate to="/" />} />  
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
