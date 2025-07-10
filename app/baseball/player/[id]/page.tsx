import { notFound } from 'next/navigation';
import { PlayerCard } from '@/components/baseball/PlayerCard';
import { getPlayerById } from '@/hooks/usePlayer';
import { transformPlayerData, getPlayerIdFromParams } from '@/utils/playerHelpers';

interface PlayerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const resolvedParams = await params;
  const playerId = getPlayerIdFromParams(resolvedParams);
  const player = await getPlayerById(playerId);
  
  if (!player) {
    notFound();
  }
  
  const playerData = transformPlayerData(player);
  
  return <PlayerCard player={playerData} />;
}

// 動的メタデータの生成
export async function generateMetadata({ params }: PlayerPageProps) {
  const resolvedParams = await params;
  const playerId = getPlayerIdFromParams(resolvedParams);
  const player = await getPlayerById(playerId);
  
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