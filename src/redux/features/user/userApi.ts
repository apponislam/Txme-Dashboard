import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useGetCurrentUserQuery, useGetUsersByRoleQuery, useUpdateUserProfileMutation } = userApi;
