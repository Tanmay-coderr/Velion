import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import axios from 'axios'


axios.defaults.withCredentials = true;

const App = () => {
  
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    const checkAuth=async()=>{
      try {
        const res=await axios.get("https://velion-ea66.onrender.com/api/auth/me");
        setUser(res.data.user);
        
      } catch (error) {
        setUser(null);
        
      }finally{
        setLoading(false);

      }
    };
    checkAuth()

  },[])
 if (loading) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-gray-600 text-sm tracking-wide">
        Loading, please wait...
      </p>

    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
     <Routes>
        <Route path='/' element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" replace />} />
        <Route path='/login' element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" replace />} />
        <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to="/login" replace />} />
      </Routes>
      
      
    </div>
  )
}

export default App
