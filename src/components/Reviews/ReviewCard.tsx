import React from "react";
import type { Review } from "../../data/reviews";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, index }) => {
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.floor(rating) ? "star-filled" : "star-empty"}`}
      />
    ));

  return (
    <div
      className="review-card anim-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className="review-card-header">
        <div className="review-stars-row">
          <div className="review-stars">{renderStars(review.rating)}</div>
          <span className="review-rating-value">{review.rating.toFixed(1)}</span>
        </div>
        <span className="review-date">
          <i className="fas fa-calendar-alt"></i>
          {review.date}
        </span>
      </div>

      <p className="review-text">"{review.review}"</p>

      <div className="review-footer">
        <div className="review-project-tag">
          <i className="fas fa-briefcase"></i>
          <span className="review-project-title">{review.projectTitle}</span>
        </div>
        <span
          className={`review-type-badge ${
            review.projectType === "Hourly" ? "badge-hourly" : "badge-fixed"
          }`}
        >
          <i
            className={`fas ${
              review.projectType === "Hourly" ? "fa-clock" : "fa-tag"
            }`}
          ></i>
          {review.projectType}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
