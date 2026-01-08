'use client'

export default function BlogShimmerLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="blog-list">
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className="blog-list-item blog-shimmer-item">
          <div className="blog-list-link">
            <div className="blog-list-image shimmer-image">
              <div className="shimmer-effect"></div>
            </div>
            <div className="blog-list-content">
              <div className="blog-list-meta">
                <span className="blog-list-category shimmer-text shimmer-text-small"></span>
                <span className="blog-list-date shimmer-text shimmer-text-small"></span>
                <span className="blog-list-read-time shimmer-text shimmer-text-small"></span>
              </div>
              <h3 className="blog-list-title shimmer-text shimmer-text-title"></h3>
              <p className="blog-list-excerpt shimmer-text shimmer-text-excerpt"></p>
              <div className="blog-list-footer">
                <span className="blog-list-read-more shimmer-text shimmer-text-link"></span>
              </div>
            </div>
          </div>
        </article>
      ))}
      <style jsx>{`
        .blog-shimmer-item {
          pointer-events: none;
          user-select: none;
        }

        .shimmer-effect {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 200% 100%;
          animation: shimmer-loading 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .shimmer-image {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .shimmer-text {
          display: block;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 200% 100%;
          animation: shimmer-loading 1.5s ease-in-out infinite;
          border-radius: 4px;
          height: 1em;
          margin-bottom: 0.5rem;
        }

        .shimmer-text-small {
          width: 60px;
          height: 16px;
          display: inline-block;
          margin-right: 1rem;
          margin-bottom: 0;
        }

        .shimmer-text-title {
          width: 80%;
          height: 24px;
          margin-top: 0.75rem;
          margin-bottom: 1rem;
        }

        .shimmer-text-excerpt {
          width: 100%;
          height: 16px;
          margin-bottom: 0.5rem;
        }

        .shimmer-text-excerpt:nth-of-type(2) {
          width: 90%;
        }

        .shimmer-text-excerpt:nth-of-type(3) {
          width: 70%;
        }

        .shimmer-text-link {
          width: 100px;
          height: 20px;
          margin-top: 1rem;
        }

        @keyframes shimmer-loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Stagger animation for multiple items */
        .blog-shimmer-item:nth-child(1) .shimmer-effect,
        .blog-shimmer-item:nth-child(1) .shimmer-text {
          animation-delay: 0s;
        }

        .blog-shimmer-item:nth-child(2) .shimmer-effect,
        .blog-shimmer-item:nth-child(2) .shimmer-text {
          animation-delay: 0.1s;
        }

        .blog-shimmer-item:nth-child(3) .shimmer-effect,
        .blog-shimmer-item:nth-child(3) .shimmer-text {
          animation-delay: 0.2s;
        }

        .blog-shimmer-item:nth-child(4) .shimmer-effect,
        .blog-shimmer-item:nth-child(4) .shimmer-text {
          animation-delay: 0.3s;
        }

        .blog-shimmer-item:nth-child(5) .shimmer-effect,
        .blog-shimmer-item:nth-child(5) .shimmer-text {
          animation-delay: 0.4s;
        }

        .blog-shimmer-item:nth-child(6) .shimmer-effect,
        .blog-shimmer-item:nth-child(6) .shimmer-text {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}

