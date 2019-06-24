import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import router from './reducers/router'

export default combineReducers({
  router,
  form: formReducer,
})