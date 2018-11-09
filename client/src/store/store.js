import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './reducers/index';


// this sets up the redux devtools store in the browser. this goes before the store is created.


const initialState = {}
const middleware = [thunk]
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootreducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  );



export default store;
