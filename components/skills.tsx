'use client';

import { useState } from 'react';
import { 
  Code2, 
  Database, 
  Cloud, 
  TestTube2, 
  Monitor,
  Settings
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: React.ElementType;
}

interface SkillCategory {
  name: string;
  icon: React.ElementType;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: Monitor,
    color: 'blue',
    skills: [
      { name: 'React', level: 95, category: 'Frontend' },
      { name: 'TypeScript', level: 90, category: 'Frontend' },
      { name: 'Next.js', level: 88, category: 'Frontend' },
      { name: 'JavaScript', level: 92, category: 'Frontend' },
      { name: 'Tailwind CSS', level: 94, category: 'Frontend' },
      { name: 'HTML5/CSS3', level: 96, category: 'Frontend' },
      { name: 'Redux', level: 85, category: 'Frontend' },
      { name: 'Framer Motion', level: 82, category: 'Frontend' },
    ],
  },
  {
    name: 'Backend',
    icon: Code2,
    color: 'green',
    skills: [
      { name: 'Node.js', level: 90, category: 'Backend' },
      { name: 'Python', level: 85, category: 'Backend' },
      { name: 'Express.js', level: 92, category: 'Backend' },
      { name: 'FastAPI', level: 80, category: 'Backend' },
      { name: 'RESTful APIs', level: 94, category: 'Backend' },
      { name: 'GraphQL', level: 78, category: 'Backend' },
      { name: 'JWT Auth', level: 90, category: 'Backend' },
      { name: 'Microservices', level: 75, category: 'Backend' },
    ],
  },
  {
    name: 'Databases',
    icon: Database,
    color: 'purple',
    skills: [
      { name: 'PostgreSQL', level: 88, category: 'Databases' },
      { name: 'MongoDB', level: 85, category: 'Databases' },
      { name: 'Redis', level: 80, category: 'Databases' },
      { name: 'MySQL', level: 82, category: 'Databases' },
      { name: 'Prisma', level: 85, category: 'Databases' },
      { name: 'SQL', level: 90, category: 'Databases' },
      { name: 'Database Design', level: 85, category: 'Databases' },
      { name: 'ORM', level: 88, category: 'Databases' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'orange',
    skills: [
      { name: 'AWS', level: 80, category: 'Cloud' },
      { name: 'Docker', level: 85, category: 'DevOps' },
      { name: 'Kubernetes', level: 75, category: 'DevOps' },
      { name: 'CI/CD', level: 88, category: 'DevOps' },
      { name: 'Vercel', level: 95, category: 'Cloud' },
      { name: 'Netlify', level: 90, category: 'Cloud' },
      { name: 'Linux', level: 85, category: 'DevOps' },
      { name: 'Nginx', level: 80, category: 'DevOps' },
    ],
  },
  {
    name: 'Testing',
    icon: TestTube2,
    color: 'red',
    skills: [
      { name: 'Jest', level: 85, category: 'Testing' },
      { name: 'React Testing Library', level: 88, category: 'Testing' },
      { name: 'Cypress', level: 80, category: 'Testing' },
      { name: 'Unit Testing', level: 90, category: 'Testing' },
      { name: 'Integration Testing', level: 85, category: 'Testing' },
      { name: 'E2E Testing', level: 82, category: 'Testing' },
    ],
  },
  {
    name: 'Tools & Others',
    icon: Settings,
    color: 'gray',
    skills: [
      { name: 'Git', level: 92, category: 'Tools' },
      { name: 'GitHub', level: 94, category: 'Tools' },
      { name: 'VS Code', level: 96, category: 'Tools' },
      { name: 'Postman', level: 88, category: 'Tools' },
      { name: 'Figma', level: 75, category: 'Tools' },
      { name: 'Webpack', level: 80, category: 'Tools' },
      { name: 'Babel', level: 78, category: 'Tools' },
      { name: 'ESLint', level: 90, category: 'Tools' },
    ],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');


  return (
    <section id="skills" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            My comprehensive skill set across the full stack, from frontend frameworks to cloud infrastructure.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-accent/30 p-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'All'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {selectedCategory === 'All' 
            ? skillCategories.map((category, index) => (
              <div key={category.name} className={`fade-in-up delay-${index * 100}`}>
                <div className="bg-accent/30 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <category.icon className={`h-6 w-6 mr-3 text-${category.color}-600`} />
                    <h3 className="text-xl font-semibold text-foreground">{category.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-foreground/70">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-accent/50 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              category.color === 'blue' ? 'bg-blue-600' :
                              category.color === 'green' ? 'bg-green-600' :
                              category.color === 'purple' ? 'bg-purple-600' :
                              category.color === 'orange' ? 'bg-orange-600' :
                              category.color === 'red' ? 'bg-red-600' :
                              'bg-gray-600'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
            : skillCategories
                .filter(cat => cat.name === selectedCategory)
                .map((category, index) => (
                  <div key={category.name} className={`fade-in-up delay-${index * 100} lg:col-span-2`}>
                    <div className="bg-accent/30 rounded-xl p-8">
                      <div className="flex items-center mb-6">
                        <category.icon className={`h-8 w-8 mr-3 text-${category.color}-600`} />
                        <h3 className="text-2xl font-semibold text-foreground">{category.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                        {category.skills.map((skill) => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-foreground">{skill.name}</span>
                              <span className="text-sm text-foreground/70">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-accent/50 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                  category.color === 'blue' ? 'bg-blue-600' :
                                  category.color === 'green' ? 'bg-green-600' :
                                  category.color === 'purple' ? 'bg-purple-600' :
                                  category.color === 'orange' ? 'bg-orange-600' :
                                  category.color === 'red' ? 'bg-red-600' :
                                  'bg-gray-600'
                                }`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
          }
        </div>

        {/* Skill summary */}
        <div className="text-center bg-accent/30 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Always Learning
          </h3>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            I&apos;m constantly expanding my skill set and staying up-to-date with the latest technologies. 
            Currently exploring: <strong className="text-foreground">Web3, Machine Learning, &amp; Cloud Architecture</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}