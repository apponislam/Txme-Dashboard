import { baseApi } from "@/redux/api/baseApi";

export const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => ({
                url: "/setting",
                method: "GET",
            }),
            transformResponse: (response) => response.data,
            providesTags: ["Settings"],
        }),

        updateSettings: builder.mutation({
            query: (body) => ({
                url: "/setting",
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
    }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingApi;
