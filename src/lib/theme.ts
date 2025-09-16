import {type CollectionEntry, getCollection} from 'astro:content';

export async function getAllThemes(): Promise<string[]> {
    const posts = await getCollection('blog');
    return Array.from(
        new Set(
            posts.flatMap(p => {
                const t = (p.data as CollectionEntry<'blog'>['data']).theme as string | string[] | undefined;
                return Array.isArray(t) ? t : t ? [t] : [];
            })
        )
    );
}
