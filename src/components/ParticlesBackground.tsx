'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, ISourceOptions } from '@tsparticles/engine';

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        // Optional: console.log for debugging
        // console.log('Particles loaded:', container);
    }, []);

    const options: ISourceOptions = {
        // Background is transparent to overlay on website
        background: {
            color: {
                value: 'transparent',
            },
        },

        // Disable FPS limit for smooth animation
        fpsLimit: 120,

        // Mouse interactivity - Antigravity effect
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'repulse', // Particles float away from cursor
                },
                onClick: {
                    enable: true,
                    mode: 'push', // Add particles on click
                },
            },
            modes: {
                repulse: {
                    distance: 150, // Hover distance
                    duration: 0.4,
                    speed: 0.5, // Gentle repulsion for "antigravity" feel
                },
                push: {
                    quantity: 4,
                },
                bubble: {
                    distance: 150,
                    size: 6,
                    duration: 0.4,
                    opacity: 1,
                },
            },
        },

        // Particle configuration
        particles: {
            // Colors from palette: Tertiary Blue and Primary Purple
            color: {
                value: ['#838CE5', '#50207A', '#D6B9FC'], // Mix of colors
            },

            // NO links/lines - isolated floating dots
            links: {
                enable: false,
            },

            // Movement - random floating
            move: {
                enable: true,
                speed: 1, // Slow, gentle movement
                direction: 'none', // Random direction
                random: true,
                straight: false,
                outModes: {
                    default: 'out', // Particles flow off screen and reappear
                },
                attract: {
                    enable: false,
                },
            },

            // Number of particles
            number: {
                value: 90, // ~80-100 particles
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080,
                },
            },

            // Opacity - random for depth
            opacity: {
                value: {
                    min: 0.3,
                    max: 0.8,
                },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                },
            },

            // Shape - circles only
            shape: {
                type: 'circle',
            },

            // Size - random between 1-3px
            size: {
                value: {
                    min: 1,
                    max: 3,
                },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                },
            },

            // Slight wobble for more organic movement
            wobble: {
                enable: true,
                distance: 5,
                speed: 2,
            },
        },

        // Performance
        detectRetina: true,

        // Smooth animations
        smooth: true,
    };

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="fixed inset-0 -z-10 pointer-events-auto"
        />
    );
}
