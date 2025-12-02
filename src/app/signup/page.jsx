"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { NotebookPen } from 'lucide-react';
import { Register } from '@/lib/calls/services';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const username = e.target.username.value
            const password = e.target.password.value
            const payload = { username, password }
            const data = await Register(payload)
            if (data?.user?.accesstoken) {
                localStorage.setItem('token', data.user.accesstoken)
                router.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }

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

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Full Name
                        </label>
                        <Input id="name" type="text" placeholder="John Doe" required />
                    </div> */}
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Username
                        </label>
                        <Input id="username" type="text" placeholder="user123" required />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Password
                        </label>
                        <Input id="password" type="password" required />
                    </div>

                    <Button className="w-full" size="lg">
                        Create Account
                    </Button>

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
