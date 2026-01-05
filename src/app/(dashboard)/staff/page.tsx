"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, SquarePen, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCreateAdminMutation, useGetAdminsQuery, useToggleAdminStatusMutation, useDeleteAdminMutation } from "@/redux/features/manageadmin/manageAdminApi";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface Admin {
    _id: string;
    name: string;
    email: string;
    role: "SUPER_ADMIN" | "ADMIN";
    status: "active" | "inactive";
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    status: boolean; // true for active, false for inactive
}

const StaffManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [activeTab, setActiveTab] = useState<"all" | "active" | "inactive">("all");
    const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        status: true,
    });

    // Fetch admins with filtering
    const { data, isLoading, isError, refetch } = useGetAdminsQuery({
        page: currentPage,
        limit: itemsPerPage,
        status: activeTab === "all" ? undefined : activeTab,
    });

    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
    const [toggleAdminStatus, { isLoading: isTogglingStatus }] = useToggleAdminStatusMutation();
    const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();

    const apiData = data?.data;
    const admins = apiData?.admins || [];
    const meta = apiData?.meta || { total: 0, limit: itemsPerPage, page: 1, totalPage: 1 };

    const handleTabChange = (tab: "all" | "active" | "inactive") => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAdmin({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }).unwrap();

            // Show success toast
            toast.success("Admin created successfully!");

            // Reset form and close modal
            setFormData({
                name: "",
                email: "",
                password: "",
                status: true,
            });
            setIsAddStaffOpen(false);
            refetch();
        } catch (error) {
            console.error("Failed to create admin:", error);
            toast.error("Failed to create admin. Please try again.");
        }
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

    const handleStatusToggle = async (adminId: string, currentStatus: "active" | "inactive") => {
        try {
            await toggleAdminStatus(adminId).unwrap();

            const newStatus = currentStatus === "active" ? "inactive" : "active";
            toast.success(`Admin marked as ${newStatus}`);

            refetch();
        } catch (error) {
            console.error("Failed to update admin status:", error);
            toast.error("Failed to update admin status. Please try again.");
        }
    };

    const handleDelete = async (adminId: string, adminName: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete ${adminName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF5A36",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteAdmin(adminId).unwrap();

            Swal.fire({
                title: "Deleted!",
                text: "Admin has been deleted.",
                icon: "success",
                confirmButtonColor: "#FF5A36",
            });

            refetch();
        } catch (error) {
            console.error("Failed to delete admin:", error);

            Swal.fire({
                title: "Error!",
                text: "Failed to delete admin.",
                icon: "error",
                confirmButtonColor: "#FF5A36",
            });
        }
    };

    const getStatusColor = (status: string) => {
        return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "SUPER_ADMIN":
                return "bg-purple-100 text-purple-800";
            case "ADMIN":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? "s" : ""} ago`;
        return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? "s" : ""} ago`;
    };

    // Calculate counts from filtered data
    // const allAdmins = apiData?.admins || [];
    const totalStaff = apiData?.totalAdmins || 0;
    const activeStaff = apiData?.totalActiveAdmins || 0;
    const inactiveStaff = apiData?.totalInactiveAdmins || 0;

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex space-x-1">
                            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-500">All Staff (0)</button>
                            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-500">Active (0)</button>
                            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-500">Inactive (0)</button>
                        </div>
                        <Button className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Add Staff
                        </Button>
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
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex space-x-1">
                            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-500">All Staff (0)</button>
                            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-500">Active (0)</button>
                            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-500">Inactive (0)</button>
                        </div>
                        <Button className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            Add Staff
                        </Button>
                    </div>
                </div>
                <div className="p-20 text-center">
                    <p className="text-red-600">Failed to load staff data. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex space-x-1">
                        <button onClick={() => handleTabChange("all")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "all" ? "bg-[#FF5A36] text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                            All Staff ({totalStaff})
                        </button>
                        <button onClick={() => handleTabChange("active")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "active" ? "bg-[#FF5A36] text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                            Active ({activeStaff})
                        </button>
                        <button onClick={() => handleTabChange("inactive")} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === "inactive" ? "bg-[#FF5A36] text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
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
                        <DialogContent className="sm:max-w-125">
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
                                    <Input id="name" type="text" placeholder="Enter staff member name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required disabled={isCreating} />
                                </div>

                                {/* Email Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </Label>
                                    <Input id="email" type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required disabled={isCreating} />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </Label>
                                    <Input id="password" type="password" placeholder="Enter Password for admin" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} required disabled={isCreating} />
                                </div>

                                {/* Status Switch */}
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                                        Status
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm ${formData.status ? "text-green-600" : "text-gray-500"}`}>{formData.status ? "Active" : "Inactive"}</span>
                                        <Switch id="status" checked={formData.status} onCheckedChange={(checked) => handleInputChange("status", checked)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1" disabled={isCreating} />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50" disabled={isCreating}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 bg-[#FF5A36] text-white hover:bg-[#E53E3E]" disabled={isCreating}>
                                        {isCreating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save"
                                        )}
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
                        {admins.map((admin: Admin) => (
                            <tr key={admin._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600">{admin.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                            <div className="text-sm text-gray-500">ID: {admin._id.slice(-6)}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(admin.role)}`}>{admin.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(admin.status)}`}>{admin.status === "active" ? "Active" : "Inactive"}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(admin.updatedAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="text-[#4F46E5] hover:text-[#4F46f5] hover:bg-transparent transition-colors">
                                                <SquarePen className="h-5 w-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
                                            <div className="flex flex-col p-2 gap-3">
                                                {admin.status !== "active" && (
                                                    <DropdownMenuItem onClick={() => handleStatusToggle(admin._id, admin.status)} disabled={isTogglingStatus || isDeleting} className="flex items-center justify-center rounded-full px-4 py-2 text-[#166534] bg-[#DCFCE7] font-medium text-sm data-highlighted:bg-[#DCFCE7] cursor-pointer gap-2">
                                                        <span className="w-2 h-2 bg-[#22C55E] rounded-full"></span>
                                                        Active
                                                    </DropdownMenuItem>
                                                )}

                                                {admin.status === "active" && (
                                                    <DropdownMenuItem onClick={() => handleStatusToggle(admin._id, admin.status)} disabled={isTogglingStatus || isDeleting} className="flex items-center justify-center rounded-full px-4 py-2 text-[#991B1B] bg-[#FECACA] font-medium text-sm data-highlighted:bg-[#FECACA] cursor-pointer gap-2">
                                                        <span className="w-2 h-2 bg-[#EF4444] rounded-full"></span>
                                                        Inactive
                                                    </DropdownMenuItem>
                                                )}

                                                <DropdownMenuItem onClick={() => handleDelete(admin._id, admin.name)} disabled={isTogglingStatus || isDeleting} className="flex items-center justify-center rounded-full px-4 py-2 text-[#1F2937] bg-[#F3F4F6] font-medium text-sm data-highlighted:bg-[#F3F4F6] cursor-pointer gap-2">
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
            {meta.total > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-[#64748B]">
                            Showing <span className="font-medium">{Math.min((meta.page - 1) * meta.limit + 1, meta.total)}</span> to <span className="font-medium">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-medium">{meta.total}</span> results
                        </div>

                        <div className="flex items-center gap-0">
                            <button onClick={() => handlePageChange(meta.page - 1)} disabled={meta.page === 1} className="border border-[#FFEFEB] bg-white text-[#64748B] hover:text-[#FF5A36] hover:bg-[#FFEFEB] rounded-r-none p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {(() => {
                                const pages = [];
                                const totalPagesToShow = 3;
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
                                        end = 3;
                                    } else if (meta.page >= totalPages - 1) {
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
            {admins.length === 0 && (
                <div className="p-20 text-center">
                    <p className="text-gray-500">No staff members found.</p>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;
