'use client'

import { useMemo } from 'react'
import { SEOAnalysis } from '@/lib/seo-analyzer'

interface SEOFieldsProps {
  title: string
  metaTitle: string
  metaDescription: string
  slug: string
  onMetaTitleChange: (value: string) => void
  onMetaDescriptionChange: (value: string) => void
  onSlugChange: (value: string) => void
  seoAnalysis: SEOAnalysis
}

export default function SEOFields({
  title,
  metaTitle,
  metaDescription,
  slug,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
  seoAnalysis
}: SEOFieldsProps) {
  return (
    <div className="seo-fields-section">
      <h3 className="seo-fields-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
        <span>SEO Settings</span>
      </h3>

      <div className="seo-fields-grid">
        {/* SEO Title */}
        <div className="seo-field-group">
          <label className="seo-field-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>SEO Title</span>
            <span className={`seo-char-count ${metaTitle.length < 50 ? 'seo-char-warning' : metaTitle.length > 60 ? 'seo-char-warning' : 'seo-char-good'}`} style={{ marginLeft: 'auto' }}>
              {metaTitle.length}/60
            </span>
          </label>
          <input
            type="text"
            value={metaTitle}
            onChange={(e) => onMetaTitleChange(e.target.value)}
            placeholder={title || "Enter SEO title"}
            className="seo-field-input"
            maxLength={60}
          />
          <p className="seo-field-hint">Recommended: 50-60 characters</p>
        </div>

        {/* Meta Description */}
        <div className="seo-field-group">
          <label className="seo-field-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>Meta Description</span>
            <span className={`seo-char-count ${metaDescription.length < 120 ? 'seo-char-bad' : metaDescription.length > 160 ? 'seo-char-warning' : 'seo-char-good'}`} style={{ marginLeft: 'auto' }}>
              {metaDescription.length}/160
            </span>
          </label>
          <textarea
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Enter meta description"
            className="seo-field-textarea"
            rows={3}
            maxLength={160}
          />
          <p className="seo-field-hint">Recommended: 120-160 characters</p>
        </div>

        {/* URL Slug */}
        <div className="seo-field-group">
          <label className="seo-field-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <span>URL Slug</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="post-url-slug"
            className="seo-field-input"
          />
        </div>

        {/* Google Preview */}
        <div className="seo-field-group seo-preview-group">
          <label className="seo-field-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span>Google Preview</span>
          </label>
          <div className="seo-snippet">
            <div className="seo-snippet-title">{seoAnalysis.snippetPreview.title || 'SEO Title'}</div>
            <div className="seo-snippet-url">{seoAnalysis.snippetPreview.url}</div>
            <div className="seo-snippet-description">{seoAnalysis.snippetPreview.description || 'Meta description will appear here...'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

