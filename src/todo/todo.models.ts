export type TodoModel = {
    id: number,
    text: string;
    completed: boolean;
};

export type TodoFilterType = 'all' | 'completed' | 'incomplete';
