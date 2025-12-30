'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalModal from '@/components/LegalModal'
import BackToTop from '@/components/BackToTop'
import BlogHero from '@/components/blog/BlogHero'
import FeaturedPostsSection from '@/components/blog/FeaturedPostsSection'
import BlogSidebar from '@/components/blog/BlogSidebar'
import BlogList from '@/components/blog/BlogList'
import BlogPagination from '@/components/blog/BlogPagination'
import SortByDropdown from '@/components/blog/SortByDropdown'
import BlogHelpBox from '@/components/blog/BlogHelpBox'

// Empty default posts - only admin-created posts will show
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

const defaultBlogPosts: BlogPost[] = []

type SortOption = 'most-recent' | 'most-old' | 'most-viewed' | 'alphabetical'

export default function BlogArchivePage() {
  useSmoothScroll()
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('most-recent')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    // Fetch posts from database API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts/public')
        if (response.ok) {
          const data = await response.json()
          const dbPosts = data.posts || []
          
          // Convert database posts to blog format
          const convertedPosts = dbPosts.map((p: {
            id: number
            title: string
            content?: string
            excerpt?: string
            featuredImage?: string
            category?: string
            createdAt: string | Date
            slug: string
            featured?: boolean
            views?: number
          }) => {
            const contentLength = (p.content || '').length
            const readTime = Math.ceil(contentLength / 1000) || 5
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
              featured: p.featured || false,
              views: p.views || 0,
            }
          })
          
          // Merge with default posts (for fallback/example posts)
          const existingSlugs = new Set(convertedPosts.map((p: BlogPost) => p.slug))
          const defaultPosts = defaultBlogPosts.filter((p) => !existingSlugs.has(p.slug))
          const allPosts = [...convertedPosts, ...defaultPosts]
          setBlogPosts(allPosts)
        } else {
          // Fallback to default posts if API fails
          setBlogPosts(defaultBlogPosts)
        }
      } catch (error) {
        // Fallback to default posts on error
        setBlogPosts(defaultBlogPosts)
      }
    }

    fetchPosts()
  }, [])

  const [validCategories, setValidCategories] = useState<string[]>([])

  // Fetch valid categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          const categoryNames = (data.categories || []).map((cat: any) => cat.name)
          setValidCategories(categoryNames)
        }
      } catch (error) {
        // Silently fail category fetch
      }
    }
    fetchCategories()
  }, [])

  // Get unique categories from all posts - only show categories that exist in Category model AND have posts
  const categories = useMemo(() => {
    // Get all unique categories from posts, filtering out null, undefined, and empty strings
    const uniqueCats = new Set(
      blogPosts
        .map((p) => p.category)
        .filter((cat) => cat && cat.trim() !== '') // Remove null, undefined, empty
    )
    
    // Only include categories that exist in the Category model
    const validCats = Array.from(uniqueCats).filter((cat) => 
      validCategories.includes(cat)
    )
    
    // Only include 'All' and valid categories that have at least one post
    const cats = ['All', ...validCats]
    
    // Filter to only show categories that actually have posts
    return cats.filter((cat) => {
      if (cat === 'All') return true
      return blogPosts.some((p) => p.category === cat)
    })
  }, [blogPosts, validCategories])

  // Filter posts (include ALL posts, not excluding featured)
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      // Category matching - handle null/undefined categories
      const postCategory = post.category || ''
      const matchesCategory = selectedCategory === 'All' || postCategory === selectedCategory
      
      // Search matching
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      
    return matchesCategory && matchesSearch
  })

    // Sort posts
    switch (sortBy) {
      case 'most-recent':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'most-old':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'most-viewed':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [blogPosts, selectedCategory, searchQuery, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  return (
    <>
      <Header />
      <main>
        <BlogHero />

        {/* Featured Posts Section */}
        <FeaturedPostsSection posts={blogPosts} />

        {/* Main Content Area */}
        <section className="blog-main-content">
          <div className="container">
            <div className="blog-layout">
              {/* Left Side - Main Content */}
              <div className="blog-main">
                {/* Sort By Dropdown */}
                <SortByDropdown
                  value={sortBy}
                  onChange={handleSortChange}
                />

                {/* Blog List */}
                <BlogList posts={paginatedPosts} />

                {/* Pagination */}
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
            </div>

              {/* Right Side - Sidebar */}
              <BlogSidebar
                posts={blogPosts}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>
          </div>
        </section>

        {/* Help Box */}
        <section className="blog-help-section">
          <div className="container">
            <BlogHelpBox />
          </div>
        </section>
      </main>
      <Footer />
      <LegalModal />
      <BackToTop />
      <a href="#blog-hero" className="skip-to-content">Skip to main content</a>
    </>
  )
}


