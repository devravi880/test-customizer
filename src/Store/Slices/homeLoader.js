import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../Config/config';

const initialState = {
    value: JSON.parse(localStorage.getItem(storage.loader)) || null
};

export const homeLoaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        storeLoader: (state, action) => {
            state.value = action.payload;
            localStorage.setItem(storage.loader, JSON.stringify(state.value));
        },
        removeLoader: (state) => {
            state.value = null;
            localStorage.removeItem(storage.loader);
        },
    },
});

// Action creators are generated for each case reducer function
export const { storeLoader, removeLoader } = homeLoaderSlice.actions;

export default homeLoaderSlice.reducer;