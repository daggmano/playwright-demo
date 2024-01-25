import { FC } from 'react';

import { TodoModel } from './todo.models';

interface TodoItemProps {
    todo: TodoModel;
    onMarkAs: (complete: boolean) => void;
    onDelete: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onMarkAs, onDelete }) => (
    <div className="todo-item">
        <div className="checker">
            <span className="">
                <input type="checkbox" checked={todo.completed} onChange={() => onMarkAs(!todo.completed)} />
            </span>
        </div>
        <span>{todo.text}</span>
        <button className="btn btn-link float-right remove-todo-item" onClick={onDelete}>
            [X]
        </button>
    </div>
);
