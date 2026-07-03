/**
 * shared.jsx — Reusable components for all DMS AAROHI initiative pages.
 * Rebuilt with:
 *  1) Hero slider with sliding controls (like Homepage)
 *  2) Compact About section with badge cards (like Homepage)
 *  3) Animated counter stats (like Homepage)
 *  4) Improved activity cards (icon + number treatment like Homepage)
 *  5) CTA section with image/icon beside text
 *  6) Bigger, image-backed Upcoming Events cards
 */

import { useState, useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import {
  Heart,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import logo from "../../assets/logo.png";

// ─── Constants ────────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/dmsaarohi",
  instagram: "https://instagram.com/dmsaarohi",
  youtube: "https://www.youtube.com/@dmsaarohi5483",
  twitter: "https://twitter.com/dmsaarohi",
};

export const CONTACT = {
  phone: "+91 9810225442",
  email: "dmsaarohi@gmail.com",
  address: "A5, 272, Paschim Vihar, New Delhi, India",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Our Initiatives", href: "/#initiatives" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

// ─── Utility Components ───────────────────────────────────────────────────────

/** Scroll-triggered fade-up reveal */
export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Animated count-up number — triggers on scroll into view */
export function Counter({ value, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const animate = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * value));
              if (progress < 1) requestAnimationFrame(animate);
              else setCount(value);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** SVG wave divider */
export function WaveDivider({ flip = false, color = "#FBF7F0" }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[55px] md:h-[80px]"
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,100 1440,40 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFF8F0]/95 backdrop-blur-md shadow-lg py-1"
          : "bg-black/10 backdrop-blur-sm py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="/" className="z-50 flex items-center">
          <img
            src={logo}
            alt="DMS AAROHI"
            className={`object-contain transition-all duration-300 ${
              scrolled ? "h-8 md:h-10" : "h-10 md:h-12"
            }`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative font-medium transition-colors group ${
                scrolled
                  ? "text-charcoal/80 hover:text-teal"
                  : "text-cream hover:text-gold"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-coral transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/#donate"
            className="px-6 py-2.5 rounded-full bg-coral text-cream font-semibold shadow-lg shadow-coral/30 hover:bg-coral-dark hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Donate Now
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="lg:hidden z-50 p-2 text-teal"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-72 bg-cream shadow-2xl transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1 pt-28 px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-charcoal/10 font-medium text-lg text-charcoal hover:text-teal hover:translate-x-1 transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#donate"
            onClick={() => setMenuOpen(false)}
            className="mt-6 text-center px-6 py-3 rounded-full bg-coral text-cream font-semibold shadow-lg"
          >
            Donate Now
          </a>
        </div>
      </div>
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-charcoal/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

const INITIATIVE_LINKS = [
  { label: "Blood Donation", href: "/initiatives/blood-donation" },
  { label: "Child Education", href: "/initiatives/child-education" },
  { label: "Beti Bachao", href: "/initiatives/beti-bachao" },
  { label: "Cloth Distribution", href: "/initiatives/cloth-distribution" },
  { label: "Senior Citizen Welfare", href: "/initiatives/senior-citizen" },
  { label: "Environment Awareness", href: "/initiatives/environment" },
];

export function SocialImpact({
  accentColor = "bg-coral",
  accentText = "text-coral",
  impact,
}) {
  if (!impact || !impact.points || impact.points.length === 0) return null;

  return (
    <section className="bg-cream py-14 md:py-18">
      <div className="max-w-6xl mx-auto px-5 md:px-8 ">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 ">
          <span
            className={`inline-block font-semibold uppercase tracking-[0.25em] text-lg mb-5 text-coral`}
          >
            Social Impact
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-teal leading-tight mb-5">
            {impact.title}
          </h2>
          {impact.subtitle && (
            <p className="text-charcoal/65 text-lg leading-relaxed">
              {impact.subtitle}
            </p>
          )}
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 relative">
          {/* Connector line for desktop — echoes Homepage "How We Work" */}
          <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-[1px] bg-charcoal/10" />

          {impact.points.map((point, i) => {
            const PointIcon = point.icon;
            return (
              <Reveal
                key={point.label}
                delay={i * 130}
                className="relative text-center group"
              >
                <div
                  className={`relative z-10 mx-auto w-[72px] h-[72px] rounded-full ${accentColor} shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}
                >
                  <PointIcon className="w-8 h-8 text-cream" />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-charcoal mb-2">
                  {point.label}
                </h3>
                <p className="text-charcoal/65 leading-relaxed max-w-xs mx-auto">
                  {point.description}
                </p>
                {/* Small accent underline */}
                <div
                  className={`mt-4 h-[2px] w-8 mx-auto rounded-full opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-300 ${accentColor}`}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <div className="mb-4">
            <img src={logo} alt="DMS AAROHI" className="h-10 object-contain" />
          </div>
          <p className="text-cream/60 text-sm leading-relaxed mb-5">
            A registered non-profit society working since 2013 for blood
            donation, child education, senior citizen care, environment
            awareness and community welfare in New Delhi.
          </p>
          <div className="flex gap-3">
            {[
              [SOCIAL_LINKS.facebook, <FaFacebook key="fb" />],
              [SOCIAL_LINKS.instagram, <FaInstagram key="ig" />],
              [SOCIAL_LINKS.youtube, <FaYoutube key="yt" />],
              [SOCIAL_LINKS.twitter, <FaTwitter key="tw" />],
            ].map(([href, icon], i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-coral hover:border-coral transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-cream/70">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-coral transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">
            Our Initiatives
          </h4>
          <ul className="space-y-2 text-cream/70">
            {INITIATIVE_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-coral transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-coral flex-shrink-0" />
              <a
                href={`tel:${CONTACT.phone}`}
                className="hover:text-coral transition-colors"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-coral flex-shrink-0" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-coral transition-colors"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-cream/50">
        <p>
          &copy; {new Date().getFullYear()} DMS AAROHI. All rights reserved.
        </p>
        <p>
          Registered under 12A &amp; 80G (5)(VI) of the Income Tax Act, 1961
        </p>
      </div>
    </footer>
  );
}

// ─── Initiative Page Template ─────────────────────────────────────────────────

/**
 * InitiativePage props:
 *   heroSlides       {Array<{image, title, subtitle}>}  — 3-4 slides for the hero slider
 *   heroTitle        {string}
 *   heroTagline      {string}
 *   accentColor      {string}   — Tailwind bg- class e.g. "bg-coral"
 *   accentText       {string}   — Tailwind text- class e.g. "text-coral"
 *   aboutText        {string[]} — paragraphs
 *   aboutImage       {string}   — side image for About section
 *   aboutBadges      {Array<{icon, label, sub}>} — 2 badge cards (like Homepage)
 *   activities       {string[]} — activity names
 *   galleryImages    {string[]} — 5-6 images
 *   statsRow         {Array<{value:number, suffix, label}>}  — numeric stats (animated)
 *   ctaTitle         {string}
 *   ctaBody          {string}
 *   ctaButtonLabel   {string}
 *   ctaButtonHref    {string}
 *   ctaSideImage     {string}   — image shown beside CTA text
 *   icon             {ReactNode} — Lucide icon component
 */

export function InitiativePage({
  heroSlides = [],
  heroTitle,
  heroTagline,
  accentColor = "bg-coral",
  accentText = "text-coral",
  aboutText = [],
  aboutImage,
  aboutBadges = [],
  activities = [],
  galleryImages = [],
  statsRow = [],
  ctaTitle,
  ctaBody,
  ctaButtonLabel,
  ctaButtonHref = "/#contact",
  ctaSideImage,
  socialImpact,
  icon: Icon,
}) {
  // ── Hero slider state ──
  const [activeSlide, setActiveSlide] = useState(0);
  const slides =
    heroSlides.length > 0
      ? heroSlides
      : [{ image: aboutImage, title: heroTitle, subtitle: heroTagline }];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="font-body text-charcoal bg-cream overflow-x-hidden">
      <Navbar />

      {/* ════════════════════════════════════════════════════
          1. HERO SLIDER — same controls as Homepage
          ════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${i === activeSlide ? "animate-slow-zoom" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/15" />
          </div>
        ))}

        {/* Slide content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center max-w-7xl mx-auto px-5 md:px-8 pt-20">
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cream text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-5 ${accentColor}/90 animate-fade-in-up`}
          >
            DMS AAROHI Initiative
          </span>
          <h1
            key={activeSlide}
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-cream leading-[1.05] max-w-3xl mb-5 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {slides[activeSlide].title || heroTitle}
          </h1>
          <p
            className="text-lg md:text-2xl text-cream/85 max-w-2xl leading-relaxed font-medium animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {slides[activeSlide].subtitle || heroTagline}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href={ctaButtonHref}
              onClick={(e) => {
                if (ctaButtonHref && ctaButtonHref.includes("#contact")) {
                  e.preventDefault();
                  window.location.href = ctaButtonHref;
                }
              }}
              className={`group px-7 py-3.5 rounded-full bg-coral text-cream font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2`}
            >
              {ctaButtonLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/#contact"
              className="px-7 py-3.5 rounded-full bg-cream/10 border border-cream/40 text-cream font-semibold backdrop-blur-sm hover:bg-cream/20 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Slide controls — identical to Homepage */}
        <div className="absolute z-10 bottom-8 right-5 md:right-8 flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 bg-coral" : "w-2 bg-cream/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll cue */}
        <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-cream/70 animate-bounce-slow">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-10 bg-cream/50" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. ABOUT — compact like Homepage about section
          ════════════════════════════════════════════════════ */}
      <section id="about" className="relative bg-cream pt-20 md:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Image collage */}
          <Reveal>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[4/5]">
                <img
                  src={aboutImage}
                  alt={heroTitle}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Gold decorative ring */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-gold rounded-full hidden md:block" />
              {/* Icon badge */}
              {Icon && (
                <div
                  className={`absolute -bottom-5 -right-5 w-16 h-16 rounded-2xl ${accentColor} shadow-xl flex items-center justify-center animate-float`}
                >
                  <Icon className="w-8 h-8 text-cream" />
                </div>
              )}
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={150}>
            <span
              className={`inline-block font-semibold uppercase tracking-[0.25em] text-sm mb-3 text-coral`}
            >
              About the Initiative
            </span>
            <h2 className="font-display font-bold text-3xl md:text-[42px] text-teal leading-tight mb-5">
              {heroTitle}
            </h2>
            <div className="space-y-6 mb-10">
              {aboutText.map((para, i) => (
                <p key={i} className="text-charcoal/75 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Badge cards — like Homepage 12A / 80G badges */}
            {aboutBadges.length > 0 && (
              <div className="flex flex-wrap gap-5 mb-2">
                {aboutBadges.map((badge, i) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          i % 2 === 0 ? "bg-teal/10" : "bg-coral/10"
                        }`}
                      >
                        <BadgeIcon
                          className={`w-6 h-6 ${i % 2 === 0 ? "text-teal" : "text-coral"}`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">
                          {badge.label}
                        </p>
                        <p className="text-sm text-charcoal/60">{badge.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. STATS — animated counters like Homepage
          ════════════════════════════════════════════════════ */}
      {/* {statsRow.length > 0 && (
        <>
          <WaveDivider color="#0E5A52" />
          <section className="bg-teal py-14 md:py-16 -mt-1">
            <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {statsRow.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <p className="font-display font-bold text-4xl md:text-[50px] text-gold">
                    <Counter value={s.value} suffix={s.suffix || ""} />
                  </p>
                  <p className="mt-2 text-cream/80 text-sm md:text-base font-medium">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
          <WaveDivider flip color="#FBF7F0" />
        </>
      )} */}

      {/* ════════════════════════════════════════════════════
          4. ACTIVITIES — improved cards like Homepage
          ════════════════════════════════════════════════════ */}
      <section className="bg-cream py-16 md:py-14 -mt-1">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              What We Do
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-teal leading-tight">
              {heroTitle} Activities
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, i) => {
              const ActivityIcon = activity.icon || CheckCircle2;
              return (
                <Reveal key={activity.title} delay={i * 80}>
                  <div className="group relative bg-white rounded-2xl p-7 h-full border border-charcoal/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    {/* Accent corner blob */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

                    {/* Icon box — activity-specific icon */}
                    <div
                      className={`relative w-14 h-14 rounded-xl bg-teal flex items-center justify-center mb-5 group-hover:bg-coral transition-colors duration-300 shadow-md`}
                    >
                      <ActivityIcon className="w-6 h-6 text-cream" />
                    </div>

                    {/* Step number */}
                    <span className="absolute top-5 right-6 font-display font-bold text-4xl text-charcoal/5 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-display font-bold text-xl text-charcoal mb-2 relative">
                      {activity.title}
                    </h3>

                    <p className="text-charcoal/65 leading-relaxed relative">
                      {activity.description}
                    </p>

                    {/* Animated underline on hover */}
                    <div
                      className={`mt-5 h-[2px] w-0 ${accentColor.replace("bg-", "bg-")} group-hover:w-16 transition-all duration-300`}
                      style={{
                        background:
                          accentColor === "bg-coral"
                            ? "#E8543E"
                            : accentColor === "bg-teal"
                              ? "#0E5A52"
                              : "#F4B740",
                      }}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          GALLERY
          ════════════════════════════════════════════════════ */}
      <WaveDivider color="#0E5A52" />
      <section className="bg-teal py-14 md:py-20 -mt-1">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-5xl mx-auto mb-14">
            <span className="inline-block text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              Media Gallery
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-cream leading-[1.2] md:leading-[1.15]">
              Glimpses of {heroTitle} work on ground
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[160px] md:auto-rows-[200px]">
            {galleryImages.map((src, i) => (
              <Reveal
                key={src}
                delay={i * 60}
                className={`${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 5 ? "md:row-span-2" : ""}`}
              >
                <div className="relative h-full w-full rounded-2xl overflow-hidden group">
                  <img
                    src={src}
                    alt={`${heroTitle} activity ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider flip color="#FBF7F0" />

      <SocialImpact
        accentColor={accentColor}
        accentText={accentText}
        impact={socialImpact}
      />

      {/* ════════════════════════════════════════════════════
          5. INITIATIVE-SPECIFIC CTA — with side image/icon
          ════════════════════════════════════════════════════ */}
      <section className="relative bg-coral py-16 md:py-20 overflow-hidden -mt-1">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-cream/10 rounded-full" />
        <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-cream/10 rounded-full" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <div
            className={`grid ${ctaSideImage ? "md:grid-cols-[1fr_340px]" : "md:grid-cols-1"} gap-10 md:gap-16 items-center`}
          >
            {/* Text side */}
            <Reveal>
              <span className="inline-block text-cream/75 font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                Take Action
              </span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-cream leading-tight mb-5">
                {ctaTitle}
              </h2>
              <p className="text-cream/90 text-lg leading-relaxed mb-8 max-w-xl">
                {ctaBody}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={ctaButtonHref}
                  onClick={(e) => {
                    if (ctaButtonHref && ctaButtonHref.includes("#contact")) {
                      e.preventDefault();
                      window.location.href = ctaButtonHref;
                    }
                  }}
                  className="group inline-flex items-center gap-2 px-9 py-4 rounded-full bg-cream text-coral font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {ctaButtonLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-transparent border-2 border-cream/60 text-cream font-bold hover:bg-cream/10 transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </Reveal>

            {/* Image/Icon side */}
            {ctaSideImage && (
              <Reveal delay={150} className="hidden md:block">
                <div className="relative">
                  <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                    <img
                      src={ctaSideImage}
                      alt={ctaTitle}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-charcoal/10" />
                  </div>
                  {/* Floating stat badge */}
                  <div className="absolute -bottom-5 -left-5 bg-cream rounded-2xl px-5 py-4 shadow-xl border border-charcoal/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-charcoal text-lg leading-none">
                          1,000+
                        </p>
                        <p className="text-charcoal/55 text-xs">
                          Lives Impacted
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
