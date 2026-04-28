export interface Report {
  id: number;
  sourceUrl: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  hidden: boolean;
}
