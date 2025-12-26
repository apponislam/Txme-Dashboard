// "use client";
// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const ChangePasswordButtonWithModal = () => {
//     const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//     });
//     const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const handleInputChange = (field: string, value: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Handle password change logic here
//         console.log("Password change submitted:", formData);
//         setIsChangePasswordModalOpen(false);
//     };

//     return (
//         <>
//             <button onClick={() => setIsChangePasswordModalOpen(true)} className="bg-transparent text-[#FF5A36] py-3 px-6 border border-[#FF5A36] rounded-xl cursor-pointer">
//                 Change password
//             </button>

//             <Dialog open={isChangePasswordModalOpen} onOpenChange={setIsChangePasswordModalOpen}>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl font-semibold">Change Password</DialogTitle>
//                     </DialogHeader>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         {/* Current Password */}
//                         <div className="space-y-2">
//                             <Label htmlFor="currentPassword">Current Password</Label>
//                             <div className="relative">
//                                 <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} value={formData.currentPassword} onChange={(e) => handleInputChange("currentPassword", e.target.value)} placeholder="Enter current password" className="pr-10" />
//                                 <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
//                                     {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* New Password */}
//                         <div className="space-y-2">
//                             <Label htmlFor="newPassword">New Password</Label>
//                             <div className="relative">
//                                 <Input id="newPassword" type={showNewPassword ? "text" : "password"} value={formData.newPassword} onChange={(e) => handleInputChange("newPassword", e.target.value)} placeholder="Enter new password" className="pr-10" />
//                                 <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowNewPassword(!showNewPassword)}>
//                                     {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* Confirm Password */}
//                         <div className="space-y-2">
//                             <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                             <div className="relative">
//                                 <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} placeholder="Confirm new password" className="pr-10" />
//                                 <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                     {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex gap-3 pt-4">
//                             <Button type="button" variant="outline" className="flex-1" onClick={() => setIsChangePasswordModalOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90">
//                                 Change Password
//                             </Button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };

// export default ChangePasswordButtonWithModal;

"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

const ChangePasswordButtonWithModal = () => {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            }).unwrap();
            toast.success("Password changed successfully!");
            setIsChangePasswordModalOpen(false);
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to change password");
        }
    };

    return (
        <>
            <button onClick={() => setIsChangePasswordModalOpen(true)} className="bg-transparent text-[#FF5A36] py-3 px-6 border border-[#FF5A36] rounded-xl cursor-pointer">
                Change password
            </button>

            <Dialog open={isChangePasswordModalOpen} onOpenChange={setIsChangePasswordModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Change Password</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                                <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} value={formData.currentPassword} onChange={(e) => handleInputChange("currentPassword", e.target.value)} placeholder="Enter current password" className="pr-10" />
                                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                                <Input id="newPassword" type={showNewPassword ? "text" : "password"} value={formData.newPassword} onChange={(e) => handleInputChange("newPassword", e.target.value)} placeholder="Enter new password" className="pr-10" />
                                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} placeholder="Confirm new password" className="pr-10" />
                                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsChangePasswordModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1 bg-[#FF5A36] hover:bg-[#FF5A36]/90" disabled={isLoading}>
                                Change Password
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ChangePasswordButtonWithModal;
