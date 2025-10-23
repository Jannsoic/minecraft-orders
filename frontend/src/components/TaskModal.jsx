import React, { useState, useEffect } from 'react';
import API from '../api/api';
export default function TaskModal({id, onClose}){
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(()=>{ if(id){ API.get('/tasks/'+id).then(r=>setTask(r.data)); } }, [id]);
  if(!id) return null;
  if(!task) return <div className="card">Lade...</div>;
  async function complete(){ await API.post('/tasks/'+id+'/complete',{message}); onClose(); }
  return (
    <div className="card">
      <h3>{task.title}</h3>
      <div>von {task.creator_name} — {new Date(task.created_at).toLocaleString()}</div>
      <p>{task.description}</p>
      {task.images && task.images.map((s,i)=>(<img key={i} src={'http://localhost:4000'+s} alt="" style={{maxWidth:120, marginRight:8}}/>))}
      <textarea className="input" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Nachricht beim Abhaken..." />
      <button className="btn" onClick={complete}>Als erledigt markieren</button>
      <button className="btn" onClick={onClose} style={{background:'#374151'}}>Schließen</button>
    </div>
  );
}
