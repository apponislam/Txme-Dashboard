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

        deleteAdminChat: builder.mutation({
            query: (chatId: string) => ({
                url: `/chat/${chatId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AdminChats"],
        }),
    }),
});

export const { useGetAdminChatsQuery, useDeleteAdminChatMutation } = adminChatsApi;
