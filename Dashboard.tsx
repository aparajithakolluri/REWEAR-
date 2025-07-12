import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star, Package, ArrowUpDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockItems, mockSwapRequests } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';

export function Dashboard() {
  const { user } = useAuth();
  
  if (!user) return null;

  const userItems = mockItems.filter(item => item.uploaderId === user.id);
  const userSwapRequests = mockSwapRequests.filter(
    request => request.requesterId === user.id || mockItems.find(item => item.id === request.itemId)?.uploaderId === user.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Star className="h-5 w-5 text-emerald-600 fill-current" />
                <span className="text-lg font-semibold text-emerald-600">{user.points} points</span>
              </div>
            </div>
          </div>
          <Link
            to="/add-item"
            className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>List New Item</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Package className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Items Listed</p>
              <p className="text-2xl font-bold text-gray-900">{userItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ArrowUpDown className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Swaps</p>
              <p className="text-2xl font-bold text-gray-900">{userSwapRequests.filter(r => r.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Points Balance</p>
              <p className="text-2xl font-bold text-gray-900">{user.points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Items</h2>
          <Link
            to="/add-item"
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Add New Item
          </Link>
        </div>
        
        {userItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userItems.map(item => (
              <ItemCard key={item.id} item={item} showUploaderInfo={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
            <p className="text-gray-600 mb-4">Start by listing your first item to earn points and connect with other users.</p>
            <Link
              to="/add-item"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>List Your First Item</span>
            </Link>
          </div>
        )}
      </div>

      {/* Swap Requests */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Swap Activity</h2>
        
        {userSwapRequests.length > 0 ? (
          <div className="space-y-4">
            {userSwapRequests.map(request => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{request.itemTitle}</h3>
                    <p className="text-sm text-gray-600">
                      {request.requesterId === user.id ? 'Your request to' : 'Request from'} {request.requesterName}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      {request.pointsOffered && (
                        <span>{request.pointsOffered} points offered</span>
                      )}
                      {request.offeredItemTitle && (
                        <span>Item swap: {request.offeredItemTitle}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No swap activity yet</h3>
            <p className="text-gray-600 mb-4">Browse items and start making swap requests to see your activity here.</p>
            <Link
              to="/browse"
              className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <span>Browse Items</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}