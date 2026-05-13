import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, ReactNode } from "react";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Linkedin, 
  Instagram, 
  Mail, 
  Terminal, 
  Activity, 
  Cpu, 
  Globe2,
  ExternalLink
} from "lucide-react";

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const allMessages = ["INITIALIZING", "LOADING SYSTEMS", "SCANNING EXPERIENCES", "EXPLORING NEXT DIRECTIONS"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const messageInterval = setInterval(() => {
      setMessages(prev => {
        if (prev.length < allMessages.length) {
          return [...prev, allMessages[prev.length]];
        }
        return prev;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-bg z-[1000] flex flex-col items-center justify-center font-mono"
    >
      <div className="w-64 space-y-4">
        <div className="flex justify-between text-[10px] text-fg-muted tracking-widest">
          <span>SYSTEM BOOT</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
          <motion.div 
            className="h-full bg-accent relative z-10"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="h-20 flex flex-col gap-1 items-start">
          {messages.map((m, i) => (
            <motion.div 
              key={`loading-msg-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-accent flex items-center gap-2"
            >
              <Terminal size={10} />
              {m}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Experiments", path: "/experiments" },
    { name: "Now", path: "/now" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
      <Link to="/" className="text-fg font-display font-bold tracking-tighter text-xl">SH.</Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8">
        {links.map(link => (
          <Link 
            key={link.path}
            to={link.path}
            className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-accent ${
              location.pathname === link.path ? 'text-accent' : 'text-fg'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-fg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-bg text-fg flex flex-col items-center justify-center gap-8 md:hidden z-40"
          >
            {links.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-medium tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.main
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen"
  >
    {children}
  </motion.main>
);

// --- Pages ---

const Home = () => (
  <PageWrapper>
    <section className="space-y-24">
      <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-accent font-mono text-[10px] tracking-widest uppercase py-1 px-3 border border-accent/20 rounded-full bg-accent/5"
            >
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Sunny Hong
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-8xl font-display font-medium tracking-tighter leading-[0.9] max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Building the next chapter through AI & systems.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-fg-muted max-w-xl leading-relaxed"
            >
              Operator exploring the intersection of AI workflows, human-centered systems, and global opportunities.
            </motion.p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-full scale-75 group-hover:bg-accent/20 transition-all duration-1000 opacity-50" />
          <div className="aspect-[3/4] bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden relative group-hover:border-accent/30 transition-all duration-700 shadow-2xl">
            <img 
              src="/src/assets/images/regenerated_image_1778676462157.jpg" 
              alt="Sunny Hong" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6">
               <div className="flex justify-between items-end">
                 <div className="space-y-0.5">
                   <p className="text-[10px] font-mono text-accent uppercase tracking-widest">Operator</p>
                   <p className="text-xs font-display font-bold">Sunny Hong</p>
                 </div>
                 <Activity size={16} className="text-accent opacity-50" />
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-fg-muted font-mono text-[10px] uppercase tracking-widest">Currently Exploring</h2>
          <ul className="space-y-4">
            {[
              "AI workflows & Agents",
              "Human-centered systems",
              "Global opportunities",
              "Learning & operations",
              "Community-driven thinking"
            ].map((item, i) => (
              <motion.li 
                key={`focus-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-fg font-medium"
              >
                <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-6 p-8 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
           <h2 className="text-fg-muted font-mono text-[10px] uppercase tracking-widest">Introduction</h2>
           <p className="text-xl text-fg font-medium leading-relaxed relative z-10">
             I’m someone who learns by building, adapts quickly, and enjoys exploring how AI, systems, and human behavior intersect.
           </p>
           <Link 
            to="/about"
            className="inline-flex items-center gap-2 group text-accent font-medium text-sm border-b border-accent/20 hover:border-accent transition-all pb-1 translate-z-0"
           >
             Read trajectory <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>

      <div className="pt-24 space-y-12">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <h2 className="text-2xl font-display font-medium">Selected Experiments</h2>
          <Link to="/experiments" className="text-xs text-fg-muted hover:text-accent font-mono uppercase tracking-widest flex items-center gap-2 transition-colors">
            All experiments <ExternalLink size={12} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "AI English Diary", desc: "Redefining language acquisition through LLM-assisted reflection." },
            { title: "Adult Learning Systems", desc: "A modular framework for continuous skill acquisition in professional contexts." },
            { title: "AI Workflow Exploration", desc: "Documenting the transition from administrative manual work to agentic flows." }
          ].map((exp, i) => (
            <motion.div 
              key={`exp-card-${i}`}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6 transition-all hover:bg-white/[0.08] hover:border-accent/30 group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Terminal size={20} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-display font-medium">{exp.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageWrapper>
);

const About = () => (
  <PageWrapper>
    <div className="grid md:grid-cols-[1fr_300px] gap-20">
      <div className="space-y-20">
        <section className="space-y-6">
          <h1 className="text-5xl font-display font-medium tracking-tight">Trajectory</h1>
          <p className="text-xl text-fg-muted leading-relaxed">
            From educational entrepreneurship to systems thinking. My journey is defined by a curiosity for how humans learn and how machines can multiply that growth.
          </p>
        </section>

        <div className="space-y-16">
          <div className="relative pl-10 border-l-2 border-accent/20 space-y-4">
            <div className="absolute top-0 -left-[11px] w-5 h-5 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
            </div>
            <h2 className="text-xl font-display font-medium">Early Years</h2>
            <p className="text-fg-muted leading-relaxed">
              Living in the US provided a deep bilingual foundation and an intuitive understanding of global business cultures. It shifted my perspective from local to borderless.
            </p>
          </div>

          <div className="relative pl-10 border-l-2 border-accent/20 space-y-4">
            <div className="absolute top-0 -left-[11px] w-5 h-5 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-accent rounded-full" />
            </div>
            <h2 className="text-xl font-display font-medium">Building NOFILTER</h2>
            <p className="text-fg-muted leading-relaxed font-medium text-fg italic">
              "We didn't just teach English; we built a system for unfiltered communication."
            </p>
            <p className="text-fg-muted leading-relaxed">
              Running an education business taught me the grit of operations. I moved from being a practitioner to an architect of learning experiences.
            </p>
          </div>

          <div className="relative pl-10 border-l-2 border-accent/20 space-y-4">
            <div className="absolute top-0 -left-[11px] w-5 h-5 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--color-accent)]" />
            </div>
            <h2 className="text-xl font-display font-medium">Evolving Interests</h2>
            <p className="text-fg-muted leading-relaxed">
              The AI shift changed everything. I'm now focused on how LLMs can act as cognitive scaffolding, automating the mundane to accelerate the meaningful.
            </p>
          </div>
        </div>

        <section className="space-y-8 pt-10">
          <h2 className="text-2xl font-display font-medium">What I Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { t: "Experimentation over expertise", d: "Static knowledge is a liability in a world moving this fast." },
              { t: "Systems-first thinking", d: "Individual brilliance doesn't scale; well-designed systems do." },
              { t: "Global-mindedness", d: "Opportunities aren't geographic; they're cultural and technological." },
              { t: "Building over talking", d: "If it doesn't exist in the world, it's just a hypothesis." }
            ].map((val, i) => (
              <div key={`value-${i}`} className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <h3 className="font-display font-medium text-accent text-sm uppercase tracking-wide">{val.t}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{val.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-12 h-fit md:sticky md:top-32">
        <div className="space-y-4">
           <div className="aspect-[4/5] bg-white/10 rounded-2xl border border-white/20 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 group">
             <img 
               src="/src/assets/images/regenerated_image_1778676462157.jpg" 
               alt="Sunny Hong" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
           </div>
           <div className="space-y-2">
             <p className="text-[10px] font-mono text-accent uppercase tracking-widest">Sunny Hong</p>
             <p className="text-[10px] font-mono text-fg-muted uppercase tracking-widest">Seoul / Global</p>
           </div>
        </div>

        <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl space-y-4">
           <p className="text-xs font-mono text-accent uppercase tracking-[0.2em]">Keywords</p>
           <div className="flex flex-wrap gap-2">
             {["Curious", "Adaptable", "Thoughtful", "Systems-oriented", "Modern Operator"].map(k => (
               <span key={`keyword-${k}`} className="text-[10px] font-medium bg-white/5 px-2 py-1 rounded border border-white/10">{k}</span>
             ))}
           </div>
        </div>
      </aside>
    </div>
  </PageWrapper>
);

const Experiments = () => {
  const experiments = [
    {
      title: "AI English Diary",
      problem: "Traditional language journaling lacks immediate feedback and contextual depth for advanced learners.",
      tried: "Created a daily reflection workflow where GPT-4 serves as a recursive tutor, analyzing tone/nuance rather than just grammar.",
      tools: "GPT-4, Custom Prompt Framework, Notion Databases",
      learned: "Learners engage 40% more when the friction of 'not knowing what to say' is removed by AI co-piloting."
    },
    {
       title: "Adult Learning Systems",
       problem: "Professional learners often struggle with 'knowledge fragmentation' across silos.",
       tried: "Designed a modular dashboard that links reading, notes, and practical output.",
       tools: "Obsidian, System Mapping, Zettelkasten variant",
       learned: "Retention is a byproduct of relational structure, not repetitive review."
    },
    {
      title: "AI Workflow Exploration",
      problem: "Inefficiency in repetitive administrative tasks in education management.",
      tried: "Mapped manual operations and replaced 70% with semi-automated agentic scripts.",
      tools: "Make.com, OpenAI API, Slack integrations",
      learned: "AI isn't a replacement for quality; it's a multiplier for human decision-making speed."
    }
  ];

  return (
    <PageWrapper>
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-display font-medium tracking-tight">Thinking Archive</h1>
          <p className="text-fg-muted max-w-xl">
            A living record of what I'm testing. These aren't polished products—they are logs of a thinking process.
          </p>
        </div>

        <div className="space-y-24">
          {experiments.map((exp, i) => (
            <div key={`experiment-detail-${i}`} className="space-y-8 border-t border-white/10 pt-12">
              <h2 className="text-3xl font-display font-medium text-accent">{exp.title}</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-muted">The Problem</span>
                  <p className="leading-relaxed text-fg/80">{exp.problem}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-muted">What I Tried</span>
                  <p className="leading-relaxed text-fg/80">{exp.tried}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-muted">Systems & Tools</span>
                  <p className="leading-relaxed font-mono text-sm text-accent/80">{exp.tools}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-fg-muted">Key Learning</span>
                  <p className="leading-relaxed text-fg/80 italic font-medium">"{exp.learned}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

const Now = () => (
  <PageWrapper>
    <div className="max-w-2xl space-y-16">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted-green/10 text-accent rounded-full text-[10px] font-mono border border-accent/20">
          <Activity size={10} className="animate-pulse" /> CURRENTLY ACTIVE
        </div>
        <h1 className="text-4xl font-display font-medium tracking-tight">Now</h1>
        <p className="text-fg-muted italic">Updated May 2026. Inspired by Derek Sivers.</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-lg font-display flex items-center gap-3">
            <Globe2 size={18} className="text-accent" /> Focus & Opportunities
          </h2>
          <ul className="space-y-2 text-fg-muted">
            <li>• Exploring global operations and AI-integrated roles</li>
            <li>• Studying human-centered systems for modern teams</li>
            <li>• Building a daily experimental practice with LLM agents</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-display flex items-center gap-3">
            <Cpu size={18} className="text-accent" /> Thinking About
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "AI + Learning Flow",
              "Community as Infrastructure",
              "Future of Work Identity",
              "Modular Wisdom",
              "Cognitive Offloading"
            ].map((tag, i) => (
              <span key={`now-tag-${i}`} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs">
                # {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-display">Recently</h2>
          <p className="text-fg-muted leading-relaxed">
            Reading "Antifragile" (re-read) and exploring the intersection of creative coding and LLM-assisted frontend development. Testing how much of my mental overhead can be delegated to custom-built GPT agents.
          </p>
        </section>
      </div>
    </div>
  </PageWrapper>
);

const Contact = () => (
  <PageWrapper>
    <div className="min-h-[50vh] flex flex-col justify-center gap-12">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter">Let’s connect.</h1>
        <p className="text-xl text-fg-muted max-w-lg">
          Open to conversations, collaborations, and global opportunities.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-4">
           <a href="mailto:hsunny5@gmail.com" className="flex items-center gap-4 text-2xl hover:text-accent transition-colors group">
             <Mail size={24} className="text-fg-muted group-hover:text-accent" /> hsunny5@gmail.com
           </a>
           <a href="https://linkedin.com" target="_blank" className="flex items-center gap-4 text-2xl hover:text-accent transition-colors group">
             <Linkedin size={24} className="text-fg-muted group-hover:text-accent" /> LinkedIn
           </a>
           <a href="https://instagram.com" target="_blank" className="flex items-center gap-4 text-2xl hover:text-accent transition-colors group">
             <Instagram size={24} className="text-fg-muted group-hover:text-accent" /> Instagram
           </a>
        </div>
      </div>
    </div>
  </PageWrapper>
);

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <div className="relative min-h-screen pixel-grid overflow-x-hidden">
        <div className="scanline" />
        
        <AnimatePresence>
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navbar />
            <ScrollToTop />
            <AnimatePresence mode="wait">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/experiments" element={<Experiments />} />
                <Route path="/now" element={<Now />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </>
        )}
      </div>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
