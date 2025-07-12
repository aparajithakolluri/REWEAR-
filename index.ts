export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  avatar?: string;
  isAdmin?: boolean;
}

export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: 'excellent' | 'good' | 'fair';
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  pointsCost: number;
  isAvailable: boolean;
  approved: boolean;
  createdAt: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  offeredItemId?: string;
  offeredItemTitle?: string;
  pointsOffered?: number;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}