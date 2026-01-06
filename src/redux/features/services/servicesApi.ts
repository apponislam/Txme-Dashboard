import { baseApi } from "@/redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create new service (with FormData for image upload)
        createService: builder.mutation({
            query: (formData) => ({
                url: "/service/create-service",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Services"],
        }),

        // Get all services (parent services when no parent param)
        getServices: builder.query({
            query: (params) => ({
                url: "/service/get-services",
                method: "GET",
                params,
            }),
            providesTags: ["Services"],
        }),

        // Get all child services
        getAllChildServices: builder.query({
            query: () => ({
                url: "/service/get-all-child-services",
                method: "GET",
            }),
            providesTags: ["Services"],
        }),

        // Update service by ID
        updateService: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/service/update-service/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Services"],
        }),

        // Delete service by ID
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/delete-service/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Services"],
        }),
    }),
});

export const { useCreateServiceMutation, useGetServicesQuery, useGetAllChildServicesQuery, useUpdateServiceMutation, useDeleteServiceMutation } = servicesApi;
