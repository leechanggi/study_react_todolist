import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from './atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const handleValid = ({ toDo }: IForm) => {
    setToDos(oldToDos => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);
    setValue('toDo', '');
  };

  return (
    <div id="CreateToDo" className="createToDo">
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('toDo', {
            required: 'Please write a To Do',
          })}
          placeholder="Write a to do"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateToDo;
