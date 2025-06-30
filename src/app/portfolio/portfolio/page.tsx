"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaCode,
  FaTrophy,
  FaUsers,
  FaRocket,
  FaGlobe,
  FaDownload,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaStar,
  FaEye,
  FaCodeBranch,
  FaHeart,
  FaLightbulb,
  FaChartLine,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import Link from "next/link";
import styles from "./detailed-portfolio.module.css";

interface DetailedProject {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  impact: string[];
}

const detailedProjects: DetailedProject[] = [
  {
    id: 1,
    title: "Swasthya Sahayak",
    description:
      "AI-powered portal that simplifies AICTE's Handbook, enhancing understanding by 60% and optimizing approvals.",
    longDescription:
      "A comprehensive AI-driven platform designed to revolutionize how educational institutions interact with AICTE guidelines. The system uses advanced natural language processing to break down complex regulatory documents into easily digestible information.",
    technologies: [
      "React",
      "Node.js",
      "Machine Learning",
      "Python",
      "TensorFlow",
      "MongoDB",
    ],
    image: "/api/placeholder/400/250",
    features: [
      "AI-powered document processing and analysis",
      "Interactive dashboard with real-time insights",
      "Automated approval workflow optimization",
      "Natural language query interface",
      "Comprehensive reporting and analytics",
    ],
    challenges: [
      "Processing complex regulatory documents with varying formats",
      "Implementing accurate AI models for document classification",
      "Ensuring real-time performance with large document sets",
      "Creating an intuitive interface for non-technical users",
    ],
    solutions: [
      "Developed custom NLP pipeline for document processing",
      "Implemented ensemble learning models for better accuracy",
      "Optimized database queries and caching strategies",
      "Created responsive design with progressive disclosure",
    ],
    impact: [
      "60% improvement in understanding of AICTE guidelines",
      "40% reduction in approval processing time",
      "Enhanced user satisfaction and engagement",
      "Streamlined workflow for educational institutions",
    ],
  },
  {
    id: 2,
    title: "Techno Conclave",
    description:
      "Digital transformation platform achieving 30% increase in participant engagement with seamless registration.",
    longDescription:
      "A comprehensive event management platform designed to digitize and streamline the entire process of organizing technical conclaves. The platform handles everything from registration to real-time event updates.",
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Redis",
      "AWS S3",
    ],
    image: "/api/placeholder/400/250",
    features: [
      "Real-time event updates and notifications",
      "Advanced registration system with payment integration",
      "Interactive participant dashboard",
      "Automated certificate generation",
      "Comprehensive analytics and reporting",
    ],
    challenges: [
      "Managing high concurrent user registrations",
      "Implementing real-time updates across multiple devices",
      "Ensuring secure payment processing",
      "Scaling the system for large-scale events",
    ],
    solutions: [
      "Implemented Redis caching for high-performance registration",
      "Used WebSocket connections for real-time communication",
      "Integrated secure payment gateways with encryption",
      "Deployed on AWS with auto-scaling capabilities",
    ],
    impact: [
      "30% increase in participant engagement",
      "50% improvement in registration efficiency",
      "Reduced manual workload by 70%",
      "Enhanced participant experience and satisfaction",
    ],
  },
  {
    id: 3,
    title: "Test Portal",
    description:
      "Responsive React-based test portal managing 800+ participants with 40% reduction in assessment processing time.",
    longDescription:
      "A scalable assessment platform designed to handle large-scale examinations with advanced features like automated grading, anti-cheating measures, and comprehensive analytics.",
    technologies: [
      "React",
      "JavaScript",
      "CSS3",
      "HTML5",
      "LocalStorage",
      "IndexedDB",
    ],
    image: "/api/placeholder/400/250",
    features: [
      "Multi-format question support (MCQ, coding, essay)",
      "Real-time auto-save functionality",
      "Advanced anti-cheating mechanisms",
      "Automated grading and result generation",
      "Comprehensive analytics dashboard",
    ],
    challenges: [
      "Handling 800+ concurrent users during exams",
      "Implementing reliable auto-save without performance impact",
      "Creating effective anti-cheating measures",
      "Ensuring cross-browser compatibility",
    ],
    solutions: [
      "Optimized React rendering with virtualization",
      "Implemented efficient local storage strategies",
      "Developed browser-based monitoring systems",
      "Used progressive enhancement for compatibility",
    ],
    impact: [
      "40% reduction in assessment processing time",
      "50% improvement in user experience metrics",
      "Successfully managed 800+ concurrent users",
      "Enhanced exam integrity and security",
    ],
  },
  {
    id: 4,
    title: "AICTE Portal",
    description:
      "Comprehensive portal enhancing data accessibility by 70% with interactive data visualization tools.",
    longDescription:
      "A government portal designed to provide comprehensive information about technical education institutions across India. Features advanced data visualization and search capabilities.",
    technologies: [
      "React",
      "Node.js",
      "D3.js",
      "PostgreSQL",
      "Elasticsearch",
      "Redis",
    ],
    image: "/api/placeholder/400/250",
    features: [
      "Advanced search and filtering capabilities",
      "Interactive data visualization with D3.js",
      "Real-time data updates and synchronization",
      "Comprehensive institute information database",
      "Mobile-responsive design for all devices",
    ],
    challenges: [
      "Processing and visualizing large datasets",
      "Implementing complex search algorithms",
      "Ensuring data accuracy and consistency",
      "Creating intuitive data visualization interfaces",
    ],
    solutions: [
      "Implemented efficient data indexing with Elasticsearch",
      "Developed custom D3.js visualizations for complex data",
      "Created robust data validation and cleaning pipelines",
      "Designed responsive visualization components",
    ],
    impact: [
      "70% improvement in data accessibility",
      "60% increase in user engagement",
      "Enhanced decision-making capabilities",
      "Streamlined information retrieval process",
    ],
  },
];

