import React, { useState } from 'react';
import { Check, X, Eye, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockItems } from '../data/mockData';

export function AdminPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  if (!user?.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  // Simulate items with different approval states
  const allItems = [
    ...mockItems.map(item => ({ ...item, approved: true, status: 'approved' as const })),
    {
      id: 'pending-1',
      title: 'Designer Handbag',
      description: 'Luxury handbag in excellent condition.',
      category: 'Accessories',
      type: 'Handbag',
      size: 'One Size',
      condition: 'excellent' as const,
      tags: ['designer', 'luxury', 'handbag'],
      images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600'],
      uploaderId: '3',
      uploaderName: 'Jane Smith',
      pointsCost: 100,
      isAvailable: true,
      approved: false,
      status: 'pending' as const,
      createdAt: '2024-01-17T10:00:00Z'
    },
    {
      id: 'pending-2',
      title: 'Casual Sneakers',
      description: 'Comfortable sneakers for everyday wear.',
      category: 'Shoes',
      type: 'Sneakers',
      size: '9',
      condition: 'good' as const,
      tags: ['casual', 'sneakers', 'comfort'],
      images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'],
      uploaderId: '4',
      uploaderName: 'Mike Johnson',
      pointsCost: 60,
      isAvailable: true,
      approved: false,
      status: 'pending' as const,
      createdAt: '2024-01-17T14:30:00Z'
    }
  ];

  const filteredItems = allItems.filter(item => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !item.approved) ||
      (filter === 'approved' && item.approved) ||
      (filter === 'rejected' && item.status === 'rejected');
    
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uploaderName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (itemId: string) => {
    alert(`Item ${itemId} approved!`);
  };

  const handleReject = (itemId: string) => {
    alert(`Item ${itemId} rejected!`);
  };

  const getStatusBadge = (item: any) => {
    if (item.approved) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Approved</span>;
    }
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Manage item listings and moderate content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">{allItems.filter(i => !i.approved).length}</div>
          <div className="text-sm text-gray-600">Pending Review</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">{allItems.filter(i => i.approved).length}</div>
          <div className="text-sm text-gray-600">Approved Items</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">{allItems.length}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">All Items</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Items ({filteredItems.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {item.description.substring(0, 100)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.uploaderName}</div>
                    <div className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.category}</div>
                    <div className="text-sm text-gray-500">Size {item.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-emerald-600">{item.pointsCost} pts</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-700 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      {!item.approved && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="text-green-600 hover:text-green-700 p-1"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No items found matching your criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
}