"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, KeyRound, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Validation schema
const newPasswordSchema = z
    .object({
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const NewPasswordForm = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewPasswordFormValues>({
        resolver: zodResolver(newPasswordSchema),
    });

    const onSubmit = async (data: NewPasswordFormValues) => {
        console.log("New password data:", data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Handle password reset logic here
        // After successful password reset, redirect to login
        router.push("/auth/login");
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-20">
                <div className="flex justify-center mb-7">
                    <div className="h-20 w-20">
                        <Image src="/logo.svg" alt="Company Logo" height={80} width={80} className="object-contain" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-[#1E293B]">New Password</h1>
                <h2 className="mt-1 text-lg text-[#64748B]">Please set your strong new password</h2>
            </div>

            {/* New Password Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* New Password Field */}
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-[#334155] mb-2">
                        New password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#ADAEBC]" />
                        <input {...register("newPassword")} type={showNewPassword ? "text" : "password"} id="newPassword" className="w-full px-3 py-2 pl-10 pr-10 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-0 focus:border-[#E2E8F0] transition duration-200 placeholder:text-[#ADAEBC] text-[#334155]" placeholder="Enter new password" />
                        <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ADAEBC] hover:text-[#334155] transition duration-200" onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>}
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#334155] mb-2">
                        Confirm new password
                    </label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#ADAEBC]" />
                        <input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} id="confirmPassword" className="w-full px-3 py-2 pl-10 pr-10 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-0 focus:border-[#E2E8F0] transition duration-200 placeholder:text-[#ADAEBC] text-[#334155]" placeholder="Re-enter new password" />
                        <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ADAEBC] hover:text-[#334155] transition duration-200" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                {/* Set Button */}
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#FF5A36] hover:bg-[#FF5A47] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer">
                    {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Set New Password"}
                </button>

                {/* Back to Login */}
                <div className="text-center pt-4">
                    <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#334155] transition duration-200">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default NewPasswordForm;
