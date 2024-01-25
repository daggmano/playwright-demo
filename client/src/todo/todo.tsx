import { type FC, useState } from 'react';
import cx from 'classnames';

import { Nav } from '../nav';
import { type TodoFilterType, type TodoModel } from './todo.models';
import { TodoFilter } from './todo.filter';
import { TodoInput } from './todo.input';
import { TodoList } from './todo.list';

import styles from './todo.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

export const Todo: FC = () => {
    const [todos, setTodos] = useState<TodoModel[]>([
        { id: 1, text: 'Create theme', completed: false },
        { id: 2, text: 'Work on wordpress', completed: false },
        { id: 3, text: 'Organise office main department', completed: false },
        { id: 4, text: 'Error solve in HTML template', completed: false },
    ]);
    
    const [todoFilter, setTodoFilter] = useState<TodoFilterType>('all');

    const handleNewTodo = (text: string) => {
        if (text.length === 0) {
            return;
        }

        const maxId = todos.reduce((p, v) => Math.max(p, v.id), 0);
        setTodos([...todos, { id: maxId + 1, text, completed: false } ]);
    };

    const handleFilterChange = (val: TodoFilterType) => {
        setTodoFilter(val);
    };

    const handleMarkAs = (id: number, complete: boolean) => {
        const newList = [...todos];
        const item = newList.find((i) => i.id === id);
        if (item) {
            item.completed = complete;
        }

        setTodos(newList);
    };

    const handleDelete = (id: number) => {
        const newList = [...todos].filter((i) => i.id !== id);
        setTodos(newList);
    };

    return (
        <div>
            <Nav />
            <div className={styles.todoWrapper}>
                <div className={cx('container', styles.todoContainer)}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Todo List</h1>
                            <div className="card card-white">
                                <div className="card-body">
                                    <TodoInput onAddTodo={handleNewTodo} />
                                    <TodoFilter currentFilter={todoFilter} onChange={handleFilterChange} />
                                    <TodoList todos={todos} filter={todoFilter} onMarkAs={handleMarkAs} onDelete={handleDelete} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
