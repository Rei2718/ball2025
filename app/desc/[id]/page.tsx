import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPlayer } from './action';
import { ChevronLeft, User } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const player = await getPlayer(id);
  
  if (!player) {
    return {
      title: '選手が見つかりません - 立命館慶祥野球部',
      description: '指定された選手の情報が見つかりませんでした。',
    };
  }
  
  const playerTitle = `${player.player_name} - 立命館慶祥野球部`;
  const playerDescription = `${player.position} ${player.grade}年${player.player_number ? ` 背番号${player.player_number}` : ''}`;
  
  return {
    title: playerTitle,
    description: playerDescription,
  };
}

export default async function PlayerScreen({ params }: PageProps) {
  const { id } = await params;
  const player = await getPlayer(id);

  if (!player) {
    notFound();
  }
  
  return (
    <main className="min-h-screen">

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-4xl">
        {/* Navigation - Apple HIG Style */}
        <nav className="mb-8 sm:mb-12">
          <Link
            href="/desc"
            className="inline-grid grid-cols-[auto_1fr] items-center gap-2 text-white/60 hover:text-white/90 transition-colors duration-150"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm text-white/50">選手一覧</span>
          </Link>
        </nav>
        
        {/* Player Header - Improved Layout */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Top Section - Number and Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
            {/* Left Side - Number */}
            {player.player_number && (
              <div className="text-left">
                <span className="text-[10px] sm:text-xs text-green-400/60 uppercase tracking-wider mb-1 block">Jersey Number</span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  #{String(player.player_number).padStart(2, '0')}
                </div>
              </div>
            )}
            
            {/* Right Side - Position and Grade */}
            <div className="text-right">
              <div className="inline-block text-center">
                <div className="inline-grid grid-cols-[auto_1fr] items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-500/10 mb-2 sm:mb-3">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-green-400 font-medium text-sm sm:text-base">{player.position}</span>
                </div>
                <span className="text-white/60 text-base sm:text-lg block">{player.grade}年生</span>
              </div>
            </div>
          </div>
          
          {/* Center Section - Player Name */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
              <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                {player.player_name}
              </span>
            </h1>
          </div>
          
          {/* Divider */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="h-[2px] w-11/12 bg-gradient-to-r from-transparent via-green-500/30 to-transparent inline-block" />
          </div>
        </div>
        
        {/* Lyric Section - Improved */}
        {player.lyric && (
          <section className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="relative">
              
              {/* Content Card */}
              <div className="relative group">
                {/* Subtle Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative bg-black/1 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10">
                  <pre className="text-white/90 text-center leading-relaxed text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium whitespace-pre-wrap">
                    {player.lyric}
                  </pre>
                  
                  {player.music_url && (
                    <div className="mt-6 sm:mt-8 md:mt-10 max-w-md mx-auto">
                      {/* Remove custom background, let native player show through */}
                      <audio 
                        controls 
                        className="w-full h-14 rounded-xl"
                      >
                        <source src={player.music_url} type="audio/mpeg" />
                        お使いのブラウザは音声再生に対応していません。
                      </audio>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Player Image Section - Apple HIG Style */}
        {player.player_img && (
          <div className="relative">
            {/* Subtle Background Element */}
            {player.player_number && (
              <div className="absolute inset-0 text-center overflow-hidden pointer-events-none">
                <span className="text-[30vw] sm:text-[25vw] md:text-[20vw] font-thin text-white/[0.01] select-none tracking-tighter inline-block">
                  {String(player.player_number).padStart(2, '0')}
                </span>
              </div>
            )}
            
            {/* Image Container */}
            <div className="relative z-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              <div className="relative">
                {/* Clean Image Frame */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src={player.player_img}
                    alt={`${player.player_name}選手`}
                    width={600}
                    height={900}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}