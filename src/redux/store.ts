import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import chatSlice from "./slice/chatSlice";
import fileSlice from "./slice/fileSlice";
import { authApi } from "./api/auth.api";
import { filesApi } from "./api/files.api";
import { chatApi } from "./api/chat.api";
import { groupApi } from "./api/group.api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [filesApi.reducerPath]: filesApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        fileSlice,
        authSlice,
        chatSlice
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            filesApi.middleware,
            chatApi.middleware,
            groupApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch