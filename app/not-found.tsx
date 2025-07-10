import Link from 'next/link';

export default function PlayerNotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          選手が見つかりません
        </h2>
        <p className="text-white/60 mb-8">
          お探しの選手情報は見つかりませんでした。
        </p>
        <Link 
          href="/baseball"
          className="inline-block bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
        >
          選手一覧に戻る
        </Link>
      </div>
    </div>
  );
}