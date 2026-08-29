import type { MetadataRoute } from 'next';

const BASE = 'https://kevinpatildxd.github.io/kevinpatildxd';

const routes = ['', '/projects', '/skills', '/certificates', '/resume', '/about'];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map((route) => ({
        url: `${BASE}${route}/`,
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
