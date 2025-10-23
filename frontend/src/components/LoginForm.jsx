import React, { useState } from 'react';
import API from '../api/api';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    const res = await API.post('/auth/login', { username, password });
    onLogin(res.data.user, res.data.token);
  }

  return (
    <form onSubmit={submit} className="card">
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
