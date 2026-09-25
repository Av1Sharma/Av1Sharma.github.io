import test from 'node:test';
import assert from 'node:assert/strict';
import {createTask,complete} from '../model.mjs';
import {parseNotebook,addReminder,currentReminders,nextReminder} from '../notebook.mjs';
const now=new Date('2026-09-24T12:00:00Z');
test('public notebooks start empty and backups round trip',()=>{
 assert.deepEqual(parseNotebook('{"version":1,"tasks":[]}'),{version:1,tasks:[],references:[]});
 const state={version:1,tasks:[createTask({title:'A new task'},now)],references:[{title:'Ideas',description:'My own notes',items:[]}]};
 assert.deepEqual(parseNotebook(JSON.stringify(state)),state);
});
test('malformed backups are rejected before they can replace stored data',()=>{
 const task=createTask({title:'Task'},now);
 for(const value of [null,{version:2,tasks:[]},{version:1,tasks:[{}]},{version:1,tasks:[task,task]},{version:1,tasks:[{...task,completedAt:'yesterday'}]},{version:1,tasks:[],references:[{title:'Broken'}]}])assert.throws(()=>parseNotebook(JSON.stringify(value)));
});
test('check-ins belong to the user; none are seeded and any number can be added',()=>{
 assert.deepEqual(currentReminders([]),[]);
 let tasks=[];for(let i=0;i<5;i++)tasks=addReminder(tasks,`Routine ${i+1}`,now);
 assert.equal(currentReminders(tasks).length,5);
 const id=tasks[0].id;tasks=complete(tasks,id,now);
 tasks=nextReminder(tasks,id,new Date('2026-09-25T12:00:00Z'));
 assert.equal(currentReminders(tasks).length,5);
 assert.equal(tasks.filter(t=>t.completedAt).length,1);
 assert.throws(()=>nextReminder(tasks,id));
});
