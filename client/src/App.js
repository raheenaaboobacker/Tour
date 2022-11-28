import logo from './logo.svg';
import './App.css';
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route, json} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useEffect } from 'react';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';


function App() {
const dispatch=useDispatch();
const user=JSON.parse(localStorage.getItem("profile"));

useEffect(()=>{
dispatch(setUser(user));
},[])

  return (  
  <BrowserRouter>
    <div className="App">
      <Header/>
      <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/addTour" element={<AddEditTour/>}/>
          <Route path="/editTour/:id" element={<AddEditTour/>}/>
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
