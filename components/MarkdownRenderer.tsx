
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple regex-based formatter for Gemini's common markdown patterns
  const formatted = content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^\s*-\s+(.*)$/gm, '<li class="ml-4 list-disc text-slate-700 mb-2">$1</li>')
    .split('\n').map(line => line.trim() === '' ? '<br/>' : `<p class="mb-4 text-slate-700 leading-relaxed">${line}</p>`)
    .join('');

  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: formatted }}
    />
  );
};

export default MarkdownRenderer;
