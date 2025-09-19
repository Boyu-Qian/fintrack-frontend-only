import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
    id:string;
    email:string;
    password:string;
}

export interface AuthSuccess {
  id:string;
  email:string;
  token: string | null; // 如果你用 token 登录
}

export interface AuthError {
  error: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export type AuthResponse = AuthSuccess | AuthError

export const usersApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_USERS_API_URL,
        credentials: "include"
    }),
    tagTypes:['User'],
    endpoints:(builder) => ({
        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: 'create-user',
                method: 'POST',
                body: newUser,
            })
        }),
        //<API Response Type, API Input Type>
        authUser: builder.mutation<AuthResponse, AuthRequest>({
            query: (credentials) => ({
                url: 'auth',
                method: "POST",
                body: credentials,
            })
        })
    })
});

export const {
    useCreateUserMutation,
    useAuthUserMutation,
} = usersApi;