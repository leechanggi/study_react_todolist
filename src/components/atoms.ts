import { atom, selector } from 'recoil';

export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const todos = get(toDoState);
    return [todos.filter(toDo => toDo.category === 'TO_DO'), todos.filter(toDo => toDo.category === 'DOING'), todos.filter(toDo => toDo.category === 'DONE')];
  },
});
