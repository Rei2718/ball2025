'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Player, CurrentPlayer } from '@/schema';
import { PlayerCard } from '@/components/baseball/PlayerCard';
import { transformPlayerData } from '@/utils/playerHelpers';

interface CurrentPlayerDisplayProps {
  initialData: {
    currentPlayer: CurrentPlayer | null;
    player: Player | null;
  };
}

export function CurrentPlayerDisplay({ initialData }: CurrentPlayerDisplayProps) {
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer | null>(initialData.currentPlayer);
  const [player, setPlayer] = useState<Player | null>(initialData.player);

  useEffect(() => {
    const supabase = createClient();

    // 最新のプレイヤーデータを取得
    const fetchLatestData = async () => {
      // current_playerテーブルから最新データを取得
      const { data: currentData, error: currentError } = await supabase
        .from('current_player')
        .select('*')
        .single();

      if (currentError) {
        console.error('Error fetching current player:', currentError);
        setCurrentPlayer(null);
        setPlayer(null);
        return;
      }

      setCurrentPlayer(currentData);

      // player_idがある場合、関連するプレイヤー情報を取得
      if (currentData?.player_id) {
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('*')
          .eq('id', currentData.player_id)
          .single();

        if (playerError) {
          console.error('Error fetching player:', playerError);
          setPlayer(null);
        } else {
          setPlayer(playerData);
        }
      } else {
        setPlayer(null);
      }
    };

    // リアルタイムサブスクリプションの設定
    const channel = supabase
      .channel('current-player-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT, UPDATE, DELETE全てをリッスン
          schema: 'public',
          table: 'current_player'
        },
        async (payload) => {
          console.log('Current player change detected:', payload);
          
          // 変更を検知したら最新データを取得
          await fetchLatestData();
        }
      )
      .subscribe();

    // playersテーブルの変更も監視（現在選択中のプレイヤーが更新された場合）
    let playersChannel: ReturnType<typeof supabase.channel> | null = null;
    
    if (player?.id) {
      playersChannel = supabase
        .channel('players-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'players',
            filter: `id=eq.${player.id}`
          },
          async (payload) => {
            console.log('Player update detected:', payload);
            
            // プレイヤー情報が更新されたら反映
            if (payload.new && typeof payload.new === 'object') {
              setPlayer(payload.new as Player);
            }
          }
        )
        .subscribe();
    }

    // クリーンアップ
    return () => {
      supabase.removeChannel(channel);
      if (playersChannel) {
        supabase.removeChannel(playersChannel);
      }
    };
  }, [player?.id]); // player.idが変わったら再購読

  // データがない場合
  if (!currentPlayer || !player) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            選手が選択されていません
          </h2>
          <p className="text-white/60">
            現在表示する選手が設定されていません。
          </p>
        </div>
      </div>
    );
  }

  // プレイヤーカードを表示
  const playerCardData = transformPlayerData(player);
  return <PlayerCard player={playerCardData} />;
}