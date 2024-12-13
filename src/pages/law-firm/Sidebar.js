import React, { useState, createContext, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutGrid, FileText, Calendar, FileCheck, GraduationCap,
  Bell, BarChart2, User, Settings, LogOut, Users, UserPlus,
  FileSignature, Book
} from 'lucide-react';

const UserContext = createContext();

const mockUser = {
  name: "John Doe",
  role: "Firm Manager",
  permissions: {
    dashboard: { view: true },
    cases: { view: true, create: true, edit: true, delete: true, approve: true },
    tasks: { view: true, create: true, edit: true, delete: true, approve: true },
    user_types: { view: true, create: true, edit: true, delete: true, approve: true },
    users: { view: true, create: true, edit: true, delete: true, approve: true },
    appointments: { view: true, create: true, edit: true, delete: true, approve: true },
    templates: { view: true, create: true, edit: true, delete: true, approve: true },
    knowledge_hub: { view: true, create: true, edit: true, delete: true, approve: true },
    clients: { view: true, create: true, edit: true, delete: true, approve: true },
    notifications: { view: true },
    analytics: { view: true },
    settings: { view: true, edit: true }
  }
};

const UserProvider = ({ children }) => (
  <UserContext.Provider value={{ user: mockUser }}>
    {children}
  </UserContext.Provider>
);

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const { user } = useUser();

  const NavItem = ({ to, icon: Icon, children, permission }) => {
    const isActive = location.pathname === to;
    const hasPermission = user.permissions[permission]?.view;

    if (!hasPermission) return null;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-colors
          ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
      >
        <Icon size={24} />
        <span className="text-lg font-semibold">{children}</span>
      </Link>
    );
  };

  return (
    <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:block w-full sm:w-72 bg-white border-r border-gray-200 flex flex-col h-full`}>
      {/* Logo */}
      <div className="px-8 py-8 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src="/lejit_logo.png"
            alt="Lejit.ai Logo"
            className="w-12 h-14" 
          />
          <span className="text-2xl font-extrabold">Lejit.ai</span> {/* Increased logo text size */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 overflow-y-auto">
        <NavItem to="/law-firm" icon={LayoutGrid} permission="dashboard">Dashboard</NavItem>
        <NavItem to="/law-firm/manage-case" icon={FileText} permission="cases">My Cases</NavItem>
        <NavItem to="/tasks" icon={FileCheck} permission="tasks">My Tasks</NavItem>
        <NavItem to="/law-firm/add-user" icon={UserPlus} permission="users">Manage Users</NavItem>
        <NavItem to="/law-firm/appointments" icon={Calendar} permission="appointments">Manage Appointments</NavItem>
        <NavItem to="/templates" icon={FileSignature} permission="templates">Legal Templates</NavItem>
        <NavItem to="/knowledge-hub" icon={GraduationCap} permission="knowledge_hub">Knowledge Hub</NavItem>
        <NavItem to="/law-firm/add-client" icon={User} permission="clients">My Clients</NavItem>
        <NavItem to="/notifications" icon={Bell} permission="notifications">Notification</NavItem>
        <NavItem to="/analytics" icon={BarChart2} permission="analytics">Analytics/Reports</NavItem>
        <NavItem to="/law-firm/profile" icon={User} permission="settings">Profile</NavItem>
        <NavItem to="/settings" icon={Settings} permission="settings">Settings</NavItem>
        <button className="w-full flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
          <LogOut size={24} />
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

const SidebarWithProvider = () => (
  <UserProvider>
    <Sidebar />
  </UserProvider>
);

export { SidebarWithProvider as Sidebar, useUser };
