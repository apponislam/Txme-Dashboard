"use client";

import { useSelector } from "react-redux";
import OverviewTotalCard from "@/components/dashboard/overview/OverviewTotalCard";
import { TotalUserChart } from "@/components/dashboard/overview/TotalUserChart";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetDashboardOverviewQuery } from "@/redux/features/dashboard/dashboardApi";
import { AverageViewsChart } from "@/components/dashboard/overview/AverageViewChart";

export default function Home() {
    const user = useSelector(selectCurrentUser);
    const { data: dashboardData, isLoading, error } = useGetDashboardOverviewQuery({});

    if (!user || user.role !== "SUPER_ADMIN") {
        return <div className="h-[calc(100vh-114px)] flex items-center text-center justify-center text-lg font-medium text-gray-700">Welcome! Please select a page from the menu to continue.</div>;
    }

    if (isLoading) {
        return <div className="h-[calc(100vh-114px)] flex items-center justify-center">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="h-[calc(100vh-114px)] flex items-center justify-center text-red-500">Error loading dashboard data</div>;
    }

    return (
        <>
            <OverviewTotalCard dashboardData={dashboardData?.data} />
            {/* <TotalUserChart userOverview={dashboardData?.data?.userOverview} /> */}
            <TotalUserChart />
            {/* <AverageViewsChart jobOverview={dashboardData?.data?.jobOverview} /> */}
            <AverageViewsChart />
        </>
    );
}
