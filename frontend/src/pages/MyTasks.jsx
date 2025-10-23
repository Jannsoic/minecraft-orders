import React, { useState } from 'react';
import API from '../api/api';
export default function MyTasks({user}){
  const [title,setTitle]=useState(''); const [description,setDescription]=useState('');
  const [files,setFiles]=useState(null);
  async function submit(e){ e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    if(files) for(const f of files) fd.append('images', f);
    const res = await API.post('/tasks', fd);
    // minimal: refresh page
    window.location.reload();
  }
  return (
    <div style={{marginTop:20}}>
      <h3>Eigene Aufträge</h3>
      <form onSubmit={submit} className="card">
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Überschrift" />
        <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Erklärung" />
        <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
        <button className="btn" type="submit">Erstellen</button>
      </form>
    </div>
  );
}
