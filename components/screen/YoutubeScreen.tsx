import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Users, Play } from 'lucide-react';

export default function YoutubeSection() {
  return (
    <section id="live" className="relative w-full min-h-screen overflow-hidden bg-black z-50">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <Image
          fill
          src="/main1.webp"
          sizes="100vw"
          quality={100}
          alt="Background"
          className="object-cover"
          priority
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="flex-1 flex flex-col justify-center px-6 py-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-20">
              {/* Status Badge */}
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm mb-5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                <span className="text-green-400 text-sm font-medium tracking-wide">
                  リアルタイム配信中
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  2025年度 全校応援
                </span>
              </h1>
            </div>

            {/* Video Section */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Video Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur-sm bg-white/5">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Video with aspect ratio */}
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/jfKfPfyJRdk?si=PflCs7ooVOCJUXi9&autoplay=1&mute=1&loop=1&rel=0&modestbranding=1"
                      title="Gameplay Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button with Next Link */}
            <div className="flex justify-center">
              <Link href="/desc" className="inline-block">
                <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-500/30 transition-all duration-300">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-lg font-medium tracking-wide">
                    選手一覧を見る
                  </span>
                  <ChevronRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}