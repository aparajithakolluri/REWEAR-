import React from 'react';
import { Link } from 'react-router-dom';
import { ClothingItem } from '../types';
import { MapPin, Star } from 'lucide-react';

interface ItemCardProps {
  item: ClothingItem;
  showUploaderInfo?: boolean;
}

export function ItemCard({ item, showUploaderInfo = true }: ItemCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-yellow-600 bg-yellow-50';
      case 'fair': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Link 
      to={`/item/${item.id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
            {item.condition}
          </span>
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Not Available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">{item.category} • Size {item.size}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-emerald-600 fill-current" />
            <span className="text-sm font-medium text-emerald-600">{item.pointsCost} pts</span>
          </div>
        </div>

        {showUploaderInfo && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="h-3 w-3" />
            <span>by {item.uploaderName}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
          )}
        </div>
      </div>
    </Link>
  );
}