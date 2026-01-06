import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardOverview: builder.query({
            query: (year) => ({
                url: "/admin/dashboard-overview",
                method: "GET",
                params: { year },
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const { useGetDashboardOverviewQuery } = dashboardApi;
