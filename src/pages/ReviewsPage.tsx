import { reviews } from "../data/reviews";
import Reveal from "../components/ui/Reveal";
import { ReviewCard, ReviewsSummary } from "../components/home/Testimonials";
import ContactCta from "../components/home/ContactCta";

const ReviewsPage: React.FC = () => (
  <>
    <div className="page">
      <div className="container">
        <Reveal className="page-head">
          <span className="mono">Client reviews</span>
          <h1>
            Verified feedback, <span className="em">unedited</span>
          </h1>
          <p>Every review below is copied from my Upwork profile. Fixed-price and hourly contracts, 2023 to today.</p>
        </Reveal>
        <ReviewsSummary />
        <div className="reviews-list">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={(i % 2) * 0.06}>
              <ReviewCard review={r} clamp={false} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
    <ContactCta />
  </>
);

export default ReviewsPage;
