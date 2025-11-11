"use client";
import { X, Phone, Mail, MapPin, Calendar, User, Flag, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserModal({ isOpen, onClose }: UserModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-10 z-50" onClick={onClose} />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] z-50">
                {/* Single Close Button */}
                <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
                    <X className="h-5 w-5" />
                </Button>

                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[#1E293B]">User Details</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile & Stats */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Profile Card */}
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                                <div className="text-center">
                                    <div className="relative h-24 w-24 mx-auto mb-4">
                                        <Image src="/dashboard/user-management/user1.png" alt="Sraboni Khan" fill className="rounded-full object-cover" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1E293B]">Sraboni Khan</h2>
                                    <p className="text-[#64748B] mt-1">Josh Peter</p>
                                    <p className="text-[#64748B] text-sm mt-2">12/12/2024</p>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-[#64748B]">
                                        <Mail className="h-4 w-4" />
                                        <span className="text-sm">ibrahim@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[#64748B]">
                                        <Phone className="h-4 w-4" />
                                        <span className="text-sm">+31 875026835</span>
                                    </div>
                                </div>

                                {/* Provider Badge */}
                                <div className="mt-4 flex justify-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FEF9C3] text-[#EAB308]">Provider</span>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                                <h3 className="font-semibold text-[#1E293B] mb-4">Performance Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#64748B]">Job</span>
                                        <span className="font-semibold text-[#1E293B]">98</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#64748B]">Orders</span>
                                        <span className="font-semibold text-[#1E293B]">56</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#64748B]">Total Complete job</span>
                                        <span className="font-semibold text-[#1E293B]">376</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#64748B]">Complete this month</span>
                                        <span className="font-semibold text-[#1E293B]">$785</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#64748B]">Total earned</span>
                                        <span className="font-semibold text-[#1E293B]">$785</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#64748B]">Earned this month</span>
                                        <span className="font-semibold text-[#1E293B]">376</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Details & Review */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                                <h3 className="font-semibold text-[#1E293B] mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Gender</p>
                                            <p className="font-medium text-[#1E293B]">Male</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Date of Birth</p>
                                            <p className="font-medium text-[#1E293B]">02/07/1997</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Flag className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Nationality</p>
                                            <p className="font-medium text-[#1E293B]">Bangladesh</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Country of Residence</p>
                                            <p className="font-medium text-[#1E293B]">Bangladeshi</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Postal Address</p>
                                            <p className="font-medium text-[#1E293B]">1217</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Residential Address</p>
                                            <p className="font-medium text-[#1E293B]">Dhaka, Bangladesh</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ID Information */}
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                                <h3 className="font-semibold text-[#1E293B] mb-4">ID Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">ID</p>
                                            <p className="font-medium text-[#1E293B]">123456789</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Id Number</p>
                                            <p className="font-medium text-[#1E293B]">7675678988556345</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <User className="h-4 w-4 text-[#64748B]" />
                                        <div>
                                            <p className="text-sm text-[#64748B]">Marital Status</p>
                                            <p className="font-medium text-[#1E293B]">Unmarried</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Review */}
                            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                                <h3 className="font-semibold text-[#1E293B] mb-4">Customer Review</h3>
                                <div className="bg-[#F9FAFB] rounded-lg p-4">
                                    <p className="text-[#64748B] italic whitespace-normal wrap-break-word">&ldquo;Emily Jani exceeded my expectations! Quick, reliable, and fixed my plumbing issue with precision. Highly recommend.&rdquo;</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
