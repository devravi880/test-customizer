// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import homeLoaderSlice from './Slices/homeLoader';
import storeSlice from './Slices/storeSlice';
import primaryAuxSideBarSlice from './Slices/Customizer/primaryAuxSideBarSlice';
import primarySideBarSlice from './Slices/Customizer/primarySideBarSlice';
import primarySectionsSlice from './Slices/Customizer/primarySectionsSlice';
import secondarySideBarSlice from './Slices/Customizer/secondarySideBarSlice';
import headerSlice from './Slices/Customizer/headerSlice';

const store = configureStore({
    reducer: {
        loader: homeLoaderSlice,
        store: storeSlice,
        primaryAuxSideBar: primaryAuxSideBarSlice,
        primarySideBar: primarySideBarSlice,
        primarySections: primarySectionsSlice,
        secondarySideBar: secondarySideBarSlice,
        header: headerSlice,
    },
});

export default store;
