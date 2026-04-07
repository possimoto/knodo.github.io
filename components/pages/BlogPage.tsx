
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';
import { BlogPost } from '../../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <div className="bg-black bg-opacity-30 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out border border-gray-700 hover:border-gray-500">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs sm:text-sm text-gray-400 break-words">{post.category}</p>
          {post.readTime && (
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{post.readTime}</span>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 hover:text-blue-300 transition-colors break-words line-clamp-2">{post.title}</h3>
        <p className="text-gray-300 font-light mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base break-words">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 font-mono break-words">{post.date}</div>
          <div className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 ml-2">
            더 읽기 →
          </div>
        </div>
        {post.tags && (
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-600 bg-opacity-30 text-gray-400 rounded break-words">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('A short sentence');

  // 모든 카테고리 추출 및 정렬 (포스트가 없어도 모든 카테고리 표시)
  const categories = useMemo(() => {
    const fixedCategories = [
      'A short sentence',
      'Recent Interest',
      'Culture & Art Review', 
      'Essay',
      'Others'
    ];
    return ['전체', ...fixedCategories];
  }, []);

  // 선택된 카테고리에 따른 포스트 필터링
  const filteredPosts = useMemo(() => {
    if (selectedCategory === '전체') {
      return BLOG_POSTS;
    }
    return BLOG_POSTS.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen -m-6 sm:-m-8 md:-m-12 p-6 sm:p-8 md:p-12">
      {/* Background matching HomePage */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800" />
      <div className="relative max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Blog</h1>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">생각의 파편과 기록들</p>
        
        {/* Category Filter */}
        <div className="border-b border-gray-700">
          <div className="flex flex-wrap gap-1 sm:gap-2 pb-3 sm:pb-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-blue-800 text-white shadow-lg transform scale-105'
                    : 'bg-black bg-opacity-30 text-gray-300 hover:bg-opacity-50 hover:text-white'
                }`}
              >
                {category}
                {category !== 'A short sentence' && (
                  <span className="ml-1 sm:ml-2 text-xs opacity-75">
                    ({category === '전체' ? BLOG_POSTS.length : BLOG_POSTS.filter(p => p.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-4 sm:space-y-6">
        {/* Selected Category Info */}
        {selectedCategory !== 'A short sentence' && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {selectedCategory === '전체' ? '모든 글' : selectedCategory}
            </h2>
            <span className="text-gray-400 text-sm">
              {filteredPosts.length}개의 글
            </span>
          </div>
        )}

        {/* Posts */}
        {selectedCategory === 'A short sentence' ? (
          // Notion Embed for A short sentence category
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-lg shadow-lg">
            <iframe 
              src="https://possimoto.notion.site/ebd/663803e0a36b4357b3add188cf517f69" 
              width="100%" 
              height="600"
              className="sm:h-[700px] md:h-[800px]"
              frameBorder="0" 
              allowFullScreen
              style={{borderRadius: '8px'}}
            />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="text-gray-400 text-base sm:text-lg mb-2">해당 카테고리에 글이 없습니다</div>
            <button
              onClick={() => setSelectedCategory('전체')}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
            >
              전체 글 보기
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default BlogPage;
