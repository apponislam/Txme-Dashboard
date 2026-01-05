import { baseApi } from "@/redux/api/baseApi";

export const termsAndConditionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTermsAndConditions: builder.query({
            query: () => "/rule/terms-and-conditions",
            providesTags: ["TermsAndConditions"],
        }),
        createOrUpdateTermsAndConditions: builder.mutation({
            query: (data: { content: string; type: string }) => ({
                url: "/rule/terms-and-conditions",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TermsAndConditions"],
        }),
    }),
});

export const { useGetTermsAndConditionsQuery, useCreateOrUpdateTermsAndConditionsMutation } = termsAndConditionsApi;
