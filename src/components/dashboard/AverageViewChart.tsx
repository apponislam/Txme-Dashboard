"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChevronDown } from "lucide-react";

const weeklyData = [
    { day: "MON", views: 186 },
    { day: "TUE", views: 305 },
    { day: "WED", views: 237 },
    { day: "THU", views: 73 },
    { day: "FRI", views: 209 },
    { day: "SAT", views: 214 },
    { day: "SUN", views: 280 },
];

const monthlyData = [
    { week: "Week 1", views: 1200 },
    { week: "Week 2", views: 1800 },
    { week: "Week 3", views: 1500 },
    { week: "Week 4", views: 2100 },
];

const chartConfig = {
    views: {
        label: "Views",
        color: "#F0E5FC",
    },
} satisfies ChartConfig;

export function AverageViewsChart() {
    const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("weekly");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const currentData = timeRange === "weekly" ? weeklyData : monthlyData;
    const dataKey = timeRange === "weekly" ? "day" : "week";

    return (
        <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Average views</CardTitle>
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-50">
                        {timeRange === "weekly" ? "Weekly" : "Monthly"}
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                            <button
                                onClick={() => {
                                    setTimeRange("weekly");
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${timeRange === "weekly" ? "bg-[#F0E5FC] text-[#962DFF]" : ""}`}
                            >
                                Weekly
                            </button>
                            <button
                                onClick={() => {
                                    setTimeRange("monthly");
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${timeRange === "monthly" ? "bg-[#F0E5FC] text-[#962DFF]" : ""}`}
                            >
                                Monthly
                            </button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="px-10">
                <div className="h-[250px] w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <BarChart
                            data={currentData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 20,
                            }}
                            className="h-full w-full"
                            barSize={40}
                        >
                            <CartesianGrid vertical={false} stroke="#E5E5EF" strokeDasharray="3 3" />
                            <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={25} />
                            <ChartTooltip cursor={{ fill: "#962DFF", opacity: 0.2 }} content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey="views" fill="#F0E5FC" radius={4} className="hover:fill-[#962DFF]" />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
