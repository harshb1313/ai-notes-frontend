"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import AITools from '@/components/AITools';
import { ChevronLeft, Save, Sparkles } from 'lucide-react';

export default function EditNotePage() {
    const params = useParams();
    const noteId = params?.id;
    const [title, setTitle] = useState('Project Ideas 2024');
    const [content, setContent] = useState('1. AI-powered ToDo list app with smart prioritization.\n2. Personal finance tracker with receipt scanning.\n3. Fitness app that generates workout plans based on available equipment.');

    const [activeTool, setActiveTool] = useState(null);
    const [aiResult, setAiResult] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleToolSelect = (tool) => {
        setActiveTool(tool);
        setAiResult('');
        setIsAiLoading(true);

        // Simulate AI processing
        setTimeout(() => {
            let result = '';
            switch (tool) {
                case 'summarize':
                    result = 'Summary: The note lists three app ideas: a smart ToDo list, a finance tracker with receipt scanning, and a personalized fitness app.';
                    break;
                case 'rewrite':
                    result = '1. Smart ToDo Application: Features intelligent task prioritization.\n2. Finance Management Tool: Includes receipt scanning capabilities.\n3. Personalized Workout Generator: Creates plans based on user equipment.';
                    break;
                case 'keywords':
                    result = 'Keywords: AI, ToDo, Finance, Fitness, App Ideas, Smart Prioritization, Receipt Scanning, Workout Plans';
                    break;
                case 'title':
                    result = 'Innovative App Concepts for 2024';
                    break;
            }
            setAiResult(result);
            setIsAiLoading(false);
        }, 1500);
    };

    const applyAiResult = () => {
        if (activeTool === 'title') {
            setTitle(aiResult);
        } else {
            setContent(content + '\n\n' + aiResult);
        }
        setActiveTool(null);
    };

    return (
        <div className="min-h-screen bg-[var(--secondary)]/30">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-4"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">Edit Note</h1>
                        <Link href="/dashboard">
                            <Button className="gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="text-lg font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="content" className="text-sm font-medium">
                                    Content
                                </label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="min-h-[400px] text-base resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm p-4">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                                    AI Assistant
                                </h3>
                                <AITools onToolSelect={handleToolSelect} />
                                <p className="text-xs text-[var(--muted-foreground)] mt-4">
                                    Select a tool to enhance your note content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Modal
                isOpen={!!activeTool}
                onClose={() => setActiveTool(null)}
                title={
                    activeTool === 'summarize' ? 'Summarize Note' :
                        activeTool === 'rewrite' ? 'Rewrite Content' :
                            activeTool === 'keywords' ? 'Extract Keywords' :
                                'Generate Title'
                }
            >
                <div className="space-y-4">
                    {isAiLoading ? (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
                            <p className="text-sm text-[var(--muted-foreground)]">Processing...</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-[var(--secondary)]/50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                                {aiResult}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setActiveTool(null)}>
                                    Cancel
                                </Button>
                                <Button onClick={applyAiResult}>
                                    {activeTool === 'title' ? 'Use Title' : 'Append to Note'}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
