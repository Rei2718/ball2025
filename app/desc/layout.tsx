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
          <footer className="py-8">
            <div className="container mx-auto px-6">
              <div className="flex justify-center">
                <p className="text-xs text-green-400 tracking-[0.2em] uppercase font-medium">
                  RITSUMEIKAN KEISHO BASEBALL TEAM 2025 MEMBERS
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}