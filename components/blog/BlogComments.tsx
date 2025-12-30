'use client'

import { useState, useEffect } from 'react'

interface BlogCommentsProps {
  postId: string
  postSlug: string
}

interface Comment {
  id: string
  name: string
  email: string
  content: string
  approved: boolean
  createdAt: string
}

export default function BlogComments({ postId, postSlug }: BlogCommentsProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [approvedComments, setApprovedComments] = useState<Comment[]>([])

  // Fetch approved comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${postId}&approved=true`)
        if (response.ok) {
          const data = await response.json()
          setApprovedComments(data.comments || [])
        }
      } catch (err) {
        // Error fetching comments - handled by empty state
      }
    }

    if (postId) {
      fetchComments()
    }
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          name,
          email,
          content: comment,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Reset form
        setName('')
        setEmail('')
        setComment('')
        setSubmitted(true)
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(data.error || 'Failed to submit comment')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="blog-comments">
      <h3 className="blog-comments-title">Comments ({approvedComments.length})</h3>
      
      {/* Display Approved Comments */}
      {approvedComments.length > 0 && (
        <div className="blog-comments-list">
          {approvedComments.map((comment) => (
            <div key={comment.id} className="blog-comment-item">
              <div className="blog-comment-header">
                <div className="blog-comment-author">
                  <strong>{comment.name}</strong>
                  <span className="blog-comment-date">{formatDate(comment.createdAt)}</span>
                </div>
              </div>
              <div className="blog-comment-content">{comment.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* Comment Form */}
      <h4 className="blog-comments-form-title">Leave a Comment</h4>
      
      {submitted && (
        <div className="blog-comments-success">
          Thank you! Your comment has been submitted and is awaiting moderation.
        </div>
      )}

      {error && (
        <div className="blog-comments-error">
          {error}
        </div>
      )}

      <form className="blog-comments-form" onSubmit={handleSubmit}>
        <div className="blog-comments-form-row">
          <div className="blog-comments-form-group">
            <label htmlFor="comment-name" className="blog-comments-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="comment-name"
              className="blog-comments-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>
          
          <div className="blog-comments-form-group">
            <label htmlFor="comment-email" className="blog-comments-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="comment-email"
              className="blog-comments-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="blog-comments-form-group">
          <label htmlFor="comment-text" className="blog-comments-label">
            Comment <span className="required">*</span>
          </label>
          <textarea
            id="comment-text"
            className="blog-comments-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={6}
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          className="blog-comments-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  )
}
