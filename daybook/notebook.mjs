import {createTask,validDate} from './model.mjs?v=18a3bd7a326b';

export function addReminder(tasks,title,now=new Date()) {
  title=String(title??'').trim();
  if (!title || title.length>120) throw Error('Use a check-in name from 1 to 120 characters.');
  const task=createTask({title,category:'Personal'},now);
  return [{...task,reminderId:task.id,surface:'internships'},...tasks];
}
export function currentReminders(tasks) {
  const latest=new Map();
  for (const task of tasks) {
    if (!task.reminderId || task.deletedAt) continue;
    const previous=latest.get(task.reminderId);
    if (!previous || task.createdAt>previous.createdAt) latest.set(task.reminderId,task);
  }
  return [...latest.values()];
}
export function nextReminder(tasks,id,now=new Date()) {
  const previous=tasks.find(t=>t.id===id&&t.reminderId&&t.completedAt&&!t.deletedAt);
  if (!previous) throw Error('Complete this check-in before starting another.');
  if (tasks.some(t=>t.reminderId===previous.reminderId&&!t.completedAt&&!t.deletedAt)) throw Error('This check-in is already open.');
  return [{...createTask({title:previous.title,category:previous.category},now),reminderId:previous.reminderId,surface:'internships',parentId:previous.id},...tasks];
}
export function renameReminder(tasks,id,title) {
  title=String(title).trim();
  if (!title || title.length>120) throw Error('Use a check-in name from 1 to 120 characters.');
  if (!tasks.some(t=>t.id===id&&t.reminderId&&!t.deletedAt)) throw Error('This check-in is no longer available.');
  return tasks.map(t=>t.id===id?{...t,title}:t);
}

// Validate and normalize before replacing either browser or native storage.
export function parseNotebook(raw) {
  if (typeof raw!=='string'||raw.length>5*1024*1024) throw Error('Choose a valid Daybook JSON backup (up to 5 MB).');
  const value=JSON.parse(raw);
  if (!value || value.version!==1 || !Array.isArray(value.tasks) || value.tasks.length>20000) throw Error('Unsupported notebook format.');
  const timestamp=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(v)&&Number.isFinite(Date.parse(v));
  const ids=new Set();
  const tasks=value.tasks.map(t=>{
    if (!t || typeof t!=='object' || typeof t.id!=='string'||!t.id||ids.has(t.id)||!timestamp(t.createdAt)) throw Error('The backup contains an invalid task.');
    ids.add(t.id);
    if (typeof t.title!=='string'||!['none','daily','weekly'].includes(t.repeat)||![1,2,3].includes(t.importance)) throw Error('The backup contains invalid task fields.');
    for (const field of ['completedAt','deletedAt']) if(t[field]!=null&&!timestamp(t[field])) throw Error('The backup contains an invalid timestamp.');
    if (t.available && (typeof t.available!=='string'||!validDate(t.available))) throw Error('The backup contains an invalid availability date.');
    const clean=createTask(t,new Date(t.createdAt));
    const result={...clean,id:t.id,available:t.available||'',completedAt:t.completedAt??null,deletedAt:t.deletedAt??null};
    for (const field of ['parentId','reminderId']) if(typeof t[field]==='string')result[field]=t[field];
    if (t.surface==='internships')result.surface='internships';
    return result;
  });
  const source=value.references??[];
  if (!Array.isArray(source)||source.length>2000)throw Error('The backup contains invalid notes.');
  const references=source.map(n=>{
    if (!n||typeof n.title!=='string'||!n.title.trim()||n.title.length>120||typeof n.description!=='string'||n.description.length>10000||!Array.isArray(n.items)||n.items.some(i=>typeof i!=='string'||i.length>10000))throw Error('The backup contains an invalid note.');
    return {title:n.title,description:n.description,items:n.items,...(n.scope==='internships'?{scope:'internships'}:{})};
  });
  return {version:1,tasks,references};
}
