import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import MyTasks from './pages/MyTasks';
import Settings from './pages/Settings';
import NavBar from './components/NavBar';
import { setToken } from './api/api';

export default function App(){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setTok] = useState(localStorage.getItem('token') || null);
  useEffect(()=> { if(token) setToken(token); }, [token]);
  useEffect(()=> { if(user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user'); }, [user]);
  useEffect(()=> { if(token) localStorage.setItem('token', token); else localStorage.removeItem('token'); }, [token]);

  if(!user) return (
    <div className="container">
      <h2>Login</h2>
      <LoginForm onLogin={(u,t)=>{ setUser(u); setTok(t); }} />
      <hr />
      <h2>Register</h2>
      <RegisterForm onRegister={(u,t)=>{ setUser(u); setTok(t); }} />
    </div>
  );

  return (
    <div className="container">
      <NavBar user={user} onLogout={()=>{ setUser(null); setTok(null); }} />
      <Dashboard user={user} />
      <MyTasks user={user} />
      <Settings user={user} setUser={setUser} />
    </div>
  );
}
