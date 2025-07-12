import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, User, LogOut, Menu, X, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-emerald-600 rounded-lg group-hover:bg-emerald-700 transition-colors">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/browse" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Browse Items
            </Link>
            {user && (
              <Link 
                to="/add-item" 
                className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>List Item</span>
              </Link>
            )}
            {user?.isAdmin && (
              <Link 
                to="/admin" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold text-sm">
                      {user.points}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">points</span>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/browse" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>
              {user && (
                <>
                  <Link 
                    to="/add-item" 
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    List Item
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center space-x-2 py-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-semibold text-sm">
                        {user.points}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">points</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}