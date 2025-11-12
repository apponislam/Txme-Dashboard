"use client";
import React, { useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamically import Jodit Editor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
    loading: () => <div className="p-4">Loading editor...</div>,
});

const defaultTerms = `<h1><strong>TERMS AND CONDITIONS</strong></h1>

<p><strong>Last updated: 11/12/2025</strong></p>

<p><strong>1. ACCEPTANCE OF TERMS</strong></p>
<p>By accessing and using this platform, you accept and agree to be bound by the terms and provision of this agreement.</p>

<p><strong>2. USER RESPONSIBILITIES</strong></p>
<p>Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>

<p><strong>3. PROHIBITED ACTIVITIES</strong></p>
<p>Users may not use the service for any illegal purpose or in any manner that violates applicable laws.</p>

<p><strong>4. INTELLECTUAL PROPERTY</strong></p>
<p>All content on this platform, including text, graphics, logos, and software, is the property of the company and protected by copyright laws.</p>

<p><strong>5. LIMITATION OF LIABILITY</strong></p>
<p>The company shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>

<p><strong>6. TERMINATION</strong></p>
<p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever.</p>

<p><strong>7. GOVERNING LAW</strong></p>
<p>These terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction.</p>

<p><strong>8. CHANGES TO TERMS</strong></p>
<p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

<p><strong>9. CONTACT INFORMATION</strong></p>
<p>For any questions about these Terms and Conditions, please contact us at support@example.com.</p>`;

const TermsAndConditionsEditor = () => {
    const [content, setContent] = useState(defaultTerms);
    const editor = useRef(null);

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

    // Use useCallback to memoize the change handler
    const handleChange = useCallback((newContent: string) => {
        setContent(newContent);
    }, []);

    const handleSave = () => {
        console.log("Saved content:", content);
        alert("Terms and Conditions saved successfully!");
    };

    return (
        <div className="container mx-auto p-6 ">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">Terms and Conditions Editor</h1>
                <p className="text-[#64748B] text-lg">Manage your platform&apos;s terms and conditions</p>
            </div>

            <Card className="border-[#E2E8F0] shadow-[0px_1px_16px_0px_rgba(0,0,0,0.08)] pb-0">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-[#1E293B] flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        Terms and Conditions
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={handleSave} className="bg-[#FF5A36] text-white hover:bg-[#E53E3E] flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="border-t border-[#E2E8F0]">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={handleChange} // Use onBlur instead of onChange
                        />
                    </div>

                    <div className="p-6 border-t border-[#E2E8F0] bg-[#F9FAFB] ">
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
                    <div className="prose max-w-none p-4 border border-[#E2E8F0] rounded-lg bg-white min-h-[200px] rich-text-content" dangerouslySetInnerHTML={{ __html: content }} />
                </CardContent>
            </Card>
        </div>
    );
};

export default TermsAndConditionsEditor;
