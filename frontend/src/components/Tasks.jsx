import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get('/tasks').then(res => setTasks(res.data)).catch(console.error);
  }, []);

  const toggleDone = id => {
    setTasks(tasks.map(t => t._id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div>
      <h2>Alle Aufträge</h2>
      {tasks.map(t => (
        <div key={t._id} className="card">
          <strong>{t.title}</strong> von {t.creator}<br />
          {new Date(t.createdAt).toLocaleString()}<br />
          <label>
            <input type="checkbox" checked={t.done || false} onChange={() => toggleDone(t._id)} /> Erledigt
          </label>
        </div>
      ))}
    </div>
  );
}
