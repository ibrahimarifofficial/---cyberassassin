'use client'

import { useState } from 'react'
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

interface BlogSidebarProps {
  posts: BlogPost[]
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function BlogSidebar({
  posts,
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: BlogSidebarProps) {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const categoriesToShow = 8
  const visibleCategories = showAllCategories ? categories : categories.slice(0, categoriesToShow)
  const hasMoreCategories = categories.length > categoriesToShow

  // Get top posts (most viewed or most recent)
  const topPosts = [...posts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)

  return (
    <aside className="blog-sidebar">
      {/* Search Bar */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Search</h3>
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M13 13L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Categories</h3>
        <ul className="categories-list">
          {visibleCategories.map((category) => (
            <li key={category}>
              <button
                className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
              >
                <span className="category-name">{category}</span>
                <span className="category-count">
                  ({category === 'All' 
                    ? posts.length 
                    : posts.filter(p => p.category && p.category === category).length})
                </span>
              </button>
            </li>
          ))}
        </ul>
        {hasMoreCategories && (
          <button
            className="categories-more-btn"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? 'Show Less' : 'More'}
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 14 14" 
              fill="none"
              className={showAllCategories ? 'rotated' : ''}
            >
              <path d="M4 5L7 8L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Top Posts */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Top Posts</h3>
        <ul className="top-posts-list">
          {topPosts.map((post) => (
            <li key={post.id} className="top-post-item">
              <Link href={`/blog/${post.slug}`} className="top-post-link">
                <div className="top-post-image">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="top-post-content">
                  <h4 className="top-post-title">{post.title}</h4>
                  <div className="top-post-meta">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

