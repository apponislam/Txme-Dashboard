"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        if (user) {
            router.replace("/");
        }
    }, [user, router]);

    if (user) {
        return null;
    }

    return <>{children}</>;
}
