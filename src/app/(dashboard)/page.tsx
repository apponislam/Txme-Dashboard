// import { AverageViewsChart } from "@/components/dashboard/overview/AverageViewChart";
// import OverviewTotalCard from "@/components/dashboard/overview/OverviewTotalCard";
// import { TotalUserChart } from "@/components/dashboard/overview/TotalUserChart";

// export default function Home() {
//     return (
//         <div>
//             <OverviewTotalCard></OverviewTotalCard>
//             <TotalUserChart></TotalUserChart>
//             <AverageViewsChart></AverageViewsChart>
//         </div>
//     );
// }

"use client";

import { useSelector } from "react-redux";

import { AverageViewsChart } from "@/components/dashboard/overview/AverageViewChart";
import OverviewTotalCard from "@/components/dashboard/overview/OverviewTotalCard";
import { TotalUserChart } from "@/components/dashboard/overview/TotalUserChart";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function Home() {
    const user = useSelector(selectCurrentUser);

    if (!user || user.role !== "SUPER_ADMIN") {
        return <div className="h-[calc(100vh-114px)] flex items-center text-center justify-center text-lg font-medium text-gray-700">Welcome! Please select a page from the menu to continue.</div>;
    }

    return (
        <>
            <OverviewTotalCard />
            <TotalUserChart />
            <AverageViewsChart />
        </>
    );
}
