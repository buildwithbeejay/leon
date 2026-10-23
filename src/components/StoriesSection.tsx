import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, MessageSquare, Send, Check, Heart } from 'lucide-react';
import { TravelStory } from '../types';
import { soundEffects } from '../utils/audio';

interface StoriesSectionProps {
  stories: TravelStory[];
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ stories }) => {
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Interactive reader comments
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    'machu-picchu-expedition': [
      { author: 'Camilla Thorne', text: 'I took my plush bear to Peru last year! Paco’s tip about the 6 AM bus was a lifesaver.', date: '2 days ago' },
      { author: 'Mateo R.', text: 'The photo with the wild alpaca in Inti Punku is legendary!', date: 'Last week' }
    ],
    'parisian-croissant-chronicles': [
      { author: 'Sophie Laurent', text: 'The navy beret is peak Parisian couture. 10/10.', date: '3 days ago' }
    ]
  });

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const categories = ['All', 'Mountain Treks', 'Culinary Quests', 'Culture & Temples'];

  const filteredStories = stories.filter((story) => {
    if (selectedCategory === 'All') return true;
    return story.category === selectedCategory;
  });

  const handleAddComment = (storyId: string) => {
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    soundEffects.playStamp();

    setComments((prev) => ({
      ...prev,
      [storyId]: [
        ...(prev[storyId] || []),
        {
          author: newCommentName.trim(),
          text: newCommentText.trim(),
          date: 'Just now'
        }
      ]
    }));

    setNewCommentName('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  return (
    <section id="stories" className="py-20 bg-[#F7F2EA] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723]">
              Chronicles & Travel Diaries
            </h2>
            <p className="text-base text-[#665D52] mt-2 max-w-2xl">
              Unfiltered reflections on slow travel, cultural customs, high-altitude breathlessness, and the pursuit of the world’s flakiest pastry.
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-xl self-start md:self-auto border border-[#E0D8CB]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#2B2723] text-white shadow-xs'
                    : 'text-[#665D52] hover:text-[#2B2723]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              onClick={() => {
                soundEffects.playPop();
                setSelectedStory(story);
              }}
              className="bg-white rounded-3xl border border-[#E0D8CB] overflow-hidden hover:border-[#C85A32] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#EFEAE1]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Location unboxed stamp badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-md text-xs font-semibold text-[#2B2723] shadow-xs flex items-center gap-1.5">
                  <span>{story.flag}</span>
                  <span>{story.location}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-[#736B5F] mb-3 font-medium">
                    <span className="text-[#C85A32] font-semibold">{story.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {story.readTime}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#2B2723] group-hover:text-[#E8734A] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-sm text-[#575046] mt-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex items-center justify-between">
                  <span className="text-xs text-[#8C8276] font-medium">
                    {comments[story.id]?.length || 0} Fellow Traveler Reflections
                  </span>

                  <span className="text-sm font-semibold text-[#2B2723] group-hover:text-[#E8734A] flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    Read Story <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div 
            className="bg-[#FAF8F5] w-full max-w-3xl rounded-3xl border border-[#DED5C7] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative aspect-16/9 bg-[#2B2723] shrink-0">
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedStory(null);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close story"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F4C056] mb-1.5">
                  <span>{selectedStory.flag} {selectedStory.location}</span>
                  <span>·</span>
                  <span>{selectedStory.date}</span>
                  <span>·</span>
                  <span>{selectedStory.readTime}</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
                  {selectedStory.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Story Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Lead Paragraph */}
              <p className="font-editorial text-lg sm:text-xl text-[#2B2723] leading-relaxed italic border-l-2 border-[#E8734A] pl-4">
                {selectedStory.fullArticle.lead}
              </p>

              {/* Story Sections */}
              <div className="space-y-6 text-[#4A433A] leading-relaxed text-sm sm:text-base">
                {selectedStory.fullArticle.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="font-editorial text-xl font-bold text-[#2B2723]">
                      {section.heading}
                    </h4>
                    <p>{section.content}</p>
                    {section.quote && (
                      <div className="my-4 py-3 px-5 bg-[#F2ECE1] rounded-2xl font-editorial italic text-base text-[#2B2723]">
                        {section.quote}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Dos & Don'ts */}
              <div className="p-5 rounded-2xl bg-white border border-[#E0D8CB] space-y-4">
                <h4 className="font-editorial text-lg font-bold text-[#2B2723] flex items-center gap-2">
                  <span>🦙 Paco’s Field Dos & Don’ts</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
                  <div className="space-y-2">
                    <span className="font-bold text-[#206637] uppercase tracking-wider block">Do This:</span>
                    <ul className="space-y-1.5 list-disc list-inside text-[#332F2A]">
                      {selectedStory.fullArticle.pacoDosAndDonts.dos.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="font-bold text-[#A64A26] uppercase tracking-wider block">Avoid This:</span>
                    <ul className="space-y-1.5 list-disc list-inside text-[#332F2A]">
                      {selectedStory.fullArticle.pacoDosAndDonts.donts.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reader Notes & Comments */}
              <div className="pt-6 border-t border-[#EAE3D6] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-lg font-bold text-[#2B2723] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#C85A32]" />
                    <span>Traveler Reflections</span>
                  </h4>
                  <span className="text-xs text-[#8C8276]">
                    {(comments[selectedStory.id] || []).length} notes
                  </span>
                </div>

                {/* Comment list */}
                <div className="space-y-3">
                  {(comments[selectedStory.id] || []).map((c, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-[#EAE3D6] text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#2B2723]">{c.author}</span>
                        <span className="text-[#8C8276] text-[10px]">{c.date}</span>
                      </div>
                      <p className="text-[#575046]">{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Leave a note form */}
                <div className="bg-[#F2ECE1] p-4 rounded-2xl space-y-2.5">
                  <span className="text-xs font-semibold text-[#2B2723] block">
                    Leave a travel note for Paco:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="px-3 py-2 text-xs rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                    />
                    <div className="sm:col-span-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Share a tip or impression..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                      />
                      <button
                        onClick={() => handleAddComment(selectedStory.id)}
                        className="px-3 py-2 bg-[#E8734A] text-white rounded-xl text-xs font-semibold hover:bg-[#D55F37] transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Post
                      </button>
                    </div>
                  </div>
                  {commentSuccess && (
                    <p className="text-xs text-[#206637] font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Note published to Paco’s travel ledger!
                    </p>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
