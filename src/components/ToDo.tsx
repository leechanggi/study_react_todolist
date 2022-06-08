import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IToDo, toDoState, Categories } from './atoms';

function ToDo({ text, id, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const addList = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    });
  };

  const delList = () => {
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)];
    });
  };

  return (
    <li>
      {text}
      {category !== Categories.DOING && (
        <button type="button" name={Categories.DOING} onClick={addList}>
          DOING
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button type="button" name={Categories.TO_DO} onClick={addList}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button type="button" name={Categories.DONE} onClick={addList}>
          DONE
        </button>
      )}
      <button type="button" onClick={delList}>
        DEL
      </button>
    </li>
  );
}

export default ToDo;
