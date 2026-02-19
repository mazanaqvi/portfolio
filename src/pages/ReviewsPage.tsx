import React, { useEffect, useState } from "react";
import ReviewCard from "../components/Reviews/ReviewCard";
import { reviews, reviewsSummary, UPWORK_PROFILE_URL } from "../data/reviews";

const ReviewsPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`container reviews active ${visible ? "page-visible" : ""}`}
      id="reviews"
    >
      <div className="page-header anim-fade-up">
        <span className="page-tag">
          <i className="fas fa-star"></i> Client Reviews
        </span>
        <h2 className="page-title">
          What Clients <span className="highlight">Say</span>
        </h2>
        <p className="page-subtitle">
          Verified feedback from real clients on Upwork — built on quality,
          communication, and consistent delivery.
        </p>
      </div>

      {/* Summary Banner */}
      <div
        className="reviews-summary-banner anim-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="reviews-summary-inner">
          <div className="reviews-summary-left">
            {reviewsSummary.isTopRated && (
              <div className="reviews-top-rated-badge">
                <i className="fas fa-shield-alt"></i>
                Top Rated
              </div>
            )}
            <div className="reviews-rating-big">
              <span className="reviews-rating-number">
                {reviewsSummary.avgRating.toFixed(1)}
              </span>
              <div className="reviews-rating-details">
                <div className="reviews-stars-big">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className="fas fa-star summary-star-big" />
                  ))}
                </div>
                <span className="reviews-total-label">
                  {reviewsSummary.totalReviews} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="reviews-summary-stats">
            <div className="reviews-summary-stat">
              <span className="rs-stat-value">
                {reviewsSummary.jobSuccessScore}%
              </span>
              <span className="rs-stat-label">Job Success</span>
            </div>
            <div className="reviews-summary-stat-divider"></div>
            <div className="reviews-summary-stat">
              <span className="rs-stat-value">20+</span>
              <span className="rs-stat-label">Projects Done</span>
            </div>
          </div>

          <a
            href={UPWORK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-upwork-btn"
          >
            <i className="fas fa-external-link-alt"></i>
            View on Upwork
          </a>
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsPage;
