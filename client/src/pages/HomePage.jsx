import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import RightSidebar from '../components/RightSidebar'


const HomePage = ({user,setUser}) => {
  
  const [selectedUser,setSelectedUser]=useState(null);
  return (
    <div className='w-full h-screen border sm:px-[15%] sm:py-[5%] text-white'>
      <div className={`backdrop-blur-xl grid grid-cols-1  border-2 border-gray-600 rounded-2xl overflow-hidden relative h-full
        ${selectedUser?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' :'grid-cols-2' }`} >
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} setUser={setUser} user={user}/>
        <ChatWindow selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      </div>
    </div>
  )
}

export default HomePage
