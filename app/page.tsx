import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          バックエンドのみ構築済み
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          2025年度チームメンバー
        </p>
        <Link
          href="/baseball"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          選手一覧を見る
        </Link>
      </div>
    </main>
  );
}