"use client";
import React, { useState } from "react";
import { Plus, Pencil, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetPromotionPackagesQuery, useCreatePromotionPackageMutation, useUpdatePromotionPackageMutation, useDeletePromotionPackageMutation } from "@/redux/features/promotion/promotionApi";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface PromotionPackage {
    _id: string;
    title: string;
    productId: string;
    durationDays: number;
    price: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface FormData {
    title: string;
    productId: string;
    durationDays: number;
    price: number;
    description: string;
}

const PromotionPage = () => {
    const [isAddPromotionOpen, setIsAddPromotionOpen] = useState(false);
    const [isEditPromotionOpen, setIsEditPromotionOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<PromotionPackage | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        productId: "",
        durationDays: 1,
        price: 0,
        description: "",
    });

    // Fetch promotion packages
    const { data, isLoading, isError, refetch } = useGetPromotionPackagesQuery({});
    const [createPromotionPackage, { isLoading: isCreating }] = useCreatePromotionPackageMutation();
    const [updatePromotionPackage, { isLoading: isUpdating }] = useUpdatePromotionPackageMutation();
    const [deletePromotionPackage, { isLoading: isDeleting }] = useDeletePromotionPackageMutation();

    const packages = data?.data || [];

    const handleInputChange = (field: keyof FormData, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Send formData without isActive
            await createPromotionPackage(formData).unwrap();
            toast.success("Promotion package created successfully!");
            setFormData({
                title: "",
                productId: "",
                durationDays: 1,
                price: 0,
                description: "",
            });
            setIsAddPromotionOpen(false);
            refetch();
        } catch (error) {
            console.error("Failed to create promotion package:", error);
            toast.error("Failed to create promotion package. Please try again.");
        }
    };

    const handleEditClick = (pkg: PromotionPackage) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            productId: pkg.productId,
            durationDays: pkg.durationDays,
            price: pkg.price,
            description: pkg.description,
        });
        setIsEditPromotionOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPackage) return;

        try {
            // Send formData without isActive
            await updatePromotionPackage({
                id: editingPackage._id,
                ...formData,
            }).unwrap();
            toast.success("Promotion package updated successfully!");
            setIsEditPromotionOpen(false);
            setEditingPackage(null);
            refetch();
        } catch (error) {
            console.error("Failed to update promotion package:", error);
            toast.error("Failed to update promotion package. Please try again.");
        }
    };

    const handleCancel = () => {
        setFormData({
            title: "",
            productId: "",
            durationDays: 1,
            price: 0,
            description: "",
        });
        setIsAddPromotionOpen(false);
        setIsEditPromotionOpen(false);
        setEditingPackage(null);
    };

    const handleDelete = async (pkg: PromotionPackage) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete ${pkg.title}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF5A36",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            await deletePromotionPackage(pkg._id).unwrap();
            Swal.fire({
                title: "Deleted!",
                text: "Promotion package has been deleted.",
                icon: "success",
                confirmButtonColor: "#FF5A36",
            });
            refetch();
        } catch (error) {
            console.error("Failed to delete promotion package:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete promotion package.",
                icon: "error",
                confirmButtonColor: "#FF5A36",
            });
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-end">
                        <Button className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Package
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
                    <div className="flex justify-end">
                        <Button className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Package
                        </Button>
                    </div>
                </div>
                <div className="p-20 text-center">
                    <p className="text-red-600">Failed to load promotion packages. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="text-lg font-semibold text-gray-900">Promotion Packages ({packages.length})</div>

                    {/* Add Package Dialog */}
                    <Dialog open={isAddPromotionOpen} onOpenChange={setIsAddPromotionOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add Package
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-125">
                            <DialogHeader>
                                <div className="flex gap-2 items-center">
                                    <Plus />
                                    <DialogTitle className="text-[18px] font-semibold text-gray-900">Add Promotion Package</DialogTitle>
                                </div>
                            </DialogHeader>

                            <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                                            Title
                                        </Label>
                                        <Input id="title" type="text" placeholder="e.g., 7 Days Boost" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required disabled={isCreating} />
                                    </div>

                                    {/* Product ID */}
                                    <div className="space-y-2">
                                        <Label htmlFor="productId" className="text-sm font-medium text-gray-700">
                                            Product ID
                                        </Label>
                                        <Input id="productId" type="text" placeholder="e.g., txm.nl.7days" value={formData.productId} onChange={(e) => handleInputChange("productId", e.target.value)} required disabled={isCreating} />
                                    </div>

                                    {/* Duration Days */}
                                    <div className="space-y-2">
                                        <Label htmlFor="durationDays" className="text-sm font-medium text-gray-700">
                                            Duration (Days)
                                        </Label>
                                        <Input id="durationDays" type="number" min="1" value={formData.durationDays} onChange={(e) => handleInputChange("durationDays", parseInt(e.target.value))} required disabled={isCreating} />
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                                            Price (€)
                                        </Label>
                                        <Input id="price" type="number" min="0" step="0.01" value={formData.price} onChange={(e) => handleInputChange("price", parseFloat(e.target.value))} required disabled={isCreating} />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                        Description
                                    </Label>
                                    <Input id="description" type="text" placeholder="Package description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} required disabled={isCreating} />
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
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Package"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Package Dialog */}
                    <Dialog open={isEditPromotionOpen} onOpenChange={setIsEditPromotionOpen}>
                        <DialogContent className="sm:max-w-125">
                            <DialogHeader>
                                <div className="flex gap-2 items-center">
                                    <Pencil />
                                    <DialogTitle className="text-[18px] font-semibold text-gray-900">Edit Promotion Package</DialogTitle>
                                </div>
                            </DialogHeader>

                            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-title" className="text-sm font-medium text-gray-700">
                                            Title
                                        </Label>
                                        <Input id="edit-title" type="text" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required disabled={isUpdating} />
                                    </div>

                                    {/* Product ID */}
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-productId" className="text-sm font-medium text-gray-700">
                                            Product ID
                                        </Label>
                                        <Input id="edit-productId" type="text" value={formData.productId} onChange={(e) => handleInputChange("productId", e.target.value)} required disabled={isUpdating} />
                                    </div>

                                    {/* Duration Days */}
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-durationDays" className="text-sm font-medium text-gray-700">
                                            Duration (Days)
                                        </Label>
                                        <Input id="edit-durationDays" type="number" min="1" value={formData.durationDays} onChange={(e) => handleInputChange("durationDays", parseInt(e.target.value))} required disabled={isUpdating} />
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-price" className="text-sm font-medium text-gray-700">
                                            Price (€)
                                        </Label>
                                        <Input id="edit-price" type="number" min="0" step="0.01" value={formData.price} onChange={(e) => handleInputChange("price", parseFloat(e.target.value))} required disabled={isUpdating} />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-description" className="text-sm font-medium text-gray-700">
                                        Description
                                    </Label>
                                    <Input id="edit-description" type="text" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} required disabled={isUpdating} />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50" disabled={isUpdating}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 bg-[#FF5A36] text-white hover:bg-[#E53E3E]" disabled={isUpdating}>
                                        {isUpdating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Package"
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {packages.map((pkg: PromotionPackage) => (
                            <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                                    <div className="text-sm text-gray-500">{pkg.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.productId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.durationDays} days</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">€{pkg.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(pkg.createdAt)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        {/* Edit Button */}
                                        <button onClick={() => handleEditClick(pkg)} disabled={isUpdating || isDeleting} className="text-[#4F46E5] hover:text-[#4F46f5] hover:bg-transparent transition-colors p-1" title="Edit">
                                            <Pencil className="h-5 w-5" />
                                        </button>

                                        {/* Delete Button */}
                                        <button onClick={() => handleDelete(pkg)} disabled={isUpdating || isDeleting} className="text-[#EF4444] hover:text-[#DC2626] hover:bg-transparent transition-colors p-1" title="Delete">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* No data state */}
            {packages.length === 0 && (
                <div className="p-20 text-center">
                    <p className="text-gray-500">No promotion packages found.</p>
                </div>
            )}
        </div>
    );
};

export default PromotionPage;
