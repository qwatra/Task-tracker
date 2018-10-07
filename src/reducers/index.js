import { combineReducers } from 'redux';

import tasks from './tasks';
import auth from './auth';
import userOpt from './userOptions';

export default combineReducers({
    tasks,
    auth,
    userOpt
})