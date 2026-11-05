import { AgentsSection } from '@/features/landing/components/agents/AgentsSection';
import { CtaSection } from '@/features/landing/components/cta/CtaSection';
import { FaqSection } from '@/features/landing/components/faq/FaqSection';
import { Hero } from '@/features/landing/components/Hero';
import { Navbar } from '@/features/landing/components/Navbar';
import { ProductPreview } from '@/features/landing/components/ProductPreview';
import { RolesSection } from '@/features/landing/components/roles/RolesSection';
import { StoryDots } from '@/features/landing/components/StoryDots';
import { TeamSearch } from '@/features/landing/components/TeamSearch';
import { WhatsAppSection } from '@/features/landing/components/whatsapp/WhatsAppSection';
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
        <WhatsAppSection />
        <ProductPreview />
        <AgentsSection />
        <RolesSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}
