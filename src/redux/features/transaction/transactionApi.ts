import { baseApi } from "@/redux/api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (params?: { page?: number; limit?: number; type?: string }) => ({
                url: "/transaction",
                method: "GET",
                params: params,
            }),
            providesTags: ["Transactions"],
        }),
    }),
});

export const { useGetTransactionsQuery } = transactionApi;
