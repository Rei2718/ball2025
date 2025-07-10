export default function PlayerLoading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white/60">読み込み中...</p>
      </div>
    </div>
  );
}