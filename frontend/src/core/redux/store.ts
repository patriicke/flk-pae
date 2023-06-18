import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';
import { UserType } from '../types';

const persistConfig = {
    key: 'root',
    storage,
};

const ALL_REDUCERS = combineReducers({
    user: userReducer,
});

export type REDUX_STORE_TYPE = {
    user: {
        userData: UserType;
    };
};

const persistedReducer = persistReducer(persistConfig, ALL_REDUCERS);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export const persistor = persistStore(store);
