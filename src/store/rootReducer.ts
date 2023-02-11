import { combineReducers } from "redux";

import weatherReducer from "./weather/reducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
