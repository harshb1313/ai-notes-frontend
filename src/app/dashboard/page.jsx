"use client";

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import NoteCard from '@/components/NoteCard';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getUserNotes } from '@/lib/calls/services';
import { useEffect } from 'react';
import { getSingleNote } from '@/lib/calls/services';
import { deleteNote } from '@/lib/calls/services';

export default function DashboardPage() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFilterChange = async (filterType) => {
        const today = new Date();

        let start = null;
        let end = null;

        if (filterType === "today") {
            const t = today.toISOString().split("T")[0];
            start = t;
            end = t;
        }

        if (filterType === "week") {
            const current = new Date();
            const monday = new Date(current.setDate(current.getDate() - current.getDay() + 1));
            const sunday = new Date(monday);
            sunday.setDate(monday.getDate() + 6);

            start = monday.toISOString().split("T")[0];
            end = sunday.toISOString().split("T")[0];
        }

        if (filterType === "month") {
            const year = today.getFullYear();
            const month = today.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            start = firstDay.toISOString().split("T")[0];
            end = lastDay.toISOString().split("T")[0];
        }

        // Fetch with params
        try {
            const response = await getUserNotes(
                start && end ? { start_date: start, end_date: end } : {}
            );
            setNotes(response);
        } catch (err) {
            console.log("Filter error:", err);
        }
    };


    const handleView = async (id) => {
        try {
            const data = await getSingleNote(id)
            setSelectedNote(data)
            setIsModalOpen(true)
        } catch (error) {
            console.log("fetching single note", error)
        }
    }

    const fetchNotes = async () => {
        try {
            const response = await getUserNotes();
            setNotes(response);
        } catch (error) {
            console.log("error fetching", error);
        }
    };

    useEffect(() => {
        fetchNotes();  // safe
    }, []);

    const handleDelete = async (id) => {
        await deleteNote(id)
        fetchNotes()
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

                    <div className="flex items-center gap-4">

                        {/* Filter Dropdown */}
                        <select
                            className="px-3 py-2 rounded-lg border bg-white dark:bg-[var(--background)] cursor-pointer"
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option value="">All Notes</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>

                        {/* Create New Note Button */}
                        <Link href="/notes/create">
                            <Button className="gap-2 cursor-pointer">
                                <Plus className="h-4 w-4" />
                                New Note
                            </Button>
                        </Link>
                    </div>
                </div>


                {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                preview={note.content.slice(0, 100)}
                                date={new Date(note.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric"
                                })}
                                onDelete={handleDelete}
                                onView={handleView}
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
            {isModalOpen && selectedNote && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[var(--background)] rounded-xl p-6 max-w-lg w-full max-h-[80vh] shadow-lg relative overflow-hidden">

                        {/* Title */}
                        <h2 className="text-xl font-bold mb-3 select-none">
                            {selectedNote.title}
                        </h2>

                        {/* Read-only scrollable content */}
                        <div
                            className="text-sm text-[var(--muted-foreground)] whitespace-pre-wrap overflow-y-auto pr-2 select-text cursor-default"
                            style={{ maxHeight: "55vh" }}
                        >
                            {selectedNote.content}
                        </div>

                        {/* Close button */}
                        <Button
                            className="mt-6 w-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}

        </div>
    );
}
