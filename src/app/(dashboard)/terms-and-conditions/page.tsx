"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Save, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateOrUpdateTermsAndConditionsMutation, useGetTermsAndConditionsQuery } from "@/redux/features/termsandcondition/termsAndConditionsApi";
import { toast } from "sonner";

// Dynamically import Jodit Editor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
    loading: () => <div className="p-4">Loading editor...</div>,
});

const defaultTerms = `<h1><strong>TERMS AND CONDITIONS</strong></h1>`;

const TermsAndConditionsEditor = () => {
    const [content, setContent] = useState(defaultTerms);
    const [isSaving, setIsSaving] = useState(false);
    const editor = useRef(null);

    // RTK Query hooks
    const { data: termsData, isLoading: isLoadingTerms, isError: isErrorTerms } = useGetTermsAndConditionsQuery(undefined);

    const [createOrUpdateTerms, { isLoading: isUpdating }] = useCreateOrUpdateTermsAndConditionsMutation();

    const config = {
        readonly: false,
        toolbar: true,
        spellcheck: true,
        language: "en",
        toolbarButtonSize: "middle" as const,
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_clear_html" as const,
        buttons: ["source", "|", "bold", "italic", "underline", "|", "ul", "ol", "|", "font", "fontsize", "brush", "|", "align", "|", "undo", "redo", "|", "find", "preview", "print"],
        uploader: {
            insertImageAsBase64URI: true,
        },
        disablePlugins: ["about", "video", "file", "image", "media", "symbols", "hr", "fullsize", "table", "link"],
    };

    useEffect(() => {
        if (termsData?.data?.content) {
            setContent(termsData.data.content);
        }
    }, [termsData]);

    const handleChange = useCallback((newContent: string) => {
        setContent(newContent);
    }, []);

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const response = await createOrUpdateTerms({
                content: content,
                type: "terms",
            }).unwrap();

            console.log(response);

            toast.success("Terms and conditions saved successfully!");
        } catch (error) {
            console.error("Failed to save terms:", error);
            toast.error("Failed to save terms and conditions. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    // Handle loading state
    if (isLoadingTerms) {
        return (
            <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-[#64748B]">Loading terms and conditions...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (isErrorTerms) {
        return (
            <div className="container mx-auto p-6">
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                        <p className="text-red-600">Failed to load terms and conditions. Please try again later.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">Terms and Conditions Editor</h1>
                <p className="text-[#64748B] text-lg">Manage your platform&apos;s terms and conditions</p>
            </div>

            <Card className="border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] pb-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-[#1E293B] flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        Terms and Conditions
                        {termsData?.data?._id && <span className="text-sm font-normal text-[#64748B]">(Loaded from server)</span>}
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isSaving || isUpdating} className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                            {isSaving || isUpdating ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="border-t border-[#E2E8F0]">
                        <JoditEditor ref={editor} value={content} config={config} onBlur={handleChange} />
                    </div>

                    <div className="p-6 border-t border-[#E2E8F0] bg-[#F9FAFB]">
                        <div className="text-sm text-[#64748B]">
                            <p>
                                <strong>Note:</strong> Changes will be applied immediately to your platform.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="mt-6 border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)]">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#1E293B]">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none p-4 border border-[#E2E8F0] rounded-lg bg-white min-h-50 rich-text-content" dangerouslySetInnerHTML={{ __html: content }} />
                </CardContent>
            </Card>
        </div>
    );
};

export default TermsAndConditionsEditor;
