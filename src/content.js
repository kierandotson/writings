import matter from 'gray-matter'
import { marked } from 'marked'

// Vite: glob all markdown files in content/ and load as raw strings
const modules = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default' })

/**
 * Resolve all markdown modules into an array of posts.
 * Each post has: slug, tags, title, date, excerpt, body (raw), html (rendered).
 * tags: from front matter `tags` (string list/array); no folder fallback.
 */
export async function loadPosts() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const raw = await loader()
      const { data, content } = matter(raw)
      const normalized = path.replace(/^\//, '')
      const slug = normalized
        .replace(/^content\//, '')
        .replace(/\.md$/, '')
        .replace(/\//g, '--')
      const tags = Array.isArray(data.tags)
        ? [...new Set(data.tags.map((t) => String(t).toLowerCase().trim()).filter(Boolean))]
        : []
      // Treat a line that is only "." as a stanza break (poetry) — vertical space, no line
      const bodyForHtml = content.replace(/^\.\s*$/gm, '\n\n---\n\n')
      let html = marked.parse(bodyForHtml)
      html = html.replace(/<hr\s*\/?>/gi, '<br><br>')
      return {
        slug,
        path,
        tags,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || content.slice(0, 200),
        body: content,
        html,
      }
    })
  )
  // Sort by date descending (newest first)
  const dateStr = (d) =>
    d instanceof Date ? d.toISOString() : String(d ?? '')
  entries.sort((a, b) => dateStr(b.date).localeCompare(dateStr(a.date)))
  return entries
}

/** All unique tags across posts, sorted. */
export function getAllTags(posts) {
  const set = new Set()
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)))
  return [...set].sort()
}

/** Filter posts to those that have every selected tag (AND). */
export function filterPostsByTags(posts, selectedTags) {
  if (!selectedTags.length) return posts
  return posts.filter((p) =>
    selectedTags.every((tag) => p.tags.includes(tag))
  )
}

/**
 * Get a single post by slug (e.g. "blog--my-post" or "poems--sonnet").
 */
export async function getPostBySlug(slug) {
  const posts = await loadPosts()
  return posts.find((p) => p.slug === slug) || null
}

/**
 * Get a post and its previous/next neighbors chronologically. For post nav.
 * prevPost = newer (index - 1), nextPost = older (index + 1).
 * Returns { post, prevPost, nextPost } with prev/next as { slug, title } or null.
 */
export async function getPostWithNext(slug) {
  const posts = await loadPosts()
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return { post: null, prevPost: null, nextPost: null }
  const post = posts[index]
  const prev = index > 0 ? posts[index - 1] : null
  const next = index + 1 < posts.length ? posts[index + 1] : null
  return {
    post,
    prevPost: prev ? { slug: prev.slug, title: prev.title } : null,
    nextPost: next ? { slug: next.slug, title: next.title } : null,
  }
}

