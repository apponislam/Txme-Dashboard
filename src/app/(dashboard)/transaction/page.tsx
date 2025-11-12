// "use client";
// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight, Search, Download } from "lucide-react";

// // Mock transaction data
// const transactionsData = [
//     { id: 1, date: "Dec 15, 2024", type: "Money Received", amount: "+$2,450.00", status: "Completed", transactionId: "#pay-2024-001" },
//     { id: 2, date: "Dec 14, 2024", type: "Money Sent", amount: "-$850.00", status: "Completed", transactionId: "#pay-2024-002" },
//     { id: 3, date: "Dec 13, 2024", type: "Deposit", amount: "+$5,000.00", status: "Completed", transactionId: "#pay-2024-003" },
//     { id: 4, date: "Dec 12, 2024", type: "Money Sent", amount: "-$1,250.00", status: "Pending", transactionId: "#pay-2024-004" },
//     { id: 5, date: "Dec 11, 2024", type: "Withdrawal", amount: "-$3,200.00", status: "Completed", transactionId: "#pay-2024-005" },
//     { id: 6, date: "Dec 10, 2024", type: "Money Received", amount: "+$4,750.00", status: "Completed", transactionId: "#pay-2024-006" },
//     { id: 7, date: "Dec 09, 2024", type: "Money Sent", amount: "-$500.00", status: "Completed", transactionId: "#pay-2024-007" },
//     { id: 8, date: "Dec 08, 2024", type: "Deposit", amount: "+$2,000.00", status: "Completed", transactionId: "#pay-2024-008" },
//     { id: 9, date: "Dec 07, 2024", type: "Money Received", amount: "+$1,200.00", status: "Completed", transactionId: "#pay-2024-009" },
//     { id: 10, date: "Dec 06, 2024", type: "Withdrawal", amount: "-$1,800.00", status: "Completed", transactionId: "#pay-2024-010" },
//     { id: 11, date: "Dec 05, 2024", type: "Money Sent", amount: "-$750.00", status: "Pending", transactionId: "#pay-2024-011" },
//     { id: 12, date: "Dec 04, 2024", type: "Money Received", amount: "+$3,100.00", status: "Completed", transactionId: "#pay-2024-012" },
//     { id: 13, date: "Dec 03, 2024", type: "Deposit", amount: "+$4,500.00", status: "Completed", transactionId: "#pay-2024-013" },
//     { id: 14, date: "Dec 02, 2024", type: "Money Sent", amount: "-$950.00", status: "Completed", transactionId: "#pay-2024-014" },
//     { id: 15, date: "Dec 01, 2024", type: "Withdrawal", amount: "-$2,300.00", status: "Completed", transactionId: "#pay-2024-015" },
//     { id: 16, date: "Nov 30, 2024", type: "Money Received", amount: "+$1,800.00", status: "Completed", transactionId: "#pay-2024-016" },
//     { id: 17, date: "Nov 29, 2024", type: "Money Sent", amount: "-$600.00", status: "Completed", transactionId: "#pay-2024-017" },
//     { id: 18, date: "Nov 28, 2024", type: "Deposit", amount: "+$3,200.00", status: "Completed", transactionId: "#pay-2024-018" },
//     { id: 19, date: "Nov 27, 2024", type: "Money Received", amount: "+$2,700.00", status: "Completed", transactionId: "#pay-2024-019" },
//     { id: 20, date: "Nov 26, 2024", type: "Withdrawal", amount: "-$1,500.00", status: "Completed", transactionId: "#pay-2024-020" },
//     { id: 21, date: "Nov 25, 2024", type: "Money Sent", amount: "-$1,100.00", status: "Pending", transactionId: "#pay-2024-021" },
//     { id: 22, date: "Nov 24, 2024", type: "Money Received", amount: "+$2,900.00", status: "Completed", transactionId: "#pay-2024-022" },
//     { id: 23, date: "Nov 23, 2024", type: "Deposit", amount: "+$6,000.00", status: "Completed", transactionId: "#pay-2024-023" },
//     { id: 24, date: "Nov 22, 2024", type: "Money Sent", amount: "-$800.00", status: "Completed", transactionId: "#pay-2024-024" },
// ];

