import React from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Max from '../../../my-project/src/image/goole.png';
import Max2 from "../image/3.jpg";

const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  
  return (
    <div className="min-h-screen bg-[#c0bfbf] flex items-center justify-center p-4">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl">
        {/* Image Section */}
        <div className="w-full sm:w-1/3 md:w-1/2 h-48 sm:h-auto">
          <img 
            src={Max2} 
            className="h-full w-full object-cover rounded-t-lg sm:rounded-t-none sm:rounded-l-lg" 
            alt="Login background" 
          />
        </div>
        
        {/* Login Form Section */}
        <div className="bg-black w-full sm:w-2/3 md:w-1/2 p-6 md:p-8 rounded-b-lg sm:rounded-b-none sm:rounded-r-lg shadow-2xl flex flex-col items-center justify-center">
          <div className="flex flex-col gap-6 md:gap-10 w-full max-w-xs">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white text-center">Welcome</h1>
            
            <p className="text-white text-base md:text-lg font-mono text-center">
              Sign in with Google to continue to our blog community.
            </p>
            
            <button 
              onClick={signInWithGoogle} 
              className="flex items-center justify-center gap-2 bg-[#131212] hover:bg-[#222020] text-white px-4 py-3 rounded-full text-base font-semibold transition-all duration-300 w-full"
            >
              <img 
                src={Max} 
                className="w-6 h-6 rounded-full" 
                alt="Google icon" 
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;