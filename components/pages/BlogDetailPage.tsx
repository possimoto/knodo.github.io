import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../constants';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-4xl font-bold text-white mb-4">포스트를 찾을 수 없습니다</h1>
        <p className="text-gray-300 mb-8">요청하신 블로그 포스트가 존재하지 않습니다.</p>
        <Link 
          to="/blog" 
          className="inline-block px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
        >
          블로그로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          블로그로 돌아가기
        </Link>
      </div>

      {/* Article Header */}
      <article className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
        <header className="mb-8 pb-6 border-b border-gray-700">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 text-sm rounded-full">
              {post.category}
            </span>
            {post.tags && post.tags.map((tag, index) => (
              <span key={index} className="inline-block ml-2 px-3 py-1 bg-gray-600 bg-opacity-20 text-gray-300 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              {post.author && (
                <span>작성자: {post.author}</span>
              )}
              <span>{post.date}</span>
              {post.readTime && (
                <span>{post.readTime} 읽기</span>
              )}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              마지막 수정: {post.date}
            </div>
            <Link 
              to="/blog"
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
            >
              목록으로
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetailPage; 