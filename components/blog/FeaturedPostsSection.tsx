'use client'

import { useState, useEffect } from 'react'
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
  featured: boolean
  views?: number
}

interface FeaturedPostsSectionProps {
  posts: BlogPost[]
}

export default function FeaturedPostsSection({ posts }: FeaturedPostsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allFeaturedPosts = posts.filter(post => post.featured)
  
  // Slider posts (first 3 for slider)
  const sliderPosts = allFeaturedPosts.slice(0, 3)
  // Right side featured posts (next 2 after slider)
  const rightSidePosts = allFeaturedPosts.slice(3, 5)

  useEffect(() => {
    if (sliderPosts.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        // Reset to 0 when reaching the end for smooth infinite loop
        if (next >= sliderPosts.length) {
          return 0
        }
        return next
      })
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [sliderPosts.length])

  if (allFeaturedPosts.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1
      if (next < 0) {
        return sliderPosts.length - 1
      }
      return next
    })
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1
      if (next >= sliderPosts.length) {
        return 0
      }
      return next
    })
  }

  const currentPost = sliderPosts[currentIndex]

  return (
    <section className="featured-posts-section">
      <div className="container-full">
        <div className="featured-posts-header">
          <h2 className="featured-posts-title">
            <span className="title-accent"></span>
            Featured Posts
          </h2>
        </div>

        <div className="featured-posts-layout">
          {/* Left Side - Slider */}
          <div className="featured-slider-container">
            <div className="featured-slider-wrapper">
              <button 
                className="slider-btn slider-btn-prev"
                onClick={goToPrevious}
                aria-label="Previous post"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="slider-track-container">
                <div 
                  className="slider-track"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {sliderPosts.map((post, index) => (
                    <Link 
                      key={post.id}
                      href={`/blog/${post.slug}`} 
                      className="featured-slider-card"
                    >
                      <div className="featured-slider-image">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          width={1200}
                          height={600}
                        />
                        {/* Gradient Overlay */}
                        <div className="slider-gradient-overlay"></div>
                        
                        {/* Content on top of gradient */}
                        <div className="slider-content-overlay">
                          <div className="slider-content">
                            <div className="slider-meta">
                              <span className="slider-category">{post.category}</span>
                              <span className="slider-date">{post.date}</span>
                              <span className="slider-read-time">{post.readTime}</span>
                            </div>
                            <h3 className="slider-title">{post.title}</h3>
                            <p className="slider-excerpt">{post.excerpt}</p>
                            <div className="slider-link">
                              Read More
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button 
                className="slider-btn slider-btn-next"
                onClick={goToNext}
                aria-label="Next post"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Slider Indicators */}
            {sliderPosts.length > 1 && (
              <div className="slider-indicators">
                {sliderPosts.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Side - 2 Featured Posts */}
          <div className="featured-posts-right">
            {rightSidePosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="featured-post-right-card"
              >
                <div className="featured-post-right-image">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={300}
                  />
                  <div className="featured-badge-small">Featured</div>
                </div>
                <div className="featured-post-right-content">
                  <div className="featured-post-right-meta">
                    <span className="post-category-small">{post.category}</span>
                    <span className="post-date-small">{post.date}</span>
                  </div>
                  <h4 className="featured-post-right-title">{post.title}</h4>
                  <div className="featured-post-right-link">
                    Read More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

