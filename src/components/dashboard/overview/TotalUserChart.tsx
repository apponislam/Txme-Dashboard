// "use client";
// import { Line, LineChart, XAxis, YAxis, Area, Tooltip } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// export const description = "A multiple line chart";

// const chartData = [
//     { month: "Jan", provider: 0, customer: 80 },
//     { month: "Feb", provider: 305, customer: 200 },
//     { month: "Mar", provider: 237, customer: 120 },
//     { month: "Apr", provider: 73, customer: 190 },
//     { month: "May", provider: 209, customer: 130 },
//     { month: "Jun", provider: 214, customer: 140 },
//     { month: "Jul", provider: 280, customer: 160 },
//     { month: "Aug", provider: 320, customer: 180 },
//     { month: "Sep", provider: 195, customer: 150 },
//     { month: "Oct", provider: 245, customer: 170 },
//     { month: "Nov", provider: 275, customer: 190 },
//     { month: "Dec", provider: 310, customer: 210 },
// ];

// const chartConfig = {
//     provider: {
//         label: "Provider",
//         color: "#FF5A36",
//     },
//     customer: {
//         label: "Customer",
//         color: "#A0BCE8",
//     },
// } satisfies ChartConfig;

// export function TotalUserChart() {
//     return (
//         <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] mb-4">
//             <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">Total User</CardTitle>
//             </CardHeader>
//             <CardContent className="px-10">
//                 <div className="h-75 w-full">
//                     <ChartContainer config={chartConfig} className="h-full w-full">
//                         <LineChart
//                             data={chartData}
//                             margin={{
//                                 top: 10,
//                                 right: 10,
//                                 left: 0,
//                                 bottom: 20,
//                             }}
//                             className="h-full w-full"
//                         >
//                             <defs>
//                                 <linearGradient id="fillProvider" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="5%" stopColor="#FF5A36" stopOpacity={0.8} />
//                                     <stop offset="95%" stopColor="#FF5A36" stopOpacity={0.1} />
//                                 </linearGradient>
//                                 <linearGradient id="fillCustomer" x1="0" y1="0" x2="0" y2="1">
//                                     <stop offset="5%" stopColor="#A0BCE8" stopOpacity={0.8} />
//                                     <stop offset="95%" stopColor="#A0BCE8" stopOpacity={0.1} />
//                                 </linearGradient>
//                             </defs>
//                             <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={0} minTickGap={5} />
//                             <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={25} />
//                             <Tooltip content={<ChartTooltipContent />} />

//                             {/* Provider Area Gradient */}
//                             <Area dataKey="provider" type="linear" fill="url(#fillProvider)" fillOpacity={0.4} stroke="none" />

//                             {/* Customer Area Gradient */}
//                             <Area dataKey="customer" type="linear" fill="url(#fillCustomer)" fillOpacity={0.4} stroke="none" />

//                             {/* Provider Line */}
//                             <Line dataKey="provider" type="linear" stroke="#FF5A36" strokeWidth={2} dot={false} activeDot={{ r: 3, fill: "#FF5A36" }} />

//                             {/* Customer Line */}
//                             <Line dataKey="customer" type="linear" stroke="#A0BCE8" strokeWidth={2} strokeDasharray="3 3" dot={false} activeDot={{ r: 3, fill: "#A0BCE8" }} />
//                         </LineChart>
//                     </ChartContainer>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }

"use client";
import { Line, LineChart, XAxis, YAxis, Area, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartConfig = {
    provider: {
        label: "Provider",
        color: "#FF5A36",
    },
    customer: {
        label: "Customer",
        color: "#A0BCE8",
    },
} satisfies ChartConfig;

export function TotalUserChart({ userOverview }: any) {
    // Use real data from API or fallback to mock data
    const chartData = userOverview || [
        { month: "Jan", provider: 0, customer: 0 },
        { month: "Feb", provider: 0, customer: 0 },
        { month: "Mar", provider: 0, customer: 0 },
        { month: "Apr", provider: 0, customer: 0 },
        { month: "May", provider: 0, customer: 0 },
        { month: "Jun", provider: 0, customer: 0 },
        { month: "Jul", provider: 0, customer: 0 },
        { month: "Aug", provider: 0, customer: 0 },
        { month: "Sep", provider: 0, customer: 0 },
        { month: "Oct", provider: 0, customer: 0 },
        { month: "Nov", provider: 0, customer: 0 },
        { month: "Dec", provider: 0, customer: 0 },
    ];

    return (
        <Card className="w-full max-w-full border-none shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] mb-4">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total User</CardTitle>
            </CardHeader>
            <CardContent className="px-10">
                <div className="h-75 w-full">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 20,
                            }}
                            className="h-full w-full"
                        >
                            <defs>
                                <linearGradient id="fillProvider" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF5A36" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FF5A36" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fillCustomer" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#A0BCE8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#A0BCE8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={0} minTickGap={5} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={25} />
                            <Tooltip content={<ChartTooltipContent />} />

                            {/* Provider Area Gradient */}
                            <Area dataKey="provider" type="linear" fill="url(#fillProvider)" fillOpacity={0.4} stroke="none" />

                            {/* Customer Area Gradient */}
                            <Area dataKey="customer" type="linear" fill="url(#fillCustomer)" fillOpacity={0.4} stroke="none" />

                            {/* Provider Line */}
                            <Line dataKey="provider" type="linear" stroke="#FF5A36" strokeWidth={2} dot={false} activeDot={{ r: 3, fill: "#FF5A36" }} />

                            {/* Customer Line */}
                            <Line dataKey="customer" type="linear" stroke="#A0BCE8" strokeWidth={2} strokeDasharray="3 3" dot={false} activeDot={{ r: 3, fill: "#A0BCE8" }} />
                        </LineChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
