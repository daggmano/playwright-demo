import { FC } from 'react';

import { type TodoFilterType, type TodoModel } from './todo.models';
import { TodoItem } from './todo.item';

interface TodoListProps {
    todos: TodoModel[];
    filter: TodoFilterType;
    onMarkAs: (id: number, complete: boolean) => void;
    onDelete: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, filter, onMarkAs, onDelete }) => (
    <ul className="list-group">
        {todos.filter((i) => filter === 'all' || (filter === 'completed' && i.completed) || (filter === 'incomplete' && !i.completed)).map((item) => (
            <TodoItem key={item.id} todo={item} onMarkAs={(complete) => onMarkAs(item.id, complete)} onDelete={() => onDelete(item.id)} />
        ))}
    </ul>
);
