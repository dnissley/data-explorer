/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
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
import { TrackedEntities } from './entity';
import Entity from '../../components/Entity';
import WindowFrame from '../../components/WindowFrame';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: rebeccapurple;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const baseLayout = [
  { i: 'backButton', x: 0, y: 0, w: 2, h: 2 },
  { i: 'counter', x: 0, y: 2, w: 2, h: 2 },
  { i: 'counterButtons', x: 0, y: 4, w: 2, h: 2 },
];

function generateLayout(entities: TrackedEntities): GridLayout.Layout[] {
  return [
    ...baseLayout,
    ...Object.keys(entities).map((entityName, i) => ({
      i: `entity_${entityName}`,
      x: 2,
      y: i * 2,
      w: 2,
      h: 2,
    })),
  ];
}

export default function DataExplorer() {
  const dispatch = useDispatch();
  const value = useSelector(selectCount);
  const entities = useSelector(selectEntities);
  const [layout, setLayout] = useState(generateLayout(entities));

  useEffect(() => {
    dispatch(
      addEntity({
        sourceType: 'mysql',
        name: 'Dylan Nissley',
        table: 'users',
        where: { username: 'dylan.nissley@bluecrewjobs.com' },
      })
    );
    dispatch(
      addEntity({
        sourceType: 'mysql',
        name: 'Troy Leach',
        table: 'users',
        where: { username: 'troy@bluecrewjobs.com' },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setLayout(generateLayout(entities));
  }, [entities]);

  return (
    <GridLayout
      layout={layout}
      cols={12}
      rowHeight={30}
      width={800}
      draggableHandle=".dragHandle"
    >
      <WindowFrame title="Back Button" key="backButton" className="backButton">
        <Link to={routes.HOME}>&lt;-</Link>
      </WindowFrame>
      {Object.keys(entities).map((entityName) => (
        <WindowFrame
          title={`Entity: ${entityName}`}
          key={`entity_${entityName}`}
        >
          <Entity entity={entities[entityName]} />
        </WindowFrame>
      ))}
      <WindowFrame title="Counter Value" key="counter" className="counter">
        {value}
      </WindowFrame>
      <WindowFrame
        title="Counter Controls"
        key="counterButtons"
        className="btnGroup"
      >
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
      </WindowFrame>
    </GridLayout>
  );
}
