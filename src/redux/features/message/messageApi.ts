import { baseApi } from "@/redux/api/baseApi";

export const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get messages for a specific chat with pagination
        getMessages: builder.query({
            query: ({ chatId, page = 1, limit = 50 }) => ({
                url: `/message/${chatId}`,
                method: "GET",
                params: { page, limit },
            }),
            providesTags: (_result, _error, { chatId }) => [
                { type: "Messages", id: chatId },
                { type: "Messages", id: "LIST" },
            ],
        }),

        // Send a new message (using FormData for file upload)
        sendMessage: builder.mutation({
            query: (payload) => {
                const formData = new FormData();
                formData.append("chatId", payload.chatId);
                formData.append("type", payload.type);

                if (payload.text) {
                    formData.append("text", payload.text);
                }

                if (payload.messageFiles && payload.messageFiles.length > 0) {
                    payload.messageFiles.forEach((file: any) => {
                        formData.append("messageFiles", file);
                    });
                }

                return {
                    url: "/message",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: (_result, _error, payload) => [{ type: "Messages", id: payload.chatId }, "AdminChats"],
        }),

        // Delete a message
        deleteMessage: builder.mutation({
            query: (messageId: string) => ({
                url: `/message/${messageId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Messages"],
        }),
    }),
});

export const { useGetMessagesQuery, useSendMessageMutation, useDeleteMessageMutation } = messageApi;
