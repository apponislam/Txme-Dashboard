"use client";
import React, { useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Minus, Plus, Loader2, User } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useGetTransactionsQuery } from "@/redux/features/transaction/transactionApi";

interface Transaction {
    _id: string;
    amount: number;
    type: "topup" | "withdraw" | "send";
    direction: "credit" | "debit";
    status: "success" | "pending" | "failed";
    reference?: string;
    from?: {
        _id: string;
        email: string;
        fullName: string;
        profilePicture?: string;
    };
    to?: {
        _id: string;
        email: string;
        fullName?: string;
        profilePicture?: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: {
        result: Transaction[];
        meta: {
            total: number;
            limit: number;
            page: number;
            totalPage: number;
        };
    };
}

const TransactionHistory = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState<"all" | "topup" | "withdraw" | "send">("all");
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    // Fetch transactions with pagination and filtering
    const { data, isLoading, isError } = useGetTransactionsQuery({
        page: currentPage,
        limit: 6,
        type: filterType === "all" ? undefined : filterType,
    });

    const apiData = data as ApiResponse;
    const transactions = apiData?.data?.result || [];
    const meta = apiData?.data?.meta || { total: 0, limit: 6, page: 1, totalPage: 1 };

    const handleFilterChange = (type: "all" | "topup" | "withdraw" | "send") => {
        setFilterType(type);
        setCurrentPage(1); // Reset to page 1 when filter changes
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleRowHover = (event: React.MouseEvent, transactionId: string) => {
        setHoveredRow(transactionId);
        setModalPosition({ x: event.clientX, y: event.clientY });
    };

    const handleRowLeave = () => {
        setHoveredRow(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getAmountDisplay = (amount: number, direction: string) => {
        const sign = direction === "credit" ? "+" : "-";
        return `${sign}$${amount.toFixed(2)}`;
    };

    const getAmountColor = (direction: string) => {
        return direction === "credit" ? "text-green-600" : "text-red-600";
    };

    const getTypeDisplay = (type: string, direction: string) => {
        switch (type) {
            case "topup":
                return direction === "credit" ? "Deposit" : "Topup";
            case "withdraw":
                return "Withdrawal";
            case "send":
                return direction === "debit" ? "Money Sent" : "Money Received";
            default:
                return type;
        }
    };

    const getTypeIcon = (type: string, direction: string) => {
        if (type === "send") {
            return direction === "debit" ? (
                <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
                    <ArrowUp className="h-4 w-4" />
                </div>
            ) : (
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A]">
                    <ArrowDown className="h-4 w-4" />
                </div>
            );
        } else if (type === "topup") {
            return (
                <div className="w-8 h-8 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
                    <Plus className="h-4 w-4" />
                </div>
            );
        } else if (type === "withdraw") {
            return (
                <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#9333EA]">
                    <Minus className="h-4 w-4" />
                </div>
            );
        }
    };

    const renderAvatar = (user: { fullName?: string; profilePicture?: string; email: string } | null | undefined) => {
        if (!user) {
            return (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-500" />
                </div>
            );
        }

        // If there's a profile picture, use it
        if (user.profilePicture) {
            return <Image src={user.profilePicture} alt={user.fullName || user.email} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />;
        }

        // If no profile picture, show initials
        const initials = user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();

        return (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{initials}</span>
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch {
            return dateString;
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Transaction</h1>
                    </div>
                </div>
                <div className="p-20 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#FF5A36]" />
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Transaction</h1>
                    </div>
                </div>
                <div className="p-20 text-center">
                    <p className="text-red-600">Failed to load transactions. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Transaction</h1>

                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2">
                                    {filterType === "all" ? "All Types" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => handleFilterChange("all")} className="cursor-pointer">
                                    All Types
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleFilterChange("topup")} className="cursor-pointer">
                                    Topup/Deposit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleFilterChange("withdraw")} className="cursor-pointer">
                                    Withdrawal
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleFilterChange("send")} className="cursor-pointer">
                                    Send/Receive
                                </DropdownMenuItem>
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
                        {transactions.map((transaction) => (
                            <tr key={transaction._id} className="hover:bg-gray-50 transition-colors relative" onMouseEnter={(e) => handleRowHover(e, transaction._id)} onMouseLeave={handleRowLeave}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(transaction.createdAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                        {getTypeIcon(transaction.type, transaction.direction)}
                                        {getTypeDisplay(transaction.type, transaction.direction)}
                                    </div>
                                </td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getAmountColor(transaction.direction)}`}>{getAmountDisplay(transaction.amount, transaction.direction)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>{transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.reference || `${transaction._id}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Hover Modal */}
                {hoveredRow && (
                    <div
                        className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-100"
                        style={{
                            left: modalPosition.x + 10,
                            top: modalPosition.y + 10,
                        }}
                    >
                        {(() => {
                            const transaction = transactions.find((t) => t._id === hoveredRow);
                            if (!transaction) return null;

                            return (
                                <div className="flex items-center justify-between gap-6">
                                    {/* Sender/From */}
                                    <div className="flex items-center gap-3">
                                        {renderAvatar(transaction.type === "send" && transaction.direction === "debit" ? transaction.from : transaction.type === "topup" ? { email: "Bank", fullName: "Bank" } : transaction.from)}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{transaction.type === "send" && transaction.direction === "debit" ? "Sender" : transaction.type === "topup" ? "From" : transaction.type === "withdraw" ? "User" : "From"}</p>
                                            <p className="text-sm text-gray-600">{transaction.type === "send" && transaction.direction === "debit" ? transaction.from?.email || "Unknown" : transaction.type === "topup" ? "Bank Deposit" : transaction.type === "withdraw" ? transaction.from?.email || "User" : transaction.from?.email || "N/A"}</p>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex items-center">
                                        <Image src="/dashboard/transaction/iconleft.svg" alt="sending icon" width={24} height={24} className="h-6 w-6" />
                                    </div>

                                    {/* Receiver/To */}
                                    <div className="flex items-center gap-3">
                                        {renderAvatar(transaction.type === "send" && transaction.direction === "credit" ? transaction.from : transaction.to)}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{transaction.type === "send" && transaction.direction === "credit" ? "Receiver" : transaction.type === "withdraw" ? "Bank" : "To"}</p>
                                            <p className="text-sm text-gray-600">{transaction.type === "send" && transaction.direction === "credit" ? transaction.from?.email || "Unknown" : transaction.type === "withdraw" ? "Bank Withdrawal" : transaction.to?.email || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {meta.total > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-[#64748B]">
                            Showing <span className="font-medium">{Math.min((meta.page - 1) * meta.limit + 1, meta.total)}</span> to <span className="font-medium">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-medium">{meta.total}</span> transactions
                        </div>

                        <div className="flex items-center gap-0">
                            <button onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-r-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {(() => {
                                const pages = [];
                                const totalPagesToShow = 4;
                                const totalPages = meta.totalPage;

                                if (totalPages <= totalPagesToShow) {
                                    for (let i = 1; i <= totalPages; i++) {
                                        pages.push(i);
                                    }
                                } else {
                                    pages.push(1);
                                    let start = Math.max(2, meta.page - 1);
                                    let end = Math.min(totalPages - 1, meta.page + 1);

                                    if (meta.page <= 2) {
                                        end = 4;
                                    } else if (meta.page >= totalPages - 1) {
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
                                            className={`rounded-none border border-[#FFEFEB] transition-colors ${meta.page === page ? "bg-[#FFEFEB] text-[#FF5A36] border-[#FF5A36] hover:bg-[#FFEFEB]" : "bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB]"} ${index === 0 ? "rounded-l-none" : ""} ${index === pages.length - 1 ? "rounded-r-none" : ""} px-3 py-1 text-sm`}
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

                            <button onClick={() => handlePageChange(meta.page + 1)} disabled={meta.page === meta.totalPage} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-l-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* No data state */}
            {transactions.length === 0 && (
                <div className="p-20 text-center">
                    <p className="text-gray-500">No transactions found.</p>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
