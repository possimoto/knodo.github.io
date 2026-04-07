
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-6 w-6 text-gray-400">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // EmailJS 설정 - 환경 변수 사용 (배포 시 안전)
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mdi118f';
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_1xb5bxi';
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'P_dpL3pI3Vi2SuyrZ';

    try {
      // EmailJS를 사용하여 이메일 전송
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'knodo.kr@gmail.com',
          // 추가 변수들 (EmailJS 기본 변수명도 포함)
          user_name: formData.name,
          user_email: formData.email,
          reply_to: formData.email
        },
        PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // 3초 후 성공 메시지 숨김
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      console.error('EmailJS 설정값:', {
        SERVICE_ID,
        TEMPLATE_ID,
        PUBLIC_KEY: PUBLIC_KEY.substring(0, 5) + '...' // 보안을 위해 일부만 표시
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen -m-6 sm:-m-8 md:-m-12 p-6 sm:p-8 md:p-12">
      {/* Background matching HomePage */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />
      <div className="relative max-w-4xl mx-auto flex flex-col justify-center min-h-[70vh]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 border-b-2 border-gray-700 pb-4">Contact</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* 기존 Contact 정보 */}
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg space-y-6">
            <div className="text-base sm:text-lg text-gray-300">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">문의를 환영합니다</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>새로운 프로젝트 제안</li>
                <li>협업 및 파트너십 문의</li>
                <li>강의 및 워크숍 요청</li>
                <li>기타 궁금한 사항</li>
              </ul>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex items-center">
                <MailIcon />
                <a href="mailto:knodo.kr@gmail.com" className="text-base sm:text-lg text-white hover:text-gray-300 transition-colors">
                  knodo.kr@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">문의하기</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  이름 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="홍길동"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  이메일 주소 <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="example@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  문의내용 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="문의하실 내용을 입력해주세요."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? '전송 중...' : '문의 보내기'}
              </button>
              
              {/* 상태 메시지 */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-900 bg-opacity-50 border border-green-600 rounded-lg text-green-300 text-sm">
                  문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-900 bg-opacity-50 border border-red-600 rounded-lg text-red-300 text-sm">
                  전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
