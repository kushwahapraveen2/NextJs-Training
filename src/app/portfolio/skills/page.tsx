"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCode,
  FaDatabase,
  FaCloud,
  FaTools,
  FaPalette,
  FaUsers,
  FaGlobe,
  FaCog,
  FaLaptopCode,
  FaServer,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";
import styles from "./skills.module.css";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: "language" | "framework" | "tool" | "soft";
  description: string;
  experience: string;
  projects: number;
}

const skills: Skill[] = [
  {
    name: "HTML/CSS",
    icon: <FaCode />,
    level: 95,
    category: "language",
    description:
      "Proficient in semantic HTML5 and modern CSS3 with responsive design principles",
    experience: "3+ years",
    projects: 15,
  },
  {
    name: "JavaScript",
    icon: <FaCode />,
    level: 90,
    category: "language",
    description:
      "Expert in ES6+, async programming, and modern JavaScript patterns",
    experience: "3+ years",
    projects: 20,
  },
  {
    name: "C/C++",
    icon: <FaCode />,
    level: 85,
    category: "language",
    description:
      "Strong foundation in systems programming and algorithm implementation",
    experience: "2+ years",
    projects: 8,
  },
  {
    name: "React",
    icon: <FaLaptopCode />,
    level: 88,
    category: "framework",
    description:
      "Advanced React development with hooks, context, and performance optimization",
    experience: "2+ years",
    projects: 12,
  },
  {
    name: "Node.js",
    icon: <FaServer />,
    level: 85,
    category: "framework",
    description:
      "Full-stack development with Express.js and RESTful API design",
    experience: "2+ years",
    projects: 10,
  },
  {
    name: "AWS",
    icon: <FaCloud />,
    level: 80,
    category: "tool",
    description: "Cloud infrastructure management and deployment automation",
    experience: "1+ year",
    projects: 5,
  },
  {
    name: "Git/GitHub",
    icon: <FaTools />,
    level: 90,
    category: "tool",
    description:
      "Version control, collaboration, and CI/CD pipeline management",
    experience: "3+ years",
    projects: 25,
  },
  {
    name: "Figma",
    icon: <FaPalette />,
    level: 75,
    category: "tool",
    description: "UI/UX design, prototyping, and design system creation",
    experience: "1+ year",
    projects: 6,
  },
  {
    name: "Postman",
    icon: <FaTools />,
    level: 85,
    category: "tool",
    description:
      "API testing, documentation, and development workflow optimization",
    experience: "2+ years",
    projects: 15,
  },
  {
    name: "Leadership",
    icon: <FaUsers />,
    level: 90,
    category: "soft",
    description: "Team management, project coordination, and mentorship",
    experience: "2+ years",
    projects: 8,
  },
  {
    name: "Communication",
    icon: <FaGlobe />,
    level: 88,
    category: "soft",
    description:
      "Effective stakeholder communication and technical documentation",
    experience: "3+ years",
    projects: 20,
  },
  {
    name: "Problem Solving",
    icon: <FaCog />,
    level: 92,
    category: "soft",
    description:
      "Analytical thinking, debugging, and innovative solution development",
    experience: "3+ years",
    projects: 25,
  },
];

const categories = [
  { id: "all", label: "All Skills", icon: <FaRocket /> },
  { id: "language", label: "Languages", icon: <FaCode /> },
  { id: "framework", label: "Frameworks", icon: <FaLaptopCode /> },
  { id: "tool", label: "Tools", icon: <FaTools /> },
  { id: "soft", label: "Soft Skills", icon: <FaUsers /> },
];

const skillStats = [
  { label: "Total Skills", value: skills.length, icon: <FaChartLine /> },
  {
    label: "Languages",
    value: skills.filter((s) => s.category === "language").length,
    icon: <FaCode />,
  },
  {
    label: "Frameworks",
    value: skills.filter((s) => s.category === "framework").length,
    icon: <FaLaptopCode />,
  },
  {
    label: "Tools",
    value: skills.filter((s) => s.category === "tool").length,
    icon: <FaTools />,
  },
  {
    label: "Soft Skills",
    value: skills.filter((s) => s.category === "soft").length,
    icon: <FaUsers />,
  },
  {
    label: "Total Projects",
    value: skills.reduce((sum, skill) => sum + skill.projects, 0),
    icon: <FaRocket />,
  },
];

export default function Skills() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredSkills, setFilteredSkills] = useState(skills);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(
        skills.filter((skill) => skill.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "language":
        return "#43e97b";
      case "framework":
        return "#4facfe";
      case "tool":
        return "#f093fb";
      case "soft":
        return "#ffa726";
      default:
        return "#667eea";
    }
  };

  return (
    <div className={styles.skillsContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <Link href="/portfolio" className={styles.backButton}>
          <FaArrowLeft /> Back to Portfolio
        </Link>
        <h1 className={styles.pageTitle}>Skills & Expertise</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={styles.statsSection}
      >
        <div className={styles.statsGrid}>
          {skillStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className={styles.statCard}
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className={styles.filtersSection}
      >
        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${
                selectedCategory === category.id ? styles.activeFilter : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={styles.skillsGrid}
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={styles.skillCard}
          >
            <div className={styles.skillHeader}>
              <div
                className={styles.skillIcon}
                style={{ color: getCategoryColor(skill.category) }}
              >
                {skill.icon}
              </div>
              <div className={styles.skillInfo}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <div className={styles.skillMeta}>
                  <span className={styles.skillExperience}>
                    {skill.experience}
                  </span>
                  <span className={styles.skillProjects}>
                    {skill.projects} projects
                  </span>
                </div>
              </div>
              <div className={styles.skillLevel}>{skill.level}%</div>
            </div>

            <p className={styles.skillDescription}>{skill.description}</p>

            <div className={styles.skillBar}>
              <div
                className={styles.skillProgress}
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${getCategoryColor(
                    skill.category
                  )} 0%, ${getCategoryColor(skill.category)}80 100%)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
