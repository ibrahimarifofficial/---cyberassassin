'use client'

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
  views?: number
}

interface RelatedTopicsProps {
  currentPost: BlogPost
  allPosts: BlogPost[]
}

// Algorithm to find related topics based on keywords, intent, and category
function findRelatedTopics(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  const related: { post: BlogPost; score: number }[] = []
  
  // Extract keywords from title and excerpt
  const currentKeywords = extractKeywords(currentPost.title + ' ' + currentPost.excerpt)
  const currentCategory = currentPost.category
  
  allPosts.forEach(post => {
    if (post.id === currentPost.id) return
    
    let score = 0
    
    // Category match (highest weight)
    if (post.category === currentCategory) {
      score += 50
    }
    
    // Keyword matching
    const postKeywords = extractKeywords(post.title + ' ' + post.excerpt)
    const commonKeywords = currentKeywords.filter(k => postKeywords.includes(k))
    score += commonKeywords.length * 10
    
    // Intent matching (similar topics)
    const intentMatch = calculateIntentMatch(currentPost, post)
    score += intentMatch * 15
    
    // Views boost (popularity)
    if (post.views && post.views > 500) {
      score += 5
    }
    
    if (score > 0) {
      related.push({ post, score })
    }
  })
  
  // Sort by score and return top 4
  return related
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(item => item.post)
}

function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
  
  // Remove common stop words
  const stopWords = ['this', 'that', 'with', 'from', 'have', 'will', 'your', 'they', 'them', 'their', 'there', 'these', 'those', 'what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how', 'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'because', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except', 'inside', 'outside', 'through', 'throughout', 'toward', 'under', 'until', 'within', 'without']
  
  return words.filter(word => !stopWords.includes(word))
}

function calculateIntentMatch(post1: BlogPost, post2: BlogPost): number {
  const intentKeywords: { [key: string]: string[] } = {
    'security': ['security', 'protection', 'defense', 'secure', 'threat', 'attack', 'vulnerability', 'breach'],
    'ai': ['ai', 'artificial', 'intelligence', 'machine', 'learning', 'automation', 'algorithm'],
    'cloud': ['cloud', 'aws', 'azure', 'gcp', 'infrastructure', 'serverless'],
    'compliance': ['compliance', 'gdpr', 'hipaa', 'pci', 'regulation', 'legal', 'policy'],
    'training': ['training', 'education', 'awareness', 'human', 'social', 'engineering'],
    'testing': ['testing', 'penetration', 'audit', 'assessment', 'vulnerability'],
    'response': ['response', 'incident', 'soc', 'monitoring', 'detection'],
    'endpoint': ['endpoint', 'device', 'mobile', 'remote', 'work'],
    'network': ['network', 'zero', 'trust', 'segmentation', 'firewall'],
    'iot': ['iot', 'device', 'smart', 'connected', 'sensor']
  }
  
  let match = 0
  const text1 = (post1.title + ' ' + post1.excerpt).toLowerCase()
  const text2 = (post2.title + ' ' + post2.excerpt).toLowerCase()
  
  Object.keys(intentKeywords).forEach(intent => {
    const keywords = intentKeywords[intent]
    const hasIntent1 = keywords.some(k => text1.includes(k))
    const hasIntent2 = keywords.some(k => text2.includes(k))
    
    if (hasIntent1 && hasIntent2) {
      match++
    }
  })
  
  return match
}

export default function RelatedTopics({ currentPost, allPosts }: RelatedTopicsProps) {
  const relatedTopics = findRelatedTopics(currentPost, allPosts)

  if (relatedTopics.length === 0) {
    return null
  }

  return (
    <div className="blog-related-topics">
      <h3 className="blog-related-topics-title">Related Topics</h3>
      <div className="blog-related-topics-grid">
        {relatedTopics.map((topic) => (
          <Link
            key={topic.id}
            href={`/blog/${topic.slug}`}
            className="blog-related-topic-card"
          >
            <div className="blog-related-topic-image">
              <ImageWithFallback
                src={topic.image}
                alt={topic.title}
                width={200}
                height={120}
              />
            </div>
            <div className="blog-related-topic-content">
              <span className="blog-related-topic-category">{topic.category}</span>
              <h4 className="blog-related-topic-title">{topic.title}</h4>
              <div className="blog-related-topic-meta">
                <span>{topic.date}</span>
                <span>•</span>
                <span>{topic.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

