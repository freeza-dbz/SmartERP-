import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
        `}
      >
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
