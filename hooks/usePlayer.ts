import { createClient } from "@/supabase/server";
import { Player } from '@/schema';

// プレイヤー一覧を取得するサーバーサイド関数
export async function getPlayers() {
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

// 特定のプレイヤーを取得するサーバーサイド関数
export async function getPlayerById(id: string): Promise<Player | null> {
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

// 現在選択されているプレイヤーを取得
export async function getCurrentPlayer() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('current_player')
    .select(`
      *,
      players (*)
    `)
    .single();
    
  if (error || !data) {
    return null;
  }
  
  return data;
}