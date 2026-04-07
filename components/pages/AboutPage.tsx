
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ABOUT_CONTENT } from '../../constants';
import { AboutSection, ExperienceItem } from '../../types';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ceo');
  const baseUrl = import.meta.env.BASE_URL;
  const TABS = Object.keys(ABOUT_CONTENT);
  const activeContent: AboutSection = ABOUT_CONTENT[activeTab];

  const renderContent = (items: ExperienceItem[]) => {
    if (activeTab === 'ceo') {
      // CEO 섹션은 가운데 점으로 표시 (연도 없음)
      return (
        <ul className="space-y-3">
          {items.map((item, index) => {
            // whyartinseoul.com 링크 처리
            if (item.text.includes('whyartinseoul.com')) {
              const parts = item.text.split('(');
              const beforeParen = parts[0];
              const afterParen = parts[1];
              const [linkPart, rest] = afterParen.split(')');
              
              return (
                <li key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 sm:mt-3"></div>
                  <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
                    {beforeParen}(
                    <a 
                      href={`https://${linkPart}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-200 hover:text-blue-300 transition-colors"
                    >
                      {linkPart}
                    </a>
                    ){rest}
                  </p>
                </li>
              );
            }
            
            return (
              <li key={index} className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 sm:mt-3"></div>
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{item.text}</p>
              </li>
            );
          })}
        </ul>
      );
    } else if (activeTab === 'education') {
      // 교육 섹션은 연도와 함께 표시
      return (
        <ul className="space-y-4">
          {items.map((item, index) => {
            // 교육 섹션에서 학교/과목 구분 처리
            if (item.text.includes('|')) {
              const parts = item.text.split('|');
              const institution = parts[0]; // 학교/학과명
              const subjects = parts.slice(1); // 과목들
              
              return (
                <li key={index} className="pb-4 border-b border-gray-700 last:border-b-0">
                  <p className="text-gray-400 font-mono text-sm mb-1">{item.year}</p>
                  <p className="text-gray-200 text-lg font-medium mb-2">{institution}</p>
                  <ul className="ml-4 space-y-1">
                    {subjects.map((subject, subIndex) => (
                      <li key={subIndex}>
                        <p className="text-gray-300 text-base leading-relaxed">{subject.trim()}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            
            return (
              <li key={index} className="pb-4 border-b border-gray-700 last:border-b-0">
                <p className="text-gray-400 font-mono text-sm mb-1">{item.year}</p>
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{item.text}</p>
              </li>
            );
          })}
        </ul>
      );
    } else if (activeTab === 'research' || activeTab === 'papers') {
      // 연구/발표 섹션과 연구논문 섹션은 교육 섹션과 유사하게 날짜 아래에 내용 표시
      return (
        <ul className="space-y-4">
          {items.map((item, index) => {
            if (item.text.includes('|')) {
              const parts = item.text.split('|');
              const institution = parts[0]; // 기관/학회명/저널명
              const research = parts.slice(1).join('|'); // 연구/발표 제목
              
              return (
                <li key={index} className="pb-4 border-b border-gray-700 last:border-b-0">
                  <p className="text-gray-400 font-mono text-sm mb-1">{item.year}</p>
                  <p className="text-gray-200 text-base sm:text-lg font-medium mb-2">{institution}</p>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 text-base leading-relaxed ml-4 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {research.trim()}
                    </a>
                  ) : (
                    <p className="text-gray-300 text-base leading-relaxed ml-4">{research.trim()}</p>
                  )}
                </li>
              );
            }
            
            return (
              <li key={index} className="pb-4 border-b border-gray-700 last:border-b-0">
                <p className="text-gray-400 font-mono text-sm mb-1">{item.year}</p>
                <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{item.text}</p>
              </li>
            );
          })}
        </ul>
      );
    } else {
      // 다른 섹션들은 기존 방식 (연도 + 회색 라인)
      return (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex flex-col sm:flex-row pb-4 border-b border-gray-700 last:border-b-0">
              <p className="w-full sm:w-32 text-gray-400 font-mono text-sm flex-shrink-0 mb-1 sm:mb-0">{item.year}</p>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 -m-6 sm:-m-8 md:-m-12 p-6 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-full">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {ABOUT_CONTENT[tab].title}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-black bg-opacity-20 p-4 sm:p-6 md:p-8 lg:p-16 rounded-lg shadow-lg">
          {activeTab === 'ceo' ? (
            // CEO 섹션 - 이미지와 함께 표시
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src={`${baseUrl}images/kimjeongung.png`}
                    alt="김정웅 대표이사" 
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-3 sm:mb-4">김정웅 대표이사</h2>
                  {activeContent.intro && (
                    <p className="text-lg sm:text-xl text-gray-300 whitespace-pre-line leading-relaxed mb-4 sm:mb-6">{activeContent.intro}</p>
                  )}
                  <button
                    onClick={() => navigate('/about/detailed-resume')}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg text-sm sm:text-base"
                  >
                    상세이력보기
                  </button>
                </div>
              </div>
              <div className="px-2 sm:px-0">
                {renderContent(activeContent.content)}
              </div>
              
              {/* 수상경력 섹션 */}
              {activeContent.awards && (
                <div className="mt-8 sm:mt-10 md:mt-12 px-2 sm:px-0">
                  <div className="bg-gray-800 bg-opacity-50 p-4 sm:p-6 rounded-xl border border-gray-700">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">수상경력</h3>
                    <ul className="space-y-2">
                      {activeContent.awards.map((award, index) => (
                        <li key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <span className="text-gray-400 font-mono text-sm flex-shrink-0 sm:w-24">{award.year}</span>
                          <span className="text-gray-300 text-sm leading-relaxed">{award.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 다른 섹션들 - 기존 방식
            <div className="px-2 sm:px-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 sm:mb-6 text-center md:text-left">{activeContent.title}</h2>
              {activeContent.intro && (
                <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 text-center md:text-left">{activeContent.intro}</p>
              )}
              {renderContent(activeContent.content)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
