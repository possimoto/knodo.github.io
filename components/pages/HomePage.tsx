import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = searchParams.get('step');
  const baseUrl = import.meta.env.BASE_URL;
  
  const [knockCount, setKnockCount] = useState(0);
  const [isKnocking, setIsKnocking] = useState(false);
  const [waveIntensity, setWaveIntensity] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const texts = [
    '문을 세 번 두드려보세요!'
  ];

  // Reset state when going back to home
  useEffect(() => {
    if (!step || step !== 'welcome') {
      setKnockCount(0);
      setWaveIntensity(0);
      setIsTransitioning(false);
    }
  }, [step]);

  // Typing animation
  useEffect(() => {
    if (step !== 'welcome') {
      const currentText = texts[currentTextIndex];
      let charIndex = 0;
      setDisplayText('');

      const typeInterval = setInterval(() => {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }, 3000);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [currentTextIndex, step]);

  // Heart knock interaction
  const handleHeartKnock = () => {
    if (step === 'welcome') return;
    
    setIsKnocking(true);
    const newKnockCount = knockCount + 1;
    setKnockCount(newKnockCount);
    setWaveIntensity(newKnockCount);
    
    // Shake effect
    if (containerRef.current) {
      containerRef.current.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.animation = '';
        }
      }, 500);
    }
    
    setTimeout(() => setIsKnocking(false), 1000);
    
    // Navigate to welcome screen after 3 knocks with transition effect
    if (newKnockCount >= 3) {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate('/?step=welcome');
      }, 500);
    }
  };

  // Welcome screen content
  if (step === 'welcome') {
    return (
      <div className="relative h-screen flex flex-col justify-center items-center text-center text-white -m-12 p-12 overflow-hidden">
        {/* Ocean Background */}
        <div className="absolute inset-0">
          {/* Ocean Image Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
          
          {/* Ocean Overlay for better text readability */}
          <div className="absolute inset-0 bg-slate-900 bg-opacity-50" />
        </div>

        {/* Welcome Content */}
        <div className="relative z-20 max-w-6xl mx-auto text-center">
          {/* Main Welcome Message */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-8">
              <span className="text-white drop-shadow-2xl">
                어서오세요!
              </span>
            </h1>
            
            <div className="space-y-6">
              <p className="text-2xl sm:text-3xl md:text-4xl text-white font-light drop-shadow-lg">
                당신 마음의 문을 두드립니다
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow">
                노도처럼 밀려드는 파도와 몰아일체가 될 준비가 되어 있나요?<br />
                노도(knodo)와 함께 새로운 여정을 시작하세요
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            {/* Primary Actions */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-8 sm:flex sm:justify-center">
              <Link
                to="/about"
                className="group relative inline-block px-10 py-4 text-base md:text-lg font-semibold text-white border-2 border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-900 transform hover:scale-105"
              >
                <span className="relative z-10">knodo 알아보기</span>
              </Link>
              
              <Link
                to="/creative-wave-learning"
                className="group relative inline-block px-10 py-4 text-base md:text-lg font-semibold text-white border-2 border-white transition-all duration-300 ease-in-out hover:bg-white hover:text-slate-900 transform hover:scale-105"
              >
                <span className="relative z-10">Creative Wave Learning</span>
              </Link>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <Link
                to="/blog"
                className="text-white hover:text-gray-200 transition-colors duration-300 text-lg border-b border-transparent hover:border-gray-200"
              >
                블로그 둘러보기
              </Link>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <Link
                to="/contact"
                className="text-white hover:text-gray-200 transition-colors duration-300 text-lg border-b border-transparent hover:border-gray-200"
              >
                문의하기
              </Link>
            </div>

            {/* Reset link */}
            <div className="mt-12">
              <Link
                to="/"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 border-b border-transparent hover:border-gray-300"
              >
                다시 문을 두드리러 가기 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default door knocking screen
  return (
    <div 
      ref={containerRef}
      className="relative h-screen flex flex-col justify-center items-center text-center text-white -m-12 p-12 overflow-hidden"
    >
      {/* Dynamic Wave Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />
        
        {/* Wave layers based on knock intensity */}
        {[...Array(waveIntensity)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 opacity-30"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <svg 
              className="absolute w-full h-full animate-wave-expand" 
              viewBox="0 0 1200 800" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id={`waveGradient${i}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                  <stop offset="50%" stopColor="rgba(147, 51, 234, 0.3)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle 
                cx="600" 
                cy="400" 
                r="50"
                fill={`url(#waveGradient${i})`}
                className="animate-ripple"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Central Knodo Door Logo Portal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* KNODO Text Above Door */}
        <div className="mb-8 md:mb-12">
          <h1 
            className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase transition-all duration-1000 ${
              waveIntensity > 0 ? 'text-blue-300' : 'text-white'
            }`}
            style={{ 
              textShadow: waveIntensity > 0 
                ? '0 0 30px rgba(59, 130, 246, 0.6)' 
                : '0 0 20px rgba(255, 255, 255, 0.3)',
              filter: isKnocking ? 'blur(1px)' : 'none'
            }}
          >
            knodo
          </h1>
          
          {/* Subtitle */}
          <p className={`text-center text-lg md:text-xl lg:text-2xl tracking-[0.3em] uppercase transition-all duration-1000 mt-2 ${
            waveIntensity > 0 ? 'text-blue-300' : 'text-gray-300'
          }`}>
            노도 • どとう • 怒濤
          </p>
        </div>

        {/* Door Mark Image */}
        <div 
          className={`relative cursor-pointer transform transition-all duration-300 ${
            isKnocking ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={handleHeartKnock}
        >
          {/* Knodo Door Only Image */}
          <div 
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
            style={{
              filter: isKnocking 
                ? 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.8)) brightness(1.2)' 
                : 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'
            }}
          >
            {/* Door Only Image (pure door without text) */}
            <img 
              src={`${baseUrl}images/knodo logo(only).png`}
              alt="knodo door only"
              className={`w-full h-full object-contain transition-all duration-500 ${
                isKnocking ? 'animate-pulse brightness-110' : ''
              }`}
              style={{
                filter: waveIntensity > 0 
                  ? `hue-rotate(${waveIntensity * 10}deg) saturate(${100 + waveIntensity * 20}%)` 
                  : 'none'
              }}
            />
            
            {/* Interactive Glow Overlay */}
            <div 
              className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                isKnocking ? 'bg-blue-400 bg-opacity-20' : 'bg-transparent'
              }`}
              style={{
                boxShadow: isKnocking 
                  ? '0 0 60px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.3)' 
                  : 'none'
              }}
            />
            

          </div>
        </div>

        {/* Transition Effect - Circle Expand */}
        {isTransitioning && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="transition-circle" />
          </div>
        )}

        {/* Instruction text below door */}
        <div className="mt-8 text-center">
          <div>
            <p className={`text-lg sm:text-xl md:text-2xl font-light mb-4 transition-all duration-500 ${
              waveIntensity > 0 ? 'text-blue-200' : 'text-gray-200'
            }`}>
              <span className="typing-text">{displayText}</span>
            </p>
            <p className="text-sm text-gray-400">
              {knockCount === 1 && "좋습니다. 계속 두드려보세요 (2번 더)"}
              {knockCount === 2 && "거의 다 왔습니다! (1번 더)"}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Animations and Styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-2px) translateY(-1px); }
          20% { transform: translateX(2px) translateY(1px); }
          30% { transform: translateX(-1px) translateY(-2px); }
          40% { transform: translateX(1px) translateY(2px); }
          50% { transform: translateX(-2px) translateY(-1px); }
          60% { transform: translateX(2px) translateY(1px); }
          70% { transform: translateX(-1px) translateY(-2px); }
          80% { transform: translateX(1px) translateY(2px); }
          90% { transform: translateX(-2px) translateY(-1px); }
        }
        
        @keyframes ripple {
          0% {
            r: 50;
            opacity: 0.8;
          }
          100% {
            r: 300;
            opacity: 0;
          }
        }
        
        @keyframes wave-expand {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(3) rotate(180deg);
            opacity: 0;
          }
        }
        

        
        .animate-ripple {
          animation: ripple 2s ease-out infinite;
        }
        
        .animate-wave-expand {
          animation: wave-expand 3s ease-out infinite;
        }
        
        .typing-text {
          min-height: 1.2em;
          display: inline-block;
        }
        
        @keyframes circle-expand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(15);
            opacity: 1;
          }
        }
        
        .transition-circle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, 
            rgba(20, 184, 166, 0.95) 0%,
            rgba(13, 148, 136, 0.9) 30%,
            rgba(15, 118, 110, 0.85) 70%,
            rgba(55, 65, 81, 0.9) 100%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: circle-expand 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .typing-text {
            font-size: 1rem;
            line-height: 1.5;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;