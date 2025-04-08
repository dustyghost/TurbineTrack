import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <nav className="bg-blue-600 px-6 py-3 shadow-md">
      <div className="container mx-auto flex items-center gap-4">
        <Link className="text-white font-semibold hover:text-blue-200 transition-colors" to="/">Turbine List</Link>
        <Link className="text-white font-semibold hover:text-blue-200 transition-colors" to="/new">Add New Turbine</Link>
      </div>
    </nav>
    <main className="container mx-auto flex-grow p-6">
      <Outlet />
    </main>
    <footer className="bg-gray-200 text-gray-600 py-4 text-center">
      TurbineTrack © {new Date().getFullYear()}
    </footer>
  </div>
);

export default Layout;
