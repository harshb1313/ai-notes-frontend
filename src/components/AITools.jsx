import { Sparkles, FileText, Key, Type } from 'lucide-react';
import { Button } from './ui/Button';

export default function AITools({ onToolSelect }) {
    return (
        <div className="flex flex-wrap gap-2 p-4 bg-[var(--secondary)]/50 rounded-lg border border-[var(--border)]">
            <div className="flex items-center gap-2 w-full mb-2">
                <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                <span className="text-sm font-medium">AI Tools</span>
            </div>

            <Button
                variant="secondary"
                size="sm"
                onClick={() => onToolSelect('summarize')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <FileText className="h-3 w-3" />
                Summarize
            </Button>

            <Button
                variant="secondary"
                size="sm"
                onClick={() => onToolSelect('rewrite')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <Sparkles className="h-3 w-3" />
                Rewrite
            </Button>

            <Button
                variant="secondary"
                size="sm"
                onClick={() => onToolSelect('keywords')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <Key className="h-3 w-3" />
                Keywords
            </Button>

            <Button
                variant="secondary"
                size="sm"
                onClick={() => onToolSelect('title')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <Type className="h-3 w-3" />
                Generate Title
            </Button>
        </div>
    );
}
