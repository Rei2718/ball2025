import MainLayout from '@/components/MainLayout';
import HeroSection from '@/components/screen/HeroScreen';
import YoutubeSection from '@/components/screen/YoutubeScreen';

export default function HomeScreen() {
  return (
    <>
        <MainLayout>
          <HeroSection />
          <YoutubeSection />
        </MainLayout>
    </>
  );
}