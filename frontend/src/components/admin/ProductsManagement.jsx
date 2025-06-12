// src/components/admin/ProductsManagement.jsx
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Package, DollarSign, Star } from 'lucide-react';

const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const productsPerPage = 8;

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 45,
      rating: 4.5,
      status: 'active',
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      price: 299.99,
      stock: 23,
      rating: 4.2,
      status: 'active',
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Running Shoes',
      category: 'Sports',
      price: 89.99,
      stock: 67,
      rating: 4.8,
      status: 'active',
      image: '/api/placeholder/100/100'
    },
    {
      id: 4,
      name: 'Coffee Maker',
      category: 'Home',
      price: 149.99,
      stock: 12,
      rating: 4.3,
      status: 'active',
      image: '/api/placeholder/100/100'
    },
    {
      id: 5,
      name: 'Laptop Bag',
      category: 'Accessories',
      price: 49.99,
      stock: 89,
      rating: 4.1,
      status: 'active',
      image: '/api/placeholder/100/100'
    },
    {
      id: 6,
      name: 'Gaming Mouse',
      category: 'Electronics',
      price: 79.99,
      stock: 0,
      rating: 4.6,
      status: 'out_of_stock',
      image: '/api/placeholder/100/100'
    }
  ];

  const categories = ['all', 'Electronics', 'Sports', 'Home', 'Accessories'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (stock < 20) return { text: 'Low Stock', color: 'text-yellow-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const AddProductModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Adding product:', formData);
      setShowAddModal(false);
      setFormData({ name: '', category: '', price: '', stock: '', description: '' });
    };

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {currentProducts.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-200">
                <div className="flex items-center justify-center h-full">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <div className="flex items-center mb-2">
                  <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm ${stockStatus.color}`}>
                    {stockStatus.text} ({product.stock})
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastProduct, filteredProducts.length)}
                </span>{' '}
                of <span className="font-medium">{filteredProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === index + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <AddProductModal />
    </div>
  );
};

export default ProductsManagement;