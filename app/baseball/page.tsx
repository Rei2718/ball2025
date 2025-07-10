import Link from 'next/link';
import { createClient } from '@/supabase/server';
import { Player } from '@/schema';

// プレイヤー一覧を取得
async function getPlayers() {
  const supabase = await createClient();
  
  const { data: players, error } = await supabase
    .from('players')
    .select('*')
    .order('player_number', { ascending: true });
    
  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }
  
  return players;
}

// ポジションごとにグループ化
function groupPlayersByPosition(players: Player[]) {
  const grouped = players.reduce((acc, player) => {
    const position = player.position;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(player);
    return acc;
  }, {} as Record<string, Player[]>);
  
  return grouped;
}

export default async function BaseballPage() {
  const players = await getPlayers();
  const groupedPlayers = groupPlayersByPosition(players);
  
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          2025 チームメンバー
        </h1>
        
        {Object.entries(groupedPlayers).map(([position, positionPlayers]) => (
          <div key={position} className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/30 pb-2">
              {position}
            </h2>
            <div className="grid gap-3">
              {positionPlayers.map((player) => (
                <Link
                  key={player.id}
                  href={`/baseball/player/${player.id}`}
                  className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {player.player_name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {player.grade}年生
                      </p>
                    </div>
                    {player.player_number && (
                      <div className="text-2xl font-bold text-white/60">
                        #{player.player_number}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: '選手一覧 - 立命館慶祥野球部',
  description: '2025年度 立命館慶祥野球部のメンバー一覧',
};