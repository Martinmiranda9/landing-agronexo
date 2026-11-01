import { Hero } from '@/features/landing/components/Hero';
import { Navbar } from '@/features/landing/components/Navbar';
import { ProductPreview } from '@/features/landing/components/ProductPreview';
import { StoryDots } from '@/features/landing/components/StoryDots';
import { TeamSearch } from '@/features/landing/components/TeamSearch';
import { Workspace } from '@/features/landing/components/Workspace';

export default function HomePage() {
  return (
    <>
      <StoryDots />
      <Navbar />
      <main>
        <Hero />
        <TeamSearch />
        <Workspace />
        <ProductPreview />
      </main>
    </>
  );
}
