import React, { useState } from 'react';
import Modal from './Modal';
import { EntityDefinition } from '../features/dataExplorer/entity';

interface AddEntityModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (entity: EntityDefinition) => void;
}

const AddEntityModal: React.FC<AddEntityModalProps> = ({
  show,
  onClose,
  onSubmit,
}) => {
  const [entityName, setEntityName] = useState('');
  const [entityTable, setEntityTable] = useState('');
  const [entityWhereColumn, setEntityWhereColumn] = useState('');
  const [entityWhereValue, setEntityWhereValue] = useState('');

  const buildEntity = () => ({
    sourceType: 'mysql',
    name: entityName,
    table: entityTable,
    where: {
      [entityWhereColumn]: entityWhereValue,
    },
  });

  const clearInput = () => {
    setEntityName('');
    setEntityTable('');
    setEntityWhereColumn('');
    setEntityWhereValue('');
  };

  return (
    <Modal title="Add Entity" show={show} onClose={onClose}>
      <div>
        <label htmlFor="entityName">
          Name:
          <input
            name="entityName"
            type="text"
            value={entityName}
            onChange={(e) => setEntityName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="entityTable">
          Table:
          <input
            name="entityTable"
            type="text"
            value={entityTable}
            onChange={(e) => setEntityTable(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="entityWhere">
          Where:
          <input
            name="entityWhereColumn"
            type="text"
            value={entityWhereColumn}
            onChange={(e) => setEntityWhereColumn(e.target.value)}
          />
          =
          <input
            name="entityWhereValue"
            type="text"
            value={entityWhereValue}
            onChange={(e) => setEntityWhereValue(e.target.value)}
          />
        </label>
      </div>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
      <button
        type="button"
        onClick={() => {
          onSubmit(buildEntity());
          clearInput();
        }}
      >
        Add Entity
      </button>
    </Modal>
  );
};

export default AddEntityModal;
