import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: { email: string; password: string }) => ({
                url: "/admin/login",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),

        signup: builder.mutation({
            query: (body: { email: string; password: string; firstName: string; lastName: string; role: string }) => ({
                url: "/admin/signup",
                method: "POST",
                body,
            }),
        }),

        forgetPassword: builder.mutation({
            query: (body: { email: string }) => ({
                url: "/admin/forget-password",
                method: "POST",
                body,
            }),
        }),

        verifyOtp: builder.mutation({
            query: (body: { email: string; oneTimeCode: number }) => ({
                url: "/admin/verify-otp",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ body, token }: { body: { newPassword: string; confirmPassword: string }; token: string }) => ({
                url: "/admin/reset-password",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        changePassword: builder.mutation({
            query: ({
                body,
                token,
            }: {
                body: {
                    currentPassword: string;
                    newPassword: string;
                    confirmPassword: string;
                };
                token: string;
            }) => ({
                url: "/admin/change-password",
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }),
        }),

        getProfile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET",
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useForgetPasswordMutation, useVerifyOtpMutation, useResetPasswordMutation, useChangePasswordMutation, useGetProfileQuery } = authApi;
