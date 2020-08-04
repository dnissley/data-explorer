import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <ul>
        <li>
          <Link to={routes.DATA_EXPLORER}>to Data Explorer</Link>
        </li>
        <li>
          <Link to={routes.COUNTER}>to Counter</Link>
        </li>
      </ul>
    </div>
  );
}
