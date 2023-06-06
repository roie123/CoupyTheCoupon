import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./AuthState";
import {adminReducer} from "./AdminState";
import {companyReducer} from "./CompanyState";

const store = configureStore({
    reducer: {
        authReducer:authReducer,
        adminReducer:adminReducer,
        companyReducer:companyReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});



export default store;




export type RootState = ReturnType<typeof store.getState>;