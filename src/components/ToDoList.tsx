import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { toDoSelector, categoryState, toDoState, Categories } from './atoms';

import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const toDosSel = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const saveData = (event: React.MouseEvent<HTMLButtonElement>) => {
    const toDosString = JSON.stringify(toDos);
    if (toDos.length) {
      window.localStorage.setItem('toDos', toDosString);
    }
  };

  const callData = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (window.localStorage.getItem('toDos') !== null) {
      const toDosString = window.localStorage.getItem('toDos');
      const toDosCalled = JSON.parse(toDosString as any);
      setToDos(toDosCalled);
    }
  };

  const removeData = (event: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.removeItem('toDos');
  };

  return (
    <div>
      <h1>To Dos</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>ToDo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDosSel?.map(toDo => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      <button type="button" onClick={saveData}>
        Save
      </button>
      <button type="button" onClick={callData}>
        Load
      </button>
      <button type="button" onClick={removeData}>
        Reset
      </button>
    </div>
  );
}

export default ToDoList;
