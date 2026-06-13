import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Mail, ExternalLink, Code2, Terminal, Cpu, Layout,
  FileDown, Braces, Database, Globe, Layers, Sparkles,
  Bot, Eye, Brain, Server, Wrench, X, Send
} from 'lucide-react';
import './App.css';

/* ========== CUSTOM BRAND ICONS FOR BRAND LOGOS REMOVED IN LUCIDE-REACT v1+ ========== */
const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ========== FLOATING PARTICLES ========== */
function Particles() {
  const count = 25;
  const particlesData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      duration: 12 + Math.random() * 20,
      delay: Math.random() * (12 + Math.random() * 20),
      size: 1 + Math.random() * 3
    }));
  }, []);

  return (
    <div className="particles-container">
      {particlesData.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ========== TYPEWRITER HOOK ========== */
function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

/* ========== INTERSECTION OBSERVER HOOK ========== */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ========== REVEAL WRAPPER ========== */
function Reveal({ children, className = '', type = 'reveal' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`${type} ${visible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ========== SKILL BAR COMPONENT ========== */
function SkillBar({ name, percent, icon: Icon }) {
  const [ref, visible] = useReveal();
  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-info">
        <span className="skill-name">
          <Icon size={16} /> {name}
        </span>
        <span className="skill-percent">{percent}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: visible ? `${percent}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/* ========== INTERACTIVE TERMINAL SIMULATOR ========== */
/* ========== MATRIX RAIN COMPONENT ========== */
function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const characters = '01'.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(0);

    let animationId;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41'; // Matrix green
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleExit = () => onClose();
    canvas.addEventListener('click', handleExit);
    window.addEventListener('keydown', handleExit);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleExit);
    };
  }, [onClose]);

  return (
    <>
      <canvas ref={canvasRef} className="terminal-matrix-canvas" />
      <div className="matrix-close-hint">Click or press any key to exit Matrix mode</div>
    </>
  );
}

