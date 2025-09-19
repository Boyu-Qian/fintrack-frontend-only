import {configureStore} from "@reduxjs/toolkit"
import {usersApi} from './features/users/usersApi'
import authReducer from "./store/authSlice"
import { transactionsApi } from "./features/transactions/transactionsApi"

export const store = configureStore({
    reducer: {
        auth:authReducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [transactionsApi.reducerPath]: transactionsApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(usersApi.middleware).concat(transactionsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch