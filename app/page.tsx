import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import About from '@/components/about';
import Projects from '@/components/projects';
import News from '@/components/news';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
