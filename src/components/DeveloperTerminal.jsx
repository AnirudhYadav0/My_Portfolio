import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { skillGroups } from '../data/skills';

// ============================================================
// TERMINAL COMMAND DEFINITIONS
// ============================================================
const COMMANDS = {
  help: () => ({
    type: 'help',
    lines: [
      { text: 'Available commands:', color: '#00F5FF' },
      { text: '' },
      { text: 'about          — About Anirudh Yadav', color: '#F4F7FF' },
      { text: 'projects       — List all projects', color: '#F4F7FF' },
      { text: 'skills         — Show technical skills', color: '#F4F7FF' },
      { text: 'experience     — View experience & certifications', color: '#F4F7FF' },
      { text: 'github         — Open GitHub profile', color: '#F4F7FF' },
      { text: 'contact        — Open contact portal', color: '#F4F7FF' },
      { text: 'open <world>   — Navigate to a destination', color: '#F4F7FF' },
      { text: 'home           — Return to universe home', color: '#F4F7FF' },
      { text: 'hire           — Why hire Anirudh?', color: '#F4F7FF' },
      { text: 'clear          — Clear terminal', color: '#F4F7FF' },
      { text: '' },
      { text: 'Worlds: about · tripnexus · enterskill · skills · experience · contact', color: '#929BB3' },
    ],
  }),

  about: () => ({
    type: 'output',
    lines: [
      { text: `Name:       ${profile.name}`, color: '#00F5FF' },
      { text: `Role:       ${profile.title}` },
      { text: `Education:  ${profile.education.degree}` },
      { text: `            ${profile.education.institution}` },
      { text: `Status:     ${profile.education.status}`, color: '#71FF9C' },
      { text: '' },
      { text: profile.about, color: '#929BB3' },
    ],
  }),

  projects: () => ({
    type: 'output',
    lines: [
      { text: 'Available project worlds:', color: '#00F5FF' },
      { text: '' },
      ...projects.map((p, i) => ({
        text: `[0${i + 1}] ${p.title} — ${p.category}`,
        color: p.color,
      })),
      { text: '' },
      { text: 'Type "open tripnexus" or "open enterskill" to explore.', color: '#929BB3' },
    ],
  }),

  skills: () => ({
    type: 'output',
    lines: [
      { text: 'Technical Skills:', color: '#00F5FF' },
      { text: '' },
      ...skillGroups.flatMap(group => [
        { text: `[${group.label.toUpperCase()}]`, color: group.color },
        ...group.skills.map(s => ({ text: `  • ${s.name}`, color: '#929BB3' })),
        { text: '' },
      ]),
    ],
  }),

  experience: () => ({
    type: 'navigate',
    dest: 'experience',
    lines: [
      { text: 'Navigating to Experience Nebula…', color: '#FFB347' },
      { text: 'Opening experience panel.', color: '#929BB3' },
    ],
  }),

  github: () => {
    window.open(profile.github, '_blank', 'noopener,noreferrer');
    return {
      type: 'output',
      lines: [
        { text: `Opening GitHub: ${profile.github}`, color: '#71FF9C' },
        { text: 'Launched in a new tab.', color: '#929BB3' },
      ],
    };
  },

  contact: () => ({
    type: 'navigate',
    dest: 'contact',
    lines: [
      { text: 'Opening Contact Portal…', color: '#00F5FF' },
    ],
  }),

  home: () => ({
    type: 'navigate',
    dest: null,
    lines: [
      { text: 'Returning to universe home.', color: '#00F5FF' },
    ],
  }),

  clear: () => ({ type: 'clear', lines: [] }),

  hire: () => ({
    type: 'output',
    lines: [
      { text: 'Why hire Anirudh Yadav?', color: '#00F5FF' },
      { text: '' },
      { text: '✦ Full-stack skills across React, Node.js, and MongoDB', color: '#F4F7FF' },
      { text: '✦ Built real, deployed projects: TripNexus and EnterSkill Hub', color: '#F4F7FF' },
      { text: '✦ Passionate about clean, maintainable code and intuitive UIs', color: '#F4F7FF' },
      { text: '✦ Quick learner, hands-on experience from internship', color: '#F4F7FF' },
      { text: '✦ Actively building and shipping projects', color: '#F4F7FF' },
      { text: '' },
      { text: `GitHub: ${profile.github}`, color: '#929BB3' },
      profile.email && { text: `Email:  ${profile.email}`, color: '#929BB3' },
    ].filter(Boolean),
  }),
};

const OPEN_WORLDS = {
  tripnexus: 'tripnexus',
  'trip nexus': 'tripnexus',
  enterskill: 'enterskill',
  'enterskill hub': 'enterskill',
  skills: 'skills',
  contact: 'contact',
  experience: 'experience',
  about: 'about',
  core: 'about',
};

