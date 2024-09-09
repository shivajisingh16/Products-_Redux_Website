import { combineReducers, createStore } from "redux";
import orderReducer from "./Reducers/orders";
import productReducer from "./Reducers/products";

const reducer = combineReducers({
  orders: orderReducer,
  products:productReducer
})

export type State = ReturnType<typeof reducer>;

const store = createStore(reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;