import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EnumDBUserColor, IAuthSliceState, IDBUser, IJWTTokens } from "../../types/redux/auth";

const localStorageToken = localStorage.getItem("access_token");

const initialState: IAuthSliceState = {
    user: null,
    tokens: {
        access_token: localStorageToken ? localStorageToken : undefined 
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IDBUser>) {
            state.user = action.payload;
        },

        setTokens(state, action: PayloadAction<IJWTTokens>) {
            state.tokens = action.payload; 

            localStorage.setItem("access_token", action.payload.access_token);
        },

        setAccessToken(state, action: PayloadAction<string>) {
            state.tokens = {
                ...state.tokens,
                access_token: action.payload
            }

            localStorage.setItem("access_token", action.payload);
        },
        
        removeUser(state) {
            state.user = null;
            state.tokens = null;
            localStorage.removeItem("access_token");   
        },

        setPicProfile(state, action: PayloadAction<string | undefined>) {
            if (state.user) {
                state.user.picUrl = action.payload;
            } 
        },

        setPicColor(state, action: PayloadAction<EnumDBUserColor>) {
            if (state.user) {
                state.user.picColor = action.payload;
            } 
        }
    }
})

export const { 
    setUser, 
    setAccessToken, 
    setTokens, 
    removeUser, 
    setPicProfile,
    setPicColor
} = authSlice.actions;

export default authSlice.reducer