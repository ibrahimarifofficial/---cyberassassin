'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import SEOSidebar from './SEOSidebar'
import SEOFields from './SEOFields'
import { analyzeSEO, extractImagesFromContent } from '@/lib/seo-analyzer'
import '@/css/post-editor.css'

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface Post {
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  featuredImage?: string
  published?: boolean
  featured?: boolean
  category?: string
  tags?: string[]
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  indexable?: boolean
  follow?: boolean
}

interface PostEditorProps {
  post?: Post | null
  onClose: () => void
  onSave: () => void
}

export default function PostEditor({ post, onClose, onSave }: PostEditorProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [published, setPublished] = useState(true)
  const [featured, setFeatured] = useState(false)
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDesc, setNewCategoryDesc] = useState('')
  // SEO fields
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [focusKeyword, setFocusKeyword] = useState('')
  const [indexable, setIndexable] = useState(true)
  const [follow, setFollow] = useState(true)

  useEffect(() => {
    if (post) {
      setTitle(post.title || '')
      setSlug(post.slug || '')
      setExcerpt(post.excerpt || '')
      setContent(post.content || '')
      setFeaturedImage(post.featuredImage || '')
      setPublished(post.published || false)
      setFeatured(post.featured || false)
      setCategory(post.category || '')
      setTags(post.tags || [])
      setMetaTitle(post.metaTitle || '')
      setMetaDescription(post.metaDescription || '')
      setFocusKeyword(post.focusKeyword || '')
      setIndexable(post.indexable !== undefined ? post.indexable : true)
      setFollow(post.follow !== undefined ? post.follow : true)
    }
  }, [post])

  useEffect(() => {
    if (title && !slug) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setSlug(autoSlug)
    }
  }, [title, slug])

  // Auto-generate meta title from title if empty
  useEffect(() => {
    if (title && !metaTitle) {
      setMetaTitle(title)
    }
  }, [title, metaTitle])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (response.ok) {
          const data = await response.json()
          setCategories(data.categories || [])
        }
      } catch (error) {
        // Error fetching categories - handled by empty state
      }
    }
    fetchCategories()
  }, [])

  // Fetch media function
  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch('/api/media')
      if (response.ok) {
        const data = await response.json()
        setMediaFiles(data.media || [])
      }
    } catch (error) {
      // Error fetching media - handled by empty state
    }
  }, [])

  // React Quill modules configuration
  const quillModules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['blockquote', 'code-block'],
          ['clean']
        ],
        handlers: {
          image: function() {
            // Open media library for image selection
            setShowMediaLibrary(true)
            fetchMedia()
          }
        }
      },
      clipboard: {
        matchVisual: false
      }
    }
  }, [fetchMedia])

  // Ref for ReactQuill editor instance
  const quillRef = useRef<any>(null)
  const quillEditorRef = useRef<any>(null)

  const handleImageInsert = (imageUrl: string) => {
    if (quillEditorRef.current) {
      const quill = quillEditorRef.current
      const range = quill.getSelection()
      quill.insertEmbed(range ? range.index : 0, 'image', imageUrl)
    }
    setShowMediaLibrary(false)
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Category name is required')
      return
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCategoryName,
          description: newCategoryDesc
        })
      })

      if (response.ok) {
        const data = await response.json()
        setCategories([...categories, data.category])
        setCategory(data.category.name)
        setShowCategoryModal(false)
        setNewCategoryName('')
        setNewCategoryDesc('')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create category')
      }
    } catch (error) {
      // Error creating category - handled by error state
      alert('Failed to create category')
    }
  }

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setFeaturedImage(data.media.url)
        setShowMediaLibrary(false)
        fetchMedia() // Refresh media library
      } else {
        const errorMessage = data.error || 'Failed to upload image. Please try again.'
        alert(`Upload failed: ${errorMessage}`)
        console.error('Upload error:', data)
      }
    } catch (error: any) {
      // Upload error - handled by error state
      const errorMessage = error.message || 'Failed to upload image. Please check your connection and try again.'
      alert(`Upload failed: ${errorMessage}`)
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleAddTag = () => {
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSave = async () => {
    if (!title || !content) {
      alert('Please fill in title and content')
      return
    }

    setSaving(true)
    try {
      const postData = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt,
        content,
        featuredImage,
        published,
        featured,
        category,
        tags,
        metaTitle: metaTitle || title,
        metaDescription,
        focusKeyword,
        indexable,
        follow,
      }

      const url = post?.id ? `/api/posts/${post.id}` : '/api/posts'
      const method = post?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        onSave()
        onClose()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save post')
      }
    } catch (error) {
      // Error saving post - handled by error state
      alert('Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="post-editor-container">
      <div className="post-editor-wrapper">
        {/* Header */}
        <div className="post-editor-header">
          <h2 className="post-editor-header-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>{post?.id ? 'Edit Post' : 'New Post'}</span>
          </h2>
          <div className="post-editor-header-actions">
            <button
              onClick={onClose}
              className="post-editor-btn post-editor-btn-secondary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="post-editor-btn post-editor-btn-primary"
            >
              {saving ? (
                <>
                  <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Save Post</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="post-editor-content">
          <div className="post-editor-main">
            {/* Title */}
            <div className="post-editor-form-group">
              <label className="post-editor-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>Title <span className="required">*</span></span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="post-editor-input"
              />
            </div>

            {/* Featured Image */}
            <div className="post-editor-form-group post-editor-featured-image">
              <label className="post-editor-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>Featured Image</span>
              </label>
              <div 
                className={`post-editor-image-preview ${featuredImage ? 'has-image' : ''} ${uploading ? 'uploading' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onDragEnter={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const file = e.dataTransfer.files[0]
                  if (file && file.type.startsWith('image/')) {
                    handleFileUpload(file)
                  }
                }}
                onClick={(e) => {
                  if (!featuredImage && !uploading) {
                    e.preventDefault()
                    e.stopPropagation()
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = 'image/*'
                    input.onchange = (event: any) => {
                      const file = event.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }
                    input.click()
                  }
                }}
              >
                {featuredImage ? (
                  <>
                    <Image
                      src={featuredImage}
                      alt="Featured"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <button
                      onClick={() => setFeaturedImage('')}
                      className="post-editor-image-remove"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      <span>Remove</span>
                    </button>
                  </>
                ) : (
                  <div className="post-editor-image-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <p>Drag & drop image here or click to upload</p>
                  </div>
                )}
              </div>
              <div className="post-editor-image-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowMediaLibrary(true)
                    fetchMedia()
                  }}
                  className="post-editor-image-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span>From Media Library</span>
                </button>
                <label className="post-editor-image-btn post-editor-image-btn-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>{uploading ? 'Uploading...' : 'Upload New'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                    style={{ display: 'none' }}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {/* Excerpt */}
            <div className="post-editor-form-group">
              <label className="post-editor-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Excerpt</span>
                <span className={`seo-char-count ${excerpt.length > 160 ? 'seo-char-warning' : 'seo-char-good'}`} style={{ marginLeft: 'auto' }}>
                  {excerpt.length}/160
                </span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the post (max 160 characters)"
                rows={3}
                className="post-editor-textarea"
                maxLength={160}
              />
            </div>

            {/* Content Editor */}
            <div className="post-editor-form-group">
              <label className="post-editor-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <span>Content <span className="required">*</span></span>
              </label>
              {typeof window !== 'undefined' && (
                <div className="post-editor-quill-wrapper">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    {...({
                      ref: (el: any) => {
                        quillRef.current = el
                        if (el) {
                          quillEditorRef.current = el.getEditor()
                        }
                      }
                    } as any)}
                  />
                </div>
              )}
            </div>

            {/* SEO Fields Section - Below Content */}
            <SEOFields
              title={title}
              metaTitle={metaTitle}
              metaDescription={metaDescription}
              slug={slug}
              onMetaTitleChange={setMetaTitle}
              onMetaDescriptionChange={setMetaDescription}
              onSlugChange={setSlug}
              seoAnalysis={useMemo(() => {
                const images = extractImagesFromContent(content)
                return analyzeSEO({
                  title: metaTitle || title,
                  metaDescription,
                  slug,
                  content,
                  focusKeyword,
                  images,
                  imageAlts: {}
                })
              }, [title, metaTitle, metaDescription, slug, content, focusKeyword])}
            />
          </div>

          {/* Sidebar */}
          <div className="post-editor-sidebar">
            {/* Category */}
            <div className="post-editor-sidebar-card">
              <h3 className="post-editor-sidebar-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h16M4 17h16"></path>
                </svg>
                <span>Category</span>
              </h3>
              <div className="post-editor-form-group" style={{ marginBottom: '0.75rem' }}>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="post-editor-select"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="post-editor-btn post-editor-btn-secondary"
                style={{ width: '100%', fontSize: '0.8125rem', padding: '0.5rem 0.75rem' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>New Category</span>
              </button>
            </div>

            {/* Tags */}
            <div className="post-editor-sidebar-card">
              <h3 className="post-editor-sidebar-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>Tags</span>
              </h3>
              <div className="post-editor-tags-container">
                {tags.map((tag) => (
                  <span key={tag} className="post-editor-tag">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="post-editor-tag-remove"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  placeholder="Add tag and press Enter"
                  className="post-editor-tag-input"
                />
              </div>
            </div>

            {/* Options */}
            <div className="post-editor-sidebar-card">
              <h3 className="post-editor-sidebar-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
                </svg>
                <span>Options</span>
              </h3>
              <div className="post-editor-toggle-group">
                <div className="post-editor-toggle">
                  <div className="post-editor-toggle-label">
                    <span className="post-editor-toggle-label-text">Publish</span>
                    <span className="post-editor-toggle-label-desc">Make this post visible to readers</span>
                  </div>
                  <div
                    className={`post-editor-switch ${published ? 'active' : ''}`}
                    onClick={() => setPublished(!published)}
                  ></div>
                </div>
                <div className="post-editor-toggle">
                  <div className="post-editor-toggle-label">
                    <span className="post-editor-toggle-label-text">Featured</span>
                    <span className="post-editor-toggle-label-desc">Show this post in featured section</span>
                  </div>
                  <div
                    className={`post-editor-switch ${featured ? 'active' : ''}`}
                    onClick={() => setFeatured(!featured)}
                  ></div>
                </div>
              </div>
            </div>

            {/* SEO Sidebar */}
            <div className="post-editor-sidebar-card" style={{ padding: 0, border: 'none', background: 'transparent' }}>
              <SEOSidebar
                title={title}
                metaTitle={metaTitle}
                metaDescription={metaDescription}
                slug={slug}
                content={content}
                focusKeyword={focusKeyword}
                onFocusKeywordChange={setFocusKeyword}
                onIndexChange={setIndexable}
                onFollowChange={setFollow}
                indexable={indexable}
                follow={follow}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <div className="post-editor-modal-overlay" onClick={() => setShowMediaLibrary(false)}>
          <div className="post-editor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-editor-modal-header">
              <h3 className="post-editor-modal-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>Media Library</span>
              </h3>
              <button
                onClick={() => setShowMediaLibrary(false)}
                className="post-editor-modal-close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="post-editor-modal-content">
              <div className="post-editor-media-grid">
                {mediaFiles.map((media) => (
                  <div
                    key={media.id}
                    onClick={() => {
                      // Check if we're in editor mode (for content images)
                      if (quillRef.current) {
                        handleImageInsert(media.url)
                      } else {
                        // Featured image mode
                        setFeaturedImage(media.url)
                        setShowMediaLibrary(false)
                      }
                    }}
                    className={`post-editor-media-item ${featuredImage === media.url ? 'selected' : ''}`}
                  >
                    <Image
                      src={media.url}
                      alt={media.filename}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCategoryModal && (
        <div className="post-editor-modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="post-editor-modal" onClick={(e) => e.stopPropagation()}>
            <div className="post-editor-modal-header">
              <h3 className="post-editor-modal-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Create New Category</span>
              </h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="post-editor-modal-close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="post-editor-modal-content">
              <div className="post-editor-form-group">
                <label className="post-editor-label">
                  <span>Category Name <span className="required">*</span></span>
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Technology"
                  className="post-editor-input"
                />
              </div>
              <div className="post-editor-form-group">
                <label className="post-editor-label">
                  <span>Description (Optional)</span>
                </label>
                <textarea
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                  placeholder="Category description"
                  rows={3}
                  className="post-editor-textarea"
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="post-editor-btn post-editor-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  className="post-editor-btn post-editor-btn-primary"
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

