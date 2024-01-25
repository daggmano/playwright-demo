import { FC } from 'react';
import cx from 'classnames';

import { TodoFilterType } from './todo.models';

import styles from './todo.module.scss';

interface TodoFilterProps {
    currentFilter: TodoFilterType;
    onChange: (val: TodoFilterType) => void;
}

export const TodoFilter: FC<TodoFilterProps> = ({ currentFilter, onChange }) => (
    <ul className="nav nav-pills todo-nav">
        <li role="presentation" className={cx('nav-item', 'all-task', { active: currentFilter === 'all' } )}>
            <button className="btn btn-link nav-link" onClick={() => onChange('all')}>All</button>
        </li>
        <li role="presentation" className={cx('nav-item', 'active-task', { active: currentFilter === 'incomplete' } )}>
            <button className="btn btn-link nav-link" onClick={() => onChange('incomplete')}>Active</button>
        </li>
        <li role="presentation" className={cx('nav-item', 'completed-task', { active: currentFilter === 'completed' } )}>
            <button className="btn btn-link nav-link" onClick={() => onChange('completed')}>Completed</button>
        </li>
    </ul>
);
