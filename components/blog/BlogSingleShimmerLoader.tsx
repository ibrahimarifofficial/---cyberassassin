'use client'

export default function BlogSingleShimmerLoader() {
  return (
    <>
      {/* Hero Section Shimmer */}
      <section className="blog-single-hero">
        <div className="container">
          <div className="blog-single-back-link shimmer-text shimmer-text-link">
            <div className="shimmer-effect"></div>
          </div>
          
          <div className="blog-single-hero-content">
            <div className="blog-single-meta-top">
              <span className="blog-single-category shimmer-text shimmer-text-small"></span>
              <span className="blog-single-date shimmer-text shimmer-text-small"></span>
              <span className="blog-single-read-time shimmer-text shimmer-text-small"></span>
              <span className="blog-single-views shimmer-text shimmer-text-small"></span>
            </div>
            
            <h1 className="blog-single-title shimmer-text shimmer-text-title"></h1>
            <p className="blog-single-excerpt shimmer-text shimmer-text-excerpt"></p>
            
            {/* Author Info Shimmer */}
            <div className="blog-single-author">
              <div className="blog-single-author-avatar shimmer-image-circle">
                <div className="shimmer-effect"></div>
              </div>
              <div className="blog-single-author-info">
                <div className="blog-single-author-name shimmer-text shimmer-text-author-name"></div>
                <div className="blog-single-author-role shimmer-text shimmer-text-author-role"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Shimmer */}
      <section className="blog-single-featured-image">
        <div className="container">
          <div className="blog-single-image-wrapper shimmer-image-large">
            <div className="shimmer-effect"></div>
          </div>
        </div>
      </section>

      {/* Main Content Shimmer */}
      <section className="blog-single-content-section">
        <div className="container">
          <div className="blog-single-layout">
            <article className="blog-single-article">
              <div className="blog-single-content">
                {/* Multiple paragraph lines */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div key={index} className="shimmer-content-line">
                    <div className="shimmer-text shimmer-text-paragraph"></div>
                  </div>
                ))}
                
                {/* Heading shimmer */}
                <div className="shimmer-content-line shimmer-heading">
                  <div className="shimmer-text shimmer-text-heading"></div>
                </div>
                
                {/* More paragraph lines */}
                {[1, 2, 3, 4].map((index) => (
                  <div key={`p-${index}`} className="shimmer-content-line">
                    <div className="shimmer-text shimmer-text-paragraph"></div>
                  </div>
                ))}
              </div>
              
              {/* Social Share Shimmer */}
              <div className="blog-single-social-share">
                <span className="blog-single-share-label shimmer-text shimmer-text-share-label"></span>
                <div className="blog-single-share-buttons">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="blog-single-share-btn shimmer-share-btn">
                      <div className="shimmer-effect"></div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <style jsx>{`
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

        .shimmer-image-large,
        .shimmer-image-circle {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .shimmer-image-circle {
          border-radius: 50%;
        }

        .shimmer-text-link {
          width: 120px;
          height: 20px;
          margin-bottom: 2rem;
        }

        .shimmer-text-small {
          width: 80px;
          height: 18px;
          display: inline-block;
          margin-right: 1.5rem;
          margin-bottom: 0;
        }

        .shimmer-text-title {
          width: 85%;
          height: 40px;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        .shimmer-text-excerpt {
          width: 90%;
          height: 24px;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .shimmer-text-author-name {
          width: 100px;
          height: 20px;
          margin-bottom: 0.5rem;
        }

        .shimmer-text-author-role {
          width: 120px;
          height: 16px;
        }

        .shimmer-content-line {
          margin-bottom: 1rem;
        }

        .shimmer-text-paragraph {
          width: 100%;
          height: 20px;
          margin-bottom: 0.5rem;
        }

        .shimmer-content-line:nth-child(2) .shimmer-text-paragraph {
          width: 95%;
        }

        .shimmer-content-line:nth-child(3) .shimmer-text-paragraph {
          width: 98%;
        }

        .shimmer-content-line:nth-child(4) .shimmer-text-paragraph {
          width: 92%;
        }

        .shimmer-heading {
          margin-top: 2rem;
          margin-bottom: 1.5rem;
        }

        .shimmer-text-heading {
          width: 60%;
          height: 32px;
        }

        .shimmer-text-share-label {
          width: 140px;
          height: 20px;
          margin-bottom: 1rem;
        }

        .shimmer-share-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
        }

        @keyframes shimmer-loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Stagger animation */
        .shimmer-content-line:nth-child(1) .shimmer-text {
          animation-delay: 0s;
        }

        .shimmer-content-line:nth-child(2) .shimmer-text {
          animation-delay: 0.1s;
        }

        .shimmer-content-line:nth-child(3) .shimmer-text {
          animation-delay: 0.2s;
        }

        .shimmer-content-line:nth-child(4) .shimmer-text {
          animation-delay: 0.3s;
        }

        .shimmer-content-line:nth-child(5) .shimmer-text {
          animation-delay: 0.4s;
        }

        .shimmer-content-line:nth-child(6) .shimmer-text {
          animation-delay: 0.5s;
        }

        .shimmer-content-line:nth-child(7) .shimmer-text {
          animation-delay: 0.6s;
        }

        .shimmer-content-line:nth-child(8) .shimmer-text {
          animation-delay: 0.7s;
        }
      `}</style>
    </>
  )
}

