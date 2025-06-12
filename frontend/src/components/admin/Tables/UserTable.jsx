import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2024-01-25' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2024-02-01' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active', joinDate: '2024-02-05' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 lg:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Users Management</h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto bg-white text-gray-900"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Join Date</th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs lg:text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3 lg:ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs lg:text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'Moderator' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-1 lg:space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;