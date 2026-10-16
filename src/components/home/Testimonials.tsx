import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { reviews, reviewsSummary, UPWORK_PROFILE_URL, type Review } from "../../data/reviews";
import SectionHead from "../ui/SectionHead";
import Reveal from "../ui/Reveal";
import { useSpotlight } from "../../hooks/useSpotlight";

const Stars: React.FC<{ n: number }> = ({ n }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} style={{ opacity: i < n ? 1 : 0.25 }} />
    ))}
  </span>
);

export const ReviewCard: React.FC<{ review: Review; clamp?: boolean }> = ({ review, clamp = true }) => {
  const [expanded, setExpanded] = useState(!clamp);
  const long = review.review.length > 220;
  const text = expanded || !long ? review.review : review.review.slice(0, 220).trimEnd() + "…";
  const onMove = useSpotlight<HTMLDivElement>();
  return (
    <div className="card spotlight review-card" onMouseMove={onMove}>
      <div className="review-head">
        <Stars n={review.rating} />
        <span className="date">{review.date}</span>
      </div>
      <blockquote>{text}</blockquote>
      {long && clamp && (
        <button type="button" className="more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <div className="review-foot">
        <span className="project" title={review.projectTitle}>
          {review.projectTitle}
        </span>
        <span className="chip">{review.projectType}</span>
      </div>
    </div>
  );
};

export const ReviewsSummary: React.FC = () => (
  <Reveal className="card reviews-summary">
    <div className="big">
      <span className="num">{reviewsSummary.avgRating.toFixed(1)}</span>
      <div>
        <Stars n={5} />
        <div className="sub">{reviewsSummary.totalReviews} reviews on Upwork</div>
      </div>
    </div>
    <div className="mini-stats">
      <div className="ms">
        <div className="v">{reviewsSummary.jobSuccessScore}%</div>
        <div className="l">Job success</div>
      </div>
      <div className="ms">
        <div className="v">Top Rated</div>
        <div className="l">Upwork badge</div>
      </div>
      <div className="ms">
        <div className="v">2020</div>
        <div className="l">Freelancing since</div>
      </div>
    </div>
    <a className="btn ghost" href={UPWORK_PROFILE_URL} target="_blank" rel="noopener noreferrer">
      Upwork profile <ExternalLink />
    </a>
  </Reveal>
);

const Testimonials: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const CARD_W = 436; // card width + gap

  const go = (dir: 1 | -1) => {
    const max = Math.max(0, (trackRef.current?.scrollWidth ?? 0) - (viewportRef.current?.clientWidth ?? 0));
    setX((cur) => {
      const next = Math.max(-max, Math.min(0, cur - dir * CARD_W));
      return dir === 1 && cur <= -max + 1 ? 0 : next; // wrap to start at the end
    });
  };

  return (
    <section className="section" id="reviews">
      <div className="container">
        <SectionHead
          eyebrow="Client reviews"
          title={
            <>
              What clients <span className="em">say</span>
            </>
          }
          text="Every word below is a verified Upwork review. Drag the cards or use the arrows."
          action={
            <div className="carousel-nav">
              <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous reviews">
                <ChevronLeft size={18} />
              </button>
              <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next reviews">
                <ChevronRight size={18} />
              </button>
            </div>
          }
        />
        <ReviewsSummary />
        <div className="carousel" ref={viewportRef}>
          <motion.div
            ref={trackRef}
            className="carousel-track"
            drag="x"
            dragConstraints={viewportRef}
            dragElastic={0.08}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
