"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaArrowLeft,
  FaTrophy,
  FaRocket,
  FaUsers,
  FaCode,
  FaDatabase,
  FaCloud,
  FaTools,
  FaPalette,
  FaCog,
  FaGlobe,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import Link from "next/link";
import styles from "./profile.module.css";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: "language" | "framework" | "tool" | "soft";
}

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

const skills: Skill[] = [
  { name: "HTML/CSS", icon: <FaCode />, level: 95, category: "language" },
  { name: "JavaScript", icon: <FaCode />, level: 90, category: "language" },
  { name: "C/C++", icon: <FaCode />, level: 85, category: "language" },
  { name: "React", icon: <FaCode />, level: 88, category: "framework" },
  { name: "Node.js", icon: <FaDatabase />, level: 85, category: "framework" },
  { name: "AWS", icon: <FaCloud />, level: 80, category: "tool" },
  { name: "Git/GitHub", icon: <FaTools />, level: 90, category: "tool" },
  { name: "Figma", icon: <FaPalette />, level: 75, category: "tool" },
  { name: "Postman", icon: <FaTools />, level: 85, category: "tool" },
  { name: "Leadership", icon: <FaUsers />, level: 90, category: "soft" },
  { name: "Communication", icon: <FaGlobe />, level: 88, category: "soft" },
  { name: "Problem Solving", icon: <FaCog />, level: 92, category: "soft" },
];

const experiences: Experience[] = [
  {
    id: 1,
    company: "Finaure",
    position: "Backend Developer",
    duration: "Sep 2024 - Present",
    description: [
      "Lead efforts to fortify the backend framework of a SIP-oriented fintech platform",
      "Streamline data flow and enhance server-side functionalities",
      "Design advanced data visualization modules with dynamic graphs and interactive charts",
      "Expected to improve platform efficiency by significant margin",
    ],
    technologies: ["Node.js", "React", "Data Visualization", "Fintech APIs"],
  },
  {
    id: 2,
    company: "All India Council For Technical Education (AICTE)",
    position: "Full Stack Developer",
    duration: "June 2024",
    description: [
      "Administrated the creation of an AICTE portal, enhancing data accessibility by 70%",
      "Engineered sophisticated data visualization tools with interactive graphs and charts",
      "Boosted user engagement and knowledge retention by 60%",
      "Provided detailed information on affiliations, institutes, and types",
    ],
    technologies: ["React", "Node.js", "Data Visualization", "Government APIs"],
  },
];

const achievements = [
  {
    title: "HackWithInfy 2024 Finalist",
    description:
      "Selected among top 0.75% out of 4,000+ participants, advanced to final 30",
    icon: <FaTrophy />,
    color: "#FFD700",
  },
  {
    title: "SIH 2023 Winner",
    description:
      "1st position in Smart India Hackathon organized by AICTE, Government of India",
    icon: <FaTrophy />,
    color: "#FF6B6B",
  },
  {
    title: "Tata Imagination Challenge",
    description:
      "Conquered two elimination rounds, qualified for 3rd and penultimate rounds",
    icon: <FaRocket />,
    color: "#4ECDC4",
  },
];

export default function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadResume = () => {
    // Create a dummy resume content
    const resumeContent = `
Praveen Kushwaha
Full Stack Developer

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

  const tabs = [
    { id: "about", label: "About", icon: <FaUser /> },
    { id: "experience", label: "Experience", icon: <FaCode /> },
    { id: "skills", label: "Skills", icon: <FaTools /> },
    { id: "achievements", label: "Achievements", icon: <FaTrophy /> },
  ];

  return (
    <div className={styles.profileContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <Link href="/portfolio" className={styles.backButton}>
          <FaArrowLeft /> Back to Portfolio
        </Link>
        <h1 className={styles.pageTitle}>Profile</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={styles.profileCard}
      >
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <FaUser />
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.name}>Praveen Kushwaha</h2>
              <p className={styles.title}>Full Stack Developer</p>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <span>praveen.kushwaha@unthinkable.co</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone />
                  <span>+91 1212121212</span>
                </div>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt />
                  <span>Unthinkable Solutions</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.socialSection}>
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
            <a
              href="https://leetcode.com/u/coder-praveen"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <SiLeetcode />
            </a>
            <button
              className={styles.downloadBtn}
              onClick={handleDownloadResume}
            >
              <FaDownload /> Resume
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className={styles.tabsContainer}
      >
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={styles.contentSection}
      >
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <div className={styles.aboutSection}>
                <h3 className={styles.sectionTitle}>About Me</h3>
                <p className={styles.aboutText}>
                  I am a passionate Full Stack Developer with expertise in
                  modern web technologies. I love solving complex problems and
                  creating innovative solutions that make a difference. With a
                  strong foundation in both frontend and backend development, I
                  strive to build scalable and user-friendly applications.
                </p>
                <div className={styles.highlights}>
                  <div className={styles.highlight}>
                    <FaRocket />
                    <span>1+ Years of Experience</span>
                  </div>
                  <div className={styles.highlight}>
                    <FaUsers />
                    <span>Team Player</span>
                  </div>
                  <div className={styles.highlight}>
                    <FaCode />
                    <span>Problem Solver</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <div className={styles.experienceSection}>
                <h3 className={styles.sectionTitle}>Work Experience</h3>
                <div className={styles.experienceList}>
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={styles.experienceCard}
                    >
                      <div className={styles.experienceHeader}>
                        <h4 className={styles.companyName}>{exp.company}</h4>
                        <span className={styles.duration}>{exp.duration}</span>
                      </div>
                      <h5 className={styles.position}>{exp.position}</h5>
                      <ul className={styles.descriptionList}>
                        {exp.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                      <div className={styles.technologies}>
                        {exp.technologies.map((tech) => (
                          <span key={tech} className={styles.techTag}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <div className={styles.skillsSection}>
                <h3 className={styles.sectionTitle}>Skills & Expertise</h3>
                <div className={styles.skillsGrid}>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      className={styles.skillCard}
                    >
                      <div className={styles.skillIcon}>{skill.icon}</div>
                      <h4 className={styles.skillName}>{skill.name}</h4>
                      <div className={styles.skillBar}>
                        <div
                          className={styles.skillProgress}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <div className={styles.achievementsSection}>
                <h3 className={styles.sectionTitle}>Achievements & Awards</h3>
                <div className={styles.achievementsGrid}>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={styles.achievementCard}
                    >
                      <div
                        className={styles.achievementIcon}
                        style={{ color: achievement.color }}
                      >
                        {achievement.icon}
                      </div>
                      <h4 className={styles.achievementTitle}>
                        {achievement.title}
                      </h4>
                      <p className={styles.achievementDescription}>
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
