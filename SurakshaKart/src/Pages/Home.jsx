import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Shield, 
  Lock, 
  Fingerprint, 
  Eye, 
  Heart, 
  Star, 
  User, 
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Zap,
  CheckCircle,
  CreditCard,
  Smartphone,
  Wifi,
  Globe
} from 'lucide-react';

const SurakshaCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "VaultMax Pro",
      price: 299.99,
      image: "https://img.freepik.com/premium-photo/product-background-with-water-splash-dark-theme-premium-high-quality-image_774567-203.jpg",
      rating: 4.9,
      category: "storage",
      features: ["256-bit Protection", "Biometric Lock", "Fireproof"],
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "NetGuard Pro Router",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      category: "network",
      features: ["AI Protection", "VPN Built-in", "Quantum Shield"],
      badge: "New"
    },
    {
      id: 3,
      name: "BioLock Auth",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      category: "biometric",
      features: ["Face & Fingerprint", "Voice Recognition", "Military Grade"],
      badge: "Featured"
    },
    {
      id: 4,
      name: "ShieldPhone X1",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      category: "mobile",
      features: ["Private Calls", "Protected OS", "Anti-Surveillance"],
      badge: "Premium"
    },
    {
      id: 5,
      name: "CryptoKey Hardware",
      price: 79.99,
      image: "https://media.istockphoto.com/id/1397047877/photo/main-microchip-on-the-motherboard.jpg?s=612x612&w=0&k=20&c=1_jGgHtpbePTeadRR_r8TCwIFAN9ZGRvAzfKftPFy50=",
      rating: 4.6,
      category: "crypto",
      features: ["Multi-Currency", "Cold Storage", "Tamper Proof"],
      badge: null
    },
    {
      id: 6,
      name: "LinkMax Gateway",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      category: "network",
      features: ["Zero Trust", "5G Ready", "Enterprise Grade"],
      badge: "Pro"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Globe },
    { id: 'storage', name: 'Storage Devices', icon: Shield },
    { id: 'network', name: 'Network Devices', icon: Wifi },
    { id: 'biometric', name: 'Biometric Auth', icon: Fingerprint },
    { id: 'mobile', name: 'Mobile Devices', icon: Smartphone },
    { id: 'crypto', name: 'Crypto Hardware', icon: Lock }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const ProductCard = ({ product }) => (
    <div className="group relative bg-black/20 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-6 hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
      {product.badge && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-3 py-1 rounded-full text-xs font-bold">
          {product.badge}
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors">
            <Eye className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{product.rating}</span>
          </div>
          <div className="flex gap-1">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const CartPanel = () => (
    <div className={`fixed right-0 top-0 h-full w-96 bg-black/90 backdrop-blur-lg border-l border-gray-800 transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-medium text-white">{item.name}</h4>
                  <p className="text-gray-400">${item.price} x {item.quantity}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-white">Total:</span>
            <span className="text-2xl font-bold text-cyan-400">${getTotalPrice().toFixed(2)}</span>
          </div>
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            Checkout
          </button>
        </div>
      )}
    </div>
  );

  const LoginModal = () => (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 ${isLoginOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-black/80 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Secure Login</h2>
          <button 
            onClick={() => setIsLoginOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-300">2FA Authentication Required</span>
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            Login
          </button>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">SSL Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Cyber Deals Banner */}
      <div className="relative bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 py-2 text-center">
        <div className="flex items-center justify-center gap-2 animate-pulse">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium">
            🔥 CYBER DEALS: Up to 40% OFF on Tech Essentials
          </span>
          <Zap className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  SurakshaCart
                </h1>
              </div>

              <nav className="hidden md:flex items-center gap-8">
                {categories.slice(0, 4).map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-gray-800/50 ${
                      selectedCategory === category.id ? 'bg-gray-800 text-cyan-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-400" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-400" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
              Where Technology Meets Innovation
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover cutting-edge tech solutions designed for the digital age. 
              Your privacy is our priority, your satisfaction is our promise.
            </p>
            <div className="flex items-center justify-center gap-6">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
                Explore Products
              </button>
              <button className="border border-gray-600 hover:border-cyan-500 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800/50">
                Learn More
              </button>
            </div>
          </div>

          {/* Featured Product */}
          <div className="mt-16 max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-black/50 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-500">
                <img 
                  src="https://img.freepik.com/premium-photo/product-background-with-water-splash-dark-theme-premium-high-quality-image_774567-203.jpg" 
                  alt="Featured Product"
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className="text-2xl font-bold text-white mb-2">VaultMax Pro</h3>
                <p className="text-gray-300 mb-4">Ultimate protection for your digital assets</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-cyan-400">$299.99</span>
                  <button 
                    onClick={() => addToCart(products[0])}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-white">Tech Products</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">{filteredProducts.length} products</span>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                Sort by <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-black/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Tech Professionals</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Industry-leading standards and certifications ensure your data is always protected.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "256-bit Protection", desc: "Military-grade protection" },
              { icon: Fingerprint, title: "Biometric Auth", desc: "Multi-factor protection" },
              { icon: CheckCircle, title: "ISO 27001", desc: "Certified quality" },
              { icon: Lock, title: "Zero Trust", desc: "Never trust, always verify" }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors">
                <item.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white">SurakshaCart</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner in digital innovation and privacy protection.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <div className="space-y-2">
                {['Storage Devices', 'Network Devices', 'Biometric Auth', 'Mobile Devices'].map(item => (
                  <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-2">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map(item => (
                  <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Trust Badges</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">SSL Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">SOC 2 Type II</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 SurakshaCart. All rights reserved. Built with innovation in mind.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40">
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Cart Panel */}
      <CartPanel />

      {/* Login Modal */}
      <LoginModal />

      {/* Overlay */}
      {(isCartOpen || isLoginOpen) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => {
            setIsCartOpen(false);
            setIsLoginOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SurakshaCart;