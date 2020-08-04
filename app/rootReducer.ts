import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
// eslint-disable-next-line import/no-cycle
import dataExplorerReducer from './features/dataExplorer/dataExplorerSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    dataExplorer: dataExplorerReducer,
    counter: counterReducer,
  });
}
