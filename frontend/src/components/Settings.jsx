import React, { useState } from 'react';

export default function Settings({ darkMode, setDarkMode }) {
  const [username, setUsername] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const updateUsername = () => console.log('Username update:', username);
  const updatePassword = () => console.log('Password update:', currentPass, newPass);

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Dark Mode:
        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </label>

      <h3>Username ändern</h3>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Neuer Username" />
      <button onClick={updateUsername}>Speichern</button>

      <h3>Passwort ändern</h3>
      <input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} placeholder="Aktuelles Passwort" />
      <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Neues Passwort" />
      <button onClick={updatePassword}>Speichern</button>
    </div>
  );
}
