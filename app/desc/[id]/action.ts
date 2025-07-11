'use server';

import { createClient } from '@/supabase/server';
import type { Tables } from '@/schema';

// プレイヤー情報を取得
export async function getPlayer(id: string): Promise<Tables<'players'> | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Failed to fetch player:', error);
    return null;
  }

  return data;
}