import { combineReducers } from 'redux';
import { parksReducer } from './parksReducer';
import { visitedParksReducer } from './visitedParksReducer';
import { bucketListParksReducer } from './bucketListParksReducer';
import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { displayedParksReducer } from './displayedParksReducer';
import { usStatesReducer } from './usStatesReducer';

const rootReducer = combineReducers({
  parks: parksReducer,
  usStates: usStatesReducer,
  visitedParkCodes: visitedParksReducer,
  bucketListParkCodes: bucketListParksReducer,
  parksToDisplay: displayedParksReducer,
  error: errorReducer,
  loading: loadingReducer,
});

export default rootReducer;