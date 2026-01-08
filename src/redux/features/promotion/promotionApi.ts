import { baseApi } from "@/redux/api/baseApi";

export const promotionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPromotionPackages: builder.query({
            query: () => "/promotion/packages",
            providesTags: ["Promotion"],
        }),

        getPromotionPackageById: builder.query({
            query: (id: string) => `/promotion/packages/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Promotion", id }],
        }),

        createPromotionPackage: builder.mutation({
            query: (promotionData) => ({
                url: "/promotion/create-package",
                method: "POST",
                body: promotionData,
            }),
            invalidatesTags: ["Promotion"],
        }),

        updatePromotionPackage: builder.mutation({
            query: ({ id, ...promotionData }) => ({
                url: `/promotion/update-package/${id}`,
                method: "PATCH",
                body: promotionData,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: "Promotion", id }, "Promotion"],
        }),

        deletePromotionPackage: builder.mutation({
            query: (id: string) => ({
                url: `/promotion/delete-package/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Promotion"],
        }),
    }),
});

export const { useGetPromotionPackagesQuery, useGetPromotionPackageByIdQuery, useCreatePromotionPackageMutation, useUpdatePromotionPackageMutation, useDeletePromotionPackageMutation } = promotionApi;
