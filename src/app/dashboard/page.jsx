"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const INITIAL_NOTES = [
    {
        id: '1',
        title: 'Project Ideas 2024',
        preview: '1. AI-powered ToDo list app with smart prioritization. 2. Personal finance tracker with receipt scanning. 3. Fitness app that generates workout plans based on available equipment.',
        date: 'Oct 24, 2024',
    },
    {
        id: '2',
        title: 'Meeting Notes: Design Review',
        preview: 'Attendees: Sarah, Mike, John. Key decisions: 1. Switch to a darker color scheme for the dashboard. 2. Increase the font size for better readability on mobile devices. Action items: Mike to update the Figma file.',
        date: 'Oct 22, 2024',
    },
    {
        id: '3',
        title: 'Grocery List',
        preview: 'Milk, Eggs, Bread, Spinach, Chicken breast, Rice, Apples, Bananas, Yogurt, Coffee beans.',
        date: 'Oct 20, 2024',
    },
    {
        id: '4',
        title: 'Book Recommendations',
        preview: 'The Pragmatic Programmer, Clean Code, Design Patterns, Refactoring UI, The Psychology of Money.',
        date: 'Oct 18, 2024',
    },
];

export default function DashboardPage() {
    const [notes, setNotes] = useState(INITIAL_NOTES);

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div className="min-h-screen bg-[var(--secondary)]/30">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Notes</h1>
                        <p className="text-[var(--muted-foreground)] mt-1">
                            Manage and organize your thoughts
                        </p>
                    </div>
                    <Link href="/notes/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Note
                        </Button>
                    </Link>
                </div>

                {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                preview={note.preview}
                                date={note.date}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--secondary)] mb-4">
                            <Plus className="h-8 w-8 text-[var(--muted-foreground)]" />
                        </div>
                        <h3 className="text-lg font-medium">No notes yet</h3>
                        <p className="text-[var(--muted-foreground)] mt-1 mb-6">
                            Create your first note to get started
                        </p>
                        <Link href="/notes/create">
                            <Button>Create Note</Button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
