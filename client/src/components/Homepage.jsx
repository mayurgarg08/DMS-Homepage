import { useState, useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {
  Heart,
  Droplet,
  GraduationCap,
  Users,
  Leaf,
  Shirt,
  ShieldCheck,
  ArrowRight,
  Quote,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import presidentImg from "../assets/team/president.png";
import vpImg from "../assets/team/vp.jpg";
import vp2Img from "../assets/team/vp2.jpg";
import gsImg from "../assets/team/general-secretary.jpg";
import secretaryImg from "../assets/team/secretary.jpg";
import ambassadorImg from "../assets/team/brand-ambassador.png";
import executiveImg from "../assets/team/executive-member.png";
import legalImg from "../assets/team/legal-advisor.jpg";

import communityImg from "../assets/about/community-work.JPG";

import logo from "../assets/logo.png";
import img1 from "../assets/gallery/img-1.jpg";
import img2 from "../assets/gallery/img-2.jpg";
import img3 from "../assets/gallery/img-3.jpg";
import img4 from "../assets/gallery/img-4.jpg";
import img5 from "../assets/gallery/img-5.jpg";
import img6 from "../assets/gallery/img-6.JPG";
import img7 from "../assets/gallery/img-7.jpg";
import img8 from "../assets/gallery/img-8.jpg";
import img9 from "../assets/gallery/img-9.jpg";
import img10 from "../assets/gallery/img-10.jpg";
import img11 from "../assets/gallery/img-11.JPG";
import img12 from "../assets/gallery/img-12.JPG";

import bloodCamp1 from "../assets/hero/blood-camp-1.jpg";
import childEducation1 from "../assets/hero/child-education-1.jpg";
import seniorCitizen1 from "../assets/hero/senior-citizen-1.jpg";
import clothDistribution1 from "../assets/hero/cloth-distribution-1.jpg";

const PHONE = "+91 9810225442";
const EMAIL = "dmsaarohi@gmail.com";
const ADDRESS = "A5, 272, Paschim Vihar, New Delhi, India";

const SOCIAL_LINKS = {
  facebook: "https://facebook.com/dmsaarohi",
  instagram: "https://instagram.com/dmsaarohi",
  youtube: "https://www.youtube.com/@dmsaarohi5483",
  twitter: "https://twitter.com/dmsaarohi",
};

// Hero slider images — swap with real event photos (blood camps, etc.)
const HERO_SLIDES = [
  {
    image: bloodCamp1,
    title: "Every drop counts",
    subtitle:
      "Building a reliable chain of voluntary blood donors for patients in need, especially those battling Thalassemia.",
  },
  {
    image: childEducation1,
    title: "Educating today, empowering tomorrow",
    subtitle:
      "Creating platforms for underprivileged children to learn, grow and dream bigger.",
  },
  {
    image: seniorCitizen1,
    title: "Caring for those who cared for us",
    subtitle: "Bringing dignity, health and happiness to our senior citizens.",
  },
  {
    image: clothDistribution1,
    title: "Warmth that reaches far",
    subtitle:
      "Distributing clothes and essentials to families who need them the most.",
  },
];

// Impact / focus areas — mirrors DTH's "Categories" grid
const IMPACT_AREAS = [
  {
    icon: Droplet,
    title: "Blood Donation",
    desc: "Mass awareness camps and a verified donor network for emergencies.",
  },
  {
    icon: GraduationCap,
    title: "Child Education",
    desc: "Support and learning platforms for rural and urban underprivileged children.",
  },
  {
    icon: Users,
    title: "Senior Citizen Care",
    desc: "Programs that bring health, dignity and happiness to our elders.",
  },
  {
    icon: Leaf,
    title: "Environment Awareness",
    desc: "Drives and education programs for a cleaner, greener future.",
  },
  {
    icon: Shirt,
    title: "Cloth Distribution",
    desc: "Collecting and distributing clothes to families in need.",
  },
  {
    icon: ShieldCheck,
    title: "Beti Bachao Initiative",
    desc: "Campaigns promoting the protection and empowerment of the girl child.",
  },
];

// "How We Work" — mirrors DTH's 3-step "How To Participate"
const HOW_WE_WORK = [
  {
    step: "01",
    title: "We Identify",
    desc: "We identify communities and individuals who need support the most — through ground surveys and local volunteer networks.",
  },
  {
    step: "02",
    title: "We Organize",
    desc: "We plan and organize camps, drives and awareness programs with the help of our volunteers and partners.",
  },
  {
    step: "03",
    title: "We Deliver Impact",
    desc: "From blood units to books, clothes to care — we make sure help reaches the right hands, verified and on time.",
  },
];

const GALLERY_IMAGES = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

// Impact stats — animated counters
const STATS = [
  { value: 12, suffix: "+", label: "Years of Service" },
  { value: 25000, suffix: "+", label: "Blood Units Facilitated" },
  { value: 100, suffix: "+", label: "Camps & Drives Organized" },
  { value: 5000, suffix: "+", label: "Lives Touched" },
];

// Team members — replace with real team photos
const TEAM = [
  {
    name: "Pankaj Mathur",
    role: "President, DMS AAROHI",
    image: presidentImg,
  },
  {
    name: "Kapil Tiwari",
    role: "Vice President",
    image: vpImg,
  },
  {
    name: "Shalinder Kumar",
    role: "Vice President",
    image: vp2Img,
  },
  {
    name: "Dr. Bhawna Bhat",
    role: "General Secretary",
    image: gsImg,
  },
  {
    name: "Pratibha Asthana",
    role: "Secretary",
    image: secretaryImg,
  },
  {
    name: "Peehu Srivastava",
    role: "Brand Ambassador",
    image: ambassadorImg,
  },
  {
    name: "Shalini Lal",
    role: "Executive Member",
    image: executiveImg,
  },
  {
    name: "Sumit Kumar",
    role: "Legal Advisor",
    image: legalImg,
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Initiatives", href: "#initiatives" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

function Counter({ value, suffix = "", duration = 1800 }) {
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
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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

/** Wraps a section and fades/slides it in on scroll */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
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

function WaveDivider({ flip = false, color = "#FBF7F0" }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[90px]"
      >
        <path
          d="M0,40 C240,90 480,0 720,30 C960,60 1200,100 1440,40 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Hero autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () =>
    setActiveSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );

  return (
    <div className="font-body text-charcoal bg-cream overflow-x-hidden">
      {/* ============================ NAVBAR ============================ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-md py-1"
            : "bg-black/20 backdrop-blur-md py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="z-50 flex items-center">
            <img
              src={logo}
              alt="DMS Aarohi"
              className={`object-contain rounded transition-all duration-300 ${
                scrolled ? "h-10 md:h-12" : "h-12 md:h-14"
              }`}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-medium text-charcoal/80 hover:text-teal transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-coral transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#donate"
              className="px-6 py-2.5 rounded-full bg-coral text-cream font-semibold shadow-lg shadow-coral/30 hover:bg-coral-dark hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Donate Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden z-50 p-2 text-teal"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile nav drawer */}
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
              href="#donate"
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

      <section
        id="home"
        className="relative h-screen min-h-[600px] w-full overflow-hidden"
      >
        {/* Slides */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${
                i === activeSlide ? "animate-slow-zoom" : ""
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
          </div>
        ))}

        {/* Slide content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral/90 text-cream text-xs md:text-sm font-semibold uppercase tracking-[0.2em] mb-5 animate-fade-in-up">
            Registered Society &middot; 12A &amp; 80G Certified
          </span>
          <h1
            key={activeSlide}
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl text-cream leading-[1.1] max-w-3xl animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {HERO_SLIDES[activeSlide].title}
          </h1>
          <p
            className="mt-5 text-base md:text-xl text-cream/90 max-w-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {HERO_SLIDES[activeSlide].subtitle}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="#donate"
              className="group px-7 py-3.5 rounded-full bg-coral text-cream font-semibold shadow-xl shadow-coral/40 hover:bg-coral-dark hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              Become a Donor
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="px-7 py-3.5 rounded-full bg-cream/10 border border-cream/40 text-cream font-semibold backdrop-blur-sm hover:bg-cream/20 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute z-10 bottom-8 right-5 md:right-8 flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-cream/40 flex items-center justify-center text-cream hover:bg-cream/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
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

      {/* ============================ ABOUT ============================ */}
      <section id="about" className="relative bg-cream pt-20 md:pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Image collage */}
          <Reveal>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[4/5]">
                <img
                  src={communityImg}
                  alt="DMS AAROHI volunteers at a community event"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-teal text-cream rounded-2xl shadow-xl px-6 py-5 animate-float">
                <p className="font-display font-bold text-3xl md:text-4xl">
                  2013
                </p>
                <p className="text-xs md:text-sm uppercase tracking-wider text-cream/80">
                  Since
                </p>
              </div>
              {/* Decorative ring */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-gold rounded-full hidden md:block" />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={150}>
            <span className="inline-block text-coral font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              About Us
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-teal leading-tight mb-5">
              A mission to create real, lasting social
              <br /> change
            </h2>
            <p className="text-charcoal/75 leading-relaxed mb-4">
              DMS AAROHI is a New Delhi-based non-profit society, registered
              under 12A and 80G (5)(VI) of the Income Tax Act, 1961. Since 2013,
              we've worked to build a reliable backbone of voluntary blood
              donors — especially for Thalassemia patients — and to spread mass
              awareness about blood donation.
            </p>
            <p className="text-charcoal/75 leading-relaxed mb-8">
              Beyond healthcare, we focus on child education, senior citizen
              welfare, environmental awareness and campaigns like Beti Bachao —
              driven entirely by volunteers, partners and well-wishers who
              believe small, consistent efforts create lasting change.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">12A Registered</p>
                  <p className="text-sm text-charcoal/60">
                    Income Tax Act, 1961
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">80G (5)(VI)</p>
                  <p className="text-sm text-charcoal/60">
                    Tax-exempt donations
                  </p>
                </div>
              </div>
            </div>
            <a
              href="#initiatives"
              className="inline-flex items-center gap-2 mt-8 font-semibold text-teal hover:text-coral transition-colors group"
            >
              Explore our initiatives
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Reveal>
        </div>
      </section>

      <WaveDivider color="#0E5A52" />

      {/* ============================ STATS RIBBON ============================ */}
      <section className="bg-teal py-14 md:py-16 -mt-1">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <p className="font-display font-bold text-3xl md:text-5xl text-gold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-cream/80 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <WaveDivider flip color="#FBF7F0" />

      {/* ============================ IMPACT AREAS (like DTH "Categories") ============================ */}
      <section id="initiatives" className="bg-cream py-16 md:py-24 -mt-1">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-coral font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              What We Do
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-teal leading-tight">
              Choose a cause and see the change it creates
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.title} delay={i * 80}>
                  <div className="group relative bg-white rounded-2xl p-7 h-full border border-charcoal/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                    {/* Accent corner */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative w-14 h-14 rounded-xl bg-teal flex items-center justify-center mb-5 group-hover:bg-coral transition-colors duration-300">
                      <Icon className="w-7 h-7 text-cream" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-charcoal mb-2 relative">
                      {area.title}
                    </h3>
                    <p className="text-charcoal/65 leading-relaxed relative">
                      {area.desc}
                    </p>
                    <div className="mt-5 h-[2px] w-0 bg-coral group-hover:w-16 transition-all duration-300" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ HOW WE WORK (like DTH "How to participate") ============================ */}
      <section className="relative bg-teal py-16 md:py-24 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-cream rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-cream rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-gold rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              How We Work
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-cream leading-tight">
              Three steps that turn intention into impact
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-cream/20" />

            {HOW_WE_WORK.map((step, i) => (
              <Reveal key={step.step} delay={i * 150}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gold flex items-center justify-center font-display font-bold text-2xl text-teal shadow-xl mb-6 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-xl md:text-2xl text-cream mb-3">
                    {step.title}
                  </h3>
                  <p className="text-cream/75 leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PRESIDENT SPEAKS ============================ */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-center">
            <Reveal>
              <div className="relative mx-auto md:mx-0 w-56 md:w-full">
                <div className="rounded-full md:rounded-3xl overflow-hidden aspect-square shadow-2xl border-4 border-white">
                  <img
                    src={presidentImg}
                    alt="President, DMS AAROHI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-coral flex items-center justify-center shadow-lg">
                  <Quote className="w-7 h-7 text-cream" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <span className="inline-block text-coral font-semibold uppercase tracking-[0.25em] text-sm mb-3">
                President Speaks
              </span>
              <blockquote className="font-display text-xl md:text-3xl text-charcoal leading-relaxed mb-6">
                "Our purpose is deeply rooted in creating meaningful change in
                society. We believe true progress lies in uplifting those who
                need it the most and building a compassionate, inclusive
                community."
              </blockquote>
              <p className="text-charcoal/70 leading-relaxed mb-6">
                Through our initiatives in education, health awareness and
                social support, we strive to bring hope, dignity and opportunity
                to underserved sections of society. Every small effort is a step
                toward a brighter, more equitable future — and together with our
                volunteers, partners and well-wishers, we remain committed to
                making a lasting difference.
              </p>
              <div>
                <p className="font-display font-bold text-lg text-teal">
                  — President
                </p>
                <p className="text-charcoal/60">DMS AAROHI</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WaveDivider color="#0E5A52" />

      {/* ============================ GALLERY (like DTH "Media Gallery") ============================ */}
      <section id="gallery" className="bg-teal py-16 md:py-24 -mt-1">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              Media Gallery
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-cream leading-tight">
              Glimpses of our work on ground
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[160px] md:auto-rows-[200px]">
            {GALLERY_IMAGES.map((src, i) => (
              <Reveal
                key={src}
                delay={i * 60}
                className={`${
                  i === 0 ? "col-span-2 row-span-2" : ""
                } ${i === 5 ? "md:row-span-2" : ""}`}
              >
                <div className="relative h-full w-full rounded-2xl overflow-hidden group">
                  <img
                    src={src}
                    alt={`DMS AAROHI activity ${i + 1}`}
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

      {/* ============================ TEAM ============================ */}
      <section id="team" className="bg-cream py-16 md:py-24 -mt-1">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-coral font-semibold uppercase tracking-[0.25em] text-sm mb-3">
              Our Team
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-teal leading-tight">
              The people behind every initiative
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="group text-center">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex gap-2 justify-center">
                        <a
                          href={SOCIAL_LINKS.facebook}
                          className="w-8 h-8 rounded-full bg-cream/90 flex items-center justify-center hover:bg-coral hover:text-cream transition-colors"
                        >
                          <FaFacebook />
                        </a>
                        <a
                          href={SOCIAL_LINKS.instagram}
                          className="w-8 h-8 rounded-full bg-cream/90 flex items-center justify-center hover:bg-coral hover:text-cream transition-colors"
                        >
                          <FaInstagram />
                        </a>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-coral text-sm font-medium">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="donate"
        className="relative bg-coral py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cream/10 rounded-full" />
        <div className="absolute -bottom-24 -right-10 w-80 h-80 bg-cream/10 rounded-full" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-cream leading-tight mb-5">
              Your support can change a life today
            </h2>
            <p className="text-cream/90 text-lg max-w-xl mx-auto mb-8">
              Whether it's donating blood, volunteering your time, or
              contributing funds — every action helps us reach one more person
              in need. Donations are eligible for tax exemption under 80G.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-cream text-coral font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Donate Now
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-transparent border-2 border-cream text-cream font-bold hover:bg-cream/10 transition-all duration-200"
              >
                Become a Volunteer
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer id="contact" className="bg-charcoal text-cream pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                <Heart className="w-5 h-5 text-cream" />
              </div>
              <p className="font-display font-bold text-lg">DMS AAROHI</p>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-5">
              A registered non-profit society working since 2013 for blood
              donation, child education, senior citizen care, environment
              awareness and community welfare in New Delhi.
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-coral hover:border-coral transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-coral hover:border-coral transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-coral hover:border-coral transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:bg-coral hover:border-coral transition-colors"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick links */}
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

          {/* Initiatives */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">
              Our Initiatives
            </h4>
            <ul className="space-y-2 text-cream/70">
              {IMPACT_AREAS.slice(0, 5).map((area) => (
                <li key={area.title}>
                  <a
                    href="#initiatives"
                    className="hover:text-coral transition-colors"
                  >
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-coral flex-shrink-0" />
                <a
                  href={`tel:${PHONE}`}
                  className="hover:text-coral transition-colors"
                >
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-coral flex-shrink-0" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-coral transition-colors"
                >
                  {EMAIL}
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
    </div>
  );
}
