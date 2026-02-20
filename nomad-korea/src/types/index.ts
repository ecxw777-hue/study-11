export interface City {
  id: string;
  name: string;
  nameKo: string;
  slug: string;
  image: string;
  nomadScore: number;
  internetSpeed: number;
  safetyRating: number;
  monthlyCost: number;
  pm25: number;
  weather: WeatherInfo;
  ktxFromSeoul: number;
  likes: number;
  dislikes: number;
  tags: string[];
  description: string;
  region: string;
}

export interface WeatherInfo {
  temp: number;
  condition: string;
  icon: string;
}

export interface Meetup {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
}

export interface MonthlyStay {
  id: string;
  title: string;
  city: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface SeasonalPick {
  id: string;
  city: string;
  cityKo: string;
  image: string;
  season: string;
  highlight: string;
  description: string;
}

export interface QuickStat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}
