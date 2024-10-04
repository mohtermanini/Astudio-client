import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "@/common/redux/reducer";
import { apiSlice } from "@/common/redux/slices/apiSlice";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
