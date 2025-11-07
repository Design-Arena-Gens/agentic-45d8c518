import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI導入コンサルティング・フレームワーク | 中小企業向け実践ガイド",
  description: "心理学とエビデンスに基づいた、中小企業へのAIコンサルティング営業・提案プロセスの完全ガイド",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
