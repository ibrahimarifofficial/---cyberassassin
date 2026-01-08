'use client'

export default function FeaturedPostsShimmerLoader() {
  return (
    <section className="featured-posts-section">
      <div className="container-full">
        <div className="featured-posts-header">
          <h2 className="featured-posts-title">
            <span className="title-accent"></span>
            Featured Posts
          </h2>
        </div>

        <div className="featured-posts-layout">
          {/* Left Side - Slider Shimmer */}
          <div className="featured-slider-container">
            <div className="featured-slider-wrapper">
              <div className="slider-track-container">
                <div className="slider-track">
                  <div className="featured-slider-card shimmer-slider-card">
                    <div className="featured-slider-image shimmer-image-large">
                      <div className="shimmer-effect"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 2 Featured Posts Shimmer */}
          <div className="featured-posts-right">
            {[1, 2].map((index) => (
              <div key={index} className="featured-post-right-card shimmer-featured-card">
                <div className="featured-post-right-image shimmer-image-medium">
                  <div className="shimmer-effect"></div>
                </div>
                <div className="featured-post-right-content">
                  <div className="featured-post-right-meta">
                    <span className="post-category-small shimmer-text shimmer-text-tiny"></span>
                    <span className="post-date-small shimmer-text shimmer-text-tiny"></span>
                  </div>
                  <h4 className="featured-post-right-title shimmer-text shimmer-text-medium"></h4>
                  <div className="featured-post-right-link shimmer-text shimmer-text-small-link"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .shimmer-slider-card,
        .shimmer-featured-card {
          pointer-events: none;
          user-select: none;
        }

        .shimmer-image-large,
        .shimmer-image-medium {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
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

        .shimmer-text-tiny {
          width: 50px;
          height: 14px;
          display: inline-block;
          margin-right: 0.75rem;
        }

        .shimmer-text-medium {
          width: 85%;
          height: 20px;
          margin-top: 0.75rem;
          margin-bottom: 1rem;
        }

        .shimmer-text-small-link {
          width: 80px;
          height: 18px;
          margin-top: 0.5rem;
        }

        @keyframes shimmer-loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  )
}

