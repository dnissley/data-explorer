import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
import routes from '../../constants/routes.json';
import {
  addEntity,
  removeEntity,
  reloadAllEntities,
  selectEntities,
} from './dataExplorerSlice';
import Entity from '../../components/Entity';
import WindowFrame from '../../components/WindowFrame';
import AddEntityModal from '../../components/AddEntityModal';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: rebeccapurple;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const baseLayout: GridLayout.Layout[] = [
  { i: 'backButton', x: 0, y: 0, w: 2, h: 2 },
  { i: 'toolPane', x: 0, y: 2, w: 2, h: 4 },
  { i: 'counter', x: 0, y: 6, w: 2, h: 2 },
  { i: 'counterButtons', x: 0, y: 8, w: 2, h: 2 },
];

export default function DataExplorer() {
  const dispatch = useDispatch();
  const entities = useSelector(selectEntities);
  const [entitiesInLayout] = useState(new Set<string>());
  const [layout, setLayout] = useState(baseLayout);
  const [showAddEntityModal, setShowAddEntityModal] = useState(false);

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
    const entitiesToAdd: GridLayout.Layout[] = [];
    Object.keys(entities).forEach((entityName) => {
      if (!entitiesInLayout.has(entityName)) {
        entitiesInLayout.add(entityName);
        entitiesToAdd.push({
          i: `entity_${entityName}`,
          x: 2,
          y: 0,
          w: 6,
          h: 4,
        });
      }
    });
    if (entitiesToAdd.length > 0) {
      setLayout([...layout, ...entitiesToAdd]);
    }
  }, [entities, entitiesInLayout, layout]);

  return (
    <div>
      <AddEntityModal
        show={showAddEntityModal}
        onClose={() => setShowAddEntityModal(false)}
        onSubmit={(entity) => {
          setShowAddEntityModal(false);
          dispatch(addEntity(entity));
        }}
      />
      <GridLayout
        layout={layout}
        onLayoutChange={setLayout}
        cols={12}
        rowHeight={30}
        width={800}
        draggableHandle=".dragHandle"
      >
        <WindowFrame title="Back Button" key="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </WindowFrame>
        <WindowFrame title="Tools" key="toolPane">
          <Button
            onClick={() => {
              setShowAddEntityModal(true);
            }}
          >
            <i className="fa fa-plus fa-3x" />
          </Button>
          <Button onClick={() => dispatch(reloadAllEntities())}>
            <i className="fa fa-sync-alt fa-3x" />
          </Button>
        </WindowFrame>
        {Object.keys(entities).map((entityName) => (
          <WindowFrame
            title={`Entity: ${entityName}`}
            key={`entity_${entityName}`}
            controls={[
              {
                name: 'close',
                icon: <i className="fa fa-times" />,
                action: () => {
                  dispatch(removeEntity({ name: entityName }));
                },
              },
            ]}
          >
            <Entity entity={entities[entityName]} />
          </WindowFrame>
        ))}
      </GridLayout>
    </div>
  );
}
