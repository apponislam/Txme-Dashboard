"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Lock, User, CreditCard, MessageCircle, Wallet, Plus, Minus, ArrowUpDown, Send } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import ChangePasswordButtonWithModal from "@/components/dashboard/settings/ChangePasswordModal";
// import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/api/settingApi";
import { toast } from "sonner";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/features/settings/settingsApi";

interface SettingItem {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    settingKey: string;
    adminControlled: boolean;
    subSections?: SettingItem[];
}

const SettingsPage = () => {
    const { data: settingsData, isLoading } = useGetSettingsQuery(undefined);
    const [updateSettings] = useUpdateSettingsMutation();
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [settings, setSettings] = useState<any>({});

    useEffect(() => {
        if (settingsData) {
            const flatSettings: any = {
                profilePromotion: settingsData.profilePromotion.enabled,
                cardPayment: settingsData.cardPayment.enabled,
                sendInMessage: settingsData.sendInMessage.enabled,
                digitalPayments: settingsData.digitalPayments.enabled,
                paymentByCard: settingsData.digitalPayments.paymentByCard.enabled,
                paymentByPaypal: settingsData.digitalPayments.paymentByPaypal.enabled,
                paymentWithWallet: settingsData.digitalPayments.paymentByWallet.enabled,
                walletTopUp: settingsData.digitalPayments.paymentByWallet.walletFeatures.topUp.enabled,
                walletWithdrawal: settingsData.digitalPayments.paymentByWallet.walletFeatures.withdraw.enabled,
                walletMoneyRequest: settingsData.digitalPayments.paymentByWallet.walletFeatures.moneyRequest.enabled,
                walletMoneySend: settingsData.digitalPayments.paymentByWallet.walletFeatures.moneySend.enabled,
            };
            setTimeout(() => setSettings(flatSettings), 0);
        }
    }, [settingsData]);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]));
    };

    const handleSettingChange = async (key: string, value: boolean) => {
        if (!settingsData) return;

        setSettings((prev: any) => ({ ...prev, [key]: value }));

        const body: any = JSON.parse(JSON.stringify(settingsData));

        switch (key) {
            case "profilePromotion":
                body.profilePromotion.enabled = value;
                break;

            case "cardPayment":
                body.cardPayment.enabled = value;
                break;

            case "sendInMessage":
                body.sendInMessage.enabled = value;
                break;

            case "paymentByCard":
                body.digitalPayments.paymentByCard.enabled = value;
                break;

            case "paymentByPaypal":
                body.digitalPayments.paymentByPaypal.enabled = value;
                break;

            case "paymentWithWallet":
                body.digitalPayments.paymentByWallet.enabled = value;
                break;

            case "walletTopUp":
                body.digitalPayments.paymentByWallet.walletFeatures.topUp.enabled = value;
                break;

            case "walletWithdrawal":
                body.digitalPayments.paymentByWallet.walletFeatures.withdraw.enabled = value;
                break;

            case "walletMoneyRequest":
                body.digitalPayments.paymentByWallet.walletFeatures.moneyRequest.enabled = value;
                break;

            case "walletMoneySend":
                body.digitalPayments.paymentByWallet.walletFeatures.moneySend.enabled = value;
                break;
        }

        try {
            await updateSettings(body).unwrap();
            toast.success("Setting updated successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update setting");
        }
    };

    const mainSections: SettingItem[] = [
        {
            id: "profile",
            icon: User,
            title: "Profile Promotion",
            description: "Allow your profile to be promoted to other users and in discovery features",
            settingKey: "profilePromotion",
            adminControlled: true,
        },
        {
            id: "card-payment",
            icon: CreditCard,
            title: "Online payment",
            description: "Enable card payment for completed services",
            settingKey: "cardPayment",
            adminControlled: true,
        },
        // {
        //     id: "message-payments",
        //     icon: MessageCircle,
        //     title: "Send in message",
        //     description: "Allow sending and receiving money directly through message",
        //     settingKey: "sendInMessage",
        //     adminControlled: true,
        // },
        {
            id: "payment-methods",
            icon: Wallet,
            title: "Digital Payments for Completed Services",
            description: "Enable digital payment processing for all completed service transactions",
            settingKey: "digitalPayments",
            adminControlled: true,
            subSections: [
                {
                    id: "card",
                    icon: CreditCard,
                    title: "Payment by Card",
                    description: "Accept credit and debit card payments through secure gateway",
                    settingKey: "paymentByCard",
                    adminControlled: true,
                },
                // {
                //     id: "paypal",
                //     icon: CreditCard,
                //     title: "Payment by PayPal",
                //     description: "Process payments through PayPal integration",
                //     settingKey: "paymentByPaypal",
                //     adminControlled: true,
                // },
                {
                    id: "wallet-payments",
                    icon: Wallet,
                    title: "Payment with Wallet",
                    description: "Allow payments from user wallet balance and digital wallets",
                    settingKey: "paymentWithWallet",
                    adminControlled: true,
                    subSections: [
                        {
                            id: "top-up",
                            icon: Plus,
                            title: "Enable Wallet Top-Up",
                            description: "Enable Wallet Top-Up",
                            settingKey: "walletTopUp",
                            adminControlled: true,
                        },
                        {
                            id: "withdrawal",
                            icon: Minus,
                            title: "Enable Wallet Withdrawal",
                            description: "Enable Wallet Withdrawal",
                            settingKey: "walletWithdrawal",
                            adminControlled: true,
                        },
                        {
                            id: "money-request",
                            icon: ArrowUpDown,
                            title: "Enable Wallet Money Request",
                            description: "Enable Wallet Money Request",
                            settingKey: "walletMoneyRequest",
                            adminControlled: true,
                        },
                        {
                            id: "money-send",
                            icon: Send,
                            title: "Enable Wallet Money Send",
                            description: "Enable Wallet Money Send",
                            settingKey: "walletMoneySend",
                            adminControlled: true,
                        },
                    ],
                },
            ],
        },
    ];

    const renderSection = (section: SettingItem, level = 0) => {
        const isExpanded = expandedSections.includes(section.id);
        const hasSubSections = section.subSections && section.subSections.length > 0;
        const IconComponent = section.icon;

        let containerClass = "flex items-center justify-between p-6 bg-white rounded-lg  shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] ";
        if (level === 0) containerClass += "w-full";
        else if (level === 1) containerClass += "mx-auto w-11/12";
        else containerClass += "mx-auto w-10/12";

        return (
            <div key={section.id} className="mb-6 last:mb-0 ">
                <div className={containerClass}>
                    <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${level === 0 ? "bg-blue-100 text-blue-600" : level === 1 ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}>
                            <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                                {section.adminControlled && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#FFEFEB] text-[#FF5A36]">
                                        <Lock className="h-3 w-3 mr-1" />
                                        Admin Controlled
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {hasSubSections && (
                            <button onClick={() => toggleSection(section.id)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                            </button>
                        )}
                        <div className="flex items-center gap-2 p-1">
                            <Switch checked={settings[section.settingKey]} onCheckedChange={(checked) => handleSettingChange(section.settingKey, checked)} className="data-[state=checked]:bg-[#FF5A36] h-6 w-11 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-5 [&_span]:data-[state=unchecked]:translate-x-1" />
                        </div>
                    </div>
                </div>
                {hasSubSections && isExpanded && section.subSections && <div className="mt-6">{section.subSections.map((subSection) => renderSection(subSection, level + 1))}</div>}
            </div>
        );
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <div className="mb-6">
                <div className="flex items-center justify-between gap-6">
                    <div className="bg-[#FFEFEB] p-4 text-[#FF5A36] flex-1 rounded-xl flex items-center gap-3">
                        <Image src="/dashboard/settings/infoicon.svg" alt="Info Icon" height={16} width={16} className="h-4 w-4" />
                        <div>
                            <h2 className="font-medium">Admin Controlled Settings</h2>
                            <p className="text-[14px]">The following preferences are managed by your administrator and may be restricted.</p>
                        </div>
                    </div>
                    <ChangePasswordButtonWithModal />
                </div>
            </div>

            <div>{mainSections.map((section) => renderSection(section))}</div>
        </div>
    );
};

export default SettingsPage;
