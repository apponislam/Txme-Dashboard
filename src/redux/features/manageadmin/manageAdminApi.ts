import { baseApi } from "@/redux/api/baseApi";

export const manageAdminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all admins with optional filtering and pagination
        getAdmins: builder.query({
            query: (params?: { status?: "active" | "inactive"; page?: number; limit?: number }) => ({
                url: "/admin",
                params: params,
            }),
            providesTags: ["Admins"],
        }),

        // Create a new admin
        createAdmin: builder.mutation({
            query: (data: { name: string; email: string; password: string }) => ({
                url: "/admin",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Admins"],
        }),

        // Toggle admin status (active/inactive)
        toggleAdminStatus: builder.mutation({
            query: (id: string) => ({
                url: `/admin/${id}/toggle-status`,
                method: "PATCH",
            }),
            invalidatesTags: ["Admins"],
        }),

        // Delete an admin
        deleteAdmin: builder.mutation({
            query: (id: string) => ({
                url: `/admin/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admins"],
        }),
    }),
});

export const { useGetAdminsQuery, useCreateAdminMutation, useToggleAdminStatusMutation, useDeleteAdminMutation } = manageAdminApi;
