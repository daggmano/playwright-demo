import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Nav: FC = () => (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/todo">Todo</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);