/* ========== INTERACTIVE TERMINAL SIMULATOR ========== */
function TerminalSimulator({ currentTheme, setTheme }) {
  const [history, setHistory] = useState([
    { type: 'info', text: 'HamzaOS v1.0.2 - Live Terminal Session' },
    { type: 'info', text: 'Type "help" to view list of available operations.' },
    { type: 'input', text: 'init_developer_info' },
    { type: 'output', text: 'Name: Hamza Ishaq\nRole: Python Developer & AI Engineer\nFocus: Bridging models and full-stack systems.' }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const commandsList = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'neofetch', 'matrix', 'theme', 'inbox'];

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (!trimmed) return;

      const newHistory = [...history, { type: 'input', text: trimmed }];
      const cmdParts = trimmed.split(' ');
      const mainCmd = cmdParts[0].toLowerCase();
      const arg = cmdParts[1];

      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      let reply;
      let replyType = 'output';

      switch (mainCmd) {
        case 'help':
          reply = 'Available Commands:\n  neofetch  - System information summary\n  about     - Core developer introduction\n  skills    - ASCII-styled capability summary\n  projects  - Show featured developments\n  theme     - Toggle site themes (usage: theme emerald)\n  matrix    - Load terminal data stream screensaver\n  inbox     - Retrieve your form messages history\n  contact   - Display key email & links\n  clear     - Wipe clean terminal logs';
          replyType = 'info';
          break;
        case 'neofetch':
          reply = `   /\\_/\\     hamza@portfolio\n  ( o.o )    ---------------\n   > ^ <     OS: HamzaOS v1.0.2\n             Kernel: React-Vite SPA\n             Theme: ${currentTheme.toUpperCase()}\n             Shell: antish (advanced reactive shell)\n             CPU: Machine Learning Specialist\n             Memory: Coffee-Powered`;
          replyType = 'info';
          break;
        case 'about':
          reply = 'I am Hamza Ishaq, a Python Developer and AI Engineer. I specialize in designing neural network pipelines (Computer Vision, NLP) and building lightweight FastAPI & Flask backend endpoints to connect models to scalable web interfaces.';
          break;
        case 'skills':
          reply = 'Hamza\'s Skills Arsenal:\n\n' +
                  '  AI & ML     [==================  ] 88% (PyTorch, CV)\n' +
                  '  Python      [====================] 92% (API Design)\n' +
                  '  React.js    [===============     ] 75% (SPAs & CSS)\n' +
                  '  FastAPI     [==================  ] 82% (REST & WebSockets)\n' +
                  '  Docker      [==============      ] 72% (Microservices)';
          replyType = 'output';
          break;
        case 'projects':
          reply = 'Featured Projects:\n  1. Pro Monitoring System (FYP) - Automated CV telemetry stream\n  2. Jarvis AI Assistant - Whisper speech automation agent\n  3. Grammar Feedback Tool - Snap NLP syntax analyzer\n  4. Personal Portfolio - Premium web experience you are using';
          break;
        case 'theme': {
          const validThemes = ['cyberpunk', 'emerald', 'sunset', 'retro'];
          if (!arg) {
            reply = 'Usage: theme [cyberpunk | emerald | sunset | retro]';
            replyType = 'error';
          } else if (validThemes.includes(arg.toLowerCase())) {
            setTheme(arg.toLowerCase());
            reply = `System theme updated to: ${arg.toLowerCase()}`;
          } else {
            reply = `Unknown theme: "${arg}". Choose from: cyberpunk, emerald, sunset, retro`;
            replyType = 'error';
          }
          break;
        }
        case 'matrix':
          setMatrixActive(true);
          setInput('');
          return;
        case 'inbox': {
          const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
          if (messages.length === 0) {
            reply = 'Inbox is empty! Write a message in the contact form below, and check back.';
            replyType = 'info';
          } else {
            reply = messages.map((m, i) => `[Message #${i + 1}] From: ${m.name} <${m.email}>\nMessage: "${m.message}"\nSent: ${new Date(m.date).toLocaleTimeString()}`).join('\n\n');
          }
          break;
        }
        case 'contact':
          reply = 'Get In Touch:\n  • Email: hamzaishaq327@gmail.com\n  • GitHub: github.com/hamzaishaq53';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        default:
          reply = `Command not recognized: "${trimmed}". Type "help" to see operations list.`;
          replyType = 'error';
      }

      setHistory([...newHistory, { type: replyType, text: reply }]);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex === cmdHistory.length - 1) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = input.toLowerCase().trim();
      if (!currentInput) return;
      const match = commandsList.find(c => c.startsWith(currentInput));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div className="terminal-window" style={{ position: 'relative' }}>
      {matrixActive && <MatrixRain onClose={() => setMatrixActive(false)} />}
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot close" onClick={() => setHistory([])} style={{ cursor: 'pointer' }} />
          <div className="terminal-dot minimize" />
          <div className="terminal-dot maximize" />
        </div>
        <span className="terminal-title">hamza@portfolio:~</span>
        <div style={{ width: 44 }} />
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {history.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line.type === 'input' ? (
              <>
                <span className="terminal-prompt">hamza &gt;</span>
                <span className="terminal-command">{line.text}</span>
              </>
            ) : (
              <span className={`terminal-output ${
                line.type === 'error' ? 'terminal-output-error' : line.type === 'info' ? 'terminal-output-info' : ''
              }`}>
                {line.text}
              </span>
            )}
          </div>
        ))}
        <div className="terminal-input-row">
          <span className="terminal-prompt">hamza &gt;</span>
          <input
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="..."
            aria-label="Terminal CLI input"
          />
        </div>
      </div>
    </div>
  );
}

