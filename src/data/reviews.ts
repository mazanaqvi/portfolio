export interface Review {
  id: string;
  projectTitle: string;
  projectType: "Fixed Price" | "Hourly";
  budget: string;
  rating: number;
  date: string;
  review: string;
}

export interface ReviewsSummary {
  totalReviews: number;
  avgRating: number;
  jobSuccessScore: number;
  isTopRated: boolean;
}

export const reviewsSummary: ReviewsSummary = {
  totalReviews: 11,
  avgRating: 5.0,
  jobSuccessScore: 100,
  isTopRated: true,
};

export const UPWORK_PROFILE_URL =
  "https://www.upwork.com/freelancers/~01aea3e66df60ee009";

export const reviews: Review[] = [
  {
    id: "1",
    projectTitle: "Flutter Food Delivery App with Real-Time Tracking",
    projectType: "Fixed Price",
    budget: "$220.00",
    rating: 5,
    date: "Jan 16, 2026 - Feb 11, 2026",
    review:
      "Ali does wonderful work! My only recommendation is to have a very tight and well documented scope so its clear what's expected",
  },
  {
    id: "2",
    projectTitle: "UI & Bug fixes",
    projectType: "Fixed Price",
    budget: "$825.00",
    rating: 5,
    date: "Sep 17, 2025 - Jan 10, 2026",
    review:
      "Highly recommend! Was wonderful to work with and went above and beyond many times.",
  },
  {
    id: "3",
    projectTitle: "Need help with Flutterflow project that pulls Airtable data",
    projectType: "Hourly",
    budget: "$15.00 /hr",
    rating: 5,
    date: "Jun 23, 2023 - Aug 13, 2025",
    review:
      "Very quick and accurate work. Able to complete a wide variety of tasks.",
  },
  {
    id: "4",
    projectTitle: "Flutter Backend Assistance",
    projectType: "Fixed Price",
    budget: "$2,500.00",
    rating: 5,
    date: "Mar 12, 2024 - Jan 14, 2025",
    review:
      "I had the pleasure of working with Ali Hamza to build my SaaS product, SalesBuckets, and I can confidently say he is an exceptional developer. Ali is not only highly skilled in his craft but also demonstrates a strong work ethic, clear communication, and a commitment to delivering quality results. Throughout the project, he showed an impressive ability to understand complex requirements and translate them into an efficient and functional solution. Ali's proactive approach, problem-solving skills, and willingness to go the extra mile made him a valuable partner in bringing my vision to life.If you are looking for a talented and reliable developer to take your project to the next level, I wholeheartedly recommend Ali Hamza. I look forward to working with him again in the future!",
  },
  {
    id: "5",
    projectTitle: "Mobile App Developer with AWS experience",
    projectType: "Fixed Price",
    budget: "$1,317.50",
    rating: 5,
    date: "Nov 17, 2023 - Mar 27, 2024",
    review:
      "Good work with Ali, thanks",
  },
  {
    id: "6",
    projectTitle: "Looking for a FlutterFlow mobile app developer",
    projectType: "Fixed Price",
    budget: "$700.00",
    rating: 5,
    date: "Oct 10, 2023 - Mar 5, 2024",
    review:
      "Ali is a good skilled developer! Communicative, efficient, and delivered outstanding results within our project timeline. I'll recommend and hire again for future projects.",
  },
  {
    id: "7",
    projectTitle: "Mobile Flutter (Front End) Engineer",
    projectType: "Hourly",
    budget: "$6.00 /hr",
    rating: 5,
    date: "Feb 16, 2023 - Jan 17, 2024",
    review:
      "Ali was a suburb, diligent and exceptionally professional worker. Many people on this app scam, he is far from it. He is the real deal 100% amazing worker.",
  },
];
