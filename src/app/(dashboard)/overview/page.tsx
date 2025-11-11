import { AverageViewsChart } from "@/components/dashboard/overview/AverageViewChart";
import OverviewTotalCard from "@/components/dashboard/overview/OverviewTotalCard";
import { TotalUserChart } from "@/components/dashboard/overview/TotalUserChart";

const page = () => {
    return (
        <>
            <OverviewTotalCard></OverviewTotalCard>
            <TotalUserChart></TotalUserChart>
            <AverageViewsChart></AverageViewsChart>
        </>
    );
};

export default page;
