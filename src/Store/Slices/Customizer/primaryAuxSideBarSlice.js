import { createSlice } from '@reduxjs/toolkit';
import { tabList } from '../../../Data/localData';

const initialState = {
    value: {
        label: tabList[0]?.label,
        value: tabList[0]?.value,
    }
};

export const primaryAuxSideBarSlice = createSlice({
    name: 'primaryAuxSideBar',
    initialState,
    reducers: {
        storePrimaryAuxSideBar: (state, action) => {
            state.value = action.payload;
        },
        removePrimaryAuxSideBar: (state) => {
            state.value = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { storePrimaryAuxSideBar, removePrimaryAuxSideBar } = primaryAuxSideBarSlice.actions;

export default primaryAuxSideBarSlice.reducer;