export interface BlogPost {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  published: boolean;
  tags?: string[];
  cover?: {
    src: string;
    height: number;
    width: number;
    blurDataURL: string;
  };
  body: unknown;
  readingTime?: number;
}
