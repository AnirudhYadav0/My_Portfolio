import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Compass,
  ShieldCheck,
  Layers,
  Cpu,
  Database,
  Sparkles,
  Send,
  Check,
  Copy,
  Calendar,
  DollarSign,
  MapPin,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { skillGroups } from '../data/skills';
import { experience, certifications } from '../data/experience';

// ============================================================
// ENTERSKILL HUB ARCHITECTURE VISUALIZATION (WITH JWT AUTH)
// ============================================================
function EnterSkillArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState('auth');

  const layers = [
    {
      id: 'client',
      label: 'React + Vite Frontend',
      sub: 'Single Page Application UI & Client State',
      icon: <Layers size={14} />,
      color: '#00F5FF',
      role: 'Client presentation layer built with React components, responsive layouts, Axios HTTP client, and state management.',
      details: 'Dispatches authenticated requests with credentials and handles dynamic UI updates.',
    },
    {
      id: 'auth',
      label: 'JWT Authentication Flow',
      sub: 'Bearer Token Authorization Header',
      icon: <ShieldCheck size={14} />,
      color: '#FF35D3',
      role: 'Stateless session security. Upon login, server generates signed JSON Web Token (JWT).',
      details: 'Axios attaches "Authorization: Bearer <token>" to every protected API request. Middleware verifies token signature before allowing controller execution.',
    },
    {
      id: 'api',
      label: 'Node.js + Express API',
      sub: 'RESTful Controllers & Auth Middleware',
      icon: <Cpu size={14} />,
      color: '#8B5CFF',
      role: 'Backend runtime handling routing, body validation, token verification middleware, and CRUD operations.',
      details: 'Separates routes for auth, skills, business ideas, and task management.',
    },
    {
      id: 'db',
      label: 'MongoDB Atlas',
      sub: 'Cloud Document Database & Mongoose ODM',
      icon: <Database size={14} />,
      color: '#71FF9C',
      role: 'Cloud-hosted NoSQL document store with strict Mongoose schemas.',
      details: 'Stores indexed user profiles, encrypted password hashes (bcrypt), skill inventories, and task documents.',
    },
  ];

  const currentLayer = layers.find(l => l.id === selectedLayer) || layers[1];

  return (
    <div style={archStyles.container}>
      <div style={archStyles.header}>
        <div style={archStyles.title}>FULL-STACK ARCHITECTURE & AUTH FLOW</div>
        <span style={archStyles.tag}>INTERACTIVE</span>
      </div>

      <div style={archStyles.flowList}>
        {layers.map((layer, idx) => {
          const isSelected = selectedLayer === layer.id;
          return (
            <React.Fragment key={layer.id}>
              <button
                type="button"
                onClick={() => setSelectedLayer(layer.id)}
                style={{
                  ...archStyles.nodeBtn,
                  borderColor: isSelected ? layer.color : 'rgba(0,245,255,0.15)',
                  background: isSelected ? `${layer.color}18` : 'rgba(9,13,25,0.6)',
                  boxShadow: isSelected ? `0 0 15px ${layer.color}30` : 'none',
                }}
                aria-pressed={isSelected}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: layer.color }}>{layer.icon}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ ...archStyles.nodeTitle, color: isSelected ? layer.color : '#F4F7FF' }}>
                      {layer.label}
                    </div>
                    <div style={archStyles.nodeSub}>{layer.sub}</div>
                  </div>
                </div>
                <ChevronRight size={14} color={isSelected ? layer.color : '#929BB3'} />
              </button>
              {idx < layers.length - 1 && (
                <div style={archStyles.flowConnector} aria-hidden="true">
                  <div style={archStyles.flowLine} />
                  <span style={archStyles.flowArrow}>↓</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Layer Detail Card */}
      <div style={{ ...archStyles.detailCard, borderColor: `${currentLayer.color}40` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ color: currentLayer.color, fontSize: '11px', fontWeight: 700 }}>ROLE:</span>
          <span style={{ color: '#F4F7FF', fontSize: '12px', fontWeight: 600 }}>{currentLayer.label}</span>
        </div>
        <p style={archStyles.detailText}>{currentLayer.role}</p>
        <p style={{ ...archStyles.detailText, color: '#929BB3', marginTop: '6px', fontSize: '11px' }}>
          <strong>Implementation Note:</strong> {currentLayer.details}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// TRIPNEXUS INTERACTIVE PLANNER SIMULATOR (SAMPLE DATA)
// ============================================================
function TripNexusSimulator() {
  const [destination, setDestination] = useState('kyoto');
  const [duration, setDuration] = useState('3');
  const [budget, setBudget] = useState('moderate');
  const [style, setStyle] = useState('culture');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const sampleDestinations = {
    kyoto: {
      name: 'Kyoto & Nara, Japan',
      tagline: 'Ancient Temples & Bamboo Groves',
      stayEstimate: { backpacker: '$45/night', moderate: '$140/night', luxury: '$380/night' },
      itinerary: [
        { day: 'Day 1', title: 'Historic Gion & Kiyomizu-dera', desc: 'Arrive at Kyoto station, walk through lantern-lit Ninenzaka, sunset at wooden terrace of Kiyomizu-dera.' },
        { day: 'Day 2', title: 'Arashiyama Bamboo & Kinkaku-ji', desc: 'Early morning serenity in Arashiyama bamboo grove, Tenryu-ji zen temple, afternoon golden pavilion tour.' },
        { day: 'Day 3', title: 'Fushimi Inari 10,000 Torii Gates', desc: 'Dawn hike up Mt. Inari through thousand vermilion gates, traditional matcha ceremony & departure.' },
      ],
    },
    reykjavik: {
      name: 'Reykjavik & Golden Circle, Iceland',
      tagline: 'Geysers, Glaciers & Aurora Skies',
      stayEstimate: { backpacker: '$65/night', moderate: '$190/night', luxury: '$450/night' },
      itinerary: [
        { day: 'Day 1', title: 'Reykjavik Harpa & Blue Lagoon', desc: 'Arrive in Keflavik, geothermal dip at Blue Lagoon, evening stroll along Reykjavik old harbour.' },
        { day: 'Day 2', title: 'Golden Circle Expedition', desc: 'Thingvellir continental rift, Strokkur exploding geyser, thundering Gullfoss double-cascade.' },
        { day: 'Day 3', title: 'South Coast Waterfalls & Black Sand', desc: 'Seljalandsfoss walk-behind waterfall, Skogafoss mist, and dramatic basalt columns of Reynisfjara.' },
      ],
    },
    alps: {
      name: 'Swiss Alps & Interlaken, Switzerland',
      tagline: 'Dramatic Peaks & Alpine Rail Journeys',
      stayEstimate: { backpacker: '$55/night', moderate: '$210/night', luxury: '$520/night' },
      itinerary: [
        { day: 'Day 1', title: 'Interlaken & Lake Brienz Cruise', desc: 'Arrival between twin turquoise lakes, scenic steamboat journey, and funicular ascent to Harder Kulm.' },
        { day: 'Day 2', title: 'Lauterbrunnen Valley of 72 Waterfalls', desc: 'Hike beneath vertical cliff faces, explore Trümmelbach glacial cascades inside mountain cavern.' },
        { day: 'Day 3', title: 'Jungfraujoch Top of Europe', desc: 'High-altitude cogwheel railway to Aletsch Glacier ice palace and alpine panoramic observatory.' },
      ],
    },
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setItinerary(sampleDestinations[destination]);
      setIsGenerating(false);
    }, 450);
  };

  return (
    <div style={simStyles.container}>
      <div style={simStyles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#00F5FF" />
          <span style={simStyles.title}>INTERACTIVE DEMO: AI ITINERARY PLANNER</span>
        </div>
        <span style={simStyles.demoBadge}>SAMPLE DATA PREVIEW</span>
      </div>

      <div style={simStyles.controlGrid}>
        <div>
          <label style={simStyles.label}>
            <MapPin size={11} style={{ marginRight: '4px' }} /> DESTINATION
          </label>
          <select
            value={destination}
            onChange={e => { setDestination(e.target.value); setItinerary(null); }}
            style={simStyles.select}
          >
            <option value="kyoto">Kyoto & Nara, Japan</option>
            <option value="reykjavik">Reykjavik & Golden Circle, Iceland</option>
            <option value="alps">Swiss Alps & Interlaken, Switzerland</option>
          </select>
        </div>

        <div>
          <label style={simStyles.label}>
            <Calendar size={11} style={{ marginRight: '4px' }} /> DURATION
          </label>
          <div style={simStyles.pillRow}>
            {['3', '5', '7'].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => { setDuration(d); setItinerary(null); }}
                style={{
                  ...simStyles.pillBtn,
                  borderColor: duration === d ? '#00F5FF' : 'rgba(0,245,255,0.2)',
                  color: duration === d ? '#00F5FF' : '#929BB3',
                  background: duration === d ? 'rgba(0,245,255,0.12)' : 'transparent',
                }}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={simStyles.label}>
            <DollarSign size={11} style={{ marginRight: '4px' }} /> BUDGET TIER
          </label>
          <div style={simStyles.pillRow}>
            {[
              { id: 'backpacker', label: 'Backpacker' },
              { id: 'moderate', label: 'Moderate' },
              { id: 'luxury', label: 'Luxury' },
            ].map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => { setBudget(b.id); setItinerary(null); }}
                style={{
                  ...simStyles.pillBtn,
                  borderColor: budget === b.id ? '#8B5CFF' : 'rgba(139,92,255,0.2)',
                  color: budget === b.id ? '#8B5CFF' : '#929BB3',
                  background: budget === b.id ? 'rgba(139,92,255,0.12)' : 'transparent',
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={simStyles.label}>
            <Compass size={11} style={{ marginRight: '4px' }} /> TRAVEL STYLE
          </label>
          <div style={simStyles.pillRow}>
            {[
              { id: 'culture', label: 'Culture' },
              { id: 'nature', label: 'Adventure' },
            ].map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => { setStyle(s.id); setItinerary(null); }}
                style={{
                  ...simStyles.pillBtn,
                  borderColor: style === s.id ? '#71FF9C' : 'rgba(113,255,156,0.2)',
                  color: style === s.id ? '#71FF9C' : '#929BB3',
                  background: style === s.id ? 'rgba(113,255,156,0.12)' : 'transparent',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        style={simStyles.generateBtn}
      >
        {isGenerating ? 'GENERATING SIMULATED ITINERARY…' : '⚡ GENERATE DEMO ITINERARY'}
      </button>

      {/* Simulated Output Notice */}
      {itinerary && (
        <div style={simStyles.resultCard}>
          <div style={simStyles.disclaimer}>
            [ SIMULATED PREVIEW — DEMONSTRATION MODE ONLY ]
          </div>
          <div style={simStyles.resultTitle}>{itinerary.name}</div>
          <div style={simStyles.resultSub}>{itinerary.tagline}</div>

          <div style={simStyles.budgetBadge}>
            Estimated Lodging ({budget}):{' '}
            <strong style={{ color: '#71FF9C' }}>{itinerary.stayEstimate[budget]}</strong>
          </div>

          <div style={simStyles.itineraryList}>
            {itinerary.itinerary.slice(0, parseInt(duration, 10)).map((item, idx) => (
              <div key={idx} style={simStyles.dayCard}>
                <div style={simStyles.dayHeader}>
                  <span style={simStyles.dayTag}>{item.day}</span>
                  <span style={simStyles.dayTitle}>{item.title}</span>
                </div>
                <p style={simStyles.dayDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={simStyles.engineNotice}>
            Simulated output showcasing TripNexus itinerary synthesis logic.
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ABOUT PANEL
// ============================================================
function AboutPanel({ onNavigate }) {
  return (
    <div style={panelStyles.content}>
      {/* Top Identity Block */}
      <div style={aboutStyles.headerCard}>
        <div style={aboutStyles.avatarContainer}>
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              style={aboutStyles.avatarImage}
            />
          ) : (
            <div style={aboutStyles.cyberAvatar} aria-hidden="true">
              <svg width="68" height="68" viewBox="0 0 68 68">
                <defs>
                  <radialGradient id="aboutAv" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#8B5CFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#05060B" />
                  </radialGradient>
                </defs>
                <circle cx="34" cy="34" r="32" fill="url(#aboutAv)" />
                <circle cx="34" cy="34" r="24" fill="none" stroke="#00F5FF" strokeWidth="0.8" opacity="0.6" />
                <circle cx="34" cy="34" r="14" fill="#090D19" />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="#00F5FF"
                  fontSize="14"
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight="700"
                >
                  AY
                </text>
              </svg>
            </div>
          )}
        </div>
        <div>
          <div style={panelStyles.category}>DEVELOPER IDENTITY</div>
          <h2 style={aboutStyles.name}>{profile.name}</h2>
          <div style={aboutStyles.titleBadge}>
            <span style={aboutStyles.statusDot} />
            {profile.title}
          </div>
        </div>
      </div>

      {/* Education Grid */}
      <div style={panelStyles.aboutGrid}>
        <div>
          <div style={panelStyles.label}>EDUCATION</div>
          <div style={panelStyles.value}>{profile.education.degree}</div>
          <div style={{ ...panelStyles.value, opacity: 0.7, fontSize: '12px' }}>
            {profile.education.institution}
          </div>
        </div>
        <div>
          <div style={panelStyles.label}>ACADEMIC STATUS</div>
          <div style={{ ...panelStyles.value, color: '#71FF9C' }}>
            {profile.education.status}
          </div>
        </div>
      </div>

      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>ABOUT ME</div>
      <p style={panelStyles.bio}>{profile.about}</p>

      {/* Subtle Constellation / Data Nexus Diagram */}
      <div style={aboutStyles.constellationCard} aria-label="Constellation of technical focus">
        <div style={aboutStyles.constellationTitle}>
          <Sparkles size={12} color="#00F5FF" />
          <span>TECHNICAL FOCUS NEXUS</span>
        </div>
        <svg width="100%" height="80" viewBox="0 0 360 80" style={{ overflow: 'visible' }}>
          <line x1="60" y1="40" x2="140" y2="20" stroke="rgba(0,245,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="140" y1="20" x2="220" y2="60" stroke="rgba(139,92,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="220" y1="60" x2="300" y2="35" stroke="rgba(113,255,156,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="40" x2="220" y2="60" stroke="rgba(255,53,211,0.2)" strokeWidth="1" />

          {/* Nodes */}
          <circle cx="60" cy="40" r="14" fill="#090D19" stroke="#00F5FF" strokeWidth="1.5" />
          <text x="60" y="44" fill="#00F5FF" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">React</text>

          <circle cx="140" cy="20" r="14" fill="#090D19" stroke="#8B5CFF" strokeWidth="1.5" />
          <text x="140" y="24" fill="#8B5CFF" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Node</text>

          <circle cx="220" cy="60" r="14" fill="#090D19" stroke="#71FF9C" strokeWidth="1.5" />
          <text x="220" y="64" fill="#71FF9C" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">Mongo</text>

          <circle cx="300" cy="35" r="14" fill="#090D19" stroke="#FF35D3" strokeWidth="1.5" />
          <text x="300" y="39" fill="#FF35D3" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">REST</text>
        </svg>
      </div>

      {/* Focus Areas */}
      <div style={aboutStyles.focusGrid}>
        <div style={aboutStyles.focusCard}>
          <div style={{ ...aboutStyles.focusHeader, color: '#00F5FF' }}>FRONTEND FOCUS</div>
          <div style={panelStyles.tagRow}>
            {profile.focus.frontend.map(item => (
              <span key={item} style={{ ...panelStyles.tag, borderColor: 'rgba(0,245,255,0.3)', color: '#00F5FF' }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div style={aboutStyles.focusCard}>
          <div style={{ ...aboutStyles.focusHeader, color: '#8B5CFF' }}>BACKEND FOCUS</div>
          <div style={panelStyles.tagRow}>
            {profile.focus.backend.map(item => (
              <span key={item} style={{ ...panelStyles.tag, borderColor: 'rgba(139,92,255,0.3)', color: '#8B5CFF' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>DEVELOPMENT INTERESTS</div>
      <div style={panelStyles.tagRow}>
        {profile.interests.map(i => (
          <span key={i} style={panelStyles.tag}>{i}</span>
        ))}
      </div>

      {/* Featured Projects Quick Navigation */}
      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>FEATURED WORLDS</div>
      <div style={aboutStyles.featuredRow}>
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('tripnexus')}
          style={{ ...aboutStyles.featuredBtn, borderColor: 'rgba(0,245,255,0.4)' }}
        >
          <span style={{ color: '#00F5FF' }}>◆ TripNexus</span>
          <span style={aboutStyles.featuredSub}>AI Travel Planning ›</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('enterskill')}
          style={{ ...aboutStyles.featuredBtn, borderColor: 'rgba(113,255,156,0.4)' }}
        >
          <span style={{ color: '#71FF9C' }}>◆ EnterSkill Hub</span>
          <span style={aboutStyles.featuredSub}>Full-Stack App ›</span>
        </button>
      </div>

      <div style={panelStyles.divider} />
      <div style={panelStyles.linksRow}>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          style={panelStyles.link}
          aria-label="GitHub profile"
        >
          <Github size={14} />
          GitHub
        </a>
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={panelStyles.link}
            aria-label="LinkedIn profile"
          >
            <ExternalLink size={14} />
            LinkedIn
          </a>
        )}
        {profile.resume && (
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...panelStyles.link, color: '#71FF9C', borderColor: '#71FF9C' }}
            aria-label="Download resume"
          >
            ↓ Resume
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PROJECT PANEL
// ============================================================
function ProjectPanel({ project }) {
  if (!project) return null;

  return (
    <div style={panelStyles.content}>
      <div style={panelStyles.category}>{project.category}</div>
      <h2 style={{ ...panelStyles.projectHeading, color: project.color }}>{project.title}</h2>
      <p style={panelStyles.bio}>{project.description}</p>

      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>KEY FEATURES</div>
      <ul style={panelStyles.featureList}>
        {project.features.map((f, i) => (
          <li key={i} style={panelStyles.featureItem}>
            <span style={{ color: project.color, marginRight: '8px', flexShrink: 0 }}>›</span>
            {f}
          </li>
        ))}
      </ul>

      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>TECH STACK</div>
      <div style={panelStyles.tagRow}>
        {project.stack.map(t => (
          <span key={t} style={{ ...panelStyles.tag, borderColor: project.color, color: project.color }}>
            {t}
          </span>
        ))}
      </div>

      {/* EnterSkill Hub Architecture */}
      {project.id === 'enterskill' && <EnterSkillArchitecture />}

      {/* TripNexus Simulator */}
      {project.id === 'tripnexus' && <TripNexusSimulator />}

      <div style={panelStyles.divider} />
      <div style={panelStyles.linksRow}>
        {project.liveDemo ? (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...panelStyles.linkBtn, background: project.color, color: '#05060B' }}
            aria-label={`Live demo for ${project.title}`}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        ) : (
          <span style={panelStyles.disabledBtn} title="Demo URL not configured">
            Live Demo (TBD)
          </span>
        )}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={panelStyles.link}
            aria-label={`GitHub repository for ${project.title}`}
          >
            <Github size={14} />
            GitHub
          </a>
        ) : (
          <span style={panelStyles.disabledBtn} title="Repository URL not configured">
            GitHub (TBD)
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SKILLS PANEL (CONSTELLATION VIEW)
// ============================================================
function SkillsPanel({ activeGroup, setActiveGroup }) {
  const [activeSkill, setActiveSkill] = useState(null);

  const currentGroup = skillGroups.find(g => g.id === activeGroup) || skillGroups[0];

  return (
    <div style={panelStyles.content}>
      <div style={panelStyles.category}>SKILL CONSTELLATION</div>
      <p style={panelStyles.bio}>
        Explore technical proficiencies by galaxy clusters. Click any technology star to inspect usage details.
      </p>

      {/* Cluster Tabs */}
      <div style={panelStyles.groupTabs}>
        {skillGroups.map(g => (
          <button
            key={g.id}
            type="button"
            onClick={() => { setActiveGroup(g.id); setActiveSkill(null); }}
            style={{
              ...panelStyles.groupTab,
              borderColor: activeGroup === g.id ? g.color : 'rgba(146,155,179,0.2)',
              color: activeGroup === g.id ? g.color : '#929BB3',
              background: activeGroup === g.id ? `${g.color}15` : 'transparent',
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Interactive Constellation Visualization */}
      <div style={skillsStyles.constellationBox}>
        <div style={skillsStyles.clusterLabel}>
          CLUSTER: <span style={{ color: currentGroup.color }}>{currentGroup.label.toUpperCase()}</span>
        </div>
        <div style={skillsStyles.starField}>
          {currentGroup.skills.map(s => {
            const isSelected = activeSkill?.name === s.name;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => setActiveSkill(isSelected ? null : s)}
                style={{
                  ...skillsStyles.starBtn,
                  borderColor: isSelected ? currentGroup.color : 'rgba(255,255,255,0.12)',
                  background: isSelected ? `${currentGroup.color}25` : 'rgba(9,13,25,0.7)',
                  color: isSelected ? currentGroup.color : '#F4F7FF',
                  boxShadow: isSelected ? `0 0 12px ${currentGroup.color}40` : 'none',
                }}
                aria-expanded={isSelected}
              >
                <span style={{ color: currentGroup.color, marginRight: '6px' }}>✦</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Detail */}
        {activeSkill ? (
          <div style={{ ...skillsStyles.skillDetail, borderColor: `${currentGroup.color}40` }}>
            <div style={{ color: currentGroup.color, fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
              {activeSkill.name}
            </div>
            <p style={{ color: '#F4F7FF', fontSize: '12px', lineHeight: 1.6 }}>
              {activeSkill.description}
            </p>
          </div>
        ) : (
          <div style={skillsStyles.selectPrompt}>
            Select any technology node above to inspect implementation context.
          </div>
        )}
      </div>

      {/* Accessible List for Screen Readers / Keyboard */}
      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>ALL TECHNOLOGIES IN THIS REGION</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {currentGroup.skills.map(s => (
          <div key={s.name} style={skillsStyles.accessibleRow}>
            <span style={{ color: currentGroup.color, fontWeight: 600, fontSize: '12px' }}>{s.name}</span>
            <span style={{ color: '#929BB3', fontSize: '11px' }}>{s.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXPERIENCE PANEL
// ============================================================
function ExperiencePanel() {
  const hasContent = val => val && val.length > 0;

  return (
    <div style={panelStyles.content}>
      <div style={panelStyles.category}>EXPERIENCE NEBULA</div>
      <p style={panelStyles.bio}>
        Professional development trajectory, practical internship, and verified technical credentials.
      </p>

      <div style={panelStyles.label}>INTERNSHIP & PRACTICAL EXPERIENCE</div>
      {experience.map(exp => (
        <div key={exp.id} style={panelStyles.expCard}>
          <div style={{ ...panelStyles.expDot, background: exp.color }} />
          <div>
            <div style={{ ...panelStyles.expTitle, color: exp.color }}>{exp.title}</div>
            {hasContent(exp.organization) ? (
              <div style={panelStyles.expOrg}>{exp.organization}</div>
            ) : (
              <div style={panelStyles.placeholder}>Organization configurable in experience.js</div>
            )}
            {(hasContent(exp.startDate) || hasContent(exp.endDate)) && (
              <div style={panelStyles.expDate}>{exp.startDate} — {exp.endDate}</div>
            )}
            {hasContent(exp.description) ? (
              <p style={panelStyles.expDesc}>{exp.description}</p>
            ) : (
              <div style={panelStyles.placeholder}>Responsibilities & achievements configurable in experience.js</div>
            )}
          </div>
        </div>
      ))}

      <div style={panelStyles.divider} />
      <div style={panelStyles.label}>CERTIFICATIONS & CREDENTIALS</div>

      {certifications.map(cert => (
        <div key={cert.id} style={panelStyles.certCard}>
          <div style={{ ...panelStyles.certDot, background: cert.color }} />
          <div>
            <div style={{ color: cert.color, fontWeight: 600, fontSize: '13px' }}>{cert.title}</div>
            {hasContent(cert.issuer) ? (
              <div style={panelStyles.expOrg}>{cert.issuer}</div>
            ) : (
              <div style={panelStyles.placeholder}>Issuer configurable in experience.js</div>
            )}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#00F5FF', fontSize: '12px' }}
              >
                View Credential ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// CONTACT PORTAL
// ============================================================
function ContactPanel() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please provide your name';
    if (!form.email.trim()) e.email = 'Please provide your email address';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.message.trim()) e.message = 'Please enter a message';
    return e;
  };

  const handleCopyEmail = () => {
    if (!profile.email) return;
    navigator.clipboard?.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const emailTo = profile.email || '';
    const subject = encodeURIComponent(form.subject || 'Neonverse Inquiry');
    const body = encodeURIComponent(
      `Hi Anirudh,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    );

    if (emailTo) {
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    } else {
      // Copy formatted message to clipboard as graceful transparent fallback
      const draft = `To: (Configure email in profile.js)\nFrom: ${form.name} <${form.email}>\nSubject: ${form.subject || 'Portfolio Inquiry'}\n\n${form.message}`;
      navigator.clipboard?.writeText(draft);
    }
    setSubmitted(true);
  };

  if (submitted) {
    const hasEmail = Boolean(profile.email);

    return (
      <div style={panelStyles.content}>
        <div style={panelStyles.category}>COMMUNICATION STATUS</div>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>✦</div>
          <h3 style={{ color: hasEmail ? '#71FF9C' : '#00F5FF', fontSize: '16px', marginBottom: '8px' }}>
            {hasEmail ? 'OPENING YOUR EMAIL CLIENT…' : 'TRANSMISSION READY (LOCAL COMPOSER)'}
          </h3>
          <p style={{ color: '#929BB3', fontSize: '13px', lineHeight: 1.6, maxWidth: '320px', margin: '0 auto 16px' }}>
            {hasEmail
              ? `A pre-formatted message has been generated and dispatched to your system's default email client addressed to ${profile.email}.`
              : 'Direct email delivery requires an email address configured in src/data/profile.js. Your drafted message has been formatted below so you won\'t lose your text.'}
          </p>

          {!hasEmail && (
            <div style={contactStyles.draftBox}>
              <div style={contactStyles.draftHeader}>Drafted Message:</div>
              <div style={contactStyles.draftContent}>
                <strong>From:</strong> {form.name} ({form.email})<br />
                <strong>Subject:</strong> {form.subject || 'No Subject'}<br /><br />
                {form.message}
              </div>
              <button
                type="button"
                onClick={() => {
                  const draft = `From: ${form.name} <${form.email}>\nSubject: ${form.subject}\n\n${form.message}`;
                  navigator.clipboard?.writeText(draft);
                  setCopiedDraft(true);
                  setTimeout(() => setCopiedDraft(false), 2000);
                }}
                style={contactStyles.copyDraftBtn}
              >
                {copiedDraft ? <Check size={14} color="#71FF9C" /> : <Copy size={14} />}
                {copiedDraft ? 'Draft Copied to Clipboard!' : 'Copy Draft Text'}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', email: '', subject: '', message: '' });
            }}
            style={{ ...panelStyles.link, marginTop: '20px', cursor: 'pointer', border: '1px solid rgba(0,245,255,0.3)', background: 'transparent' }}
          >
            ← Compose Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={panelStyles.content}>
      <div style={panelStyles.category}>CONTACT PORTAL</div>
      <h2 style={contactStyles.portalHeading}>READY TO BUILD SOMETHING EXTRAORDINARY?</h2>
      <p style={panelStyles.bio}>Have an idea, a project, or an opportunity? Let's connect.</p>

      {!profile.email && (
        <div style={panelStyles.notice}>
          ℹ Note: Email address is not configured yet in src/data/profile.js. Submitting will format and copy your message draft locally.
        </div>
      )}

      <form onSubmit={handleSubmit} style={panelStyles.form} noValidate>
        {[
          { key: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
          { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
          { key: 'subject', label: 'SUBJECT', type: 'text', placeholder: 'What are you working on?' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label htmlFor={`contact-${key}`} style={panelStyles.formLabel}>
              {label}
            </label>
            <input
              id={`contact-${key}`}
              type={type}
              value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              style={{
                ...panelStyles.input,
                borderColor: errors[key] ? '#FF35D3' : 'rgba(0,245,255,0.2)',
              }}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
            />
            {errors[key] && <div id={`${key}-error`} style={panelStyles.fieldError}>{errors[key]}</div>}
          </div>
        ))}

        <div>
          <label htmlFor="contact-message" style={panelStyles.formLabel}>
            MESSAGE
          </label>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Tell me about your project, idea, or role..."
            rows={4}
            style={{
              ...panelStyles.input,
              resize: 'vertical',
              borderColor: errors.message ? '#FF35D3' : 'rgba(0,245,255,0.2)',
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <div id="message-error" style={panelStyles.fieldError}>{errors.message}</div>}
        </div>

        <button type="submit" style={panelStyles.submitBtn}>
          <Send size={14} style={{ marginRight: '6px' }} />
          TRANSMIT MESSAGE ›
        </button>
      </form>

      <div style={{ ...panelStyles.divider, marginTop: '16px' }} />
      <div style={panelStyles.linksRow}>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          style={panelStyles.link}
        >
          <Github size={14} /> GitHub
        </a>
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={panelStyles.link}
          >
            <ExternalLink size={14} /> LinkedIn
          </a>
        )}
        {profile.email && (
          <button
            type="button"
            onClick={handleCopyEmail}
            style={{
              ...panelStyles.link,
              cursor: 'pointer',
              background: 'transparent',
              borderColor: copiedEmail ? '#71FF9C' : 'rgba(0,245,255,0.3)',
              color: copiedEmail ? '#71FF9C' : '#00F5FF',
            }}
            title="Copy email address"
            aria-label="Copy email address"
          >
            {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
            {copiedEmail ? 'Copied!' : profile.email}
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN HUD PANEL WRAPPER
// ============================================================
export default function HUDPanel({ activeDestination, onClose, onNavigate }) {
  const [activeGroup, setActiveGroup] = useState('frontend');

  const dest = activeDestination;
  if (!dest) return null;

  const titles = {
    about: 'CORE — About Me',
    tripnexus: 'TRIPNEXUS WORLD',
    enterskill: 'ENTERSKILL HUB',
    skills: 'SKILL CONSTELLATION',
    experience: 'EXPERIENCE NEBULA',
    contact: 'CONTACT PORTAL',
  };

  const colors = {
    about: '#00F5FF',
    tripnexus: '#00F5FF',
    enterskill: '#71FF9C',
    skills: '#8B5CFF',
    experience: '#FFB347',
    contact: '#00F5FF',
  };

  const accentColor = colors[dest] || '#00F5FF';

  return (
    <div
      style={styles.overlay}
      role="dialog"
      aria-label={titles[dest] || dest}
      aria-modal="true"
    >
      <div style={{ ...styles.panel, borderColor: `${accentColor}35` }}>
        {/* Futuristic Corner Tech Accents */}
        <div style={{ ...cornerStyle, top: 0, left: 0, borderWidth: '2px 0 0 2px', borderColor: accentColor }} />
        <div style={{ ...cornerStyle, top: 0, right: 0, borderWidth: '2px 2px 0 0', borderColor: accentColor }} />
        <div style={{ ...cornerStyle, bottom: 0, left: 0, borderWidth: '0 0 2px 2px', borderColor: accentColor }} />
        <div style={{ ...cornerStyle, bottom: 0, right: 0, borderWidth: '0 2px 2px 0', borderColor: accentColor }} />

        {/* Header */}
        <div style={{ ...styles.header, borderBottomColor: `${accentColor}20` }}>
          <div>
            <div style={{ ...styles.destLabel, color: accentColor }}>
              ◆ {titles[dest] || dest.toUpperCase()}
            </div>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Panel Content */}
        <div style={styles.scrollArea}>
          {dest === 'about' && <AboutPanel onNavigate={onNavigate} />}
          {(dest === 'tripnexus' || dest === 'enterskill') && (
            <ProjectPanel project={projects.find(p => p.id === dest)} />
          )}
          {dest === 'skills' && (
            <SkillsPanel activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
          )}
          {dest === 'experience' && <ExperiencePanel />}
          {dest === 'contact' && <ContactPanel />}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const cornerStyle = {
  position: 'absolute',
  width: '14px',
  height: '14px',
  borderStyle: 'solid',
  pointerEvents: 'none',
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '460px',
    zIndex: 5000,
    display: 'flex',
    alignItems: 'stretch',
    animation: 'fadeInScale 0.3s ease forwards',
    pointerEvents: 'all',
  },
  panel: {
    flex: 1,
    background: 'rgba(9,13,25,0.95)',
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderRadius: '16px 0 0 16px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 24px',
    borderBottom: '1px solid',
    flexShrink: 0,
  },
  destLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  closeBtn: {
    background: 'transparent',
    border: '1px solid rgba(146,155,179,0.2)',
    borderRadius: '6px',
    color: '#929BB3',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '0',
  },
};

const panelStyles = {
  content: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  category: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: 'rgba(146,155,179,0.7)',
    textTransform: 'uppercase',
    marginBottom: '-4px',
  },
  projectHeading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '22px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'rgba(146,155,179,0.7)',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  value: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    color: '#F4F7FF',
    fontWeight: 500,
  },
  bio: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13.5px',
    color: '#929BB3',
    lineHeight: 1.65,
  },
  divider: {
    height: '1px',
    background: 'rgba(0,245,255,0.08)',
    margin: '4px 0',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 10px',
    border: '1px solid rgba(0,245,255,0.3)',
    borderRadius: '20px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#00F5FF',
    background: 'rgba(0,245,255,0.04)',
  },
  featureList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    margin: 0,
    padding: 0,
  },
  featureItem: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    color: '#F4F7FF',
    display: 'flex',
    alignItems: 'flex-start',
    lineHeight: 1.5,
  },
  linksRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  linkBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#00F5FF',
    border: '1px solid rgba(0,245,255,0.3)',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  disabledBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#929BB3',
    border: '1px solid rgba(146,155,179,0.2)',
    opacity: 0.6,
  },
  groupTabs: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  groupTab: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    padding: '6px 12px',
    border: '1px solid',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  expCard: {
    display: 'flex',
    gap: '12px',
    padding: '12px 14px',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '8px',
    border: '1px solid rgba(0,245,255,0.1)',
  },
  expDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginTop: '6px',
    flexShrink: 0,
  },
  expTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
  },
  expOrg: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#929BB3',
    margin: '2px 0',
  },
  expDate: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.7)',
  },
  expDesc: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#929BB3',
    marginTop: '6px',
    lineHeight: 1.5,
  },
  placeholder: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.5)',
    fontStyle: 'italic',
  },
  certCard: {
    display: 'flex',
    gap: '12px',
    padding: '12px 14px',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '8px',
    border: '1px solid rgba(139,92,255,0.15)',
  },
  certDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginTop: '6px',
    flexShrink: 0,
  },
  notice: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#8B5CFF',
    padding: '8px 12px',
    background: 'rgba(139,92,255,0.08)',
    border: '1px solid rgba(139,92,255,0.2)',
    borderRadius: '6px',
    lineHeight: 1.4,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formLabel: {
    display: 'block',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'rgba(146,155,179,0.8)',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    background: 'rgba(5,6,11,0.6)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '6px',
    color: '#F4F7FF',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  fieldError: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#FF35D3',
    marginTop: '2px',
  },
  submitBtn: {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #00F5FF, #8B5CFF)',
    border: 'none',
    borderRadius: '6px',
    color: '#05060B',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s',
  },
};

const aboutStyles = {
  headerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 16px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(0,245,255,0.15)',
    borderRadius: '10px',
  },
  avatarContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #00F5FF',
  },
  cyberAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '20px',
    fontWeight: 700,
    color: '#F4F7FF',
    margin: '2px 0',
  },
  titleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#00F5FF',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#71FF9C',
    boxShadow: '0 0 8px #71FF9C',
  },
  constellationCard: {
    padding: '12px 14px',
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(0,245,255,0.15)',
    borderRadius: '8px',
  },
  constellationTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'rgba(0,245,255,0.7)',
    marginBottom: '8px',
  },
  focusGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
  focusCard: {
    padding: '12px',
    background: 'rgba(0,0,0,0.2)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
  },
  focusHeader: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    marginBottom: '6px',
  },
  featuredRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  featuredBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px 12px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
    textAlign: 'left',
    transition: 'all 0.2s ease',
  },
  featuredSub: {
    fontSize: '10px',
    color: '#929BB3',
    fontWeight: 400,
    marginTop: '2px',
  },
};

const archStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    background: 'rgba(0,0,0,0.35)',
    borderRadius: '10px',
    border: '1px solid rgba(0,245,255,0.15)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  title: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'rgba(0,245,255,0.8)',
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    padding: '2px 6px',
    background: 'rgba(0,245,255,0.1)',
    borderRadius: '3px',
    color: '#00F5FF',
  },
  flowList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  nodeBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
  },
  nodeTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
  },
  nodeSub: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '10px',
    color: '#929BB3',
    marginTop: '1px',
  },
  flowConnector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '14px',
  },
  flowLine: {
    display: 'none',
  },
  flowArrow: {
    color: 'rgba(0,245,255,0.4)',
    fontSize: '12px',
    lineHeight: 1,
  },
  detailCard: {
    marginTop: '8px',
    padding: '12px',
    background: 'rgba(5,6,11,0.6)',
    borderRadius: '6px',
    border: '1px solid',
  },
  detailText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#F4F7FF',
    lineHeight: 1.5,
  },
};

const simStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    background: 'rgba(0,0,0,0.35)',
    borderRadius: '10px',
    border: '1px solid rgba(0,245,255,0.15)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: '#00F5FF',
    fontWeight: 700,
  },
  demoBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    padding: '2px 6px',
    background: 'rgba(255,53,211,0.15)',
    border: '1px solid rgba(255,53,211,0.3)',
    borderRadius: '3px',
    color: '#FF35D3',
  },
  controlGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: 'rgba(146,155,179,0.8)',
    marginBottom: '4px',
  },
  select: {
    width: '100%',
    padding: '8px 10px',
    background: 'rgba(5,6,11,0.8)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '6px',
    color: '#F4F7FF',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    outline: 'none',
  },
  pillRow: {
    display: 'flex',
    gap: '6px',
  },
  pillBtn: {
    flex: 1,
    padding: '6px 8px',
    border: '1px solid',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    transition: 'all 0.2s',
  },
  generateBtn: {
    padding: '10px',
    background: 'linear-gradient(135deg, #00F5FF, #8B5CFF)',
    border: 'none',
    borderRadius: '6px',
    color: '#05060B',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  resultCard: {
    padding: '14px',
    background: 'rgba(5,6,11,0.8)',
    border: '1px solid rgba(0,245,255,0.25)',
    borderRadius: '8px',
  },
  disclaimer: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9.5px',
    color: '#FF35D3',
    letterSpacing: '0.05em',
    marginBottom: '6px',
    fontWeight: 700,
  },
  resultTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '15px',
    fontWeight: 700,
    color: '#00F5FF',
  },
  resultSub: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#929BB3',
    marginBottom: '8px',
  },
  budgetBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    padding: '6px 10px',
    background: 'rgba(113,255,156,0.08)',
    border: '1px solid rgba(113,255,156,0.2)',
    borderRadius: '4px',
    color: '#F4F7FF',
    marginBottom: '10px',
  },
  itineraryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dayCard: {
    padding: '8px 10px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '6px',
    borderLeft: '2px solid #00F5FF',
  },
  dayHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '2px',
  },
  dayTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#00F5FF',
    fontWeight: 700,
  },
  dayTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#F4F7FF',
  },
  dayDesc: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11.5px',
    color: '#929BB3',
    lineHeight: 1.4,
    margin: 0,
  },
  engineNotice: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9.5px',
    color: 'rgba(146,155,179,0.6)',
    marginTop: '10px',
    fontStyle: 'italic',
  },
};

const skillsStyles = {
  constellationBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '14px',
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(139,92,255,0.2)',
    borderRadius: '10px',
  },
  clusterLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.1em',
    color: '#929BB3',
  },
  starField: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  starBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    border: '1px solid',
    borderRadius: '20px',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    transition: 'all 0.2s ease',
  },
  skillDetail: {
    padding: '12px',
    background: 'rgba(5,6,11,0.6)',
    border: '1px solid',
    borderRadius: '6px',
    animation: 'fadeIn 0.2s ease',
  },
  selectPrompt: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146,155,179,0.5)',
    fontStyle: 'italic',
    padding: '4px 0',
  },
  accessibleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: '6px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    gap: '8px',
  },
};

const contactStyles = {
  portalHeading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: 700,
    color: '#F4F7FF',
    lineHeight: 1.3,
  },
  draftBox: {
    textAlign: 'left',
    padding: '12px',
    background: 'rgba(5,6,11,0.8)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '6px',
    margin: '12px 0',
  },
  draftHeader: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#00F5FF',
    marginBottom: '6px',
    letterSpacing: '0.1em',
  },
  draftContent: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#F4F7FF',
    lineHeight: 1.5,
  },
  copyDraftBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '10px',
    padding: '6px 12px',
    background: 'rgba(0,245,255,0.1)',
    border: '1px solid rgba(0,245,255,0.3)',
    borderRadius: '4px',
    color: '#00F5FF',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    cursor: 'pointer',
  },
};
