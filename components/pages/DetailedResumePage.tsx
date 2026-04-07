import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailedResumePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 -m-6 sm:-m-8 md:-m-12 p-6 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/about')}
            className="mr-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            ← About으로 돌아가기
          </button>
          <h1 className="text-5xl sm:text-6xl font-bold text-white border-b-2 border-gray-700 pb-6">
            상세 이력서
          </h1>
        </div>
        
        <div className="bg-black bg-opacity-20 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 mb-4">
            <h2 className="text-3xl font-semibold text-white mb-4">김정웅 대표이사</h2>
            <p className="text-lg text-gray-300 mb-6">상세 이력 정보</p>
          </div>
          
          <div className="relative w-full" style={{ height: '80vh' }}>
            <iframe
              src="https://possimoto.notion.site/ebd/f764ad3220874ff1bcd08c3f4822f980"
              className="w-full h-full border-0"
              title="상세 이력서"
              allow="fullscreen"
            />
          </div>
          
          <div className="p-6 bg-gray-800 bg-opacity-50">
            <p className="text-gray-400 text-center">
              상세 이력서가 제대로 표시되지 않는 경우{' '}
              <a 
                href="https://possimoto.notion.site/ebd/f764ad3220874ff1bcd08c3f4822f980" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900 underline"
              >
                여기를 클릭
              </a>
              해서 새 창에서 확인하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedResumePage; 