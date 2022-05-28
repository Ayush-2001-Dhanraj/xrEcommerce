import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register (props) {
  const [user, setUser] = useState({
    name: '', email: '', password: ''
  })

  const onChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  return (
    <div className='login-page'>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' placeholder='Name' value={user.name} onChange={onChange} required />
        <input type='email' name='email' placeholder='Email' value={user.email} onChange={onChange} required />
        <input type='password' name='password' placeholder='Password' value={user.password} onChange={onChange} required />
        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}
