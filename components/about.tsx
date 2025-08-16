'use client';

import { Award, Code, Users, Zap, Target, Heart } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '3+', icon: Award },
  { label: 'Projects Completed', value: '15+', icon: Code },
  { label: 'Happy Clients', value: '10+', icon: Users },
  { label: 'Technologies', value: '20+', icon: Zap },
];

const values = [
  {
    icon: Target,
    title: 'Problem Solving',
    description: 'I approach challenges with analytical thinking and creative solutions, turning complex problems into elegant applications.',
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code is my priority, ensuring long-term project success.',
  },
  {
    icon: Heart,
    title: 'User Focus',
    description: 'Every decision is made with the end-user in mind, creating intuitive and delightful experiences.',
  },
];

export default function About() {

  return (
    <section id="about" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get to know the person behind the code — my journey, passion, and what drives me to create exceptional digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Personal story */}
          <div className="space-y-8">
            <div className="fade-in-up">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                My Story
              </h3>
              <div className="prose prose-lg text-foreground/80 space-y-4">
                <p>
                  I'm a passionate full-stack software engineer with over 3 years of experience 
                  crafting digital solutions that make a real impact. My journey began with a 
                  curiosity about how things work behind the scenes, which evolved into a 
                  deep passion for creating seamless user experiences.
                </p>
                <p>
                  From building scalable web applications to designing intuitive interfaces, 
                  I thrive on solving complex challenges and bringing ideas to life. I believe 
                  that great software is not just about code — it's about understanding user 
                  needs and delivering value.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge with the tech community. 
                  I'm constantly learning and pushing boundaries to stay at the forefront 
                  of technology.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="fade-in-up delay-100">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                What Drives Me
              </h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-accent/50">
                      <value.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                      <p className="text-foreground/70 text-sm">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Stats and skills */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="fade-in-up delay-200">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                By The Numbers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-xl bg-accent/30 hover:bg-accent/50 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex justify-center mb-3">
                      <stat.icon className="h-8 w-8 text-foreground/70" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="fade-in-up delay-300">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Core Technologies
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}