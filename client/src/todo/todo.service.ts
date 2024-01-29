import { httpDelete, httpGet, httpPost, httpPut } from '../service.base';
import { TodoModel } from './todo.models';

export default class TodoService {
    async getTodos(): Promise<TodoModel[]> {
        const url = '/api/todos';

        return await httpGet<TodoModel[]>(url);
    }

    async addTodo(text: string): Promise<TodoModel> {
        const url = '/api/todos';
        const model: TodoModel = {
            id: 0,
            text,
            completed: false,
        };

        return await httpPost<TodoModel>(url, model);
    }

    async setMarkedAs(id: number, completed: boolean): Promise<TodoModel> {
        const url = `/api/todos/${id}`;
        const model: TodoModel = {
            id,
            text: '',
            completed,
        };

        return await httpPut<TodoModel>(url, model);
    }

    async deleteTodo(id: number): Promise<void> {
        const url = `/api/todos/${id}`;

        return await httpDelete<void>(url);
    }
}
