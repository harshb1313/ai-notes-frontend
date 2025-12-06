"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import AITools from '@/components/AITools';
import { ChevronLeft, Save, Sparkles } from 'lucide-react';
import { getSingleNote } from '@/lib/calls/services';
import { editNote } from '@/lib/calls/services';
import { aiSummarizer, aiKeywords, aiTitleGen, aiRewrite } from '@/lib/calls/services';

export default function EditNotePage() {
    const params = useParams();
    const noteId = params?.id;
    const [title, setTitle] = useState('Project Ideas 2024');
    const [content, setContent] = useState('1. AI-powered ToDo list app with smart prioritization.\n2. Personal finance tracker with receipt scanning.\n3. Fitness app that generates workout plans based on available equipment.');

    const [activeTool, setActiveTool] = useState(null);
    const [aiResult, setAiResult] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleToolSelect = async (tool) => {
        setActiveTool(tool);
        setAiResult('');
        setIsAiLoading(true);

        try {
            if (tool === "summarize") {
                const result = await aiSummarizer(noteId);   // ⬅ real backend call
                setAiResult(result.summary || result);       // adjust depending on backend response
            }

            if (tool === "rewrite") {
                const content = document.getElementById("content").value;
                const result = await aiRewrite(content)
                setAiResult(result.paraphrased)
            }

            if (tool === "keywords") {
                if (tool === "keywords") {
                    const content = document.getElementById("content").value;
                    const result = await aiKeywords(content);

                    // result.note is an array — convert to displayable text
                    const formatted = Array.isArray(result.note)
                        ? result.note.join(", ")
                        : result.note;

                    setAiResult(formatted);
                }

            }

            if (tool === "title") {
                const content = document.getElementById("content").value;
                const result = await aiTitleGen(content)
                setAiResult(result.note)
            }

        } catch (error) {
            console.log("AI tool error:", error);
            setAiResult("Something went wrong while processing.");
        } finally {
            setIsAiLoading(false);
        }
    };


    const handleEdit = async () => {
        try {
            const title = document.getElementById("title").value
            const content = document.getElementById("content").value
            const payload = { title, content }
            await editNote(noteId, payload)
        } catch (error) {
            console.log("error while editing note", error)
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            const response = await getSingleNote(noteId)
            setTitle(response.title)
            setContent(response.content)
        }
        fetchNote()
    }, [])

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

                        <Button onClick={handleEdit} className="gap-2 cursor-pointer">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>

                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium">

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
                                <Button variant="ghost" className="cursor-pointer" onClick={() => setActiveTool(null)}>
                                    Cancel
                                </Button>
                                <Button onClick={applyAiResult} className="cursor-pointer">
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
