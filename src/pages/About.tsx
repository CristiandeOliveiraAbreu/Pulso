import React from 'react';
import { BlogLayout } from '../components/BlogLayout';
import { useBlog } from '../context/BlogContext';
import { PenTool, Target, Users } from 'lucide-react';

export default function About() {
  const { data } = useBlog();

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto space-y-12 py-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
            {data.about.title}
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="text-lg md:text-xl font-serif italic text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {data.about.quote}
          </p>
        </section>

        {/* Long Text Section - Clean Sans */}
        <section className="max-w-3xl mx-auto py-4">
          <div className="text-xl md:text-2xl font-sans font-medium text-slate-700 leading-relaxed text-center whitespace-pre-line px-6">
            {data.about.detailedText}
          </div>
        </section>

        {/* Footer Note */}
        <section className="text-center pt-10 border-t border-slate-100">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
            PULSO • EST. 2026 • TODOS OS DIREITOS RESERVADOS
          </div>
        </section>
      </div>
    </BlogLayout>
  );
}
