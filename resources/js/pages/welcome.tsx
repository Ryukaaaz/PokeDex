import { Head, Link, usePage } from '@inertiajs/react';
import { login, dashboard } from '@/routes';
import { register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="PokeDex" />

            <div className="min-h-screen bg-[#fafafa] text-[#1b1b18] dark:bg-[#0f0f0f] dark:text-[#fef3c7]">
                {/* Header */}
                <header className="mx-auto w-full max-w-7xl px-6 pt-6 text-sm lg:px-8">
                    <nav className="flex items-center justify-between">
                        {/* PokeDex Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 font-bold text-white">
                                P
                            </div>

                            <span className="text-xl font-bold tracking-tight">
                                Poke<span className="text-red-600">Dex</span>
                            </span>
                        </Link>

                        {/* Existing navigation */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-7xl items-center px-6 py-16 lg:px-8">
                    <div className="grid w-full items-center gap-16 lg:grid-cols-2">

                        {/* Left Content */}
                        <div className="max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                                Inventory & POS Management
                            </div>

                            <h1 className="text-5xl font-bold tracking-tight text-[#1b1b18] sm:text-6xl lg:text-7xl dark:text-white">
                                Manage your
                                <span className="block text-red-600 dark:text-red-500">
                                    collection smarter.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6b625c] dark:text-[#aaa39d]">
                                PokeDex helps you manage your card inventory,
                                track purchases and sales, and run your
                                business from one simple platform.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                                >
                                    {auth.user
                                        ? 'Go to Dashboard'
                                        : 'Get Started'}
                                </Link>

                                <Link
                                    href={login()}
                                    className="rounded-lg border border-[#d6d3d1] bg-white px-6 py-3 text-sm font-semibold text-[#1b1b18] transition hover:bg-[#f5f5f4] dark:border-[#3e3e3a] dark:bg-[#181817] dark:text-white dark:hover:bg-[#222220]"
                                >
                                    Explore PokeDex
                                </Link>
                            </div>

                            {/* Features */}
                            <div className="mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-[#e7e5e4] pt-8 dark:border-[#2e2e2b]">
                                <div>
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                        📦
                                    </div>

                                    <h3 className="font-semibold">
                                        Inventory
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[#78716c] dark:text-[#a8a29e]">
                                        Keep track of your cards and stock
                                        levels with ease.
                                    </p>
                                </div>

                                <div>
                                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                        🛒
                                    </div>

                                    <h3 className="font-semibold">
                                        Point of Sale
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-[#78716c] dark:text-[#a8a29e]">
                                        Manage purchases and sales in one
                                        centralized system.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual */}
                        <div className="relative">
                            {/* Background decoration */}
                            <div className="absolute -inset-4 rounded-3xl bg-red-100/60 blur-3xl dark:bg-red-950/20"></div>

                            <div className="relative overflow-hidden rounded-2xl border border-[#e7e5e4] bg-white shadow-2xl dark:border-[#2e2e2b] dark:bg-[#181817]">

                                {/* Fake Dashboard Header */}
                                <div className="flex items-center justify-between border-b border-[#e7e5e4] px-6 py-4 dark:border-[#2e2e2b]">
                                    <div>
                                        <p className="text-xs text-[#78716c]">
                                            PokeDex
                                        </p>

                                        <p className="font-semibold">
                                            Dashboard
                                        </p>
                                    </div>

                                    <div className="flex gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="p-6">

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="rounded-xl bg-[#fafafa] p-4 dark:bg-[#222220]">
                                            <p className="text-xs text-[#78716c]">
                                                Inventory
                                            </p>

                                            <p className="mt-2 text-xl font-bold">
                                                1,248
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-[#fafafa] p-4 dark:bg-[#222220]">
                                            <p className="text-xs text-[#78716c]">
                                                Purchases
                                            </p>

                                            <p className="mt-2 text-xl font-bold">
                                                86
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-[#fafafa] p-4 dark:bg-[#222220]">
                                            <p className="text-xs text-[#78716c]">
                                                Sales
                                            </p>

                                            <p className="mt-2 text-xl font-bold">
                                                124
                                            </p>
                                        </div>
                                    </div>

                                    {/* Chart Placeholder */}
                                    <div className="mt-6 rounded-xl border border-[#e7e5e4] p-5 dark:border-[#2e2e2b]">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    Sales Overview
                                                </p>

                                                <p className="mt-1 text-xs text-[#78716c]">
                                                    Monthly performance
                                                </p>
                                            </div>

                                            <span className="text-sm font-semibold text-green-600">
                                                +18.4%
                                            </span>
                                        </div>

                                        {/* Fake chart */}
                                        <div className="mt-6 flex h-32 items-end gap-2">
                                            {[40, 60, 45, 75, 55, 85, 70, 95, 80, 100].map(
                                                (height, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-1 rounded-t-md bg-red-500/80 transition hover:bg-red-600"
                                                        style={{
                                                            height: `${height}%`,
                                                        }}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="mt-6">
                                        <div className="mb-3 flex items-center justify-between">
                                            <p className="text-sm font-semibold">
                                                Recent Activity
                                            </p>

                                            <span className="text-xs text-red-600">
                                                View all
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded-lg bg-[#fafafa] p-3 dark:bg-[#222220]">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/40">
                                                        📦
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            Inventory Updated
                                                        </p>

                                                        <p className="text-xs text-[#78716c]">
                                                            Charizard ex
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="text-xs text-green-600">
                                                    +12
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-lg bg-[#fafafa] p-3 dark:bg-[#222220]">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/40">
                                                        🛒
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            New Sale
                                                        </p>

                                                        <p className="text-xs text-[#78716c]">
                                                            Pokémon Card
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="text-xs font-medium">
                                                    Rp 250K
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}