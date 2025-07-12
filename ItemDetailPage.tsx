import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Calendar, Tag, Heart, Share2, MessageCircle } from 'lucide-react';
import { mockItems } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapType, setSwapType] = useState<'points' | 'item'>('points');

  const item = mockItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <Link to="/browse" className="text-emerald-600 hover:text-emerald-700">
            ← Back to browse
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.uploaderId;
  const canSwap = user && !isOwner && item.isAvailable;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-yellow-600 bg-yellow-50';
      case 'fair': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const submitSwapRequest = () => {
    // In a real app, this would make an API call
    alert(`Swap request submitted ${swapType === 'points' ? 'with points' : 'with item exchange'}!`);
    setShowSwapModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to="/browse"
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Browse</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={item.images[selectedImageIndex]}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-emerald-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
              </span>
              <span className="text-gray-600">{item.category} • {item.type}</span>
              <span className="text-gray-600">Size {item.size}</span>
            </div>

            <div className="flex items-center space-x-1 mb-6">
              <Star className="h-6 w-6 text-emerald-600 fill-current" />
              <span className="text-2xl font-bold text-emerald-600">{item.pointsCost} points</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  <Tag className="h-3 w-3" />
                  <span>#{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Uploader Info */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Listed by</h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">
                  {item.uploaderName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.uploaderName}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Local area</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6">
            {!item.isAvailable ? (
              <div className="bg-gray-100 text-gray-600 px-6 py-3 rounded-lg text-center font-medium">
                This item is no longer available
              </div>
            ) : isOwner ? (
              <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-lg text-center font-medium">
                This is your item
              </div>
            ) : canSwap ? (
              <div className="space-y-3">
                <button
                  onClick={handleSwapRequest}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Request Swap
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  <MessageCircle className="h-5 w-5" />
                  <span>Message Owner</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-center"
              >
                Sign in to Swap
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Swap</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you like to swap?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="points"
                      checked={swapType === 'points'}
                      onChange={(e) => setSwapType(e.target.value as 'points' | 'item')}
                      className="mr-3"
                    />
                    <span>Use {item.pointsCost} points</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="item"
                      checked={swapType === 'item'}
                      onChange={(e) => setSwapType(e.target.value as 'points' | 'item')}
                      className="mr-3"
                    />
                    <span>Exchange with one of my items</span>
                  </label>
                </div>
              </div>

              {swapType === 'points' && user && user.points < item.pointsCost && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">
                    You need {item.pointsCost - user.points} more points for this swap.
                  </p>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitSwapRequest}
                  disabled={swapType === 'points' && user && user.points < item.pointsCost}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}