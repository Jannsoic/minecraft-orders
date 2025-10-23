import React from 'react';
export default function NavBar({ user, onLogout }){
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
      <div><strong>Minecraft Aufträge</strong> — Angemeldet als {user.username}</div>
      <div>
        <button className="btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
