import { FC } from 'react';

import { TodoModel } from './todo.models';

interface TodoItemProps {
    todo: TodoModel;
    onMarkAs: (complete: boolean) => void;
    onDelete: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onMarkAs, onDelete }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
            <input type="checkbox" className="form-check-input me-1" checked={todo.completed} onChange={() => onMarkAs(!todo.completed)} />
            <span>{todo.text}</span>
        </div>
        <button type="button" className="btn-close" onClick={onDelete} />
    </li>
);
