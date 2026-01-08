'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import CategoryForm from '@/components/admin/CategoryForm'
import ImageWithFallback from '@/components/ImageWithFallback'
import '@/css/admin-dashboard.css'

// Dynamically import editor to avoid SSR issues
const PostEditor = dynamic(() => import('@/components/admin/PostEditor'), {
  ssr: false,
})

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featuredImage?: string
  published: boolean
  featured: boolean
  views: number
  category?: string
  tags: string[]
  createdAt: string
  author: {
    name?: string
    email: string
  }
}

type ActiveTab = 'dashboard' | 'posts' | 'categories' | 'comments' | 'contacts' | 'subscribers'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showEditor, setShowEditor] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [categories, setCategories] = useState<any[]>([])
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [commentsFilter, setCommentsFilter] = useState<'all' | 'pending' | 'approved'>('pending')
  const [contacts, setContacts] = useState<any[]>([])
  const [allContacts, setAllContacts] = useState<any[]>([])
  const [contactsFilter, setContactsFilter] = useState<'all' | 'unread' | 'read'>('unread')
  const [expandedContact, setExpandedContact] = useState<string | null>(null)
  const [subscribers, setSubscribers] = useState<any[]>([])
  
  // Pagination states
  const [postsPage, setPostsPage] = useState(1)
  const [categoriesPage, setCategoriesPage] = useState(1)
  const [commentsPage, setCommentsPage] = useState(1)
  const [contactsPage, setContactsPage] = useState(1)
  const [subscribersPage, setSubscribersPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchPosts()
      fetchCategories()
      fetchComments()
      fetchAllContacts() // Fetch all contacts for badge count
      fetchContacts()
      fetchSubscribers()
    }
  }, [session])

  useEffect(() => {
    if (activeTab === 'comments') {
      fetchComments()
      setCommentsPage(1) // Reset to page 1 when filter changes
    }
    if (activeTab === 'contacts') {
      fetchAllContacts() // Always fetch all contacts for email-like view
      setContactsPage(1) // Reset to page 1 when filter changes
    }
    if (activeTab === 'subscribers') {
      fetchSubscribers()
      setSubscribersPage(1) // Reset to page 1 when tab changes
    }
    if (activeTab === 'posts') {
      setPostsPage(1) // Reset to page 1 when tab changes
    }
    if (activeTab === 'categories') {
      setCategoriesPage(1) // Reset to page 1 when tab changes
    }
  }, [activeTab, commentsFilter])

  const fetchAllContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const data = await response.json()
        setAllContacts(data.contacts || [])
      }
    } catch (error) {
      console.error('Error fetching all contacts:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchComments = async () => {
    try {
      let url = '/api/comments'
      if (commentsFilter === 'pending') {
        url = '/api/comments?approved=false'
      } else if (commentsFilter === 'approved') {
        url = '/api/comments?approved=true'
      }
      // 'all' case - no query params needed
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      } else {
        console.error('Failed to fetch comments:', response.status)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const fetchContacts = async () => {
    try {
      let url = '/api/contacts'
      if (contactsFilter === 'unread') {
        url = '/api/contacts?read=false'
      } else if (contactsFilter === 'read') {
        url = '/api/contacts?read=true'
      }
      // 'all' case - no query params needed
      
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts || [])
        // Also update allContacts for badge count
        if (contactsFilter === 'all') {
          setAllContacts(data.contacts || [])
        } else {
          // Refetch all to update badge
          fetchAllContacts()
        }
      } else {
        console.error('Failed to fetch contacts:', response.status)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleContactClick = async (contactId: string, isRead: boolean) => {
    // Toggle expanded state
    if (expandedContact === contactId) {
      setExpandedContact(null)
    } else {
      setExpandedContact(contactId)
      // Mark as read when opening
      if (!isRead) {
        await handleMarkContactRead(contactId, true)
      }
    }
  }

  const handleMarkContactRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read }),
      })
      if (response.ok) {
        // Update local state immediately for better UX
        setAllContacts(prev => prev.map(contact => 
          contact.id === id ? { ...contact, read } : contact
        ))
        fetchAllContacts() // Sync with server
      }
    } catch (error) {
      alert('Failed to update contact')
    }
  }

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Delete this contact query?')) return
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchContacts()
        fetchAllContacts() // Update badge count
      }
    } catch (error) {
      alert('Failed to delete contact')
    }
  }

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/subscribers')
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data.subscribers || [])
      } else {
        console.error('Failed to fetch subscribers:', response.status)
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    }
  }

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Delete this subscriber?')) return
    try {
      const response = await fetch(`/api/subscribers/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchSubscribers()
      }
    } catch (error) {
      alert('Failed to delete subscriber')
    }
  }

  const handleToggleSubscriberActive = async (id: string, active: boolean) => {
    try {
      const response = await fetch(`/api/subscribers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      })
      if (response.ok) {
        fetchSubscribers()
      }
    } catch (error) {
      alert('Failed to update subscriber')
    }
  }

  const handleApproveComment = async (id: string) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      })
      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      alert('Failed to approve comment')
    }
  }

  const handleRejectComment = async (id: string) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false }),
      })
      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      alert('Failed to reject comment')
    }
  }

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Delete this comment?')) return
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      alert('Failed to delete comment')
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewPost = () => {
    setSelectedPost(null)
    setShowEditor(true)
  }

  const handleEditPost = (post: Post) => {
    setSelectedPost(post)
    setShowEditor(true)
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
        if (selectedPost?.id === id) {
          setSelectedPost(null)
          setShowEditor(false)
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    }
  }

  const handleEditorClose = () => {
    setShowEditor(false)
    setSelectedPost(null)
    fetchPosts()
  }

  if (status === 'loading') {
    return (
      <div className="admin-loading">
        <div>Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  if (showEditor) {
    return (
      <PostEditor
        post={selectedPost}
        onClose={handleEditorClose}
        onSave={fetchPosts}
      />
    )
  }

  const publishedPosts = posts.filter(p => p.published).length
  const draftPosts = posts.filter(p => !p.published).length
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0)
  const pendingComments = comments.filter((c: any) => !c.approved).length
  const approvedComments = comments.filter((c: any) => c.approved).length
  const totalContacts = allContacts.length
  const unreadContacts = allContacts.filter((c: any) => !c.read).length
  const totalSubscribers = subscribers.length
  const activeSubscribers = subscribers.filter((s: any) => s.active).length
  const userInitials = (session.user?.name || session.user?.email || 'A').charAt(0).toUpperCase()

  // Pagination helper function
  const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
    if (totalPages <= 1) return null
    
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return (
      <div className="admin-pagination">
        <button
          className="admin-pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Previous
        </button>
        
        <div className="admin-pagination-pages">
          {startPage > 1 && (
            <>
              <button className="admin-pagination-page" onClick={() => onPageChange(1)}>1</button>
              {startPage > 2 && <span className="admin-pagination-ellipsis">...</span>}
            </>
          )}
          {pages.map(page => (
            <button
              key={page}
              className={`admin-pagination-page ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="admin-pagination-ellipsis">...</span>}
              <button className="admin-pagination-page" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            </>
          )}
        </div>
        
        <button
          className="admin-pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    )
  }

  // Pagination calculations
  const getPaginatedItems = <T,>(items: T[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    return {
      paginatedItems: items.slice(startIndex, endIndex),
      totalPages: Math.ceil(items.length / perPage)
    }
  }

  const postsPagination = getPaginatedItems(posts, postsPage, itemsPerPage)
  const categoriesPagination = getPaginatedItems(categories, categoriesPage, itemsPerPage)
  const commentsPagination = getPaginatedItems(comments, commentsPage, itemsPerPage)
  const contactsPagination = getPaginatedItems(allContacts, contactsPage, itemsPerPage)
  const subscribersPagination = getPaginatedItems(subscribers, subscribersPage, itemsPerPage)

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-sidebar-logo">
            <ImageWithFallback
              src="/assets/images/dashboardlogo.png"
              alt="CyberAssassin Logo"
              width={150}
              height={150}
              className="admin-sidebar-logo-img"
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section">
            <p className="admin-nav-section-title">Main</p>
            <button
              className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="admin-nav-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              <span>Dashboard</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <span className="admin-nav-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </span>
              <span>Posts</span>
              {posts.length > 0 && (
                <span className="admin-nav-item-badge">{posts.length}</span>
              )}
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <span className="admin-nav-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h16M4 17h16"></path>
                </svg>
              </span>
              <span>Categories</span>
              {categories.length > 0 && (
                <span className="admin-nav-item-badge">{categories.length}</span>
              )}
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              <span className="admin-nav-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </span>
              <span>Comments</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <span className="admin-nav-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <span>Contact Queries</span>
              {allContacts.filter((c: any) => !c.read).length > 0 && (
                <span className="admin-nav-item-badge">{allContacts.filter((c: any) => !c.read).length}</span>
              )}
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'subscribers' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscribers')}
            >
              <span className="admin-nav-item-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span>Subscribers</span>
              {subscribers.length > 0 && (
                <span className="admin-nav-item-badge">{subscribers.length}</span>
              )}
            </button>
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">{userInitials}</div>
            <div className="admin-user-details">
              <p className="admin-user-name">{session.user?.name || 'Admin'}</p>
              <p className="admin-user-email">{session.user?.email}</p>
            </div>
          </div>
          <button
            className="admin-logout-btn"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Header */}
        <header className="admin-header">
          <h1 className="admin-header-title">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'posts' && 'Posts'}
            {activeTab === 'categories' && 'Categories'}
            {activeTab === 'comments' && 'Comments'}
            {activeTab === 'contacts' && 'Contact Queries'}
            {activeTab === 'subscribers' && 'Subscribers'}
          </h1>
          <div className="admin-header-actions">
            {activeTab === 'posts' && (
              <button className="admin-header-btn" onClick={handleNewPost}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>New Post</span>
              </button>
            )}
            {activeTab === 'categories' && (
              <button
                className="admin-header-btn"
                onClick={() => setEditingCategory({ name: '', description: '' })}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>New Category</span>
              </button>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="admin-content-wrapper">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="admin-dashboard-tab">
              {/* Stats Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Total Posts</h3>
                    <div className="admin-stat-icon posts">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{posts.length}</p>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Published</h3>
                    <div className="admin-stat-icon published">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{publishedPosts}</p>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Pending Comments</h3>
                    <div className="admin-stat-icon drafts">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{pendingComments}</p>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Total Comments</h3>
                    <div className="admin-stat-icon published">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{comments.length}</p>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Queries</h3>
                    <div className="admin-stat-icon drafts">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{unreadContacts}</p>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Categories</h3>
                    <div className="admin-stat-icon views">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 7h16M4 12h16M4 17h16"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{categories.length}</p>
                </div>
                <div className="admin-stat-card">
                  <div className="admin-stat-header">
                    <h3 className="admin-stat-title">Total Subscribers</h3>
                    <div className="admin-stat-icon published">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="admin-stat-value">{totalSubscribers}</p>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="admin-content-card">
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    <span>Recent Posts</span>
                  </h2>
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => setActiveTab('posts')}
                  >
                    View All
                  </button>
                </div>
                {loading ? (
                  <div className="admin-loading">Loading posts...</div>
                ) : posts.length === 0 ? (
                  <div className="admin-empty-state">
                    <div className="admin-empty-state-icon">📝</div>
                    <h3 className="admin-empty-state-title">No posts yet</h3>
                    <p className="admin-empty-state-text">Create your first post to get started</p>
                    <button className="admin-btn admin-btn-primary" onClick={handleNewPost}>
                      Create Post
                    </button>
                  </div>
                ) : (
                  <div className="admin-posts-list">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="admin-post-item" onClick={() => handleEditPost(post)}>
                        {post.featuredImage && (
                          <div className="admin-post-image">
                            <Image
                              src={post.featuredImage}
                              alt={post.title}
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        )}
                        <div className="admin-post-content">
                          <h3 className="admin-post-title">{post.title}</h3>
                          <div className="admin-post-meta">
                            <span className="admin-post-meta-item">
                              {post.published ? (
                                <>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                  <span>Published</span>
                                </>
                              ) : (
                                <>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                  </svg>
                                  <span>Draft</span>
                                </>
                              )}
                            </span>
                            {post.featured && (
                              <span className="admin-post-meta-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span>Featured</span>
                              </span>
                            )}
                            <span className="admin-post-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              <span>{post.views} views</span>
                            </span>
                            <span className="admin-post-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                          {post.excerpt && (
                            <p className="admin-post-excerpt">{post.excerpt}</p>
                          )}
                        </div>
                        <div className="admin-post-actions">
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditPost(post)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePost(post.id)
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Comments */}
              <div className="admin-content-card" style={{ marginTop: 'var(--spacing-xl)' }}>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Recent Comments</span>
                  </h2>
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => setActiveTab('comments')}
                  >
                    View All
                  </button>
                </div>
                {comments.length === 0 ? (
                  <div className="admin-empty-state" style={{ padding: 'var(--spacing-xl)' }}>
                    <div className="admin-empty-state-icon">💬</div>
                    <h3 className="admin-empty-state-title">No comments yet</h3>
                    <p className="admin-empty-state-text">Comments will appear here once users start engaging</p>
                  </div>
                ) : (
                  <div className="admin-comments-list admin-comments-list-compact">
                    {comments.slice(0, 5).map((comment: any) => (
                      <div key={comment.id} className={`admin-comment-item admin-comment-item-compact ${comment.approved ? 'approved' : 'pending'}`}>
                        <div className="admin-comment-header">
                          <div className="admin-comment-author">
                            <strong>{comment.name}</strong>
                            <span className="admin-comment-email">{comment.email}</span>
                            <span className="admin-comment-date">
                              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className={`admin-comment-status ${comment.approved ? 'approved' : 'pending'}`}>
                            {comment.approved ? '✓' : '⏳'}
                          </div>
                        </div>
                        <div className="admin-comment-post">
                          <Link href={`/blog/${comment.post?.slug || ''}`} className="admin-comment-post-link">
                            {comment.post?.title || 'Unknown Post'}
                          </Link>
                        </div>
                        <div className="admin-comment-content">{comment.content.length > 100 ? comment.content.substring(0, 100) + '...' : comment.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Contacts */}
              <div className="admin-content-card" style={{ marginTop: 'var(--spacing-xl)' }}>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>Recent Contact Queries</span>
                  </h2>
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => setActiveTab('contacts')}
                  >
                    View All
                  </button>
                </div>
                {allContacts.length === 0 ? (
                  <div className="admin-empty-state" style={{ padding: 'var(--spacing-xl)' }}>
                    <div className="admin-empty-state-icon">📧</div>
                    <h3 className="admin-empty-state-title">No contact queries yet</h3>
                    <p className="admin-empty-state-text">Contact form submissions will appear here</p>
                  </div>
                ) : (
                  <div className="admin-email-list">
                    {allContacts.slice(0, 5).map((contact: any) => (
                      <div
                        key={contact.id}
                        className={`admin-contact-item ${contact.read ? 'read' : 'unread'} ${expandedContact === contact.id ? 'expanded' : ''}`}
                        onClick={() => handleContactClick(contact.id, contact.read)}
                      >
                        <div className="admin-contact-item-header">
                          <div className="admin-contact-item-info">
                            <span className={`admin-contact-item-name ${!contact.read ? 'unread-text' : ''}`}>{contact.name}</span>
                            <span className={`admin-contact-item-subject ${!contact.read ? 'unread-text' : ''}`}>{contact.subject}</span>
                          </div>
                          <span className={`admin-contact-item-date ${!contact.read ? 'unread-text' : ''}`}>
                            {new Date(contact.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        {expandedContact === contact.id && (
                          <div className="admin-contact-item-expanded-content">
                            <p><strong>From:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                            {contact.phone && <p><strong>Phone:</strong> <a href={`tel:${contact.phone}`}>{contact.phone}</a></p>}
                            <p><strong>Message:</strong></p>
                            <p className="admin-contact-item-message-full">{contact.message}</p>
                            <div className="admin-contact-item-actions">
                              <a
                                href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
                                className="admin-btn admin-btn-secondary admin-btn-sm"
                                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                Reply
                              </a>
                              <button
                                className="admin-btn admin-btn-danger admin-btn-sm"
                                onClick={(e) => { e.stopPropagation(); handleDeleteContact(contact.id); }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="admin-content-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  <span>All Posts ({posts.length})</span>
                </h2>
              </div>
              {loading ? (
                <div className="admin-loading">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-state-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="admin-empty-state-title">No posts yet</h3>
                  <p className="admin-empty-state-text">Create your first post to get started</p>
                  <button className="admin-btn admin-btn-primary" onClick={handleNewPost}>
                    Create Post
                  </button>
                </div>
              ) : (
                <>
                  <div className="admin-posts-list">
                    {postsPagination.paginatedItems.map((post) => (
                    <div key={post.id} className="admin-post-item" onClick={() => handleEditPost(post)}>
                      {post.featuredImage && (
                        <div className="admin-post-image">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div className="admin-post-content">
                        <h3 className="admin-post-title">{post.title}</h3>
                        <div className="admin-post-meta">
                          <span className="admin-post-meta-item">
                            {post.published ? (
                              <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Published</span>
                              </>
                            ) : (
                              <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <span>Draft</span>
                              </>
                            )}
                          </span>
                          {post.featured && (
                            <span className="admin-post-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span>Featured</span>
                            </span>
                          )}
                          <span className="admin-post-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span>{post.views} views</span>
                          </span>
                          <span className="admin-post-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </span>
                          {post.category && (
                            <span className="admin-post-meta-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 7h16M4 12h16M4 17h16"></path>
                              </svg>
                              <span>{post.category}</span>
                            </span>
                          )}
                        </div>
                        {post.excerpt && (
                          <p className="admin-post-excerpt">{post.excerpt}</p>
                        )}
                      </div>
                      <div className="admin-post-actions">
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditPost(post)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePost(post.id)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={postsPage}
                    totalPages={postsPagination.totalPages}
                    onPageChange={setPostsPage}
                  />
                </>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="admin-content-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16M4 12h16M4 17h16"></path>
                  </svg>
                  <span>Categories ({categories.length})</span>
                </h2>
              </div>
              {categories.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-state-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7h16M4 12h16M4 17h16"></path>
                    </svg>
                  </div>
                  <h3 className="admin-empty-state-title">No categories yet</h3>
                  <p className="admin-empty-state-text">Create your first category to organize posts</p>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setEditingCategory({ name: '', description: '' })}
                  >
                    Create Category
                  </button>
                </div>
              ) : (
                <>
                  <div className="admin-categories-list">
                    {categoriesPagination.paginatedItems.map((cat) => (
                    <div key={cat.id} className="admin-category-item">
                      <div className="admin-category-info">
                        <h3 className="admin-category-name">{cat.name}</h3>
                        {cat.description && (
                          <p className="admin-category-description">{cat.description}</p>
                        )}
                        <p className="admin-category-slug">Slug: {cat.slug}</p>
                      </div>
                      <div className="admin-post-actions">
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          onClick={() => setEditingCategory(cat)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={async () => {
                            if (confirm('Delete this category?')) {
                              try {
                                const response = await fetch(`/api/categories/${cat.id}`, {
                                  method: 'DELETE'
                                })
                                if (response.ok) {
                                  fetchCategories()
                                }
                              } catch (error) {
                                alert('Failed to delete category')
                              }
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={categoriesPage}
                    totalPages={categoriesPagination.totalPages}
                    onPageChange={setCategoriesPage}
                  />
                </>
              )}
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="admin-content-section">
              <div className="admin-content-header">
                <h2 className="admin-content-title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>Contact Queries ({allContacts.length})</span>
                </h2>
              </div>
              {allContacts.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-state-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <h3 className="admin-empty-state-title">No contact queries yet</h3>
                  <p className="admin-empty-state-text">Contact form submissions will appear here</p>
                </div>
              ) : (
                <>
                  <div className="admin-email-list">
                    {contactsPagination.paginatedItems.map((contact: any) => {
                    const isExpanded = expandedContact === contact.id
                    const isUnread = !contact.read
                    return (
                      <div 
                        key={contact.id} 
                        className={`admin-email-item ${isUnread ? 'unread' : 'read'} ${isExpanded ? 'expanded' : ''}`}
                        onClick={() => handleContactClick(contact.id, contact.read)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="admin-email-header">
                          <div className="admin-email-sender">
                            <span className={`admin-email-name ${isUnread ? 'unread-text' : ''}`}>
                              {contact.name}
                            </span>
                            <span className={`admin-email-subject ${isUnread ? 'unread-text' : ''}`}>
                              {contact.subject}
                            </span>
                          </div>
                          <div className="admin-email-meta">
                            <span className={`admin-email-date ${isUnread ? 'unread-text' : ''}`}>
                              {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: new Date(contact.createdAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                              })}
                            </span>
                            {contact.phone && (
                              <span className={`admin-email-phone ${isUnread ? 'unread-text' : ''}`}>
                                {contact.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        {isExpanded && (
                          <div className="admin-email-body" onClick={(e) => e.stopPropagation()}>
                            <div className="admin-email-details">
                              <div className="admin-email-detail-row">
                                <strong>From:</strong> {contact.email}
                              </div>
                              {contact.phone && (
                                <div className="admin-email-detail-row">
                                  <strong>Phone:</strong> {contact.phone}
                                </div>
                              )}
                              <div className="admin-email-detail-row">
                                <strong>Date:</strong> {new Date(contact.createdAt).toLocaleString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                              <div className="admin-email-detail-row">
                                <strong>Subject:</strong> {contact.subject}
                              </div>
                            </div>
                            <div className="admin-email-message">
                              <p>{contact.message}</p>
                            </div>
                            <div className="admin-email-actions">
                              <a
                                href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject)}`}
                                className="admin-btn admin-btn-secondary admin-btn-sm"
                                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                Reply
                              </a>
                              <button
                                className="admin-btn admin-btn-danger admin-btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteContact(contact.id)
                                }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  </div>
                  <Pagination
                    currentPage={contactsPage}
                    totalPages={contactsPagination.totalPages}
                    onPageChange={setContactsPage}
                  />
                </>
              )}
            </div>
          )}

          {/* Subscribers Tab */}
          {activeTab === 'subscribers' && (
            <div className="admin-content-section">
              <div className="admin-content-header">
                <h2 className="admin-content-title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Subscribers ({subscribers.length})</span>
                </h2>
              </div>
              {subscribers.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-state-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="admin-empty-state-title">No subscribers yet</h3>
                  <p className="admin-empty-state-text">Subscribers will appear here once users subscribe to your newsletter</p>
                </div>
              ) : (
                <>
                  <div className="admin-email-list">
                    {subscribersPagination.paginatedItems.map((subscriber: any) => (
                    <div key={subscriber.id} className={`admin-email-item ${subscriber.active ? 'read' : ''}`}>
                      <div className="admin-email-header">
                        <div className="admin-email-sender">
                          <span className={`admin-email-name ${subscriber.active ? '' : 'unread-text'}`} style={{ minWidth: 'auto' }}>
                            {subscriber.email}
                          </span>
                        </div>
                        <div className="admin-email-meta">
                          <span className={`admin-email-date ${subscriber.active ? '' : 'unread-text'}`}>
                            {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: new Date(subscriber.createdAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
                            })}
                          </span>
                          <div className="admin-comment-actions" style={{ marginTop: 0, gap: '0.5rem' }}>
                            {subscriber.active ? (
                              <button
                                className="admin-btn admin-btn-warning admin-btn-sm"
                                onClick={() => handleToggleSubscriberActive(subscriber.id, subscriber.active)}
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <line x1="12" y1="8" x2="12" y2="12"></line>
                                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                Deactivate
                              </button>
                            ) : (
                              <button
                                className="admin-btn admin-btn-success admin-btn-sm"
                                onClick={() => handleToggleSubscriberActive(subscriber.id, subscriber.active)}
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Activate
                              </button>
                            )}
                            <button
                              className="admin-btn admin-btn-danger admin-btn-sm"
                              onClick={() => handleDeleteSubscriber(subscriber.id)}
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={subscribersPage}
                    totalPages={subscribersPagination.totalPages}
                    onPageChange={setSubscribersPage}
                  />
                </>
              )}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="admin-content-section">
              <div className="admin-content-header">
                <h2 className="admin-content-title">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>Comments ({comments.length})</span>
                </h2>
                <div className="admin-comments-filters">
                  <button
                    className={`admin-filter-btn ${commentsFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setCommentsFilter('pending')}
                  >
                    Pending
                  </button>
                  <button
                    className={`admin-filter-btn ${commentsFilter === 'approved' ? 'active' : ''}`}
                    onClick={() => setCommentsFilter('approved')}
                  >
                    Approved
                  </button>
                  <button
                    className={`admin-filter-btn ${commentsFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setCommentsFilter('all')}
                  >
                    All
                  </button>
                </div>
              </div>
              {comments.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-state-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="admin-empty-state-title">No comments yet</h3>
                  <p className="admin-empty-state-text">
                    {commentsFilter === 'pending' 
                      ? 'No pending comments awaiting approval'
                      : commentsFilter === 'approved'
                      ? 'No approved comments'
                      : 'No comments found'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="admin-comments-list">
                    {commentsPagination.paginatedItems.map((comment: any) => (
                    <div key={comment.id} className={`admin-comment-item ${comment.approved ? 'approved' : 'pending'}`}>
                      <div className="admin-comment-header">
                        <div className="admin-comment-author">
                          <strong>{comment.name}</strong>
                          <span className="admin-comment-email">{comment.email}</span>
                          <span className="admin-comment-date">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div className={`admin-comment-status ${comment.approved ? 'approved' : 'pending'}`}>
                          {comment.approved ? (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Approved
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                              </svg>
                              Pending
                            </>
                          )}
                        </div>
                      </div>
                      <div className="admin-comment-post">
                        <Link href={`/blog/${comment.post?.slug || ''}`} className="admin-comment-post-link">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          {comment.post?.title || 'Unknown Post'}
                        </Link>
                      </div>
                      <div className="admin-comment-content">{comment.content}</div>
                      <div className="admin-comment-actions">
                        {!comment.approved ? (
                          <button
                            className="admin-btn admin-btn-success admin-btn-sm"
                            onClick={() => handleApproveComment(comment.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Approve
                          </button>
                        ) : (
                          <button
                            className="admin-btn admin-btn-warning admin-btn-sm"
                            onClick={() => handleRejectComment(comment.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            Reject
                          </button>
                        )}
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={commentsPage}
                    totalPages={commentsPagination.totalPages}
                    onPageChange={setCommentsPage}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="admin-modal-overlay" onClick={() => setEditingCategory(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editingCategory.id ? 'Edit Category' : 'New Category'}
              </h2>
            </div>
            <CategoryForm
              category={editingCategory}
              onSave={async (name: string, description: string) => {
                try {
                  const url = editingCategory.id
                    ? `/api/categories/${editingCategory.id}`
                    : '/api/categories'
                  const method = editingCategory.id ? 'PUT' : 'POST'
                  
                  const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, description })
                  })

                  if (response.ok) {
                    fetchCategories()
                    setEditingCategory(null)
                  } else {
                    const error = await response.json()
                    alert(error.error || 'Failed to save category')
                  }
                } catch (error) {
                  alert('Failed to save category')
                }
              }}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