// const TransactionHistory = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(6);
//     const [filterType, setFilterType] = useState("All Types");
//     const [searchTerm, setSearchTerm] = useState("");

//     // Filter transactions based on type and search term
//     const filteredTransactions = transactionsData.filter((transaction) => {
//         const matchesType = filterType === "All Types" || transaction.type === filterType;
//         const matchesSearch = transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
//         return matchesType && matchesSearch;
//     });

//     // Calculate pagination
//     const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

//     // Get unique types for filter dropdown
//     const transactionTypes = ["All Types", ...new Set(transactionsData.map((t) => t.type))];

//     const handlePageChange = (pageNumber: number) => {
//         setCurrentPage(pageNumber);
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "Completed":
//                 return "bg-green-100 text-green-800";
//             case "Pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "Failed":
//                 return "bg-red-100 text-red-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     const getAmountColor = (amount: string) => {
//         return amount.startsWith("+") ? "text-green-600" : "text-red-600";
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             {/* Header */}
//             <div className="p-6 border-b border-gray-200">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
//                         <p className="text-gray-600 mt-1">Manage and track your financial transactions</p>
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-3">
//                         <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//                             <Download className="h-4 w-4" />
//                             Export CSV
//                         </button>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex flex-col lg:flex-row gap-4 mt-6">
//                     <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                         <div className="flex-1">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">All Types</label>
//                             <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                                 {transactionTypes.map((type) => (
//                                     <option key={type} value={type}>
//                                         {type}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex-1">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                                 <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {currentTransactions.map((transaction) => (
//                             <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
//                                 <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAmountColor(transaction.amount)}`}>{transaction.amount}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>{transaction.status}</span>
//                                 </td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionId}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="px-6 py-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                     <div className="text-sm text-[#64748B]">
//                         Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> transactions
//                     </div>

//                     <div className="flex items-center gap-0">
//                         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-r-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                             <ChevronLeft className="h-4 w-4" />
//                         </button>

//                         {(() => {
//                             const pages = [];
//                             const totalPagesToShow = 4;

//                             if (totalPages <= totalPagesToShow) {
//                                 // Show all pages if total pages is less than or equal to 4
//                                 for (let i = 1; i <= totalPages; i++) {
//                                     pages.push(i);
//                                 }
//                             } else {
//                                 // Always show first page
//                                 pages.push(1);

//                                 // Calculate start and end of visible pages
//                                 let start = Math.max(2, currentPage - 1);
//                                 let end = Math.min(totalPages - 1, currentPage + 1);

//                                 // Adjust if at the beginning
//                                 if (currentPage <= 2) {
//                                     end = 4;
//                                 }
//                                 // Adjust if at the end
//                                 else if (currentPage >= totalPages - 1) {
//                                     start = totalPages - 3;
//                                 }

//                                 // Add ellipsis after first page if needed
//                                 if (start > 2) {
//                                     pages.push("...");
//                                 }

//                                 // Add middle pages
//                                 for (let i = start; i <= end; i++) {
//                                     pages.push(i);
//                                 }

//                                 // Add ellipsis before last page if needed
//                                 if (end < totalPages - 1) {
//                                     pages.push("...");
//                                 }

//                                 // Always show last page
//                                 pages.push(totalPages);
//                             }

//                             return pages.map((page, index) =>
//                                 typeof page === "number" ? (
//                                     <button
//                                         key={page}
//                                         onClick={() => handlePageChange(page)}
//                                         className={`rounded-none border border-[#FFEFEB] transition-colors ${currentPage === page ? "bg-[#FFEFEB] text-[#FF5A36] border-[#FF5A36] hover:bg-[#FFEFEB]" : "bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB]"} ${index === 0 ? "rounded-l-none" : ""} ${index === pages.length - 1 ? "rounded-r-none" : ""} px-3 py-1 text-sm`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ) : (
//                                     <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#64748B] text-sm">
//                                         {page}
//                                     </span>
//                                 )
//                             );
//                         })()}

//                         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-l-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
//                             <ChevronRight className="h-4 w-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TransactionHistory;

