"use client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface LogDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LogDetailModal = ({ isOpen, onClose }: LogDetailModalProps) => {
    const handleDownload = () => {
        console.log("Downloading log...");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Log Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Main Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Log ID</label>
                                <p className="text-sm font-mono text-gray-900 mt-1">#LOG-2024-08-26-001</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">User Name</label>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Image src="/dashboard/user-management/user1.png" alt="John Doe" width={32} height={32} className="rounded-full" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Role</label>
                                <p className="text-sm text-gray-900 mt-1">Administrator</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Module</label>
                                <p className="text-sm text-gray-900 mt-1">Authentication</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Email</label>
                                <p className="text-sm text-gray-900 mt-1">john.doe@company.com</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Timestamp</label>
                                <p className="text-sm font-mono text-gray-900 mt-1">2024-08-26 12:29:19.194</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Status</label>
                                <div className="mt-1">
                                    <Badge variant="default">Success</Badge>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">IP Address</label>
                                <p className="text-sm font-mono text-gray-900 mt-1">192.168.1.105</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-500">Description</label>
                        <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-200">User successfully authenticated and accessed the dashboard module. Session token generated and stored. All security checks passed including two-factor authentication verification.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200 justify-end">
                        <Button onClick={handleDownload} className=" bg-[#FF5A36] text-white hover:bg-[#FF5A36]/90">
                            <Download className="h-4 w-4 mr-2" />
                            Download Log
                        </Button>
                        <Button variant="outline" onClick={onClose} className=" border-gray-300 text-gray-700 hover:bg-gray-50">
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LogDetailModal;
