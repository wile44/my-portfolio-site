import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import Services from '@/components/services';
import About from '@/components/about';
import Projects from '@/components/projects';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { SectionErrorBoundary } from '@/components/ErrorBoundary';
import { getAboutInfo, getProjects, getSkills } from '@/lib/directus-server';

export default async function Home() {
  // Fetch data on the server
  const [aboutData, projects, skills] = await Promise.all([
    getAboutInfo(),
    getProjects(),
    getSkills(),
  ]);
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <SectionErrorBoundary sectionName="Hero">
          <Hero aboutData={aboutData} />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="Services">
          <Services />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="About">
          <About aboutData={aboutData} />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="Projects">
          <Projects projects={projects} />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="Skills">
          <Skills skills={skills} />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="Contact">
          <Contact aboutData={aboutData} />
        </SectionErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