"use client";
import React, { useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Mock transaction data
const transactionsData = [
    { id: 1, date: "Dec 15, 2024", type: "Money Received", amount: "+$2,450.00", status: "Completed", transactionId: "#pay-2024-001", sender: "rehna@gmail.com", receiver: "rabeya@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 2, date: "Dec 14, 2024", type: "Money Sent", amount: "-$850.00", status: "Completed", transactionId: "#pay-2024-002", sender: "rabeya@gmail.com", receiver: "rehna@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 3, date: "Dec 13, 2024", type: "Deposit", amount: "+$5,000.00", status: "Completed", transactionId: "#pay-2024-003", sender: "bank", receiver: "rabeya@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 4, date: "Dec 12, 2024", type: "Money Sent", amount: "-$1,250.00", status: "Pending", transactionId: "#pay-2024-004", sender: "rabeya@gmail.com", receiver: "rehna@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 5, date: "Dec 11, 2024", type: "Withdrawal", amount: "-$3,200.00", status: "Completed", transactionId: "#pay-2024-005", sender: "rabeya@gmail.com", receiver: "bank", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 6, date: "Dec 10, 2024", type: "Money Received", amount: "+$4,750.00", status: "Completed", transactionId: "#pay-2024-006", sender: "rehna@gmail.com", receiver: "rabeya@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 7, date: "Dec 09, 2024", type: "Money Sent", amount: "-$320.00", status: "Completed", transactionId: "#pay-2024-007", sender: "alex@gmail.com", receiver: "mike@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 8, date: "Dec 08, 2024", type: "Money Received", amount: "+$1,800.00", status: "Completed", transactionId: "#pay-2024-008", sender: "sarah@gmail.com", receiver: "john@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 9, date: "Dec 07, 2024", type: "Deposit", amount: "+$3,500.00", status: "Completed", transactionId: "#pay-2024-009", sender: "bank", receiver: "emily@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 10, date: "Dec 06, 2024", type: "Withdrawal", amount: "-$2,100.00", status: "Completed", transactionId: "#pay-2024-010", sender: "david@gmail.com", receiver: "bank", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 11, date: "Dec 05, 2024", type: "Money Sent", amount: "-$750.00", status: "Failed", transactionId: "#pay-2024-011", sender: "lisa@gmail.com", receiver: "robert@gmail.com", senderAvatar: "", receiverAvatar: "" },
    { id: 12, date: "Dec 04, 2024", type: "Money Received", amount: "+$2,200.00", status: "Completed", transactionId: "#pay-2024-012", sender: "michael@gmail.com", receiver: "jennifer@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 13, date: "Dec 03, 2024", type: "Money Sent", amount: "-$1,500.00", status: "Pending", transactionId: "#pay-2024-013", sender: "william@gmail.com", receiver: "sophia@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 14, date: "Dec 02, 2024", type: "Deposit", amount: "+$6,800.00", status: "Completed", transactionId: "#pay-2024-014", sender: "bank", receiver: "daniel@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 15, date: "Dec 01, 2024", type: "Withdrawal", amount: "-$4,200.00", status: "Completed", transactionId: "#pay-2024-015", sender: "olivia@gmail.com", receiver: "bank", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 16, date: "Nov 30, 2024", type: "Money Received", amount: "+$3,100.00", status: "Completed", transactionId: "#pay-2024-016", sender: "james@gmail.com", receiver: "ava@gmail.com", senderAvatar: "", receiverAvatar: "" },
    { id: 17, date: "Nov 29, 2024", type: "Money Sent", amount: "-$950.00", status: "Completed", transactionId: "#pay-2024-017", sender: "benjamin@gmail.com", receiver: "charlotte@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 18, date: "Nov 28, 2024", type: "Money Received", amount: "+$1,250.00", status: "Completed", transactionId: "#pay-2024-018", sender: "lucas@gmail.com", receiver: "amelia@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 19, date: "Nov 27, 2024", type: "Deposit", amount: "+$7,500.00", status: "Completed", transactionId: "#pay-2024-019", sender: "bank", receiver: "henry@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 20, date: "Nov 26, 2024", type: "Withdrawal", amount: "-$2,800.00", status: "Failed", transactionId: "#pay-2024-020", sender: "mia@gmail.com", receiver: "bank", senderAvatar: "", receiverAvatar: "" },
    { id: 21, date: "Nov 25, 2024", type: "Money Sent", amount: "-$1,100.00", status: "Completed", transactionId: "#pay-2024-021", sender: "ethan@gmail.com", receiver: "isabella@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 22, date: "Nov 24, 2024", type: "Money Received", amount: "+$2,900.00", status: "Completed", transactionId: "#pay-2024-022", sender: "noah@gmail.com", receiver: "sophie@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 23, date: "Nov 23, 2024", type: "Money Sent", amount: "-$650.00", status: "Pending", transactionId: "#pay-2024-023", sender: "liam@gmail.com", receiver: "ella@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 24, date: "Nov 22, 2024", type: "Deposit", amount: "+$4,300.00", status: "Completed", transactionId: "#pay-2024-024", sender: "bank", receiver: "jackson@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 25, date: "Nov 21, 2024", type: "Withdrawal", amount: "-$3,600.00", status: "Completed", transactionId: "#pay-2024-025", sender: "avery@gmail.com", receiver: "bank", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 26, date: "Nov 20, 2024", type: "Money Received", amount: "+$1,700.00", status: "Completed", transactionId: "#pay-2024-026", sender: "scarlett@gmail.com", receiver: "logan@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 27, date: "Nov 19, 2024", type: "Money Sent", amount: "-$880.00", status: "Completed", transactionId: "#pay-2024-027", sender: "zoey@gmail.com", receiver: "carter@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 28, date: "Nov 18, 2024", type: "Money Received", amount: "+$3,400.00", status: "Completed", transactionId: "#pay-2024-028", sender: "jayden@gmail.com", receiver: "layla@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 29, date: "Nov 17, 2024", type: "Deposit", amount: "+$5,200.00", status: "Completed", transactionId: "#pay-2024-029", sender: "bank", receiver: "nathan@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 30, date: "Nov 16, 2024", type: "Withdrawal", amount: "-$2,500.00", status: "Completed", transactionId: "#pay-2024-030", sender: "riley@gmail.com", receiver: "bank", senderAvatar: "", receiverAvatar: "" },
    { id: 31, date: "Nov 15, 2024", type: "Money Sent", amount: "-$1,450.00", status: "Failed", transactionId: "#pay-2024-031", sender: "aaron@gmail.com", receiver: "hannah@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 32, date: "Nov 14, 2024", type: "Money Received", amount: "+$2,800.00", status: "Completed", transactionId: "#pay-2024-032", sender: "leo@gmail.com", receiver: "victoria@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 33, date: "Nov 13, 2024", type: "Money Sent", amount: "-$920.00", status: "Pending", transactionId: "#pay-2024-033", sender: "penelope@gmail.com", receiver: "owen@gmail.com", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 34, date: "Nov 12, 2024", type: "Deposit", amount: "+$8,000.00", status: "Completed", transactionId: "#pay-2024-034", sender: "bank", receiver: "elijah@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
    { id: 35, date: "Nov 11, 2024", type: "Withdrawal", amount: "-$3,900.00", status: "Completed", transactionId: "#pay-2024-035", sender: "grace@gmail.com", receiver: "bank", senderAvatar: "/dashboard/user-management/user1.png", receiverAvatar: "" },
    { id: 36, date: "Nov 10, 2024", type: "Money Received", amount: "+$1,950.00", status: "Completed", transactionId: "#pay-2024-036", sender: "cameron@gmail.com", receiver: "stella@gmail.com", senderAvatar: "", receiverAvatar: "/dashboard/user-management/user1.png" },
];

const TransactionHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [filterType, setFilterType] = useState("All Types");
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    // Filter transactions based on type
    const filteredTransactions = transactionsData.filter((transaction) => {
        return filterType === "All Types" || transaction.type === filterType;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

    // Get unique types for filter dropdown
    const transactionTypes = ["All Types", ...new Set(transactionsData.map((t) => t.type))];

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleRowHover = (event: React.MouseEvent, transactionId: number) => {
        setHoveredRow(transactionId);
        setModalPosition({ x: event.clientX, y: event.clientY });
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getAmountColor = (amount: string) => {
        return amount.startsWith("+") ? "text-green-600" : "text-red-600";
    };

    const renderAvatar = (avatarUrl: string, email: string, fallbackText: string) => {
        if (avatarUrl) {
            return <Image src={avatarUrl} alt={email} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />;
        }

        return (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{fallbackText}</span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header - Simplified */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Transaction</h1>

                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2">
                                    {filterType}
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {transactionTypes.map((type) => (
                                    <DropdownMenuItem key={type} onClick={() => setFilterType(type)} className="cursor-pointer">
                                        {type}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto relative">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50 transition-colors relative" onMouseEnter={(e) => handleRowHover(e, transaction.id)} onMouseLeave={handleRowLeave}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                        {transaction.type === "Money Received" && (
                                            <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
                                                <ArrowDown className="h-4 w-4" />
                                            </div>
                                        )}
                                        {transaction.type === "Money Sent" && (
                                            <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
                                                <ArrowUp className="h-4 w-4" />
                                            </div>
                                        )}
                                        {transaction.type === "Deposit" && (
                                            <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
                                                <Plus className="h-4 w-4" />
                                            </div>
                                        )}
                                        {transaction.type === "Withdrawal" && (
                                            <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#9333EA]">
                                                <Minus className="h-4 w-4" />
                                            </div>
                                        )}
                                        {transaction.type}
                                    </div>
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAmountColor(transaction.amount)}`}>{transaction.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>{transaction.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Hover Modal */}
                {hoveredRow && (
                    <div
                        className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[400px]"
                        style={{
                            left: modalPosition.x + 10,
                            top: modalPosition.y + 10,
                        }}
                    >
                        <div className="flex items-center justify-between gap-6">
                            {/* Sender */}
                            <div className="flex items-center gap-3">
                                {renderAvatar(
                                    transactionsData.find((t) => t.id === hoveredRow)?.senderAvatar || "",
                                    transactionsData.find((t) => t.id === hoveredRow)?.sender || "",
                                    transactionsData
                                        .find((t) => t.id === hoveredRow)
                                        ?.sender?.charAt(0)
                                        .toUpperCase() || "S"
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Sender</p>
                                    <p className="text-sm text-gray-600">{transactionsData.find((t) => t.id === hoveredRow)?.sender}</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center">
                                <Image src="/dashboard/transaction/iconleft.svg" alt="sending icon" width={24} height={24} className="h-6 w-6"></Image>
                            </div>

                            {/* Receiver */}
                            <div className="flex items-center gap-3">
                                {renderAvatar(
                                    transactionsData.find((t) => t.id === hoveredRow)?.receiverAvatar || "",
                                    transactionsData.find((t) => t.id === hoveredRow)?.receiver || "",
                                    transactionsData
                                        .find((t) => t.id === hoveredRow)
                                        ?.receiver?.charAt(0)
                                        .toUpperCase() || "R"
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Receiver</p>
                                    <p className="text-sm text-gray-600">{transactionsData.find((t) => t.id === hoveredRow)?.receiver}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-[#64748B]">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> transactions
                    </div>

                    <div className="flex items-center gap-0">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-r-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {(() => {
                            const pages = [];
                            const totalPagesToShow = 4;

                            if (totalPages <= totalPagesToShow) {
                                for (let i = 1; i <= totalPages; i++) {
                                    pages.push(i);
                                }
                            } else {
                                pages.push(1);
                                let start = Math.max(2, currentPage - 1);
                                let end = Math.min(totalPages - 1, currentPage + 1);

                                if (currentPage <= 2) {
                                    end = 4;
                                } else if (currentPage >= totalPages - 1) {
                                    start = totalPages - 3;
                                }

                                if (start > 2) {
                                    pages.push("...");
                                }

                                for (let i = start; i <= end; i++) {
                                    pages.push(i);
                                }

                                if (end < totalPages - 1) {
                                    pages.push("...");
                                }

                                pages.push(totalPages);
                            }

                            return pages.map((page, index) =>
                                typeof page === "number" ? (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`rounded-none border border-[#FFEFEB] transition-colors ${currentPage === page ? "bg-[#FFEFEB] text-[#FF5A36] border-[#FF5A36] hover:bg-[#FFEFEB]" : "bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB]"} ${index === 0 ? "rounded-l-none" : ""} ${index === pages.length - 1 ? "rounded-r-none" : ""} px-3 py-1 text-sm`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#64748B] text-sm">
                                        {page}
                                    </span>
                                )
                            );
                        })()}

                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-l-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
