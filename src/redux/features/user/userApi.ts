import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Existing endpoints
        getCurrentUser: builder.query({
            query: () => "/user/me",
            providesTags: ["User"],
        }),

        getUsersByRole: builder.query({
            query: ({ role, page = 1, limit = 10 }: { role: string; page?: number; limit?: number }) => `/user?role=${role}&page=${page}&limit=${limit}`,
            providesTags: ["User"],
        }),

        updateUserProfile: builder.mutation({
            query: (userData: FormData | Record<string, any>) => {
                const isFormData = userData instanceof FormData;
                return {
                    url: "/user/profile",
                    method: "PATCH",
                    body: userData,
                    ...(isFormData && { formData: true }),
                };
            },
            invalidatesTags: ["User"],
        }),

        // New endpoints
        getUsers: builder.query({
            query: (params?: { searchTerm?: string; status?: string; role?: string; page?: number; limit?: number }) => ({
                url: "/user",
                params: params,
            }),
            providesTags: ["Users"],
        }),

        getUserById: builder.query({
            query: (id: string) => `/user/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }],
        }),

        updateUserStatus: builder.mutation({
            query: ({ id, status }: { id: string; status: string }) => ({
                url: `/user/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation({
            query: (id: string) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useGetCurrentUserQuery, useGetUsersByRoleQuery, useUpdateUserProfileMutation, useGetUsersQuery, useGetUserByIdQuery, useUpdateUserStatusMutation, useDeleteUserMutation } = userApi;
