import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from './pages/Home';
import Max from '../src/image/images.png';
import Createpost from './pages/Createpost';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { FaBars, FaTimes } from 'react-icons/fa'; // Install react-icons if not done yet

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav className='bg-[#f0eeee] text-[#191919] px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <img src={Max} className='w-[3vw] rounded-[50%] max-sm:w-[9vw] ' alt='Logo' />
      
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex gap-6 items-center font-semibold'>
          <Link to="/" className='hover:text-gray-400'>Home</Link>
          {!isAuth ? (
            <Link to="/login" className='hover:text-gray-400'>Login</Link>
          ) : (
            <>
              <Link to="/createpost" className='hover:text-gray-400'>Create Post</Link>
              <button onClick={signUserOut} className='bg-red-600 hover:bg-red-700 px-3 py-1 rounded'>
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden z-50'>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='absolute top-16 left-0 w-full bg-black flex flex-col items-center gap-4 py-6 font-semibold z-40'>
            <Link to="/" className='hover:text-gray-400 text-[white] ' onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            {!isAuth ? (
              <Link to="/login" className='hover:text-gray-400 text-[white] ' onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            ) : (
              <>
                <Link to="/createpost" className='hover:text-gray-400 text-[white]' onClick={() => setIsMobileMenuOpen(false)}>Create Post</Link>
                <button onClick={() => { setIsMobileMenuOpen(false); signUserOut(); }} className='bg-red-600 hover:bg-red-700 px-3 py-1 rounded'>
                  Logout
                </button>
              </>
            )}
          </div>
        )}
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
