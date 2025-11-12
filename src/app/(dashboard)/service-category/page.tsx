"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp, Minus, CircleMinus, CirclePlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Service {
    id: string;
    mainService: string;
    subServices: string[];
    status: boolean;
}

const ServicesPage = () => {
    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [services, setServices] = useState<Service[]>([
        {
            id: "1",
            mainService: "Spa Services",
            subServices: ["Massage Therapy", "Facial Treatment", "Body Wrap"],
            status: true,
        },
        {
            id: "2",
            mainService: "Beauty Services",
            subServices: ["Hair Styling", "Manicure & Pedicure", "Eyebrow Threading"],
            status: true,
        },
        {
            id: "3",
            mainService: "Wellness Services",
            subServices: ["Yoga Sessions", "Meditation Classes"],
            status: true,
        },
    ]);

    const [formData, setFormData] = useState({
        mainService: "",
        subServices: [""],
    });

    const toggleRow = (id: string) => {
        setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
    };

    const handleStatusChange = (id: string, status: boolean) => {
        setServices((prev) => prev.map((service) => (service.id === id ? { ...service, status } : service)));
    };

    // const handleMainServiceChange = (value: string) => {
    //     setFormData((prev) => ({ ...prev, mainService: value }));
    // };

    const handleSubServiceChange = (index: number, value: string) => {
        const newSubServices = [...formData.subServices];
        newSubServices[index] = value;
        setFormData((prev) => ({ ...prev, subServices: newSubServices }));
    };

    const addSubServiceField = () => {
        setFormData((prev) => ({
            ...prev,
            subServices: [...prev.subServices, ""],
        }));
    };

    const removeSubServiceField = (index: number) => {
        if (formData.subServices.length > 1) {
            const newSubServices = formData.subServices.filter((_, i) => i !== index);
            setFormData((prev) => ({ ...prev, subServices: newSubServices }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newService: Service = {
            id: Date.now().toString(),
            mainService: formData.mainService,
            subServices: formData.subServices.filter((sub) => sub.trim() !== ""),
            status: true,
        };
        setServices((prev) => [...prev, newService]);
        setIsAddServiceModalOpen(false);
        setFormData({ mainService: "", subServices: [""] });
    };

    return (
        <div className="p-6">
            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub/Child Service(s)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {services.map((service) => (
                            <React.Fragment key={service.id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => toggleRow(service.id)} className="p-1 hover:bg-gray-100 rounded">
                                                {expandedRows.includes(service.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </button>
                                            <span className="font-medium text-gray-900">{service.mainService}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {service.subServices.slice(0, 2).map((subService, index) => (
                                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {subService}
                                                </span>
                                            ))}
                                            {service.subServices.length > 2 && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">+{service.subServices.length - 2} more</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Switch checked={service.status} onCheckedChange={(checked) => handleStatusChange(service.id, checked)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1 p-0.5" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Expanded row for sub-services */}
                                {expandedRows.includes(service.id) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 bg-gray-50">
                                            <div className="pl-8">
                                                <h4 className="text-sm font-medium text-gray-900 mb-2">All Sub Services:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.subServices.map((subService, index) => (
                                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                            {subService}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Service Modal */}
            <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Add New Service</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Main Service */}
                        <div className="space-y-2">
                            <Label htmlFor="mainService">Main service</Label>
                            <Input id="mainService" value={formData.mainService} onChange={(e) => setFormData((prev) => ({ ...prev, mainService: e.target.value }))} placeholder="Enter main service" />
                        </div>

                        {/* Sub Services */}
                        <div className="space-y-2">
                            <Label>Sub/Child Service(s)</Label>
                            <div className="space-y-2">
                                {formData.subServices.map((subService, index) => (
                                    <div key={index} className="relative">
                                        <Input
                                            value={subService}
                                            onChange={(e) => handleSubServiceChange(index, e.target.value)}
                                            placeholder={`Sub service ${index + 1}`}
                                            className="pr-20" // Add padding for buttons
                                        />
                                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                                            <button type="button" onClick={() => removeSubServiceField(index)} className="text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={formData.subServices.length === 1}>
                                                <CircleMinus className="h-5 w-5" />
                                            </button>
                                            {index === formData.subServices.length - 1 && (
                                                <button type="button" onClick={addSubServiceField} className="text-green-600 hover:text-green-700">
                                                    <CirclePlus className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddServiceModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90">
                                Add Service
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="flex justify-end items-center mt-12 mb-6">
                <Button onClick={() => setIsAddServiceModalOpen(true)} className="bg-[#FF5A36] hover:bg-[#FF5A36]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                </Button>
            </div>
        </div>
    );
};

export default ServicesPage;
