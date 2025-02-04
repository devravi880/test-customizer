import { createSlice } from '@reduxjs/toolkit'
import { storage } from '../../Config/config';

const initialState = {
    value:  JSON.parse(localStorage.getItem(storage.store)) || null
};

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        addStore: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(storage.store, JSON.stringify(state.value));
        },
        removeStore: (state) => {
            state.value = null;
            localStorage.removeItem(storage.store);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addStore, removeStore } = storeSlice.actions

export default storeSlice.reducer