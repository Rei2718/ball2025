import { createClient } from '@/supabase/server';
import { CurrentPlayerDisplay } from '@/components/baseball/CurrentPlayerDisplay';

// 現在選択されているプレイヤーとその詳細を取得
async function getCurrentPlayerData() {
  const supabase = await createClient();
  
  // current_playerテーブルから最新データを取得
  const { data: currentPlayer, error: currentError } = await supabase
    .from('current_player')
    .select('*')
    .single();
    
  if (currentError || !currentPlayer || !currentPlayer.player_id) {
    return { currentPlayer: null, player: null };
  }
  
  // 関連するプレイヤー情報を取得
  const { data: player, error: playerError } = await supabase
    .from('players')
    .select('*')
    .eq('id', currentPlayer.player_id)
    .single();
    
  if (playerError || !player) {
    return { currentPlayer, player: null };
  }
  
  return { currentPlayer, player };
}

export default async function CurrentPage() {
  // 初期データを取得（最新のDBデータを保証）
  const initialData = await getCurrentPlayerData();
  
  return <CurrentPlayerDisplay initialData={initialData} />;
}

// ページメタデータ
export const metadata = {
  title: '現在の選手 - 立命館慶祥野球部',
  description: '現在表示中の選手情報をリアルタイムで表示',
};

// リアルタイム更新のため、このページは動的にする
export const dynamic = 'force-dynamic';
export const revalidate = 0;