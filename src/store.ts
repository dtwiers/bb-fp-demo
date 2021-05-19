import * as A from 'fp-ts/lib/Array';
import { AnyAction, Reducer } from 'redux';

type TodoStatus = 'To Do' | 'Doing' | 'Done';

type TodoItem = {
  title: string;
  status: TodoStatus;
};

type Store = {
  todos: TodoItem[];
};

const addTodo =
  (item: TodoItem) =>
  (store: Store): Store => ({
    ...store,
    todos: A.append(item)(store.todos),
  });

const removeTodo =
  (index: number) =>
  (store: Store): Store => ({
    ...store,
    todos: A.unsafeDeleteAt(index, store.todos),
  });

type ReplacePayload = {
  index: number;
  item: TodoItem;
};
const replaceTodo =
  (payload: ReplacePayload) =>
  (store: Store): Store => ({
    ...store,
    todos: A.unsafeUpdateAt(payload.index, payload.item, store.todos),
  });

const newTodo = (title: string): TodoItem => ({ title, status: 'To Do' });

const doTodo = (todo: TodoItem): TodoItem => ({ ...todo, status: 'Doing' });

const completeTodo = (todo: TodoItem): TodoItem => ({
  ...todo,
  status: 'Done',
});

type ReduxAction<T extends string, P> = {
  type: T;
  payload: P;
};

const ActionTypes = {
  ADD: 'add',
  DELETE: 'delete',
  DO: 'do',
  COMPLETE: 'complete',
} as const;

const actionCreators = {
  addTodo: (title: string): ReduxAction<typeof ActionTypes.ADD, TodoItem> => ({
    type: ActionTypes.ADD,
    payload: newTodo(title),
  }),
  removeTodo: (
    index: number
  ): ReduxAction<typeof ActionTypes.DELETE, number> => ({
    type: ActionTypes.DELETE,
    payload: index,
  }),
  doTodo: (index: number): ReduxAction<typeof ActionTypes.DO, number> => ({
    type: ActionTypes.DO,
    payload: index,
  }),
};

const reducer: Reducer = (state: Store, action: ReduxAction<any, any>) => {};
