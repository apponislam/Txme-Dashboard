"use client";
import React, { useState } from "react";
import { Search, Download, Trash2, Eye, Filter, ChevronRight, ChevronLeft, TriangleAlert, Calendar, Info, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { auditLogs } from "@/test/testAudit";
import { Label } from "@/components/ui/label";
import LogDetailModal from "@/components/dashboard/audit-logs/LogDetailModal";

const AuditLogsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        role: "",
        module: "",
        status: "",
        startDate: "",
        endDate: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredLogs = auditLogs.filter((log) => {
        const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.module.toLowerCase().includes(searchTerm.toLowerCase()) || log.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = !filters.role || log.role === filters.role;
        const matchesModule = !filters.module || log.module.toLowerCase().includes(filters.module.toLowerCase());
        const matchesStatus = !filters.status || log.status === filters.status;

        return matchesSearch && matchesRole && matchesModule && matchesStatus;
    });

    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const currentLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Success":
                return "default";
            case "Failed":
                return "destructive";
            case "Warning":
                return "secondary";
            default:
                return "default";
        }
    };

    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [fileType, setFileType] = useState("csv");

    const handleExport = () => {
        setIsExportModalOpen(true);
    };

    const handleConfirmExport = () => {
        // Export logic here based on fileType
        console.log(`Exporting logs as ${fileType.toUpperCase()}...`);
        setIsExportModalOpen(false);
    };

    const [isClearModalOpen, setIsClearModalOpen] = useState(false);

    const handleClear = () => {
        setIsClearModalOpen(true);
    };

    const handleConfirmClear = () => {
        // Clear logs logic here
        console.log("Clearing all logs...");
        setIsClearModalOpen(false);
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        setIsFilterModalOpen(false);
        setCurrentPage(1);
    };

    const [isLogDetailModalOpen, setIsLogDetailModalOpen] = useState(false);

    // Add this function
    const handleViewLog = () => {
        setIsLogDetailModalOpen(true);
    };

    const clearFilters = () => {
        setFilters({
            role: "",
            module: "",
            status: "",
            startDate: "",
            endDate: "",
        });
    };

    const hasActiveFilters = Object.values(filters).some((value) => value !== "");

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            {/* <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            </div> */}

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-[#FFFFFF] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] py-4 px-6 rounded-[12px]">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64 bg-[#FFFFFF] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] border-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                    </div>

                    <Button variant="outline" onClick={() => setIsFilterModalOpen(true)} className={`flex items-center gap-2 ${hasActiveFilters ? "border-blue-500 bg-blue-50" : ""}`}>
                        <Filter className="h-4 w-4" />
                        Filter
                        {hasActiveFilters && (
                            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                                !
                            </Badge>
                        )}
                    </Button>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <Button onClick={handleExport} className="flex items-center gap-2 bg-[#FF5A36] text-white hover:bg-[#FF5A36]/80">
                        <Download className="h-4 w-4" />
                        Export Logs
                    </Button>

                    <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-semibold">Export Logs Settings</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-gray-700">File Type</Label>
                                    <div className="space-y-2">
                                        {/* CSV Option */}
                                        <button type="button" onClick={() => setFileType("csv")} className={`w-full text-left p-3 border rounded-lg transition-colors ${fileType === "csv" ? "border-[#FF5A36] bg-[#FFEFEB]" : "border-gray-200 hover:bg-gray-50"}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${fileType === "csv" ? "border-[#FF5A36] bg-[#FF5A36]" : "border-gray-300"}`}>{fileType === "csv" && <div className="h-2 w-2 rounded-full bg-white"></div>}</div>
                                                <div>
                                                    <div className="font-medium text-gray-900">CSV</div>
                                                    <div className="text-sm text-gray-500">Comma Separated Values</div>
                                                </div>
                                            </div>
                                        </button>

                                        {/* PDF Option */}
                                        <button type="button" onClick={() => setFileType("pdf")} className={`w-full text-left p-3 border rounded-lg transition-colors ${fileType === "pdf" ? "border-[#FF5A36] bg-[#FFEFEB]" : "border-gray-200 hover:bg-gray-50"}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${fileType === "pdf" ? "border-[#FF5A36] bg-[#FF5A36]" : "border-gray-300"}`}>{fileType === "pdf" && <div className="h-2 w-2 rounded-full bg-white"></div>}</div>
                                                <div>
                                                    <div className="font-medium text-gray-900">PDF</div>
                                                    <div className="text-sm text-gray-500">Portable Document Format</div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="flex gap-3">
                                <Button variant="outline" onClick={() => setIsExportModalOpen(false)} className="">
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirmExport} className=" bg-[#FF5A36] text-white hover:bg-[#FF5A36]/90">
                                    Export Now
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleClear} className="flex items-center gap-2 bg-[#DC2626] text-white hover:bg-[#DC2626]/80">
                        <Trash2 className="h-4 w-4" />
                        Clear Logs
                    </Button>
                    <Dialog open={isClearModalOpen} onOpenChange={setIsClearModalOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <div className="flex items-center justify-center">
                                    <div className="bg-[#FEE2E2] w-16 h-16 flex items-center justify-center rounded-full text-[#DC2626] mb-4">
                                        <TriangleAlert />
                                    </div>
                                </div>
                                <DialogTitle className="text-xl font-semibold text-center text-[#111827] mb-6">Clear All Logs</DialogTitle>
                                <DialogDescription className="text-center text-[#4B5563] mb-6">
                                    Are you sure you want to permanently <br /> delete all audit logs?
                                </DialogDescription>
                                <div className="rounded-[6px] border-l-4 border-[#F87171] bg-[#FEF2F2] py-3 px-4 mb-8">This action cannot be undone</div>
                            </DialogHeader>

                            <DialogFooter className="flex gap-3 sm:justify-center">
                                <Button variant="outline" onClick={() => setIsClearModalOpen(false)} className="">
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirmClear} className=" bg-[#DC2626] text-white hover:bg-[#DC2626]/90">
                                    Yes, Clear All
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Recent Audit Logs */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Audit Logs</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <Image src={log.userImage} alt={log.userName} width={32} height={32} className="rounded-full" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{log.userName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.role}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{log.action}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.module}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{log.dateTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={getStatusVariant(log.status)}>{log.status}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{log.details}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" onClick={handleViewLog}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <LogDetailModal isOpen={isLogDetailModalOpen} onClose={() => setIsLogDetailModalOpen(false)} />

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-[#64748B]">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} results
                        </div>
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
            </div>

            {/* Filter Modal */}
            <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filter Audit Logs
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Role and Status in one row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="role-filter" className="text-sm font-medium text-gray-700">
                                    Role
                                </Label>
                                <Select value={filters.role} onValueChange={(value) => handleFilterChange("role", value)}>
                                    <SelectTrigger id="role-filter" className="w-full">
                                        <SelectValue placeholder="All Roles" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Roles</SelectItem>
                                        <SelectItem value="Administrator">Administrator</SelectItem>
                                        <SelectItem value="Provider">Provider</SelectItem>
                                        <SelectItem value="Client">Client</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                                    Status
                                </Label>
                                <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                                    <SelectTrigger id="status-filter" className="w-full">
                                        <SelectValue placeholder="All Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Success">Success</SelectItem>
                                        <SelectItem value="Failed">Failed</SelectItem>
                                        <SelectItem value="Warning">Warning</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">Date Range</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="start-date" className="text-xs text-gray-500">
                                        From Date
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="start-date" type="date" value={filters.startDate} onChange={(e) => handleFilterChange("startDate", e.target.value)} className="pl-10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-date" className="text-xs text-gray-500">
                                        To Date
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input id="end-date" type="date" value={filters.endDate} onChange={(e) => handleFilterChange("endDate", e.target.value)} className="pl-10" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Module */}
                        <div className="space-y-2">
                            <Label htmlFor="module-filter" className="text-sm font-medium text-gray-700">
                                Module
                            </Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input id="module-filter" value={filters.module} onChange={(e) => handleFilterChange("module", e.target.value)} placeholder="Search by module name..." className="pl-10" />
                            </div>
                        </div>

                        {/* Active Filters Summary */}
                        {hasActiveFilters && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-800">Active Filters</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {filters.role && filters.role !== "all" && (
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                            Role: {filters.role}
                                        </Badge>
                                    )}
                                    {filters.status && filters.status !== "all" && (
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                            Status: {filters.status}
                                        </Badge>
                                    )}
                                    {filters.module && (
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                            Module: {filters.module}
                                        </Badge>
                                    )}
                                    {(filters.startDate || filters.endDate) && (
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                            Date Range
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button type="button" variant="outline" onClick={clearFilters} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50" disabled={!hasActiveFilters}>
                                <X className="h-4 w-4 mr-2" />
                                Clear All
                            </Button>
                            <Button type="button" onClick={applyFilters} className="flex-1 bg-[#FF5A36] text-white hover:bg-[#FF5A36]/90">
                                <Filter className="h-4 w-4 mr-2" />
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AuditLogsPage;
