'use client';

import { useState } from 'react';
import Image from 'next/image';
import { profile, projects, publication } from '@/data/profile';

const channels = [
    { label: 'Email', value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    {
        label: 'Phone',
        value: profile.contact.phone,
        href: `tel:${profile.contact.phone.replace(/\s/g, '')}`,
    },
    { label: 'GitHub', value: 'kevinpatildxd', href: profile.contact.github },
    { label: 'LinkedIn', value: 'kevin-patil', href: profile.contact.linkedin },
    { label: 'Studio', value: 'nudgesystems.in', href: profile.contact.company },
];

export default function AboutPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Static export - no server to post to, so hand off to the mail client.
        const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
        window.location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
            form.subject
        )}&body=${encodeURIComponent(body)}`;
    };

    const ongoing = projects.filter((p) => p.status === 'ongoing');

    return (
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <header className="border-b border-line pb-8">
                <p className="label mb-3">About &amp; contact</p>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Let&apos;s connect
                </h1>
            </header>

            {/* Bio */}
            <section className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-line sm:h-36 sm:w-36">
                    <Image
                        src="/kevinpatildxd/images/profile.png"
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover"
                    />
                </div>

                <div className="space-y-4 text-muted">
                    <p className="text-lg text-text">{profile.bio}</p>
                    <p>
                        I co-founded{' '}
                        <a
                            href={profile.contact.company}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent"
                        >
                            Nudge Systems
                        </a>
                        , a software studio in Surat, where I lead development across web, mobile
                        and e-commerce products. Alongside that I&apos;m finishing a B.Tech in
                        Computer Science Engineering at {profile.education.institution}.
                    </p>
                    <p>
                        My research sits in cybersecurity —{' '}
                        <a
                            href={publication.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent"
                        >
                            {publication.title}
                        </a>{' '}
                        was published in the {publication.venue} ({publication.details}). On the
                        tooling side I maintain{' '}
                        <a
                            href={profile.contact.npm}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent"
                        >
                            @kevinpatil/devguard
                        </a>
                        , an open-source CLI on npm.
                    </p>

                    {ongoing.length > 0 && (
                        <div className="pt-2">
                            <p className="label mb-2">Currently building</p>
                            <ul className="flex flex-wrap gap-2">
                                {ongoing.map((project) => (
                                    <li key={project.name} className="tag">
                                        {project.name} · {project.category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact */}
            <section className="mt-16 grid gap-10 lg:grid-cols-2">
                <div>
                    <h2 className="section-rule mb-6 text-sm font-semibold uppercase tracking-[0.14em]">
                        Reach me
                    </h2>
                    <dl className="border-t border-line">
                        {channels.map((channel) => (
                            <div key={channel.label} className="border-b border-line">
                                <a
                                    href={channel.href}
                                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="group flex items-baseline justify-between gap-4 py-3.5"
                                >
                                    <dt className="label">{channel.label}</dt>
                                    <dd className="min-w-0 truncate font-mono text-sm text-muted group-hover:text-accent">
                                        {channel.value}
                                    </dd>
                                </a>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="panel">
                    <div className="border-b border-line bg-elevated px-5 py-3">
                        <h2 className="text-sm font-semibold">Send a message</h2>
                        <p className="mt-0.5 font-mono text-[11px] text-dim">
                            Opens in your email client
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="label mb-1.5 block">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="label mb-1.5 block">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="label mb-1.5 block">
                                Subject
                            </label>
                            <input
                                id="subject"
                                type="text"
                                required
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                className="w-full border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="label mb-1.5 block">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                required
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full resize-none border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
                            />
                        </div>

                        <button type="submit" className="btn-primary w-full text-sm">
                            Send message →
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
