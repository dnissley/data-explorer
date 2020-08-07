import React from 'react';
import ReactDataSheet from 'react-datasheet';
import {
  TrackedEntity,
  ColumnValuePairs,
} from '../features/dataExplorer/entity';
import { DbTypes } from '../dataSources/mysql';

interface Cell extends ReactDataSheet.Cell<Cell> {
  value: DbTypes;
}

class TypedDataSheet extends ReactDataSheet<Cell> {}

type EntityPropTypes = {
  entity: TrackedEntity;
};

const formatGridData = (data: ColumnValuePairs): Cell[][] => {
  return Object.keys(data).map((columnName) => {
    return [{ value: columnName }, { value: data[columnName] }];
  });
};

const valueRenderer = (cell: Cell) => {
  if (typeof cell.value === 'boolean') {
    return String(cell.value);
  }
  return cell.value;
};

const Entity: React.FunctionComponent<EntityPropTypes> = ({ entity }) => {
  if (Array.isArray(entity.data)) {
    return <div>Not supporting multiple record entities currently.</div>;
  }
  const data = entity.data || {};
  const mainContent = (
    <TypedDataSheet data={formatGridData(data)} valueRenderer={valueRenderer} />
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