const achievements = [
  {
    title: "HackWithInfy 2024 Finalist",
    description:
      "Selected among top 0.75% out of 4,000+ participants, advanced to final 30",
    stats: { participants: "4,000+", percentage: "0.75%", finalists: "30" },
  },
  {
    title: "SIH 2023 Winner",
    description:
      "1st position in Smart India Hackathon organized by AICTE, Government of India",
    stats: { position: "1st", organizer: "AICTE", level: "National" },
  },
  {
    title: "Tata Imagination Challenge",
    description:
      "Conquered two elimination rounds, qualified for 3rd and penultimate rounds",
    stats: { rounds: "2", qualified: "3rd Round", organizer: "Tata" },
  },
];

export default function DetailedPortfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] =
    useState<DetailedProject | null>(null);

  const openProjectModal = (project: DetailedProject) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className={styles.detailedPortfolioContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/portfolio" className={styles.backButton}>
            <FaArrowLeft />
            Back to Portfolio
          </Link>
          <h1 className={styles.headerTitle}>Detailed Portfolio</h1>
          <div className={styles.headerActions}>
            <a
              href="/api/placeholder/resume.pdf"
              download
              className={styles.downloadButton}
            >
              <FaDownload />
              Download Resume
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={styles.tabNavigation}>
        <div className={styles.tabContainer}>
          {["projects", "achievements", "timeline"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Sections */}
      <main className={styles.mainContent}>
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.projectsSection}
            >
              <div className={styles.sectionHeader}>
                <h2>Detailed Projects</h2>
                <p>In-depth look at my technical projects and achievements</p>
              </div>
              <div className={styles.projectsGrid}>
                {detailedProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={styles.projectCard}
                  >
                    <div className={styles.projectImage}>
                      <div className={styles.imagePlaceholder}>
                        <FaCode className={styles.projectIcon} />
                      </div>
                      <div className={styles.projectOverlay}>
                        <button
                          onClick={() => openProjectModal(project)}
                          className={styles.viewDetailsButton}
                        >
                          <FaEye />
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className={styles.projectContent}>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className={styles.projectTechnologies}>
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className={styles.techTag}>
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className={styles.moreTech}>
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      <div className={styles.projectStats}>
                        <div className={styles.stat}>
                          <FaStar />
                          <span>{project.features.length} Features</span>
                        </div>
                        <div className={styles.stat}>
                          <FaCodeBranch />
                          <span>
                            {project.technologies.length} Technologies
                          </span>
                        </div>
                      </div>
                      <div className={styles.projectActions}>
                        <button
                          onClick={() => openProjectModal(project)}
                          className={styles.detailsButton}
                        >
                          View Details
                        </button>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.githubButton}
                          >
                            <FaGithub />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === "achievements" && (
            <motion.section
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.achievementsSection}
            >
              <div className={styles.sectionHeader}>
                <h2>Achievements & Recognition</h2>
                <p>
                  Highlights of my competitive programming and hackathon success
                </p>
              </div>
              <div className={styles.achievementsGrid}>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={styles.achievementCard}
                  >
                    <div className={styles.achievementIcon}>
                      <FaTrophy />
                    </div>
                    <h3>{achievement.title}</h3>
                    <p className={styles.achievementDescription}>
                      {achievement.description}
                    </p>
                    <div className={styles.achievementStats}>
                      {Object.entries(achievement.stats).map(([key, value]) => (
                        <div key={key} className={styles.stat}>
                          <span className={styles.statNumber}>{value}</span>
                          <span className={styles.statLabel}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === "timeline" && (
            <motion.section
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.timelineSection}
            >
              <div className={styles.sectionHeader}>
                <h2>Career Timeline</h2>
                <p>My professional journey and growth</p>
              </div>
              <div className={styles.timeline}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={styles.timelineItem}
                >
                  <div className={styles.timelineMarker}>
                    <FaRocket />
                  </div>
                  <div className={styles.timelineContent}>
                    <h3>Backend Developer</h3>
                    <h4>Finaure</h4>
                    <span className={styles.timelineDate}>
                      Sep 2024 - Present
                    </span>
                    <p>
                      Leading backend development for SIP-oriented fintech
                      platform with focus on data visualization and server
                      optimization.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`${styles.timelineItem} ${styles.timelineRight}`}
                >
                  <div className={styles.timelineMarker}>
                    <FaCode />
                  </div>
                  <div className={styles.timelineContent}>
                    <h3>Full Stack Developer</h3>
                    <h4>AICTE, New Delhi</h4>
                    <span className={styles.timelineDate}>June 2024</span>
                    <p>
                      Developed comprehensive AICTE portal with 70% data
                      accessibility improvement and interactive visualization
                      tools.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={styles.timelineItem}
                >
                  <div className={styles.timelineMarker}>
                    <FaTrophy />
                  </div>
                  <div className={styles.timelineContent}>
                    <h3>SIH 2023 Winner</h3>
                    <h4>Smart India Hackathon</h4>
                    <span className={styles.timelineDate}>Dec 2023</span>
                    <p>
                      Achieved 1st position in national-level hackathon
                      organized by AICTE, Government of India.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className={`${styles.timelineItem} ${styles.timelineRight}`}
                >
                  <div className={styles.timelineMarker}>
                    <FaUsers />
                  </div>
                  <div className={styles.timelineContent}>
                    <h3>Campus Ambassador</h3>
                    <h4>Beyond Exam</h4>
                    <span className={styles.timelineDate}>
                      Feb 2023 - Present
                    </span>
                    <p>
                      Recognized among top 20 students nationwide, promoting
                      tech initiatives and educational programs.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.modalOverlay}
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>{selectedProject.title}</h2>
                <button
                  onClick={closeProjectModal}
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.modalImage}>
                  <div className={styles.imagePlaceholder}>
                    <FaCode className={styles.projectIcon} />
                  </div>
                </div>
                <div className={styles.modalDescription}>
                  <h3>Description</h3>
                  <p>{selectedProject.longDescription}</p>
                </div>
                <div className={styles.modalSections}>
                  <div className={styles.modalSection}>
                    <h3>Key Features</h3>
                    <ul>
                      {selectedProject.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.modalSection}>
                    <h3>Challenges Faced</h3>
                    <ul>
                      {selectedProject.challenges.map((challenge, i) => (
                        <li key={i}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.modalSection}>
                    <h3>Solutions Implemented</h3>
                    <ul>
                      {selectedProject.solutions.map((solution, i) => (
                        <li key={i}>{solution}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.modalSection}>
                    <h3>Impact & Results</h3>
                    <ul>
                      {selectedProject.impact.map((impact, i) => (
                        <li key={i}>{impact}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.modalTechnologies}>
                  <h3>Technologies Used</h3>
                  <div className={styles.techGrid}>
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.modalActions}>
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalButton}
                    >
                      <FaGithub />
                      View Code
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.modalButton}
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