/* ========== AI CHATBOT FLOAT WIDGET ========== */
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const cached = localStorage.getItem('portfolio_chat_history');
    return cached ? JSON.parse(cached) : [
      { sender: 'bot', text: "Hi! I'm Hamza's AI assistant. Ask me questions about his projects, background, or stack!" }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('portfolio_chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const suggestions = [
    "What is Hamza's main stack?",
    "Tell me about Jarvis AI.",
    "Is Hamza available for hire?"
  ];

  const getBotResponse = (userText) => {
    const q = userText.toLowerCase().trim();
    if (q.includes('stack') || q.includes('skill') || q.includes('technology') || q.includes('languages') || q.includes('frameworks') || q.includes('tools')) {
      return "Hamza specializes in Python for AI/ML (PyTorch, TensorFlow, OpenCV) and works with JavaScript/React for web frontend, and Flask/FastAPI for API backends.";
    }
    if (q.includes('jarvis') || q.includes('assistant')) {
      return "Jarvis is Hamza's personal voice assistant. It coordinates custom voice-processing pipelines (Whisper STT/TTS), OpenCV object detection, and modular system automations in Python.";
    }
    if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('job') || q.includes('contract') || q.includes('opportunity')) {
      return "Yes, Hamza is open to new roles, contracts, and freelance opportunities! Reach out via hamzaishaq327@gmail.com to discuss how he can contribute to your projects.";
    }
    if (q.includes('grammar') || q.includes('feedback')) {
      return "The Grammar Feedback Tool is an NLP-powered editor. It parses text syntactically to provide spelling and phrasal recommendations, served via a Flask backend API.";
    }
    if (q.includes('fyp') || q.includes('monitoring') || q.includes('pro monitoring') || q.includes('final year')) {
      return "His Final Year Project is 'Pro Monitoring System': a real-time computer vision automated safety hazard tracker and compliance analyzer dashboard utilizing FastAPI and React.";
    }
    if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('study') || q.includes('college')) {
      return "Hamza holds a Bachelor of Science in Computer Science in Lahore, Pakistan, centering his academics and research around Machine Learning, Computer Vision, and full-stack API systems.";
    }
    if (q.includes('experience') || q.includes('journey') || q.includes('career')) {
      return "Hamza's coding journey started in 2022. He transitioned from web foundations to deep learning model construction and backend API engineering, creating several live integrated applications.";
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greet') || q.includes('yo')) {
      return "Hello! How can I help you today? You can ask about Hamza's skills, his projects (like Jarvis AI or Pro Monitoring), or how to contact him.";
    }
    return "That's an interesting question! Hamza bridges research in deep learning with clean production software. You can send him a message via the form below or write to hamzaishaq327@gmail.com.";
  };

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botText = getBotResponse(textToSend);
      setMessages((prev) => [...prev, { sender: 'bot', text: botText }]);
    }, 1100);
  };

  return (
    <div className="ai-chatbot-container">
      <button
        className="ai-chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {isOpen && (
        <div className="ai-chatbot-window">
          <div className="ai-chatbot-header">
            <div className="ai-chatbot-title">
              <Bot size={18} className="gradient-text" />
              <span>Hamza's Agent</span>
              <span>Online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={() => {
                  setMessages([{ sender: 'bot', text: "Hi! I'm Hamza's AI assistant. Chat history cleared! Ask me anything." }]);
                }}
                style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 6px' }}
                title="Clear Conversation"
              >
                Clear
              </button>
              <button
                className="ai-chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat Window"
                style={{ cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="ai-chatbot-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`ai-message ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="ai-message bot" style={{ padding: '8px 12px' }}>
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="ai-chatbot-suggestions">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                className="ai-suggestion-btn"
                onClick={() => handleSend(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="ai-chatbot-input-container">
            <input
              type="text"
              className="ai-chatbot-input"
              placeholder="Ask about Hamza..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(input);
              }}
              aria-label="Ask AI assistant"
            />
            <button
              className="ai-chatbot-send"
              onClick={() => handleSend(input)}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========== INTERACTIVE CONTACT FORM ========== */
function ContactForm({ showToast, triggerConfetti }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      // Save message details to LocalStorage
      const existing = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      const newMsg = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        date: new Date().toISOString()
      };
      localStorage.setItem('portfolio_messages', JSON.stringify([...existing, newMsg]));

      // Trigger Confetti and Toast success
      triggerConfetti();
      setLoading(false);
      showToast("Thank you! Your message has been sent successfully.");
      setFormData({ name: '', email: '', message: '' });
    }, 1100);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="form-name">Full Name</label>
        <input
          id="form-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="form-email">Email Address</label>
        <input
          id="form-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="form-message">Message</label>
        <textarea
          id="form-message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can Hamza assist you?"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
        {loading ? 'Sending Request...' : 'Send Message'}
      </button>
    </form>
  );
}

/* ========== DATA ========== */
const ROLES = [
  'I build things for the future.',
  'Python Developer & AI Engineer.',
  'Computer Vision Enthusiast.',
  'NLP Specialist.',
  'Full-Stack Problem Solver.',
];

