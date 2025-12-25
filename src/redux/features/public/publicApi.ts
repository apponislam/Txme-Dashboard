import { baseApi } from "@/redux/api/baseApi";

export const publicApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTermsAndConditions: builder.query({
            query: () => "/public/terms-and-condition",
            providesTags: ["Public"],
        }),
        getRefundPolicy: builder.query({
            query: () => "/public/refund-policy",
            providesTags: ["Public"],
        }),
        createOrUpdatePublicContent: builder.mutation({
            query: (data: { type: string; content: string }) => ({
                url: "/public",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Public"],
        }),
    }),
});

export const { useGetTermsAndConditionsQuery, useGetRefundPolicyQuery, useCreateOrUpdatePublicContentMutation } = publicApi;
