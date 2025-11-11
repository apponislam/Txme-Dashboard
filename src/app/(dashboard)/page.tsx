import { AverageViewsChart } from "@/components/dashboard/AverageViewChart";
import OverviewTotalCard from "@/components/dashboard/OverviewTotalCard";
import { TotalUserChart } from "@/components/dashboard/TotalUserChart";

export default function Home() {
    return (
        <div>
            <OverviewTotalCard></OverviewTotalCard>
            <TotalUserChart></TotalUserChart>
            <AverageViewsChart></AverageViewsChart>
        </div>
    );
}
