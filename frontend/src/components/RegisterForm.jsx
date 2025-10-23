import React, { useState } from 'react';
import API from '../api/api';
export default function RegisterForm({ onRegister }){
  const [username,setUsername]=useState(''); const [password,setPassword]=useState('');
  async function submit(e){ e.preventDefault();
    const res = await API.post('/auth/register',{username,password});
    onRegister(res.data.user, res.data.token);
  }
  return (
    <form onSubmit={submit} className="card">
      <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
      <input className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
      <button className="btn" type="submit">Register</button>
    </form>
  );
}
