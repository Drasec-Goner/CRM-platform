import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiSend, FiClipboard } from 'react-icons/fi';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 rounded-xl shadow-2xl p-10 w-full backdrop-blur-md border border-white/20">
        <h2 className="text-3xl font-bold text-indigo-200 mb-2 drop-shadow-lg">
          Welcome, {user?.name}!

        </h2>
        <p className="text-sm text-indigo-100 mb-6">{user?.email}</p>
        <div className="space-y-4">
          <Link to="/create-campaign">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold shadow-md">
              <FiSend /> Create Campaign
            </button>
          </Link>
          <Link to="/history">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold shadow-md">
              <FiClipboard /> Campaign History
            </button>
          </Link>
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold shadow-md"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
