
export interface ExperienceItem {
  year: string;
  text: string;
  details?: string[];
  link?: string; // 클릭 가능한 링크 (연구논문용)
}

export interface AboutSection {
  title: string;
  intro?: string;
  content: ExperienceItem[];
  awards?: ExperienceItem[];
}

export interface Course {
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  curriculum: string[];
  learningGoals: string[];
  tags: string[];
  youtubeUrl?: string; // 유튜브 영상 URL (오픈 강의용)
  targetAudience?: string[]; // 대상 (유료 강의용)
}

export interface CourseCategory {
  categoryTitle: string;
  courses: Course[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  author?: string;
  tags?: string[];
  readTime?: string;
}
