export type ServiceItem = {
  id: number;
  name: string;
  description: string;
  image: string;
  key_features: string;
  benefits: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ServicesListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceItem[];
};

export type ProjectItem = {
  id: number;
  name: string;
  banner_image: string;
  description: string;
  subtitle1: string;
  subtitle1_description: string;
  subtitle2: string;
  subtitle2_description: string;
  subtitle3: string;
  subtitle3_description: string;
  subtitle4: string;
  subtitle4_description: string;
  subtitle5: string;
  subtitle5_description: string;
  subtitle6: string;
  subtitle6_description: string;
  call_to_action: string;
  supporting_image1: string;
  supporting_image2: string;
  created_at: string;
  updated_at: string;
};

export type ProjectsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectItem[];
};

export type CareerItem = {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  salary_range: string;
  deadline: string;
  created_at: string;
  updated_at: string;
};

export type CareersListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: CareerItem[];
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type FaqsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FaqItem[];
};

export type BlogPostItem = {
  id: number;
  category: string;
  tags: string[];
  author: string;
  title: string;
  slug: string;
  content_paragraph1: string;
  content_paragraph2: string;
  content_paragraph3: string;
  image: string;
  image2: string;
  image3: string;
  views: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  post_video_link: string;
};

export type BlogPostsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPostItem[];
};

export type BlogCommentItem = {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
};

export type BlogCommentsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogCommentItem[];
};
