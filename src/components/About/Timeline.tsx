import type { TimelineItem } from "../../data/about";

interface TimelineProps {
  title: string;
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ title, items }) => {
  return (
    <div className="timeline-section">
      <h5 className="timeline-section-title">{title}</h5>
      <div className="timeline">
        {items.map((item, index) => (
          <div
            className="timeline-item anim-fade-up"
            key={index}
            style={{ animationDelay: `${0.1 + index * 0.15}s` }}
          >
            <div className="tl-icon">
              <i className={item.icon}></i>
            </div>
            <p className="tl-duration">{item.duration}</p>
            <h5>
              {item.title}
              <span> - {item.company}</span>
            </h5>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
