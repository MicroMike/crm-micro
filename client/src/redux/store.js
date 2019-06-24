import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducer from 'redux/reducers'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      thunk,
      logger
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store
