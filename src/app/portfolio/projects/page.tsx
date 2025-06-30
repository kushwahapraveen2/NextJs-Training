"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaDatabase,
  FaCloud,
  FaTools,
  FaPalette,
  FaMobile,
  FaDesktop,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import Link from "next/link";
import styles from "./projects.module.css";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  features: string[];
  category: "web" | "mobile" | "ai" | "fullstack";
  status: "completed" | "in-progress" | "planned";
}

const projects: Project[] = [
  {
    id: 1,
    title: "Swasthya Sahayak",
    description:
      "AI-powered portal that simplifies AICTE's Handbook, enhancing understanding by 60% and optimizing approvals.",
    technologies: ["React", "Node.js", "Machine Learning", "Python"],
    image: "/api/placeholder/400/250",
    github: "#",
    live: "#",
    features: [
      "AI-powered document processing",
      "60% improvement in understanding",
      "40% reduction in rework",
      "Interactive dashboard",
    ],
    category: "ai",
    status: "completed",
  },
  {
    id: 2,
    title: "Techno Conclave",
    description:
      "Digital transformation platform achieving 30% increase in participant engagement with seamless registration.",
    technologies: ["React", "Node.js", "REST APIs", "MongoDB"],
    image: "/api/placeholder/400/250",
    github: "#",
    live: "#",
    features: [
      "Event management system",
      "30% engagement increase",
      "50% registration efficiency",
      "Real-time updates",
    ],
    category: "fullstack",
    status: "completed",
  },
  {
    id: 3,
    title: "Test Portal",
    description:
      "Responsive React-based test portal managing 800+ participants with 40% reduction in assessment processing time.",
    technologies: ["React", "JavaScript", "CSS", "HTML"],
    image: "/api/placeholder/400/250",
    github: "#",
    features: [
      "Scalable assessment system",
      "800+ participant support",
      "40% processing time reduction",
      "50% performance improvement",
    ],
    category: "web",
    status: "completed",
  },
  {
    id: 4,
    title: "AICTE Portal",
    description:
      "Comprehensive portal enhancing data accessibility by 70% with interactive data visualization tools.",
    technologies: ["React", "Node.js", "Data Visualization", "D3.js"],
    image: "/api/placeholder/400/250",
    github: "#",
    live: "#",
    features: [
      "70% data accessibility improvement",
      "Interactive graphs and charts",
      "60% user engagement boost",
      "Comprehensive institute data",
    ],
    category: "fullstack",
    status: "completed",
  },
  {
    id: 5,
    title: "Mobile Fitness App",
    description:
      "Cross-platform mobile application for fitness tracking with personalized workout plans and progress analytics.",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    image: "/api/placeholder/400/250",
    github: "#",
    features: [
      "Cross-platform compatibility",
      "Real-time progress tracking",
      "Personalized workout plans",
      "Social features",
    ],
    category: "mobile",
    status: "in-progress",
  },
  {
    id: 6,
    title: "E-commerce Platform",
    description:
      "Modern e-commerce solution with advanced search, payment integration, and inventory management.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    image: "/api/placeholder/400/250",
    github: "#",
    features: [
      "Advanced search functionality",
      "Secure payment processing",
      "Inventory management",
      "Admin dashboard",
    ],
    category: "fullstack",
    status: "planned",
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: <FaCode /> },
  { id: "web", label: "Web Apps", icon: <FaDesktop /> },
  { id: "mobile", label: "Mobile Apps", icon: <FaMobile /> },
  { id: "ai", label: "AI/ML", icon: <FaCode /> },
  { id: "fullstack", label: "Full Stack", icon: <FaDatabase /> },
];

const statuses = [
  { id: "all", label: "All Status" },
  { id: "completed", label: "Completed" },
  { id: "in-progress", label: "In Progress" },
  { id: "planned", label: "Planned" },
];

export default function Projects() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (project) => project.status === selectedStatus
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, selectedStatus, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#43e97b";
      case "in-progress":
        return "#ffa726";
      case "planned":
        return "#42a5f5";
      default:
        return "#666";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return status;
    }
  };

  const getProjectGradient = (id: number) => {
    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className={styles.projectsContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <Link href="/portfolio" className={styles.backButton}>
          <FaArrowLeft /> Back to Portfolio
        </Link>
        <h1 className={styles.pageTitle}>My Projects</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={styles.filtersSection}
      >
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <FaFilter /> Category
            </label>
            <div className={styles.filterButtons}>
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
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <div className={styles.filterButtons}>
              {statuses.map((status) => (
                <button
                  key={status.id}
                  className={`${styles.filterButton} ${
                    selectedStatus === status.id ? styles.activeFilter : ""
                  }`}
                  onClick={() => setSelectedStatus(status.id)}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className={styles.projectsGrid}
      >
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.noResults}
            >
              <h3>No projects found</h3>
              <p>Try adjusting your filters or search terms</p>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={styles.projectCard}
              >
                <div className={styles.projectImage}>
                  <div
                    className={styles.projectImageBackground}
                    style={{ background: getProjectGradient(project.id) }}
                  >
                    <div className={styles.projectImageContent}>
                      <h3>{project.title}</h3>
                      <p>{project.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                  <div className={styles.projectOverlay}>
                    <div className={styles.projectLinks}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                  <div
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {getStatusLabel(project.status)}
                  </div>
                </div>

                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>

                  <div className={styles.projectFeatures}>
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.projectTechnologies}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={styles.statsSection}
      >
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>{projects.length}</h3>
            <p>Total Projects</p>
          </div>
          <div className={styles.statCard}>
            <h3>{projects.filter((p) => p.status === "completed").length}</h3>
            <p>Completed</p>
          </div>
          <div className={styles.statCard}>
            <h3>{projects.filter((p) => p.status === "in-progress").length}</h3>
            <p>In Progress</p>
          </div>
          <div className={styles.statCard}>
            <h3>{projects.filter((p) => p.status === "planned").length}</h3>
            <p>Planned</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