const SKILLS = [
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    items: [
      { name: 'Computer Vision', percent: 88, icon: Eye },
      { name: 'Natural Language Processing', percent: 85, icon: Terminal },
      { name: 'Machine Learning', percent: 82, icon: Cpu },
      { name: 'Deep Learning', percent: 78, icon: Sparkles },
    ],
  },
  {
    title: 'Languages & Frameworks',
    icon: Code2,
    items: [
      { name: 'Python', percent: 92, icon: Braces },
      { name: 'JavaScript / React', percent: 75, icon: Braces },
      { name: 'HTML / CSS', percent: 80, icon: Layout },
      { name: 'SQL', percent: 70, icon: Database },
    ],
  },
  {
    title: 'Backend & DevOps',
    icon: Server,
    items: [
      { name: 'Flask / FastAPI', percent: 82, icon: Globe },
      { name: 'REST API Design', percent: 80, icon: Layers },
      { name: 'Docker & Deployment', percent: 72, icon: Server },
      { name: 'Git & GitHub', percent: 85, icon: Github },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    items: [
      { name: 'OpenCV', percent: 87, icon: Eye },
      { name: 'TensorFlow / PyTorch', percent: 75, icon: Cpu },
      { name: 'Railway / Vercel', percent: 78, icon: Globe },
      { name: 'VS Code / Jupyter', percent: 90, icon: Terminal },
    ],
  },
];

const PROJECTS = [
  {
    title: 'Pro Monitoring System (FYP)',
    description:
      'My Final Year Project (FYP): A real-time automated visual activity monitoring and analysis platform. Integrates advanced computer vision models to track anomalies, detect safety/compliance behaviors, and stream live telemetry data to a React dashboard.',
    tech: ['Computer Vision', 'Python', 'FastAPI', 'PyTorch', 'Websockets'],
    category: 'aiml',
    status: 'progress',
    githubUrl: 'https://github.com/hamzaishaq53',
    icon: Eye,
    longDescription:
      'An automated computer vision monitoring suite that processes real-time camera feeds to detect objects, monitor compliance/safety hazards, and track motion patterns, streaming data to a central telemetry dashboard.',
    architecture: [
      'Video Camera / Live RTSP Feed',
      'PyTorch & OpenCV processing pipeline (Anomalies & Motion)',
      'FastAPI backend handling WebSocket streams',
      'React dashboard displaying telemetry analytics'
    ],
    role: 'Designed the frame-processing algorithms in Python, trained CV models for activity classification, and built the WebSocket-based streaming API.',
    challenges: 'Overcame latency issues under heavy model inference by implementing asynchronous multi-threaded frame queue processing.'
  },
  {
    title: 'Jarvis AI Assistant',
    description:
      'A comprehensive intelligent virtual assistant integrating advanced NLP, computer vision, and automation tasks into a cohesive, modular system with voice interaction.',
    tech: ['Python', 'Computer Vision', 'NLP', 'AI/ML'],
    category: 'aiml',
    status: 'progress',
    githubUrl: 'https://github.com/hamzaishaq53',
    icon: Bot,
    longDescription:
      'An intelligent voice-activated automated desktop helper. Combines Speech-to-Text (STT), natural language intents, and custom computer vision processing to automate system tasks, analyze camera feeds, and respond vocally.',
    architecture: [
      'Voice command input via mic',
      'Whisper STT / Intent analysis module',
      'Python system execution scripts (Automations)',
      'TTS voice feedback output'
    ],
    role: 'Wrote the core coordination engine, custom NLP patterns for command parsing, and integrated OpenCV for object-recognition commands.',
    challenges: 'Synchronized async voice input loops with CV frame parsing to prevent blocking input during audio playbacks.'
  },
  {
    title: 'Grammar Feedback Tool',
    description:
      'An intelligent web-based grammar and spelling feedback tool. Analyzes user text in real-time and provides automated corrections with clear, actionable status updates and suggestions.',
    tech: ['NLP', 'Python', 'Flask', 'Web Deployment'],
    category: 'nlp',
    status: 'completed',
    liveUrl: 'https://grammar-tool-production.up.railway.app',
    githubUrl: 'https://github.com/hamzaishaq53',
    icon: Terminal,
    longDescription:
      'An NLP-powered grammar correction and phrasal feedback web tool. It scans user text in real-time, highlights spelling errors, grammatical slips, and style recommendations, rendering contextual inline edits.',
    architecture: [
      'User inputs text in browser interface',
      'AJAX payload sent to API',
      'Python NLP server processes syntax trees & vocab',
      'JSON recommendations returned to client UI'
    ],
    role: 'Developed the Flask backend parsing engine, integrated grammatical syntax checkers, and designed the React-based diff view.',
    challenges: 'Optimized text tree analysis queries to run in under 80ms, ensuring typing in the editor feels snappy and lag-free.'
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, animated developer portfolio built with React and pure CSS. Features scroll-triggered animations, glassmorphism design, and responsive layout — the site you\'re viewing now.',
    tech: ['React', 'Vite', 'CSS3', 'Responsive Design'],
    category: 'web',
    status: 'completed',
    githubUrl: 'https://github.com/hamzaishaq53',
    icon: Globe,
    longDescription:
      'A lightweight, high-fidelity developer showcase page built with React and Vanilla CSS. Implements hardware-accelerated animations, scroll-triggered reveal hooks, and multi-theme configuration.',
    architecture: [
      'React SPA component tree',
      'Vanilla CSS layout & theme presets',
      'Local storage persistence hooks',
      'Vercel CDN hosting & edge caches'
    ],
    role: 'Programmed the interactive terminal CLI, custom Matrix rain canvas, local storage integrated chatbot, and the print layout.',
    challenges: 'Avoided bulky UI frameworks (like Bootstrap or Tailwind) to achieve a near-perfect Google Lighthouse score and keep download size minimal.'
  },
];

