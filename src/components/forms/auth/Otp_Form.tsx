"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be 6 digits")
        .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

type OtpFormInputs = z.infer<typeof otpSchema>;

interface OtpFormProps {
    email?: string;
}

const OtpForm = ({ email }: OtpFormProps) => {
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const email = searchParams.get("email");

    const {
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<OtpFormInputs>();

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        clearErrors("otp");
        if (value && index < 5) inputsRef.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        const validation = otpSchema.safeParse({ otp: enteredOtp });

        if (!validation.success) {
            setError("otp", { type: "manual", message: validation.error.issues[0].message });
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("OTP submitted:", enteredOtp);
        setIsSubmitting(false);

        router.push("/auth/new-password");
    };

    const handleResend = async () => {
        setIsResending(true);
        // Simulate resend OTP API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Resend OTP to:", email);
        setIsResending(false);

        // Reset OTP fields
        setOtp(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const pastedOtp = pastedData.replace(/\D/g, "").slice(0, 6);

        if (pastedOtp.length === 6) {
            const newOtp = pastedOtp.split("");
            setOtp(newOtp);
            clearErrors("otp");

            setTimeout(() => {
                inputsRef.current[5]?.focus();
            }, 0);
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
                <h1 className="text-3xl font-bold text-[#1E293B]">OTP Verify</h1>
                <h2 className="mt-1 text-lg text-[#64748B]">
                    Please check your email, <br /> We sent there 6 digit code
                </h2>
            </div>

            {/* OTP Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {/* OTP Input Fields */}
                <div>
                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                ref={(el) => {
                                    inputsRef.current[index] = el;
                                }}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className="w-14 h-14 text-center border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-0 focus:border-[#FF5A36] transition duration-200 text-[#334155] text-xl font-semibold bg-white"
                            />
                        ))}
                    </div>
                    {errors.otp && <p className="mt-2 text-sm text-red-600 text-center">{errors.otp.message}</p>}
                </div>

                {/* Verify Button */}
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#FF5A36] hover:bg-[#FF5A47] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 cursor-pointer">
                    {isSubmitting ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Verify Email"}
                </button>

                {/* Resend Code */}
                <div className="text-center">
                    <p className="text-sm text-[#64748B]">
                        Don&apos;t receive any code?{" "}
                        <button type="button" onClick={handleResend} disabled={isResending} className="font-medium text-[#FF5A36] hover:text-[#FF5A47] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200">
                            {isResending ? "Sending..." : "Resend"}
                        </button>
                    </p>
                </div>

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

export default OtpForm;
