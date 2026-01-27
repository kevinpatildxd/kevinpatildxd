'use client';

import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: [
            { name: 'React', level: 85 },
            { name: 'Next.js', level: 80 },
            { name: 'JavaScript', level: 85 },
            { name: 'HTML/CSS', level: 90 },
            { name: 'Tailwind CSS', level: 85 },
        ],
    },
    {
        title: 'Backend & Database',
        icon: '⚙️',
        skills: [
            { name: 'Node.js', level: 75 },
            { name: 'PostgreSQL', level: 70 },
            { name: 'Firebase', level: 75 },
            { name: 'Socket.io', level: 70 },
            { name: 'REST APIs', level: 80 },
        ],
    },
    {
        title: 'Mobile & Tools',
        icon: '📱',
        skills: [
            { name: 'Flutter', level: 70 },
            { name: 'Dart', level: 70 },
            { name: 'Git', level: 85 },
            { name: 'VS Code', level: 90 },
            { name: 'C', level: 65 },
        ],
    },
];

const allSkills = [
    'React', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind',
    'PostgreSQL', 'Firebase', 'Socket.io', 'Express', 'Node.js', 'REST API',
    'Flutter', 'Dart', 'C', 'Git', 'VS Code', 'GitHub'
];

export default function SkillsPage() {
    return (
        <div className="min-h-screen pt-20 md:pt-24">
            <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10 sm:mb-16"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary border border-border text-xs sm:text-sm text-text-secondary mb-3 sm:mb-4"
                        >
                            Expertise
                        </motion.span>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                            Skills & <span className="gradient-text">Technologies</span>
                        </h1>
                        <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-4">
                            Technologies I've learned and use to build modern web and mobile applications.
                        </p>
                    </motion.div>

                    {/* Skills Tags - Scrollable on mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-10 sm:mb-16 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
                    >
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0">
                            {allSkills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.03 }}
                                    className="tag text-xs sm:text-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Skill Categories */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
                        {skillCategories.map((category, catIndex) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + catIndex * 0.1 }}
                                className="card p-4 sm:p-6"
                            >
                                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                                    <h3 className="text-base sm:text-lg font-bold">{category.title}</h3>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-1.5 sm:mb-2">
                                                <span className="text-xs sm:text-sm font-medium text-text-secondary">{skill.name}</span>
                                                <span className="text-xs sm:text-sm font-medium text-accent">{skill.level}%</span>
                                            </div>
                                            <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + catIndex * 0.2 + skillIndex * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="card p-4 sm:p-6 md:p-8 text-center"
                    >
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Overall Proficiency</h2>
                        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl mx-auto mb-6 sm:mb-8">
                            Continuously learning and expanding my skill set through hands-on projects and real-world development experience.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {[
                                { label: 'Frontend', value: '85%' },
                                { label: 'JavaScript', value: '80%' },
                                { label: 'Backend', value: '75%' },
                                { label: 'Mobile', value: '70%' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="p-3 sm:p-4 bg-secondary rounded-xl sm:rounded-2xl"
                                >
                                    <p className="text-lg sm:text-xl md:text-2xl font-bold gradient-text mb-0.5 sm:mb-1">{item.value}</p>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-text-tertiary">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
