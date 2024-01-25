import { type ChangeEvent, type FC, type FormEvent, useState } from 'react';

interface TodoInputProps {
    onAddTodo: (text: string) => void;
}

export const TodoInput: FC<TodoInputProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.length === 0) {
            return;
        }

        onAddTodo(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-control add-task" placeholder="New Task..." value={inputValue} onChange={handleChange} />
        </form>
    );
};
