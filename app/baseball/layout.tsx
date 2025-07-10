import Image from "next/image";

export default function BaseballLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full max-w-[390px] mx-auto h-screen bg-black overflow-hidden">
      {/* 背景画像 - 観客席（静的） */}
      <div className="absolute inset-0">
        <Image
          src="/stadium-crowd.jpg"
          alt="Stadium crowd"
          fill
          className="object-cover opacity-30"
          loading="eager"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/85" />
      </div>

      {/* メインコンテンツエリア */}
      <div className="relative z-10 h-full flex flex-col">
        {children}

        {/* フッター（静的） */}
        <div className="pb-10 text-center">
          <p className="text-[11px] text-white/50 tracking-[0.2em] uppercase font-normal">
            RITSUMEIKAN KEISHO BASEBALL TEAM 2025 MEMBERS
          </p>
        </div>
      </div>
    </div>
  );
}