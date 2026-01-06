// "use client";
// import React, { useState } from "react";
// import { Plus, Edit, Trash2, ChevronDown, ChevronUp, CircleMinus, CirclePlus } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";

// interface Service {
//     id: string;
//     mainService: string;
//     subServices: string[];
//     status: boolean;
// }

// const ServicesPage = () => {
//     const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
//     const [expandedRows, setExpandedRows] = useState<string[]>([]);
//     const [services, setServices] = useState<Service[]>([
//         {
//             id: "1",
//             mainService: "Spa Services",
//             subServices: ["Massage Therapy", "Facial Treatment", "Body Wrap"],
//             status: true,
//         },
//         {
//             id: "2",
//             mainService: "Beauty Services",
//             subServices: ["Hair Styling", "Manicure & Pedicure", "Eyebrow Threading"],
//             status: true,
//         },
//         {
//             id: "3",
//             mainService: "Wellness Services",
//             subServices: ["Yoga Sessions", "Meditation Classes"],
//             status: true,
//         },
//     ]);

//     const [formData, setFormData] = useState({
//         mainService: "",
//         subServices: [""],
//     });

//     const toggleRow = (id: string) => {
//         setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
//     };

//     const handleStatusChange = (id: string, status: boolean) => {
//         setServices((prev) => prev.map((service) => (service.id === id ? { ...service, status } : service)));
//     };

//     const handleSubServiceChange = (index: number, value: string) => {
//         const newSubServices = [...formData.subServices];
//         newSubServices[index] = value;
//         setFormData((prev) => ({ ...prev, subServices: newSubServices }));
//     };

//     const addSubServiceField = () => {
//         setFormData((prev) => ({
//             ...prev,
//             subServices: [...prev.subServices, ""],
//         }));
//     };

