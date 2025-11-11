import { AverageViewsChart } from "@/components/dashboard/overview/AverageViewChart";
import OverviewTotalCard from "@/components/dashboard/overview/OverviewTotalCard";
import { TotalUserChart } from "@/components/dashboard/overview/TotalUserChart";

export default function Home() {
    return (
        <div>
            <OverviewTotalCard></OverviewTotalCard>
            <TotalUserChart></TotalUserChart>
            <AverageViewsChart></AverageViewsChart>
        </div>
    );
}
