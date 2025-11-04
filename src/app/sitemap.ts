import { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/'].map((route) => ({
    url: `${env.NEXT_PUBLIC_APP_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return routes;
}
