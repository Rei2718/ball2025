import { Player } from "@/schema";

// DBのプレイヤーデータをコンポーネント用に変換
export function transformPlayerData(player: Player) {
  // 歌詞を改行で分割
  const lyrics = player.lyric ? player.lyric.split('\n').filter(line => line.trim() !== '') : [];
  
  // タイトルとサブタイトルを抽出（最初の2行を使用）
  const chantTitle = lyrics[0] || player.player_name;
  const chantSubtitle = lyrics[1] && lyrics[1].startsWith('（') ? lyrics[1] : '';
  
  // 実際の歌詞部分を抽出
  const startIndex = chantSubtitle ? 2 : 1;
  const chantLyrics = lyrics.slice(startIndex);
  
  return {
    name: player.player_name,
    position: player.position,
    year: player.grade,
    chantTitle,
    chantSubtitle,
    chantLyrics,
    number: player.player_number,
    image: player.player_img,
  };
}

// URLパラメータから安全にIDを取得
export function getPlayerIdFromParams(params: { id: string }): string {
  return decodeURIComponent(params.id);
}