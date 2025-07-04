import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Shield, Lock, Star, Heart, Eye, Filter, ChevronDown, Truck, CreditCard, Award, CheckCircle } from 'lucide-react';

const SurakshaCart = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'books', name: 'Books', icon: '📚' }
  ];

  const products = [
    {
      id: 1,
      name: 'Quantum Smartphone Pro',
      price: 999,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      category: 'electronics',
      rating: 4.8,
      reviews: 2847,
      badge: 'Featured'
    },
    {
      id: 2,
      name: 'Neural Headphones X1',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      category: 'electronics',
      rating: 4.9,
      reviews: 1523,
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'Cyber Watch Elite',
      price: 799,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      category: 'electronics',
      rating: 4.7,
      reviews: 892,
      badge: 'Limited'
    },
    {
      id: 4,
      name: 'Fusion Jacket',
      price: 149,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      category: 'fashion',
      rating: 4.6,
      reviews: 456,
      badge: 'New'
    },
    {
      id: 5,
      name: 'Smart Home Hub',
      price: 199,
      originalPrice: 249,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
      category: 'home',
      rating: 4.8,
      reviews: 1234,
      badge: 'Popular'
    },
    {
      id: 6,
      name: 'Quantum Laptop Pro',
      price: 1499,
      originalPrice: 1799,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
      category: 'electronics',
      rating: 4.9,
      reviews: 3456,
      badge: 'Premium'
    }
  ];

  const heroSlides = [
    {
      title: 'Quantum Smartphone Pro',
      subtitle: 'Revolutionary Technology',
      description: 'Experience the future with our flagship smartphone featuring quantum processing and neural AI.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
      cta: 'Explore Now',
      gradient: 'from-cyan-500/20 to-blue-600/20'
    },
    {
      title: 'Neural Headphones X1',
      subtitle: 'Immersive Audio Experience',
      description: 'Premium sound quality with adaptive noise cancellation and 48-hour battery life.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      cta: 'Listen Now',
      gradient: 'from-purple-500/20 to-pink-600/20'
    },
    {
      title: 'Cyber Watch Elite',
      subtitle: 'Ultimate Wearable Tech',
      description: 'Advanced health monitoring with quantum sensors and holographic display.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      cta: 'Discover More',
      gradient: 'from-emerald-500/20 to-teal-600/20'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const addToCart = (product) => {
    setCartCount(prev => prev + 1);
    // Add smooth animation feedback
    const button = document.activeElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  };

  // Auto-slide hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Shield className="h-8 w-8 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  SurakshaCart
                </h1>
                <p className="text-xs text-slate-400">Secure Shopping</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl transition-all duration-300"
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </button>
              
              <button className="relative flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 rounded-xl transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-slate-800/50 rounded-xl">
                <User className="h-4 w-4" />
                <span>Account</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative h-full bg-gradient-to-r from-slate-900/90 to-slate-800/90">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-2xl animate-fade-in">
                  <h2 className="text-sm font-medium text-cyan-400 mb-2 tracking-wide uppercase">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
                    {slide.cta}
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-cyan-400 scale-125' : 'bg-slate-500 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure Payments', desc: 'Bank-level encryption' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Express shipping' },
              { icon: Award, title: 'Quality Assured', desc: 'Premium products' },
              { icon: CheckCircle, title: 'Satisfaction', desc: '100% guarantee' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-medium text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Shop by Category</h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-slate-600/50 bg-slate-800/30 text-slate-300 hover:border-slate-500 hover:bg-slate-700/30'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        favorites.has(product.id)
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-slate-800/50 text-slate-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className="h-4 w-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 bg-slate-800/50 rounded-full backdrop-blur-sm text-slate-400 hover:text-white transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <span className="text-sm text-emerald-400 font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-cyan-400" />
                <span className="text-xl font-bold text-white">SurakshaCart</span>
              </div>
              <p className="text-slate-400 mb-4">
                Your trusted partner for secure online shopping with premium products and exceptional service.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons */}
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer">
                  <span className="text-xs">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Security</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Trust Badges</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-center">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-slate-400 ml-1">SSL</span>
                </div>
                <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs text-slate-400 ml-1">PCI</span>
                </div>
                <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-slate-400 ml-1">Verified</span>
                </div>
                <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-center">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-slate-400 ml-1">Certified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SurakshaCart. All rights reserved. | Secure Shopping Experience</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Sign In</h3>
              <button
                onClick={() => setShowLogin(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-medium rounded-xl transition-all duration-300"
              >
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-slate-400">
                Don't have an account?{' '}
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurakshaCart;