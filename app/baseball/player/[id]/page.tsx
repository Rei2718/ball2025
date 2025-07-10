import { notFound } from 'next/navigation';
import { PlayerCard } from '@/components/baseball/PlayerCard';
import { createClient } from '@/supabase/server';
import { transformPlayerData, getPlayerIdFromParams } from '@/utils/playerHelpers';

interface PlayerPageProps {
  params: {
    id: string;
  };
}

// プレイヤーデータを取得
async function getPlayer(id: string) {
  const supabase = await createClient();
  
  const { data: player, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !player) {
    return null;
  }
  
  return player;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const playerId = getPlayerIdFromParams(params);
  const player = await getPlayer(playerId);
  
  if (!player) {
    notFound();
  }
  
  const playerData = transformPlayerData(player);
  
  return <PlayerCard player={playerData} />;
}

// 動的メタデータの生成
export async function generateMetadata({ params }: PlayerPageProps) {
  const playerId = getPlayerIdFromParams(params);
  const player = await getPlayer(playerId);
  
  if (!player) {
    return {
      title: '選手が見つかりません',
    };
  }
  
  return {
    title: `${player.player_name} - 立命館慶祥野球部`,
    description: `${player.position} ${player.grade}年 #${player.player_number}`,
  };
}