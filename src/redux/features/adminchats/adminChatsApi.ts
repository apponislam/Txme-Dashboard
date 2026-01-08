import { baseApi } from "@/redux/api/baseApi";

export const adminChatsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminChats: builder.query({
            query: (params?: { searchTerm?: string; page?: number; limit?: number }) => ({
                url: "/chat/admin-support/all",
                method: "GET",
                params: params,
            }),
            providesTags: ["AdminChats"],
        }),
    }),
});

export const { useGetAdminChatsQuery } = adminChatsApi;
