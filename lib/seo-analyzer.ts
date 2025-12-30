// SEO Analysis Utility (Yoast-style)

export interface SEOAnalysis {
  score: number
  scoreColor: 'green' | 'blue' | 'orange' | 'red'
  checks: SEOCheck[]
  snippetPreview: {
    title: string
    url: string
    description: string
  }
}

export interface SEOCheck {
  name: string
  status: 'good' | 'warning' | 'bad'
  message: string
  color: 'green' | 'orange' | 'red'
}

interface AnalyzeSEOProps {
  title: string
  metaDescription: string
  slug: string
  content: string
  focusKeyword: string
  images: string[]
  imageAlts: { [key: string]: string }
}

export function analyzeSEO({
  title,
  metaDescription,
  slug,
  content,
  focusKeyword,
  images,
  imageAlts
}: AnalyzeSEOProps): SEOAnalysis {
  const checks: SEOCheck[] = []
  let totalPoints = 0
  let maxPoints = 0

  const keyword = focusKeyword.toLowerCase().trim()
  const hasKeyword = keyword.length > 0

  // 1. Focus Keyword in Title
  maxPoints += 2
  if (hasKeyword && title.toLowerCase().includes(keyword)) {
    checks.push({
      name: 'Focus Keyword in Title',
      status: 'good',
      message: 'Focus keyword found in title',
      color: 'green'
    })
    totalPoints += 2
  } else if (hasKeyword) {
    checks.push({
      name: 'Focus Keyword in Title',
      status: 'bad',
      message: 'Focus keyword not found in title',
      color: 'red'
    })
  } else {
    checks.push({
      name: 'Focus Keyword in Title',
      status: 'warning',
      message: 'No focus keyword set',
      color: 'orange'
    })
    totalPoints += 1
  }

  // 2. Title Length
  maxPoints += 2
  const titleLength = title.length
  if (titleLength >= 50 && titleLength <= 60) {
    checks.push({
      name: 'Title Length',
      status: 'good',
      message: `Title length is good (${titleLength} characters)`,
      color: 'green'
    })
    totalPoints += 2
  } else if (titleLength < 50) {
    checks.push({
      name: 'Title Length',
      status: 'warning',
      message: `Title is too short (${titleLength} characters, recommended: 50-60)`,
      color: 'orange'
    })
    totalPoints += 1
  } else {
    checks.push({
      name: 'Title Length',
      status: 'warning',
      message: `Title is too long (${titleLength} characters, recommended: 50-60)`,
      color: 'orange'
    })
    totalPoints += 1
  }

  // 3. Meta Description Length
  maxPoints += 2
  const metaLength = metaDescription.length
  if (metaLength >= 120 && metaLength <= 160) {
    checks.push({
      name: 'Meta Description Length',
      status: 'good',
      message: `Meta description length is good (${metaLength} characters)`,
      color: 'green'
    })
    totalPoints += 2
  } else if (metaLength < 120) {
    checks.push({
      name: 'Meta Description Length',
      status: 'bad',
      message: `Meta description is too short (${metaLength} characters, recommended: 120-160)`,
      color: 'red'
    })
  } else {
    checks.push({
      name: 'Meta Description Length',
      status: 'warning',
      message: `Meta description is too long (${metaLength} characters, recommended: 120-160)`,
      color: 'orange'
    })
    totalPoints += 1
  }

  // 4. Focus Keyword in Meta Description
  maxPoints += 2
  if (hasKeyword && metaDescription.toLowerCase().includes(keyword)) {
    checks.push({
      name: 'Focus Keyword in Meta Description',
      status: 'good',
      message: 'Focus keyword found in meta description',
      color: 'green'
    })
    totalPoints += 2
  } else if (hasKeyword) {
    checks.push({
      name: 'Focus Keyword in Meta Description',
      status: 'bad',
      message: 'Focus keyword not found in meta description',
      color: 'red'
    })
  } else {
    checks.push({
      name: 'Focus Keyword in Meta Description',
      status: 'warning',
      message: 'No focus keyword set',
      color: 'orange'
    })
    totalPoints += 1
  }

  // 5. Focus Keyword in URL Slug
  maxPoints += 2
  if (hasKeyword && slug.toLowerCase().includes(keyword.replace(/\s+/g, '-'))) {
    checks.push({
      name: 'Focus Keyword in URL',
      status: 'good',
      message: 'Focus keyword found in URL slug',
      color: 'green'
    })
    totalPoints += 2
  } else if (hasKeyword) {
    checks.push({
      name: 'Focus Keyword in URL',
      status: 'bad',
      message: 'Focus keyword not found in URL slug',
      color: 'red'
    })
  } else {
    checks.push({
      name: 'Focus Keyword in URL',
      status: 'warning',
      message: 'No focus keyword set',
      color: 'orange'
    })
    totalPoints += 1
  }

  // 6. Focus Keyword in First Paragraph
  maxPoints += 2
  if (content) {
    const textContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const firstParagraph = textContent.substring(0, 300).toLowerCase()
    if (hasKeyword && firstParagraph.includes(keyword)) {
      checks.push({
        name: 'Focus Keyword in First Paragraph',
        status: 'good',
        message: 'Focus keyword found in first paragraph',
        color: 'green'
      })
      totalPoints += 2
    } else if (hasKeyword) {
      checks.push({
        name: 'Focus Keyword in First Paragraph',
        status: 'bad',
        message: 'Focus keyword not found in first paragraph',
        color: 'red'
      })
    } else {
      checks.push({
        name: 'Focus Keyword in First Paragraph',
        status: 'warning',
        message: 'No focus keyword set',
        color: 'orange'
      })
      totalPoints += 1
    }
  } else {
    checks.push({
      name: 'Focus Keyword in First Paragraph',
      status: 'bad',
      message: 'No content available',
      color: 'red'
    })
  }

  // 7. Keyword Density
  maxPoints += 2
  if (content && hasKeyword) {
    const textContent = content.replace(/<[^>]*>/g, '').toLowerCase()
    const words = textContent.split(/\s+/).filter(w => w.length > 0)
    const keywordMatches = textContent.match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'))
    const keywordCount = keywordMatches ? keywordMatches.length : 0
    const density = words.length > 0 ? (keywordCount / words.length) * 100 : 0

    if (density >= 0.5 && density <= 2.5) {
      checks.push({
        name: 'Keyword Density',
        status: 'good',
        message: `Keyword density is good (${density.toFixed(2)}%)`,
        color: 'green'
      })
      totalPoints += 2
    } else if (density < 0.5) {
      checks.push({
        name: 'Keyword Density',
        status: 'warning',
        message: `Keyword density is low (${density.toFixed(2)}%, recommended: 0.5-2.5%)`,
        color: 'orange'
      })
      totalPoints += 1
    } else {
      checks.push({
        name: 'Keyword Density',
        status: 'warning',
        message: `Keyword density is high (${density.toFixed(2)}%, recommended: 0.5-2.5%)`,
        color: 'orange'
      })
      totalPoints += 1
    }
  } else {
    checks.push({
      name: 'Keyword Density',
      status: 'warning',
      message: 'No content or focus keyword',
      color: 'orange'
    })
    totalPoints += 1
  }

  // 8. Content Length
  maxPoints += 2
  if (content) {
    const textContent = content.replace(/<[^>]*>/g, '')
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length
    if (wordCount >= 300) {
      checks.push({
        name: 'Content Length',
        status: 'good',
        message: `Content length is good (${wordCount} words)`,
        color: 'green'
      })
      totalPoints += 2
    } else {
      checks.push({
        name: 'Content Length',
        status: 'warning',
        message: `Content is too short (${wordCount} words, recommended: 300+)`,
        color: 'orange'
      })
      totalPoints += 1
    }
  } else {
    checks.push({
      name: 'Content Length',
      status: 'bad',
      message: 'No content available',
      color: 'red'
    })
  }

  // 9. Internal Links
  maxPoints += 2
  const internalLinks = (content.match(/<a[^>]+href=["']\/(?!\/)[^"']+["']/gi) || []).length
  if (internalLinks >= 1) {
    checks.push({
      name: 'Internal Links',
      status: 'good',
      message: `Found ${internalLinks} internal link(s)`,
      color: 'green'
    })
    totalPoints += 2
  } else {
    checks.push({
      name: 'Internal Links',
      status: 'bad',
      message: 'No internal links found (recommended: at least 1)',
      color: 'red'
    })
  }

  // 10. External Links
  maxPoints += 2
  const externalLinks = (content.match(/<a[^>]+href=["']https?:\/\//gi) || []).length
  if (externalLinks >= 1) {
    checks.push({
      name: 'External Links',
      status: 'good',
      message: `Found ${externalLinks} external link(s)`,
      color: 'green'
    })
    totalPoints += 2
  } else {
    checks.push({
      name: 'External Links',
      status: 'warning',
      message: 'No external links found',
      color: 'orange'
    })
    totalPoints += 1
  }

  // 11. Image Alt Text
  maxPoints += 2
  if (images.length === 0) {
    checks.push({
      name: 'Image Alt Text',
      status: 'warning',
      message: 'No images in content',
      color: 'orange'
    })
    totalPoints += 1
  } else {
    const imagesWithoutAlt = images.filter(img => !imageAlts[img] || imageAlts[img].trim() === '')
    if (imagesWithoutAlt.length === 0) {
      checks.push({
        name: 'Image Alt Text',
        status: 'good',
        message: `All ${images.length} image(s) have alt text`,
        color: 'green'
      })
      totalPoints += 2
    } else {
      checks.push({
        name: 'Image Alt Text',
        status: 'bad',
        message: `${imagesWithoutAlt.length} image(s) missing alt text`,
        color: 'red'
      })
    }
  }

  // 12. Readability (Simple check)
  maxPoints += 2
  if (content) {
    const textContent = content.replace(/<[^>]*>/g, '')
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = textContent.split(/\s+/).filter(w => w.length > 0)
    const avgSentenceLength = sentences.length > 0 ? words.length / sentences.length : 0

    if (avgSentenceLength >= 10 && avgSentenceLength <= 20) {
      checks.push({
        name: 'Readability',
        status: 'good',
        message: `Readability is good (avg ${avgSentenceLength.toFixed(1)} words per sentence)`,
        color: 'green'
      })
      totalPoints += 2
    } else if (avgSentenceLength > 20) {
      checks.push({
        name: 'Readability',
        status: 'warning',
        message: `Sentences are too long (avg ${avgSentenceLength.toFixed(1)} words, recommended: 10-20)`,
        color: 'orange'
      })
      totalPoints += 1
    } else {
      checks.push({
        name: 'Readability',
        status: 'warning',
        message: `Sentences are too short (avg ${avgSentenceLength.toFixed(1)} words)`,
        color: 'orange'
      })
      totalPoints += 1
    }
  } else {
    checks.push({
      name: 'Readability',
      status: 'bad',
      message: 'No content available',
      color: 'red'
    })
  }

  // Calculate SEO Score
  // Default score if no content - show as orange (needs improvement)
  if (maxPoints === 0 || (!title && !content)) {
    return {
      score: 0,
      scoreColor: 'orange',
      checks: [{
        name: 'Get Started',
        status: 'warning',
        message: 'Add title and content to see SEO analysis',
        color: 'orange'
      }],
      snippetPreview: {
        title: title || 'SEO Title',
        url: slug ? `https://thecyberassassin.com/${slug}` : 'https://thecyberassassin.com/post-slug',
        description: metaDescription || 'Meta description will appear here...'
      }
    }
  }
  
  const score = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0
  let scoreColor: 'green' | 'blue' | 'orange' | 'red' = 'red'
  if (score >= 80) scoreColor = 'green'
  else if (score >= 60) scoreColor = 'blue'
  else if (score >= 40) scoreColor = 'orange'

  // Snippet Preview
  const snippetPreview = {
    title: title || 'SEO Title',
    url: slug ? `https://thecyberassassin.com/${slug}` : 'https://thecyberassassin.com/post-slug',
    description: metaDescription || 'Meta description will appear here...'
  }

  return {
    score,
    scoreColor,
    checks,
    snippetPreview
  }
}

// Extract images from HTML content
export function extractImagesFromContent(content: string): string[] {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi
  const images: string[] = []
  let match
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1])
  }
  return images
}