const TIMELINE = [
  {
    date: '2024 — Present',
    title: 'AI & Python Developer',
    subtitle: 'Freelance / Self-Directed',
    description:
      'Building AI-powered applications using Computer Vision, NLP, and Machine Learning. Developing full-stack web apps and deploying them to production.',
  },
  {
    date: '2023 — 2024',
    title: 'Learning & Exploration',
    subtitle: 'Self-Taught Journey',
    description:
      'Deep-dived into Python, data science, and AI/ML fundamentals. Built several projects to solidify understanding of neural networks, NLP pipelines, and CV algorithms.',
  },
  {
    date: '2022 — 2023',
    title: 'Web Development Foundations',
    subtitle: 'Started Coding',
    description:
      'Learned HTML, CSS, JavaScript, and React. Built first web projects and discovered the passion for creating software that solves real problems.',
  },
];

/* ========== THEME SELECTOR DROPDOWN ========== */
function ThemeSelector({ currentTheme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const themes = [
    { id: 'cyberpunk', label: 'Cyberpunk' },
    { id: 'emerald', label: 'Emerald Hack' },
    { id: 'sunset', label: 'Sunset Gold' },
    { id: 'retro', label: '80s Retro' }
  ];

  return (
    <div className="theme-selector-container" ref={containerRef}>
      <button 
        className="theme-selector-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Theme"
      >
        <Sparkles size={14} />
        <span style={{ textTransform: 'capitalize' }}>{currentTheme}</span>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${currentTheme === t.id ? 'active' : ''}`}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
            >
              <div className={`theme-dot ${t.id}`} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========== CONFETTI CANVAS EFFECT ========== */
function ConfettiEffect({ trigger }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = ['#00d4ff', '#7c3aed', '#10b981', '#fbbf24', '#ff007f'];
    const particles = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height - 20,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 5 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 4 - 2
      });
    }

    let animId;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y < canvas.height) active = true;
      });

      if (active) {
        animId = requestAnimationFrame(update);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [trigger]);

  return trigger ? <canvas ref={canvasRef} className="confetti-canvas" /> : null;
}

/* ========== DETAILED PROJECT MODAL ========== */
function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  const ProjectIcon = project.icon;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content spotlight-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
          <X size={18} />
        </button>
        
        <div className="modal-header-section">
          <div className="project-icon" style={{ color: 'var(--accent-1)' }}>
            <ProjectIcon size={36} />
          </div>
          <div className="modal-title-wrapper">
            <h2 className="section-title" style={{ fontSize: '1.8rem', textAlign: 'left', margin: 0 }}>
              {project.title}
            </h2>
            <span className={`project-status ${
              project.status === 'completed' ? 'status-completed' : 'status-progress'
            }`}>
              {project.status === 'completed' ? '✓ Completed' : '◉ In Progress'}
            </span>
          </div>
        </div>

        <div className="modal-body-section">
          <div className="modal-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 className="modal-section-title font-outfit">Overview & Context</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {project.longDescription || project.description}
                </p>
              </div>

              {project.architecture && (
                <div>
                  <h4 className="modal-section-title font-outfit">Architecture Flow</h4>
                  <div className="arch-flow">
                    {project.architecture.map((step, idx) => (
                      <div className="arch-step" key={idx}>
                        <div className="arch-num">{idx + 1}</div>
                        <div className="arch-text">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h4 className="modal-section-title font-outfit">My Role</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {project.role || 'Main Developer / Architect'}
                </p>
              </div>

              <div>
                <h4 className="modal-section-title font-outfit">Core Challenges</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {project.challenges || 'Optimizing performance and ensuring reliable integration.'}
                </p>
              </div>

              <div>
                <h4 className="modal-section-title font-outfit">Tech Details</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag" style={{ margin: 0 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="project-links" style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                <ExternalLink size={14} /> Open Live Demo
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
              <Github size={14} /> View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== INTERACTIVE PRINT-FRIENDLY RESUME MODAL ========== */
function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content spotlight-card resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn close-modal-btn" onClick={onClose} aria-label="Close Modal">
          <X size={18} />
        </button>

        <div className="modal-header-section close-modal-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.5rem', textAlign: 'left', margin: 0 }}>
            Curriculum Vitae
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a href="/Hamza_Ishaq_Resume.html" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
              <ExternalLink size={14} /> Open Resume Page
            </a>
            <button className="btn btn-primary resume-print-btn" onClick={handlePrint} style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
              <FileDown size={14} /> Print / Save PDF
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div className="modal-body-section resume-wrapper resume-print-wrapper">
          <div className="resume-header">
            <div className="resume-title-block">
              <h2>Hamza Ishaq</h2>
              <h3>Python Developer & AI Engineer</h3>
            </div>
            <div className="resume-meta-info">
              <span>Email: <a href="mailto:hamzaishaq327@gmail.com">hamzaishaq327@gmail.com</a></span>
              <span>GitHub: <a href="https://github.com/hamzaishaq53" target="_blank" rel="noreferrer">github.com/hamzaishaq53</a></span>
              <span>LinkedIn: <a href="https://www.linkedin.com/in/hamza-ishaq-ab10462b7/" target="_blank" rel="noreferrer">linkedin.com/in/hamza-ishaq-ab10462b7</a></span>
              <span>Location: Lahore, Pakistan (Remote Friendly)</span>
            </div>
          </div>

          <div className="resume-body-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="resume-section">
                <h3 className="resume-section-title">Profile Summary</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                  Passionate Python Developer and AI Engineer specializing in Computer Vision, Natural Language Processing (NLP), and Machine Learning pipelines. Experienced in designing robust deep learning models and serving them through efficient, high-performance backends (FastAPI, Flask) connected to modern user interfaces (React). Committed to bridging the gap between intelligent models and production-ready applications.
                </p>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-title">Projects</h3>
                
                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-item-title">Pro Monitoring System (FYP)</span>
                    <span className="resume-item-date">2023 — 2024</span>
                  </div>
                  <div className="resume-item-org">Final Year Project</div>
                  <ul className="resume-bullets">
                    <li>Developed an automated activity and safety hazard visual monitoring system using computer vision.</li>
                    <li>Trained PyTorch and OpenCV-based object detection and anomaly tracking networks.</li>
                    <li>Engineered a FastAPI backend to broadcast low-latency websocket telemetry feeds.</li>
                    <li>Built an analytics telemetry dashboard in React to display alert queues in real-time.</li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-item-title">Jarvis Voice AI Assistant</span>
                    <span className="resume-item-date">2023</span>
                  </div>
                  <div className="resume-item-org">Personal AI Automation Project</div>
                  <ul className="resume-bullets">
                    <li>Built a modular speech-activated virtual assistant combining Whisper Speech-to-Text and TTS loops.</li>
                    <li>Designed an intent analysis module to route verbal commands to system files and API controllers.</li>
                    <li>Integrated real-time computer vision object triggers to alert the user based on camera captures.</li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="resume-item-title">Grammar Feedback Tool</span>
                    <span className="resume-item-date">2024</span>
                  </div>
                  <div className="resume-item-org">NLP Writing Platform</div>
                  <ul className="resume-bullets">
                    <li>Developed an intelligent editor providing real-time phrasal recommendations.</li>
                    <li>Designed a Flask-based syntactic processing backend with sub-100ms request trees.</li>
                    <li>Implemented a side-by-side diff renderer highlighting grammatical, vocab, and spelling modifications.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="resume-section">
                <h3 className="resume-section-title">Core Skills</h3>
                <div className="resume-skills-block">
                  <div className="resume-skill-cat">
                    <h4>AI & Machine Learning</h4>
                    <div className="resume-skill-tags">
                      <span className="resume-skill-tag">Computer Vision</span>
                      <span className="resume-skill-tag">NLP</span>
                      <span className="resume-skill-tag">PyTorch</span>
                      <span className="resume-skill-tag">TensorFlow</span>
                      <span className="resume-skill-tag">OpenCV</span>
                    </div>
                  </div>
                  <div className="resume-skill-cat">
                    <h4>Languages & Backends</h4>
                    <div className="resume-skill-tags">
                      <span className="resume-skill-tag">Python</span>
                      <span className="resume-skill-tag">FastAPI</span>
                      <span className="resume-skill-tag">Flask</span>
                      <span className="resume-skill-tag">JavaScript</span>
                      <span className="resume-skill-tag">SQL</span>
                    </div>
                  </div>
                  <div className="resume-skill-cat">
                    <h4>Frontend & DevOps</h4>
                    <div className="resume-skill-tags">
                      <span className="resume-skill-tag">React.js</span>
                      <span className="resume-skill-tag">HTML5 / CSS3</span>
                      <span className="resume-skill-tag">Docker</span>
                      <span className="resume-skill-tag">Git & GitHub</span>
                      <span className="resume-skill-tag">Railway / Vercel</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-title">Education</h3>
                <div className="resume-item" style={{ marginBottom: 0 }}>
                  <div className="resume-item-header">
                    <span className="resume-item-title" style={{ fontSize: '0.95rem' }}>BS in Computer Science</span>
                  </div>
                  <div className="resume-item-org" style={{ fontSize: '0.85rem', marginBottom: 0 }}>Lahore, Pakistan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========== MAIN APP ========== */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'cyberpunk';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const typedText = useTypewriter(ROLES, 90, 50, 1800);

  /* Apply theme dynamically to document body */
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  /* Toast helper */
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  }, []);

  /* Confetti triggers */
  const triggerConfetti = useCallback(() => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 5000);
  }, []);

  /* Spotlight mouse tracking effect */
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const cards = document.querySelectorAll('.spotlight-card');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  /* Scroll handler for active state and navbar background */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock background scroll for mobile navigation overlay */
  useEffect(() => {
    document.body.style.overflow = (mobileMenuOpen || selectedProject || isResumeOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, selectedProject, isResumeOpen]);

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'aiml', label: 'AI & ML' },
    { id: 'nlp', label: 'NLP' },
    { id: 'web', label: 'Web Dev' },
  ];

  return (
    <div className="app-container">
      {/* Confetti Trigger */}
      <ConfettiEffect trigger={confettiActive} />

      {/* Background visual components */}
      <Particles />
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      {/* ===== NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="logo" onClick={() => scrollTo('about')} style={{ cursor: 'pointer' }}>
          H<span>.</span>I
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeSelector currentTheme={theme} setTheme={setTheme} />
          
          <button
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* ===== HERO SECTION ===== */}
      <section id="about" className="hero">
        <div className="hero-wrapper">
          <div className="hero-content">
            <span className="greeting">{'// Hello, world — I\'m'}</span>
            <h1>
              Hamza <span className="highlight">Ishaq</span>.
            </h1>
            <h2 className="role">
              {typedText}
              <span className="typewriter-cursor" />
            </h2>
            <p className="hero-bio">
              I'm a Python Developer specializing in AI, Computer Vision, and NLP.
              I architect complete web applications and deploy them to production —
              bridging the gap between intelligent algorithms and user-facing products.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                <Code2 size={18} /> View My Work
              </button>
              <button className="btn btn-secondary" onClick={() => setIsResumeOpen(true)}>
                <FileDown size={18} /> Download CV
              </button>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/hamzaishaq53" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="mailto:hamzaishaq327@gmail.com" className="hero-social-link" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="https://www.linkedin.com/in/hamza-ishaq-ab10462b7/" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="hero-avatar-col">
            <div className="avatar-glow-ring">
              <div className="avatar-ring-1" />
              <div className="avatar-ring-2" />
              <img
                src="/hamza-photo.jpg"
                alt="Hamza Ishaq — Python Developer & AI Engineer"
                className="hero-avatar-img"
              />
              <div className="avatar-badge">
                <Brain size={14} />
                <span>AI Engineer</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <TerminalSimulator currentTheme={theme} setTheme={setTheme} />
          </div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section id="skills" className="skills">
        <Reveal>
          <h2 className="section-title">
            <span className="gradient-text">My Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </Reveal>

        <div className="skills-grid stagger-children">
          {SKILLS.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <Reveal key={category.title}>
                <div className="glass-card skill-category spotlight-card">
                  <div className="skill-category-header">
                    <CategoryIcon size={24} />
                    <h3>{category.title}</h3>
                  </div>
                  <div className="skill-list">
                    {category.items.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        percent={skill.percent}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="projects">
        <Reveal>
          <h2 className="section-title">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of things I've built and am building (Click card for details)
          </p>
        </Reveal>

        <Reveal>
          <div className="project-filters">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${selectedFilter === f.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid">
          {filteredProjects.map((project) => {
            const ProjectIcon = project.icon;
            return (
              <Reveal key={project.title}>
                <div 
                  className="glass-card project-card spotlight-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-icon">
                    <ProjectIcon size={28} />
                  </div>
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span
                      className={`project-status ${
                        project.status === 'completed' ? 'status-completed' : 'status-progress'
                      }`}
                    >
                      {project.status === 'completed' ? '✓ Completed' : '◉ In Progress'}
                    </span>
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                    <a href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github size={16} /> Source Code
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== JOURNEY/TIMELINE SECTION ===== */}
      <section id="experience" className="experience">
        <Reveal>
          <h2 className="section-title">
            <span className="gradient-text">My Journey</span>
          </h2>
          <p className="section-subtitle">
            The path that shaped who I am today
          </p>
        </Reveal>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <Reveal key={i}>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <span className="timeline-date">{item.date}</span>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="contact">
        <Reveal>
          <h2 className="section-title">
            <span className="gradient-text">Get In Touch</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="glass-card contact-card spotlight-card">
            <p className="contact-desc" style={{ marginBottom: '2rem' }}>
              I'm currently looking for new opportunities. Whether you have a question,
              a project proposal, or just want to say hi — fill out the form or use the channels below.
            </p>

            <ContactForm showToast={showToast} triggerConfetti={triggerConfetti} />

            <div className="contact-links" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              <a href="mailto:hamzaishaq327@gmail.com" className="contact-link-item">
                <Mail size={16} /> hamzaishaq327@gmail.com
              </a>
              <a href="https://github.com/hamzaishaq53" target="_blank" rel="noreferrer" className="contact-link-item">
                <Github size={16} /> github.com/hamzaishaq53
              </a>
            </div>

            <div className="social-links">
              <a href="https://github.com/hamzaishaq53" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/hamza-ishaq-ab10462b7/" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:hamzaishaq327@gmail.com" className="social-icon" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== DETAIL MODALS AND RESUME OVERLAYS ===== */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* ===== AI CHATBOT WIDGET FLOATING ===== */}
      <AIChatbot />

      {/* ===== SLEEK FEEDBACK TOAST NOTIFICATION ===== */}
      {toastMessage && (
        <div className="toast-notification">
          <span className="toast-success-icon">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Hamza Ishaq. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
