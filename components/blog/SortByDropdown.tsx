'use client'

import { useState, useRef, useEffect } from 'react'

type SortOption = 'most-recent' | 'most-old' | 'most-viewed' | 'alphabetical'

interface SortByDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'most-recent', label: 'Most Recent' },
  { value: 'most-old', label: 'Most Old' },
  { value: 'most-viewed', label: 'Most Viewed' },
  { value: 'alphabetical', label: 'A-Z' }
]

export default function SortByDropdown({ value, onChange }: SortByDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = sortOptions.find(opt => opt.value === value)

  return (
    <div className="sort-by-section">
      <div className="sort-by-container" ref={dropdownRef}>
        <label className="sort-by-label">Sort By:</label>
        <div className="sort-by-dropdown">
          <button
            className="sort-by-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span>{selectedOption?.label || 'Select'}</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              className={`sort-by-arrow ${isOpen ? 'open' : ''}`}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isOpen && (
            <div className="sort-by-menu">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`sort-by-option ${value === option.value ? 'active' : ''}`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

