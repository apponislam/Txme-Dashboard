import { baseApi } from "@/redux/api/baseApi";

export interface CreateAdminSupportChatRequest {
    participant: string;
    message?: string;
}

export interface CreateAdminSupportChatResponse {
    success: boolean;
    message: string;
    data: any;
}

export const adminChatsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAdminSupportChat: builder.mutation<CreateAdminSupportChatResponse, CreateAdminSupportChatRequest>({
            query: (data) => ({
                url: "/chat/admin-support",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["AdminChats"],
        }),
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

export const { useCreateAdminSupportChatMutation, useGetAdminChatsQuery, useDeleteAdminChatMutation } = adminChatsApi;
