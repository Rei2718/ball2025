import Image from 'next/image';
import { memo } from 'react';

// プレイヤーデータの整形
interface PlayerCardData {
  name: string;
  position: string;
  year: number;
  chantTitle: string;
  chantSubtitle: string;
  chantLyrics: string[];
  number: number | null;
  image: string | null;
}

interface PlayerCardProps {
  player: PlayerCardData;
}

// メモ化により、propsが変更されない限り再レンダリングしない
export const PlayerCard = memo(function PlayerCard({ player }: PlayerCardProps) {
  const { name, position, year, chantTitle, chantSubtitle, chantLyrics, number, image } = player;
  
  return (
    <>
      {/* ヘッダー - 選手名とポジション */}
      <div className="px-6 pt-14 pb-6">
        <div className="flex items-center justify-between border-b border-white/30 pb-2">
          <h1 className="text-[52px] font-extrabold text-white leading-none">
            {name}
          </h1>
          <div className="text-white ml-3">
            <div className="text-xl leading-6 font-medium">{position}</div>
            <div className="text-xl leading-6 font-medium">{year}年</div>
          </div>
        </div>
      </div>

      {/* 中央 - 応援歌 */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-[26px] font-bold text-white mb-1">
            {chantTitle}
          </h2>
          <p className="text-[15px] text-white/60 mb-7">{chantSubtitle}</p>
          
          <div className="space-y-2.5 text-white text-base leading-relaxed">
            {chantLyrics.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 下部 - 選手画像と背番号 */}
      <div className="relative h-64 px-6">
        <Image
          src={image || "/placeholder-player.png"}
          alt={`${name}選手`}
          width={160}
          height={240}
          className="absolute left-6 bottom-0 h-60 w-auto object-contain z-10"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }}
          loading="lazy"
        />

        {number && (
          <div className="absolute right-6 bottom-2">
            <span className="text-[110px] font-bold text-white/80 italic leading-none">
              #{number}
            </span>
          </div>
        )}
      </div>
    </>
  );
});