import { type FC, useState, useEffect } from 'react';
import cx from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Nav } from '../nav';
import { type TodoFilterType, type TodoModel } from './todo.models';
import { TodoFilter } from './todo.filter';
import { TodoInput } from './todo.input';
import { TodoList } from './todo.list';
import TodoService from './todo.service';

import styles from './todo.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

export const Todo: FC = () => {
    const queryClient = useQueryClient();

    const todoQuery = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const todoService = new TodoService();
            return todoService.getTodos();
        },
    });

    const [todoFilter, setTodoFilter] = useState<TodoFilterType>('all');

    useEffect(() => {
        const service = new TodoService();
        service.getTodos().then(console.log);
    });

    const addTodoAsync = async (text: string): Promise<void> => {
        const todoService = new TodoService();
        await todoService.addTodo(text);
    };

    const addMutation = useMutation({
        mutationFn: addTodoAsync,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    const handleNewTodo = (text: string) => {
        if (text.length === 0) {
            return;
        }

        addMutation.mutate(text);
    };

    const handleFilterChange = (val: TodoFilterType) => {
        setTodoFilter(val);
    };

    const markAsAsync = async (data: { id: number, completed: boolean }): Promise<void> => {
        const todoService = new TodoService();
        await todoService.setMarkedAs(data.id, data.completed);
    };

    const markAsMutation = useMutation({
        mutationFn: markAsAsync,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const handleMarkAs = (id: number, completed: boolean) => {
        markAsMutation.mutate({ id, completed });
    };

    const deleteAsync = async (id: number) => {
        const todoService = new TodoService();
        await todoService.deleteTodo(id);
    };

    const deleteMutation = useMutation({
        mutationFn: deleteAsync,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
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
                                    {!todoQuery.isLoading && !todoQuery.isError && todoQuery.data && (
                                        <TodoList todos={todoQuery.data} filter={todoFilter} onMarkAs={handleMarkAs} onDelete={handleDelete} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
