import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

function add(num) {
  return { type: 'add', num }
}

function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num))
    }, 1000)
  }
}

const initialState = {
  count: 0
}

const userInitialState = {
  username: 'jokcy',
  age: 18
}

function countReducer(state = initialState, action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1, num: action.num || 1 }
    case 'del':
      return { count: state.count - 1, num: state.num }
    default:
      return state
  }
}

function userReducer(state = userInitialState, action) {
  switch(action.type) {
    case 'updateName':
      return {
        ...state,
        username: action.name
      }
    default:
      return state
  }
}

const allReducers = combineReducers({
  count: countReducer,
  user: userReducer
})

export default function initializeStore(state) {
  const store = createStore(
    allReducers, 
    Object.assign({}, {
      count: initialState,
      user: userInitialState
    }, state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}