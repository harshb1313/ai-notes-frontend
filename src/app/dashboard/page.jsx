"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getUserNotes } from '@/lib/calls/services';
import { useEffect } from 'react';

export default function DashboardPage() {
    const [notes, setNotes] = useState([]);



    useEffect(() => {
        const HandleCall = async () => {
            try {
                const response = await getUserNotes()
                setNotes(response)
            } catch (error) {
                console.log('error while fetching notes', error)
            }
        }
        HandleCall()
    }, [])

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
                                preview={note.content.slice(0, 100)}  // if you want preview
                                date={note.created_at}
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
