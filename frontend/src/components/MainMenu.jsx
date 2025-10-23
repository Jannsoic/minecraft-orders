import React from 'react';

export default function MainMenu({ setCurrentView, onLogout }) {
  return (
    <div className="menu-container">
      <button onClick={() => setCurrentView('tasks')}>Aufträge</button>
      <button onClick={() => setCurrentView('myTasks')}>Eigene Aufträge</button>
      <button onClick={() => setCurrentView('settings')}>Settings</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

