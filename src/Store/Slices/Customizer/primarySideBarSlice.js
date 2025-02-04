import { createSlice } from '@reduxjs/toolkit';
import { tempPrimarySidebar } from '../../../Data/localData';

const initialState = {
    value: tempPrimarySidebar ?? null
};

export const primarySideBarSlice = createSlice({
    name: 'primarySideBar',
    initialState,
    reducers: {
        storePrimarySideBar: (state, action) => {
            state.value = action.payload;
        },
        removePrimarySideBar: (state) => {
            state.value = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { storePrimarySideBar, removePrimarySideBar } = primarySideBarSlice.actions;

export default primarySideBarSlice.reducer;