import {
    Bot,
    Send,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from "react-markdown";

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content:
                'Hello! 👋 Ask me about your inventory, sales, or business analytics.',
        },
    ]);

    // Reference to the bottom of the messages container
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages, isLoading]);

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || isLoading) {
            return;
        }

        // Add user message immediately
        setMessages((prev) => [
            ...prev,
            {
                role: 'user',
                content: trimmedMessage,
            },
        ]);

        // Clear input
        setMessage('');

        // Start loading
        setIsLoading(true);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content');

            const response = await fetch('/ai/assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken ?? '',
                },
                body: JSON.stringify({
                    message: trimmedMessage,
                }),
            });

            const data = await response.json();

            console.log('AI response status:', response.status);
            console.log('AI response:', data);

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    `Request failed with status ${response.status} `,
                );
            }

            // Add AI response
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: data.message,
                },
            ]);
        } catch (error) {
            console.error(
                'AI Assistant error:',
                error,
            );

            // Show error inside chat
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        error instanceof Error
                            ? error.message
                            : 'Sorry, something went wrong. Please try again.',
                },
            ]);
        } finally {
            // Stop loading regardless of success/failure
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating AI Button */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-105"
                >
                    <Bot />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <aside className="fixed right-6 bottom-6 z-50 flex h-[600px] w-96 flex-col overflow-hidden rounded-xl border bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-4">
                        <div>
                            <h2 className="flex items-center gap-2 font-semibold">
                                <Bot size={20} />
                                PokeDex AI
                            </h2>

                            <p className="text-sm text-gray-500">
                                Your business assistant
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setIsOpen(false)
                            }
                            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
                        >
                            <X />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 space-y-3 overflow-y-auto p-4">
                        {messages.map(
                            (msg, index) => (
                                <div
                                    key={index}
                                    className={
                                        msg.role ===
                                            'user'
                                            ? 'ml-auto max-w-[80%] rounded-lg bg-black p-3 text-white'
                                            : 'max-w-[80%] rounded-lg bg-gray-100 p-3'
                                    }
                                >
                                    <ReactMarkdown
                                        components={{
                                            p: ({ children }) => (
                                                <p className="mb-2 text-sm">
                                                    {children}
                                                </p>
                                            ),
                                            strong: ({ children }) => (
                                                <strong className="font-semibold">
                                                    {children}
                                                </strong>
                                            ),
                                            ul: ({ children }) => (
                                                <ul className="mb-2 list-disc pl-5 text-sm">
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol className="mb-2 list-decimal pl-5 text-sm">
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children }) => (
                                                <li className="mb-1">
                                                    {children}
                                                </li>
                                            ),
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            ),
                        )}

                        {/* Loading message */}
                        {isLoading && (
                            <div className="max-w-[80%] rounded-lg bg-gray-100 p-3">
                                <p className="text-sm text-gray-500">
                                    PokeDex AI is thinking...
                                </p>
                            </div>
                        )}

                        {/* Scroll target */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t p-4">
                        <form
                            onSubmit={handleSubmit}
                            className="flex gap-2"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) =>
                                    setMessage(
                                        e.target.value,
                                    )
                                }
                                disabled={isLoading}
                                placeholder={
                                    isLoading
                                        ? 'PokeDex AI is thinking...'
                                        : 'Ask something...'
                                }
                                className="min-w-0 flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100"
                            />

                            <button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    !message.trim()
                                }
                                className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </aside>
            )}
        </>
    );
}