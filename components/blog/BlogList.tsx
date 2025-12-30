'use client'

import Link from 'next/link'
import ImageWithFallback from '../ImageWithFallback'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  slug: string
  views?: number
}

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="blog-list-empty">
        <p>No articles found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="blog-list">
      {posts.map((post) => (
        <article key={post.id} className="blog-list-item">
          <Link href={`/blog/${post.slug}`} className="blog-list-link">
            <div className="blog-list-image">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
              />
            </div>
            <div className="blog-list-content">
              <div className="blog-list-meta">
                <span className="blog-list-category">{post.category}</span>
                <span className="blog-list-date">{post.date}</span>
                <span className="blog-list-read-time">{post.readTime}</span>
                {post.views && (
                  <span className="blog-list-views">{post.views} views</span>
                )}
              </div>
              <h3 className="blog-list-title">{post.title}</h3>
              <p className="blog-list-excerpt">{post.excerpt}</p>
              <div className="blog-list-footer">
                <span className="blog-list-read-more">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

