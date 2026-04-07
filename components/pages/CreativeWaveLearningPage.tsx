
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FREE_COURSES_DATA, PAID_COURSES_DATA } from '../../constants';
import CourseCard from '../CourseCard';

const CreativeWaveLearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'free' | 'paid'>('free');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="min-h-screen bg-white -m-6 sm:-m-8 md:-m-12 p-6 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Logo */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8 -ml-0 sm:-ml-4 md:-ml-8">
            <div className="relative mb-4 sm:mr-4 sm:mb-0 flex-shrink-0">
              <img 
                src={`${baseUrl}images/knodo CWL mark(bb).png`}
                alt="Creative Wave Learning Logo" 
                className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.2)) brightness(1.1) contrast(1.2)',
                  aspectRatio: '1'
                }}
              />
              {/* Background circle for better contrast */}
              <div 
                className="absolute inset-0 -z-10 rounded-full bg-gray-100 bg-opacity-50"
                style={{
                  filter: 'blur(8px)',
                  transform: 'scale(1.1)'
                }}
              />
            </div>
            <div className="flex-1 flex flex-col min-w-0 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-blue-800 leading-tight break-words">
                Creative Wave Learning
              </h1>
              <div className="flex justify-center sm:justify-end mt-2 sm:mt-4">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  지식과 경험을 함께 공유하는 열린 교육 공간입니다.
                </p>
              </div>
            </div>
          </div>
          
          {/* 오픈(온라인)강의/유료 탭 선택 */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-gray-100 rounded-lg p-1 w-full max-w-md sm:w-auto">
              <button
                onClick={() => setActiveTab('free')}
                className={`w-1/2 sm:w-auto px-4 sm:px-8 py-3 rounded-md font-semibold transition-all duration-200 text-sm sm:text-base ${
                  activeTab === 'free'
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                오픈(온라인)강의
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={`w-1/2 sm:w-auto px-4 sm:px-8 py-3 rounded-md font-semibold transition-all duration-200 text-sm sm:text-base ${
                  activeTab === 'paid'
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                유료
              </button>
            </div>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          
          {/* 준비 중 안내 섹션 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 md:p-8 mx-auto max-w-2xl text-center mt-6 sm:mt-8 mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">강의 준비 중</h3>
            <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
              현재 Creative Wave Learning 강의 콘텐츠를 준비하고 있습니다.<br/>
              곧 다양하고 유익한 강의로 찾아뵙겠습니다.
            </p>
          </div>
        </div>
        
        <div className="space-y-8 sm:space-y-12 md:space-y-16 mt-8 sm:mt-12">
          {activeTab === 'free' ? (
            // 오픈(온라인)강의 섹션
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 pl-4 border-l-4 border-blue-800">
                오픈(온라인)강의
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {FREE_COURSES_DATA.map((course, courseIndex) => (
                  <CourseCard key={courseIndex} course={course} />
                ))}
              </div>
            </div>
          ) : (
            // 유료 강의 섹션
            PAID_COURSES_DATA.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 pl-4 border-l-4 border-blue-800">
                  {category.categoryTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {category.courses.map((course, courseIndex) => (
                    <CourseCard key={courseIndex} course={course} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeWaveLearningPage;
