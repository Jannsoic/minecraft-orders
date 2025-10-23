import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';
import Tasks from './components/Tasks';
import MyTasks from './components/MyTasks';
import Settings from './components/Settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [currentView, setCurrentView] = useState('main');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  if (!isLoggedIn) return <LoginForm onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="app-container">
      <MainMenu setCurrentView={setCurrentView} onLogout={() => setIsLoggedIn(false)} />
      <div className="view-container">
        {currentView === 'tasks' && <Tasks />}
        {currentView === 'myTasks' && <MyTasks />}
        {currentView === 'settings' && <Settings darkMode={darkMode} setDarkMode={setDarkMode} />}
      </div>
    </div>
  );
}
