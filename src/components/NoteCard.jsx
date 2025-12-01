import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';

export default function NoteCard({ id, title, preview, date, onDelete }) {
    return (
        <div className="group relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm transition-all hover:shadow-md hover:border-[var(--primary)]/50">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-none tracking-tight line-clamp-1">{title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">{preview}</p>
            </div>
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <span className="text-xs text-[var(--muted-foreground)]">{date}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/notes/${id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => onDelete(id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
