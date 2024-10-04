import { combineReducers } from "redux";

import { apiSlice } from "@/common/redux/slices/apiSlice";

const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default function rootReducer(state, action) {
  switch (action.type) {
    case "auth/logout":
      return combinedReducer(undefined, action);
    default:
      return combinedReducer(state, action);
  }
}
