"use client";
import { X, Phone, Mail, MapPin, Calendar, User as UserIcon, Flag, FileText, Star, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import { format } from "date-fns";
import { useCreateAdminSupportChatMutation } from "@/redux/features/adminchats/adminChatsApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

export function UserModal({ isOpen, onClose, userId }: UserModalProps) {
    const { data, isLoading, isError } = useGetUserByIdQuery(userId, {
        skip: !isOpen || !userId,
    });

    const [createAdminSupportChat, { isLoading: chatLoading }] = useCreateAdminSupportChatMutation();
    const navigate = useRouter();

    const userData = data?.data;
    console.log(userData);

    const handleStartConversation = async () => {
        try {
            const result = await createAdminSupportChat({
                participant: userId,
                message: userId ? `Support conversation started with ${userId}` : "Support conversation started",
            }).unwrap();

            if (result.success) {
                toast.success("Conversation started successfully");

                // Redirect to messenger with the chat ID
                const chatId = result.data?._id;
                if (chatId) {
                    navigate.push(`/messenger?chat=${chatId}`);
                } else {
                    navigate.push("/messenger");
                }
            } else {
                toast.error(result.message || "Failed to create conversation");
            }
        } catch (err: any) {
            console.error("Failed to create chat:", err);
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd/MM/yyyy");
        } catch {
            return "N/A";
        }
    };

    if (isLoading) {
        return (
            <>
                <div className="fixed inset-0 bg-black/50 z-50 m-0" onClick={onClose} />
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl z-50">
                    <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
                        <X className="h-5 w-5" />
                    </Button>
                    <div className="p-6">
                        <div className="flex items-center justify-center h-48">
                            <div className="text-gray-500">Loading...</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (isError || !userData) {
        return (
            <>
                <div className="fixed inset-0 bg-black/50 z-50 m-0" onClick={onClose} />
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl z-50">
                    <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
                        <X className="h-5 w-5" />
                    </Button>
                    <div className="p-6">
                        <div className="flex items-center justify-center h-48">
                            <div className="text-red-500">Error loading user</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const isProvider = userData.role === "PROVIDER";
    const statusColor = userData.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-50 m-0" onClick={onClose} />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-xl z-50">
                {/* Single Close Button */}
                <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
                    <X className="h-5 w-5" />
                </Button>

                <div className="p-4">
                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-gray-900">User Details</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Left Column - Profile & Stats */}
                        <div className="lg:col-span-1 space-y-4">
                            {/* Profile Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="text-center">
                                    <div className="relative h-20 w-20 mx-auto mb-3">
                                        {userData.profilePicture ? (
                                            <Image
                                                src={userData.profilePicture}
                                                alt={userData.fullName || "User"}
                                                fill
                                                className="rounded-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = "none";
                                                }}
                                            />
                                        ) : null}
                                        <div className={`w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center ${userData.profilePicture ? "hidden" : ""}`}>
                                            <span className="text-blue-600 text-xl font-semibold">{(userData.fullName || userData.email || "U").charAt(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{userData.fullName || "N/A"}</h2>
                                    <p className="text-gray-500 text-sm mt-1 truncate">{userData.email}</p>
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>{userData.status || "N/A"}</span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isProvider ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>{userData.role}</span>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        <span className="text-sm truncate">{userData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="h-4 w-4" />
                                        <span className="text-sm">{userData.phone || "N/A"}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${userData.isEmailVerified ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                        <div className={`w-2 h-2 rounded-full ${userData.isEmailVerified ? "bg-green-500" : "bg-red-500"}`} />
                                        Email
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${userData.isPhoneVerified ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                        <div className={`w-2 h-2 rounded-full ${userData.isPhoneVerified ? "bg-green-500" : "bg-red-500"}`} />
                                        Phone
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${userData.isIdentityVerified ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                        <div className={`w-2 h-2 rounded-full ${userData.isIdentityVerified ? "bg-green-500" : "bg-red-500"}`} />
                                        ID
                                    </div>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">Stats</h3>
                                <div className="space-y-2">
                                    {isProvider ? (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Appointments</span>
                                                <span className="text-sm font-semibold">{userData.totalAppointments || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">This Month</span>
                                                <span className="text-sm font-semibold">{userData.totalAppointmentsThisMonth || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Earnings</span>
                                                <span className="text-sm font-semibold">${userData.totalEarning?.toFixed(2) || "0.00"}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Rating</span>
                                                <span className="text-sm font-semibold flex items-center gap-1">
                                                    {userData.review?.averageRating?.toFixed(1) || "0.0"}
                                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Booked</span>
                                                <span className="text-sm font-semibold">{userData.totalAppointmentsBooked || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">This Month</span>
                                                <span className="text-sm font-semibold">{userData.totalAppointmentsThisMonth || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Spent</span>
                                                <span className="text-sm font-semibold">${userData.totalSpend?.toFixed(2) || "0.00"}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">Rating</span>
                                                <span className="text-sm font-semibold flex items-center gap-1">
                                                    {userData.review?.averageRating?.toFixed(1) || "0.0"}
                                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Button className="bg-[#FF5A36] hover:bg-[#e04e30] text-white border-none" onClick={handleStartConversation} disabled={chatLoading}>
                                    {chatLoading ? "Creating..." : "Start Conversation"}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Personal Information */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">Personal Info</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Gender</p>
                                            <p className="text-sm font-medium capitalize">{userData.gender || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Birth Date</p>
                                            <p className="text-sm font-medium">{formatDate(userData.dateOfBirth) || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Flag className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Nationality</p>
                                            <p className="text-sm font-medium">{userData.nationality || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Country</p>
                                            <p className="text-sm font-medium">{userData.countryOfResidence || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Postal</p>
                                            <p className="text-sm font-medium">{userData.postalAddress || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">Marital</p>
                                            <p className="text-sm font-medium capitalize">{userData.maritalStatus || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                                {userData.residentialAddress?.address && (
                                    <div className="mt-3">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500">Address</p>
                                                <p className="text-sm font-medium">{userData.residentialAddress.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ID & Provider Info */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">ID & Professional Info</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">ID Type</p>
                                            <p className="text-sm font-medium uppercase">{userData.identification?.type || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500">ID Number</p>
                                            <p className="text-sm font-medium truncate">{userData.identification?.value || "N/A"}</p>
                                        </div>
                                    </div>
                                    {isProvider && userData.providerProfile && (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Designation</p>
                                                    <p className="text-sm font-medium">{userData.providerProfile.designation || "N/A"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Hourly Rate</p>
                                                    <p className="text-sm font-medium">${userData.providerProfile.hourlyRate || "0"}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {isProvider && userData.providerProfile?.serviceCategory && userData.providerProfile.serviceCategory.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-xs text-gray-500 mb-1">Services</p>
                                        <div className="flex flex-wrap gap-1">
                                            {userData.providerProfile.serviceCategory.slice(0, 4).map((category: string, index: number) => (
                                                <span key={index} className="inline-flex items-center px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs">
                                                    {category}
                                                </span>
                                            ))}
                                            {userData.providerProfile.serviceCategory.length > 4 && <span className="text-xs text-gray-500">+{userData.providerProfile.serviceCategory.length - 4} more</span>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Recent Reviews - Scrollable Section */}
                            {userData.last10Reviews && userData.last10Reviews.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
                                        <span className="text-xs text-gray-500">{userData.review?.totalReviews || 0} total</span>
                                    </div>
                                    <div className="h-28 overflow-y-auto pr-2">
                                        <div className="space-y-2">
                                            {userData.last10Reviews.slice(0, 5).map((review: any) => (
                                                <div key={review._id} className="bg-gray-50 rounded p-2">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <div className="flex items-center gap-1">
                                                            {review.reviewer?.profilePicture ? (
                                                                <Image src={review.reviewer.profilePicture} alt={review.reviewer.fullName} width={20} height={20} className="rounded-full object-cover w-5 h-5" />
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                                    <span className="text-blue-600 text-xs">{(review.reviewer?.fullName || "U").charAt(0).toUpperCase()}</span>
                                                                </div>
                                                            )}
                                                            <span className="text-xs font-medium truncate">{review.reviewer?.fullName || "Anonymous"}</span>
                                                        </div>
                                                        <div className="flex items-center gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600 italic truncate">{review.comment || "No comment"}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{formatDate(review.createdAt)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
