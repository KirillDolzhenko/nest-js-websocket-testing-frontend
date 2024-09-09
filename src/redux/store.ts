import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import { authApi } from "./api/auth.api";
import { filesApi } from "./api/files.api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [filesApi.reducerPath]: filesApi.reducer,
        authSlice
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(authApi.middleware, filesApi.middleware),
    // devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch