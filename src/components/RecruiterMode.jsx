import React, { useState } from 'react';
import { Github, ExternalLink, X } from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';
import { experience, certifications } from '../data/experience';

export default function RecruiterMode({ onClose }) {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  // Keyboard navigation within Recruiter Mode
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const isInputFocused = e.target && e.target.tagName && e.target.tagName.match(/input|textarea|select/i);
        if (isInputFocused) return;
        e.preventDefault();
        const ids = sections.map(s => s.id);
        const idx = ids.indexOf(activeSection);
        if (e.key === 'ArrowDown') {
          setActiveSection(ids[(idx + 1) % ids.length]);
        } else {
          setActiveSection(ids[(idx - 1 + ids.length) % ids.length]);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSection, onClose]);

  return (
    <div style={styles.overlay} role="dialog" aria-label="Recruiter Mode" aria-modal="true">
      <div style={styles.container}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {/* Profile */}
          <div style={styles.profile}>
            <div style={styles.avatar} aria-hidden="true">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #00F5FF' }}
                />
              ) : (
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <defs>
                    <radialGradient id="av" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.7"/>
                      <stop offset="100%" stopColor="#090D19"/>
                    </radialGradient>
                  </defs>
                  <circle cx="28" cy="28" r="26" fill="url(#av)"/>
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle"
                    fill="#F4F7FF" fontSize="20" fontFamily="Space Grotesk, sans-serif" fontWeight="700">
                    AY
                  </text>
                </svg>
              )}
            </div>
            <h1 style={styles.name}>{profile.name}</h1>
            <div style={styles.role}>{profile.title}</div>
            <div style={styles.edu}>{profile.education.degree}</div>
            <div style={styles.eduSub}>{profile.education.institution}</div>
            <div style={styles.status}>{profile.education.status}</div>
          </div>

          {/* Quick links */}
          <div style={styles.quickLinks}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.quickLink}
              aria-label="GitHub"
            >
              <Github size={14} /> GitHub
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={styles.quickLink}>
                <ExternalLink size={14} /> LinkedIn
              </a>
            )}
            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                style={{...styles.quickLink, background: '#00F5FF', color: '#05060B', border: 'none'}}
                aria-label="Download Resume"
              >
                ↓ Resume
              </a>
            )}
          </div>

          {/* Navigation */}
          <nav style={styles.nav} aria-label="Recruiter mode sections">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  ...styles.navBtn,
                  background: activeSection === s.id ? 'rgba(0,245,255,0.1)' : 'transparent',
                  color: activeSection === s.id ? '#00F5FF' : '#929BB3',
                  borderLeft: activeSection === s.id ? '2px solid #00F5FF' : '2px solid transparent',
                }}
                aria-current={activeSection === s.id ? 'page' : undefined}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Mode badge */}
          <div style={styles.modeBadge} aria-label="Currently in recruiter mode">
            <span style={styles.badgeDot} />
            RECRUITER MODE
          </div>
        </aside>

        {/* Main content */}
        <main style={styles.main}>
          <div style={styles.mainHeader}>
            <h2 style={styles.sectionHeading}>
              {sections.find(s => s.id === activeSection)?.label}
            </h2>
            <button
              onClick={onClose}
              style={styles.closeBtn}
              aria-label="Exit recruiter mode"
            >
              <X size={18} /> EXIT RECRUITER MODE
            </button>
          </div>

          <div style={styles.content}>
            {activeSection === 'about' && <AboutSection />}
            {activeSection === 'education' && <EducationSection />}
            {activeSection === 'skills' && <SkillsSection />}
            {activeSection === 'projects' && <ProjectsSection />}
            {activeSection === 'experience' && <ExperienceSection />}
            {activeSection === 'contact' && <ContactSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ---- Content Sections ----
function EducationSection() {
  return (
    <div style={secStyles.container}>
      <div style={{ ...secStyles.card, borderLeft: '3px solid #00F5FF' }}>
        <div style={{ ...secStyles.cardLabel, color: '#00F5FF' }}>DEGREE PROGRAM</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#F4F7FF', margin: '4px 0 6px' }}>
          {profile.education.degree}
        </h3>
        <div style={{ ...secStyles.bio, color: '#F4F7FF', marginBottom: '4px' }}>
          {profile.education.institution}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#71FF9C', marginBottom: '14px' }}>
          Status: {profile.education.status}
        </div>

        <div style={{ ...secStyles.cardLabel, marginTop: '12px' }}>CORE CURRICULUM & APPLICATION DOMAINS</div>
        <div style={secStyles.techList}>
          {[
            'Full-Stack Web Development',
            'Data Structures & Algorithms',
            'Database Management Systems (DBMS)',
            'Object-Oriented Programming (OOP)',
            'Software Engineering Methodologies',
            'Client-Server Architecture',
          ].map(item => (
            <span key={item} style={{ ...secStyles.techTag, borderColor: 'rgba(0,245,255,0.3)', color: '#00F5FF' }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div style={secStyles.container}>
      <p style={secStyles.bio}>{profile.about}</p>
      <div style={secStyles.grid}>
        <div style={secStyles.card}>
          <div style={secStyles.cardLabel}>FRONTEND FOCUS</div>
          <div style={secStyles.techList}>
            {profile.focus.frontend.map(t => (
              <span key={t} style={{...secStyles.techTag, borderColor: '#00F5FF', color: '#00F5FF'}}>{t}</span>
            ))}
          </div>
        </div>
        <div style={secStyles.card}>
          <div style={secStyles.cardLabel}>BACKEND FOCUS</div>
          <div style={secStyles.techList}>
            {profile.focus.backend.map(t => (
              <span key={t} style={{...secStyles.techTag, borderColor: '#8B5CFF', color: '#8B5CFF'}}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={secStyles.card}>
        <div style={secStyles.cardLabel}>INTERESTS</div>
        <div style={secStyles.techList}>
          {profile.interests.map(i => (
            <span key={i} style={secStyles.techTag}>{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <div style={secStyles.container}>
      {skillGroups.map(group => (
        <div key={group.id} style={secStyles.card}>
          <div style={{...secStyles.cardLabel, color: group.color}}>{group.label.toUpperCase()}</div>
          <div style={secStyles.techList}>
            {group.skills.map(s => (
              <div key={s.name} style={secStyles.skillRow}>
                <span style={{...secStyles.techTag, borderColor: group.color, color: group.color}}>{s.name}</span>
                <span style={secStyles.skillDesc}>{s.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection() {
  return (
    <div style={secStyles.container}>
      {projects.map(p => (
        <div key={p.id} style={{...secStyles.card, borderColor: `${p.color}30`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap'}}>
            <div>
              <div style={{...secStyles.cardLabel, color: p.color, fontSize: '11px'}}>{p.category}</div>
              <h3 style={{fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 700, color: '#F4F7FF', margin: '4px 0 8px'}}>{p.title}</h3>
            </div>
            <div style={{display: 'flex', gap: '8px', flexShrink: 0}}>
              {p.liveDemo ? (
                <a href={p.liveDemo} target="_blank" rel="noopener noreferrer"
                  style={{...secStyles.btn, background: p.color, color: '#05060B'}}>
                  <ExternalLink size={13} /> Demo
                </a>
              ) : (
                <span
                  style={{
                    ...secStyles.btn,
                    border: '1px solid rgba(146,155,179,0.25)',
                    color: '#929BB3',
                    cursor: 'default',
                    background: 'rgba(9,13,25,0.4)',
                  }}
                  title="Live deployment in progress"
                >
                  Demo (In Staging)
                </span>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  style={{...secStyles.btn, borderColor: p.color, color: p.color}}>
                  <Github size={13} /> GitHub
                </a>
              )}
            </div>
          </div>
          <p style={{...secStyles.bio, marginBottom: '12px'}}>{p.description}</p>
          <div style={secStyles.techList}>
            {p.stack.map(t => (
              <span key={t} style={{...secStyles.techTag, borderColor: p.color, color: p.color}}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceSection() {
  const hasContent = (val) => val && val.length > 0;
  return (
    <div style={secStyles.container}>
      <h3 style={secStyles.subheading}>Internship</h3>
      {experience.map(exp => (
        <div key={exp.id} style={{...secStyles.card, borderLeft: `3px solid ${exp.color}`}}>
          <div style={{color: exp.color, fontWeight: 600, marginBottom: '4px'}}>{exp.title}</div>
          {hasContent(exp.organization) ? (
            <div style={secStyles.cardLabel}>{exp.organization}</div>
          ) : (
            <div style={secStyles.placeholder}>Full-Stack Development Practical Training</div>
          )}
          {hasContent(exp.description) ? (
            <p style={secStyles.bio}>{exp.description}</p>
          ) : (
            <p style={secStyles.bio}>
              Hands-on development of modern Single Page Applications, RESTful APIs, and database-backed dashboards utilizing React.js, Node.js, and MongoDB.
            </p>
          )}
        </div>
      ))}

      <h3 style={{...secStyles.subheading, marginTop: '24px'}}>Certifications</h3>
      {certifications.map(cert => (
        <div key={cert.id} style={{...secStyles.card, borderLeft: `3px solid ${cert.color}`}}>
          <div style={{color: cert.color, fontWeight: 600, marginBottom: '4px'}}>{cert.title}</div>
          {hasContent(cert.issuer) ? (
            <div style={secStyles.cardLabel}>{cert.issuer}</div>
          ) : (
            <div style={{ ...secStyles.placeholder, color: 'rgba(244,247,255,0.6)' }}>Verified Technical Credential</div>
          )}
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
              style={{color: '#00F5FF', fontSize: '13px'}}>
              View Credential ↗
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!profile.email) return;
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={secStyles.container}>
      <div style={secStyles.card}>
        <h3 style={{...secStyles.subheading, marginBottom: '16px'}}>Get in Touch</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" style={secStyles.contactRow}>
            <Github size={16} /> GitHub ({profile.github})
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={secStyles.contactRow}>
              <ExternalLink size={16} /> LinkedIn ({profile.linkedin})
            </a>
          )}
          {profile.email && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href={`mailto:${profile.email}`} style={{ ...secStyles.contactRow, flex: 1 }}>
                ✉ {profile.email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  ...secStyles.btn,
                  borderColor: copied ? '#71FF9C' : 'rgba(0,245,255,0.3)',
                  color: copied ? '#71FF9C' : '#00F5FF',
                  background: 'transparent',
                  padding: '10px 16px',
                  cursor: 'pointer',
                }}
                aria-label="Copy email address"
              >
                {copied ? '✓ Copied' : 'Copy Email'}
              </button>
            </div>
          )}
          {!profile.email && !profile.linkedin && (
            <div style={secStyles.placeholder}>
              Add email and LinkedIn to src/data/profile.js
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Styles ----
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(5,6,11,0.98)',
    zIndex: 6000,
    display: 'flex',
    overflow: 'hidden',
    animation: 'fadeIn 0.3s ease',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sidebar: {
    width: '260px',
    flexShrink: 0,
    borderRight: '1px solid rgba(0,245,255,0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 24px',
    gap: '24px',
    overflowY: 'auto',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '6px',
  },
  avatar: {
    marginBottom: '8px',
  },
  name: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#F4F7FF',
  },
  role: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#00F5FF',
    letterSpacing: '0.05em',
  },
  edu: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#929BB3',
    marginTop: '4px',
  },
  eduSub: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.6)',
  },
  status: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#71FF9C',
    letterSpacing: '0.06em',
    marginTop: '4px',
  },
  quickLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  quickLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#00F5FF',
    textDecoration: 'none',
    fontSize: '13px',
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '8px 12px',
    border: '1px solid rgba(0,245,255,0.25)',
    borderRadius: '6px',
    transition: 'all 0.2s',
    fontWeight: 500,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navBtn: {
    background: 'transparent',
    border: 'none',
    borderRadius: '0 6px 6px 0',
    padding: '10px 16px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontWeight: 500,
  },
  modeBadge: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#00F5FF',
    letterSpacing: '0.1em',
    padding: '8px 12px',
    background: 'rgba(0,245,255,0.05)',
    borderRadius: '6px',
    border: '1px solid rgba(0,245,255,0.15)',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#71FF9C',
    flexShrink: 0,
    animation: 'pulse-cyan 2s ease-in-out infinite',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  mainHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 36px 16px',
    borderBottom: '1px solid rgba(0,245,255,0.08)',
    flexShrink: 0,
  },
  sectionHeading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#F4F7FF',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: '1px solid rgba(0,245,255,0.25)',
    color: '#00F5FF',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.06em',
    transition: 'all 0.2s',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '28px 36px',
  },
};

const secStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  bio: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '15px',
    color: '#929BB3',
    lineHeight: 1.7,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  card: {
    background: 'rgba(9,13,25,0.8)',
    border: '1px solid rgba(0,245,255,0.1)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'rgba(146,155,179,0.6)',
    textTransform: 'uppercase',
  },
  techList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  techTag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 12px',
    border: '1px solid rgba(0,245,255,0.25)',
    borderRadius: '20px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#929BB3',
  },
  skillRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
  },
  skillDesc: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: 'rgba(146,155,179,0.7)',
  },
  subheading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    color: '#F4F7FF',
  },
  placeholder: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.4)',
    fontStyle: 'italic',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    border: '1px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00F5FF',
    textDecoration: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    padding: '10px 14px',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
};
