'use client';

import { useState } from 'react';
import { 
  Code2, 
  Database, 
  Cloud, 
  TestTube2, 
  Monitor,
  // Settings,
  // Video,
  // Palette,
  // PenTool
} from 'lucide-react';

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
  icon: React.ElementType;
  color: string;
}

// const categoryIcons = {
//   'Frontend': Monitor,
//   'Backend': Code2,
//   'Databases': Database,
//   'Cloud': Cloud,
//   'DevOps': Settings,
//   'Testing': TestTube2,
//   'Tools': Settings,
//   'Creative & Media': Palette,
//   'Design & UX': PenTool,
//   'Content Creation': Video,
// };

// const categoryColors = {
//   'Frontend': 'blue',
//   'Backend': 'green',
//   'Databases': 'purple',
//   'Cloud': 'orange',
//   'DevOps': 'orange',
//   'Testing': 'red',
//   'Tools': 'gray',
//   'Creative & Media': 'pink',
//   'Design & UX': 'indigo',
//   'Content Creation': 'red',
// };

// Hardcoded skills data
const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: Monitor,
    color: 'blue',
    skills: [
      { name: 'React', proficiency: 90 },
      { name: 'TypeScript', proficiency: 85 },
      { name: 'Next.js', proficiency: 88 },
      { name: 'Tailwind CSS', proficiency: 92 },
      { name: 'JavaScript', proficiency: 95 },
      { name: 'HTML5 & CSS3', proficiency: 93 },
    ]
  },
  {
    name: 'Backend',
    icon: Code2,
    color: 'green',
    skills: [
      { name: 'Node.js', proficiency: 87 },
      { name: 'Python', proficiency: 83 },
      { name: 'Express.js', proficiency: 85 },
      { name: 'REST APIs', proficiency: 90 },
      { name: 'GraphQL', proficiency: 78 },
      { name: 'JWT Authentication', proficiency: 82 },
    ]
  },
  {
    name: 'Databases',
    icon: Database,
    color: 'purple',
    skills: [
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'MongoDB', proficiency: 78 },
      { name: 'MySQL', proficiency: 75 },
      { name: 'Redis', proficiency: 70 },
      { name: 'SQLite', proficiency: 85 },
      { name: 'Database Design', proficiency: 88 },
    ]
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'orange',
    skills: [
      { name: 'AWS', proficiency: 75 },
      { name: 'Docker', proficiency: 82 },
      { name: 'Kubernetes', proficiency: 70 },
      { name: 'GitHub Actions', proficiency: 80 },
      { name: 'CI/CD', proficiency: 78 },
      { name: 'Vercel', proficiency: 90 },
    ]
  },
  {
    name: 'Testing & Tools',
    icon: TestTube2,
    color: 'red',
    skills: [
      { name: 'Jest', proficiency: 85 },
      { name: 'React Testing Library', proficiency: 82 },
      { name: 'Cypress', proficiency: 75 },
      { name: 'Git', proficiency: 90 },
      { name: 'Webpack', proficiency: 78 },
      { name: 'Vite', proficiency: 85 },
    ]
  }
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
                          <span className="text-sm text-foreground/70">{skill.proficiency}%</span>
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
                            style={{ width: `${skill.proficiency}%` }}
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
                              <span className="text-sm text-foreground/70">{skill.proficiency}%</span>
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
                                style={{ width: `${skill.proficiency}%` }}
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