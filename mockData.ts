import { ClothingItem, SwapRequest } from '../types';

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket in excellent condition. Perfect for layering and has a timeless style that never goes out of fashion.',
    category: 'Outerwear',
    type: 'Jacket',
    size: 'M',
    condition: 'excellent',
    tags: ['vintage', 'denim', 'casual', 'blue'],
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1040949/pexels-photo-1040949.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    pointsCost: 75,
    isAvailable: true,
    approved: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral midi dress perfect for summer occasions. Lightweight fabric with a flattering fit.',
    category: 'Dresses',
    type: 'Midi Dress',
    size: 'S',
    condition: 'good',
    tags: ['floral', 'summer', 'midi', 'feminine'],
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    uploaderId: '2',
    uploaderName: 'Emma Wilson',
    pointsCost: 60,
    isAvailable: true,
    approved: true,
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Designer Wool Coat',
    description: 'Luxury wool coat from a premium brand. Incredibly warm and stylish for winter weather.',
    category: 'Outerwear',
    type: 'Coat',
    size: 'L',
    condition: 'excellent',
    tags: ['wool', 'designer', 'winter', 'luxury'],
    images: [
      'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    uploaderId: '1',
    uploaderName: 'Sarah Johnson',
    pointsCost: 120,
    isAvailable: true,
    approved: true,
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Casual Cotton T-Shirt',
    description: 'Soft cotton t-shirt in mint green. Perfect for everyday wear and pairs well with jeans or shorts.',
    category: 'Tops',
    type: 'T-Shirt',
    size: 'M',
    condition: 'good',
    tags: ['cotton', 'casual', 'green', 'basic'],
    images: [
      'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    uploaderId: '3',
    uploaderName: 'Alex Chen',
    pointsCost: 30,
    isAvailable: true,
    approved: true,
    createdAt: '2024-01-12T14:20:00Z'
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterId: '2',
    requesterName: 'Emma Wilson',
    itemId: '1',
    itemTitle: 'Vintage Denim Jacket',
    pointsOffered: 75,
    status: 'pending',
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '2',
    requesterId: '1',
    requesterName: 'Sarah Johnson',
    itemId: '2',
    itemTitle: 'Floral Summer Dress',
    offeredItemId: '3',
    offeredItemTitle: 'Designer Wool Coat',
    status: 'accepted',
    createdAt: '2024-01-15T16:30:00Z'
  }
];