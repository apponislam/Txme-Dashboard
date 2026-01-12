// "use client";
// import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// export function AverageViewsChart({ jobOverview }: any) {
//     // Use real data from API or fallback to mock data
//     const chartData = jobOverview || [
//         { month: "Jan", count: 0 },
//         { month: "Feb", count: 0 },
//         { month: "Mar", count: 0 },
//         { month: "Apr", count: 0 },
//         { month: "May", count: 0 },
//         { month: "Jun", count: 0 },
//         { month: "Jul", count: 0 },
//         { month: "Aug", count: 0 },
//         { month: "Sep", count: 0 },
//         { month: "Oct", count: 0 },
//         { month: "Nov", count: 0 },
//         { month: "Dec", count: 0 },
//     ];

//     const chartConfig = {
//         count: {
//             label: "Jobs",
//             color: "#8884d8",
//         },
//     } satisfies ChartConfig;

//     return (
//         <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
//             <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">Job Overview</CardTitle>
//             </CardHeader>
//             <CardContent className="px-10">
//                 <div className="h-75 w-full">
//                     <ChartContainer config={chartConfig} className="h-full w-full">
//                         <BarChart
//                             data={chartData}
//                             margin={{
//                                 top: 10,
//                                 right: 10,
//                                 left: 0,
//                                 bottom: 20,
//                             }}
//                             className="h-full w-full"
//                         >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
//                             <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={25} />
//                             <Tooltip content={<ChartTooltipContent />} />
//                             <Bar dataKey="count" fill="#8884d8" radius={4} barSize={30} />
//                         </BarChart>
//                     </ChartContainer>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

"use client";
import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDashboardOverviewQuery } from "@/redux/features/dashboard/dashboardApi";

export function AverageViewsChart() {
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    // Generate years (current year -5 to current year +5)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    // API call for dashboard data with selected year
    const { data: dashboardData, isLoading, isError } = useGetDashboardOverviewQuery(selectedYear, { refetchOnMountOrArgChange: true });

    // Get jobOverview from API data
    const jobOverview = dashboardData?.data?.jobOverview;

    // Use real data from API or fallback to mock data
    const chartData = jobOverview || [
        { month: "Jan", count: 0 },
        { month: "Feb", count: 0 },
        { month: "Mar", count: 0 },
        { month: "Apr", count: 0 },
        { month: "May", count: 0 },
        { month: "Jun", count: 0 },
        { month: "Jul", count: 0 },
        { month: "Aug", count: 0 },
        { month: "Sep", count: 0 },
        { month: "Oct", count: 0 },
        { month: "Nov", count: 0 },
        { month: "Dec", count: 0 },
    ];

    const chartConfig = {
        count: {
            label: "Jobs",
            color: "#8884d8",
        },
    } satisfies ChartConfig;

    if (isLoading) {
        return (
            <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
                <CardHeader className="pb-2 flex items-center justify-between">
                    <CardTitle className="text-lg">Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="px-10">
                    <div className="h-75 w-full flex items-center justify-center">Loading chart...</div>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
                <CardHeader className="pb-2 flex items-center justify-between">
                    <CardTitle className="text-lg">Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="px-10">
                    <div className="h-75 w-full flex items-center justify-center text-red-500">Error loading chart data</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
            <CardHeader className="pb-2 flex items-center justify-between">
                <CardTitle className="text-lg">Job Overview</CardTitle>
                <div>
                    <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                        <SelectTrigger className="w-30">
                            <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="px-10">
                <div className="h-75 w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 20,
                            }}
                            className="h-full w-full"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={25} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="#8884d8" radius={4} barSize={30} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