//     const removeSubServiceField = (index: number) => {
//         if (formData.subServices.length > 1) {
//             const newSubServices = formData.subServices.filter((_, i) => i !== index);
//             setFormData((prev) => ({ ...prev, subServices: newSubServices }));
//         }
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newService: Service = {
//             id: Date.now().toString(),
//             mainService: formData.mainService,
//             subServices: formData.subServices.filter((sub) => sub.trim() !== ""),
//             status: true,
//         };
//         setServices((prev) => [...prev, newService]);
//         setIsAddServiceModalOpen(false);
//         setFormData({ mainService: "", subServices: [""] });
//     };

//     return (
//         <div className="p-6">
//             {/* Table */}
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                 <table className="w-full">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Service</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub/Child Service(s)</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {services.map((service) => (
//                             <React.Fragment key={service.id}>
//                                 <tr className="hover:bg-gray-50">
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex items-center gap-2">
//                                             <button onClick={() => toggleRow(service.id)} className="p-1 hover:bg-gray-100 rounded">
//                                                 {expandedRows.includes(service.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                                             </button>
//                                             <span className="font-medium text-gray-900">{service.mainService}</span>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex flex-wrap gap-1">
//                                             {service.subServices.slice(0, 2).map((subService, index) => (
//                                                 <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                                     {subService}
//                                                 </span>
//                                             ))}
//                                             {service.subServices.length > 2 && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">+{service.subServices.length - 2} more</span>}
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex items-center gap-2">
//                                             <Switch checked={service.status} onCheckedChange={(checked) => handleStatusChange(service.id, checked)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1 p-0.5" />
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex items-center gap-2">
//                                             <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
//                                                 <Trash2 className="h-4 w-4" />
//                                             </button>
//                                             <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
//                                                 <Edit className="h-4 w-4" />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                                 {/* Expanded row for sub-services */}
//                                 {expandedRows.includes(service.id) && (
//                                     <tr>
//                                         <td colSpan={4} className="px-6 py-4 bg-gray-50">
//                                             <div className="pl-8">
//                                                 <h4 className="text-sm font-medium text-gray-900 mb-2">All Sub Services:</h4>
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {service.subServices.map((subService, index) => (
//                                                         <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                                                             {subService}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add Service Modal */}
//             <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold">Add New Service</DialogTitle>
//                     </DialogHeader>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         {/* Main Service */}
//                         <div className="space-y-2">
//                             <Label htmlFor="mainService">Main service</Label>
//                             <Input id="mainService" value={formData.mainService} onChange={(e) => setFormData((prev) => ({ ...prev, mainService: e.target.value }))} placeholder="Enter main service" />
//                         </div>

//                         {/* Sub Services */}
//                         <div className="space-y-2">
//                             <Label>Sub/Child Service(s)</Label>
//                             <div className="space-y-2">
//                                 {formData.subServices.map((subService, index) => (
//                                     <div key={index} className="relative">
//                                         <Input
//                                             value={subService}
//                                             onChange={(e) => handleSubServiceChange(index, e.target.value)}
//                                             placeholder={`Sub service ${index + 1}`}
//                                             className="pr-20" // Add padding for buttons
//                                         />
//                                         <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
//                                             <button type="button" onClick={() => removeSubServiceField(index)} className="text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={formData.subServices.length === 1}>
//                                                 <CircleMinus className="h-5 w-5" />
//                                             </button>
//                                             {index === formData.subServices.length - 1 && (
//                                                 <button type="button" onClick={addSubServiceField} className="text-green-600 hover:text-green-700">
//                                                     <CirclePlus className="h-5 w-5" />
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex gap-3 pt-4">
//                             <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddServiceModalOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90">
//                                 Add Service
//                             </Button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             <div className="flex justify-end items-center mt-12 mb-6">
//                 <Button onClick={() => setIsAddServiceModalOpen(true)} className="bg-[#FF5A36] hover:bg-[#FF5A36]/90">
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Service
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default ServicesPage;

// "use client";
// import React, { useState } from "react";
// import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import Image from "next/image";
// import { toast } from "sonner";
// import Swal from "sweetalert2";
// import { useGetServicesQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } from "@/redux/features/services/servicesApi";

// interface Service {
//     _id: string;
//     name: string;
//     image: string;
//     parent: string | null;
//     isActive: boolean;
//     createdAt: string;
//     updatedAt: string;
// }

// const ServicesPage = () => {
//     // State
//     const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
//     const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
//     const [expandedRows, setExpandedRows] = useState<string[]>([]);
//     const [editingService, setEditingService] = useState<Service | null>(null);

//     // Form state
//     const [formData, setFormData] = useState({
//         name: "",
//         parent: "",
//         isActive: true,
//         image: null as File | null,
//     });
//     const [imagePreview, setImagePreview] = useState<string>("");

//     // API hooks - Get ALL services at once
//     const { data: allServicesData, isLoading: isLoadingServices, refetch: refetchServices } = useGetServicesQuery({});

//     const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
//     const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
//     const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

//     // Process all services into parent-child structure
//     const allServices = allServicesData?.data?.services || [];

//     // Separate parents and children
//     const parentServices = allServices.filter((service: any) => !service.parent);

//     // Create child services map
//     const childServicesMap: Record<string, Service[]> = {};
//     allServices.forEach((service: any) => {
//         if (service.parent) {
//             if (!childServicesMap[service.parent]) {
//                 childServicesMap[service.parent] = [];
//             }
//             childServicesMap[service.parent].push(service);
//         }
//     });

//     // Get child services for a specific parent
//     const getChildServices = (parentId: string) => {
//         return childServicesMap[parentId] || [];
//     };

//     // Construct full image URL
//     const getImageUrl = (imagePath: string) => {
//         const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "http://localhost:5000";
//         return `${baseUrl}${imagePath}`;
//     };

//     // Handle image change
//     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             setFormData((prev) => ({ ...prev, image: file }));
//             const previewUrl = URL.createObjectURL(file);
//             setImagePreview(previewUrl);
//         }
//     };

//     // Handle form input change
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     // Toggle row expansion - CLICK THE ARROW TO EXPAND!
//     const toggleRow = (id: string) => {
//         setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
//     };

//     // Open edit modal
//     const handleEditClick = (service: Service) => {
//         setEditingService(service);
//         setFormData({
//             name: service.name,
//             parent: service.parent || "",
//             isActive: service.isActive,
//             image: null,
//         });
//         setImagePreview(getImageUrl(service.image));
//         setIsEditServiceModalOpen(true);
//     };

//     // Open add modal
//     const handleAddClick = () => {
//         setEditingService(null);
//         setFormData({
//             name: "",
//             parent: "",
//             isActive: true,
//             image: null,
//         });
//         setImagePreview("");
//         setIsAddServiceModalOpen(true);
//     };

//     // Handle create service
//     const handleCreateSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!formData.image) {
//             toast.error("Service image is required!");
//             return;
//         }

//         try {
//             const formDataToSend = new FormData();

//             // Add JSON data as a field
//             const serviceData = {
//                 name: formData.name,
//                 isActive: formData.isActive,
//             };

//             if (formData.parent) {
//                 (serviceData as any).parent = formData.parent;
//             }

//             formDataToSend.append("data", JSON.stringify(serviceData));
//             formDataToSend.append("serviceimage", formData.image);

//             await createService(formDataToSend).unwrap();

//             toast.success("Service created successfully!");
//             setIsAddServiceModalOpen(false);

//             // Reset form
//             setFormData({
//                 name: "",
//                 parent: "",
//                 isActive: true,
//                 image: null,
//             });
//             setImagePreview("");

//             // Refetch services
//             refetchServices();
//         } catch (error: any) {
//             console.error("Create Error:", error);
//             toast.error(error?.data?.message || "Failed to create service!");
//         }
//     };

//     // Handle update service
//     const handleUpdateSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!editingService) return;

//         try {
//             const formDataToSend = new FormData();

//             // Add JSON data as a field
//             const serviceData = {
//                 name: formData.name,
//                 isActive: formData.isActive,
//             };

//             if (formData.parent) {
//                 (serviceData as any).parent = formData.parent;
//             }

//             formDataToSend.append("data", JSON.stringify(serviceData));

//             if (formData.image) {
//                 formDataToSend.append("serviceimage", formData.image);
//             }

//             await updateService({
//                 id: editingService._id,
//                 formData: formDataToSend,
//             }).unwrap();

//             toast.success("Service updated successfully!");
//             setIsEditServiceModalOpen(false);

//             // Reset form
//             setFormData({
//                 name: "",
//                 parent: "",
//                 isActive: true,
//                 image: null,
//             });
//             setImagePreview("");
//             setEditingService(null);

//             // Refetch services
//             refetchServices();
//         } catch (error: any) {
//             console.error("Update Error:", error);
//             toast.error(error?.data?.message || "Failed to update service!");
//         }
//     };

//     // Handle delete service
//     const handleDeleteClick = async (serviceId: string, serviceName: string) => {
//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: `Do you want to delete "${serviceName}"?`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, delete it!",
//             cancelButtonText: "Cancel",
//         });

//         if (result.isConfirmed) {
//             try {
//                 await deleteService(serviceId).unwrap();
//                 toast.success("Service deleted successfully!");
//                 refetchServices();
//             } catch (error: any) {
//                 toast.error(error?.data?.message || "Failed to delete service!");
//             }
//         }
//     };

//     // Handle status change
//     const handleStatusChange = async (serviceId: string, currentStatus: boolean) => {
//         try {
//             const newStatus = !currentStatus;

//             const formDataToSend = new FormData();
//             formDataToSend.append(
//                 "data",
//                 JSON.stringify({
//                     isActive: newStatus,
//                 })
//             );

//             await updateService({
//                 id: serviceId,
//                 formData: formDataToSend,
//             }).unwrap();

//             toast.success(`Service ${newStatus ? "activated" : "deactivated"} successfully!`);
//             refetchServices();
//         } catch (error: any) {
//             console.error("Status change error:", error);
//             toast.error(error?.data?.message || "Failed to update status!");
//         }
//     };

//     // Loading state
//     if (isLoadingServices) {
//         return (
//             <div className="p-6 flex items-center justify-center">
//                 <div className="text-lg">Loading services...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             {/* Table */}
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                 <table className="w-full">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Service</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {parentServices.map((service: Service) => {
//                             const childServices = getChildServices(service._id);
//                             const hasChildren = childServices.length > 0;

//                             return (
//                                 <React.Fragment key={service._id}>
//                                     {/* Parent Service Row - ARROW IS HERE! */}
//                                     <tr className="hover:bg-gray-50">
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="flex items-center gap-2">
//                                                 {/* ARROW BUTTON - CLICK THIS! */}
//                                                 <button onClick={() => toggleRow(service._id)} className="p-1 hover:bg-gray-100 rounded">
//                                                     {expandedRows.includes(service._id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                                                 </button>
//                                                 <span className="font-medium text-gray-900">{service.name}</span>
//                                                 {hasChildren && <span className="text-xs text-gray-500">({childServices.length} sub-services)</span>}
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="relative w-12 h-12 rounded overflow-hidden">
//                                                 <Image src={getImageUrl(service.image)} alt={service.name} fill className="object-cover" unoptimized />
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="flex items-center gap-2">
//                                                 <Switch checked={service.isActive} onCheckedChange={() => handleStatusChange(service._id, service.isActive)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1 p-0.5" />
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <div className="flex items-center gap-2">
//                                                 <button onClick={() => handleDeleteClick(service._id, service.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" disabled={isDeleting}>
//                                                     <Trash2 className="h-4 w-4" />
//                                                 </button>
//                                                 <button onClick={() => handleEditClick(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
//                                                     <Edit className="h-4 w-4" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>

//                                     {/* EXPANDED CHILD SERVICES ROW - THIS SHOWS WHEN YOU CLICK THE ARROW! */}
//                                     {expandedRows.includes(service._id) && (
//                                         <tr>
//                                             <td colSpan={4} className="px-6 py-4 bg-gray-50">
//                                                 <div className="pl-12">
//                                                     <h4 className="text-sm font-medium text-gray-900 mb-3">
//                                                         Sub Services of <span className="font-bold">{service.name}</span>:
//                                                     </h4>

//                                                     {childServices.length > 0 ? (
//                                                         <div className="bg-white p-4 rounded border">
//                                                             <div className="grid grid-cols-12 gap-4 mb-4 pb-4 border-b">
//                                                                 <div className="col-span-4 font-medium text-gray-700">Service Name</div>
//                                                                 <div className="col-span-3 font-medium text-gray-700">Image</div>
//                                                                 <div className="col-span-2 font-medium text-gray-700">Status</div>
//                                                                 <div className="col-span-3 font-medium text-gray-700">Actions</div>
//                                                             </div>
//                                                             {childServices.map((child) => (
//                                                                 <div key={child._id} className="grid grid-cols-12 gap-4 items-center py-3 border-b last:border-b-0">
//                                                                     <div className="col-span-4">
//                                                                         <span className="font-medium text-gray-900">{child.name}</span>
//                                                                     </div>
//                                                                     <div className="col-span-3">
//                                                                         <div className="relative w-10 h-10 rounded overflow-hidden">
//                                                                             <Image src={getImageUrl(child.image)} alt={child.name} fill className="object-cover" unoptimized />
//                                                                         </div>
//                                                                     </div>
//                                                                     <div className="col-span-2">
//                                                                         <Switch checked={child.isActive} onCheckedChange={() => handleStatusChange(child._id, child.isActive)} className="data-[state=checked]:bg-[#FF5A36] h-5 w-10 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1 p-0.5" />
//                                                                     </div>
//                                                                     <div className="col-span-3">
//                                                                         <div className="flex items-center gap-2">
//                                                                             <button onClick={() => handleEditClick(child)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
//                                                                                 <Edit className="h-4 w-4" />
//                                                                             </button>
//                                                                             <button onClick={() => handleDeleteClick(child._id, child.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" disabled={isDeleting}>
//                                                                                 <Trash2 className="h-4 w-4" />
//                                                                             </button>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     ) : (
//                                                         <div className="text-center py-4 text-gray-500">No sub-services found for this category.</div>
//                                                     )}
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Add Service Modal */}
//             <Dialog open={isAddServiceModalOpen} onOpenChange={setIsAddServiceModalOpen}>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold">Add New Service</DialogTitle>
//                     </DialogHeader>

//                     <form onSubmit={handleCreateSubmit} className="space-y-4">
//                         {/* Service Name */}
//                         <div className="space-y-2">
//                             <Label htmlFor="name">Service Name *</Label>
//                             <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter service name" required />
//                         </div>

//                         {/* Parent Service (Optional) */}
//                         <div className="space-y-2">
//                             <Label htmlFor="parent">Parent Service (Optional)</Label>
//                             <select id="parent" name="parent" value={formData.parent} onChange={(e) => setFormData((prev) => ({ ...prev, parent: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md">
//                                 <option value="">Select parent service (leave empty for main service)</option>
//                                 {parentServices.map((service: Service) => (
//                                     <option key={service._id} value={service._id}>
//                                         {service.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Service Image */}
//                         <div className="space-y-2">
//                             <Label htmlFor="image">Service Image *</Label>
//                             <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
//                             {imagePreview && (
//                                 <div className="mt-2 relative w-24 h-24 rounded overflow-hidden border">
//                                     <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
//                                 </div>
//                             )}
//                         </div>

//                         {/* Status */}
//                         <div className="flex items-center justify-between">
//                             <Label htmlFor="isActive">Active Status</Label>
//                             <Switch id="isActive" name="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))} className="data-[state=checked]:bg-[#FF5A36]" />
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex gap-3 pt-4">
//                             <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddServiceModalOpen(false)} disabled={isCreating}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90" disabled={isCreating}>
//                                 {isCreating ? "Creating..." : "Add Service"}
//                             </Button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {/* Edit Service Modal */}
//             <Dialog open={isEditServiceModalOpen} onOpenChange={setIsEditServiceModalOpen}>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold">Edit Service</DialogTitle>
//                     </DialogHeader>

//                     <form onSubmit={handleUpdateSubmit} className="space-y-4">
//                         {/* Service Name */}
//                         <div className="space-y-2">
//                             <Label htmlFor="editName">Service Name *</Label>
//                             <Input id="editName" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter service name" required />
//                         </div>

//                         {/* Parent Service (Optional) */}
//                         <div className="space-y-2">
//                             <Label htmlFor="editParent">Parent Service (Optional)</Label>
//                             <select id="editParent" name="parent" value={formData.parent} onChange={(e) => setFormData((prev) => ({ ...prev, parent: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md">
//                                 <option value="">Select parent service (leave empty for main service)</option>
//                                 {parentServices.map((service: Service) => (
//                                     <option key={service._id} value={service._id}>
//                                         {service.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Service Image */}
//                         <div className="space-y-2">
//                             <Label htmlFor="editImage">Service Image</Label>
//                             <Input id="editImage" type="file" accept="image/*" onChange={handleImageChange} />
//                             {imagePreview && (
//                                 <div className="mt-2 relative w-24 h-24 rounded overflow-hidden border">
//                                     <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
//                                 </div>
//                             )}
//                             <p className="text-xs text-gray-500">Leave empty to keep current image</p>
//                         </div>

//                         {/* Status */}
//                         <div className="flex items-center justify-between">
//                             <Label htmlFor="editIsActive">Active Status</Label>
//                             <Switch id="editIsActive" name="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))} className="data-[state=checked]:bg-[#FF5A36]" />
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex gap-3 pt-4">
//                             <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditServiceModalOpen(false)} disabled={isUpdating}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90" disabled={isUpdating}>
//                                 {isUpdating ? "Updating..." : "Update Service"}
//                             </Button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {/* Add Service Button */}
//             <div className="flex justify-end items-center mt-12 mb-6">
//                 <Button onClick={handleAddClick} className="bg-[#FF5A36] hover:bg-[#FF5A36]/90">
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Service
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default ServicesPage;

"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useGetServicesQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } from "@/redux/features/services/servicesApi";

interface Service {
    _id: string;
    name: string;
    image: string;
    parent: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Component for child services row
const ChildServicesRow: React.FC<{
    parentId: string;
    parentName: string;
    onEdit: (service: Service) => void;
    onDelete: (id: string, name: string) => void;
    onStatusChange: (id: string, currentStatus: boolean) => void;
    getImageUrl: (imagePath: string) => string;
    isDeleting: boolean;
}> = ({ parentId, parentName, onEdit, onDelete, onStatusChange, getImageUrl, isDeleting }) => {
    // Fetch child services for this parent
    const { data: childServicesData, isLoading: isLoadingChildren } = useGetServicesQuery({ parent: parentId });

    const childServices = childServicesData?.data?.services || [];

    if (isLoadingChildren) {
        return (
            <tr>
                <td colSpan={4} className="px-6 py-4 bg-gray-50">
                    <div className="pl-12 text-center py-4 text-gray-500">Loading sub-services...</div>
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td colSpan={4} className="px-6 py-4 bg-gray-50">
                <div className="pl-12">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Sub Services of <span className="font-bold">{parentName}</span>:
                    </h4>

                    {childServices.length > 0 ? (
                        <div className="bg-white p-4 rounded border">
                            <div className="grid grid-cols-12 gap-4 mb-4 pb-4 border-b">
                                <div className="col-span-4 font-medium text-gray-700">Service Name</div>
                                <div className="col-span-3 font-medium text-gray-700">Image</div>
                                <div className="col-span-2 font-medium text-gray-700">Status</div>
                                <div className="col-span-3 font-medium text-gray-700">Actions</div>
                            </div>
                            {childServices.map((child: Service) => (
                                <div key={child._id} className="grid grid-cols-12 gap-4 items-center py-3 border-b last:border-b-0">
                                    <div className="col-span-4">
                                        <span className="font-medium text-gray-900">{child.name}</span>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="relative w-10 h-10 rounded overflow-hidden">
                                            <Image src={getImageUrl(child.image)} alt={child.name} fill className="object-cover" unoptimized />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Switch checked={child.isActive} onCheckedChange={() => onStatusChange(child._id, child.isActive)} className="data-[state=checked]:bg-[#FF5A36] h-5 w-10 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1 p-0.5" />
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onEdit(child)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => onDelete(child._id, child.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" disabled={isDeleting}>
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-gray-500">No sub-services found for this category.</div>
                    )}
                </div>
            </td>
        </tr>
    );
};

const ServicesPage = () => {
    // State
    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
    const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [editingService, setEditingService] = useState<Service | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        parent: "",
        isActive: true,
        image: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState<string>("");

    // API hooks - Get parent services (no params = get all parent services)
    const { data: parentServicesData, isLoading: isLoadingServices, refetch: refetchServices } = useGetServicesQuery({});

    const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
    const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
    const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

    // Get parent services from data
    const parentServices = parentServicesData?.data?.services || [];

    // Construct full image URL
    const getImageUrl = (imagePath: string) => {
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        }
        const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "http://localhost:5000";
        return `${baseUrl}${imagePath}`;
    };

    // Handle image change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Toggle row expansion - CLICK THE ARROW TO EXPAND!
    const toggleRow = (id: string) => {
        setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]));
    };

    // Open edit modal
    const handleEditClick = (service: Service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            parent: service.parent || "",
            isActive: service.isActive,
            image: null,
        });
        setImagePreview(getImageUrl(service.image));
        setIsEditServiceModalOpen(true);
    };

    // Open add modal
    const handleAddClick = () => {
        setEditingService(null);
        setFormData({
            name: "",
            parent: "",
            isActive: true,
            image: null,
        });
        setImagePreview("");
        setIsAddServiceModalOpen(true);
    };

    // Handle create service
    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error("Service image is required!");
            return;
        }

        try {
            const formDataToSend = new FormData();

            // Add JSON data as a field
            const serviceData = {
                name: formData.name,
                isActive: formData.isActive,
            };

            if (formData.parent) {
                (serviceData as any).parent = formData.parent;
            }

            formDataToSend.append("data", JSON.stringify(serviceData));
            formDataToSend.append("serviceimage", formData.image);

            await createService(formDataToSend).unwrap();

            toast.success("Service created successfully!");
            setIsAddServiceModalOpen(false);

            // Reset form
            setFormData({
                name: "",
                parent: "",
                isActive: true,
                image: null,
            });
            setImagePreview("");

            // Refetch services
            refetchServices();
        } catch (error: any) {
            console.error("Create Error:", error);
            toast.error(error?.data?.message || "Failed to create service!");
        }
    };

    // Handle update service
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingService) return;

        try {
            const formDataToSend = new FormData();

            // Add JSON data as a field
            const serviceData = {
                name: formData.name,
                isActive: formData.isActive,
            };

            if (formData.parent) {
                (serviceData as any).parent = formData.parent;
            }

            formDataToSend.append("data", JSON.stringify(serviceData));

            if (formData.image) {
                formDataToSend.append("serviceimage", formData.image);
            }

            await updateService({
                id: editingService._id,
                formData: formDataToSend,
            }).unwrap();

            toast.success("Service updated successfully!");
            setIsEditServiceModalOpen(false);

            // Reset form
            setFormData({
                name: "",
                parent: "",
                isActive: true,
                image: null,
            });
            setImagePreview("");
            setEditingService(null);

            // Refetch services
            refetchServices();
        } catch (error: any) {
            console.error("Update Error:", error);
            toast.error(error?.data?.message || "Failed to update service!");
        }
    };

    // Handle delete service
    const handleDeleteClick = async (serviceId: string, serviceName: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete "${serviceName}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await deleteService(serviceId).unwrap();
                toast.success("Service deleted successfully!");
                refetchServices();
            } catch (error: any) {
                toast.error(error?.data?.message || "Failed to delete service!");
            }
        }
    };

    // Handle status change
    const handleStatusChange = async (serviceId: string, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;

            const formDataToSend = new FormData();
            formDataToSend.append(
                "data",
                JSON.stringify({
                    isActive: newStatus,
                })
            );

            await updateService({
                id: serviceId,
                formData: formDataToSend,
            }).unwrap();

            toast.success(`Service ${newStatus ? "activated" : "deactivated"} successfully!`);
            refetchServices();
        } catch (error: any) {
            console.error("Status change error:", error);
            toast.error(error?.data?.message || "Failed to update status!");
        }
    };

    // Loading state
    if (isLoadingServices) {
        return (
            <div className="p-6 flex items-center justify-center">
                <div className="text-lg">Loading services...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mother Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {parentServices.map((service: Service) => (
                            <React.Fragment key={service._id}>
                                {/* Parent Service Row - ARROW IS HERE! */}
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {/* ARROW BUTTON - CLICK THIS! */}
                                            <button onClick={() => toggleRow(service._id)} className="p-1 hover:bg-gray-100 rounded">
                                                {expandedRows.includes(service._id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </button>
                                            <span className="font-medium text-gray-900">{service.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative w-12 h-12 rounded overflow-hidden">
                                            <Image src={getImageUrl(service.image)} alt={service.name} fill className="object-cover" unoptimized />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Switch checked={service.isActive} onCheckedChange={() => handleStatusChange(service._id, service.isActive)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1 p-0.5" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDeleteClick(service._id, service.name)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" disabled={isDeleting}>
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <button onClick={() => handleEditClick(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* EXPANDED CHILD SERVICES ROW - THIS SHOWS WHEN YOU CLICK THE ARROW! */}
                                {expandedRows.includes(service._id) && <ChildServicesRow parentId={service._id} parentName={service.name} onEdit={handleEditClick} onDelete={handleDeleteClick} onStatusChange={handleStatusChange} getImageUrl={getImageUrl} isDeleting={isDeleting} />}
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

                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        {/* Service Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Service Name *</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter service name" required />
                        </div>

                        {/* Parent Service (Optional) */}
                        <div className="space-y-2">
                            <Label htmlFor="parent">Parent Service (Optional)</Label>
                            <select id="parent" name="parent" value={formData.parent} onChange={(e) => setFormData((prev) => ({ ...prev, parent: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select parent service (leave empty for main service)</option>
                                {parentServices.map((service: Service) => (
                                    <option key={service._id} value={service._id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Service Image */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Service Image *</Label>
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required />
                            {imagePreview && (
                                <div className="mt-2 relative w-24 h-24 rounded overflow-hidden border">
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between">
                            <Label htmlFor="isActive">Active Status</Label>
                            <Switch id="isActive" name="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))} className="data-[state=checked]:bg-[#FF5A36]" />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsAddServiceModalOpen(false)} disabled={isCreating}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90" disabled={isCreating}>
                                {isCreating ? "Creating..." : "Add Service"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Service Modal */}
            <Dialog open={isEditServiceModalOpen} onOpenChange={setIsEditServiceModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Edit Service</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        {/* Service Name */}
                        <div className="space-y-2">
                            <Label htmlFor="editName">Service Name *</Label>
                            <Input id="editName" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter service name" required />
                        </div>

                        {/* Parent Service (Optional) */}
                        <div className="space-y-2">
                            <Label htmlFor="editParent">Parent Service (Optional)</Label>
                            <select id="editParent" name="parent" value={formData.parent} onChange={(e) => setFormData((prev) => ({ ...prev, parent: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="">Select parent service (leave empty for main service)</option>
                                {parentServices.map((service: Service) => (
                                    <option key={service._id} value={service._id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Service Image */}
                        <div className="space-y-2">
                            <Label htmlFor="editImage">Service Image</Label>
                            <Input id="editImage" type="file" accept="image/*" onChange={handleImageChange} />
                            {imagePreview && (
                                <div className="mt-2 relative w-24 h-24 rounded overflow-hidden border">
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                                </div>
                            )}
                            <p className="text-xs text-gray-500">Leave empty to keep current image</p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between">
                            <Label htmlFor="editIsActive">Active Status</Label>
                            <Switch id="editIsActive" name="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))} className="data-[state=checked]:bg-[#FF5A36]" />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditServiceModalOpen(false)} disabled={isUpdating}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update Service"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Add Service Button */}
            <div className="flex justify-end items-center mt-12 mb-6">
                <Button onClick={handleAddClick} className="bg-[#FF5A36] hover:bg-[#FF5A36]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                </Button>
            </div>
        </div>
    );
};

export default ServicesPage;
