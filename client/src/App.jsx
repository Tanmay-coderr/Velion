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
        const res=await axios.get("http://localhost:3000/api/auth/me");
        setUser(res.data.user);
        
      } catch (error) {
        setUser(null);
        
      }finally{
        setLoading(false);

      }
    };
    checkAuth()

  },[])
  if(loading){
    return (
      <div className='flex justify-center items-center'>Loading......</div>
    )
  }
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
     <Routes>
        <Route path='/' element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" replace />} />
        <Route path='/login' element={!user ? <AuthPage setUser={setUser} /> : <Navigate to="/" replace />} />
        <Route path='/profile' element={user ? <ProfilePage /> : <Navigate to="/login" replace />} />
      </Routes>
      
      
    </div>
  )
}

export default App
