"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLoginMutation } from "@/redux/features/auth/authApi";

import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";

// Validation schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "Oliver@Txme.nl",
            password: "qenbuc-Dyspe9-vumfon",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const res = await login({
                email: data.email,
                password: data.password,
            }).unwrap();

            dispatch(
                setUser({
                    user: res.data.userInfo,
                    accessToken: res.data.createToken,
                })
            );

            toast.success("Login successful!");
            router.push("/");
        } catch (error: any) {
            console.log(error);
            const message = error?.data?.message || error?.data?.errorMessages?.[0]?.message || error?.error || "Login failed. Please try again.";
            toast.error(message);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-20">
                <div className="flex justify-center mb-7">
                    <div className="h-20 w-20">
                        <Image src="/logo.svg" alt="Company Logo" height={80} width={80} className="object-contain" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-[#1E293B]">Sign in</h1>
                <h2 className="mt-1 text-lg text-[#64748B]">Secure access to system administration</h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ADAEBC]" />
                        <input {...register("email")} type="email" className="w-full px-3 py-2 pl-10 border border-[#E2E8F0] rounded-lg" placeholder="Enter your email" />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-2">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ADAEBC]" />
                        <input {...register("password")} type={showPassword ? "text" : "password"} className="w-full px-3 py-2 pl-10 pr-10 border border-[#E2E8F0] rounded-lg" placeholder="Enter your password" />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input {...register("rememberMe")} type="checkbox" className="h-4 w-4" />
                        <label className="ml-2 text-sm text-[#475569]">Remember me</label>
                    </div>

                    <Link href="/auth/forgot-password" className="text-sm font-medium text-[#DC2626]">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 rounded-lg text-white bg-[#FF5A36] disabled:opacity-50">
                    {isLoading ? (
                        <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" />
                    ) : (
                        <>
                            <LogIn className="h-5 w-5" />
                            Sign In to Dashboard
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
