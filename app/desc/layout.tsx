import Image from 'next/image';

export default function DesScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="relative h-screen w-full">
          <Image
            fill
            src="/main2.webp"
            sizes="100vw"
            quality={100}
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Optional: Add overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 h-screen overflow-y-auto">
        <div className="flex flex-col min-h-screen">
          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>

          {/* Footer */}
          <footer className="py-6 mt-auto text-green-400">
            <div className="container mx-auto px-4">
              <div className="text-center space-y-2">
                <p className="text-xs tracking-[0.2em] uppercase font-medium">
                  RITSUMEIKAN KEISHO BASEBALL TEAM
                </p>
                <p className="text-xs text-[var(--secondary)] font-light">
                  2025 MEMBERS
                </p>
              </div>

              <div className="my-4">
                <div className="w-1/2 h-px bg-green-400/30 mx-auto"></div>
              </div>

              <div className="text-center space-y-1">
                <p className="text-xs text-green-400/60">
                  © 2025 Keisho Technologies. All rights reserved.
                </p>
                <p className="text-xs text-green-400/60">
                  Created by K-Tech
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}