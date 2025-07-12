import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Users, Award, ArrowRight, Star, Heart } from 'lucide-react';
import { mockItems } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';

export function LandingPage() {
  const featuredItems = mockItems.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Sustainable Fashion
                  <span className="block text-emerald-200">Starts Here</span>
                </h1>
                <p className="text-xl lg:text-2xl text-emerald-100 leading-relaxed">
                  Exchange, swap, and discover amazing clothing while reducing textile waste. 
                  Join our community of conscious fashion lovers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors group"
                >
                  Start Swapping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-700 transition-colors"
                >
                  Join Community
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-emerald-200 text-sm">Items Exchanged</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5k+</div>
                  <div className="text-emerald-200 text-sm">Happy Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">2 tons</div>
                  <div className="text-emerald-200 text-sm">Waste Prevented</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sustainable Fashion"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-red-500 fill-current" />
                  <div>
                    <div className="font-semibold text-gray-900">Eco-Friendly</div>
                    <div className="text-sm text-gray-600">100% Sustainable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes sustainable fashion accessible and rewarding for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Recycle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                List Your Items
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload photos and details of clothing you no longer wear. 
                Earn points for every item you share with the community.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Browse & Discover
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore thousands of unique pieces from fellow fashion enthusiasts. 
                Find your next favorite outfit while helping the environment.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Swap or Redeem
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Exchange items directly with other users or use points to redeem 
                pieces you love. Every swap reduces textile waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Items
              </h2>
              <p className="text-xl text-gray-600">
                Discover amazing pieces from our community
              </p>
            </div>
            <Link
              to="/browse"
              className="hidden sm:flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold group"
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/browse"
              className="sm:hidden inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold group"
            >
              <span>View All Items</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Join thousands of fashion lovers who are making a positive impact on the environment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/browse"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-700 transition-colors"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15,847</div>
              <div className="text-gray-400">Total Items Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">8,293</div>
              <div className="text-gray-400">Successful Swaps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5,621</div>
              <div className="text-gray-400">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">97%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}