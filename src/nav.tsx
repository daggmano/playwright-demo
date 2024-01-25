import { FC } from 'react';

export const Nav: FC = () => (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/todo">Todo</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
