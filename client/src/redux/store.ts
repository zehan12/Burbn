import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { PRODUCTION } from "../constant/general";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with the rootReducer and saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== PRODUCTION,
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
