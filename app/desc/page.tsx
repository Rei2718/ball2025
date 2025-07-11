import Link from 'next/link';
import { getPlayers } from './action';

export const metadata = {
  title: '選手一覧 - 立命館慶祥野球部',
  description: '2025年度 立命館慶祥野球部のメンバー一覧',
};

export default async function DesScreen() {
  const players = await getPlayers();
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.player_number === null && b.player_number === null) return 0;
    if (a.player_number === null) return 1;
    if (b.player_number === null) return -1;
    return a.player_number - b.player_number;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Year Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm mb-6">
            <span className="text-green-400 text-sm font-medium tracking-wide">
              2025 SEASON
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              チームメンバー
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-white/60 text-lg">
            立命館慶祥野球部 選手一覧
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {sortedPlayers.map((player) => (
            <Link
              key={player.id}
              href={`/desc/${player.id}`}
              className="group relative block"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/30 group-hover:to-emerald-500/30 rounded-2xl blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />

              {/* Player Card */}
              <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 group-hover:border-green-500/30 transition-all duration-300 min-h-[140px]">
                <div className="flex items-center justify-between">
                  {/* Player Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-green-100 transition-colors duration-300 mb-2">
                      {player.player_name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      {/* Position Badge */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                        {player.position}
                      </span>
                      {/* Grade Info - 1年生の場合は表示しない */}
                      {player.grade !== 1 && (
                        <span className="text-white/50">
                          {player.grade}年生
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Player Number */}
                  {player.player_number !== null && (
                    <div className="relative ml-6">
                      {/* Number Glow */}
                      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                      <div className="relative text-4xl font-bold bg-gradient-to-br from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        #{String(player.player_number).padStart(2, '0')}
                      </div>
                    </div>
                  )}
                </div>

                  {/* 詳細リンクを右下に配置 */}
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 text-sm text-green-400/75 group-hover:text-green-400/95 transition-all duration-300">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}