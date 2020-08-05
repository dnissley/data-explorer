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

const GridItem = styled.div`
  border: 1px solid black;
  margin: 3px;
  padding: 3px;
  overflow: auto;
  font-family: Monaco;
  font-size: 70%;

  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 1);
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(136, 136, 136);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(85, 85, 85);
  }
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: rebeccapurple;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const StyledGridLayout = styled(GridLayout)`
  /* node_modules/react-grid-layout/css/styles.css */

  .react-grid-layout {
    position: relative;
    transition: height 200ms ease;
  }
  .react-grid-item {
    transition: all 200ms ease;
    transition-property: left, top;
  }
  .react-grid-item.cssTransforms {
    transition-property: transform;
  }
  .react-grid-item.resizing {
    z-index: 1;
    will-change: width, height;
  }

  .react-grid-item.react-draggable-dragging {
    transition: none;
    z-index: 3;
    will-change: transform;
  }

  .react-grid-item.dropping {
    visibility: hidden;
  }

  .react-grid-item.react-grid-placeholder {
    background: red;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .react-grid-item > .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }

  .react-grid-item > .react-resizable-handle::after {
    content: '';
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 5px;
    height: 5px;
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  }

  .react-resizable-hide > .react-resizable-handle {
    display: none;
  }

  /* node_modules/react-resizable/css/styles.css */

  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
    background-position: bottom right;
    padding: 0 3px 3px 0;
  }
  .react-resizable-handle-sw {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
    transform: rotate(90deg);
  }
  .react-resizable-handle-se {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }
  .react-resizable-handle-nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
    transform: rotate(180deg);
  }
  .react-resizable-handle-ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
    transform: rotate(270deg);
  }
  .react-resizable-handle-w,
  .react-resizable-handle-e {
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
  }
  .react-resizable-handle-w {
    left: 0;
    transform: rotate(135deg);
  }
  .react-resizable-handle-e {
    right: 0;
    transform: rotate(315deg);
  }
  .react-resizable-handle-n,
  .react-resizable-handle-s {
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }
  .react-resizable-handle-n {
    top: 0;
    transform: rotate(225deg);
  }
  .react-resizable-handle-s {
    bottom: 0;
    transform: rotate(45deg);
  }
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
    <StyledGridLayout layout={layout} cols={12} rowHeight={30} width={800}>
      <GridItem key="backButton" className="backButton">
        <Link to={routes.HOME}>&lt;-</Link>
      </GridItem>
      {Object.keys(entities).map((e) => (
        <GridItem key={`entity_${e}`}>
          <Entity entity={entities[e]} />
        </GridItem>
      ))}
      <GridItem key="counter" className="counter">
        {value}
      </GridItem>
      <GridItem key="counterButtons" className="btnGroup">
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
      </GridItem>
    </StyledGridLayout>
  );
}
