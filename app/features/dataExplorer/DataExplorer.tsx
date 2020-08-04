/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../constants/routes.json';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
  selectCount,
  addEntity,
  selectEntities,
} from './dataExplorerSlice';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: rebeccapurple;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

export default function DataExplorer() {
  const dispatch = useDispatch();
  const value = useSelector(selectCount);
  const entities = useSelector(selectEntities);
  useEffect(() => {
    dispatch(
      addEntity({
        name: 'Dylan Nissley',
        table: 'users',
        where: { username: 'dylan.nissley@bluecrewjobs.com' },
      })
    );
  }, [dispatch]);
  return (
    <div>
      <div className="backButton">
        <Link to={routes.HOME}>&lt;-</Link>
      </div>
      <div>
        <h2>Entities:</h2>
        {Object.keys(entities).map((e) => (
          <div key={e}>
            {e} ::: {JSON.stringify(entities[e])}
          </div>
        ))}
      </div>
      <div className="counter">{value}</div>
      <div className="btnGroup">
        <Button
          className="btn"
          onClick={() => {
            dispatch(increment());
          }}
          type="button"
        >
          +
        </Button>
        <Button
          className="btn"
          onClick={() => {
            dispatch(decrement());
          }}
          type="button"
        >
          -
        </Button>
        <Button
          className="btn"
          onClick={() => {
            dispatch(incrementIfOdd());
          }}
          type="button"
        >
          odd
        </Button>
        <Button
          className="btn"
          onClick={() => {
            dispatch(incrementAsync());
          }}
          type="button"
        >
          async
        </Button>
      </div>
    </div>
  );
}
