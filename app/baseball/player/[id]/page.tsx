import { PlayerCard } from "../../components/PlayerCard";
import BaseBallLayout from "../../layout";

export default function BaseballPlayerPage() {
  // 実際の使用では、IDに基づいてプレイヤーデータを取得
  const playerData = {
    name: "久松篤生",
    position: "PR/R",
    year: "3",
    chantTitle: "中村奨吾",
    chantSubtitle: "（前奏）",
    chantLyrics: [
      "（あーつきー あーつきー",
      "ひーさーまーつ あーつきー）",
      "あつきー あつきー 久松あつきー",
      "魂込めたー打を魅せろオオオオ",
      "あつきー あつきー 久松あーつき",
      "ー 熱く燃えろよ あつきー"
    ],
    number: "1",
    image: null
  };

  return (
    <BaseBallLayout>
      <PlayerCard player={playerData} />
    </BaseBallLayout>
  );
}