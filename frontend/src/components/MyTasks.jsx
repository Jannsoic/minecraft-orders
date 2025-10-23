import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function MyTasks() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    API.get('/tasks/mine').then(res => setTasks(res.data)).catch(console.error);
  };

  useEffect(() => { fetchTasks(); }, []);

  const createTask = () => {
    API.post('/tasks', { title, description }).then(() => {
      setTitle(''); setDescription(''); fetchTasks();
    }).catch(console.error);
  };

  return (
    <div>
      <h2>Eigene Aufträge</h2>
      <input value={title} placeholder="Titel" onChange={e => setTitle(e.target.value)} />
      <input value={description} placeholder="Beschreibung" onChange={e => setDescription(e.target.value)} />
      <button onClick={createTask}>Auftrag erstellen</button>

      {tasks.map(t => (
        <div key={t._id} className="card">
          <strong>{t.title}</strong><br />
          {t.description}
        </div>
      ))}
    </div>
  );
}
