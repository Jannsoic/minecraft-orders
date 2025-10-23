import React, { useState } from 'react';
export default function Settings({user, setUser}){
  const [username, setUsername] = useState(user.username);
  const [currentPass, setCurrentPass] = useState(''); const [newPass, setNewPass] = useState('');
  function saveProfile(e){ e.preventDefault(); alert('Profiländerungen sind im Boilerplate-Projekt nur lokal. Implementiere API-Endpunkte für Änderungen.'); }
  return (
    <div style={{marginTop:20}}>
      <h3>Settings</h3>
      <form className="card" onSubmit={saveProfile}>
        <label>Username</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Aktuelles Passwort</label>
        <input className="input" type="password" value={currentPass} onChange={e=>setCurrentPass(e.target.value)} />
        <label>Neues Passwort</label>
        <input className="input" type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} />
        <button className="btn" type="submit">Speichern</button>
      </form>
    </div>
  );
}
