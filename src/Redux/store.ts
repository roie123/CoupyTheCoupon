import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./AuthState";

const store = configureStore({
    reducer: {
        authReducer:authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});



export default store;




export type RootState = ReturnType<typeof store.getState>;