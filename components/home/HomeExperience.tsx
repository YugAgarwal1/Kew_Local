"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ArrowUpRight, Download, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products } from "@/lib/products";

const CustomImage = ({ src, alt, className, fill = false, loading = "lazy", ...props }: { src: string; alt: string; className?: string; fill?: boolean; loading?: "lazy" | "eager"; [key: string]: any }) => {
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  
  if (fill) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img src={src} alt={alt} loading={loading} className={`absolute inset-0 w-full h-full ${className || ''}`} {...props} />
      </picture>
    );
  }
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} loading={loading} className={className} {...props} />
    </picture>
  );
};

const enquiry = "https://kewelectricals.com/contact-us";
const aboutStages = [
  {
    number: "01",
    label: "Our beginning",
    title: <>It began in <span>1961.</span></>,
    body: "Founded by Shri Natverlal Virchand Shah in Mumbai, Kusum Engineering Works began with a vision to manufacture dependable electrical power distribution products in India.",
    image: "/images/team-event.png",
    alt: "KEW Electricals presence at an industry exhibition",
    position: "object-center",
    fit: "object-cover",
  },
  {
    number: "02",
    label: "Engineering expertise",
    title: <>Built through engineering.</>,
    body: "Over the decades, KEW developed a diverse range of switchgear, fusegear, controlgear and electrical distribution solutions.",
    image: "/images/factory-floor.png",
    alt: "KEW Electricals switchgear exhibition display",
    position: "object-center",
    fit: "object-cover",
  },
  {
    number: "03",
    label: "Our reach",
    title: <>From Mumbai to wider markets.</>,
    body: "With four manufacturing units and a trading house, KEW continues serving electrical engineering requirements in India and international markets.",
    image: "/images/about/export-map.png",
    alt: "KEW Electricals export map",
    position: "object-center",
    fit: "object-contain",
  },
];
const engineeringPillars = [
  {
    title: "Application clarity",
    copy: "A product range organized around changeover, protection, distribution and control requirements.",
  },
  {
    title: "Configurable systems",
    copy: "Multiple enclosure, switchboard and distribution formats for varied electrical environments.",
  },
  {
    title: "Dependable selection",
    copy: "Clear product information and direct technical conversations to support confident specification.",
  },
];

gsap.registerPlugin(ScrollTrigger, useGSAP);


