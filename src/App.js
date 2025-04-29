import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from './pages/Home';
import Max from '../src/image/572.png'
import Createpost from './pages/Createpost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {                    
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
                  // useState(false)  

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      {/* Navigation Links */}
      <nav className='flex justify-around  gap-5 font-bold text-[17px] items-center text-white p-5 bg-black'>
        <div><img src={Max} className='w-[40px]' alt='' /></div>
       <div>
          <Link to="/">Home</Link>
          
          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/createpost">Createpost</Link>
              <button className='w-[15vw] p-1 bg-red-600 text-white' onClick={signUserOut}>
                Logout
              </button>
            </>
          )}
       </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/createpost' element={<Createpost isAuth={isAuth} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
