'use client';

import { motion } from 'framer-motion';
import Marquee from '@/components/Marquee';
import SkillBadge from '@/components/SkillBadge';
import BentoCard from '@/components/BentoCard';

const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React', icon: '⚛️' },
            { name: 'Next.js', icon: '▲' },
            { name: 'JavaScript', icon: '🟨' },
            { name: 'HTML', icon: '📄' },
            { name: 'CSS', icon: '🎨' },
            { name: 'Tailwind CSS', icon: '💨' },
        ],
    },
    {
        title: 'Backend & Database',
        skills: [
            { name: 'PostgreSQL', icon: '🐘' },
            { name: 'Firebase', icon: '🔥' },
            { name: 'Socket.io', icon: '🔌' },
            { name: 'Express.js', icon: '🚀' },
            { name: 'Node.js', icon: '🟢' },
            { name: 'REST API', icon: '🔗' },
        ],
    },
    {
        title: 'Mobile & Tools',
        skills: [
            { name: 'Flutter', icon: '📱' },
            { name: 'Dart', icon: '🎯' },
            { name: 'C', icon: '⚙️' },
            { name: 'Git', icon: '📦' },
            { name: 'VS Code', icon: '💻' },
            { name: 'GitHub', icon: '🐙' },
        ],
    },
];

const allSkills = skillCategories.flatMap(cat => cat.skills);

export default function SkillsPage() {
    return (
        <div className="min-h-screen px-3 py-4 md:px-6 md:py-8">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 bg-tertiary text-white text-sm font-semibold rounded-full mb-4 shadow-lg"
                    >
                        Expertise
                    </motion.span>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#2D1248] dark:text-white mb-4 drop-shadow-sm">Skills & Technologies</h1>
                    <p className="text-lg text-[#4A3660] dark:text-white/70 max-w-2xl mx-auto">
                        Technologies I've learned and use to build modern web and mobile applications.
                    </p>
                </motion.div>

                {/* Marquee Skills - Infinite Scroll */}
                <div className="space-y-8 mb-20">
                    {/* First Row - Left to Right */}
                    <Marquee speed={30} className="py-4">
                        {allSkills.map((skill, i) => (
                            <SkillBadge key={`row1-${i}`} {...skill} />
                        ))}
                    </Marquee>

                    {/* Second Row - Right to Left */}
                    <Marquee speed={35} reverse className="py-4">
                        {[...allSkills].reverse().map((skill, i) => (
                            <SkillBadge key={`row2-${i}`} {...skill} />
                        ))}
                    </Marquee>

                    {/* Third Row - Left to Right (Slower) */}
                    <Marquee speed={40} className="py-4">
                        {allSkills.map((skill, i) => (
                            <SkillBadge key={`row3-${i}`} {...skill} />
                        ))}
                    </Marquee>
                </div>

                {/* Skill Categories Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-3xl font-bold text-primary text-center mb-10">By Category</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {skillCategories.map((category, index) => (
                            <BentoCard key={category.title} delay={index + 3}>
                                <div className="h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-tertiary to-primary flex items-center justify-center">
                                            <span className="text-white text-xl">
                                                {category.title === 'Frontend' ? '🎨' : category.title === 'Backend & Database' ? '⚙️' : '🛠️'}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">{category.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <motion.span
                                                key={skill.name}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                className="px-4 py-2 bg-secondary text-primary text-sm font-semibold rounded-full flex items-center gap-2"
                                            >
                                                <span>{skill.icon}</span>
                                                {skill.name}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </BentoCard>
                        ))}
                    </div>
                </motion.div>

                {/* Proficiency Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-20"
                >
                    <BentoCard className="p-10">
                        <h2 className="text-2xl font-bold text-primary mb-8 text-center">Proficiency Levels</h2>
                        <div className="space-y-6">
                            {[
                                { skill: 'Frontend Development (React, Next.js)', level: 85 },
                                { skill: 'JavaScript & Web Technologies', level: 80 },
                                { skill: 'Backend & Database (PostgreSQL, Firebase)', level: 75 },
                                { skill: 'Mobile Development (Flutter)', level: 70 },
                            ].map((item, index) => (
                                <div key={item.skill}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold text-primary">{item.skill}</span>
                                        <span className="text-tertiary font-bold">{item.level}%</span>
                                    </div>
                                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.level}%` }}
                                            transition={{ duration: 1, delay: 0.8 + index * 0.2, ease: 'easeOut' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoCard>
                </motion.div>
            </div>
        </div>
    );
}
