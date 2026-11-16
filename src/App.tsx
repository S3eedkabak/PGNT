import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Download,
  Factory,
  GraduationCap,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  X,
} from "lucide-react";
import { TextMorph } from "./components/motion-primitives/text-morph";
import { AnimatedNumber } from "./components/motion-primitives/animated-number";
import {
  MorphingPopover,
  MorphingPopoverTrigger,
  MorphingPopoverContent,
} from "./components/motion-primitives/morphing-popover";
import ToolbarExpandable from "./components/motion-primitives/toolbar-expandable";
import { MorphButton } from "./components/spectrumui/morph-button";
import LoginCard from "./components/spectrumui/login-card";
import { Chart } from "./components/spectrumui/animated-chart";
import courses from "./courses.json";
import { matchesDuration, matchesSearch } from "./lib/catalog";

type Course = (typeof courses)[number];
const categories = [
  "All courses",
  "Safety",
  "Technical",
  "Heavy equipment",
  "Transport",
  "Food safety",
  "Professional",
];
const featuredIds = ["193", "142", "23", "53", "49", "96"];
const featured = featuredIds.map((id) => courses.find((c) => c.id === id)!);
const imageFor = (c: Course) =>
  c.category === "Professional"
    ? "050524_65.webp"
    : c.category === "Technical"
      ? "engineer-oil-refiner.webp"
      : c.category === "Heavy equipment"
        ? "engineer-oil-refiner.webp"
        : "050524_128.webp";

