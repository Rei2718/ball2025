import { createClient } from "@/supabase/server";

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

  return players || [];
}