import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import Services from '@/components/services';
import About from '@/components/about';
import Projects from '@/components/projects';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { SectionErrorBoundary } from '@/components/ErrorBoundary';
import { getAboutInfo, getProjects, getSkills, getArticles } from '@/lib/directus-server';
import FeaturedBlogs from '@/components/FeaturedBlogs';

export default async function Home() {
  // Fetch data on the server
  const [aboutData, projects, skills, articles] = await Promise.all([
    getAboutInfo(),
    getProjects(),
    getSkills(),
    getArticles(),
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
        <SectionErrorBoundary sectionName="Featured Blogs">
          <FeaturedBlogs articles={articles} />
        </SectionErrorBoundary>
        <SectionErrorBoundary sectionName="Contact">
          <Contact aboutData={aboutData} />
        </SectionErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
