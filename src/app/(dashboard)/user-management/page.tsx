"use client";
import React, { useState, useMemo } from "react";
import { Search, Eye, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { demoUsers } from "@/test/testUser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const UserManagementPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<"all" | "customer" | "provider">("all");
    const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "pending" | "suspend" | "inactive">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Filter users based on search and filters
    const filteredUsers = useMemo(() => {
        return demoUsers.filter((user) => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === "all" || user.role === selectedType;
            const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [searchTerm, selectedType, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * usersPerPage;
        return filteredUsers.slice(startIndex, startIndex + usersPerPage);
    }, [filteredUsers, currentPage, usersPerPage]);

    return (
        <div className=" space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-1/6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] h-4 w-4 z-10" />
                    <Input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-[#E5E7EB] border-0 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5A36] focus:ring-offset-0 transition-all" />
                </div>

                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as "all" | "customer" | "provider")}>
                    <SelectTrigger className="border-[#D1D5DB]">
                        <SelectValue placeholder="Types" />
                    </SelectTrigger>

                    <SelectContent>
                        <div className="flex flex-col p-2 gap-3">
                            {/* All Types */}
                            <SelectItem value="all" className="flex items-center justify-center rounded-full px-4 py-2 text-gray-700 bg-gray-200 font-medium text-sm data-highlighted:bg-gray-200 data-state-checked:bg-gray-200 [&>span]:hidden">
                                All Types
                            </SelectItem>

                            <SelectItem value="customer" className="flex items-center justify-center rounded-full px-4 py-2 text-[#166534] bg-[#DCFCE7] font-medium text-sm data-highlighted:bg-[#DCFCE7] data-state-checked:bg-[#DCFCE7] [&>span]:hidden">
                                <Image src="/dashboard/user-management/usericon1.svg" alt="user icon " height={12} width={12}></Image>
                                Customer
                            </SelectItem>

                            <SelectItem value="provider" className="flex items-center justify-center rounded-full px-4 py-2 text-[#EAB308] bg-[#FEF9C3] font-medium text-sm data-highlighted:bg-[#FEF9C3] data-state-checked:bg-[#FEF9C3] [&>span]:hidden">
                                <Image src="/dashboard/user-management/usericon2.svg" alt="user icon " height={12} width={12}></Image>
                                Provider
                            </SelectItem>
                        </div>
                    </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as "all" | "active" | "pending" | "suspend" | "inactive")}>
                    <SelectTrigger className="border-[#D1D5DB]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <div className="flex flex-col p-2 gap-3">
                            {/* All Status */}
                            <SelectItem
                                value="all"
                                className="flex items-center justify-center rounded-full px-4 py-2 text-gray-700 bg-gray-200 font-medium text-sm
                   data-highlighted:bg-gray-200 data-state-checked:bg-gray-200 [&>span]:hidden"
                            >
                                All Status
                            </SelectItem>

                            {/* Active */}
                            <SelectItem
                                value="active"
                                className="flex items-center justify-center rounded-full px-4 py-2 text-[#166534] bg-[#DCFCE7] font-medium text-sm
                   data-highlighted:bg-[#DCFCE7] data-state-checked:bg-[#DCFCE7] [&>span]:hidden"
                            >
                                <span className="w-2 h-2 bg-[#22C55E] rounded-full "></span>
                                Active
                            </SelectItem>

                            {/* Pending */}
                            <SelectItem
                                value="pending"
                                className="flex items-center justify-center rounded-full px-4 py-2 text-[#EAB308] bg-[#FEF9C3] font-medium text-sm
                   data-highlighted:bg-[#FEF9C3] data-state-checked:bg-[#FEF9C3] [&>span]:hidden"
                            >
                                <span className="w-2 h-2 bg-[#EAB308] rounded-full "></span>
                                Pending
                            </SelectItem>

                            {/* Suspended */}
                            <SelectItem
                                value="suspend"
                                className="flex items-center justify-center rounded-full px-4 py-2 text-[#991B1B] bg-[#FECACA] font-medium text-sm
                   data-highlighted:bg-[#FECACA] data-state-checked:bg-[#FECACA] [&>span]:hidden"
                            >
                                <span className="w-2 h-2 bg-[#EF4444] rounded-full "></span>
                                Suspended
                            </SelectItem>

                            {/* Inactive */}
                            <SelectItem
                                value="inactive"
                                className="flex items-center justify-center rounded-full px-4 py-2 text-[#6B7280] bg-[#E5E7EB] font-medium text-sm
                   data-highlighted:bg-[#E5E7EB] data-state-checked:bg-[#E5E7EB] [&>span]:hidden"
                            >
                                <span className="w-2 h-2 bg-[#6B7280] rounded-full "></span>
                                Inactive
                            </SelectItem>
                        </div>
                    </SelectContent>
                </Select>
            </div>

            {/* Table Card */}
            <Card className="border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] p-0">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-[#F9FAFB] ">
                            <TableRow className="border-[#E2E8F0] hover:bg-[#F9FAFB] p-4 rounded-tl-3 rounded-tr-3">
                                <TableHead className="text-[#64748B] font-medium p-4">User</TableHead>
                                <TableHead className="text-[#64748B] font-medium text-center">Type</TableHead>
                                <TableHead className="text-[#64748B] font-medium text-center">Joined</TableHead>
                                <TableHead className="text-[#64748B] font-medium text-center">View Details</TableHead>
                                <TableHead className="text-[#64748B] font-medium text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentUsers.map((user) => (
                                <TableRow key={user.id} className="border-[#E2E8F0] hover:bg-[#F9FAFB]">
                                    {/* User Column */}
                                    <TableCell>
                                        <div className="flex items-center gap-3 p-2">
                                            <div className="relative h-10 w-10">
                                                <Image src={user.image} alt={user.name} fill className="rounded-full object-cover" sizes="40px" />
                                            </div>
                                            <div>
                                                <div className="text-[#1E293B] font-medium">{user.name}</div>
                                                <div className="text-[#64748B] text-sm">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Type Column - Fixed width */}
                                    <TableCell>
                                        <div className={`flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium w-32 mx-auto ${user.role === "provider" ? "text-[#EAB308] bg-[#FEF9C3]" : "text-[#166534] bg-[#DCFCE7]"}`}>
                                            {user.role === "provider" ? (
                                                <>
                                                    <Image src="/dashboard/user-management/usericon2.svg" alt="provider icon" height={12} width={12} className="mr-2" />
                                                    Provider
                                                </>
                                            ) : (
                                                <>
                                                    <Image src="/dashboard/user-management/usericon1.svg" alt="customer icon" height={12} width={12} className="mr-2" />
                                                    Customer
                                                </>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* Joined Column */}
                                    <TableCell className="text-[#1E293B] whitespace-nowrap text-center">
                                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </TableCell>

                                    {/* View Details Column */}
                                    <TableCell>
                                        <button className="text-[#FFC000] hover:text-[#FF5A36] hover:bg-[#FF5A36]/10 h-12 w-12 flex items-center justify-center rounded-md transition-colors mx-auto">
                                            <Eye className="h-6 w-6" />
                                        </button>
                                    </TableCell>

                                    {/* Status Column - Fixed width */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center gap-2 justify-center">
                                            <div className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium min-w-[100px] ${user.status === "active" ? "text-[#166534] bg-[#DCFCE7]" : user.status === "pending" ? "text-[#EAB308] bg-[#FEF9C3]" : user.status === "suspend" ? "text-[#991B1B] bg-[#FECACA]" : "text-[#6B7280] bg-[#E5E7EB]"}`}>
                                                <span className={`w-2 h-2 rounded-full mr-2 ${user.status === "active" ? "bg-[#22C55E]" : user.status === "pending" ? "bg-[#EAB308]" : user.status === "suspend" ? "bg-[#EF4444]" : "bg-[#6B7280]"}`}></span>
                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="text-[#64748B] hover:text-[#1E293B] hover:bg-transparent h-10 w-10 flex items-center justify-center rounded-md transition-colors">
                                                        <MoreVertical className="h-5 w-5" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
                                                    <div className="flex flex-col p-2 gap-3">
                                                        {user.status !== "active" && (
                                                            <DropdownMenuItem onClick={() => console.log(`Mark Active: ${user.id}`)} className="flex items-center justify-center rounded-full px-4 py-2 text-[#166534] bg-[#DCFCE7] font-medium text-sm data-highlighted:bg-[#DCFCE7] cursor-pointer">
                                                                <span className="w-2 h-2 bg-[#22C55E] rounded-full "></span>
                                                                Active
                                                            </DropdownMenuItem>
                                                        )}

                                                        <DropdownMenuItem onClick={() => console.log(`Delete: ${user.id}`)} className="flex items-center justify-center rounded-full px-4 py-2 text-[#1F2937] bg-[#F3F4F6] font-medium text-sm data-highlighted:bg-[#F3F4F6] cursor-pointer">
                                                            <span className="w-2 h-2 bg-[#6B7280] rounded-full"></span>
                                                            Delete
                                                        </DropdownMenuItem>

                                                        {user.status !== "suspend" && (
                                                            <DropdownMenuItem onClick={() => console.log(`Suspend: ${user.id}`)} className="flex items-center justify-center rounded-full px-4 py-2 text-[#991B1B] bg-[#FECACA] font-medium text-sm data-highlighted:bg-[#FECACA] cursor-pointer">
                                                                <span className="w-2 h-2 bg-[#EF4444] rounded-full "></span>
                                                                Suspended
                                                            </DropdownMenuItem>
                                                        )}
                                                    </div>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Empty State */}
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-[#64748B]">No users found matching your criteria</div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
                <div className="">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-[#64748B]">
                            Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} results
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F9FAFB]">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={currentPage === page ? "bg-[#FF5A36] text-white hover:bg-[#E53E3E]" : "border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F9FAFB]"}>
                                    {page}
                                </Button>
                            ))}

                            <Button variant="outline" size="icon" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="border-[#E2E8F0] text-[#64748B] hover:text-[#1E293B] hover:bg-[#F9FAFB]">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div> */}
                        <div className="flex items-center gap-0">
                            <Button variant="outline" size="icon" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-r-none">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {(() => {
                                const pages = [];
                                const totalPagesToShow = 4;

                                if (totalPages <= totalPagesToShow) {
                                    // Show all pages if total pages is less than or equal to 4
                                    for (let i = 1; i <= totalPages; i++) {
                                        pages.push(i);
                                    }
                                } else {
                                    // Always show first page
                                    pages.push(1);

                                    // Calculate start and end of visible pages
                                    let start = Math.max(2, currentPage - 1);
                                    let end = Math.min(totalPages - 1, currentPage + 1);

                                    // Adjust if at the beginning
                                    if (currentPage <= 2) {
                                        end = 4;
                                    }
                                    // Adjust if at the end
                                    else if (currentPage >= totalPages - 1) {
                                        start = totalPages - 3;
                                    }

                                    // Add ellipsis after first page if needed
                                    if (start > 2) {
                                        pages.push("...");
                                    }

                                    // Add middle pages
                                    for (let i = start; i <= end; i++) {
                                        pages.push(i);
                                    }

                                    // Add ellipsis before last page if needed
                                    if (end < totalPages - 1) {
                                        pages.push("...");
                                    }

                                    // Always show last page
                                    pages.push(totalPages);
                                }

                                return pages.map((page, index) =>
                                    typeof page === "number" ? (
                                        <Button
                                            key={page}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className={`rounded-none border-[#FFEFEB] ${currentPage === page ? "bg-[#FFEFEB] text-[#FF5A36] border-[#FF5A36] hover:bg-[#FFEFEB]" : "bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB]"} ${index === 0 ? "rounded-l-none" : ""} ${index === pages.length - 1 ? "rounded-r-none" : ""}`}
                                        >
                                            {page}
                                        </Button>
                                    ) : (
                                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-[#64748B]">
                                            {page}
                                        </span>
                                    )
                                );
                            })()}

                            <Button variant="outline" size="icon" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-l-none">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;
