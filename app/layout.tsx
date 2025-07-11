import type { Metadata } from "next";
import { Zen_Kurenaido } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "2025 全校応援 | 立命館慶祥高等学校野球部 - 夏の甲子園へ！",
  description: "立命館慶祥高等学校野球部の2025年夏の甲子園出場を全校応援で後押しする特設サイトです。",
  keywords: [
    // 基本キーワード
    '立命館慶祥',
    '立命館慶祥高等学校',
    '慶祥高校',
    'RITS',
    'K-Tech',
    // 大会関連
    '高校野球',
    '北海道高校野球',
    '第107回全国高等学校野球選手権大会',
    '夏の甲子園',
    '甲子園',
    '南北海道大会',
    '北北海道大会',
    '甲子園予選',
    '高校野球 組み合わせ',
    '高校野球 日程',
    '2025 高校野球',
    '令和7年 高校野球',
    // 応援・学校関連
    '全校応援',
    '応援',
    '応援団',
    'ブラスバンド',
    '高校野球 応援',
    '立命館',
    '受験',
    '中学',
    // 地域・球場
    '北海道',
    '札幌',
    '江別',
    'エスコンフィールドHOKKAIDO',
    '札幌円山球場',
    // 試合・速報関連
    '野球',
    '野球部',
    '硬式野球',
    '試合速報',
    'ライブ配信',
    '注目選手',
    'ドラフト',
    // 関連団体
    '高野連',
    '日本高等学校野球連盟',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="2025 全校応援 | 立命館慶祥高等学校野球部 - 夏の甲子園へ！" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        className={`${zenKurenaido.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
