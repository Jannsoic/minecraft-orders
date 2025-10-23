import React from 'react';
export default function TaskCard({task, onOpen}){
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <strong>{task.title}</strong>
          <div style={{fontSize:12}}>von {task.creator_name} — {new Date(task.created_at).toLocaleString()}</div>
        </div>
        <div>
          <input type="checkbox" checked={task.completed===1} readOnly />
        </div>
      </div>
      <p>{task.description?.slice(0,200)}</p>
      <button className="btn" onClick={()=>onOpen(task.id)}>Öffnen</button>
    </div>
  );
}
