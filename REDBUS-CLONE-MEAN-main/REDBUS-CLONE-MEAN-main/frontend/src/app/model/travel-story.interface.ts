export interface ITravelStory {
  id?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: Record<string, unknown>;
  mediaUrls: string[];
  tags: string[];
  likes: number;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
