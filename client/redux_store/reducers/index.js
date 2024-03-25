import { combineReducers } from "redux";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({ data: productsReducer });

export default rootReducer;
