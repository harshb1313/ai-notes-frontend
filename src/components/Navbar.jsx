import Link from 'next/link';
import { LogOut, NotebookPen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-[var(--primary)] p-2 rounded-lg">
                <NotebookPen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">AI Notes</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
