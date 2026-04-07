
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-black text-gray-200 p-8 flex-col justify-between hidden lg:flex z-20 shadow-2xl">
        <div>
          <Link to="/" className="flex items-center justify-center mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300">
            <img 
              src={`${baseUrl}images/knodo mark(bb).png`}
              alt="knodo logo" 
              className="w-20 h-20 mr-2"
            />
            <div>
              <h1 className="text-4xl font-black text-white tracking-widest uppercase">knodo</h1>
              <h2 className="text-sm font-light text-gray-400 tracking-wider">knock the Door</h2>
            </div>
          </Link>
        </div>
        <nav className="flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-light transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:text-white ${
                  isActive ? 'text-white font-semibold border-l-2 border-white pl-4' : 'text-gray-400 pl-4'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Separator Line */}
          <div className="border-t border-gray-600 mx-4 my-4"></div>
          
          {/* YouTube Channel Link */}
          <a
            href="https://www.youtube.com/@knodopresent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-base font-light transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:text-white text-gray-400 pl-4 group"
          >
            <svg 
              className="w-5 h-5 mr-2 fill-current group-hover:text-red-500 transition-colors duration-300" 
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          
          {/* Brunch Blog Link */}
          <a
            href="https://brunch.co.kr/@possimoto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-base font-light transition-all duration-300 ease-in-out transform hover:translate-x-2 hover:text-white text-gray-400 pl-4 group"
          >
            <svg 
              className="w-5 h-5 mr-2 stroke-current group-hover:text-orange-500 transition-colors duration-300" 
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 18L3 21L6 19.5"/>
              <path d="M20 4C15 2 10 5 7 9L5 18L13 16C17 13 20 8 20 4Z"/>
              <path d="M11 10L14 13"/>
            </svg>
            Brunch
          </a>
        </nav>
        <div className="text-xs text-gray-500 font-mono">
          &copy; {new Date().getFullYear()} knodo. All rights reserved.
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-black text-gray-200 p-4 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-300">
            <img 
              src={`${baseUrl}images/knodo mark(bb).png`}
              alt="knodo logo" 
              className="w-8 h-8 mr-2"
            />
            <div>
              <h1 className="text-xl font-black text-white tracking-widest uppercase">knodo</h1>
            </div>
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-200 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-light transition-all duration-300 ease-in-out py-2 px-2 rounded ${
                      isActive ? 'text-white font-semibold bg-gray-800' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              {/* Separator Line for Mobile */}
              <div className="border-t border-gray-600 mx-2 my-3"></div>
              
              {/* YouTube Channel Link for Mobile */}
              <a
                href="https://www.youtube.com/@knodopresent"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center text-base font-light transition-all duration-300 ease-in-out py-2 px-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 group"
              >
                <svg 
                  className="w-4 h-4 mr-2 fill-current group-hover:text-red-500 transition-colors duration-300" 
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
              
              {/* Brunch Blog Link for Mobile */}
              <a
                href="https://brunch.co.kr/@possimoto"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center text-base font-light transition-all duration-300 ease-in-out py-2 px-2 rounded text-gray-400 hover:text-white hover:bg-gray-800 group"
              >
                <svg 
                  className="w-4 h-4 mr-2 stroke-current group-hover:text-orange-500 transition-colors duration-300" 
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 18L3 21L6 19.5"/>
                  <path d="M20 4C15 2 10 5 7 9L5 18L13 16C17 13 20 8 20 4Z"/>
                  <path d="M11 10L14 13"/>
                </svg>
                Brunch
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Sidebar;
