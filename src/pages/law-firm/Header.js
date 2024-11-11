import React from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';

const Header = () => (
  <header className="bg-white p-6 flex items-center justify-between border-b">
    <button className="lg:hidden">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <div className="flex-1 max-w-xl mx-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={28} />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-14 pr-6 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="flex items-center gap-6">
      <Bell className="text-gray-600" size={28} />
      
      <div className="flex items-center gap-3">
        <img src="/uk_flag.png" alt="UK Flag" className="w-8 h-8 rounded" />
        <span className="text-gray-700 text-lg">English</span>
        <ChevronDown size={24} className="text-gray-400" />
      </div>

      <div className="flex items-center gap-3">
        <img src="/profile_img.jpg" alt="User avatar" className="w-10 h-10 rounded-full" />
        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">Hi, Steve!</span>
            <ChevronDown size={24} className="text-gray-400" />
          </div>
          <span className="text-md text-gray-500">Admin</span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
