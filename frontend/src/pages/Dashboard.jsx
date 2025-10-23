import React, { useEffect, useState } from 'react';
import API from '../api/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function Dashboard(){
  const [tasks,setTasks]=useState([]);
  const [openId,setOpenId]=useState(null);
  useEffect(()=>{ API.get('/tasks').then(r=>setTasks(r.data)); }, []);
  return (
    <div>
      <h3>Aufträge (Alle)</h3>
      {tasks.map(t=> <TaskCard key={t.id} task={t} onOpen={(id)=>setOpenId(id)} />)}
      <TaskModal id={openId} onClose={()=>setOpenId(null)} />
    </div>
  );
}
