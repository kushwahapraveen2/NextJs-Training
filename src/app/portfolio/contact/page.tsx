"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaPaperPlane,
  FaUser,
  FaComment,
} from "react-icons/fa";
import Link from "next/link";
import styles from "./contact.module.css";

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "praveen.kushwaha@unthinkable.co",
    link: "mailto:praveen.kushwaha@unthinkable.co",
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+91 1212121212",
    link: "tel:+911212121212",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Gurgaon, India",
    link: "#",
  },
];

const socialLinks = [
  {
    icon: <FaGithub />,
    label: "GitHub",
    url: "https://github.com/Kushwahapraveen2",
    color: "#333",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/praveen-kushwaha-a5092925b/",
    color: "#0077b5",
  },
  {
    icon: <FaTwitter />,
    label: "Twitter",
    url: "https://twitter.com",
    color: "#1da1f2",
  },
  {
    icon: <FaGlobe />,
    label: "Website",
    url: "#",
    color: "#667eea",
  },
];

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);

    // Show success message (you can implement a toast notification here)
    alert("Message sent successfully!");
  };

  const handleDownloadResume = () => {
    // Create a dummy resume content
    const resumeContent = `
Your Name
Full Stack Developer

CONTACT
Email: praveen.kushwaha@unthinkable.co
Phone: +91 1212121212
Location: Gurgaon, India",

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
    <div className={styles.contactContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.header}
      >
        <Link href="/portfolio" className={styles.backButton}>
          <FaArrowLeft /> Back to Portfolio
        </Link>
        <h1 className={styles.pageTitle}>Get In Touch</h1>
      </motion.div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={styles.contactInfoSection}
        >
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <div className={styles.contactInfoList}>
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className={styles.contactInfoItem}
              >
                <div className={styles.contactIcon}>{info.icon}</div>
                <div className={styles.contactDetails}>
                  <h3>{info.label}</h3>
                  <a href={info.link} className={styles.contactLink}>
                    {info.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Follow Me</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={styles.socialLink}
                  style={{ backgroundColor: social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.contactFormSection}
        >
          <h2 className={styles.sectionTitle}>Send Message</h2>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <FaComment />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputIcon}>
                <FaComment />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                required
                rows={5}
                className={styles.formTextarea}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={styles.ctaSection}
      >
        <div className={styles.ctaContent}>
          <h2>Ready to Collaborate?</h2>
          <p>
            Lets work together to bring your ideas to life. I'm always open to
            discussing new opportunities and exciting projects.
          </p>
          <div className={styles.ctaButtons}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.ctaButton}
              onClick={handleDownloadResume}
            >
              Download Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.ctaButton} ${styles.secondary}`}
            >
              View Projects
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