export default function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = products[active];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const handleProductKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = products.length - 1;
    let next = active;

    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    setActive(next);
    requestAnimationFrame(() => root.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus());
  };

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    const intro = gsap.from("[data-hero]", { y: 28, duration: 1.05, stagger: 0.1, ease: "power3.out" });
    void intro;

    mm.add("(min-width: 768px)", () => {
      const heroTimeline = gsap.timeline({
        scrollTrigger: { trigger: "[data-hero-section]", start: "top top", end: "bottom top", scrub: 1 },
      });
      heroTimeline.to("[data-hero-grid]", { scale: 1.1, opacity: 0.1, ease: "none" }, 0);

      const storyImages = gsap.utils.toArray<HTMLElement>("[data-about-image]");
      const storyStages = gsap.utils.toArray<HTMLElement>("[data-about-stage]");
      let activeStoryStage = 0;

      gsap.set(storyImages, { opacity: 0, scale: 1.025, zIndex: 1 });
      gsap.set(storyImages[0], { opacity: 1, scale: 1, zIndex: 5 });
      storyStages[0]?.classList.add("is-active");

      const activateStoryStage = (index: number) => {
        if (index === activeStoryStage || !storyImages[index]) return;

        const previousImage = storyImages[activeStoryStage];
        const nextImage = storyImages[index];
        storyStages.forEach((stage, stageIndex) => stage.classList.toggle("is-active", stageIndex === index));

        gsap.set(nextImage, { zIndex: 6, visibility: "visible" });
        gsap.to(nextImage, { opacity: 1, scale: 1, duration: 0.48, ease: "power2.out", overwrite: true });
        gsap.to(previousImage, {
          opacity: 0,
          scale: 1.018,
          duration: 0.38,
          delay: 0.12,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => gsap.set(previousImage, { zIndex: 1 }),
        });

        activeStoryStage = index;
      };

      const storyStageTriggers = storyStages.slice(1).map((stage, index) => ScrollTrigger.create({
        trigger: stage,
        start: "top 58%",
        onEnter: () => activateStoryStage(index + 1),
        onLeaveBack: () => activateStoryStage(index),
      }));

      const storyProgress = gsap.fromTo("[data-about-progress]", { scaleY: 0 }, {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: { trigger: "[data-about-timeline]", start: "top 58%", end: "bottom 42%", scrub: 0.45 },
      });

      gsap.timeline({ scrollTrigger: { trigger: "[data-product-section]", start: "top 80%", end: "bottom 20%", scrub: 0.9 } })
        .fromTo("[data-product-section] > .shell > div:first-child", { yPercent: 4 }, { yPercent: 0, ease: "none" }, 0);

      gsap.timeline({ scrollTrigger: { trigger: "[data-manufacturing]", start: "top 82%", end: "center 40%", scrub: 0.9 } })
        .fromTo("[data-manufacturing-image]", { clipPath: "inset(10% 8% 10% 8%)", scale: 1.18 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1.05, ease: "none" }, 0)
        .fromTo("[data-manufacturing-copy]", { yPercent: 16, opacity: 0.3 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.1);

      gsap.timeline({ scrollTrigger: { trigger: "[data-featured]", start: "top 78%", end: "bottom 35%", scrub: 0.8 } })
        .fromTo("[data-featured-image]", { yPercent: 3, scale: 0.98 }, { yPercent: -2, scale: 1.01, ease: "none" }, 0)
        .fromTo("[data-featured-copy]", { xPercent: 3 }, { xPercent: 0, ease: "none" }, 0.08);

      gsap.timeline({ scrollTrigger: { trigger: "[data-heritage]", start: "top 80%", end: "center 42%", scrub: 0.85 } })
        .fromTo("[data-heritage-year]", { yPercent: 8 }, { yPercent: 0, ease: "none" }, 0)
        .fromTo("[data-heritage-rule]", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", ease: "none" }, 0.08)
        .fromTo("[data-heritage-item]", { y: 24 }, { y: 0, stagger: 0.08, ease: "none" }, 0.15);

      gsap.timeline({ scrollTrigger: { trigger: "[data-quality]", start: "top 84%", end: "bottom 30%", scrub: 0.8 } })
        .fromTo("[data-quality-image]", { scale: 1.12 }, { scale: 1.02, ease: "none" }, 0)
        .fromTo("[data-quality-copy]", { yPercent: 13, opacity: 0.35 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.12);

      return () => {
        storyStageTriggers.forEach((trigger) => trigger.kill());
        storyProgress.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-mobile-scroll]").forEach((element) => {
        gsap.fromTo(element, { y: 18 }, { y: 0, ease: "none", scrollTrigger: { trigger: element, start: "top 92%", end: "top 64%", scrub: 0.65 } });
      });
    });

    return () => mm.revert();
  }, { scope: root });

  return <div ref={root} className="bg-[#f4f4f1] text-[#111317]">
    <header className="site-header absolute inset-x-0 top-0 z-50 border-b border-white/15 text-white">
      <div className="shell flex h-20 items-center justify-between">
        <a href="#top" aria-label="KEW Electricals home" className="brand-mark relative z-10 block h-11 w-[90px] overflow-hidden"><CustomImage src="/images/kew-logo.png" alt="KEW Electricals" fill loading="eager" className="object-contain" /></a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.16em] lg:flex"><a className="nav-link" href="#products">Products</a><a className="nav-link" href="#engineering">Engineering</a><a className="nav-link" href="#legacy">Legacy</a><a className="nav-link" href="#contact">Contact</a></nav>
        <a href={enquiry} className="header-enquiry hidden px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] lg:block">Send an enquiry</a>
        <button className="mobile-menu-toggle fixed right-4 top-3 z-[60] grid h-11 w-11 place-items-center lg:hidden" aria-label="Toggle navigation" aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
    {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-menu lg:hidden">
        <div className="mobile-menu-heading">
          <p className="mobile-menu-label">Explore KEW</p>
          <span>Electrical engineering since 1961</span>
        </div>
        <div className="mobile-menu-list">
          {[
            ["About us", "#story"],
            ["Products", "#products"],
            ["Engineering", "#engineering"],
            ["Our legacy", "#legacy"],
            ["Contact", "#contact"],
          ].map(([label, href]) => <a key={href} className="mobile-menu-link" href={href} onClick={() => setMenuOpen(false)}><strong>{label}</strong><ArrowUpRight aria-hidden="true" size={16} /></a>)}
        </div>
        <a className="mobile-menu-enquiry" href={enquiry}>Start an enquiry <ArrowRight size={17} /></a>
      </nav>}

    <main id="top">
      <section data-hero-section className="relative min-h-screen overflow-hidden bg-[#111317] text-white">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/images/industrial-hero.png" aria-label="KEW engineering background video">
          <source src="/video/kew-industrial-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div data-hero-grid className="hero-video-grid" />
        <div className="hero-shell shell relative flex min-h-screen items-end pb-24 pt-32 lg:items-center lg:py-28">
          <div className="hero-content z-10 max-w-[760px] pb-3 lg:pb-0">
            <p data-hero data-hero-kicker className="hero-kicker mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58"><span className="h-px w-9 bg-[#e52529]" />Trusted low voltage solutions since 1961</p>
            <h1 data-hero data-hero-title className="hero-heading font-display font-medium tracking-[-.06em]">Engineering<br /><span className="hero-power">Power.</span><br /><span className="hero-reliability">Defining<br className="mobile-hero-break" /> Reliability.</span></h1>
            <div data-hero data-hero-copy className="mt-7 max-w-md border-l border-[#e52529] pl-6">
              <p className="text-[16px] leading-7 text-white/88">Electrical distribution and control solutions engineered for dependable performance.</p>
              <div className="hero-actions">
                <a href="#products" className="hero-cta">Explore products <ArrowRight size={16} strokeWidth={2} /></a>
                <a href="#story" className="hero-story-link">Our story <ArrowRight size={14} /></a>
              </div>
            </div>
          </div>
        </div>
        <a href="#products" className="hero-scroll-cue" aria-label="Scroll to explore products"><span>Scroll to explore</span><i /></a>
      </section>

      <section id="story" data-story-section aria-labelledby="company-story-title" className="about-story section-pad">
        <div className="shell">
          <div className="about-intro">
            <h2 id="company-story-title">A legacy built on engineering<br /><span>excellence.</span></h2>
          </div>
          <div className="about-layout">
            <div className="about-media" aria-hidden="true">
              <div className="about-media-sticky">
                {aboutStages.map((stage, index) => (
                  <div key={stage.number} data-about-image className={`about-image ${index === 0 ? "is-first" : ""}`}>
                    <CustomImage src={stage.image} alt="" fill className={`${stage.fit} ${stage.position}`} sizes="(max-width: 900px) 100vw, 55vw" />
                    <div className="about-image-shade" />
                    <div className="about-image-caption"><span>{stage.number}</span><p>{stage.label}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div data-about-timeline className="about-timeline">
              <div className="about-line" aria-hidden="true"><i data-about-progress /></div>
              {aboutStages.map((stage, index) => (
                <article key={stage.number} data-about-stage className={`about-stage ${index === 0 ? "is-active" : ""}`}>
                  <div className="about-stage-media" aria-hidden="true"><CustomImage src={stage.image} alt="" fill className={`${stage.fit} ${stage.position}`} sizes="100vw" /></div>
                  <p className="eyebrow">{stage.number} / {stage.label}</p>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="products" data-product-section className="product-explorer py-20 md:py-28">
        <div className="shell">
          <div data-reveal className="product-heading mb-10 grid gap-8 border-b pb-10 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <p className="eyebrow product-eyebrow"><span />Product systems</p>
              <h2 className="section-title mt-5">Engineered for every electrical <span>need.</span></h2>
            </div>
            <div className="lg:pb-2">
              <p className="product-section-mark">01 / Product portfolio</p>
              <p className="section-lead mt-5">Compare product families, review common configurations and find the right starting point for a technical conversation.</p>
            </div>
          </div>

          <div role="tablist" aria-label="Product categories" onKeyDown={handleProductKeys} className="scrollbar-hide flex gap-2 overflow-x-auto pb-5">
            {products.map((product, index) => (
              <button
                id={`product-tab-${index}`}
                key={product.name}
                role="tab"
                aria-selected={active === index}
                aria-controls="product-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                className={`product-filter ${active === index ? "is-active" : ""}`}
              >
                <span>0{index + 1}</span>{product.name}
              </button>
            ))}
          </div>

          <div id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${active}`} className="product-panel grid overflow-hidden lg:grid-cols-[1.08fr_.92fr]">
            <div data-product-visual data-mobile-scroll className="product-visual relative min-h-[390px] overflow-hidden md:min-h-[520px]">
              <CustomImage key={current.image + active} src={current.image} alt={`${current.name} from the KEW Electricals product range`} fill className={`animate-in ${current.imageFit} object-center ${current.imageFit === "object-contain" ? "p-6 md:p-10" : ""}`} sizes="(max-width: 1024px) 100vw, 55vw" />
              <div className="product-visual-index" aria-hidden="true">0{active + 1} / 0{products.length}</div>
            </div>

            <div data-product-copy data-mobile-scroll className="product-copy flex flex-col justify-center p-7 md:p-12 lg:p-14">
              <p className="eyebrow text-[#d91f23]">{current.kicker}</p>
              <h3 className="mt-4 font-display text-[clamp(2.7rem,4.7vw,5.2rem)] font-medium leading-[.92] tracking-[-.055em] text-[#111317]">{current.name}</h3>
              <p className="mt-6 max-w-xl text-[16px] leading-7 text-[#292c30]">{current.description}</p>

              <div className="mt-8 border-y border-black/12 py-6">
                <p className="text-[10px] font-bold uppercase tracking-[.17em] text-black/48">Common configuration</p>
                <p className="mt-2 text-sm font-semibold text-[#111317]">{current.configurations}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Common applications">
                  {current.applications.map((application) => <li key={application} className="product-fact"><i />{application}</li>)}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={current.href} className="product-primary-action">View product range <ArrowRight size={16} /></a>
                <a href={enquiry} className="product-secondary-action">Request catalogue <Download size={15} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="engineering" data-manufacturing className="relative min-h-[760px] overflow-hidden bg-[#0c0f12] text-white">
        <div data-manufacturing-image className="absolute inset-0 overflow-hidden"><CustomImage src="/images/switchgear-system.png" alt="Industrial switchgear system" fill className="scale-105 object-cover object-center opacity-72" sizes="100vw" /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,11,.96)_0%,rgba(5,8,11,.84)_43%,rgba(5,8,11,.28)_76%,rgba(5,8,11,.2)_100%)]" />
        <div data-manufacturing-copy data-mobile-scroll className="shell relative flex min-h-[760px] flex-col justify-center py-20">
          <div data-reveal className="max-w-3xl">
            <p className="eyebrow text-white/55">Engineering approach</p>
            <h2 className="mt-6 font-display text-[clamp(3.4rem,6.8vw,7rem)] leading-[.9] tracking-[-.06em]">Precision with<br />a clear purpose.</h2>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/72">From initial product selection to system configuration, the focus stays on making electrical requirements easier to understand and act on.</p>
          </div>
          <div className="engineering-grid mt-12 grid max-w-5xl gap-px overflow-hidden border border-white/16 bg-white/16 md:grid-cols-3">
            {engineeringPillars.map((item, index) => <article key={item.title} className="engineering-card bg-[#151b21]/95 p-6 md:p-7"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}
          </div>
          <p className="mt-5 text-[9px] uppercase tracking-[.16em] text-white/40">System imagery is illustrative</p>
        </div>
      </section>

      <section id="legacy" data-heritage className="legacy-section py-20 md:py-28">
        <div className="shell">
          <div data-reveal className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="legacy-eyebrow eyebrow"><span />Legacy &amp; values</p>
              <h2 data-heritage-year data-mobile-scroll className="legacy-year mt-6 font-display text-[clamp(4.2rem,8vw,8rem)] leading-[.8] tracking-[-.065em]">Since<br /><span>1961.</span></h2>
            </div>
            <div className="max-w-2xl lg:pb-3">
              <p className="legacy-intro">Kusum Engineering Works has built its practice around switchgear, fusegear, controlgear and power distribution products for more than six decades.</p>
              <p className="legacy-copy mt-4">From Mumbai, KEW continues to serve electrical requirements across India and wider markets with an emphasis on practical engineering and dependable product selection.</p>
            </div>
          </div>
          <div data-heritage-rule className="legacy-rule mt-12" aria-hidden="true" />
          <div className="legacy-grid mt-7 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Quality focus", "Attention to product construction, selection and application remains central to the work."],
              ["02", "Built for use", "Solutions are developed for the realities of distribution, protection and control environments."],
              ["03", "Continuous improvement", "The product range continues to evolve around changing electrical requirements."],
            ].map(([number, title, copy]) => <article data-heritage-item data-mobile-scroll key={number} className="legacy-value p-7 md:p-8"><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" /></article>)}
          </div>
        </div>
      </section>

      <section data-featured className="featured-section overflow-hidden text-white">
        <div className="grid lg:min-h-[680px] lg:grid-cols-[.9fr_1.1fr]">
          <div data-featured-copy data-mobile-scroll className="flex items-center px-5 py-20 md:px-10 lg:px-[max(40px,calc((100vw-1440px)/2))] lg:pr-16">
            <div className="max-w-xl">
              <div className="flex items-center justify-between gap-6">
                <p className="featured-eyebrow eyebrow"><span />Enclosure systems</p>
                <p className="featured-index">02 / Product focus</p>
              </div>
              <h2 className="featured-title mt-7 font-display text-[clamp(3.2rem,6.5vw,6.4rem)] leading-[.9] tracking-[-.055em]">Protection,<br /><span>built in.</span></h2>
              <p className="featured-lead mt-7">KEW enclosures support electrical protection with wall-mounting, floor-standing and polycarbonate formats for varied installation requirements.</p>
              <p className="featured-copy mt-4">A clear range of sizes, materials and mounting approaches helps specifiers move from application need to suitable configuration.</p>
              <div className="featured-specs mt-8 flex flex-wrap gap-2"><span className="spec-chip"><i />Wall mounting</span><span className="spec-chip"><i />Floor standing</span><span className="spec-chip"><i />Polycarbonate</span><span className="spec-chip"><i />Metal variants</span></div>
              <a href="https://kewelectricals.com/" className="featured-action mt-9">Explore enclosures <ArrowRight size={16} /></a>
            </div>
          </div>
          <div data-featured-image className="featured-product-stage relative min-h-[460px] overflow-hidden lg:min-h-full"><CustomImage src="/images/product-detail.png" alt="KEW electrical enclosure range" fill className="featured-product-image object-contain p-10 md:p-14" sizes="(max-width: 1024px) 100vw, 55vw" /><div className="featured-image-shade" /><span>Enclosure range / product view</span></div>
        </div>
      </section>

      <section id="events" className="events-section bg-[#f4f4f1] py-20 md:py-24">
        <div className="shell">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#e52529]">
                <span className="h-px w-9 bg-[#e52529]" />
                KEW in the industry
              </p>
              <h2 className="font-display text-[clamp(3rem,5.3vw,5.4rem)] leading-[.92] tracking-[-.055em] text-[#111317]">
                Events &amp;<br />
                <span className="text-black/48">Exhibitions.</span>
              </h2>
            </div>

            <p className="max-w-sm text-[15px] leading-7 text-black/68">
              Discover our industry presence, engineering showcases and opportunities
              to connect with the KEW team.
            </p>
          </div>

          <div className="event-feature group relative mb-6 grid overflow-hidden bg-[#111317] text-white lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative min-h-[330px] overflow-hidden lg:min-h-[430px]">
              <CustomImage
                src="/images/team-event.png"
                alt="KEW Electricals industry event"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-7 left-7 border border-white/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em]">
                Featured showcase
              </span>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#e52529]" />
                  <span className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">
                    Industry exhibition
                  </span>
                </div>

                <h3 className="font-display text-4xl leading-[1.02] tracking-[-.045em] md:text-5xl">
                  Connecting through
                  <br />
                  engineering.
                </h3>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/72">
                  Meet the people behind KEW's electrical solutions and explore
                  products, engineering capabilities and industry developments.
                </p>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-5 border-t border-white/15 pt-6">
                <div>
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[.18em] text-white/40">
                    Location
                  </span>
                  <p className="text-sm font-medium">Mumbai, India</p>
                </div>
                <div>
                  <span className="mb-2 block text-[9px] font-bold uppercase tracking-[.18em] text-white/40">
                    Schedule
                  </span>
                  <p className="text-sm font-medium">To be announced</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="event-card group border border-black/10 bg-white transition-colors duration-300 hover:border-[#e52529]/50">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e9e6]">
                <CustomImage
                  src="/images/switchgear-lineup.png"
                  alt="Illustrative industrial switchgear lineup"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute left-5 top-5 bg-[#e52529] px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white">
                  System perspective
                </span>
              </div>

              <div className="p-7 md:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">
                  Technical showcase
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-.035em]">
                  Explore system architecture.
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/68">
                  See how switchgear, protection and distribution components come together across an electrical system.
                </p>

                <div className="mt-7 border-t border-black/10 pt-6 text-[10px] font-bold uppercase tracking-[.16em] text-black/52">
                  Engineering insight
                </div>
              </div>
            </article>

            <article className="event-card group border border-black/10 bg-white transition-colors duration-300 hover:border-[#e52529]/50">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e9e6]">
                <CustomImage
                  src="/images/switchgear-busbar.png"
                  alt="Illustrative switchgear busbar detail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute left-5 top-5 bg-[#111317] px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white">
                  Product detail
                </span>
              </div>

              <div className="p-7 md:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">
                  Product &amp; innovation
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-.035em]">
                  Look closer at the details.
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/68">
                  Explore the construction, connections and components that shape modern distribution and control systems.
                </p>

                <div className="mt-7 border-t border-black/10 pt-6 text-[10px] font-bold uppercase tracking-[.16em] text-black/52">
                  Product showcase
                </div>
              </div>
            </article>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
            <p className="text-xs leading-6 text-black/60">
              Interested in meeting our team or learning more about KEW?
            </p>
            <a
              href="https://kewelectricals.com/contact-us"
              className="group inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.16em] text-[#111317]"
            >
              Connect with KEW
              <span className="grid h-10 w-10 place-items-center bg-[#e52529] text-white transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </div>
      </section>


      <section data-quality className="quality-section grid min-h-[62vh] md:grid-cols-2">
        <div className="quality-image relative min-h-[420px] overflow-hidden bg-[#111317]">
          <div data-quality-image className="absolute inset-0 overflow-hidden">
            <CustomImage src="/images/switchgear-busbar.png" alt="Illustrative switchgear connection detail" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 text-[9px] font-bold uppercase tracking-[.18em] text-white/65">Illustrative system detail</span>
        </div>
        <div className="quality-copy-panel flex items-center bg-[#d91f26] p-8 text-white md:p-14 lg:p-20">
          <div data-quality-copy data-mobile-scroll data-reveal>
            <p className="eyebrow text-white/65">Engineering practice</p>
            <h2 className="mt-6 font-display text-5xl leading-[.94] tracking-[-.05em] md:text-7xl">Experience shapes every detail.</h2>
            <p className="mt-7 max-w-lg text-[15px] leading-7 text-white/84">A long-standing engineering practice, a diverse product range and a focus on performance guide the way KEW approaches electrical equipment.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section relative isolate overflow-hidden bg-[#111317] text-white">
        <CustomImage src="/images/industrial-hero.png" alt="Industrial electrical infrastructure" fill className="contact-background object-cover" sizes="100vw" />
        <div className="contact-overlay" aria-hidden="true" />
        <div className="shell relative z-10 flex min-h-[620px] items-center py-20 md:py-28 lg:min-h-[700px] lg:py-32">
          <div data-reveal className="max-w-4xl">
            <p className="eyebrow text-[#e52529]">Discuss your requirement</p>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(3.4rem,7vw,7.2rem)] leading-[.88] tracking-[-.06em]">Let&apos;s engineer your next project.</h2>
            <p className="mt-7 max-w-xl text-[15px] leading-7 text-white/82">Share your application, configuration or product requirement with the KEW team.</p>
            <div className="mt-10 flex flex-wrap gap-4"><a href={enquiry} className="cta-primary">Send an enquiry <ArrowRight size={17} /></a><a href="#products" className="cta-secondary">Explore products</a></div>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer bg-[#080a0c] py-14 text-white/70">
      <div className="shell grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="brand-mark relative h-14 w-28 overflow-hidden"><CustomImage src="/images/kew-logo.png" alt="KEW Electricals" fill className="object-contain" sizes="112px" /></div>
          <p className="mt-6 max-w-sm text-sm leading-7">Kusum Engineering Works — electrical switchgear, fusegear, controlgear and power distribution products.</p>
        </div>
        <div>
          <p className="footer-title">Explore</p>
          <div className="grid gap-3 text-sm"><a href="#products">Products</a><a href="#engineering">Engineering</a><a href="#legacy">Legacy</a><a href="#events">Events</a><a href="https://kewelectricals.com/career">Careers</a></div>
        </div>
        <address className="not-italic">
          <p className="footer-title">Head office</p>
          <p className="text-sm leading-7">Kusum Engineering Works<br />S.V. Road, Goregaon (West)<br />Mumbai – 400104, India</p>
          <a className="mt-4 block text-sm text-white" href="mailto:info@kewelectricals.com">info@kewelectricals.com</a>
          <a className="mt-2 block text-sm text-white" href="tel:+91224276764990">+91 22 4276764990</a>
        </address>
      </div>
      <div className="shell mt-14 flex flex-col gap-3 border-t border-white/12 pt-6 text-[10px] uppercase tracking-[.13em] sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Kusum Engineering Works</p><p>Concept website · KEW Electricals</p></div>
    </footer>
  </div>;
}
