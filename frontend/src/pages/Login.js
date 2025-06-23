import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  // changed here
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);  // changed here
    login(decoded); // Save user to context and localStorage
    navigate('/dashboard');
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="bg-white bg-opacity-10 rounded-xl shadow-2xl p-10 w-full max-w-md backdrop-blur-md border border-white/20">
        <h2 className="text-4xl font-bold mb-4 text-indigo-200 drop-shadow-lg">Welcome to Xeno CRM</h2>
        <p className="text-lg text-indigo-100 mb-8">Please sign in to continue</p>
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </div>
  );
};

export default Login;
