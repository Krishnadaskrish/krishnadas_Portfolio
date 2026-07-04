import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Phone, ChevronDown, Terminal, Server, Globe, Database, Cloud, Zap, Menu, X } from 'lucide-react'

const Github = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"}><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
)

const Linkedin = ({ size = 18, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

// ─── DATA ────────────────────────────────────────────────────────────────────
const SKILLS = {
  'Back-End': ['Node.js', 'Express.js', 'Microservices', 'SOLID', 'MVC', 'REST APIs', 'WebSocket', 'Socket.IO', 'RabbitMQ', 'MQTT'],
  'Front-End': ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Redux', 'Tailwind CSS', 'HTML', 'CSS', 'EJS'],
  'Databases': ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis'],
  'DevOps & Cloud': ['Docker', 'AWS EC2', 'AWS S3', 'Lambda', 'Route 53', 'Google Cloud', 'Vercel', 'Nginx', 'Kafka', 'GitHub Actions'],
  'Streaming & Media': ['RTMP', 'HLS', 'FFmpeg', 'Node Media Server'],
  'Tools & Payments': ['Razorpay', 'PayPal', 'Stripe', 'Paytm', 'Postman', 'Git', 'Jenkins', 'SonarQube'],
}

const SKILL_ICONS = {
  'Back-End': Server,
  'Front-End': Globe,
  'Databases': Database,
  'DevOps & Cloud': Cloud,
  'Streaming & Media': Zap,
  'Tools & Payments': Terminal,
}

const PROJECTS = [
  {
    name: 'Thunderbolt',
    tag: 'EV Fleet & IoT Monitoring Platform',
    color: '#47FF2D',
    highlights: [
      '8+ microservices, React.js fleet dashboard, and mobile app',
      'Multi-protocol IoT layer: TCP (Teltonika, Edaddy) and MQTT with unified Kafka pipeline',
      'Dual-protocol TCP Gateway for real-time telemetry via JWT-authenticated WebSocket connections',
      'Notification service: push, WebSocket, email, SMS across 4+ rule types (fault, SOC, ignition, overspeed)',
      'Dual-camera live streaming microservice (RTMP → FFmpeg → HLS) for front & cabin views',
    ],
    stack: ['Node.js', 'PostgreSQL', 'Kafka', 'React.js', 'MQTT', 'WebSocket', 'RTMP', 'HLS', 'FFmpeg'],
  },
  {
    name: 'TM Hire',
    tag: 'On-Demand RMC Transport & Pumping Marketplace',
    color: '#FF9ECA',
    live: true,
    highlights: [
      'Solo-built Hirer and Hiree portals plus Driver-app backend APIs end-to-end',
      '3-role booking workflow (Hirer → Hiree → Driver) with concurrent production bookings',
      'Polygon-based geofencing + live GPS via Google Maps Platform — 100% manual updates eliminated',
      'Real-time driver tracking via Socket.IO, FCM, and OneSignal across web and mobile',
    ],
    stack: ['Node.js', 'React.js', 'Express.js', 'Socket.IO', 'FCM', 'Google Maps API'],
  },
  {
    name: 'Glamourbae',
    tag: 'E-Commerce Marketplace (Store & Driver Platform)',
    color: '#47FF2D',
    highlights: [
      'Multi-vendor marketplace serving orders from registered stores via mobile app',
      'Stripe delayed-capture flow — holds payment until store acceptance, reducing failed transactions',
      'Proximity-based driver assignment via Google Distance Matrix API with real-time auto-notify',
      'Live order/delivery updates via Socket.IO + admin panel for 2 user roles',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Socket.IO', 'Google Maps API'],
  },
  {
    name: 'Brake Time',
    tag: 'Food Ordering Platform (User & Vendor App)',
    color: '#FF9ECA',
    highlights: [
      'Backend APIs for User and Vendor Flutter apps: auth, orders, real-time updates',
      '5-stage real-time order pipeline via Socket.IO and FCM push notifications',
      'Paytm integration with webhook-based verification + twice-weekly vendor payout cycles',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Paytm', 'Socket.IO', 'FCM', 'Flutter APIs'],
  },
  {
    name: 'Seclob Insight & Connect',
    tag: 'Employee Monitoring System & HRMS Platform',
    color: '#47FF2D',
    live: true,
    highlights: [
      'Led 2-person team: lifted time-logging accuracy by 25%, cut unauthorized logins by 90%',
      'Complete HRMS: payroll, leave/attendance, company settings in Node.js, Express.js, React.js',
      'PayPal/Razorpay billing + JWT role-based access control',
    ],
    stack: ['Node.js', 'Express.js', 'React.js', 'Electron.js', 'MongoDB', 'PayPal', 'Razorpay'],
  },
]

const EXP = [
  {
    company: 'Team Tweaks Technologies',
    loc: 'Chennai',
    role: 'Software Developer',
    period: 'June 2025 – Present',
    points: [
      'Shipping full-stack features in React.js and Next.js, cutting page load times by 20% through code-splitting and lazy loading.',
      'Building REST APIs and backend services in Node.js/Express.js, supporting 5+ client-facing modules in production.',
    ],
  },
  {
    company: 'Seclob Technologies Pvt. Ltd',
    loc: 'Cyberpark Calicut',
    role: 'Full Stack Developer',
    period: 'June 2024 – May 2025',
    points: [
      'Delivered 10+ features across React.js, Node.js, Express.js, and MongoDB, ensuring seamless frontend-backend integration.',
      'Partnered with product, design, and QA teams to translate requirements into technical solutions, improving UX by 30%.',
    ],
  },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return [ref, inView]
}

function TypingRole() {
  const roles = ['Full-Stack Developer', 'Software Engineer', 'System Architect']
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    let timer;
    const fullText = roles[currentRoleIndex];
    
    const type = () => {
      if (!isDeleting) {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
        if (displayedText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
        } else {
          timer = setTimeout(type, 80);
        }
      } else {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(type, 100);
        } else {
          timer = setTimeout(type, 40);
        }
      }
    };
    
    timer = setTimeout(type, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral)', position: 'relative' }}>
      {displayedText}
      <span className="blinking-cursor" style={{ fontWeight: 500, color: 'var(--coral)' }}>|</span>
    </span>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['About', 'Experience', 'Skills', 'Projects', 'Contact']
  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2rem', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(8, 8, 12, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
      }}>
      <a href="#hero" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          K
          <span style={{ position: 'absolute', top: '-10%', left: '-20%', width: '140%', height: '120%', border: '2px solid var(--yellow)', borderRadius: '50%', pointerEvents: 'none' }} />
        </span>
        rishnadas
        <span style={{ color: 'var(--coral)' }}>.</span>
      </a>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="nav-links">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
            {l}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.8rem', alignItems: 'center' }} className="nav-actions">
        <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
          <span style={{ opacity: 0.3 }}>IN</span>
          <span style={{ opacity: 0.3 }}>/</span>
          <span style={{ borderBottom: '2px solid var(--text-primary)' }}>EN</span>
        </div>
        <a href="mailto:krishnadas10.official@gmail.com"
          style={{ padding: '0.65rem 1.4rem', borderRadius: 50, color: 'var(--white)', background: 'var(--coral)', fontSize: '0.88rem', transition: 'all 0.2s', fontWeight: 600 }}
          onMouseEnter={e => { e.target.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.5)'; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'translateY(0)' }}>
          krishnadas10.official@gmail.com
        </a>
      </div>

      <button onClick={() => setOpen(!open)} className="hamburger" style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: 'absolute', top: 72, left: 0, right: 0, background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>{l}</a>)}
            <a href="mailto:krishnadas10.official@gmail.com" style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 600 }}>hello@krishnadas.dev</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '6rem 2rem 4rem', background: 'var(--bg)' }}>
      {/* Light subtle grid pattern */}
      <div className="pattern-grid-lime" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 900 }}>
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '1rem', fontFamily: 'var(--font-sans)', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <span>👋</span> my name is Krishnadas and I am a <TypingRole />
        </motion.div>

        {/* The Stack Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: '2rem 0' }}>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 10vw, 7.8rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            textAlign: 'center',
            margin: 0,
            whiteSpace: 'nowrap'
          }}>
            Dev
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(35px, 8vw, 75px)',
              height: 'clamp(35px, 8vw, 75px)',
              borderRadius: '50%',
              border: '2px solid var(--text-primary)',
              background: 'var(--white)',
              margin: '0 0.3rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontSize: 'clamp(1rem, 3.2vw, 2.2rem)', fontWeight: 800, color: '#101018' }}>↗</span>
            </span>
            eloper
          </h1>

          <h1 className="text-outline" style={{
            fontSize: 'clamp(2rem, 10vw, 7.8rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            margin: 0,
            whiteSpace: 'nowrap'
          }}>
            & Engineer
          </h1>

        </motion.div>

        {/* Lower Info & Logos Row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', padding: '0 2rem', marginBottom: '2.5rem' }}>
          {/* Location */}
          <div style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            based in Kerala, India.
          </div>

          {/* Tech Partners / Logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.25rem', fontWeight: 600, opacity: 0.3 }}>node.js</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.06em', fontSize: '1.3rem', opacity: 0.3 }}>REACT</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, letterSpacing: '0.05em', fontSize: '1.15rem', opacity: 0.3 }}>docker</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '1.1rem', opacity: 0.3 }}>AWS</span>
          </div>
        </motion.div>

        {/* Bottom CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#contact"
            style={{
              padding: '0.9rem 2.2rem',
              borderRadius: '50px',
              background: 'var(--white)',
              color: '#08080C',
              fontWeight: 600,
              fontSize: '0.92rem',
              transition: 'all 0.2s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            You need a developer
          </a>
          <a href="#projects"
            style={{
              padding: '0.9rem 2.2rem',
              borderRadius: '50px',
              border: '1.5px solid var(--white)',
              background: 'transparent',
              color: 'var(--white)',
              fontWeight: 600,
              fontSize: '0.92rem',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)'; e.currentTarget.style.background = 'rgba(139,92,246,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'transparent' }}
          >
            You need a consultant
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, inView] = useReveal()
  const stats = [
    { n: '2+', label: 'Years Experience' },
    { n: '5+', label: 'Projects in Production' },
    { n: '30+', label: 'Technologies Mastered' },
    { n: '8+', label: 'Microservices Owned' },
  ]
  return (
    <section id="about" ref={ref} style={{ padding: '8rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>01.</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>About Me</h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: '1rem' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '1.05rem', fontWeight: 400 }}>
              I'm a Full Stack Developer with 2+ years of experience building complex, production-grade systems. My core expertise spans <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Node.js microservices</span>, <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>React/Next.js frontends</span>, and real-time infrastructure using Kafka, WebSocket, and Socket.IO.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '1.05rem', fontWeight: 400 }}>
              I've architected systems from the ground up — including IoT ingestion pipelines that handle multi-protocol telemetry, dual-camera live streaming services, and on-demand marketplace platforms handling concurrent bookings in production.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '1.05rem', fontWeight: 400 }}>
              Currently building at <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Team Tweaks Technologies, Chennai</span>, shipping full-stack features that improve performance and user experience across client-facing modules.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="mailto:krishnadas10.official@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}
                onMouseEnter={e => e.target.style.color = 'var(--coral)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>
                <Mail size={15} /> krishnadas10.official@gmail.com
              </a>
              <a href="tel:+919562779663" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}
                onMouseEnter={e => e.target.style.color = 'var(--coral)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}>
                <Phone size={15} /> +91-9562779663
              </a>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {stats.map(({ n, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="envato-card"
                style={{ padding: '2rem 1.5rem', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{n}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '0.6rem', fontWeight: 500 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const [ref, inView] = useReveal()
  return (
    <section id="experience" ref={ref} style={{ padding: '6rem 2rem 8rem', maxWidth: 900, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>02.</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Experience</h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: '1rem' }} />
        </div>
        <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
          {/* Thin gray timeline line */}
          <div style={{ position: 'absolute', left: 4, top: 10, bottom: 10, width: 1, background: 'var(--border)' }} />
          {EXP.map((e, i) => (
            <motion.div key={e.company} initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '4rem', position: 'relative' }}>
              {/* Styled dot */}
              <div style={{ position: 'absolute', left: -2.5 - 24, top: 8, width: 10, height: 10, borderRadius: '50%', background: 'var(--text-primary)', zIndex: 2 }} />
              <div style={{ marginLeft: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.6rem' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>{e.role}</span>
                    <span style={{ color: 'var(--coral)', margin: '0 0.5rem', fontWeight: 600 }}>@</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{e.company}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginLeft: '0.6rem', fontWeight: 400 }}>· {e.loc}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.8rem', padding: '0.2rem 0.8rem', border: '1px solid var(--border)', borderRadius: 50, background: 'var(--bg2)' }}>{e.period}</span>
                </div>
                <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {e.points.map(p => (
                    <li key={p} style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 400 }}>
                      <span style={{ color: 'var(--yellow)', marginTop: '0.55rem', flexShrink: 0, fontSize: '0.6rem' }}>■</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          {/* Education */}
          <motion.div initial={{ opacity: 0, x: -15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: -2.5 - 24, top: 8, width: 10, height: 10, borderRadius: '50%', background: 'var(--border)', zIndex: 2 }} />
            <div style={{ marginLeft: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '0.6rem' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>B.Tech — Mechanical Engineering</span>
                  <span style={{ color: 'var(--coral)', margin: '0 0.5rem', fontWeight: 600 }}>@</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>APJ Abdul Kalam Technological University</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.8rem', padding: '0.2rem 0.8rem', border: '1px solid var(--border)', borderRadius: 50, background: 'var(--bg2)' }}>Nov 2018 – May 2022</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginLeft: '1rem', fontWeight: 500 }}>CGPA: 6.3 / 10</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useReveal()
  return (
    <section id="skills" ref={ref} style={{ padding: '6rem 2rem 8rem', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>03.</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Skills & Technologies</h2>
            <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: '1rem' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {Object.entries(SKILLS).map(([cat, tags], ci) => {
              const Icon = SKILL_ICONS[cat]
              return (
                <motion.div key={cat} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 * ci, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="envato-card"
                  style={{ padding: '2.2rem 2rem', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 50, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color="var(--text-primary)" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{cat}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {tags.map((tag, idx) => (
                      <motion.span key={tag}
                        initial={{ opacity: 0, y: 8 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: ci * 0.05 + idx * 0.02, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 50, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', fontWeight: 500, transition: 'all 0.2s', cursor: 'default' }}
                        onMouseEnter={e => { e.target.style.background = 'var(--text-primary)'; e.target.style.color = '#101018' }}
                        onMouseLeave={e => { e.target.style.background = 'var(--bg)'; e.target.style.color = 'var(--text-primary)' }}>
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, inView] = useReveal()
  const [active, setActive] = useState(null)
  return (
    <section id="projects" ref={ref} style={{ padding: '8rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>04.</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Featured Projects</h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: '1rem' }} />
        </div>
        <div style={{ display: 'grid', gap: '2rem' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(active === i ? null : i)}
              className="envato-card"
              style={{
                padding: '2.5rem',
                border: '1px solid var(--border)',
                background: 'var(--bg2)',
                cursor: 'pointer',
                boxShadow: active === i ? '0 10px 30px rgba(0,0,0,0.05)' : '0 4px 18px rgba(0,0,0,0.01)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = active === i ? 'var(--text-primary)' : 'var(--border)';
              }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: active === i ? '1.5rem' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-primary)' }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.35rem', color: 'var(--text-primary)' }}>{p.name}</span>
                  {p.live && <span style={{ padding: '0.15rem 0.75rem', borderRadius: 50, background: 'var(--yellow)', color: 'var(--text-primary)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>LIVE</span>}
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{p.tag}</span>
                </div>
                <motion.span animate={{ rotate: active === i ? 180 : 0 }} transition={{ duration: 0.3 }}
                  style={{ color: 'var(--text-secondary)', display: 'flex' }}>
                  <ChevronDown size={18} />
                </motion.span>
              </div>
              <AnimatePresence>
                {active === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.8rem', marginTop: '0.8rem', borderTop: '1px solid var(--border)', paddingTop: '1.2rem' }}>
                      {p.highlights.map(h => (
                        <li key={h} style={{ display: 'flex', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 400 }}>
                          <span style={{ color: 'var(--coral)', flexShrink: 0, marginTop: '0.55rem', fontSize: '0.5rem' }}>■</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {p.stack.map(t => (
                        <span key={t} style={{ padding: '0.35rem 0.9rem', borderRadius: 50, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useReveal()
  const links = [
    { icon: Mail, label: 'Email', value: 'krishnadas10.official@gmail.com', href: 'mailto:krishnadas10.official@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91-9562779663', href: 'tel:+919562779663' },
    { icon: Github, label: 'GitHub', value: 'github.com/krishnadas', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/krishnadas', href: 'https://www.linkedin.com/in/krishnadas-eb/' },
  ]
  return (
    <section id="contact" ref={ref} style={{ padding: '6rem 2rem 8rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem', justifyContent: 'center' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>05.</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--text-primary)' }}>Get In Touch</h2>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3.5rem', fontSize: '1.05rem', fontWeight: 400 }}>
          I'm currently open to new opportunities. Whether you have a role in mind, a project to discuss, or just want to say hello — my inbox is open.
        </p>
        <a href="mailto:krishnadas10.official@gmail.com"
          style={{ display: 'inline-block', padding: '1rem 2.8rem', borderRadius: 50, color: 'var(--white)', background: 'var(--coral)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.98rem', marginBottom: '4.5rem', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
          Say Hello →
        </a>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {links.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              className="envato-card"
              style={{ padding: '1.5rem', border: '1px solid var(--border)', background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left', transition: 'all 0.2s', color: 'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
              <div style={{ width: 40, height: 40, borderRadius: 50, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color="var(--text-primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.15rem', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{value}</div>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
      <span>Designed & Built by </span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Krishnadas E B</span>
      <span> · Malappuram, Kerala</span>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @media (max-width: 991px) {
          .nav-links, .nav-actions { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 640px) {
          section > div > div[style*="grid-template-columns: 1.2fr 0.8fr"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {/* Floating Elements from mockup */}
      <a href="#contact" style={{ position: 'fixed', bottom: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '0.8rem 1.6rem', borderRadius: '50px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600, zIndex: 99, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <span>↗</span> Visit site
      </a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '50%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', cursor: 'pointer', color: 'var(--text-primary)', zIndex: 99, transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
      </button>
    </>
  )
}
