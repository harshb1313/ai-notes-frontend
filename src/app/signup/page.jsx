"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { NotebookPen } from 'lucide-react';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--secondary)]/30 p-4">
            <div className="w-full max-w-md space-y-8 bg-[var(--background)] p-8 rounded-2xl border border-[var(--border)] shadow-lg">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="bg-[var(--primary)] p-3 rounded-xl mb-2">
                        <NotebookPen className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
                    <p className="text-sm text-[var(--muted-foreground)]">
                        Enter your information to get started
                    </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Full Name
                        </label>
                        <Input id="name" type="text" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email
                        </label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Password
                        </label>
                        <Input id="password" type="password" required />
                    </div>
                    <Link href="/dashboard" className="w-full block">
                        <Button className="w-full" size="lg">
                            Create Account
                        </Button>
                    </Link>
                </form>

                <div className="text-center text-sm">
                    <span className="text-[var(--muted-foreground)]">Already have an account? </span>
                    <Link href="/login" className="font-medium text-[var(--primary)] hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
