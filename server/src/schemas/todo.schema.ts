import { RxJsonSchema } from 'rxdb';

export type TodoModel = {
    id: string;
    text: string;
    completed: boolean;
};

export const todoSchema: RxJsonSchema<TodoModel> = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100,
        },
        text: {
            type: 'string',
        },
        completed: {
            type: 'boolean',
        },
    },
    required: ['id', 'text', 'completed'],
};
