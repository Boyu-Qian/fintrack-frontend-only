import {createSlice} from "@reduxjs/toolkit"

interface AuthState {
    isAuthenticated:boolean;
    user: {id:string; email:string} | null;
    token:string | null;
    loading:boolean;
    error:string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user:null,
    token:null,
    loading:false,
    error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token || null;
        },
        loginFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated=false;
            state.user = null;
            state.token = null;
        },
        setUser: (state,action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,logout,setUser} = authSlice.actions;
export default authSlice.reducer;