import React from 'react';
import { useRecoilValue } from 'recoil';
import { toDoState, toDoSelector } from './atoms';

import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1>To Dos</h1>
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>DOING</h2>
      <ul>
        {doing.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>DONE</h2>
      <ul>
        {done.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
