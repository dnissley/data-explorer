import { createSlice, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import mysql from '../../dataSources/mysql';
import {
  ColumnValuePairs,
  EntityDefinition,
  generateSelectQuery,
} from './entity';

interface DeclareEntity extends Action<string> {
  payload: EntityDefinition;
}

interface LoadEntity extends Action<string> {
  payload: {
    name: string;
    data: ColumnValuePairs[];
  };
}

interface InvalidateEntity extends Action<string> {
  payload: {
    name: string;
    error: Error;
  };
}

export interface TrackedEntity extends EntityDefinition {
  loading: boolean;
  error?: string;
  data?: ColumnValuePairs | ColumnValuePairs[];
}

export interface TrackedEntities {
  [entityName: string]: TrackedEntity;
}

type DataExplorerState = {
  value: number;
  entities: TrackedEntities;
};

const dataExplorerSlice = createSlice({
  name: 'dataExplorer',
  initialState: { value: 0, entities: {} } as DataExplorerState,
  reducers: {
    declareEntity: (state, action: DeclareEntity) => {
      state.entities[action.payload.name] = {
        ...action.payload,
        loading: true,
      };
    },
    loadEntity: (state, action: LoadEntity) => {
      const entity = state.entities[action.payload.name];
      entity.loading = false;
      entity.error = undefined;
      switch (action.payload.data.length) {
        case 0:
          entity.error = 'No data found';
          entity.data = [];
          break;
        case 1:
          [entity.data] = action.payload.data;
          break;
        default:
          entity.data = action.payload.data;
      }
    },
    invalidateEntity: (state, action: InvalidateEntity) => {
      const entity = state.entities[action.payload.name];
      entity.loading = false;
      entity.error = action.payload.error.message;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = dataExplorerSlice.actions;

export const incrementIfOdd = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.dataExplorer.value % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
};

export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export const addEntity = (entity: EntityDefinition): AppThunk => {
  return async (dispatch) => {
    // const state = getState();
    // TODO: check if an entity exists under the given name...
    dispatch(dataExplorerSlice.actions.declareEntity(entity));
    try {
      const { records } = await mysql.query(generateSelectQuery(entity));
      dispatch(
        dataExplorerSlice.actions.loadEntity({
          name: entity.name,
          data: records,
        })
      );
    } catch (e) {
      dispatch(
        dataExplorerSlice.actions.invalidateEntity({
          name: entity.name,
          error: { name: e.name, message: e.message, stack: e.stack },
        })
      );
    }
  };
};

export default dataExplorerSlice.reducer;

export const selectCount = (state: RootState) => state.dataExplorer.value;

export const selectEntities = (state: RootState) => state.dataExplorer.entities;
