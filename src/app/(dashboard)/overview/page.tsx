import { AverageViewsChart } from "@/components/dashboard/AverageViewChart";
import OverviewTotalCard from "@/components/dashboard/OverviewTotalCard";
import { TotalUserChart } from "@/components/dashboard/TotalUserChart";

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
