import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// Types
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  value2?: number;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  avatar: string;
  status?: 'success' | 'pending' | 'failed';
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
}

// Sample data
const revenueData: ChartData[] = [
  { name: 'Jan', value: 4000, value2: 2400 },
  { name: 'Feb', value: 3000, value2: 1398 },
  { name: 'Mar', value: 5000, value2: 3800 },
  { name: 'Apr', value: 4500, value2: 3908 },
  { name: 'May', value: 6000, value2: 4800 },
  { name: 'Jun', value: 5500, value2: 3800 },
  { name: 'Jul', value: 7000, value2: 4300 },
];



const categoryData: ChartData[] = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Books', value: 20 },
  { name: 'Home', value: 20 },
];

const trafficData: ChartData[] = [
  { name: 'Mon', value: 1200 },
  { name: 'Tue', value: 1900 },
  { name: 'Wed', value: 2300 },
  { name: 'Thu', value: 1800 },
  { name: 'Fri', value: 2100 },
  { name: 'Sat', value: 1600 },
  { name: 'Sun', value: 1100 },
];

const products: Product[] = [
  { id: 1, name: 'iPhone 13 Pro', category: 'Electronics', price: 999, stock: 45, sales: 123 },
  { id: 2, name: 'Samsung TV 4K', category: 'Electronics', price: 799, stock: 23, sales: 67 },
  { id: 3, name: 'Nike Air Max', category: 'Clothing', price: 129, stock: 89, sales: 234 },
  { id: 4, name: 'Sony Headphones', category: 'Electronics', price: 299, stock: 34, sales: 98 },
  { id: 5, name: 'Leather Jacket', category: 'Clothing', price: 399, stock: 12, sales: 45 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const recentActivities: Activity[] = [
  { id: 1, user: 'John Doe', action: 'Purchased iPhone 13', time: '5 minutes ago', avatar: 'https://i.pravatar.cc/150?img=1', status: 'success' },
  { id: 2, user: 'Jane Smith', action: 'Added new product', time: '10 minutes ago', avatar: 'https://i.pravatar.cc/150?img=2', status: 'success' },
  { id: 3, user: 'Bob Johnson', action: 'Updated inventory', time: '15 minutes ago', avatar: 'https://i.pravatar.cc/150?img=3', status: 'pending' },
  { id: 4, user: 'Alice Brown', action: 'Processed refund', time: '20 minutes ago', avatar: 'https://i.pravatar.cc/150?img=4', status: 'success' },
  { id: 5, user: 'Charlie Wilson', action: 'New user registered', time: '25 minutes ago', avatar: 'https://i.pravatar.cc/150?img=5', status: 'success' },
  { id: 6, user: 'Diana Prince', action: 'Payment failed', time: '30 minutes ago', avatar: 'https://i.pravatar.cc/150?img=6', status: 'failed' },
];

// Custom Tooltip for dark theme
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-gray-300 text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, color }) => {
  return (
    <div className="bg-black-solid border border-gray-base rounded-xl p-6 hover:border-gray-700 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold  mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'} font-medium`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="text-gray-500 text-xs ml-2">vs last month</span>
          </div>
        </div>
        <div className={`p-4 rounded-2xl bg-linear-to-br ${color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-3xl filter drop-shadow-lg">{icon}</span>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="">


      {/* Main Content */}
      <main className=" ">
        {/* Welcome Banner */}
        <div className="bg-black-solid rounded-2xl p-6 mb-8 border border-gray-base">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold ">Welcome back, Admin! 👋</h2>
              <p className="text-gray-400 mt-1">Here's what's happening with your store today.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700  px-6 py-2 rounded-lg transition-colors text-sm font-medium">
              View Full Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="$124,239"
            icon="💰"
            change={12.5}
            color="from-blue-600 to-blue-400"
          />
          <StatCard
            title="Total Users"
            value="12,549"
            icon="👥"
            change={8.2}
            color="from-green-600 to-green-400"
          />
          <StatCard
            title="Total Orders"
            value="3,423"
            icon="📦"
            change={-3.1}
            color="from-yellow-600 to-yellow-400"
          />
          <StatCard
            title="Conversion Rate"
            value="4.24%"
            icon="📈"
            change={5.3}
            color="from-purple-600 to-purple-400"
          />
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-black-solid border border-gray-base rounded-xl p-4">
            <p className="text-gray-400 text-sm">Active Users</p>
            <p className="text-2xl font-bold ">2,345</p>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="bg-black-solid border border-gray-base rounded-xl p-4">
            <p className="text-gray-400 text-sm">Bounce Rate</p>
            <p className="text-2xl font-bold ">32.5%</p>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '32.5%' }}></div>
            </div>
          </div>
          <div className="bg-black-solid border border-gray-base rounded-xl p-4">
            <p className="text-gray-400 text-sm">Session Duration</p>
            <p className="text-2xl font-bold ">4m 32s</p>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="bg-black-solid border border-gray-base rounded-xl p-4">
            <p className="text-gray-400 text-sm">Goal Completions</p>
            <p className="text-2xl font-bold ">845</p>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-black-solid border border-gray-base rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold ">Revenue Overview</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">Week</button>
                <button className="px-3 py-1 text-xs bg-blue-600  rounded-lg">Month</button>
                <button className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">Year</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Chart */}
          <div className="bg-black-solid border border-gray-base rounded-xl p-6">
            <h2 className="text-lg font-semibold  mb-4">Website Traffic</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Distribution */}
          <div className="bg-black-solid border border-gray-base rounded-xl p-6">
            <h2 className="text-lg font-semibold  mb-4">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-xs text-gray-400">{item.name}</span>
                  <span className="text-xs  ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-black-solid border border-gray-base rounded-xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold ">Recent Activity</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-800 rounded-lg transition-colors">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="h-10 w-10 rounded-full ring-2 ring-gray-700"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium ">{activity.user}</p>
                      {activity.status === 'success' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                      {activity.status === 'pending' && <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>}
                      {activity.status === 'failed' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                    </div>
                    <p className="text-sm text-gray-400">{activity.action}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-black-solid border border-gray-base rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold ">Top Products</h2>
            <select
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-sm  focus:outline-none focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-base">
                  <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Sales</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-base hover:bg-gray-800 transition-colors">
                    <td className="py-3 text-sm ">{product.name}</td>
                    <td className="py-3 text-sm text-gray-400">{product.category}</td>
                    <td className="py-3 text-sm ">${product.price}</td>
                    <td className="py-3 text-sm text-gray-400">{product.stock}</td>
                    <td className="py-3 text-sm text-gray-400">{product.sales}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 30
                          ? 'bg-green-900 text-green-300'
                          : product.stock > 10
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-red-900 text-red-300'
                        }`}>
                        {product.stock > 30 ? 'In Stock' : product.stock > 10 ? 'Low Stock' : 'Critical'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-black-solid border border-gray-base rounded-xl hover:bg-gray-800 transition-all duration-300 group">
            <span className="block text-3xl mb-2 group-hover:scale-110 transition-transform">➕</span>
            <span className="text-sm font-medium text-gray-300">Add Product</span>
          </button>
          <button className="p-4 bg-black-solid border border-gray-base rounded-xl hover:bg-gray-800 transition-all duration-300 group">
            <span className="block text-3xl mb-2 group-hover:scale-110 transition-transform">📊</span>
            <span className="text-sm font-medium text-gray-300">Generate Report</span>
          </button>
          <button className="p-4 bg-black-solid border border-gray-base rounded-xl hover:bg-gray-800 transition-all duration-300 group">
            <span className="block text-3xl mb-2 group-hover:scale-110 transition-transform">👥</span>
            <span className="text-sm font-medium text-gray-300">Manage Users</span>
          </button>
          <button className="p-4 bg-black-solid border border-gray-base rounded-xl hover:bg-gray-800 transition-all duration-300 group">
            <span className="block text-3xl mb-2 group-hover:scale-110 transition-transform">⚙️</span>
            <span className="text-sm font-medium text-gray-300">Settings</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;