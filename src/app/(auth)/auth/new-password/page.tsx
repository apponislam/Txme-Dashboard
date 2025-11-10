import NewPasswordForm from "@/components/forms/auth/NewPassword_Form";
import Image from "next/image";

const NewPasswordPage = () => {
    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:flex-1 bg-gray-50 relative">
                <Image src="/authbanner.svg" alt="New Password Illustration" fill className="object-cover" priority />
            </div>
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <NewPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default NewPasswordPage;
