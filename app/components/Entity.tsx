import React from 'react';
import ReactTooltip from 'react-tooltip';
import { TrackedEntity } from '../features/dataExplorer/entity';

type EntityPropTypes = {
  entity: TrackedEntity;
};

const Entity: React.FunctionComponent<EntityPropTypes> = ({ entity }) => {
  if (Array.isArray(entity.data)) {
    return <div>Not supporting multiple record entities currently.</div>;
  }
  const data = entity.data || {};
  const mainContent = (
    <div>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data)
            .sort()
            .map((columnName) => {
              return (
                <tr key={columnName}>
                  <td data-tip data-for={`entity_${entity.name}_${columnName}`}>
                    <div>
                      {columnName.length > 10
                        ? `${columnName.substr(0, 9)}…`
                        : columnName}
                    </div>
                    {columnName.length > 10 ? (
                      <ReactTooltip
                        id={`entity_${entity.name}_${columnName}`}
                        effect="solid"
                      >
                        <span>{columnName}</span>
                      </ReactTooltip>
                    ) : null}
                  </td>
                  <td>{data[columnName]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
  if (entity.error) {
    return (
      <div>
        <div>{`Error: ${entity.error.name} -- ${entity.error.message}`}</div>
        {mainContent}
      </div>
    );
  }
  if (entity.loading) {
    return (
      <div>
        <div>Loading...</div>
        {mainContent}
      </div>
    );
  }
  return mainContent;
};

export default Entity;
