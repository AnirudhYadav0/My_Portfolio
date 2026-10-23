import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Github,
  Compass,
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
  User,
  GraduationCap,
  Heart,
  Code,
  Briefcase,
  Award,
  Clock,
  Mail,
  Linkedin,
  FileDown,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { skillGroups } from '../data/skills';
import { experience, certifications } from '../data/experience';
import { playCyberClick } from '../utils/audioSynth';

// ============================================================
// PROCEDURAL CANVAS SPHERICAL VISUALIZER
// Generates stunning rotating cyber planet in center column
// ============================================================
function PlanetVisualizer({ type, color = '#00F5FF', accentColor = '#FF35D3', subtitle }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let angle = 0;

    const render = () => {
      angle += 0.012;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.36;

      ctx.clearRect(0, 0, w, h);

      // Deep space atmospheric glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r * 1.55);
      glow.addColorStop(0, `${color}28`);
      glow.addColorStop(0.6, `${accentColor}12`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // Outer orbit ring
      ctx.strokeStyle = `${color}40`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 1.45, r * 0.55, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting micro satellite dot
      const satX = cx + Math.cos(angle * 1.5) * r * 1.45;
      const satY = cy + Math.sin(angle * 1.5) * r * 0.55;
      ctx.fillStyle = '#F4F7FF';
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Planet Sphere base
      const sphereGrad = ctx.createRadialGradient(
        cx - r * 0.35,
        cy - r * 0.35,
        r * 0.1,
        cx,
        cy,
        r
      );
      sphereGrad.addColorStop(0, '#F4F7FF');
      sphereGrad.addColorStop(0.2, color);
      sphereGrad.addColorStop(0.7, '#07152b');
      sphereGrad.addColorStop(1, '#02060e');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Cyber surface grid/city traces
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = `${color}55`;
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        const offset = Math.sin(angle + i * 0.8) * r * 0.8;
        ctx.beginPath();
        ctx.ellipse(cx + offset, cy, r * 0.35, r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Neon city light specs
      for (let i = 0; i < 40; i++) {
        const px = cx + Math.sin(i * 3.7 + angle) * r * 0.8;
        const py = cy + Math.cos(i * 2.3 + angle * 0.5) * r * 0.8;
        ctx.fillStyle = i % 3 === 0 ? '#FF35D3' : '#00F5FF';
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Atmospheric rim highlight
      ctx.strokeStyle = `${color}99`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [type, color, accentColor]);

  return (
    <div style={visStyles.container}>
      <canvas ref={canvasRef} width={340} height={340} style={visStyles.canvas} />
      {subtitle && <div style={visStyles.caption}>{subtitle}</div>}
    </div>
  );
}

// ============================================================
// ENTERSKILL HUB ARCHITECTURE VISUALIZATION (WITH JWT AUTH)
// ============================================================
function EnterSkillArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState('auth');

  const layers = [
    {
      id: 'client',
      label: 'React + Vite Frontend',
      sub: 'Single Page UI & State',
      icon: <Layers size={13} />,
      color: '#00F5FF',
      role: 'Client presentation layer built with modular React components, responsive CSS, Axios client, and auth state management.',
      details: 'Dispatches authenticated requests with Bearer tokens to protected backend endpoints.',
    },
    {
      id: 'auth',
      label: 'JWT Authentication Flow',
      sub: 'Bearer Token Authorization Header',
      icon: <CheckCircle2 size={13} />,
      color: '#FF35D3',
      role: 'Stateless session authorization. Upon login, Node.js server generates cryptographically signed JWTs.',
      details: 'Axios attaches "Authorization: Bearer <token>" to requests. Middleware decodes and verifies token signature before controllers run.',
    },
    {
      id: 'api',
      label: 'Node.js + Express API',
      sub: 'RESTful Controllers & Middleware',
      icon: <Cpu size={13} />,
      color: '#8B5CFF',
      role: 'Backend runtime handling routing, payload validation, token verification middleware, and CRUD operations.',
      details: 'Modular routes partition authentication, skill catalogs, business ideas, and task management.',
    },
    {
      id: 'db',
      label: 'MongoDB Atlas',
      sub: 'Cloud Document Database & Mongoose',
      icon: <Database size={13} />,
      color: '#71FF9C',
      role: 'Cloud-hosted NoSQL document store with strict Mongoose schemas.',
      details: 'Stores encrypted passwords (bcrypt), user profiles, categorized skill lists, and task documents.',
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
                onClick={() => {
                  playCyberClick();
                  setSelectedLayer(layer.id);
                }}
                style={{
                  ...archStyles.nodeBtn,
                  borderColor: isSelected ? layer.color : 'rgba(0,245,255,0.15)',
                  background: isSelected ? `${layer.color}18` : 'rgba(9,13,25,0.6)',
                  boxShadow: isSelected ? `0 0 15px ${layer.color}35` : 'none',
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
// TRIPNEXUS INTERACTIVE PLANNER SIMULATOR
// ============================================================
function TripNexusSimulator({ destination, setDestination, duration, setDuration, budget, setBudget, style, setStyle }) {
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
        { day: 'Day 4', title: 'Nara Ancient Deer Park & Todai-ji', desc: 'Day excursion to Nara park, bow with sacred free-roaming sika deer, marvel at the 15m bronze Daibutsu.' },
        { day: 'Day 5', title: 'Philosopher’s Path & Silver Pavilion', desc: 'Meditative canal stroll lined with cherry trees to Ginkaku-ji zen rock gardens and Nanzen-ji aqueduct.' },
        { day: 'Day 6', title: 'Uji Green Tea Terraces & Byodoin', desc: 'Travel to historic cradle of Uji matcha, private tea plantation tasting, and Phoenix Hall reflection.' },
        { day: 'Day 7', title: 'Osaka Castle & Dotonbori Street Flavors', desc: 'High-speed transit to Osaka, castle park panorama, concluding with vibrant neon culinary tour.' },
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
        { day: 'Day 4', title: 'Jokulsarlon Glacial Lagoon & Diamond Beach', desc: 'Watch crystal icebergs drift out to the Atlantic surf, walk glittering black sands at dawn.' },
        { day: 'Day 5', title: 'Vatnajokull Crystal Ice Cave Exploration', desc: 'Glacier super-jeep expedition into translucent sapphire caves sculpted beneath Europe’s largest ice cap.' },
        { day: 'Day 6', title: 'Snaefellsnes Peninsula & Kirkjufell', desc: 'Iconic arrowhead peak of Kirkjufell, basalt sea stacks at Arnarstapi, and volcanic coastal fissures.' },
        { day: 'Day 7', title: 'Reykjanes Geothermal Mud Pools & Return', desc: 'Steam vents at Gunnuhver, bridge between European and North American tectonic continents, departure.' },
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
        { day: 'Day 4', title: 'Grindelwald First Cliff Walk by Tissot', desc: 'Suspension bridge path along dizzying rock face, mountain cart descent through alpine meadows.' },
        { day: 'Day 5', title: 'Zermatt & Legendary Matterhorn', desc: 'Panoramic mountain express to car-free Zermatt village with unobstructed views of the Matterhorn.' },
        { day: 'Day 6', title: 'Gornergrat Cogwheel Mountain Ascent', desc: 'Ride Switzerland’s first electric cogwheel railway to 3,089m overlooking Monte Rosa glacier massifs.' },
        { day: 'Day 7', title: 'Lucerne Chapel Bridge & Zurich Return', desc: 'Historic wooden bridge, lion monument, scenic lake cruise, and Swiss rail transfer to Zurich airport.' },
      ],
    },
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setItinerary(sampleDestinations[destination]);
      setIsGenerating(false);
    }, 400);
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
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        style={simStyles.generateBtn}
      >
        {isGenerating ? 'GENERATING SIMULATED ITINERARY…' : '⚡ GENERATE DEMO ITINERARY'}
      </button>

      {itinerary && (
        <div style={simStyles.resultCard}>
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
        </div>
      )}
    </div>
  );
}

// ============================================================
// INTERACTIVE CONSTELLATION CANVAS GRAPH (SKILLS)
// ============================================================
function ConstellationGraph({ activeGroup, setActiveGroup, activeSkill, setActiveSkill }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const nodes = [
      { id: 'frontend', label: 'Frontend', x: 80, y: 70, color: '#00F5FF' },
      { id: 'backend', label: 'Backend', x: 250, y: 60, color: '#8B5CFF' },
      { id: 'database', label: 'Database', x: 260, y: 220, color: '#FF35D3' },
      { id: 'tools', label: 'Tools', x: 90, y: 230, color: '#71FF9C' },
    ];

    const render = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Connecting energy fibers
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const isActive = activeGroup === n1.id || activeGroup === n2.id;
          ctx.strokeStyle = isActive ? 'rgba(0, 245, 255, 0.45)' : 'rgba(146, 155, 179, 0.15)';
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Pulsing pulse particle along active connection
          if (isActive) {
            const pulse = (Math.sin(t * 2 + i + j) + 1) / 2;
            const px = n1.x + (n2.x - n1.x) * pulse;
            const py = n1.y + (n2.y - n1.y) * pulse;
            ctx.fillStyle = '#F4F7FF';
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const isSelected = activeGroup === n.id;
        const radius = isSelected ? 24 : 18;

        // Outer glow
        const glow = ctx.createRadialGradient(n.x, n.y, 4, n.x, n.y, radius * 2);
        glow.addColorStop(0, `${n.color}88`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = '#090D19';
        ctx.strokeStyle = n.color;
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Center dot
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = isSelected ? '#F4F7FF' : '#929BB3';
        ctx.font = '10px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + radius + 14);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeGroup]);

  return (
    <div style={constStyles.container}>
      <canvas
        ref={canvasRef}
        width={340}
        height={300}
        style={constStyles.canvas}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          if (clickX < 170 && clickY < 150) setActiveGroup('frontend');
          else if (clickX >= 170 && clickY < 150) setActiveGroup('backend');
          else if (clickX >= 170 && clickY >= 150) setActiveGroup('database');
          else setActiveGroup('tools');
          setActiveSkill(null);
        }}
      />
      <div style={constStyles.hint}>Click any cluster star to explore technical proficiencies</div>
    </div>
  );
}

// ============================================================
// MAIN HUD PANEL
// Replicates the 6 concept reference panels
// ============================================================
export default function HUDPanel({ activeDestination, onClose, onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [tripDest, setTripDest] = useState('kyoto');
  const [tripDur, setTripDur] = useState('5');
  const [tripBudget, setTripBudget] = useState('moderate');
  const [tripStyle, setTripStyle] = useState('culture');

  const [activeSkillGroup, setActiveSkillGroup] = useState('frontend');
  const [activeSkill, setActiveSkill] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const dest = activeDestination;
  if (!dest) return null;

  const destMeta = {
    about: {
      title: 'ABOUT ME',
      subtitle: 'The Core Planet',
      color: '#00F5FF',
      tabs: [
        { id: 'overview', label: 'Who I Am', icon: <User size={14} /> },
        { id: 'journey', label: 'My Journey', icon: <GraduationCap size={14} /> },
        { id: 'interests', label: 'Interests', icon: <Heart size={14} /> },
        { id: 'tech', label: 'Tech Stack', icon: <Code size={14} /> },
      ],
    },
    tripnexus: {
      title: 'TRIPNEXUS',
      subtitle: 'AI-POWERED TRAVEL PLANNING',
      color: '#00F5FF',
      tabs: [
        { id: 'overview', label: 'Overview', icon: <Compass size={14} /> },
        { id: 'features', label: 'Features', icon: <CheckCircle2 size={14} /> },
        { id: 'tech', label: 'Tech Stack', icon: <Code size={14} /> },
        { id: 'preview', label: 'Live Preview', icon: <Sparkles size={14} /> },
      ],
    },
    enterskill: {
      title: 'ENTERSKILL HUB',
      subtitle: 'FULL-STACK WEB APPLICATION',
      color: '#71FF9C',
      tabs: [
        { id: 'overview', label: 'Overview', icon: <Layers size={14} /> },
        { id: 'features', label: 'Features', icon: <CheckCircle2 size={14} /> },
        { id: 'tech', label: 'Tech Stack', icon: <Code size={14} /> },
        { id: 'architecture', label: 'Architecture', icon: <Cpu size={14} /> },
      ],
    },
    skills: {
      title: 'SKILL CONSTELLATION',
      subtitle: 'Technologies That Power My Universe',
      color: '#FF35D3',
      tabs: [
        { id: 'frontend', label: 'Frontend', icon: <Code size={14} /> },
        { id: 'backend', label: 'Backend', icon: <Cpu size={14} /> },
        { id: 'database', label: 'Database', icon: <Database size={14} /> },
        { id: 'tools', label: 'Tools', icon: <Layers size={14} /> },
      ],
    },
    experience: {
      title: 'EXPERIENCE NEBULA',
      subtitle: 'Growth, Learning and Achievements',
      color: '#FFB347',
      tabs: [
        { id: 'timeline', label: 'Timeline', icon: <Clock size={14} /> },
        { id: 'internships', label: 'Internships', icon: <Briefcase size={14} /> },
        { id: 'certifications', label: 'Certifications', icon: <Award size={14} /> },
      ],
    },
    contact: {
      title: 'CONTACT PORTAL',
      subtitle: 'Ready to Build Something Extraordinary?',
      color: '#00F5FF',
      tabs: [
        { id: 'send', label: 'Send Message', icon: <Mail size={14} /> },
        { id: 'connect', label: 'Connect', icon: <Linkedin size={14} /> },
        { id: 'quick', label: 'Quick Actions', icon: <Copy size={14} /> },
      ],
    },
  };

  const currentMeta = destMeta[dest] || destMeta.about;
  const projectData = projects.find(p => p.id === dest);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!contactForm.name.trim()) errs.name = 'Please provide your name';
    if (!contactForm.email.trim()) errs.email = 'Please provide your email address';
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errs.email = 'Please enter a valid email address';
    if (!contactForm.message.trim()) errs.message = 'Please enter a message';

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }

    const emailTo = profile.email || 'yadavanirudh1826@gmail.com';
    const subject = encodeURIComponent(contactForm.subject || 'Neonverse Inquiry');
    const body = encodeURIComponent(`Hi Anirudh,\n\n${contactForm.message}\n\nFrom: ${contactForm.name} (${contactForm.email})`);
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setContactSubmitted(true);
  };

  return (
    <div style={panelLayout.overlay} role="dialog" aria-label={currentMeta.title} aria-modal="true">
      <div style={{ ...panelLayout.modal, borderColor: `${currentMeta.color}45` }}>
        {/* Tech Corner Accents */}
        <div style={{ ...cornerAccent, top: 0, left: 0, borderWidth: '2px 0 0 2px', borderColor: currentMeta.color }} />
        <div style={{ ...cornerAccent, top: 0, right: 0, borderWidth: '2px 2px 0 0', borderColor: currentMeta.color }} />
        <div style={{ ...cornerAccent, bottom: 0, left: 0, borderWidth: '0 0 2px 2px', borderColor: currentMeta.color }} />
        <div style={{ ...cornerAccent, bottom: 0, right: 0, borderWidth: '0 2px 2px 0', borderColor: currentMeta.color }} />

        {/* Top Header Bar */}
        <div style={panelLayout.topHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => {
                playCyberClick();
                onClose();
              }}
              style={panelLayout.backBtn}
              aria-label="Back to Universe"
            >
              <ArrowLeft size={14} /> BACK TO UNIVERSE
            </button>
            <div style={panelLayout.headerTitles}>
              <h2 style={{ ...panelLayout.mainTitle, color: currentMeta.color }}>{currentMeta.title}</h2>
              <span style={panelLayout.subTitle}>{currentMeta.subtitle}</span>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberClick();
              onClose();
            }}
            style={panelLayout.closeBtn}
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* 3-Column Cockpit Workspace */}
        <div style={panelLayout.bodyGrid}>
          {/* Column 1: Sub-Navigation Sidebar */}
          <aside style={panelLayout.sidebarCol} aria-label="Section navigation">
            {currentMeta.tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  playCyberClick();
                  setActiveTab(tab.id);
                  if (dest === 'skills') {
                    setActiveSkillGroup(tab.id);
                    setActiveSkill(null);
                  }
                }}
                style={{
                  ...panelLayout.sidebarTab,
                  background: (dest === 'skills' ? activeSkillGroup === tab.id : activeTab === tab.id)
                    ? 'rgba(0, 245, 255, 0.12)'
                    : 'transparent',
                  color: (dest === 'skills' ? activeSkillGroup === tab.id : activeTab === tab.id)
                    ? currentMeta.color
                    : '#929BB3',
                  borderColor: (dest === 'skills' ? activeSkillGroup === tab.id : activeTab === tab.id)
                    ? currentMeta.color
                    : 'transparent',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* Column 2: Center Interactive Visual Showcase */}
          <div style={panelLayout.centerCol}>
            {dest === 'about' && (
              <PlanetVisualizer
                type="core"
                color="#00F5FF"
                accentColor="#FF35D3"
                subtitle="ORIGIN // Core Planet AY-00"
              />
            )}

            {dest === 'tripnexus' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%' }}>
                <PlanetVisualizer
                  type="travel"
                  color="#00F5FF"
                  accentColor="#8B5CFF"
                  subtitle="VOYAGE // Planetary Travel Highway"
                />
                {/* 3 Preset destination switcher buttons from concept image */}
                <div style={tripStyles.thumbRow}>
                  {[
                    { id: 'kyoto', label: 'Explore Mountains' },
                    { id: 'alps', label: 'City Adventures' },
                    { id: 'reykjavik', label: 'Beach Escapes' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        playCyberClick();
                        setTripDest(item.id);
                      }}
                      style={{
                        ...tripStyles.thumbBtn,
                        borderColor: tripDest === item.id ? '#00F5FF' : 'rgba(0,245,255,0.2)',
                        color: tripDest === item.id ? '#00F5FF' : '#929BB3',
                        background: tripDest === item.id ? 'rgba(0,245,255,0.1)' : 'transparent',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {dest === 'enterskill' && (
              <PlanetVisualizer
                type="saas"
                color="#71FF9C"
                accentColor="#00F5FF"
                subtitle="MATRIX // Cloud Hub Cluster"
              />
            )}

            {dest === 'skills' && (
              <ConstellationGraph
                activeGroup={activeSkillGroup}
                setActiveGroup={setActiveSkillGroup}
                activeSkill={activeSkill}
                setActiveSkill={setActiveSkill}
              />
            )}

            {dest === 'experience' && (
              <PlanetVisualizer
                type="nebula"
                color="#FFB347"
                accentColor="#FF35D3"
                subtitle="TIMELINE // Cosmic Experience Cloud"
              />
            )}

            {dest === 'contact' && (
              <PlanetVisualizer
                type="portal"
                color="#00F5FF"
                accentColor="#71FF9C"
                subtitle="GATEWAY // Dimensional Communication Warp"
              />
            )}
          </div>

          {/* Column 3: Rich Information & Interactive Panel */}
          <main style={panelLayout.contentCol}>
            {/* ---- ABOUT ME CONTENT ---- */}
            {dest === 'about' && (
              <div style={cardStyles.container}>
                <div>
                  <h3 style={cardStyles.heroTitle}>{profile.name}</h3>
                  <div style={cardStyles.heroRole}>{profile.title}</div>
                </div>

                <p style={cardStyles.bio}>{profile.about}</p>

                {/* 2 Key Stat Cards */}
                <div style={cardStyles.grid2}>
                  <div style={cardStyles.statBox}>
                    <div style={cardStyles.statLabel}>ACADEMIC DEGREE</div>
                    <div style={cardStyles.statVal}>{profile.education.degree}</div>
                    <div style={cardStyles.statSub}>{profile.education.institution} • {profile.education.status}</div>
                  </div>

                  <div style={cardStyles.statBox}>
                    <div style={{ ...cardStyles.statLabel, color: '#FF35D3' }}>CORE FOCUS</div>
                    <div style={cardStyles.statVal}>Full-Stack Web Development</div>
                    <div style={cardStyles.statSub}>React.js • Node.js • Express • MongoDB</div>
                  </div>
                </div>

                {/* Interests Chips */}
                <div>
                  <div style={cardStyles.sectionHeader}>MY INTERESTS</div>
                  <div style={cardStyles.chipRow}>
                    {profile.interests.map(item => (
                      <span key={item} style={cardStyles.chip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={cardStyles.actionsRow}>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...cardStyles.btnPrimary, background: '#00F5FF', color: '#05060B' }}
                  >
                    <Github size={15} /> View GitHub
                  </a>
                  <a
                    href={profile.resume || '/resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Anirudh_Yadav_Resume.pdf"
                    style={cardStyles.btnSecondary}
                  >
                    <FileDown size={15} /> Download Resume
                  </a>
                </div>
              </div>
            )}

            {/* ---- TRIPNEXUS CONTENT ---- */}
            {dest === 'tripnexus' && (
              <div style={cardStyles.container}>
                <p style={cardStyles.bio}>{projectData?.description}</p>

                {/* Checklist with green checkmarks */}
                <div>
                  <div style={cardStyles.sectionHeader}>KEY FEATURES</div>
                  <div style={cardStyles.checklist}>
                    {projectData?.features.map((feat, i) => (
                      <div key={i} style={cardStyles.checkItem}>
                        <Check size={14} color="#71FF9C" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div style={cardStyles.actionsRow}>
                  <span style={cardStyles.btnDisabled} title="Deployment in progress">
                    Live Demo (In Staging)
                  </span>
                  <a
                    href={projectData?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={cardStyles.btnSecondary}
                  >
                    <Github size={15} /> GitHub Repository ↗
                  </a>
                </div>

                {/* Interactive Simulator */}
                <TripNexusSimulator
                  destination={tripDest}
                  setDestination={setTripDest}
                  duration={tripDur}
                  setDuration={setTripDur}
                  budget={tripBudget}
                  setBudget={setTripBudget}
                  style={tripStyle}
                  setStyle={setTripStyle}
                />
              </div>
            )}

            {/* ---- ENTERSKILL HUB CONTENT ---- */}
            {dest === 'enterskill' && (
              <div style={cardStyles.container}>
                <p style={cardStyles.bio}>{projectData?.description}</p>

                {/* Checklist */}
                <div>
                  <div style={cardStyles.sectionHeader}>KEY FEATURES</div>
                  <div style={cardStyles.checklist}>
                    {projectData?.features.map((feat, i) => (
                      <div key={i} style={cardStyles.checkItem}>
                        <Check size={14} color="#71FF9C" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Actions */}
                <div style={cardStyles.actionsRow}>
                  <a
                    href={projectData?.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ ...cardStyles.btnPrimary, background: '#71FF9C', color: '#05060B' }}
                  >
                    <ExternalLink size={15} /> Live Demo ↗
                  </a>
                  <a
                    href={projectData?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={cardStyles.btnSecondary}
                  >
                    <Github size={15} /> GitHub Repository ↗
                  </a>
                </div>

                {/* Interactive Full-Stack Architecture flow */}
                <EnterSkillArchitecture />
              </div>
            )}

            {/* ---- SKILL CONSTELLATION CONTENT ---- */}
            {dest === 'skills' && (
              <div style={cardStyles.container}>
                <div>
                  <div style={cardStyles.sectionHeader}>
                    CLUSTER: {activeSkillGroup.toUpperCase()}
                  </div>
                  <div style={cardStyles.chipRow}>
                    {skillGroups.find(g => g.id === activeSkillGroup)?.skills.map(s => {
                      const isSel = activeSkill?.name === s.name;
                      return (
                        <button
                          key={s.name}
                          type="button"
                          onClick={() => {
                            playCyberClick();
                            setActiveSkill(s);
                          }}
                          style={{
                            ...cardStyles.skillChipBtn,
                            borderColor: isSel ? '#00F5FF' : 'rgba(0, 245, 255, 0.25)',
                            background: isSel ? 'rgba(0, 245, 255, 0.18)' : 'rgba(9, 13, 25, 0.7)',
                            color: isSel ? '#00F5FF' : '#F4F7FF',
                          }}
                        >
                          ✦ {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Skill Detail Box */}
                {activeSkill ? (
                  <div style={cardStyles.skillDetailBox}>
                    <div style={{ color: '#00F5FF', fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>
                      {activeSkill.name}
                    </div>
                    <p style={{ color: '#F4F7FF', fontSize: '13px', lineHeight: 1.6 }}>
                      {activeSkill.description}
                    </p>
                  </div>
                ) : (
                  <div style={cardStyles.placeholderPrompt}>
                    Select any technology node to view implementation details and usage.
                  </div>
                )}
              </div>
            )}

            {/* ---- EXPERIENCE NEBULA CONTENT ---- */}
            {dest === 'experience' && (
              <div style={cardStyles.container}>
                <div style={cardStyles.sectionHeader}>PRACTICAL INTERNSHIPS & EXPERIENCE</div>
                {experience.map(exp => (
                  <div key={exp.id} style={{ ...cardStyles.timelineCard, borderLeftColor: exp.color }}>
                    <div style={{ color: exp.color, fontWeight: 700, fontSize: '14px' }}>{exp.title}</div>
                    <div style={cardStyles.timelineOrg}>
                      {exp.organization || 'Full-Stack Practical Training & Implementation'}
                    </div>
                    <p style={cardStyles.timelineDesc}>
                      {exp.description || 'Hands-on development of modern Single Page Applications, RESTful APIs, and database-backed dashboards utilizing React.js, Node.js, and MongoDB.'}
                    </p>
                  </div>
                ))}

                <div style={{ ...cardStyles.sectionHeader, marginTop: '16px' }}>CERTIFICATIONS & CREDENTIALS</div>
                {certifications.map(cert => (
                  <div key={cert.id} style={{ ...cardStyles.timelineCard, borderLeftColor: cert.color }}>
                    <div style={{ color: cert.color, fontWeight: 600, fontSize: '13px' }}>{cert.title}</div>
                    <div style={cardStyles.timelineOrg}>{cert.issuer || 'Verified Technical Credential'}</div>
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#00F5FF', fontSize: '12px' }}>
                        View Credential ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ---- CONTACT PORTAL CONTENT ---- */}
            {dest === 'contact' && (
              <div style={cardStyles.container}>
                {!contactSubmitted ? (
                  <form onSubmit={handleContactSubmit} style={cardStyles.contactForm} noValidate>
                    <div>
                      <label style={cardStyles.fieldLabel}>YOUR NAME</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        style={{
                          ...cardStyles.input,
                          borderColor: contactErrors.name ? '#FF35D3' : 'rgba(0, 245, 255, 0.25)',
                        }}
                      />
                      {contactErrors.name && <div style={cardStyles.errText}>{contactErrors.name}</div>}
                    </div>

                    <div>
                      <label style={cardStyles.fieldLabel}>YOUR EMAIL</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        style={{
                          ...cardStyles.input,
                          borderColor: contactErrors.email ? '#FF35D3' : 'rgba(0, 245, 255, 0.25)',
                        }}
                      />
                      {contactErrors.email && <div style={cardStyles.errText}>{contactErrors.email}</div>}
                    </div>

                    <div>
                      <label style={cardStyles.fieldLabel}>SUBJECT</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))}
                        placeholder="Opportunity / Collaboration"
                        style={cardStyles.input}
                      />
                    </div>

                    <div>
                      <label style={cardStyles.fieldLabel}>MESSAGE</label>
                      <textarea
                        rows={4}
                        value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell me about your project or role..."
                        style={{
                          ...cardStyles.input,
                          resize: 'vertical',
                          borderColor: contactErrors.message ? '#FF35D3' : 'rgba(0, 245, 255, 0.25)',
                        }}
                      />
                      {contactErrors.message && <div style={cardStyles.errText}>{contactErrors.message}</div>}
                    </div>

                    <button type="submit" style={cardStyles.submitBtn}>
                      <Send size={15} style={{ marginRight: '6px' }} /> SEND MESSAGE →
                    </button>
                  </form>
                ) : (
                  <div style={cardStyles.confirmBox}>
                    <div style={{ color: '#71FF9C', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                      TRANSMISSION DISPATCHED
                    </div>
                    <p style={{ color: '#929BB3', fontSize: '13px', lineHeight: 1.6 }}>
                      Opening default mail client to dispatch your message to <strong>{profile.email}</strong>.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(contactForm.subject || 'Neonverse Inquiry')}&body=${encodeURIComponent(contactForm.message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={cardStyles.btnPrimary}
                      >
                        <ExternalLink size={14} /> Open in Web Gmail ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(contactForm.message);
                          setCopiedDraft(true);
                          setTimeout(() => setCopiedDraft(false), 2000);
                        }}
                        style={cardStyles.btnSecondary}
                      >
                        {copiedDraft ? <Check size={14} color="#71FF9C" /> : <Copy size={14} />}
                        {copiedDraft ? 'Copied!' : 'Copy Draft Text'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick actions row */}
                <div style={cardStyles.connectRow}>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" style={cardStyles.socialLink}>
                    <Github size={14} /> GitHub
                  </a>
                  {profile.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={cardStyles.socialLink}>
                      <Linkedin size={14} /> LinkedIn
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(profile.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2000);
                    }}
                    style={cardStyles.socialLink}
                  >
                    {copiedEmail ? <Check size={14} color="#71FF9C" /> : <Mail size={14} />}
                    {copiedEmail ? 'Email Copied!' : profile.email}
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const cornerAccent = {
  position: 'absolute',
  width: '14px',
  height: '14px',
  borderStyle: 'solid',
  pointerEvents: 'none',
  zIndex: 10,
};

const panelLayout = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(5, 6, 11, 0.88)',
    backdropFilter: 'blur(20px)',
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    animation: 'fadeIn 0.25s ease',
  },
  modal: {
    position: 'relative',
    width: '100%',
    maxWidth: '1240px',
    height: '86vh',
    maxHeight: '840px',
    background: 'rgba(9, 13, 25, 0.94)',
    border: '1.5px solid',
    borderRadius: '16px',
    boxShadow: '0 0 60px rgba(0, 245, 255, 0.15), 0 0 100px rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid rgba(0, 245, 255, 0.15)',
    background: 'rgba(5, 6, 11, 0.6)',
    flexShrink: 0,
  },
  backBtn: {
    background: 'transparent',
    border: '1px solid rgba(0, 245, 255, 0.3)',
    borderRadius: '20px',
    color: '#00F5FF',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    padding: '6px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  headerTitles: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  mainTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '18px',
    fontWeight: 800,
    letterSpacing: '0.06em',
    margin: 0,
    lineHeight: 1.1,
  },
  subTitle: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'rgba(146, 155, 179, 0.7)',
    textTransform: 'uppercase',
  },
  closeBtn: {
    background: 'transparent',
    border: '1px solid rgba(146, 155, 179, 0.25)',
    borderRadius: '8px',
    color: '#929BB3',
    padding: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  bodyGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '170px 380px 1fr',
    overflow: 'hidden',
    '@media (max-width: 960px)': {
      gridTemplateColumns: '1fr',
    },
  },
  sidebarCol: {
    borderRight: '1px solid rgba(0, 245, 255, 0.1)',
    background: 'rgba(5, 6, 11, 0.4)',
    padding: '16px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sidebarTab: {
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '8px',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12.5px',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
  },
  centerCol: {
    borderRight: '1px solid rgba(0, 245, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.04) 0%, transparent 70%)',
    overflowY: 'auto',
  },
  contentCol: {
    flex: 1,
    overflowY: 'auto',
    padding: '28px',
  },
};

const visStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  canvas: {
    maxWidth: '100%',
    height: 'auto',
  },
  caption: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'rgba(0, 245, 255, 0.7)',
    textTransform: 'uppercase',
  },
};

const tripStyles = {
  thumbRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  thumbBtn: {
    background: 'transparent',
    border: '1px solid',
    borderRadius: '20px',
    padding: '6px 12px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10.5px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};

const constStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  canvas: {
    cursor: 'pointer',
    maxWidth: '100%',
  },
  hint: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: 'rgba(146, 155, 179, 0.6)',
    letterSpacing: '0.04em',
    textAlign: 'center',
  },
};

const cardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  heroTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '26px',
    fontWeight: 800,
    color: '#F4F7FF',
    margin: 0,
    lineHeight: 1.1,
  },
  heroRole: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#00F5FF',
    letterSpacing: '0.08em',
    marginTop: '4px',
    textTransform: 'uppercase',
  },
  bio: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    color: '#929BB3',
    lineHeight: 1.65,
    margin: 0,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
  },
  statBox: {
    background: 'rgba(9, 13, 25, 0.7)',
    border: '1px solid rgba(0, 245, 255, 0.18)',
    borderRadius: '10px',
    padding: '16px',
  },
  statLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: '#00F5FF',
    letterSpacing: '0.12em',
    marginBottom: '6px',
  },
  statVal: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#F4F7FF',
  },
  statSub: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: 'rgba(146, 155, 179, 0.7)',
    marginTop: '4px',
  },
  sectionHeader: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: 700,
    color: 'rgba(146, 155, 179, 0.8)',
    letterSpacing: '0.12em',
    marginBottom: '10px',
  },
  chipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  chip: {
    padding: '4px 12px',
    borderRadius: '20px',
    background: 'rgba(0, 245, 255, 0.08)',
    border: '1px solid rgba(0, 245, 255, 0.25)',
    color: '#00F5FF',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
  },
  skillChipBtn: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  skillDetailBox: {
    padding: '16px',
    borderRadius: '10px',
    background: 'rgba(9, 13, 25, 0.85)',
    border: '1px solid rgba(0, 245, 255, 0.35)',
    boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
  },
  placeholderPrompt: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: 'rgba(146, 155, 179, 0.5)',
    fontStyle: 'italic',
    padding: '16px 0',
  },
  actionsRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  btnPrimary: {
    background: '#00F5FF',
    color: '#05060B',
    borderRadius: '8px',
    padding: '10px 20px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
  },
  btnSecondary: {
    background: 'transparent',
    border: '1px solid rgba(0, 245, 255, 0.35)',
    color: '#00F5FF',
    borderRadius: '8px',
    padding: '10px 20px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  btnDisabled: {
    border: '1px solid rgba(146, 155, 179, 0.2)',
    color: '#929BB3',
    borderRadius: '8px',
    padding: '10px 18px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'default',
  },
  checklist: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    color: '#F4F7FF',
    lineHeight: 1.5,
  },
  timelineCard: {
    background: 'rgba(9, 13, 25, 0.7)',
    borderLeft: '3px solid',
    borderRadius: '0 8px 8px 0',
    padding: '14px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  timelineOrg: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146, 155, 179, 0.7)',
  },
  timelineDesc: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12.5px',
    color: '#929BB3',
    lineHeight: 1.55,
    margin: '4px 0 0',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldLabel: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: 'rgba(0, 245, 255, 0.8)',
    marginBottom: '4px',
    display: 'block',
  },
  input: {
    width: '100%',
    background: 'rgba(5, 6, 11, 0.7)',
    border: '1px solid rgba(0, 245, 255, 0.25)',
    borderRadius: '6px',
    padding: '10px 14px',
    color: '#F4F7FF',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13px',
    outline: 'none',
  },
  errText: {
    color: '#FF35D3',
    fontSize: '11px',
    fontFamily: "'JetBrains Mono', monospace",
    marginTop: '3px',
  },
  submitBtn: {
    background: '#00F5FF',
    color: '#05060B',
    border: 'none',
    borderRadius: '30px',
    padding: '12px 28px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '13.5px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
    marginTop: '6px',
  },
  confirmBox: {
    background: 'rgba(9, 13, 25, 0.8)',
    border: '1px solid rgba(113, 255, 156, 0.3)',
    borderRadius: '10px',
    padding: '24px',
    textAlign: 'center',
  },
  connectRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '12px',
    borderTop: '1px solid rgba(0, 245, 255, 0.1)',
    paddingTop: '16px',
  },
  socialLink: {
    background: 'transparent',
    border: '1px solid rgba(0, 245, 255, 0.25)',
    borderRadius: '6px',
    padding: '6px 14px',
    color: '#00F5FF',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
};

const archStyles = {
  container: {
    background: 'rgba(5, 6, 11, 0.55)',
    border: '1px solid rgba(0, 245, 255, 0.18)',
    borderRadius: '10px',
    padding: '18px',
    marginTop: '10px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  title: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.12em',
    color: '#00F5FF',
    fontWeight: 700,
  },
  tag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    padding: '2px 8px',
    background: 'rgba(0, 245, 255, 0.12)',
    color: '#00F5FF',
    borderRadius: '4px',
  },
  flowList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  nodeBtn: {
    width: '100%',
    border: '1px solid',
    borderRadius: '8px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  nodeTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
  },
  nodeSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    color: 'rgba(146, 155, 179, 0.7)',
  },
  flowConnector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '14px',
    color: '#00F5FF',
    fontSize: '10px',
  },
  detailCard: {
    marginTop: '14px',
    padding: '12px 14px',
    background: 'rgba(9, 13, 25, 0.7)',
    border: '1px solid',
    borderRadius: '8px',
  },
  detailText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#F4F7FF',
    lineHeight: 1.5,
    margin: 0,
  },
};

const simStyles = {
  container: {
    background: 'rgba(5, 6, 11, 0.55)',
    border: '1px solid rgba(0, 245, 255, 0.18)',
    borderRadius: '10px',
    padding: '18px',
    marginTop: '12px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  title: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: 700,
    color: '#00F5FF',
    letterSpacing: '0.08em',
  },
  demoBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '9px',
    color: '#8B5CFF',
    background: 'rgba(139, 92, 255, 0.12)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  controlGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.1em',
    color: 'rgba(146, 155, 179, 0.7)',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    width: '100%',
    background: 'rgba(9, 13, 25, 0.8)',
    border: '1px solid rgba(0, 245, 255, 0.25)',
    borderRadius: '6px',
    padding: '8px 12px',
    color: '#F4F7FF',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12.5px',
    outline: 'none',
  },
  pillRow: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  pillBtn: {
    border: '1px solid',
    borderRadius: '20px',
    padding: '4px 12px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  generateBtn: {
    background: 'rgba(0, 245, 255, 0.12)',
    border: '1px solid #00F5FF',
    borderRadius: '6px',
    color: '#00F5FF',
    padding: '10px',
    width: '100%',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'all 0.2s',
  },
  resultCard: {
    marginTop: '14px',
    background: 'rgba(9, 13, 25, 0.8)',
    border: '1px solid rgba(0, 245, 255, 0.25)',
    borderRadius: '8px',
    padding: '14px',
  },
  resultTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '14px',
    fontWeight: 700,
    color: '#00F5FF',
  },
  resultSub: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: 'rgba(146, 155, 179, 0.8)',
    marginTop: '2px',
  },
  budgetBadge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#929BB3',
    margin: '8px 0',
  },
  itineraryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
  },
  dayCard: {
    background: 'rgba(5, 6, 11, 0.6)',
    border: '1px solid rgba(0, 245, 255, 0.12)',
    borderRadius: '6px',
    padding: '10px',
  },
  dayHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  dayTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '10px',
    fontWeight: 700,
    color: '#00F5FF',
    background: 'rgba(0, 245, 255, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  dayTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    fontWeight: 700,
    color: '#F4F7FF',
  },
  dayDesc: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '11.5px',
    color: '#929BB3',
    lineHeight: 1.45,
    margin: 0,
  },
};
