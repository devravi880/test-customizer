import { createSlice } from '@reduxjs/toolkit';
import { defaultSections } from '../../../Data/localData';

const initialState = {
    value: defaultSections ?? null
};

export const primarySectionsSlice = createSlice({
    name: 'primarySections',
    initialState,
    reducers: {
        storePrimarySections: (state, action) => {
            state.value = action.payload;
        },
        removePrimarySections: (state) => {
            state.value = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { storePrimarySections, removePrimarySections } = primarySectionsSlice.actions;

export default primarySectionsSlice.reducer;