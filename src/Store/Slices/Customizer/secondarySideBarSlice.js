import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        position: false,
        visible: false
    }
};

export const secondarySideBarSlice = createSlice({
    name: 'secondarySideBar',
    initialState,
    reducers: {
        storeSecondarySideBar: (state, action) => {
            state.value = action.payload;
        },
        removeSecondarySideBar: (state) => {
            state.value = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { storeSecondarySideBar, removeSecondarySideBar } = secondarySideBarSlice.actions;

export default secondarySideBarSlice.reducer;