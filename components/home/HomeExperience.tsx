"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, ArrowRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { products } from "@/lib/products";

const enquiry = "https://kewelectricals.com/contact-us";

gsap.registerPlugin(ScrollTrigger, useGSAP);


export default function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = products[active];

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    const intro = gsap.from("[data-hero]", { y: 38, opacity: 0, duration: 1.05, stagger: 0.1, ease: "power3.out" });
    const heroImage = gsap.from("[data-hero-section] > div:first-child", { scale: 1.1, opacity: 0, duration: 1.4, ease: "power2.out" });
    const heroGrid = gsap.from("[data-hero-grid]", { opacity: 0, duration: 1.2, delay: 0.3, ease: "power2.out" });
    void intro;
    void heroImage;
    void heroGrid;

    mm.add("(min-width: 768px)", () => {
      gsap.timeline({ scrollTrigger: { trigger: "[data-product-section]", start: "top 80%", end: "bottom 20%", scrub: 0.9 } })
        .fromTo("[data-product-section] > .shell > div:first-child", { yPercent: 8, opacity: 0.4 }, { yPercent: 0, opacity: 1, ease: "none" }, 0)
        .fromTo("[data-product-visual]", { scale: 0.92 }, { scale: 1, ease: "none" }, 0.08)
        .fromTo("[data-product-copy]", { yPercent: 12, opacity: 0.35 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.12);

      gsap.timeline({ scrollTrigger: { trigger: "[data-manufacturing]", start: "top 82%", end: "center 40%", scrub: 0.9 } })
        .fromTo("[data-manufacturing-image]", { clipPath: "inset(10% 8% 10% 8%)", scale: 1.18 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1.05, ease: "none" }, 0)
        .fromTo("[data-manufacturing-copy]", { yPercent: 16, opacity: 0.3 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.1);

      gsap.timeline({ scrollTrigger: { trigger: "[data-featured]", start: "top 78%", end: "bottom 35%", scrub: 0.8 } })
        .fromTo("[data-featured-image]", { yPercent: 8, scale: 0.94 }, { yPercent: -5, scale: 1.03, ease: "none" }, 0)
        .fromTo("[data-featured-copy]", { xPercent: 7, opacity: 0.45 }, { xPercent: 0, opacity: 1, ease: "none" }, 0.08);

      gsap.timeline({ scrollTrigger: { trigger: "[data-heritage]", start: "top 80%", end: "center 42%", scrub: 0.85 } })
        .fromTo("[data-heritage-year]", { yPercent: 18, opacity: 0.15 }, { yPercent: 0, opacity: 1, ease: "none" }, 0)
        .fromTo("[data-heritage-line]", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", ease: "none" }, 0.18)
        .fromTo("[data-heritage-item]", { yPercent: 20, opacity: 0.2 }, { yPercent: 0, opacity: 1, stagger: 0.08, ease: "none" }, 0.22);

      gsap.timeline({ scrollTrigger: { trigger: "[data-quality]", start: "top 84%", end: "bottom 30%", scrub: 0.8 } })
        .fromTo("[data-quality-image]", { scale: 1.12 }, { scale: 1.02, ease: "none" }, 0)
        .fromTo("[data-quality-copy]", { yPercent: 13, opacity: 0.35 }, { yPercent: 0, opacity: 1, ease: "none" }, 0.12);
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-mobile-scroll]").forEach((element) => {
        gsap.fromTo(element, { y: 24, opacity: 0.4 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: element, start: "top 90%", end: "top 56%", scrub: 0.7 } });
      });
    });

    return () => mm.revert();
  }, { scope: root });

  return <div ref={root} className="overflow-clip bg-[#f4f4f1] text-[#111317]">
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/15 text-white">
      <div className="shell flex h-24 items-center justify-between">
        <a href="#top" aria-label="KEW Electricals home" className="relative z-10 block h-12 w-24 overflow-hidden bg-white px-2"><Image src="/images/kew-logo.png" alt="KEW Electricals" fill priority className="object-contain" sizes="96px" /></a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.16em] lg:flex"><a href="#products">Products</a><a href="#engineering">Engineering</a><a href="#legacy">Legacy</a><a href="#contact">Contact</a></nav>
        <a href={enquiry} className="hidden border border-white/50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition hover:bg-white hover:text-black lg:block">Send an enquiry</a>
        <button className="relative z-10 p-2 lg:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="shell flex flex-col gap-5 border-t border-white/15 bg-[#111317] py-7 text-sm uppercase tracking-[0.15em] lg:hidden"><a href="#products" onClick={() => setMenuOpen(false)}>Products</a><a href="#engineering" onClick={() => setMenuOpen(false)}>Engineering</a><a href="#legacy" onClick={() => setMenuOpen(false)}>Legacy</a><a href={enquiry}>Send an enquiry</a></nav>}
    </header>

    <main id="top">
      <section data-hero-section className="relative min-h-screen bg-[#111317] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-section.png"
            alt="KEW Electricals hero section"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div data-hero-grid className="absolute inset-0 origin-center opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:7vw_7vw]" />
        <div className="shell relative grid min-h-screen items-center gap-8 pt-36 lg:grid-cols-[1.05fr_.95fr]">
          <div className="z-10 max-w-3xl">
            <p data-hero data-hero-kicker className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58"><span className="h-px w-9 bg-[#e52529]" />Trusted low voltage solutions since 1961</p>
            <h1 data-hero data-hero-title className="font-display text-[clamp(3.45rem,7.4vw,7.9rem)] font-medium leading-[.87] tracking-[-.065em]">Engineering<br /><span className="text-white/38">Power.</span><br />Defining Reliability.</h1>
            <div data-hero data-hero-copy className="mt-9 flex max-w-xl flex-col gap-6 border-l border-[#e52529] pl-6 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-sm text-sm leading-6 text-white/63">Electrical distribution and control solutions engineered for dependable performance.</p><a href="#products" className="group flex shrink-0 items-center gap-3 text-xs font-bold uppercase tracking-[0.14em]">Explore products <span className="grid h-10 w-10 place-items-center bg-[#e52529] transition-transform group-hover:translate-x-1"><ArrowDown size={16} /></span></a></div>
          </div>
        </div>
      </section>

      <section aria-label="Company highlights" className="border-b border-black/10 bg-white"><div className="shell grid divide-y divide-black/10 py-3 md:grid-cols-3 md:divide-x md:divide-y-0">{[['1961', 'Established in Mumbai'], ['6+', 'Core product systems'], ['KEW', 'Switchgear · Fusegear · Controlgear']].map(([big, small]) => <div key={big} className="flex items-baseline gap-4 px-0 py-6 md:px-8 first:pl-0"><strong className="text-3xl font-medium tracking-tight text-[#e52529] shrink-0">{big}</strong><span className="text-xs uppercase tracking-[.12em] text-black/48 break-words">{small}</span></div>)}</div></section>

      <section id="products" data-product-section className="pt-12 pb-24 bg-white md:pt-16 md:pb-32"><div className="shell">
        <div data-reveal className="mb-8 flex items-center gap-4"><h2 className="section-title md:whitespace-nowrap">Engineered for every electrical need.</h2></div>
        <div className="flex flex-col gap-8">
          <div role="tablist" aria-label="Product categories" className="flex overflow-x-auto gap-3 border-b border-black/10 pb-6 scrollbar-hide md:flex-wrap md:justify-start">
            {products.map((product, index) => (
              <button key={product.name} role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`whitespace-nowrap px-5 py-3 text-xs font-bold uppercase tracking-[.14em] transition ${active === index ? 'bg-[#e52529] text-white' : 'bg-black/5 text-black/60 hover:bg-black/10'}`}>
                {product.name}
              </button>
            ))}
          </div>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div data-product-visual data-mobile-scroll className="relative aspect-[4/3] overflow-hidden bg-[#e8e9e6]">
              <Image key={current.image + active} src={current.image} alt={`${current.name} from KEW Electricals product range`} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div data-product-copy data-mobile-scroll className="flex flex-col justify-center">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">{current.kicker}</p>
              <h3 className="text-4xl font-medium tracking-[-.03em]">{current.name}</h3>
              <p className="mt-4 text-sm leading-7 text-black/55">{current.description}</p>
              <p className="mt-4 text-sm leading-7 text-black/55">Engineered with precision and built to last, our products are designed for seamless integration into modern electrical infrastructure. With a focus on safety, efficiency, and reliability, KEW solutions deliver consistent performance across diverse industrial applications.</p>
              <a href={current.href} className="mt-8 inline-flex items-center gap-3 border-b border-[#e52529] pb-2 text-xs font-bold uppercase tracking-[.14em]">View range <ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
      </div></section>

      <section id="engineering" data-manufacturing className="relative min-h-[82vh] overflow-hidden bg-black text-white"><div data-manufacturing-image className="absolute inset-0 overflow-hidden"><Image src="/images/factory-floor.png" alt="KEW Electricals industrial exhibition and engineering display" fill className="scale-110 object-cover opacity-55" sizes="100vw" /></div><div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/20" /><div data-manufacturing-copy data-mobile-scroll className="shell relative flex min-h-[82vh] flex-col justify-end py-20"><div data-reveal className="max-w-4xl"><h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.9] tracking-[-.06em]">Precision in<br />every detail.</h2></div><div className="mt-14 grid max-w-4xl gap-6 md:grid-cols-3">{['Engineering experience', 'Manufacturing expertise', 'Product reliability'].map((item, i) => <div key={item} className="bg-white p-6"><span className="mb-3 block text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">0{i + 1}</span><p className="text-sm font-semibold uppercase tracking-[.12em] text-black">{item}</p></div>)}</div></div></section>

      <section id="legacy" data-heritage className="section-pad bg-white"><div className="shell">
        <div data-reveal className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
          <div>
            <h2 data-heritage-year data-mobile-scroll className="font-display text-[clamp(4rem,10vw,10rem)] leading-[.78] tracking-[-.07em]">Since<br /><span className="text-[#e52529]">1961.</span></h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-black/52">For over six decades, Kusum Engineering Works has been at the forefront of electrical innovation, delivering reliable switchgear, fusegear, controlgear and power distribution solutions across India and beyond.</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-black/52">From our Mumbai headquarters, we have served industries nationwide with products engineered for safety, reliability, and performance. Our commitment to quality has made KEW a trusted name in electrical infrastructure.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div data-heritage-item data-mobile-scroll className="group border border-black/10 p-6 transition hover:border-[#e52529]/30 hover:bg-[#f4f4f1]">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">01</span>
              <h3 className="mt-3 text-lg font-medium tracking-[-.02em]">Quality First</h3>
              <p className="mt-2 text-sm leading-6 text-black/55">Every product undergoes rigorous testing to meet international safety standards and performance benchmarks.</p>
            </div>
            <div data-heritage-item data-mobile-scroll className="group border border-black/10 p-6 transition hover:border-[#e52529]/30 hover:bg-[#f4f4f1]">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">02</span>
              <h3 className="mt-3 text-lg font-medium tracking-[-.02em]">Built to Last</h3>
              <p className="mt-2 text-sm leading-6 text-black/55">Our products are engineered for durability, designed to withstand demanding industrial environments and deliver consistent performance.</p>
            </div>
            <div data-heritage-item data-mobile-scroll className="group border border-black/10 p-6 transition hover:border-[#e52529]/30 hover:bg-[#f4f4f1]">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">03</span>
              <h3 className="mt-3 text-lg font-medium tracking-[-.02em]">Always Evolving</h3>
              <p className="mt-2 text-sm leading-6 text-black/55">Continuous investment in R&D and manufacturing technology keeps us at the cutting edge of electrical engineering solutions.</p>
            </div>
          </div>
        </div>
      </div></section>


      <section data-featured className="relative min-h-[75vh] overflow-hidden bg-[#0f1114] text-white"><div data-featured-image className="absolute inset-0 overflow-hidden"><Image src="/images/protection-section.png" alt="KEW Electricals protection enclosures" fill className="object-cover opacity-70" sizes="100vw" /></div><div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40" /><div data-featured-copy data-mobile-scroll className="shell relative flex min-h-[75vh] flex-col justify-center py-20"><div data-reveal className="max-w-3xl"><h2 className="font-display text-[clamp(3.2rem,7vw,7rem)] leading-[.92] tracking-[-.05em]">Protection,<br />built in.</h2><p className="mt-7 max-w-xl text-sm leading-7 text-white/65">KEW enclosures bring considered material construction and adaptable configurations to electrical protection. Designed for demanding industrial environments, our enclosures provide robust defense against dust, moisture, and impact while maintaining accessibility for maintenance and operation.</p><p className="mt-4 max-w-xl text-sm leading-7 text-white/55">Available in multiple configurations including wall-mounted and floor-standing options, with material choices ranging from polycarbonate to metal variants to suit specific application requirements.</p><div className="mt-9 flex flex-wrap gap-2"><span className="spec-chip">Wall mounting</span><span className="spec-chip">Floor standing</span><span className="spec-chip">Polycarbonate</span><span className="spec-chip">Metal variants</span></div><a href="https://kewelectricals.com/" className="mt-10 inline-flex items-center gap-3 border-b border-[#e52529] pb-2 text-xs font-bold uppercase tracking-[.15em]">Explore enclosures <ArrowRight size={15} /></a></div></div></section>

      {/* Product section */}

      <section id="events" className="bg-[#f4f4f1] py-24 md:py-32">
        <div className="shell">
          {/* Section heading */}
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em] text-[#e52529]">
                <span className="h-px w-9 bg-[#e52529]" />
                KEW in the industry
              </p>
              <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.06em] text-[#111317]">
                Events &amp;<br />
                <span className="text-black/35">Exhibitions.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/55">
              Discover our industry presence, engineering showcases and opportunities
              to connect with the KEW team.
            </p>
          </div>

          {/* Featured event */}
          <div className="group relative mb-6 grid overflow-hidden bg-[#111317] text-white lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative min-h-[340px] overflow-hidden lg:min-h-[470px]">
              <Image
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

            <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14">
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

                <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                  Meet the people behind KEW's electrical solutions and explore
                  products, engineering capabilities and industry developments.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-5 border-t border-white/15 pt-7">
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

          {/* Event cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Event 02 */}
            <article className="group border border-black/10 bg-white transition-colors duration-300 hover:border-[#e52529]/50">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e9e6]">
                <Image
                  src="/images/factory-floor.png"
                  alt="Industrial engineering and manufacturing showcase"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute left-5 top-5 bg-[#e52529] px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white">
                  Engineering
                </span>
              </div>

              <div className="p-7 md:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">
                  Technical showcase
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-.035em]">
                  Inside electrical engineering.
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/50">
                  An opportunity to explore electrical systems, manufacturing
                  processes and the engineering behind dependable power distribution.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 border-t border-black/10 pt-6">
                  <div className="flex items-center gap-2 text-xs text-black/60">
                    <span className="text-[#e52529]">⌖</span>
                    Mumbai, India
                  </div>
                  <div className="flex items-center gap-2 text-xs text-black/60">
                    <span className="text-[#e52529]">◷</span>
                    Date to be announced
                  </div>
                </div>
              </div>
            </article>

            {/* Event 03 */}
            <article className="group border border-black/10 bg-white transition-colors duration-300 hover:border-[#e52529]/50">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e9e6]">
                <Image
                  src="/images/protection-section.png"
                  alt="Electrical protection products showcase"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute left-5 top-5 bg-[#111317] px-3 py-2 text-[9px] font-bold uppercase tracking-[.16em] text-white">
                  Product showcase
                </span>
              </div>

              <div className="p-7 md:p-9">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e52529]">
                  Product &amp; innovation
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-.035em]">
                  Designed for reliable power.
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/50">
                  Discover KEW's switchgear, fusegear, controlgear and electrical
                  protection solutions for modern infrastructure.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 border-t border-black/10 pt-6">
                  <div className="flex items-center gap-2 text-xs text-black/60">
                    <span className="text-[#e52529]">⌖</span>
                    Mumbai, India
                  </div>
                  <div className="flex items-center gap-2 text-xs text-black/60">
                    <span className="text-[#e52529]">◷</span>
                    Date to be announced
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Bottom link */}
          <div className="mt-12 flex flex-col justify-between gap-5 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
            <p className="text-xs leading-6 text-black/45">
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


      <section data-quality className="grid min-h-[70vh] md:grid-cols-2"><div data-quality-image className="relative min-h-[48vh] overflow-hidden"><Image src="/images/team-event.png" alt="KEW Electricals team and industry presence" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="flex items-center bg-[#e52529] p-8 text-white md:p-16 lg:p-24"><div data-quality-copy data-mobile-scroll data-reveal><h2 className="font-display text-5xl leading-[.94] tracking-[-.05em] md:text-7xl">Experience shapes every detail.</h2><p className="mt-7 max-w-lg text-sm leading-7 text-white/78">A long-standing engineering practice, a diverse product range and a focus on performance guide the way KEW approaches electrical equipment.</p></div></div></section>

      <section id="contact" className="relative overflow-hidden bg-[#111317] py-28 text-white md:py-40"><Image src="/images/industrial-hero.png" alt="Industrial electrical infrastructure" fill className="object-cover opacity-30" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-[#111317] via-[#111317]/90 to-transparent" /><div data-reveal className="shell relative"><h2 className="max-w-5xl font-display text-[clamp(3.4rem,8vw,8rem)] leading-[.88] tracking-[-.06em]">Let&apos;s engineer your next project.</h2><div className="mt-12 flex flex-wrap gap-4"><a href={enquiry} className="cta-primary">Send an enquiry <ArrowRight size={17} /></a><a href="#products" className="cta-secondary">Explore products</a></div></div></section>
    </main>

    <footer className="bg-[#0a0b0d] py-14 text-white/65"><div className="shell grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]"><div><div className="relative h-14 w-28 bg-white px-2"><Image src="/images/kew-logo.png" alt="KEW Electricals" fill className="object-contain" sizes="112px" /></div><p className="mt-6 max-w-sm text-sm leading-6">Kusum Engineering Works — electrical switchgear, fusegear, controlgear and power distribution products.</p></div><div><p className="footer-title">Explore</p><div className="grid gap-3 text-sm"><a href="#products">Products</a><a href="#engineering">Engineering</a><a href="#legacy">Legacy</a><a href="https://kewelectricals.com/career">Careers</a></div></div><address className="not-italic"><p className="footer-title">Head office</p><p className="text-sm leading-7">Kusum Engineering Works<br />S.V. Road, Goregaon (West)<br />Mumbai – 400104, India</p><a className="mt-4 block text-sm text-white" href="mailto:info@kewelectricals.com">info@kewelectricals.com</a><a className="mt-2 block text-sm text-white" href="tel:+91224276764990">+91 22 4276764990</a></address></div><div className="shell mt-14 flex flex-col gap-3 border-t border-white/12 pt-6 text-[10px] uppercase tracking-[.13em] sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Kusum Engineering Works</p><p>Concept website · KEW Electricals</p></div></footer>
  </div>;
}
