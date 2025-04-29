import React from 'react';
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";

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
    <div className="min-h-screen  mark flex items-center justify-center bg-gradient-to-br from-[#4c91c015] to-[#131416] p-4">
      <div className="bg-[#030F2D] p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-white">Welcome</h1>
        <p className="text-white text-center">
          Sign in with Google to continue to our blog community.
        </p>
        <button
          onClick={signInWithGoogle}
          className="flex items-center gap-3 bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300"
        >
         <FaGoogle className="text-[#dd2831] " />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
