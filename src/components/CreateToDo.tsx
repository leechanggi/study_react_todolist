import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from './atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDoState);

  const handleValid = ({ toDo }: IForm) => {
    setToDos(oldToDos => [{ text: toDo, id: Date.now(), category: 'TO_DO' }, ...oldToDos]);
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
