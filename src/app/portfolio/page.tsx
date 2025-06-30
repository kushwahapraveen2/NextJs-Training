"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaCode,
  FaTools,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaRocket,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import styles from "./portfolio.module.css";

const portfolioCards = [
  {
    id: "profile",
    title: "Profile",
    description: "Learn more about my background, experience, and achievements",
    icon: <FaUser />,
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    href: "/portfolio/profile",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Explore my latest projects and technical implementations",
    icon: <FaCode />,
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    href: "/portfolio/projects",
  },
  {
    id: "skills",
    title: "Skills",
    description: "View my technical skills, tools, and expertise areas",
    icon: <FaTools />,
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    href: "/portfolio/skills",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with me for collaborations and opportunities",
    icon: <FaEnvelope />,
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    href: "/portfolio/contact",
  },
];

const quickStats = [
  { label: "Projects Completed", value: "15+", icon: <FaRocket /> },
  { label: "Years Experience", value: "2+", icon: <FaUsers /> },
  { label: "Awards Won", value: "3", icon: <FaTrophy /> },
  { label: "Technologies", value: "12+", icon: <FaCode /> },
];

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadResume = () => {
    // Create a dummy resume content
    const resumeContent = `
Praveen Kushwaha
Full Stack Developer

CONTACT
Email: contact@example.com
Phone: +1 234 567 890
Location: Your City, Country

SUMMARY
Experienced Full Stack Developer with expertise in modern web technologies.
Passionate about creating innovative solutions and leading development teams.

SKILLS
• Frontend: React, JavaScript, HTML/CSS, TypeScript
• Backend: Node.js, Express.js, REST APIs
• Tools: Git, AWS, Docker, Figma
• Soft Skills: Leadership, Communication, Problem Solving

EXPERIENCE
Backend Developer - Finaure (Sep 2024 - Present)
• Lead backend framework development for fintech platform
• Design data visualization modules
• Improve platform efficiency

Full Stack Developer - AICTE (June 2024)
• Created AICTE portal enhancing data accessibility by 70%
• Engineered data visualization tools
• Boosted user engagement by 60%

EDUCATION
Bachelor's in Computer Science
Your University, Graduation Year

PROJECTS
• Swasthya Sahayak - AI-powered portal
• Techno Conclave - Event management platform
• Test Portal - Assessment system
• AICTE Portal - Data visualization platform
    `;

    // Create blob and download
    const blob = new Blob([resumeContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.portfolioContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className={styles.heroSection}
      >
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={styles.heroTitle}
          >
            Welcome to My Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={styles.heroSubtitle}
          >
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={styles.socialLinks}
          >
            <a
              href="https://github.com/Kushwahapraveen2"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/praveen-kushwaha-a5092925b/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaLinkedin />
            </a>
            <a href="mailto:contact@example.com" className={styles.socialLink}>
              <FaEnvelope />
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className={styles.statsSection}
      >
        <div className={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
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
        transition={{ delay: 1.2, duration: 0.8 }}
        className={styles.navigationSection}
      >
        <h2 className={styles.sectionTitle}>Explore My Work</h2>
        <div className={styles.cardsGrid}>
          {portfolioCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={card.href} className={styles.portfolioCard}>
                <div
                  className={styles.cardBackground}
                  style={{ background: card.color }}
                />
                <div className={styles.cardContent}>
                  <div className={styles.cardIcon}>{card.icon}</div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
                <div className={styles.cardOverlay} />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className={styles.ctaSection}
      >
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Collaborate?</h2>
          <p className={styles.ctaText}>
            Lets work together to bring your ideas to life
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.ctaButton}
            onClick={handleDownloadResume}
          >
            <FaDownload /> Download Resume
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
