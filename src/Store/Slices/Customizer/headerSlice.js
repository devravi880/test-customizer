import { createSlice } from '@reduxjs/toolkit';
import { tempHeader } from '../../../Data/localData';

const initialState = {
    value: tempHeader ?? null
};

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        storeHeader: (state, action) => {
            state.value = action.payload;
        },
        updatePageHeader: (state, action) => {
            state.value = state.value.map((item) => {
                if (item?.title == "activePage") {
                    return (
                        {
                            ...item,
                            label: action.payload?.label ?? item?.label,
                            value: action.payload?.value ?? item?.value,
                            apiValue: action.payload?.apiValue ?? item?.apiValue,
                        }
                    )
                } else {
                    return ({ ...item })
                }
            })
        },
        updateSizeHeader: (state, action) => {
            state.value = state.value.map((item) => {
                if (item?.title == "screenSize") {
                    return (
                        {
                            ...item,
                            label: action.payload?.label ?? item?.label,
                            value: action.payload?.value ?? item?.value,
                        }
                    )
                } else {
                    return ({ ...item })
                }
            })
        },
        removeHeader: (state) => {
            state.value = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { storeHeader, updatePageHeader, updateSizeHeader, removeHeader } = headerSlice.actions;

export default headerSlice.reducer;