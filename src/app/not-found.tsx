"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="absolute top-0 left-0 right-0 border-b border-[#E2E8F0] p-5">
                <div className="flex items-center gap-3">
                    <Image src="/logo.svg" alt="Logo" height={40} width={40} />
                    <p className="font-semibold text-[#1E293B] text-lg">Txme</p>
                </div>
            </div>

            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-[#1E293B]">404</h1>
                    <div className="w-24 h-2 bg-linear-to-r from-[#FF5A36] to-[#A0BCE8] mx-auto mt-4 rounded-full"></div>
                </div>

                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Page Not Found</h2>
                <p className="text-[#64748B] mb-8 leading-relaxed">Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you entered the wrong URL.</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="flex items-center justify-center gap-2 bg-[#FF5A36] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E53E3E] transition-colors duration-200">
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>
                    <button onClick={() => window.history.back()} className="flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#334155] px-6 py-3 rounded-lg font-medium hover:bg-[#F9FAFB] transition-colors duration-200">
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-[#FF5A36]" : "bg-[#A0BCE8]"} opacity-60`}></div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#E2E8F0] p-4">
                <p className="text-center text-[#64748B] text-sm">© {currentYear} Txme. All rights reserved.</p>
            </div>
        </div>
    );
}
