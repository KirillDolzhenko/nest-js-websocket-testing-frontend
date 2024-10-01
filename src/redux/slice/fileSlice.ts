import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFileSliceState } from "@/types/redux/files";


const initialState: IFileSliceState = {
    uploadActive: false,
    uploadState: 0,
    
    loadActive: false,
    loadState: 0,
}

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        setUploadActive(state, action: PayloadAction<boolean>) {
            state.uploadActive = action.payload;
        },
        setUploadState(state, action: PayloadAction<number>) {
            state.uploadState = action.payload;
        },

        setLoadActive(state, action: PayloadAction<boolean>) {
            state.loadActive = action.payload;
        },
        setLoadState(state, action: PayloadAction<number>) {
            state.loadState = action.payload;
        },
    }
})

export const { 
    setUploadActive, 
    setUploadState, 
    setLoadActive, 
    setLoadState
} = fileSlice.actions;

export default fileSlice.reducer