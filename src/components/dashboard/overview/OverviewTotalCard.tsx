// import { ArrowUp, ArrowDown } from "lucide-react";
// import Image from "next/image";

// const OverviewTotalCard = () => {
//     const cards = [
//         {
//             title: "Total job complete",
//             value: "473",
//             change: "+2",
//             changeType: "up",
//             description: "from last month",
//             icon: "/dashboard/overview/icon1.svg",
//         },
//         {
//             title: "Total transaction",
//             value: "$2,450",
//             change: "+$496",
//             changeType: "up",
//             description: "from last month",
//             icon: "/dashboard/overview/icon2.svg",
//         },
//         {
//             title: "Total users",
//             value: "904",
//             change: "+2",
//             changeType: "up",
//             description: "from last month",
//             icon: "/dashboard/overview/icon3.svg",
//         },
//         {
//             title: "Total services",
//             value: "12",
//             change: "+0",
//             changeType: "down",
//             description: "from last month",
//             icon: "/dashboard/overview/icon4.svg",
//         },
//     ];

//     return (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
//             {cards.map((card, index) => (
//                 <div key={index} className="bg-white border border-[#F3F4F6] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] p-6 rounded-xl">
//                     <div className="flex items-center justify-between mb-4">
//                         <p className="font-medium text-[#4B5563] text-[14px]">{card.title}</p>
//                         <Image src={card.icon} alt={card.title} height={32} width={32} />
//                     </div>
//                     <h1 className="font-bold text-[30px] text-[#111827] mb-4">{card.value}</h1>
//                     <div className="flex items-center gap-2 text-[14px]">
//                         <div className={`flex items-center ${card.changeType === "up" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
//                             {card.changeType === "up" ? <ArrowUp className="h-4" /> : <ArrowDown className="h-4" />}
//                             <p>{card.change}</p>
//                         </div>
//                         <p className="text-[#6B7280]">{card.description}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default OverviewTotalCard;

import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";

const OverviewTotalCard = ({ dashboardData }: any) => {
    // Use real data from API
    const cards = [
        {
            title: "Total job complete",
            value: dashboardData?.totalCompletedJobs?.toString() || "0",
            change: "+2",
            changeType: "up",
            description: "from last month",
            icon: "/dashboard/overview/icon1.svg",
        },
        {
            title: "Total transaction",
            value: `$${dashboardData?.totalAmount?.toLocaleString() || "0"}`,
            changeType: "up",
            description: "from last month",
            icon: "/dashboard/overview/icon2.svg",
        },
        {
            title: "Total users",
            value: dashboardData?.totalUsers?.toString() || "0",
            change: "+2",
            changeType: "up",
            description: "from last month",
            icon: "/dashboard/overview/icon3.svg",
        },
        {
            title: "Total services",
            value: dashboardData?.totalServices?.toString() || "0",
            change: "+0", // You might want to calculate this from API data
            changeType: "down",
            description: "from last month",
            icon: "/dashboard/overview/icon4.svg",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {cards.map((card, index) => (
                <div key={index} className="bg-white border border-[#F3F4F6] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-medium text-[#4B5563] text-[14px]">{card.title}</p>
                        <Image src={card.icon} alt={card.title} height={32} width={32} />
                    </div>
                    <h1 className="font-bold text-[30px] text-[#111827] mb-4">{card.value}</h1>
                    <div className="flex items-center gap-2 text-[14px]">
                        <div className={`flex items-center ${card.changeType === "up" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                            {card.changeType === "up" ? <ArrowUp className="h-4" /> : <ArrowDown className="h-4" />}
                            <p>{card.change}</p>
                        </div>
                        <p className="text-[#6B7280]">{card.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OverviewTotalCard;
