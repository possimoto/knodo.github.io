
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState<'goals' | 'curriculum' | 'target'>('goals');
  const navigate = useNavigate();

  // 유튜브 URL을 임베드 형태로 변환하는 함수
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : '';
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  // 오픈(온라인) 강의의 경우 유튜브 임베드 레이아웃
  if (course.youtubeUrl) {
    const isPlaceholder = course.youtubeUrl.includes('placeholder');
    
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-blue-800 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col w-full">
        {/* 유튜브 비디오 또는 준비중 메시지 */}
        <div className="relative aspect-video bg-gray-100 w-full">
          {isPlaceholder ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <div className="text-center p-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base">영상 준비 중</p>
              </div>
            </div>
          ) : (
            <iframe
              src={getEmbedUrl(course.youtubeUrl)}
              title={course.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* 강의 정보 */}
        <div className="p-4 sm:p-6 flex-grow">
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 break-words">{course.title}</h3>
          <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base break-words">{course.description}</p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-3 sm:mb-4 space-y-2 sm:space-y-0">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium text-xs sm:text-sm w-fit">{course.level}</span>
            <span className="text-xs sm:text-sm">{course.duration}</span>
            <span className="font-semibold text-green-600 text-sm sm:text-base">{course.price}</span>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {course.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded break-words">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 sm:p-4">
          <button onClick={handleContactClick} className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded transition-colors text-sm sm:text-base">
            바로 시청하기
          </button>
        </div>
      </div>
    );
  }

  // 기존 유료 강의 레이아웃
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-blue-800 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-4 sm:p-6 text-white">
        <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{course.title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm opacity-90 space-y-2 sm:space-y-0">
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded w-fit">{course.level}</span>
          <span className="text-xs sm:text-sm">{course.duration}</span>
          <span className="font-semibold text-sm sm:text-base">{course.price}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {[
          { key: 'goals', label: '학습목표' },
          { key: 'curriculum', label: '커리큘럼' },
          { key: 'target', label: '대상' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 min-w-0 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'text-blue-800 border-b-2 border-blue-800 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 flex-grow overflow-hidden">
        {activeTab === 'goals' && (
          <div className="space-y-2 sm:space-y-3">
            {course.learningGoals.map((goal, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                <p className="text-gray-700 text-xs sm:text-sm break-words">{goal}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-2 sm:space-y-3">
            {course.curriculum.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-xs sm:text-sm break-words">{item}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'target' && (
          <div className="space-y-2 sm:space-y-3">
            {course.targetAudience && course.targetAudience.map((target, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-800 rounded-full mt-2"></div>
                <p className="text-gray-700 text-xs sm:text-sm break-words">{target}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 sm:p-4">
        <button onClick={handleContactClick} className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded transition-colors text-sm sm:text-base">
          수강문의하기
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
