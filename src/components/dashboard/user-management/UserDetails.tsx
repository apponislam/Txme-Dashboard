// "use client";
// import { X, Phone, Mail, MapPin, Calendar, User, Flag, FileText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface UserModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export function UserModal({ isOpen, onClose }: UserModalProps) {
//     if (!isOpen) return null;

//     return (
//         <>
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-black opacity-10 z-50" onClick={onClose} />

//             {/* Modal */}
//             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] z-50">
//                 {/* Single Close Button */}
//                 <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
//                     <X className="h-5 w-5" />
//                 </Button>

//                 <div className="p-6">
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-bold text-[#1E293B]">User Details</h2>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         {/* Left Column - Profile & Stats */}
//                         <div className="lg:col-span-1 space-y-6">
//                             {/* Profile Card */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <div className="text-center">
//                                     <div className="relative h-24 w-24 mx-auto mb-4">
//                                         <Image src="/dashboard/user-management/user1.png" alt="Sraboni Khan" fill className="rounded-full object-cover" />
//                                     </div>
//                                     <h2 className="text-xl font-bold text-[#1E293B]">Sraboni Khan</h2>
//                                     <p className="text-[#64748B] mt-1">Josh Peter</p>
//                                     <p className="text-[#64748B] text-sm mt-2">12/12/2024</p>
//                                 </div>

//                                 {/* Contact Info */}
//                                 <div className="mt-6 space-y-3">
//                                     <div className="flex items-center gap-3 text-[#64748B]">
//                                         <Mail className="h-4 w-4" />
//                                         <span className="text-sm">ibrahim@gmail.com</span>
//                                     </div>
//                                     <div className="flex items-center gap-3 text-[#64748B]">
//                                         <Phone className="h-4 w-4" />
//                                         <span className="text-sm">+31 875026835</span>
//                                     </div>
//                                 </div>

//                                 {/* Provider Badge */}
//                                 <div className="mt-4 flex justify-center">
//                                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FEF9C3] text-[#EAB308]">Provider</span>
//                                 </div>
//                             </div>

//                             {/* Stats Card */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">Performance Stats</h3>
//                                 <div className="space-y-4">
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-[#64748B]">Job</span>
//                                         <span className="font-semibold text-[#1E293B]">98</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-[#64748B]">Orders</span>
//                                         <span className="font-semibold text-[#1E293B]">56</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-[#64748B]">Total Complete job</span>
//                                         <span className="font-semibold text-[#1E293B]">376</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-[#64748B]">Complete this month</span>
//                                         <span className="font-semibold text-[#1E293B]">$785</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-[#64748B]">Total earned</span>
//                                         <span className="font-semibold text-[#1E293B]">$785</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-[#64748B]">Earned this month</span>
//                                         <span className="font-semibold text-[#1E293B]">376</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column - Details & Review */}
//                         <div className="lg:col-span-2 space-y-6">
//                             {/* Personal Information */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">Personal Information</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="flex items-center gap-3">
//                                         <User className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Gender</p>
//                                             <p className="font-medium text-[#1E293B]">Male</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Calendar className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Date of Birth</p>
//                                             <p className="font-medium text-[#1E293B]">02/07/1997</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Flag className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Nationality</p>
//                                             <p className="font-medium text-[#1E293B]">Bangladesh</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Country of Residence</p>
//                                             <p className="font-medium text-[#1E293B]">Bangladeshi</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Postal Address</p>
//                                             <p className="font-medium text-[#1E293B]">1217</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Residential Address</p>
//                                             <p className="font-medium text-[#1E293B]">Dhaka, Bangladesh</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* ID Information */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">ID Information</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="flex items-center gap-3">
//                                         <FileText className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">ID</p>
//                                             <p className="font-medium text-[#1E293B]">123456789</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <FileText className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Id Number</p>
//                                             <p className="font-medium text-[#1E293B]">7675678988556345</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <User className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Marital Status</p>
//                                             <p className="font-medium text-[#1E293B]">Unmarried</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Review */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">Customer Review</h3>
//                                 <div className="bg-[#F9FAFB] rounded-lg p-4">
//                                     <p className="text-[#64748B] italic whitespace-normal wrap-break-word">&ldquo;Emily Jani exceeded my expectations! Quick, reliable, and fixed my plumbing issue with precision. Highly recommend.&rdquo;</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// "use client";
// import { X, Phone, Mail, MapPin, Calendar, User as UserIcon, Flag, FileText, Star, Briefcase, DollarSign } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
// import { format } from "date-fns";

// interface UserModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     userId: string;
// }

// export function UserModal({ isOpen, onClose, userId }: UserModalProps) {
//     const { data, isLoading, isError } = useGetUserByIdQuery(userId, {
//         skip: !isOpen || !userId,
//     });

//     const userData = data?.data;

//     if (!isOpen) return null;

//     const formatDate = (dateString: string) => {
//         try {
//             return format(new Date(dateString), "dd/MM/yyyy");
//         } catch {
//             return "N/A";
//         }
//     };

//     if (isLoading) {
//         return (
//             <>
//                 <div className="fixed inset-0 bg-black/50 z-50 m-0" onClick={onClose} />
//                 <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] z-50">
//                     <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
//                         <X className="h-5 w-5" />
//                     </Button>
//                     <div className="p-6">
//                         <div className="flex items-center justify-center h-96">
//                             <div className="text-gray-500">Loading user details...</div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     if (isError || !userData) {
//         return (
//             <>
//                 <div className="fixed inset-0 bg-black/50 z-50 m-0" onClick={onClose} />
//                 <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] z-50">
//                     <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
//                         <X className="h-5 w-5" />
//                     </Button>
//                     <div className="p-6">
//                         <div className="flex items-center justify-center h-96">
//                             <div className="text-red-500">Error loading user details</div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const isProvider = userData.role === "PROVIDER";
//     const statusColor = userData.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

//     return (
//         <>
//             {/* Overlay */}
//             <div className="fixed inset-0 bg-black/50 z-50 m-0" onClick={onClose} />

//             {/* Modal */}
//             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-6xl max-h-[90vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] z-50">
//                 {/* Single Close Button */}
//                 <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 text-[#64748B] hover:text-[#FF5A36] z-10">
//                     <X className="h-5 w-5" />
//                 </Button>

//                 <div className="p-6">
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-bold text-[#1E293B]">User Details</h2>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
//                         {/* Left Column - Profile & Stats */}
//                         <div className="lg:col-span-1 space-y-6">
//                             {/* Profile Card */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <div className="text-center">
//                                     <div className="relative h-24 w-24 mx-auto mb-4">
//                                         {userData.profilePicture ? (
//                                             <Image
//                                                 src={userData.profilePicture}
//                                                 alt={userData.fullName || "User"}
//                                                 fill
//                                                 className="rounded-full object-cover"
//                                                 onError={(e) => {
//                                                     (e.target as HTMLImageElement).style.display = "none";
//                                                 }}
//                                             />
//                                         ) : null}
//                                         <div className={`w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center ${userData.profilePicture ? "hidden" : ""}`}>
//                                             <span className="text-blue-600 text-2xl font-semibold">{(userData.fullName || userData.email || "U").charAt(0).toUpperCase()}</span>
//                                         </div>
//                                     </div>
//                                     <h2 className="text-xl font-bold text-[#1E293B]">{userData.fullName || "N/A"}</h2>
//                                     <p className="text-[#64748B] mt-1">{userData.email}</p>
//                                     <p className="text-[#64748B] text-sm mt-2">Joined: {formatDate(userData.createdAt)}</p>
//                                     <div className="mt-2">
//                                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>{userData.status || "N/A"}</span>
//                                     </div>
//                                 </div>

//                                 {/* Contact Info */}
//                                 <div className="mt-3 space-y-3">
//                                     <div className="flex items-center gap-3 text-[#64748B]">
//                                         <Mail className="h-4 w-4" />
//                                         <span className="text-sm">{userData.email}</span>
//                                     </div>
//                                     <div className="flex items-center gap-3 text-[#64748B]">
//                                         <Phone className="h-4 w-4" />
//                                         <span className="text-sm">{userData.phone || "N/A"}</span>
//                                     </div>
//                                 </div>

//                                 {/* Role Badge */}
//                                 <div className="mt-4 flex justify-center">
//                                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isProvider ? "bg-[#FEF9C3] text-[#EAB308]" : "bg-blue-100 text-blue-800"}`}>{userData.role}</span>
//                                 </div>

//                                 {/* Verification Status */}
//                                 <div className="mt-4 space-y-2">
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-[#64748B]">Email Verified</span>
//                                         <span className={`text-sm ${userData.isEmailVerified ? "text-green-600" : "text-red-600"}`}>{userData.isEmailVerified ? "Yes" : "No"}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-[#64748B]">Phone Verified</span>
//                                         <span className={`text-sm ${userData.isPhoneVerified ? "text-green-600" : "text-red-600"}`}>{userData.isPhoneVerified ? "Yes" : "No"}</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <span className="text-sm text-[#64748B]">Identity Verified</span>
//                                         <span className={`text-sm ${userData.isIdentityVerified ? "text-green-600" : "text-red-600"}`}>{userData.isIdentityVerified ? "Yes" : "No"}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Stats Card */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">Performance Stats</h3>
//                                 <div className="space-y-4">
//                                     {isProvider ? (
//                                         <>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Total Appointments</span>
//                                                 <span className="font-semibold text-[#1E293B]">{userData.totalAppointments || 0}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">This Month</span>
//                                                 <span className="font-semibold text-[#1E293B]">{userData.totalAppointmentsThisMonth || 0}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Total Earnings</span>
//                                                 <span className="font-semibold text-[#1E293B]">${userData.totalEarning?.toFixed(2) || "0.00"}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">This Month</span>
//                                                 <span className="font-semibold text-[#1E293B]">${userData.totalEarnThisMonth?.toFixed(2) || "0.00"}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Average Rating</span>
//                                                 <span className="font-semibold text-[#1E293B] flex items-center gap-1">
//                                                     {userData.review?.averageRating?.toFixed(1) || "0.0"}
//                                                     <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Total Reviews</span>
//                                                 <span className="font-semibold text-[#1E293B]">{userData.review?.totalReviews || 0}</span>
//                                             </div>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Appointments Booked</span>
//                                                 <span className="font-semibold text-[#1E293B]">{userData.totalAppointmentsBooked || 0}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">This Month</span>
//                                                 <span className="font-semibold text-[#1E293B]">{userData.totalAppointmentsThisMonth || 0}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Total Spend</span>
//                                                 <span className="font-semibold text-[#1E293B]">${userData.totalSpend?.toFixed(2) || "0.00"}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">This Month</span>
//                                                 <span className="font-semibold text-[#1E293B]">${userData.totalSpendThisMonth?.toFixed(2) || "0.00"}</span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Average Rating</span>
//                                                 <span className="font-semibold text-[#1E293B] flex items-center gap-1">
//                                                     {userData.review?.averageRating?.toFixed(1) || "0.0"}
//                                                     <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between items-center">
//                                                 <span className="text-[#64748B]">Total Reviews</span>
//                                                 <span className="font-semibold text-[#1E293B]">{userData.review?.totalReviews || 0}</span>
//                                             </div>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column - Details & Review */}
//                         <div className="lg:col-span-2 space-y-6">
//                             {/* Personal Information */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">Personal Information</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="flex items-center gap-3">
//                                         <UserIcon className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Gender</p>
//                                             <p className="font-medium text-[#1E293B] capitalize">{userData.gender || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Calendar className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Date of Birth</p>
//                                             <p className="font-medium text-[#1E293B]">{formatDate(userData.dateOfBirth) || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Flag className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Nationality</p>
//                                             <p className="font-medium text-[#1E293B]">{userData.nationality || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Country of Residence</p>
//                                             <p className="font-medium text-[#1E293B]">{userData.countryOfResidence || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Postal Address</p>
//                                             <p className="font-medium text-[#1E293B]">{userData.postalAddress || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <MapPin className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Residential Address</p>
//                                             <p className="font-medium text-[#1E293B]">{userData.residentialAddress?.address || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <UserIcon className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">Marital Status</p>
//                                             <p className="font-medium text-[#1E293B] capitalize">{userData.maritalStatus || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     {userData.bio && (
//                                         <div className="col-span-1 md:col-span-2">
//                                             <p className="text-sm text-[#64748B] mb-1">Bio</p>
//                                             <p className="font-medium text-[#1E293B]">{userData.bio}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* ID Information */}
//                             <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                 <h3 className="font-semibold text-[#1E293B] mb-4">ID Information</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="flex items-center gap-3">
//                                         <FileText className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">ID Type</p>
//                                             <p className="font-medium text-[#1E293B] uppercase">{userData.identification?.type || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <FileText className="h-4 w-4 text-[#64748B]" />
//                                         <div>
//                                             <p className="text-sm text-[#64748B]">ID Number</p>
//                                             <p className="font-medium text-[#1E293B]">{userData.identification?.value || "N/A"}</p>
//                                         </div>
//                                     </div>
//                                     {isProvider && userData.providerProfile && (
//                                         <>
//                                             <div className="flex items-center gap-3">
//                                                 <Briefcase className="h-4 w-4 text-[#64748B]" />
//                                                 <div>
//                                                     <p className="text-sm text-[#64748B]">Designation</p>
//                                                     <p className="font-medium text-[#1E293B]">{userData.providerProfile.designation || "N/A"}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center gap-3">
//                                                 <DollarSign className="h-4 w-4 text-[#64748B]" />
//                                                 <div>
//                                                     <p className="text-sm text-[#64748B]">Hourly Rate</p>
//                                                     <p className="font-medium text-[#1E293B]">${userData.providerProfile.hourlyRate || "0"}</p>
//                                                 </div>
//                                             </div>
//                                             {userData.providerProfile.serviceCategory && userData.providerProfile.serviceCategory.length > 0 && (
//                                                 <div className="col-span-1 md:col-span-2">
//                                                     <p className="text-sm text-[#64748B] mb-1">Service Categories</p>
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {userData.providerProfile.serviceCategory.map((category: string, index: number) => (
//                                                             <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs">
//                                                                 {category}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                             {userData.providerProfile.skills && userData.providerProfile.skills.length > 0 && (
//                                                 <div className="col-span-1 md:col-span-2">
//                                                     <p className="text-sm text-[#64748B] mb-1">Skills</p>
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {userData.providerProfile.skills.map((skill: string, index: number) => (
//                                                             <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs">
//                                                                 {skill}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Recent Reviews */}
//                             {userData.last10Reviews && userData.last10Reviews.length > 0 && (
//                                 <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
//                                     <h3 className="font-semibold text-[#1E293B] mb-4">Recent Reviews</h3>
//                                     <div className="space-y-4">
//                                         {userData.last10Reviews.slice(0, 3).map((review: any) => (
//                                             <div key={review._id} className="bg-[#F9FAFB] rounded-lg p-4">
//                                                 <div className="flex items-start justify-between mb-2">
//                                                     <div className="flex items-center gap-2">
//                                                         {review.reviewer?.profilePicture ? (
//                                                             <Image src={review.reviewer.profilePicture} alt={review.reviewer.fullName} width={32} height={32} className="rounded-full" />
//                                                         ) : (
//                                                             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                                                                 <span className="text-blue-600 text-xs font-semibold">{(review.reviewer?.fullName || "U").charAt(0).toUpperCase()}</span>
//                                                             </div>
//                                                         )}
//                                                         <div>
//                                                             <p className="font-medium text-[#1E293B] text-sm">{review.reviewer?.fullName || "Anonymous"}</p>
//                                                             <p className="text-xs text-[#64748B]">{review.service}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex items-center gap-1">
//                                                         {[...Array(5)].map((_, i) => (
//                                                             <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                                 <p className="text-[#64748B] italic text-sm">{review.comment || "No comment provided"}</p>
//                                                 <p className="text-xs text-[#64748B] mt-2">{formatDate(review.createdAt)}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

"use client";
import { X, Phone, Mail, MapPin, Calendar, User as UserIcon, Flag, FileText, Star, Briefcase, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGetUserByIdQuery } from "@/redux/features/user/userApi";
import { format } from "date-fns";

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

export function UserModal({ isOpen, onClose, userId }: UserModalProps) {
    const { data, isLoading, isError } = useGetUserByIdQuery(userId, {
        skip: !isOpen || !userId,
    });

    const userData = data?.data;

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
