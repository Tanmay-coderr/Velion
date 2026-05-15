import React, { useState } from 'react'
import axios from 'axios'

const AuthPage = ({setUser}) => {
  const [isLogin, setIsLogin] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = isLogin
        ? 'http://localhost:3000/api/auth/login'
        : 'http://localhost:3000/api/auth/register'

      const { data } = await axios.post(url, formData,{
        withCredentials:true  //this line sends the cookie to the post request

      }
      )

      console.log(data)


      if(data.success){
        setUser(data.user);
        setFormData({
          name: "",
          email:"",
          password:""
        });
      }

    } catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  return (
    <div className='h-screen flex items-center justify-center bg-[#0f0f1a] text-white'>
      
      <form 
        onSubmit={handleSubmit}
        className='bg-[#1c1c2b] p-8 rounded-xl w-87.5 flex flex-col gap-4'
      >
        <h2 className='text-2xl font-semibold text-center'>
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {!isLogin && (
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={formData.name}
            onChange={handleChange}
            className='p-2 rounded bg-[#2a2a3d] outline-none'
            required
          />
        )}

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className='p-2 rounded bg-[#2a2a3d] outline-none'
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          className='p-2 rounded bg-[#2a2a3d] outline-none'
          required
        />

        <button className='bg-violet-600 py-2 rounded hover:bg-violet-700 transition'>
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p 
          onClick={() => setIsLogin(!isLogin)}
          className='text-sm text-center cursor-pointer text-gray-400'
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  )
}

export default AuthPage