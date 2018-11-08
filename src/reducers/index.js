import { combineReducers } from 'redux';
import EvalueesReducer from './reducer_evaluee';
import ActiveReducer from './reducer_active_evaluee';

const rootReducer = combineReducers({
    evaluees: EvalueesReducer,
    activeEvaluee : ActiveReducer
});

export default rootReducer;