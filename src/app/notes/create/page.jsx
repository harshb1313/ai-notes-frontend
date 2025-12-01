"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ChevronLeft, Save } from 'lucide-react';

export default function CreateNotePage() {
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
                        <h1 className="text-3xl font-bold tracking-tight">Create Note</h1>
                        <Link href="/dashboard">
                            <Button className="gap-2">
                                <Save className="h-4 w-4" />
                                Save Note
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm p-6 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title
                        </label>
                        <Input
                            id="title"
                            placeholder="Enter note title..."
                            className="text-lg font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">
                            Content
                        </label>
                        <Textarea
                            id="content"
                            placeholder="Start typing your note here..."
                            className="min-h-[400px] text-base resize-y"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
