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

interface FeaturedPostsCarouselProps {
  posts: BlogPost[]
}

export default function FeaturedPostsCarousel({ posts }: FeaturedPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3)

  // Infinite loop - duplicate slides for seamless transition
  const duplicatedPosts = [...featuredPosts, ...featuredPosts, ...featuredPosts]
  const actualIndex = currentIndex % featuredPosts.length

  useEffect(() => {
    if (featuredPosts.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1
        // Reset to middle section when reaching end
        if (next >= featuredPosts.length * 2) {
          return featuredPosts.length
        }
        return next
      })
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(interval)
  }, [featuredPosts.length])

  // Initialize to middle section for infinite loop
  useEffect(() => {
    if (featuredPosts.length > 0) {
      setCurrentIndex(featuredPosts.length)
    }
  }, [featuredPosts.length])

  if (featuredPosts.length === 0) return null

  const goToSlide = (index: number) => {
    setCurrentIndex(index + featuredPosts.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1
      if (next < featuredPosts.length) {
        return featuredPosts.length * 2 - 1
      }
      return next
    })
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1
      if (next >= featuredPosts.length * 2) {
        return featuredPosts.length
      }
      return next
    })
  }

  return (
    <section className="featured-posts-carousel">
      <div className="container">
        <div className="featured-posts-header">
          <h2 className="featured-posts-title">
            <span className="title-accent"></span>
            Featured Posts
          </h2>
        </div>

        <div className="carousel-wrapper">
          <button 
            className="carousel-btn carousel-btn-prev"
            onClick={goToPrevious}
            aria-label="Previous post"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredPosts.map((post) => (
                <div key={post.id} className="carousel-slide">
                  <Link href={`/blog/${post.slug}`} className="featured-post-card">
                    <div className="featured-post-image">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={400}
                      />
                      <div className="featured-badge">Featured</div>
                    </div>
                    <div className="featured-post-content">
                      <div className="featured-post-meta">
                        <span className="post-category">{post.category}</span>
                        <span className="post-date">{post.date}</span>
                        <span className="post-read-time">{post.readTime}</span>
                      </div>
                      <h3 className="featured-post-title">{post.title}</h3>
                      <p className="featured-post-excerpt">{post.excerpt}</p>
                      <div className="featured-post-link">
                        Read More
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn carousel-btn-next"
            onClick={goToNext}
            aria-label="Next post"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="carousel-indicators">
          {featuredPosts.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

