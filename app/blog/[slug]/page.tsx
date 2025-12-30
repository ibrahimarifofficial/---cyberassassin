'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import ImageWithFallback from '@/components/ImageWithFallback'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import BlogComments from '@/components/blog/BlogComments'
import RelatedTopics from '@/components/blog/RelatedTopics'
import BlogHelpBox from '@/components/blog/BlogHelpBox'

// Empty default posts - only admin-created posts will show
const defaultBlogPosts: any[] = []

// Add default content for posts that don't have it
const getPostContent = (post: any) => {
  if (post.content) return post.content
  return `
    <p>${post.excerpt}</p>
    <p>This article explores the key aspects of ${post.title.toLowerCase()}, providing insights and best practices for organizations looking to enhance their security posture.</p>
    <h2>Key Concepts</h2>
    <p>Understanding the fundamental concepts is crucial for implementing effective security measures. This section covers the essential principles and methodologies.</p>
    <h2>Best Practices</h2>
    <p>Implementing industry best practices can significantly reduce your organization's risk exposure. We'll explore proven strategies and recommendations.</p>
    <h2>Conclusion</h2>
    <p>As the threat landscape continues to evolve, staying informed and proactive is essential. By following the guidelines outlined in this article, you can better protect your organization.</p>
  `
}

export default function SingleBlogPost() {
  useSmoothScroll()
  const params = useParams()
  const slug = params?.slug as string
  
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [allPosts, setAllPosts] = useState<any[]>(defaultBlogPosts)

  useEffect(() => {
    // Fetch posts from database API
    const fetchAllPosts = async () => {
      try {
        const response = await fetch('/api/posts/public')
        if (response.ok) {
          const data = await response.json()
          const dbPosts = data.posts || []
          
          // Convert database posts to blog format
          const convertedPosts = dbPosts.map((p: any) => {
            const readTime = Math.ceil((p.content?.length || 0) / 1000) || 5
            const date = new Date(p.createdAt)
            const plainContent = p.content ? p.content.replace(/<[^>]*>/g, '') : ''
            const excerpt = p.excerpt || plainContent.substring(0, 150) + (plainContent.length > 150 ? '...' : '')
            
            return {
              id: p.id,
              title: p.title,
              excerpt: excerpt,
              image: p.featuredImage || 'https://madebydesignesia.com/php/cyberguard/images/misc/s1.webp',
              category: p.category || 'Blog',
              date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              readTime: `${readTime} min read`,
              slug: p.slug,
              content: p.content,
              author: {
                name: p.author?.name || 'Admin',
                role: 'Content Manager',
                avatar: '/assets/images/logo.png'
              },
              views: p.views || 0,
            }
          })
          
          // Merge with default posts
          const existingSlugs = new Set(convertedPosts.map((p: any) => p.slug))
          const defaultPosts = defaultBlogPosts.filter((p: any) => !existingSlugs.has(p.slug))
          const merged = [...convertedPosts, ...defaultPosts]
          
          setAllPosts(merged)
        } else {
          setAllPosts(defaultBlogPosts)
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        setAllPosts(defaultBlogPosts)
      }
    }

    fetchAllPosts()
  }, [])

  useEffect(() => {
    // Find the post by slug from all posts
    const foundPost = allPosts.find(p => p.slug === slug)
    
    if (foundPost) {
      setPost(foundPost)
      
      // Find related posts
      const related = allPosts
        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
        .slice(0, 3)
      
      if (related.length < 3) {
        const additional = allPosts
          .filter(p => p.id !== foundPost.id && !related.find(r => r.id === p.id))
          .slice(0, 3 - related.length)
        setRelatedPosts([...related, ...additional])
      } else {
        setRelatedPosts(related)
      }
    }
  }, [slug, allPosts])

  if (!post) {
    return (
      <>
        <Header />
        <main className="blog-single-container">
          <div className="container">
            <div className="blog-single-not-found">
              <h1>Post Not Found</h1>
              <p>The blog post you're looking for doesn't exist.</p>
              <Link href="/blog" className="blog-single-back-btn">
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <LegalModal />
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="blog-single-container">
        {/* Hero Section */}
        <section className="blog-single-hero">
          <div className="container">
            <Link href="/blog" className="blog-single-back-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </Link>
            
            <div className="blog-single-hero-content">
              <div className="blog-single-meta-top">
                <span className="blog-single-category">{post.category}</span>
                <span className="blog-single-date">{post.date}</span>
                <span className="blog-single-read-time">{post.readTime}</span>
                {post.views && (
                  <span className="blog-single-views">{post.views} views</span>
                )}
              </div>
              
              <h1 className="blog-single-title">{post.title}</h1>
              <p className="blog-single-excerpt">{post.excerpt}</p>
              
              {/* Author Info */}
              {post.author && (
                <div className="blog-single-author">
                  <div className="blog-single-author-avatar">
                    <ImageWithFallback
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="blog-single-author-info">
                    <div className="blog-single-author-name">{post.author.name}</div>
                    <div className="blog-single-author-role">{post.author.role}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="blog-single-featured-image">
          <div className="container">
            <div className="blog-single-image-wrapper">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                width={1100}
                height={600}
                priority
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="blog-single-content-section">
          <div className="container">
            <div className="blog-single-layout">
              {/* Main Article */}
              <article className="blog-single-article">
                <div 
                  className="blog-single-content"
                  dangerouslySetInnerHTML={{ __html: getPostContent(post) }}
                />
                
                {/* Social Share */}
                <div className="blog-single-social-share">
                  <span className="blog-single-share-label">Share this article:</span>
                  <div className="blog-single-share-buttons">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-single-share-btn"
                      aria-label="Share on Twitter"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M20 3.925a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 011.392 2.498a4.106 4.106 0 001.27 5.478 4.072 4.072 0 01-1.86-.513v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.293a11.616 11.616 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531A8.341 8.341 0 0020 3.925z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-single-share-btn"
                      aria-label="Share on LinkedIn"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M16.667 0H3.333C1.492 0 0 1.492 0 3.333v13.334C0 18.508 1.492 20 3.333 20h13.334C18.508 20 20 18.508 20 16.667V3.333C20 1.492 18.508 0 16.667 0zM6.667 16.667H3.333V6.667h3.334v10zM5 5.5c-1.013 0-1.833-.82-1.833-1.833S3.987 1.833 5 1.833 6.833 2.653 6.833 3.667 6.013 5.5 5 5.5zm11.667 11.167h-3.334v-5c0-1.192-.025-2.725-1.658-2.725-1.658 0-1.917 1.3-1.917 2.642v5.083H6.667V6.667h3.208v1.367h.042c.45-.842 1.55-1.725 3.183-1.725 3.392 0 4.025 2.233 4.025 5.133v5.225z"/>
                      </svg>
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-single-share-btn"
                      aria-label="Share on Facebook"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M18.05.811q.439 0 .744.305t.305.744v16.637q0 .439-.305.744t-.744.305h-4.732v-7.221h2.415l.342-2.854h-2.757v-1.83q0-.659.293-1t1.073-.342h1.488V3.762q-.976-.098-2.171-.098-1.634 0-2.635.993t-1 2.707v2.133H7.951v2.854h2.415v7.221H1.639q-.439 0-.744-.305t-.305-.744V1.859q0-.439.305-.744T1.639.81H18.05z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="blog-single-related-topics-section">
          <div className="container">
            <RelatedTopics currentPost={post} allPosts={allPosts} />
          </div>
        </section>

        {/* Comments Section */}
        <section className="blog-single-comments-section">
          <div className="container">
            <div className="blog-single-layout">
              <BlogComments postId={post.id} postSlug={post.slug} />
            </div>
          </div>
        </section>

        {/* Help Box */}
        <section className="blog-single-help-section">
          <div className="container">
            <BlogHelpBox />
          </div>
        </section>
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
    </>
  )
}