function Label({ children }: { children: string }) {
  return <TextMorph as="span">{children}</TextMorph>;
}
function Action({
  children,
  href,
  onClick,
  className = "btn",
  ...props
}: {
  children: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}) {
  return href ? (
    <a className={className} href={href} {...props}>
      <Label>{children}</Label>
      <ArrowUpRight size={17} />
    </a>
  ) : (
    <button className={className} onClick={onClick} {...props}>
      <Label>{children}</Label>
      <ArrowRight size={17} />
    </button>
  );
}
function Modal({
  children,
  onClose,
  label,
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
    const close = () => closeRef.current();
    el?.addEventListener("close", close);
    return () => {
      el?.removeEventListener("close", close);
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={label}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="modal-inner"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          className="icon-btn modal-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X size={21} />
        </button>
        {children}
      </motion.div>
    </dialog>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);
  const [stats, setStats] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All courses");
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(12);
  const [duration, setDuration] = useState("All durations");
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      const v = JSON.parse(localStorage.getItem("pngit-saved") || "[]");
      return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
    } catch {
      return [];
    }
  });
  const [storageError, setStorageError] = useState("");
  const [numbers, setNumbers] = useState(false);
  const hero = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNumbers(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (hero.current) obs.observe(hero.current);
    return () => obs.disconnect();
  }, []);
  const toggleSave = async (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    try {
      localStorage.setItem("pngit-saved", JSON.stringify(next));
      setSaved(next);
      setStorageError("");
    } catch {
      setStorageError(
        "Your browser could not save this course. Please allow local storage and try again.",
      );
      throw new Error("Storage unavailable");
    }
  };
  const goCourses = (q = "", cat = "All courses") => {
    setQuery(q);
    setCategory(cat);
    setExpanded(true);
    setLimit(12);
    setSavedOnly(false);
    setMenu(false);
    requestAnimationFrame(() =>
      document
        .getElementById("courses")
        ?.scrollIntoView({ behavior: "smooth" }),
    );
  };
  const filtered = courses.filter(
    (c) =>
      (category === "All courses" || c.category === category) &&
      (!savedOnly || saved.includes(c.id)) &&
      matchesDuration(c.duration, duration) &&
      matchesSearch(c, query),
  );
  const isFiltering =
    query !== "" ||
    category !== "All courses" ||
    savedOnly ||
    duration !== "All durations";
  const displayed =
    expanded || isFiltering ? filtered.slice(0, limit) : featured;
  const resetFilters = () => {
    setQuery("");
    setCategory("All courses");
    setDuration("All durations");
    setSavedOnly(false);
    setLimit(12);
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="utility">
        <div className="container">
          <span>
            <MapPin size={13} />
            Dammam, Saudi Arabia
          </span>
          <a href="mailto:info@pngit.edu.sa">info@pngit.edu.sa</a>
          <a href="tel:+966138393344">
            <Phone size={12} />
            +966 13 839 3344
          </a>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#" aria-label="PNGIT home">
            <img
              src="/assets/cropped-pngit-logo.webp"
              alt=""
              width="62"
              height="62"
            />
            <span>
              PNGIT
              <small>
                Petroleum & Natural Gas Institute
                <br />
                of Technology & Training
              </small>
            </span>
          </a>
          <nav
            className={menu ? "main-nav open" : "main-nav"}
            aria-label="Main navigation"
          >
            <a href="#programs" onClick={() => setMenu(false)}>
              Programs
            </a>
            <a
              href="#courses"
              onClick={() => {
                setMenu(false);
              }}
            >
              Courses
            </a>
            <a href="#corporate" onClick={() => setMenu(false)}>
              For businesses
            </a>
            <a href="#about" onClick={() => setMenu(false)}>
              About us
            </a>
            <a href="#contact" onClick={() => setMenu(false)}>
              Contact
            </a>
          </nav>
          <div className="nav-actions">
            <ToolbarExpandable onSearch={(q) => goCourses(q)} />
            <button
              className="login-btn"
              aria-label="Student login"
              onClick={() => setLogin(true)}
            >
              <Label>Student login</Label>
              <UserRound size={16} />
            </button>
            <button
              className="icon-btn menu-toggle"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero" ref={hero}>
          <div className="hero-photo">
            <img
              src="/assets/engineer-oil-refiner.webp"
              alt="Engineer holding a safety helmet beside an oil refinery"
              fetchPriority="high"
            />
            <div className="photo-caption">
              <span className="caption-line" />
              Practical knowledge. Real-world confidence.
            </div>
          </div>
          <div className="container hero-content">
            <div className="hero-copy">
              <h1>
                Skills for
                <br />
                the work <em>ahead.</em>
              </h1>
              <p>
                Technical and professional training in Saudi Arabia.
                <br />
                Build practical skills for your industry.
                <br className="desktop-break" /> Take the next step in your
                career.
              </p>
              <div className="hero-actions">
                <Action className="btn orange" onClick={() => goCourses()}>
                  Find your course
                </Action>
                <Action className="btn ghost-light" href="#corporate">
                  Train your team
                </Action>
              </div>
              <div className="hero-assurance">
                <ShieldCheck size={18} />
                <span>Saudi expertise. International standards.</span>
              </div>
            </div>
          </div>
        </section>
        <section className="stats-bar" aria-label="PNGIT at a glance">
          <div className="container stat-grid">
            {[
              { n: 17, s: "+", label: "Years of experience" },
              { n: 7500, s: "+", label: "Candidates trained" },
              { n: 15, s: "", label: "Accreditations" },
            ].map((s) => (
              <div className="stat" key={s.label}>
                <strong>
                  <AnimatedNumber
                    value={numbers ? s.n : 0}
                    springOptions={{ stiffness: 40, damping: 20 }}
                  />
                  {s.s}
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
            <div className="stat-source">
              <ShieldCheck size={26} />
              <div>
                <strong>A foundation you can trust.</strong>
                <span>Figures reported on PNGIT’s website.</span>
                <button className="text-link" onClick={() => setStats(true)}>
                  <Label>Explore our training</Label>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="accreditations" className="accreditation-strip">
          <div className="container">
            <div className="accreditation-intro">
              <p>
                Recognised by industry.
                <br />
                <strong>Trusted to train.</strong>
              </p>
              <a
                href="/assets/pngit-profile-2026.pdf#page=6"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                View accreditations <ArrowUpRight size={14} />
              </a>
            </div>
            <div className="partner-logos">
              {[
                ["tvtc", "Technical and Vocational Training Corporation"],
                ["aramco", "Saudi Aramco"],
                ["hrsd", "Ministry of Human Resources and Social Development"],
                ["tga", "Transport General Authority"],
                ["saso", "Saudi Standards, Metrology and Quality Organization"],
              ].map(([src, alt]) => (
                <img
                  key={src}
                  src={"/assets/" + src + ".png"}
                  alt={alt}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>
        <section id="programs" className="section programs">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>A path for every ambition.</h2>
                <p>
                  Specialist training, built around the skills your industry
                  needs.
                </p>
              </div>
              <a
                href="/assets/pngit-profile-2026.pdf"
                className="text-link"
                target="_blank"
                rel="noreferrer"
              >
                Explore our institute <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="program-grid">
              {[
                {
                  name: "Safety & compliance",
                  category: "Safety",
                  text: "Build safer workplaces and strengthen professional standards.",
                  icon: ShieldCheck,
                },
                {
                  name: "Technical & industrial",
                  category: "Technical",
                  text: "Practical skills for oil, gas, and industrial operations.",
                  icon: Factory,
                },
                {
                  name: "Heavy equipment",
                  category: "Heavy equipment",
                  text: "Develop the capability to operate and work with confidence.",
                  icon: HardHat,
                },
                {
                  name: "Professional development",
                  category: "Professional",
                  text: "Move your team forward with essential workplace skills.",
                  icon: GraduationCap,
                },
              ].map((p, i) => (
                <button
                  className="program-item"
                  key={p.name}
                  onClick={() => goCourses("", p.category)}
                >
                  <span className="program-top">
                    <p.icon size={27} strokeWidth={1.4} />
                    <span>0{i + 1}</span>
                  </span>
                  <h3>
                    <Label>{p.name}</Label>
                  </h3>
                  <p>{p.text}</p>
                  <span className="program-link">
                    Explore training <ArrowUpRight size={20} />
                  </span>
                </button>
              ))}
            </div>
            <div className="program-note">
              <span>
                <Check size={16} />
                Long-term qualifying programs from 6 months to 2 years.
              </span>
              <a href="#contact">
                Discuss your training needs <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>
        <section id="courses" className="section courses-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <h2>Make your next move.</h2>
                <p>Find the right training for where you want to go.</p>
              </div>
              <a
                className="text-link"
                href="/assets/training-list.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Download size={17} />
                Training list PDF
              </a>
            </div>
            <div className="catalog-tools">
              <div className="catalog-search">
                <Search size={19} />
                <label className="sr-only" htmlFor="catalog-query">
                  Search courses
                </label>
                <input
                  id="catalog-query"
                  placeholder="Search a course or skill…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLimit(12);
                  }}
                />
                {query && (
                  <button
                    className="icon-btn"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="filter-actions">
                <MorphingPopover>
                  <MorphingPopoverTrigger className="filter-trigger">
                    <SlidersHorizontal size={17} />
                    <Label>Filters</Label>
                    {duration !== "All durations" && (
                      <span className="filter-dot" />
                    )}
                  </MorphingPopoverTrigger>
                  <MorphingPopoverContent
                    className="filter-panel"
                    aria-label="Filter course duration"
                  >
                    <h3>Course duration</h3>
                    {["All durations", "1 day or less", "2 days or more"].map(
                      (d) => (
                        <button
                          key={d}
                          className={
                            duration === d
                              ? "filter-option selected"
                              : "filter-option"
                          }
                          onClick={() => {
                            setDuration(d);
                            setLimit(12);
                          }}
                        >
                          <Label>{d}</Label>
                          {duration === d && <Check size={16} />}
                        </button>
                      ),
                    )}
                  </MorphingPopoverContent>
                </MorphingPopover>
                <button
                  className={"filter-trigger " + (savedOnly ? "active" : "")}
                  onClick={() => {
                    setSavedOnly(!savedOnly);
                    setLimit(12);
                  }}
                  aria-pressed={savedOnly}
                >
                  <Bookmark size={17} />
                  <Label>
                    {savedOnly ? "Saved courses" : `Saved (${saved.length})`}
                  </Label>
                </button>
              </div>
            </div>
            <div className="category-tabs" aria-label="Training categories">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "category active" : "category"}
                  aria-pressed={category === c}
                  onClick={() => {
                    setCategory(c);
                    setLimit(12);
                  }}
                >
                  <Label>{c}</Label>
                </button>
              ))}
            </div>
            <div className="results-heading" aria-live="polite">
              <span>
                {expanded || isFiltering
                  ? `${filtered.length} courses found`
                  : "Explore selected courses"}
              </span>
              {isFiltering && (
                <button className="text-link" onClick={resetFilters}>
                  <Label>Clear filters</Label>
                  <X size={13} />
                </button>
              )}
            </div>
            <div className="course-grid">
              {displayed.map((c, i) => (
                <article className="course-card" key={c.id}>
                  <div className="course-photo">
                    <img src={"/assets/" + imageFor(c)} alt="" loading="lazy" />
                    <span className="course-category">{c.category}</span>
                    <button
                      className={
                        "save-icon " + (saved.includes(c.id) ? "is-saved" : "")
                      }
                      aria-label={
                        (saved.includes(c.id) ? "Unsave " : "Save ") + c.title
                      }
                      aria-pressed={saved.includes(c.id)}
                      onClick={() => toggleSave(c.id).catch(() => {})}
                    >
                      <Bookmark
                        size={19}
                        fill={saved.includes(c.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="course-info">
                    <div className="course-meta">
                      <Clock3 size={14} />
                      {c.duration}
                      <span>•</span>
                      <span>
                        {c.title.toLowerCase().includes("online")
                          ? "Online"
                          : "Training program"}
                      </span>
                    </div>
                    <h3>
                      <button onClick={() => setSelected(c)}>{c.title}</button>
                    </h3>
                    <div className="course-bottom">
                      <span>
                        {c.id === "193"
                          ? "Aramco prerequisite"
                          : c.title.includes("NEBOSH")
                            ? "NEBOSH qualification"
                            : c.title.includes("CWQAP")
                              ? "Workforce qualification"
                              : "Build your expertise"}
                      </span>
                      <button
                        aria-label={"View " + c.title}
                        onClick={() => setSelected(c)}
                      >
                        <ArrowUpRight size={22} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {storageError && (
              <p className="form-error" role="alert">
                {storageError}
              </p>
            )}
            {displayed.length === 0 && (
              <div className="empty-state">
                <Search size={30} />
                <h3>
                  {savedOnly && saved.length === 0
                    ? "Your shortlist starts here."
                    : "No courses found."}
                </h3>
                <p>
                  {savedOnly && saved.length === 0
                    ? "Save courses using the bookmark icon to compare them here."
                    : "Try a different course name or remove a filter."}
                </p>
                <button className="btn primary" onClick={resetFilters}>
                  <Label>Explore all courses</Label>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="catalog-bottom">
              <span>
                Course dates, fees, and availability are confirmed by our team.
              </span>
              {!expanded && !isFiltering ? (
                <Action
                  className="btn outline"
                  onClick={() => {
                    setExpanded(true);
                    setLimit(12);
                  }}
                >
                  View all courses
                </Action>
              ) : filtered.length > limit ? (
                <Action
                  className="btn outline"
                  onClick={() => setLimit(limit + 12)}
                >
                  Show more courses
                </Action>
              ) : null}
            </div>
          </div>
        </section>
        <section id="corporate" className="corporate">
          <div className="corporate-image">
            <img
              src="/assets/050524_65.webp"
              alt="Colleagues planning a tailored training program together"
              loading="lazy"
            />
          </div>
          <div className="corporate-copy">
            <h2>
              A stronger team.
              <br />A stronger business.
            </h2>
            <p>
              From a single specialist course to a complete workforce
              development program, we shape training around your people and your
              goals.
            </p>
            <ul>
              <li>
                <Check size={18} />
                Programs tailored to your operations
              </li>
              <li>
                <Check size={18} />
                Technical and professional development
              </li>
              <li>
                <Check size={18} />
                Practical skills aligned with industry needs
              </li>
            </ul>
            <Action className="btn orange" href="#contact">
              Let’s build your program
            </Action>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div>
              <h2>
                Saudi roots.
                <br />
                Industry perspective.
                <br />
                <span>Lasting impact.</span>
              </h2>
              <Action
                className="btn outline"
                href="/assets/pngit-profile-2026.pdf"
              >
                Meet PNGIT
              </Action>
            </div>
            <div className="about-copy">
              <p className="lead">
                We believe that better skills build a better future.
              </p>
              <p>
                The Petroleum & Natural Gas Institute of Technology & Training
                develops the people who keep industries moving. Based in Dammam,
                we combine theoretical knowledge with practical training for
                Saudi Arabia’s evolving workforce.
              </p>
              <div className="about-values">
                <div>
                  <h3>Our mission</h3>
                  <p>
                    Raise professional competence through skills, knowledge, and
                    the highest standards of quality and service.
                  </p>
                </div>
                <div>
                  <h3>Our values</h3>
                  <p>
                    Quality. Integrity. Partnership. Innovation. Continuous
                    growth.
                  </p>
                </div>
              </div>
              <a className="text-link" href="#accreditations">
                Explore our accreditations <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="faq-section section">
          <div className="container faq-grid">
            <div>
              <h2>
                A little clarity,
                <br />
                before you begin.
              </h2>
              <p>Have another question? Our team is here to help.</p>
              <a className="text-link" href="#contact">
                Get in touch <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="faq-list">
              {[
                [
                  "How do I enrol in a course?",
                  "Find a course, open its details, and choose “Enquire about this course”. Our training team will confirm dates, fees, prerequisites, and the registration process.",
                ],
                [
                  "Can you arrange training for our company?",
                  "Yes. PNGIT offers standard and custom-tailored programs for governmental, semi-governmental, and private sector organisations. Contact us with your training goals and team size.",
                ],
                [
                  "Where does the training take place?",
                  "PNGIT is based in Dammam, Saudi Arabia. Some courses are listed as online. Confirm the delivery location and format with our team before booking.",
                ],
                [
                  "Do you offer long-term qualifying programs?",
                  "Yes. The 2026 institute profile describes qualifying programs lasting from six months to two years, combining theoretical and practical training for a range of industrial sectors.",
                ],
              ].map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <h2>
                Your potential.
                <br />
                Our starting point.
              </h2>
              <p>
                Tell us where you want to go.
                <br />
                We’ll help you find the right training to get there.
              </p>
              <div className="contact-links">
                <a href="tel:+966138393344">
                  <Phone size={20} />
                  <span>
                    Call our team<strong>+966 13 839 3344</strong>
                  </span>
                  <ArrowUpRight size={20} />
                </a>
                <a href="mailto:info@pngit.edu.sa">
                  <Mail size={20} />
                  <span>
                    Email us<strong>info@pngit.edu.sa</strong>
                  </span>
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
            <EnquiryForm saved={saved} onSelect={goCourses} />
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <img
                src="/assets/cropped-pngit-logo.webp"
                alt="PNGIT"
                width="70"
                height="70"
              />
              <p>
                Petroleum & Natural Gas Institute
                <br />
                of Technology & Training
              </p>
            </div>
            <div>
              <strong>Explore</strong>
              <a href="#programs">Our programs</a>
              <a href="#courses">Find a course</a>
              <a href="#corporate">Corporate training</a>
            </div>
            <div>
              <strong>PNGIT</strong>
              <a href="#about">About the institute</a>
              <a href="#accreditations">Accreditations</a>
              <button onClick={() => setLogin(true)}>
                Student login <ArrowUpRight size={12} />
              </button>
            </div>
            <div className="footer-location">
              <strong>Visit us</strong>
              <p>
                Offices 1–4, 2nd floor
                <br />
                Al Waha Downtown
                <br />
                Prince Muhammed Ibn Saud District
                <br />
                Dammam 32431-2614, Saudi Arabia
              </p>
              <a
                href="https://www.linkedin.com/showcase/pngitsaudi/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} PNGIT. All rights reserved.
            </span>
            <div>
              <a href="https://pngit.edu.sa/privacy-policy/">Privacy policy</a>
              <a href="https://pngit.edu.sa/return-and-exchange-policy/">
                Return & exchange policy
              </a>
              <a href="#">Back to top ↑</a>
            </div>
          </div>
        </div>
      </footer>
      {login && (
        <Modal label="Student login" onClose={() => setLogin(false)}>
          <LoginCard />
        </Modal>
      )}
      {stats && (
        <Modal
          label="PNGIT training statistics"
          onClose={() => setStats(false)}
        >
          <div className="detail-content">
            <h2>Training at a glance.</h2>
            <p>
              {courses.length} catalogue listings across six training areas,
              consolidated from the 195 rows in the supplied Training List.
            </p>
            <Chart
              data={categories.slice(1).map((label) => ({
                label,
                value: courses.filter((c) => c.category === label).length,
              }))}
            />
            <a
              className="text-link"
              href="/assets/training-list.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Read the source training list <ArrowUpRight size={16} />
            </a>
          </div>
        </Modal>
      )}
      {selected && (
        <Modal label={selected.title} onClose={() => setSelected(null)}>
          <div className="detail-photo">
            <img src={"/assets/" + imageFor(selected)} alt="" />
          </div>
          <div className="detail-content">
            <span className="detail-category">{selected.category}</span>
            <h2>{selected.title}</h2>
            <div className="detail-meta">
              <Clock3 size={18} />
              {selected.duration}
              <span>•</span>PNGIT training
            </div>
            <p>
              {selected.id === "193"
                ? "A four-day Saudi Aramco prerequisite program covering hazard recognition and control, confined space entry, and lockout/tagout, followed by a final examination."
                : "Explore this program with our training team. We’ll help you confirm the course content, eligibility, delivery format, and next available dates."}
            </p>
            <div className="detail-note">
              <ShieldCheck size={22} />
              <p>
                Before you book
                <br />
                <span>
                  Dates, fees, language, prerequisites, and certificate details
                  are confirmed directly by PNGIT.
                </span>
              </p>
            </div>
            <div className="detail-actions">
              <Action
                className="btn primary"
                href={
                  "mailto:info@pngit.edu.sa?subject=" +
                  encodeURIComponent("Course enquiry: " + selected.title)
                }
              >
                Enquire about this course
              </Action>
              <MorphButton
                className="save-morph"
                onAction={() => toggleSave(selected.id)}
                loadingLabel="Saving"
                successLabel="Shortlist updated"
                errorLabel="Try again"
              >
                <Bookmark size={16} />
                <Label>
                  {saved.includes(selected.id)
                    ? "Remove from saved"
                    : "Save course"}
                </Label>
              </MorphButton>
            </div>
            {storageError && (
              <p role="alert" className="form-error">
                {storageError}
              </p>
            )}
            <a
              className="text-link source-link"
              href={"/assets/training-list.pdf#page=" + selected.sourcePage}
              target="_blank"
              rel="noreferrer"
            >
              Training list · row {selected.sourceRows.join(", ")}{" "}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Modal>
      )}
    </>
  );
}
function EnquiryForm({
  saved,
  onSelect,
}: {
  saved: string[];
  onSelect: (q?: string) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [restored, setRestored] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const save = () => {
    if (!form.current?.reportValidity())
      throw Error("Please complete the form");
    try {
      localStorage.setItem(
        "pngit-enquiry",
        JSON.stringify({ name, email, goal }),
      );
      setRestored(true);
      setMessage(
        "Your enquiry draft is saved on this device. Choose “Open email enquiry” to send it to PNGIT.",
      );
    } catch {
      setMessage(
        "Your browser could not save this draft. You can still open an email enquiry.",
      );
      throw Error("Cannot save");
    }
  };
  const restore = () => {
    try {
      const d = JSON.parse(localStorage.getItem("pngit-enquiry") || "null");
      if (d) {
        setName(d.name || "");
        setEmail(d.email || "");
        setGoal(d.goal || "");
        setRestored(true);
        setMessage("Saved draft restored.");
      } else setMessage("No saved enquiry draft on this device.");
    } catch {
      setMessage("The saved draft could not be read.");
    }
  };
  const send = () => {
    if (!form.current?.reportValidity()) return;
    const titles = courses
      .filter((c) => saved.includes(c.id))
      .map((c) => c.title)
      .join("\n");
    window.location.href =
      "mailto:info@pngit.edu.sa?subject=" +
      encodeURIComponent("Training enquiry — " + name) +
      "&body=" +
      encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nTraining needs:\n${goal}${titles ? "\n\nShortlisted courses:\n" + titles : ""}`,
      );
    setMessage(
      "Your email app will open with your enquiry. Please review and send it there.",
    );
  };
  return (
    <form
      className="enquiry-form"
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <div className="form-heading">
        <h3>Find your training.</h3>
        <button
          className="text-link"
          type="button"
          onClick={
            restored
              ? () => {
                  try {
                    localStorage.removeItem("pngit-enquiry");
                    setName("");
                    setEmail("");
                    setGoal("");
                    setRestored(false);
                    setMessage("Saved enquiry draft cleared from this device.");
                  } catch {
                    setMessage("Your browser could not clear the draft.");
                  }
                }
              : restore
          }
        >
          <Label>{restored ? "Clear draft" : "Restore draft"}</Label>
        </button>
      </div>
      <div className="form-row">
        <label>
          Your name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Full name"
            maxLength={120}
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={200}
          />
        </label>
      </div>
      <label>
        What would you like to achieve?
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          rows={3}
          placeholder="A course, a new qualification, or training for your team…"
          maxLength={3000}
        />
      </label>
      {saved.length > 0 && (
        <button
          type="button"
          className="shortlist-note"
          onClick={() => onSelect()}
        >
          <Bookmark size={15} />
          {saved.length} saved courses will be included in your email.
        </button>
      )}
      <div className="form-actions">
        <button className="btn primary" type="submit">
          <Label>Open email enquiry</Label>
          <ArrowUpRight size={17} />
        </button>
        <MorphButton
          className="save-morph"
          onAction={save}
          loadingLabel="Saving"
          successLabel="Draft saved"
          errorLabel="Check details"
        >
          <Label>Save draft</Label>
        </MorphButton>
      </div>
      <p className="small">
        Opens your email app. Drafts stay on this device until you choose to
        send. <a href="https://pngit.edu.sa/privacy-policy/">Privacy policy</a>
      </p>
      {message && (
        <p className="form-message" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
