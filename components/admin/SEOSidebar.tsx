'use client'

import { useState, useEffect, useMemo } from 'react'
import { analyzeSEO, extractImagesFromContent, SEOAnalysis } from '@/lib/seo-analyzer'

interface SEOSidebarProps {
  title: string
  metaTitle: string
  metaDescription: string
  slug: string
  content: string
  focusKeyword: string
  onFocusKeywordChange: (value: string) => void
  onIndexChange: (value: boolean) => void
  onFollowChange: (value: boolean) => void
  indexable: boolean
  follow: boolean
}

export default function SEOSidebar({
  title,
  metaTitle,
  metaDescription,
  slug,
  content,
  focusKeyword,
  onFocusKeywordChange,
  onIndexChange,
  onFollowChange,
  indexable,
  follow
}: SEOSidebarProps) {
  const [imageAlts, setImageAlts] = useState<{ [key: string]: string }>({})

  // Extract images from content
  const images = useMemo(() => {
    return extractImagesFromContent(content)
  }, [content])

  // Analyze SEO
  const seoAnalysis: SEOAnalysis = useMemo(() => {
    return analyzeSEO({
      title: metaTitle || title,
      metaDescription,
      slug,
      content,
      focusKeyword,
      images,
      imageAlts
    })
  }, [title, metaTitle, metaDescription, slug, content, focusKeyword, images, imageAlts])

  // Get color class
  const getColorClass = (color: string) => {
    switch (color) {
      case 'green':
        return 'seo-check-good'
      case 'orange':
        return 'seo-check-warning'
      case 'red':
        return 'seo-check-bad'
      default:
        return ''
    }
  }

  // Get score color class
  const getScoreClass = (color: string) => {
    switch (color) {
      case 'green':
        return 'seo-score-excellent'
      case 'blue':
        return 'seo-score-good'
      case 'orange':
        return 'seo-score-needs-improvement'
      case 'red':
        return 'seo-score-poor'
      default:
        return ''
    }
  }

  // Separate checks into done and undone
  const doneChecks = seoAnalysis.checks.filter(check => check.color === 'green')
  const undoneChecks = seoAnalysis.checks.filter(check => check.color !== 'green')

  return (
    <div className="seo-sidebar">
      {/* SEO Score - Enhanced */}
      <div className={`seo-score-card ${getScoreClass(seoAnalysis.scoreColor)}`}>
        <div className="seo-score-circle">
          <svg className="seo-score-circle-svg" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={seoAnalysis.scoreColor === 'green' ? '#10b981' : seoAnalysis.scoreColor === 'blue' ? '#3b82f6' : seoAnalysis.scoreColor === 'orange' ? '#f59e0b' : '#ef4444'}
              strokeWidth="8"
              strokeDasharray={`${(seoAnalysis.score / 100) * 339.292} 339.292`}
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
              className="seo-score-progress"
            />
          </svg>
          <div className="seo-score-circle-content">
            <div className={`seo-score-value ${getScoreClass(seoAnalysis.scoreColor)}`}>
              {seoAnalysis.score}
            </div>
            <div className="seo-score-max">/100</div>
          </div>
        </div>
        <div className="seo-score-label">
          {seoAnalysis.score >= 80 && 'Excellent'}
          {seoAnalysis.score >= 60 && seoAnalysis.score < 80 && 'Good'}
          {seoAnalysis.score >= 40 && seoAnalysis.score < 60 && 'Needs Improvement'}
          {seoAnalysis.score < 40 && 'Poor'}
        </div>
        <div className="seo-score-stats">
          <div className="seo-score-stat">
            <span className="seo-score-stat-value">{doneChecks.length}</span>
            <span className="seo-score-stat-label">Done</span>
          </div>
          <div className="seo-score-stat">
            <span className="seo-score-stat-value">{undoneChecks.length}</span>
            <span className="seo-score-stat-label">Remaining</span>
          </div>
        </div>
      </div>

      {/* Focus Keyword */}
      <div className="seo-form-group">
        <label className="seo-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <span>Focus Keyword</span>
        </label>
        <input
          type="text"
          value={focusKeyword}
          onChange={(e) => onFocusKeywordChange(e.target.value)}
          placeholder="Enter focus keyword"
          className="seo-input"
        />
        <p className="seo-hint">The keyword you want to rank for</p>
      </div>

      {/* SEO Checks - Done */}
      {doneChecks.length > 0 && (
        <div className="seo-checks-section">
          <h4 className="seo-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Done ({doneChecks.length})</span>
          </h4>
          <div className="seo-checks-list">
            {doneChecks.map((check, index) => (
              <div key={index} className={`seo-check-item ${getColorClass(check.color)}`}>
                <div className="seo-check-icon">
                  ✓
                </div>
                <div className="seo-check-content">
                  <div className="seo-check-name">{check.name}</div>
                  <div className="seo-check-message">{check.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Checks - Undone */}
      {undoneChecks.length > 0 && (
        <div className="seo-checks-section">
          <h4 className="seo-section-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Remaining ({undoneChecks.length})</span>
          </h4>
          <div className="seo-checks-list">
            {undoneChecks.map((check, index) => (
              <div key={index} className={`seo-check-item ${getColorClass(check.color)}`}>
                <div className="seo-check-icon">
                  {check.color === 'orange' && '⚠'}
                  {check.color === 'red' && '✗'}
                </div>
                <div className="seo-check-content">
                  <div className="seo-check-name">{check.name}</div>
                  <div className="seo-check-message">{check.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical SEO */}
      <div className="seo-technical-section">
        <h4 className="seo-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
          </svg>
          <span>Technical SEO</span>
        </h4>
        
        <div className="seo-toggle-group">
          <div className="seo-toggle">
            <div className="seo-toggle-label">
              <span className="seo-toggle-text">Index / NoIndex</span>
              <span className="seo-toggle-desc">Allow search engines to index this page</span>
            </div>
            <div
              className={`seo-switch ${indexable ? 'active' : ''}`}
              onClick={() => onIndexChange(!indexable)}
            ></div>
          </div>

          <div className="seo-toggle">
            <div className="seo-toggle-label">
              <span className="seo-toggle-text">Follow / NoFollow</span>
              <span className="seo-toggle-desc">Allow search engines to follow links</span>
            </div>
            <div
              className={`seo-switch ${follow ? 'active' : ''}`}
              onClick={() => onFollowChange(!follow)}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
