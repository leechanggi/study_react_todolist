import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState, Categories } from './atoms';

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      {text}
      {category !== Categories.DOING && (
        <button type="button" name={Categories.DOING} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button type="button" name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button type="button" name={Categories.DONE} onClick={onClick}>
          DONE
        </button>
      )}
    </li>
  );
}

export default ToDo;