function parseCommand(input, onNavigate) {
  const trimmed = input.trim().toLowerCase();

  // Open command
  if (trimmed.startsWith('open ')) {
    const world = trimmed.slice(5).trim();
    const dest = OPEN_WORLDS[world];
    if (dest) {
      return {
        type: 'navigate',
        dest,
        lines: [{ text: `Initiating jump to ${world.toUpperCase()}...`, color: '#00F5FF' }],
      };
    } else {
      return {
        type: 'error',
        lines: [
          { text: `Unknown world: "${world}"`, color: '#FF35D3' },
          { text: 'Available: about · tripnexus · enterskill · skills · experience · contact', color: '#929BB3' },
        ],
      };
    }
  }

  // Direct world shortcuts (e.g. typing "tripnexus" or "enterskill" directly)
  if (OPEN_WORLDS[trimmed] && trimmed !== 'skills' && trimmed !== 'contact' && trimmed !== 'about' && trimmed !== 'experience') {
    return {
      type: 'navigate',
      dest: OPEN_WORLDS[trimmed],
      lines: [{ text: `Navigating to ${trimmed.toUpperCase()}...`, color: '#00F5FF' }],
    };
  }

  const handler = COMMANDS[trimmed];
  if (handler) return handler();

  return {
    type: 'error',
    lines: [
      { text: `Command not found: "${input}"`, color: '#FF35D3' },
      { text: 'Type "help" or click one of the quick command chips below.', color: '#929BB3' },
    ],
  };
}

// ============================================================
// TERMINAL COMPONENT
// ============================================================
export default function DeveloperTerminal({ onClose, onNavigate }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      lines: [
        { text: 'NEONVERSE DEVELOPER TERMINAL v1.0', color: '#00F5FF' },
        { text: `Connected as: visitor@neonverse`, color: '#929BB3' },
        { text: 'Type "help" to see available commands.', color: '#929BB3' },
        { text: '' },
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(newIdx);
      setInput(cmdHistory[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx] || '');
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [historyIndex, cmdHistory, onClose]);

  const runCommand = useCallback((cmdToRun) => {
    if (!cmdToRun || !cmdToRun.trim()) return;

    const cmd = cmdToRun.trim();
    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput('');

    const result = parseCommand(cmd, onNavigate);

    if (result.type === 'clear') {
      setHistory([]);
      return;
    }

    const newEntry = {
      input: cmd,
      ...result,
    };

    setHistory(prev => [...prev, newEntry]);

    if ((result.type === 'navigate') && result.dest !== undefined) {
      setTimeout(() => {
        onNavigate(result.dest);
      }, 300);
    }
  }, [onNavigate]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    runCommand(input);
  }, [input, runCommand]);

  const quickCommands = ['help', 'projects', 'open tripnexus', 'open enterskill', 'skills', 'contact', 'clear'];

  return (
    <div style={styles.overlay} role="dialog" aria-label="Developer Terminal" aria-modal="true">
      <div style={styles.terminal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.dots} aria-hidden="true">
            <div style={{...styles.dot, background: '#FF5F57'}} />
            <div style={{...styles.dot, background: '#FFBD2E'}} />
            <div style={{...styles.dot, background: '#28C840'}} />
          </div>
          <span style={styles.title}>visitor@neonverse:~ (bash-sim)</span>
          <button
            style={styles.closeBtn}
            onClick={onClose}
            aria-label="Close terminal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Output */}
        <div ref={scrollRef} style={styles.output} aria-live="polite" aria-atomic="false">
          {history.map((entry, i) => (
            <div key={i}>
              {entry.input && (
                <div style={styles.inputLine}>
                  <span style={styles.prompt}>visitor@neonverse:~$</span>
                  <span style={styles.inputText}>{entry.input}</span>
                </div>
              )}
              {entry.lines.map((line, j) => (
                <div
                  key={j}
                  style={{
                    ...styles.outputLine,
                    color: line.color || '#F4F7FF',
                  }}
                >
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>
          ))}

          {/* Quick command buttons */}
          <div style={styles.quickCommands} aria-label="Quick terminal commands">
            <span style={{ fontSize: '11px', color: '#929BB3', alignSelf: 'center', marginRight: '4px' }}>Quick:</span>
            {quickCommands.map(qc => (
              <button
                key={qc}
                type="button"
                onClick={() => runCommand(qc)}
                style={styles.quickChip}
              >
                {qc}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={styles.inputRow} aria-label="Terminal input">
            <label htmlFor="terminal-input" style={styles.promptLabel}>
              visitor@neonverse:~$
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.inputField}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal command input"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '0 0 60px',
    zIndex: 7000,
  },
  terminal: {
    width: '100%',
    maxWidth: '700px',
    background: 'rgba(9,13,25,0.97)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '12px',
    boxShadow: '0 0 60px rgba(0,245,255,0.1), 0 0 120px rgba(139,92,255,0.05)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '60vh',
    margin: '0 16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid rgba(0,245,255,0.1)',
    gap: '12px',
    flexShrink: 0,
  },
  dots: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
  title: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    color: '#929BB3',
    flex: 1,
    letterSpacing: '0.04em',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: '#929BB3',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    transition: 'color 0.2s',
  },
  output: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  inputLine: {
    display: 'flex',
    gap: '8px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    marginBottom: '4px',
  },
  prompt: {
    color: '#00F5FF',
    flexShrink: 0,
    opacity: 0.7,
  },
  promptLabel: {
    color: '#00F5FF',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    flexShrink: 0,
    opacity: 0.7,
    cursor: 'text',
  },
  inputText: {
    color: '#F4F7FF',
  },
  outputLine: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  inputField: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '13px',
    color: '#F4F7FF',
    caretColor: '#00F5FF',
  },
  quickCommands: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '12px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(0,245,255,0.08)',
  },
  quickChip: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    padding: '3px 8px',
    background: 'rgba(0,245,255,0.06)',
    border: '1px solid rgba(0,245,255,0.2)',
    borderRadius: '4px',
    color: '#00F5FF',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
