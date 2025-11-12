"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, SquarePen, UserPlus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock staff data
const staffData = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Super Admin", status: "Active", lastActive: "2 minutes ago", employeeId: "EMP001", avatar: "/dashboard/user-management/user1.png" },
    { id: 2, name: "Michael Chen", email: "michael.chen@company.com", role: "Admin", status: "Active", lastActive: "1 hour ago", employeeId: "EMP002", avatar: "/dashboard/user-management/user1.png" },
    { id: 3, name: "Emma Davis", email: "emma.davis@company.com", role: "Admin", status: "Active", lastActive: "3 hours ago", employeeId: "EMP003", avatar: "/dashboard/user-management/user1.png" },
    { id: 4, name: "David Wilson", email: "david.wilson@company.com", role: "Admin", status: "Inactive", lastActive: "2 days ago", employeeId: "EMP004", avatar: "/dashboard/user-management/user1.png" },
    { id: 5, name: "Lisa Anderson", email: "lisa.anderson@company.com", role: "Admin", status: "Active", lastActive: "5 minutes ago", employeeId: "EMP005", avatar: "/dashboard/user-management/user1.png" },
    { id: 6, name: "James Brown", email: "james.brown@company.com", role: "Admin", status: "Active", lastActive: "30 minutes ago", employeeId: "EMP006", avatar: "/dashboard/user-management/user1.png" },
    { id: 7, name: "Maria Garcia", email: "maria.garcia@company.com", role: "Admin", status: "Inactive", lastActive: "1 week ago", employeeId: "EMP007", avatar: "/dashboard/user-management/user1.png" },
    { id: 8, name: "Robert Smith", email: "robert.smith@company.com", role: "Admin", status: "Active", lastActive: "15 minutes ago", employeeId: "EMP008", avatar: "/dashboard/user-management/user1.png" },
];

const StaffManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [activeTab, setActiveTab] = useState("all");
    const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        status: true, // true for Active, false for Inactive
    });

    // Filter staff based on active tab
    const filteredStaff = staffData.filter((staff) => {
        if (activeTab === "all") return true;
        if (activeTab === "active") return staff.status === "Active";
        if (activeTab === "inactive") return staff.status === "Inactive";
        return true;
    });

    // Calculate counts
    const totalStaff = staffData.length;
    const activeStaff = staffData.filter((staff) => staff.status === "Active").length;
    const inactiveStaff = staffData.filter((staff) => staff.status === "Inactive").length;

    // Calculate pagination
    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form data:", formData);
        // Reset form and close modal
        setFormData({
            name: "",
            email: "",
            password: "",
            status: true,
        });
        setIsAddStaffOpen(false);
    };

    const handleCancel = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            status: true,
        });
        setIsAddStaffOpen(false);
    };

    const getStatusColor = (status: string) => {
        return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "Super Admin":
                return "bg-purple-100 text-purple-800";
            case "Admin":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => {
                                setActiveTab("all");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "all" ? "bg-[#FF5A36] text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                        >
                            All Staff ({totalStaff})
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("active");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "active" ? "bg-[#FF5A36] text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                        >
                            Active ({activeStaff})
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("inactive");
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "inactive" ? "bg-[#FF5A36] text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                        >
                            Inactive ({inactiveStaff})
                        </button>
                    </div>

                    <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                                <UserPlus className="w-4 h-4" />
                                Add Staff
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <div className="flex gap-2 items-center">
                                    <UserPlus />
                                    <DialogTitle className="text-[18px] font-semibold text-gray-900">Add Staff</DialogTitle>
                                </div>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                {/* Staff Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Staff Name
                                    </Label>
                                    <Input id="name" type="text" placeholder="Enter staff member name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required />
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </Label>
                                    <Input id="email" type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <Input id="password" type="password" placeholder="Enter Password for admin" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} required />
                                </div>

                                {/* Status Switch */}
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                                        Status
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm ${formData.status ? "text-green-600" : "text-gray-500"}`}>{formData.status ? "Active" : "Inactive"}</span>
                                        <Switch id="status" checked={formData.status} onCheckedChange={(checked) => handleInputChange("status", checked)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1" />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 bg-[#FF5A36] text-white hover:bg-[#E53E3E]">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentStaff.map((staff) => (
                            <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10">
                                            <Image src={staff.avatar} alt={staff.name} width={40} height={40} className="rounded-full object-cover" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                                            <div className="text-sm text-gray-500">ID: {staff.employeeId}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(staff.role)}`}>{staff.role}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>{staff.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.lastActive}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="text-[#4F46E5] hover:text-[#4F46f5] hover:bg-transparent transition-colors ">
                                                <SquarePen className="h-5 w-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
                                            <div className="flex flex-col p-2 gap-3">
                                                {staff.status !== "Active" && (
                                                    <DropdownMenuItem onClick={() => console.log(`Mark Active: ${staff.id}`)} className="flex items-center justify-center rounded-full px-4 py-2 text-[#166534] bg-[#DCFCE7] font-medium text-sm data-highlighted:bg-[#DCFCE7] cursor-pointer gap-2">
                                                        <span className="w-2 h-2 bg-[#22C55E] rounded-full"></span>
                                                        Active
                                                    </DropdownMenuItem>
                                                )}

                                                {staff.status === "Active" && (
                                                    <DropdownMenuItem onClick={() => console.log(`Mark Inactive: ${staff.id}`)} className="flex items-center justify-center rounded-full px-4 py-2 text-[#991B1B] bg-[#FECACA] font-medium text-sm data-highlighted:bg-[#FECACA] cursor-pointer gap-2">
                                                        <span className="w-2 h-2 bg-[#EF4444] rounded-full"></span>
                                                        Inactive
                                                    </DropdownMenuItem>
                                                )}

                                                <DropdownMenuItem onClick={() => console.log(`Delete: ${staff.id}`)} className="flex items-center justify-center rounded-full px-4 py-2 text-[#1F2937] bg-[#F3F4F6] font-medium text-sm data-highlighted:bg-[#F3F4F6] cursor-pointer gap-2">
                                                    <span className="w-2 h-2 bg-[#6B7280] rounded-full"></span>
                                                    Delete
                                                </DropdownMenuItem>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-[#64748B]">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredStaff.length)}</span> of <span className="font-medium">{filteredStaff.length}</span> results
                    </div>

                    <div className="flex items-center gap-0">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-r-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {(() => {
                            const pages = [];
                            const totalPagesToShow = 3;

                            if (totalPages <= totalPagesToShow) {
                                for (let i = 1; i <= totalPages; i++) {
                                    pages.push(i);
                                }
                            } else {
                                pages.push(1);
                                let start = Math.max(2, currentPage - 1);
                                let end = Math.min(totalPages - 1, currentPage + 1);

                                if (currentPage <= 2) {
                                    end = 3;
                                } else if (currentPage >= totalPages - 1) {
                                    start = totalPages - 2;
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

export default StaffManagement;
