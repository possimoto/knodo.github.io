
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import DetailedResumePage from './components/pages/DetailedResumePage';
import BlogPage from './components/pages/BlogPage';
import BlogDetailPage from './components/pages/BlogDetailPage';
import CreativeWaveLearningPage from './components/pages/CreativeWaveLearningPage';
import ContactPage from './components/pages/ContactPage';

const App: React.FC = () => {
  return (
    <div 
      className="flex min-h-screen bg-gray-900 text-gray-200 bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-60 z-0"></div>
      <Sidebar />
      <main className="flex-1 lg:ml-64 relative z-10 overflow-y-auto">
        <div className="p-6 sm:p-8 md:p-12 pt-20 lg:pt-6 sm:pt-24 md:pt-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/detailed-resume" element={<DetailedResumePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/creative-wave-learning" element={<CreativeWaveLearningPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
