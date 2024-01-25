import { FC } from 'react';
import cx from 'classnames';

import { TodoFilterType } from './todo.models';

import styles from './todo.module.scss';

interface TodoFilterProps {
    currentFilter: TodoFilterType;
    onChange: (val: TodoFilterType) => void;
}

export const TodoFilter: FC<TodoFilterProps> = ({ currentFilter, onChange }) => (
    <div className={cx('btn-group', styles.todoFilter)}>
        <button className={cx('btn', 'btn-primary', { active: currentFilter === 'all' } )} onClick={() => onChange('all')}>All</button>
        <button className={cx('btn', 'btn-primary', { active: currentFilter === 'incomplete' } )} onClick={() => onChange('incomplete')}>Active</button>
        <button className={cx('btn', 'btn-primary', { active: currentFilter === 'completed' } )} onClick={() => onChange('completed')}>Completed</button>
    </div>
);
