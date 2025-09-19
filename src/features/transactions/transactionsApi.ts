import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Transaction {
    amount: number,
    category: string,
    created_at: string,
    description: string,
    type: string,
    user_id: string,
    date:string,
    id:string
}

export interface CalendarRequest {
    user_id:string,
    query_date:string,
    query_dates?:string[],
    type:string,
    category?:string,
    categories?:string[]
}


export const transactionsApi = createApi({
    reducerPath:"transactionApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_TRANSACTIONS_API_URL,

    }),
    tagTypes:['Transaction'],
    endpoints: (builder) => ( {
        createTransaction: builder.mutation<Transaction,Partial<Transaction>>({
            query: (newTransaction) => ({
                url: 'create-transaction',
                method: 'POST',
                body: newTransaction,
            })
        }),
        getMonthlyTransaction: builder.mutation<any,CalendarRequest>({
            query: (calendarRequest) => ({
                url:'get-monthly-transactions',
                method: 'POST',
                body:calendarRequest
            })
        }),
        getTransactionsByDate: builder.query<Transaction[],CalendarRequest>({
            query: (params) => ({
                url:"get-transactions",
                method:"GET",
                params
            })
        }),
        deleteTransaction:builder.mutation<void, {id:string}>({
            query:({id}) => ({
                url:"",
                method:"DELETE",
                params: {id}
            })
        }),
        updateTransaction:builder.mutation<Partial<Transaction>,Partial<Transaction> & {id:string}>({
            query: ({id,...patch}) => ({
                url: `/${id}`,
                method:"PUT",
                body: patch,
            })
        }),
        getDailyAmountByDates: builder.mutation<[string,number][],Partial<CalendarRequest>>({
            query: ({user_id,query_dates,type}) => ({
                url:"get-transactions-summary-by-dates",
                method:"POST",
                body:{user_id,query_dates,type}
            })
        }),
        getPieChartData: builder.mutation<[string[],number[]], Partial<CalendarRequest>>({
            query: ({user_id,query_dates,categories}) => ({
                url:"get-summary-by-category-by-dates",
                method:"POST",
                body:{user_id,query_dates,categories}
            })
        }),
        getFrenquencyData: builder.mutation<[[string[],number[]]], Partial<CalendarRequest>>({
            query:({user_id,query_dates,categories}) => ({
                url:"get-summary-by-category-by-dates-frenquency",
                method:"POST",
                body:{user_id,query_dates,categories}
            })
        })
    })
})


export const {
    useCreateTransactionMutation,
    useGetMonthlyTransactionMutation,
    useGetTransactionsByDateQuery,
    useLazyGetTransactionsByDateQuery,
    useDeleteTransactionMutation,
    useUpdateTransactionMutation,
    useGetDailyAmountByDatesMutation,
    useGetPieChartDataMutation,
    useGetFrenquencyDataMutation
} = transactionsApi;