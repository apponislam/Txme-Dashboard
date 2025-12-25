// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Mail, ArrowLeft } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// // Validation schema
// const forgotPasswordSchema = z.object({
//     email: z.string().email("Please enter a valid email address"),
// });

// type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// const ForgotPasswordForm = () => {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm<ForgotPasswordFormValues>({
//         resolver: zodResolver(forgotPasswordSchema),
//     });

//     const onSubmit = async (data: ForgotPasswordFormValues) => {
//         console.log("Forgot password data:", data);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         router.push("/auth/enter-otp");
//     };

//     return (
//         <div className="w-full max-w-md space-y-8">
//             <div className="text-center mb-20">
//                 <div className="flex justify-center mb-7">
//                     <div className="h-20 w-20">
//                         <Image src="/logo.svg" alt="Company Logo" height={80} width={80} className="object-contain" />
//                     </div>
//                 </div>
//                 <h1 className="text-3xl font-bold text-[#1E293B]">Forgot Password</h1>
//                 <h2 className="mt-1 text-lg text-[#64748B]">Secure access to system administration</h2>
//             </div>

//             {/* Forgot Password Form */}
//             <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-semibold text-[#334155] mb-2">
//                         Email
//                     </label>
//                     <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#ADAEBC]" />
//                         <input {...register("email")} type="email" id="email" className="w-full px-3 py-2 pl-10 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-0 focus:border-[#E2E8F0] transition duration-200 placeholder:text-[#ADAEBC] text-[#334155]" placeholder="Enter your email" />
//                     </div>
//                     {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#FF5A36] hover:bg-[#FF5A47] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer">
//                     {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Next"}
//                 </button>

//                 {/* Back to Login */}
//                 <div className="text-center">
//                     <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#334155] transition duration-200">
//                         <ArrowLeft className="h-4 w-4" />
//                         Back to Sign In
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ForgotPasswordForm;

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

// Validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
    const router = useRouter();
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            await forgetPassword({ email: data.email }).unwrap();

            toast.success("OTP sent to your email!");

            router.push(`/auth/enter-otp?email=${encodeURIComponent(data.email)}`);
        } catch (err: any) {
            console.error("Forget password failed:", err);

            toast.error(err?.data?.message || "Failed to send OTP. Try again.");
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
                <h1 className="text-3xl font-bold text-[#1E293B]">Forgot Password</h1>
                <h2 className="mt-1 text-lg text-[#64748B]">Secure access to system administration</h2>
            </div>

            {/* Forgot Password Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#334155] mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#ADAEBC]" />
                        <input {...register("email")} type="email" id="email" className="w-full px-3 py-2 pl-10 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-0 focus:border-[#E2E8F0] transition duration-200 placeholder:text-[#ADAEBC] text-[#334155]" placeholder="Enter your email" />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#FF5A36] hover:bg-[#FF5A47] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer">
                    {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Next"}
                </button>

                {/* Back to Login */}
                <div className="text-center">
                    <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#334155] transition duration-200">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;
