import logo from './logo.svg';

import styles from './app.module.scss';
import { Nav } from './nav';

function App() {
    return (
        <div>
            <Nav />
            <div className={styles.app}>
                <header className={styles.appHeader}>
                    <img src={logo} className={styles.appLogo} alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className={styles.appLink}
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </div>
    );
}

export default App;
