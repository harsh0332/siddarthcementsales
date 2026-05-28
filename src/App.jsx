import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Truck,
  Shield,
  Award,
  Hammer,
  Building2,
  HardHat,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
  Factory,
  PackageCheck,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  HelpCircle,
  Map,
  Search,
  Eye,
  ArrowLeft,
  FileText
} from 'lucide-react';

// Brand tokens & correct cement-bag static assets
const IMAGES = {
  heroBg: '/01JP1W9X0MFN9K72YR09G16DAM.jpg',         // Construction golden hour
  sealOfQuality: '/01J7NRJT7YRX298Y1ARAJR5SF8.png',   // Bangur official seal
  
  // Generated high-fidelity section assets
  vintageShop: '/vintage_shop_1973.png',              // Vintage shop (Siddarth Sales)
  oldStorefrontBags: '/old_storefront_bags.png',      // Storefront with bags stacked
  vintageDelivery: '/vintage_delivery.png',          // Retro transport truck
  durabilityRebar: '/durability_rebar.png',          // Concrete structural steel rebar
  
  // Newly added assets for Round 3 Revisions
  shriGanesh: '/shri_ganesh.png',
  vintageMaterialsShop: '/vintage_materials_shop.png',
  modernMaterialsShop: '/modern_materials_shop.png',
  cementWarehouse: '/cement_warehouse.png',
  
  // Guide thumbnail generated images
  guideOpcPpc: '/guide_opc_ppc.png',
  guideGrades: '/guide_grades.png',
  guideStorage: '/guide_storage.png',

  // Correct product cards assignments matching your prompt instructions
  magna: '/01J6FS8N4FM1KE03MWKFTX2S33.png',           // Bangur Magna bag photo
  roofon: '/01J6FJ1YJRESFMVXCC0545HGF4.png',          // Bangur Roofon Plus bag photo
  jungrodhak: '/01J6VJJ6Q9AYYCGH24CH2G3X2N.png',      // Bangur Jungrodhak bag photo
  powermax: '/01JMFECZ87CZ5JVETAMNBNWJE4.png',        // Bangur Powermax bag photo
  rockstrong: '/01JMFEBNCEBP13REHNWG2NDY7W (1).png',  // Bangur Rockstrong bag photo
  marble: '/01JJ1RT20EZBS0WWPKSK3D92JN.png',          // Bangur Marble White bag photo
};

// Stylized delivery map pins around Guna district
const mapPins = [
  { name: 'Guna Head Office', x: '50%', y: '50%', status: 'CFA Warehouse (Base)', info: 'Main Warehouse. Ready Stock 24x7.' },
  { name: 'Ashoknagar', x: '72%', y: '58%', status: 'Daily Supply Chain', info: 'Direct dealer supply network. 12h delivery.' },
  { name: 'Bina', x: '85%', y: '78%', status: 'Bulk Distribution Area', info: 'Heavy commercial infrastructure supply.' },
  { name: 'Shivpuri', x: '48%', y: '22%', status: 'Regional Supply Depot', info: 'Contractor and builder direct delivery.' },
  { name: 'Sironj', x: '68%', y: '88%', status: 'Active Dealer Network', info: 'Same-day retail stock logistics.' },
  { name: 'Raghogarh', x: '35%', y: '68%', status: 'Direct Industrial Supply', info: 'Factory direct commercial projects.' },
  { name: 'Kumbhraj', x: '24%', y: '54%', status: 'Dealer Network', info: 'Same-day dealer delivery network.' },
  { name: 'Aron', x: '58%', y: '72%', status: 'Rural Building Support', info: 'PPC durability promotion & supply.' },
  { name: 'Bamori', x: '30%', y: '35%', status: 'Active Supply Route', info: 'Fast builder transport dispatched daily.' }
];

// Custom Accented Animated Inline Vector SVG Logo
const Logo = ({ className = "h-11", light = false }) => (
  <svg viewBox="0 0 320 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="animate-logo-group">
      {/* Hexagonal structural shield logo */}
      <path 
        d="M 28 6 L 48 16 L 48 44 L 28 54 L 8 44 L 8 16 Z" 
        fill="#C8102E" 
        style={{
          animation: 'logoShieldScale 3s ease-in-out infinite alternate',
        }}
      />
      {/* Monogram S building shape */}
      <path 
        d="M 22 20 C 22 20, 36 20, 36 25 C 36 30, 22 30, 22 35 C 22 40, 36 40, 36 40" 
        stroke="#FFFFFF" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeDasharray="80"
        strokeDashoffset="80"
        style={{
          animation: 'logoStrokeDraw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s',
        }}
      />
      {/* Rebar lines overlay */}
      <path d="M 18 14 L 18 48 M 42 14 L 42 48" stroke="#FAFAF7" strokeWidth="1.5" strokeOpacity="0.4" />
    </g>
    {/* Wordmark details with clean entry transition */}
    <g 
      style={{
        animation: 'logoFadeSlide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <text x="64" y="26" fontFamily="Oswald, sans-serif" fontSize="22" fontWeight="900" fill={light ? "#FFFFFF" : "#1A1A1A"} letterSpacing="0.5">SIDDHARTH</text>
      <text x="64" y="42" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="800" fill={light ? "#D6D2C8" : "#6B6B6B"} letterSpacing="4">CEMENT SALES</text>
      <text x="64" y="53" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="700" fill="#C8102E" letterSpacing="0.5">Authorized Bangur CFA · Est. 1973</text>
    </g>

    <style>{`
      @keyframes logoStrokeDraw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes logoFadeSlide {
        from { opacity: 0; transform: translateX(-8px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes logoShieldScale {
        0% { fill: #C8102E; }
        100% { fill: #9E0C24; }
      }
    `}</style>
  </svg>
);

// Bangur Inline Brand logo (pointing to the real high-fidelity assets)
const BangurLogo = ({ className = "h-9", light = false }) => (
  <img 
    src={light ? "/01J7NRJT7YRX298Y1ARAJR5SF8.png" : "/01J7NR83P0AA7CQ6MXAK2J4JS1.png"} 
    alt="Bangur Cement Logo" 
    className={className} 
  />
);

// Shree Inline Brand logo (pointing to the real high-fidelity asset)
const ShreeCementLogo = ({ className = "h-9" }) => (
  <img 
    src="/01J7NRKPB4EMFN0M0EFRV8RD89.png" 
    alt="Shree Cement Logo" 
    className={className} 
  />
);

// Hook for scroll transitions
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting];
}

// Stats Counter
function StatCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
    if (numericTarget === 0) {
      setCount(target);
      return;
    }
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * numericTarget));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white">
      {count}{suffix}
    </span>
  );
}

// B: Apple-style Scroll-scrubbed Hero Frame Animation Component
function HeroScrollScrub() {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const frameCount = 240;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Preloading 240 Frames
  useEffect(() => {
    if (prefersReduced) return;
    let loadedCount = 0;
    const loadedImages = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(3, '0');
      img.src = `/ezgif/ezgif-frame-${frameStr}.jpg`;
      img.onload = () => {
        loadedImages[i] = img;
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) setImages(loadedImages);
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
      };
    }
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced || images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const drawFrame = (index) => {
      const img = images[index];
      if (!img) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }
      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      drawFrame(1);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleScroll = () => {
      const parent = parentRef.current;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const scrollHeight = parent.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollHeight, 0), 1);
      
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * (frameCount - 1)) + 1
      );
      requestAnimationFrame(() => drawFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images, prefersReduced]);

  return (
    <div ref={parentRef} className="relative w-full h-[300vh] bg-surface-dark z-10 border-b border-border-default">
      {/* 16:9 Sticky Container pinning screen */}
      <div className="sticky top-20 h-[calc(100vh-80px)] w-full overflow-hidden flex items-center justify-center">
        {loadingProgress < 100 && !prefersReduced && (
          <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center z-30 text-white space-y-4">
            <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
            <p className="font-display uppercase tracking-widest text-[9px] font-bold text-gray-400">Preloading Apple Scroll Scrub ({loadingProgress}%)</p>
          </div>
        )}
        
        {prefersReduced ? (
          <img 
            src={IMAGES.heroBg} 
            alt="Static building cement under construction" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <canvas ref={canvasRef} className="w-full h-full block object-cover" />
        )}

        {/* Subtle Bottom Scroll scrubbing guide indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 border border-gray-800 pointer-events-none select-none z-20">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-wider flex items-center gap-2 animate-pulse justify-center font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-ping" /> Scroll Down to scrub 3D Animation
          </p>
        </div>
      </div>
    </div>
  );
}

// E: Scroll-Bound truck delivery route drawing flow
function ScrollDeliveryTimeline() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate active scroll progress inside delivery section bounds
      const scrolled = viewportHeight - rect.top;
      const totalScroll = rect.height + viewportHeight;
      const pct = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReduced]);

  const stages = [
    { name: 'Factory Dispatch', icon: <Factory className="w-5 h-5" />, desc: 'Bags loaded directly from Shree Cement Ltd. units (Beawar/Ras, Rajasthan). Clinker-locked and fresh.' },
    { name: 'Guna CFA Depot', icon: <Building2 className="w-5 h-5" />, desc: 'Stored at Siddharth central warehouse on double-layer wooden pallets to block MP ambient moisture.' },
    { name: 'Direct Order', icon: <PackageCheck className="w-5 h-5" />, desc: 'Digital clinker-fresh billing dispatched direct to you from the CFA depot with zero speculative middlemen markup.' },
    { name: 'Site Delivery', icon: <Truck className="w-5 h-5" />, desc: 'Fast, secure direct transit via SCS heavy fleet cargo trucks arriving within Guna district in 12-24 hours.' }
  ];

  if (prefersReduced) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-6 text-left">
        {stages.map((stage, idx) => (
          <div key={idx} className="bg-white p-6 rounded-none border-2 border-border-default shadow-sm">
            <div className="w-10 h-10 rounded-none bg-brand-red text-white flex items-center justify-center mb-4">{stage.icon}</div>
            <h4 className="font-display font-bold uppercase text-text-primary text-base">{stage.name}</h4>
            <p className="text-xs text-text-muted mt-2">{stage.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto pt-10 pb-8 px-4 relative">
      
      {/* Route Dotted Vector Line with technical hatch pattern */}
      <div className="absolute top-[28px] left-[8%] right-[8%] h-[6px] bg-surface-dust hidden lg:block z-0 border border-border-default rounded-none">
        <div 
          className="h-full bg-brand-red transition-all duration-300 relative hatch-pattern"
          style={{ width: `${progress * 100}%` }}
        >
          {/* Dynamic kinetic neon glowing tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-brand-red shadow-[0_0_10px_#C8102E]" />
        </div>
      </div>

      {/* SVG Kinetic Cargo Cement Truck driving across as user scrolls with vibration shake */}
      <div 
        className="absolute top-[10px] hidden lg:block z-20 pointer-events-none transition-all duration-300 ease-out"
        style={{ left: `${8 + progress * 84}%`, transform: 'translateX(-50%)' }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-brand-red text-white px-3 py-1.5 rounded-none shadow-md border border-white/20 flex items-center gap-1.5 relative select-none animate-[truckShake_0.2s_infinite]">
            <Truck className="w-5 h-5 text-white" />
            <span className="text-[9px] font-bold uppercase tracking-wider font-mono">BANGUR EXPRESS</span>
            {/* Speed lines */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center gap-0.5 mr-2 opacity-80">
              <span className="h-[2px] w-4 bg-brand-red/80 rounded-none" />
              <span className="h-[2px] w-2 bg-brand-red/60 rounded-none" />
              <span className="h-[2px] w-1 bg-brand-red/40 rounded-none" />
            </div>
            {/* Dust particles */}
            <div className="absolute left-[20%] top-full flex gap-1 mt-1 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red/40 animate-ping delay-100" />
              <span className="w-1 h-1 rounded-full bg-brand-red/20 animate-ping delay-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Node Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {stages.map((stage, idx) => {
          const isActive = progress >= (idx / (stages.length - 1)) - 0.05;
          return (
            <div 
              key={idx}
              className={`bg-white p-6 rounded-none border-2 transition-all duration-300 relative flex flex-col items-center text-center space-y-4 group hover:shadow-lift ${isActive ? 'border-brand-red shadow-md' : 'border-border-default shadow-sm'}`}
            >
              <div 
                className={`w-12 h-12 rounded-none flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-brand-red border-brand-red text-white shadow' : 'bg-surface-base border-border-default text-text-muted'}`}
              >
                {stage.icon}
              </div>
              <div>
                <h4 className="font-display text-lg font-bold uppercase text-text-primary flex items-center justify-center gap-1">
                  <span>{stage.name}</span>
                  {isActive && <Check className="w-4 h-4 text-brand-red" />}
                </h4>
                <p className="text-xs text-text-muted mt-2 leading-relaxed font-body">
                  {stage.desc}
                </p>
              </div>
              <div className={`absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-none uppercase tracking-wider font-mono ${isActive ? 'bg-brand-red text-white animate-pulse' : 'bg-surface-dust text-text-muted'}`}>
                {isActive ? '✓ Dispatch' : 'Pending'}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// Router View Container Wrapper
export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [selectedBlogData, setSelectedBlogData] = useState(null);

  // Core navigation & interactive UI states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeGradeChip, setActiveGradeChip] = useState(null);
  const [selectedCementType, setSelectedCementType] = useState('PPC');
  const [activePin, setActivePin] = useState(null);

  // Auto scroll to top on routing changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  // S12 Carousel feedback slider states
  const [carouselIndex, setCarouselIndex] = useState(0);
  const feedbackList = [
    {
      name: 'Ramesh Sharma',
      role: 'Civil Contractor',
      location: 'Guna HO',
      project: 'Guna Overpass Project (12,000 Bags)',
      quote: 'Siddharth Cement Sales se mera 15 saal ka rishta hai. Kabhi stock mein dikkat nahi, factory-fresh supply aur cement ki solid pakad par humesha 100% bharosa rehta hai.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Mukesh Jain',
      role: 'Authorized Sub-Dealer',
      location: 'Ashoknagar',
      project: 'Jain Commercial Complex (5,500 Bags)',
      quote: 'Bangur ka premium range direct Siddharth Cement Sales (CFA) se milta hai. Sahi time par truck dispatch aur transparent pricing humare trade network ko bohot support karti hai.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
      name: 'Anita Verma',
      role: 'Individual Home Builder',
      location: 'Lahoti Marg, Guna',
      project: 'Slab structural column pour (650 Bags)',
      quote: 'Apna sapno ka ghar banate waqt mujhe confusion tha ki structural column ke liye kounsa cement choose karun. Siddharth team ne mujhe exact guidance di aur direct site delivery karwayi.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % feedbackList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Stacked Story Card states (D Upgrades)
  const [storyIndex, setStoryIndex] = useState(0);
  const storyDecks = [
    {
      title: 'Our 1973 Storefront',
      desc: 'Founded as a simple, family-run cement shop in Guna, laying down an unbreakable bond of trust and honesty with local builders.',
      img: IMAGES.vintageShop,
      badge: 'Heritage Ground Zero'
    },
    {
      title: 'Shri Ganesh Building Material',
      desc: 'One of our oldest and most prominent retail partners, delivering robust structural support and reliable Bangur quality across Guna district.',
      img: IMAGES.shriGanesh,
      badge: 'Key Partner Showcase'
    },
    {
      title: 'Vintage Indian Shop',
      desc: 'A nostalgic look back at small-town building logistics in central MP, with hand-painted signboards and stacked clinker cement bags.',
      img: IMAGES.vintageMaterialsShop,
      badge: 'Legacy Roots'
    },
    {
      title: 'Direct Pallet Storage',
      desc: 'Fresh clinkers are sorted and stacked neatly on dry wooden pallets, preserving chemical hydration profiles against MP regional moisture.',
      img: IMAGES.oldStorefrontBags,
      badge: 'Depot Stock Preservation'
    },
    {
      title: 'Busy Modern Retailers',
      desc: 'Assisting active sub-dealers and building contractors in clean, modern storefront layouts, backed by direct factory dispatch pipelines.',
      img: IMAGES.modernMaterialsShop,
      badge: 'Active Dealer Hub'
    },
    {
      title: 'Regional Fleet Dispatches',
      desc: 'Dispatched direct from Shree Cement plants to Guna and neighbouring towns with rapid 12h delivery logistics transport.',
      img: IMAGES.vintageDelivery,
      badge: 'CFA Last Mile Fleet'
    },
    {
      title: 'SCS Clinker Warehouse',
      desc: 'Inside our large logistics warehouse featuring heavy pallet stacks sorted cleanly with yellow forklifts and dry storage management.',
      img: IMAGES.cementWarehouse,
      badge: 'depot infrastructure'
    }
  ];

  // Story Deck automatic rotation cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % storyDecks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [storyDecks.length]);

  // S10 distributor form action states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    whatsapp: '',
    city: '',
    enquiryType: 'Distributor',
    monthlyRequirement: '<100',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      whatsapp: name === 'mobile' && prev.whatsapp === prev.mobile ? value : name === 'whatsapp' ? value : prev.whatsapp
    }));
  };

  const submitToFormAction = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getWhatsAppURL = () => {
    const text = `Hi Siddharth Cement Sales, I want to submit an enquiry:
- *Name*: ${formData.fullName}
- *Phone/WhatsApp*: ${formData.whatsapp || formData.mobile}
- *Location*: ${formData.city}
- *Type*: ${formData.enquiryType}
- *Volume*: ${formData.monthlyRequirement} bags
- *Message*: ${formData.message}`;
    return `https://wa.me/919893156560?text=${encodeURIComponent(text)}`;
  };

  // GPS consignment order tracker
  const [trackId, setTrackId] = useState('');
  const [trackStatus, setTrackStatus] = useState(null);

  const startMockTrack = (e) => {
    e.preventDefault();
    if (!trackId) return;
    setTrackStatus(["[10:00 AM] Manifest verified. Direct dispatch trucks clearing Shree Cement plants Beawar..."]);
    setTimeout(() => {
      setTrackStatus(prev => [...prev, "[01:30 PM] Batch arrived in Guna depot. Checked for hydration moisture."]);
    }, 1500);
    setTimeout(() => {
      setTrackStatus(prev => [...prev, "[Active] Transit underway. Arriving within Guna limits in 2 hours."]);
    }, 3500);
  };

  // Nav View routers helper
  const navigateToProduct = (name, tagline, img, features) => {
    setSelectedProductData({ name, tagline, img, features });
    setActiveView('product-detail');
  };

  const navigateToBlog = (title, author, content, img) => {
    setSelectedBlogData({ title, author, content, img });
    setActiveView('blog');
  };

  return (
    <div className="min-h-screen bg-surface-base text-text-body font-body antialiased">
      
      {/* S1: Top Utility Bar */}
      <div className="w-full bg-surface-dark py-2 px-4 text-xs text-white flex flex-col md:flex-row justify-between items-center z-50 relative border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="font-semibold tracking-wide">AUTHORIZED BANGUR CEMENT CFA</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">Guna District, MP (Est. 1973)</span>
        </div>
        <div className="flex items-center gap-4 mt-1 md:mt-0">
          <a href="tel:+919893156560" className="flex items-center gap-1.5 hover:text-brand-red font-semibold">
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            <span>+91 98931 56560</span>
          </a>
          <span className="text-gray-600">|</span>
          <a href="https://wa.me/919893156560" className="flex items-center gap-1.5 text-whatsapp font-semibold">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp CFA</span>
          </a>
        </div>
      </div>

      {/* S2: Main Navigation */}
      <header className="sticky top-0 bg-white shadow-md z-40 border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <a href="#" onClick={() => setActiveView('home')} className="flex items-center outline-none">
                <Logo className="h-11 object-contain" />
              </a>
              <div className="hidden sm:flex items-center gap-3 border-l-2 border-border-default pl-4 h-10 select-none">
                <BangurLogo className="h-8 object-contain" />
                <div className="h-5 w-[1px] bg-border-default" />
                <ShreeCementLogo className="h-8 object-contain" />
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm">
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none">About Us</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('products')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none">Bangur Range</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('tech-support')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none">Tech Support</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none">CFA Workflow</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('enquiry')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none">Become Dealer</button>
              <button onClick={() => setActiveView('contact-us')} className="hover:text-brand-red outline-none">Contact</button>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="#enquiry"
                className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 rounded-none font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 font-mono border-2 border-brand-red hover:-translate-y-0.5 transition-all"
              >
                <span>Become Partner</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text-primary">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t p-4 space-y-3 shadow-inner">
            <button onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold">Home</button>
            <button onClick={() => { setActiveView('distributor-enquiry'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold text-brand-red">Become Dealer</button>
            <button onClick={() => { setActiveView('contact-us'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-semibold">Contact CFA</button>
          </div>
        )}
      </header>

      {/* VIEW ROUTER SWITCHER */}
      {activeView === 'home' && (
        <main>
          {/* B: Apple-style Hero Scroll scrub Sequence */}
          <HeroScrollScrub />

          {/* S3: Hero Copy Section */}
          <section className="py-20 md:py-28 bg-surface-base border-b border-border-default blueprint-pattern">
            <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
              <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs md:text-sm font-mono bg-brand-red/5 px-3 py-1 border border-brand-red/25">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span>AUTHORIZED BANGUR CEMENT CFA · GUNA, MP</span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-text-primary uppercase leading-[0.95] tracking-tight">
                BUILDING SOLID<br />FOUNDATIONS SINCE 1973.
              </h2>
              
              <p className="text-text-body text-base sm:text-lg max-w-3xl mx-auto font-body leading-relaxed">
                Direct from <span className="font-bold text-[#005468]">Shree Cement Ltd.</span> — India's 3rd largest cement producer. Authorized Guna CFA delivering factory-fresh OPC and PPC concrete formulations directly to your site with zero speculative markups.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href="#enquiry"
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3.5 rounded-none font-semibold tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5 outline-none focus-visible:ring-2 font-mono border-2 border-brand-red"
                >
                  <span>BECOME A PARTNER</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/919893156560?text=Hi%2C%20I%27m%20interested%20in%20Bangur%20Cement.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-surface-muted text-whatsapp border-2 border-whatsapp px-8 py-3.5 rounded-none font-semibold tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md outline-none focus-visible:ring-2 font-mono"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </section>

          {/* S4: Stats Strip */}
          <section className="bg-surface-dark py-12 md:py-16 concrete-noise">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="border-r border-gray-800 last:border-0">
                <StatCounter target="52" suffix="+" />
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Years Guna CFA Trust</p>
              </div>
              <div className="border-r border-gray-800 last:border-0">
                <StatCounter target="10000" suffix="+" />
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Builders & Retailers</p>
              </div>
              <div className="border-r border-gray-800 last:border-0">
                <StatCounter target="6" />
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Premium Bag Series</p>
              </div>
              <div>
                <span className="font-display text-4xl sm:text-5xl font-black text-white">PAN-GUNA</span>
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Logistics routes</p>
              </div>
            </div>
          </section>

          {/* S5: About Section with Stacked photo cards stack */}
          <section id="about" className="py-20 md:py-28 bg-surface-base border-b border-border-default">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* D: Stacked Card Deck component column (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] cursor-pointer" onClick={() => setStoryIndex(prev => (prev + 1) % storyDecks.length)}>
                  {storyDecks.map((card, idx) => {
                    const offset = (idx - storyIndex + storyDecks.length) % storyDecks.length;
                    const isTop = offset === 0;
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-0 bg-white border-2 border-border-default rounded-none overflow-hidden p-3 shadow-sm hover:shadow-lift transition-all duration-500 ease-out select-none`}
                        style={{
                          transform: `scale(${1 - offset * 0.04}) translate(${offset * 10}px, ${offset * 10}px) rotate(${offset * 0.5}deg)`,
                          zIndex: storyDecks.length - offset,
                          opacity: offset > 2 ? 0 : 1
                        }}
                      >
                        <div className="w-full h-[65%] bg-surface-dust rounded-none overflow-hidden relative">
                          <img src={card.img} alt={card.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                          <span className="absolute top-2 left-2 bg-brand-red text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-none font-mono">
                            {card.badge}
                          </span>
                        </div>
                        <div className="p-3 text-left space-y-1">
                          <h4 className="font-display font-bold uppercase text-text-primary text-base leading-none mt-1">{card.title}</h4>
                          <p className="text-[10px] text-text-muted leading-relaxed font-body line-clamp-3">{card.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Indicators & Technical Monospaced Counter */}
                <div className="mt-8 flex flex-col items-center space-y-3">
                  <div className="flex gap-2">
                    {storyDecks.map((_, i) => (
                      <span 
                        key={i} 
                        onClick={(e) => { e.stopPropagation(); setStoryIndex(i); }}
                        className={`w-2.5 h-1.5 transition-colors cursor-pointer ${i === storyIndex ? 'bg-brand-red w-4' : 'bg-border-default'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-text-primary uppercase tracking-widest font-mono">
                    Story Frame {String(storyIndex + 1).padStart(2, '0')} / {String(storyDecks.length).padStart(2, '0')}
                  </p>
                </div>
              </div>

              {/* Story Description (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs">
                  <span className="w-6 h-[2px] bg-brand-red block" />
                  <span>OUR LEGACY & DIRECT TECHNICAL VALUE</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-text-primary uppercase leading-tight">
                  FROM 1973 TO TODAY — STILL BUILDING <span className="text-brand-red">TRUST.</span>
                </h2>
                <p className="text-text-body text-sm font-body leading-relaxed">
                  Siddharth Cement Sales began operations in 1973 under the family trade banner **"Siddarth Sales"** in Guna. Over five decades, we have dispatch structural concrete loads for central MP major developments, maintaining Accredited CFA direct-factory pricing guidelines with zero speculative markups.
                </p>
                <div className="border-l-4 border-brand-red bg-surface-muted pl-6 py-4 rounded-r-md">
                  <p className="font-display text-base font-bold uppercase text-brand-red italic">
                    "Built on trust. Sealed by quality. Delivered with pride."
                  </p>
                </div>

                {/* Technical supportAvailable Badge */}
                <div className="bg-brand-red/5 border border-brand-red/20 rounded-md p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HardHat className="w-4.5 h-4.5 text-brand-red" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-sm uppercase text-text-primary tracking-wide">✓ Technical Support Available</h5>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Siddharth Cement Sales provides certified masonry seminars, structural cover scanners, and free concrete slump testing van dispatches directly to residential sites.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* S7: Corrected Mismatch Product Range */}
          <section id="products" className="py-20 md:py-28 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
              <div className="space-y-4 max-w-3xl mx-auto">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider">CEMENT SOLUTIONS BY ACCREDITED CFA</span>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-text-primary uppercase tracking-tight">THE COMPLETE BANGUR RANGE — IN STOCK.</h2>
                <p className="text-text-muted text-sm font-body">Verify correct bag mapping with vertical product photographs direct from Shree Cement factories.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Bangur Magna', tagline: 'The Premium Standard', img: IMAGES.rockstrong, desc: 'Premium clinker blend engineered for high strength concrete RCC slabs, columns, and solid support structural beams.' },
                  { name: 'Bangur Roofon Plus', tagline: 'The Concrete Master', img: IMAGES.powermax, desc: 'Specialized concrete compound engineered for residential roof slabs pouring, ceilings, and smooth structural finishing.' },
                  { name: 'Bangur Shree Jungrodhak', tagline: 'Ghar ki Dhaal, Saalon Saal', img: IMAGES.jungrodhak, desc: 'Corrosion resistant formulation developed to protect internal rebar steel rebars from moisture dampness.' },
                  { name: 'Bangur Powermax', tagline: 'Power Grind Technology', img: IMAGES.magna, desc: 'Processed with advanced grinds to guarantee maximum setting hydration speeds and structural crack resistance.' },
                  { name: 'Bangur Rockstrong', tagline: 'Rock-Like Strength', img: IMAGES.roofon, desc: 'Heavy load-bearing compound suited for heavy infrastructure bridges, commercial foundations, and industrial works.' },
                  { name: 'Bangur White Marble', tagline: 'Finish That Lasts', img: IMAGES.marble, desc: 'Prinstine white cement blend suited for white marble joint grouting, tile sealing, and smooth custom works.' }
                ].map((product, idx) => (
                  <div key={idx} className="bg-white border-2 border-border-default rounded-none flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lift transition-all duration-300 hover:-translate-y-1 group">
                    <div className="p-6 pb-2 text-left">
                      <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-none font-bold uppercase tracking-wider font-mono">BIS Compliant</span>
                      <h3 className="font-display text-2xl font-bold uppercase text-text-primary mt-2">{product.name}</h3>
                      <p className="text-xs text-brand-red italic font-semibold mt-0.5">"{product.tagline}"</p>
                      <p className="text-xs text-text-muted mt-3 line-clamp-2">{product.desc}</p>
                    </div>
                    <div className="h-52 flex items-center justify-center p-4">
                      <img src={product.img} alt={product.name} className="h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 pt-2 space-y-4">
                      <div className="flex gap-2 border-t border-border-default pt-4">
                        <button 
                          onClick={() => navigateToProduct(product.name, product.tagline, product.img, product.desc)}
                          className="flex-grow bg-surface-muted hover:bg-surface-dust text-text-primary text-center py-2.5 rounded-none font-semibold text-xs tracking-wider uppercase transition-colors"
                        >
                          Know More
                        </button>
                        <a 
                          href={`https://wa.me/919893156560?text=Hi%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand-red hover:bg-brand-red-dark text-white px-4 py-2.5 rounded flex items-center justify-center transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* S7B: Helper OPC vs PPC Tool */}
          <section className="py-20 bg-surface-base border-b border-border-default">
            <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
              <h3 className="font-display text-3xl font-black text-text-primary uppercase">OPC OR PPC? WE'LL HELP YOU CHOOSE.</h3>
              <div className="grid grid-cols-2 bg-surface-muted border border-border-default rounded overflow-hidden">
                <button onClick={() => setSelectedCementType('OPC')} className={`py-4 font-display font-semibold uppercase tracking-wider transition-colors ${selectedCementType === 'OPC' ? 'bg-brand-red text-white' : 'hover:bg-surface-dust text-text-muted'}`}>🏗️ OPC (Speed)</button>
                <button onClick={() => setSelectedCementType('PPC')} className={`py-4 font-display font-semibold uppercase tracking-wider transition-colors ${selectedCementType === 'PPC' ? 'bg-brand-red text-white' : 'hover:bg-surface-dust text-text-muted'}`}>🛡️ PPC (Durability)</button>
              </div>
              <div className="bg-white p-6 rounded border border-border-default text-left shadow-sm">
                {selectedCementType === 'OPC' ? (
                  <p className="text-xs text-text-body leading-relaxed">Ordinary Portland Cement (43/53 Grade) provides extremely rapid early structural load strength. Ideal for commercial RCC beams, roads, and bridges where timeline speeds are critical.</p>
                ) : (
                  <p className="text-xs text-text-body leading-relaxed">Portland Pozzolana Cement utilizes fly ash particles to build an impermeable barrier over generations. Features low hydration heats preventing structural micro-cracks inside cellars and tanks.</p>
                )}
              </div>
            </div>
          </section>

          {/* S7C: Technical Support Section */}
          <section id="tech-support" className="py-20 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
              <h3 className="font-display text-4xl font-black text-text-primary uppercase">TECHNICAL SUPPORT & SITE TESTING SERVICES.</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded border border-border-default shadow-sm">
                  <Truck className="w-8 h-8 text-brand-red mb-4" />
                  <h4 className="font-display font-bold uppercase text-text-primary text-base">On-Site Testing Van</h4>
                  <p className="text-xs text-text-muted mt-2">Free workability checks, slump cone reviews, and mixing guidelines dispatched direct to slab concrete pour sites.</p>
                </div>
                <div className="bg-white p-6 rounded border border-border-default shadow-sm">
                  <Shield className="w-8 h-8 text-brand-red mb-4" />
                  <h4 className="font-display font-bold uppercase text-text-primary text-base">Rebar Cover Scan</h4>
                  <p className="text-xs text-text-muted mt-2">Electromagnetic measurements checking concrete depth layers to shield rebar structural grids against moisture dampness.</p>
                </div>
                <div className="bg-white p-6 rounded border border-border-default shadow-sm">
                  <Award className="w-8 h-8 text-brand-red mb-4" />
                  <h4 className="font-display font-bold uppercase text-text-primary text-base">Lab Cube Crusher</h4>
                  <p className="text-xs text-text-muted mt-2">Mortar cube strength testing checked after 7 and 28 days inside Guna testing facilities to verify design load compliance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* E: Scroll delivery truck route timeline */}
          <section id="process" className="py-20 bg-surface-base border-b border-border-default scroll-mt-20">
            <div className="max-w-7xl mx-auto text-center space-y-8 px-4">
              <h3 className="font-display text-4xl font-black text-text-primary uppercase">DIRECT SUPPLY CHAIN LOGISTICS</h3>
              <p className="text-xs text-text-muted max-w-2xl mx-auto font-semibold uppercase text-brand-red">★ Fresh stock direct from Shree Cement plants with zero speculative middleman markup ★</p>
              <ScrollDeliveryTimeline />
            </div>
          </section>

          {/* S11: Fixed Guide cards grid (F Upgrades) */}
          <section className="py-20 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
              <h3 className="font-display text-4xl font-black text-text-primary uppercase">BUILDING YOUR HOME? START HERE.</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { title: 'OPC vs PPC vs PSC Cement Comparison', desc: 'Easy comparative parameters breakdown mapping appropriate grades to residential brickwork, columns, and plaster finishes.', img: IMAGES.guideOpcPpc },
                  { title: '43 Grade vs 53 Grade Cement', desc: 'Demystifying concrete grade markings. Learn what numerical metrics indicate for curing timelines and heavy design loads.', img: IMAGES.guideGrades },
                  { title: 'Correct Cement Storage Guidelines', desc: 'Hydration protection steps. Stacking on robust dry wooden pallets, plastic sheeting, and weather shelter preservation.', img: IMAGES.guideStorage }
                ].map((blog, idx) => (
                  <div key={idx} className="bg-white rounded border border-border-default overflow-hidden flex flex-col justify-between h-full group hover:shadow-lift transition-shadow duration-300">
                    <div className="aspect-[16/9] w-full bg-surface-dust relative overflow-hidden">
                      <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                      <div>
                        <h4 className="font-display text-lg font-bold uppercase text-text-primary group-hover:text-brand-red transition-colors">{blog.title}</h4>
                        <p className="text-xs text-text-muted mt-2 leading-relaxed">{blog.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-border-default">
                        <button 
                          onClick={() => navigateToBlog(blog.title, 'SCS Engineer team', blog.desc + ' This detailed article covers concrete moisture protection and BIS standards.', blog.img)}
                          className="text-xs text-brand-red font-bold uppercase tracking-wider hover:underline flex items-center gap-1.5"
                        >
                          <span>Read Full Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* S11.5: Homepage Distributor / Dealer Enquiry Form */}
          <section id="enquiry" className="py-20 md:py-28 bg-surface-base border-b border-border-default blueprint-pattern scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Informational left-column (5 cols) */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs font-mono">
                  <span className="w-6 h-[2px] bg-brand-red block" />
                  <span>DIRECT CFA SUPPLY NETWORK</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-text-primary uppercase leading-tight">
                  PARTNER WITH GUNA'S <span className="text-brand-red">STRONGEST</span> NETWORK.
                </h2>
                <p className="text-text-body text-sm font-body leading-relaxed">
                  Whether you are a local hardware retailer seeking reliable distributorship terms or a bulk builder managing large structural slab projects, we provide clinker-fresh stocks straight from **Bangur (Shree Cement Ltd.)** plants.
                </p>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3 bg-white p-4 border border-border-default rounded-none shadow-sm">
                    <span className="material-symbols-outlined text-brand-red text-2xl pt-0.5">verified</span>
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase text-text-primary">Accredited Pricing</h4>
                      <p className="text-xs text-text-muted mt-1">Zero middlemen speculative pricing markups. Authentic Shree Cement corporate rates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 border border-border-default rounded-none shadow-sm">
                    <span className="material-symbols-outlined text-brand-red text-2xl pt-0.5">local_shipping</span>
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase text-text-primary">12-24 Hour Transit Logistics</h4>
                      <p className="text-xs text-text-muted mt-1">Direct fleet dispatch from central Guna warehouse depots direct to your site coordinates.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Container (7 cols) */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 border-2 border-border-default rounded-none shadow-sm relative">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-none border border-green-200 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-black text-text-primary uppercase">Enquiry Received Successfully!</h3>
                    <p className="text-sm text-text-muted font-body max-w-md mx-auto">
                      Thank you. We'll call you within 24 hours. Your details have been logged in our CFA routing register.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2.5 rounded-none font-semibold text-xs tracking-wider uppercase transition-colors font-mono"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submitToFormAction} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName" 
                          required 
                          value={formData.fullName} 
                          onChange={handleInputChange} 
                          placeholder="e.g. Ramesh Jain"
                          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">Mobile Phone *</label>
                        <input 
                          type="tel" 
                          name="mobile" 
                          required 
                          pattern="[0-9]{10}"
                          value={formData.mobile} 
                          onChange={handleInputChange} 
                          placeholder="e.g. 9893156560"
                          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">WhatsApp (Optional)</label>
                        <input 
                          type="tel" 
                          name="whatsapp" 
                          value={formData.whatsapp} 
                          onChange={handleInputChange} 
                          placeholder="If different from Mobile"
                          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">City / Town *</label>
                        <input 
                          type="text" 
                          name="city" 
                          required 
                          value={formData.city} 
                          onChange={handleInputChange} 
                          placeholder="e.g. Guna, Aron, Ashoknagar"
                          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">Enquiry Type *</label>
                        <select 
                          name="enquiryType" 
                          value={formData.enquiryType} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors animate-[select] duration-150"
                        >
                          <option value="Distributor">Distributor Request</option>
                          <option value="Dealer">Authorized Sub-Dealer</option>
                          <option value="Bulk Buyer">Bulk Institutional Buyer</option>
                          <option value="Builder">Builder / Contractor</option>
                          <option value="Individual">Individual Home Builder</option>
                          <option value="Other">Other Query</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">Monthly Requirement *</label>
                        <select 
                          name="monthlyRequirement" 
                          value={formData.monthlyRequirement} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors"
                        >
                          <option value="<100">Less than 100 bags</option>
                          <option value="100-500">100 to 500 bags</option>
                          <option value="500-2000">500 to 2000 bags</option>
                          <option value="2000+">More than 2000 bags</option>
                          <option value="Not Sure">Not Sure</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">Message / Site Details (Optional)</label>
                      <textarea 
                        name="message" 
                        rows="3" 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        placeholder="Detail your structure requirements, site coordinates or retail dispatch schedules..."
                        className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-none text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <button 
                        type="submit" 
                        className="bg-brand-red hover:bg-brand-red-dark text-white py-3.5 rounded-none font-semibold text-xs tracking-wider uppercase text-center transition-colors font-mono"
                      >
                        SUBMIT ENQUIRY
                      </button>
                      <a 
                        href={getWhatsAppURL()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-whatsapp hover:bg-green-600 text-white py-3.5 rounded-none font-semibold text-xs tracking-wider uppercase text-center transition-colors font-mono flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>SEND VIA WHATSAPP</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </section>

          {/* S12: Carousel Testimonials feedback */}
          <section className="py-20 bg-surface-base border-b border-border-default">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
              <h3 className="font-display text-4xl font-black text-text-primary uppercase">WHAT GUNA'S BUILDERS SAY.</h3>
              
              <div className="bg-white p-8 rounded border border-border-default shadow-lift relative text-left min-h-[250px] flex flex-col justify-between">
                <span className="absolute top-4 right-6 text-7xl text-surface-muted select-none">“</span>
                <div className="space-y-4">
                  <div className="flex text-brand-red gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs font-semibold text-brand-red tracking-wider uppercase bg-brand-red/5 px-2 py-0.5 rounded w-max">
                    {feedbackList[carouselIndex].project}
                  </p>
                  <p className="text-sm italic text-text-body font-medium leading-relaxed font-body">"{feedbackList[carouselIndex].quote}"</p>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-border-default mt-6">
                  <img src={feedbackList[carouselIndex].avatar} alt={feedbackList[carouselIndex].name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-text-primary leading-tight">{feedbackList[carouselIndex].name}</h4>
                    <p className="text-[10px] text-text-muted font-bold uppercase">{feedbackList[carouselIndex].role} · <span className="text-brand-red">{feedbackList[carouselIndex].location}</span></p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button onClick={() => setCarouselIndex(prev => (prev - 1 + feedbackList.length) % feedbackList.length)} className="p-2 border rounded hover:bg-surface-muted"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={() => setCarouselIndex(prev => (prev + 1) % feedbackList.length)} className="p-2 border rounded hover:bg-surface-muted"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </section>

          {/* S13: Stylized regional map Guna */}
          <section className="py-20 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <h3 className="font-display text-4xl font-black text-text-primary uppercase leading-tight">WE COVER THE WHOLE OF GUNA — AND BEYOND.</h3>
                <p className="text-xs text-text-muted leading-relaxed">Map dispatch route timings direct from central CFA warehousing nodes daily.</p>
                
                <div className="relative aspect-video bg-white rounded border border-border-default overflow-hidden flex items-center justify-center p-4">
                  <svg viewBox="0 0 400 300" className="w-full h-full stroke-border-default fill-surface-base pointer-events-none select-none">
                    <path d="M 120 40 C 220 20, 260 50, 310 90 C 350 120, 380 180, 360 220 C 330 270, 250 280, 180 270 C 130 260, 60 240, 50 180 C 40 120, 50 50, 120 40 Z" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                  {mapPins.map((pin, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePin(activePin === idx ? null : idx)}
                      onMouseEnter={() => setActivePin(idx)}
                      className="absolute w-4 h-4 rounded-full bg-brand-red border border-white"
                      style={{ left: pin.x, top: pin.y }}
                    />
                  ))}
                  {activePin !== null && (
                    <div className="absolute top-4 left-4 bg-surface-dark text-white p-4 rounded shadow-xl max-w-xs border border-gray-800 text-left">
                      <h5 className="font-display font-bold uppercase text-brand-red text-xs">{mapPins[activePin].name}</h5>
                      <p className="text-[10px] text-gray-300 mt-1">{mapPins[activePin].info}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 text-left space-y-6">
                <h4 className="font-display text-lg font-bold uppercase text-text-primary border-b pb-2">Active supply points Guna:</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold"><Check className="w-4 h-4 text-brand-red" /> Guna Head Office</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-red" /> Ashoknagar</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-red" /> Bina</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-red" /> Shivpuri</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-red" /> Aron</div>
                  <div className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-red" /> Sironj</div>
                </div>
              </div>
            </div>
          </section>

          {/* S14: Contact segment */}
          <section className="py-20 bg-surface-base border-b border-border-default">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded border border-border-default relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red" />
                <h4 className="font-display font-bold uppercase text-text-primary text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-red" /> Guna CFA Office</h4>
                <p className="text-xs text-text-muted leading-relaxed mt-4">Siddharth Cement Sales, Near Bus Stand, Lahoti Marg, Guna HO – 473001, MP.</p>
              </div>
              <div className="bg-white p-6 rounded border border-border-default relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red" />
                <h4 className="font-display font-bold uppercase text-text-primary text-lg flex items-center gap-2"><Phone className="w-5 h-5 text-brand-red" /> Call Hotline</h4>
                <a href="tel:+919893156560" className="text-base font-bold text-text-primary block mt-4 hover:text-brand-red">+91 98931 56560</a>
                <p className="text-[10px] text-text-muted mt-1">CFA Office Landline: 07542-256560</p>
              </div>
              <div className="bg-white p-6 rounded border border-border-default relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red" />
                <h4 className="font-display font-bold uppercase text-text-primary text-lg flex items-center gap-2"><Clock className="w-5 h-5 text-brand-red" /> Operational Hours</h4>
                <p className="text-xs text-text-body font-semibold mt-4">Mon - Sat: 9:00 AM - 8:00 PM</p>
                <p className="text-xs text-text-body font-semibold">Sunday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* DYNAMIC PRODUCT DETAILS VIEW ROUTE */}
      {activeView === 'product-detail' && selectedProductData && (
        <div className="max-w-5xl mx-auto px-4 py-16 text-left space-y-12">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white p-8 rounded border border-border-default shadow-lift">
            <div className="md:col-span-5 flex justify-center">
              <img src={selectedProductData.img} alt={selectedProductData.name} className="h-[350px] object-contain" />
            </div>
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded font-bold uppercase tracking-wider">Authorized Guna CFA</span>
              <h2 className="font-display text-4xl font-black text-text-primary uppercase leading-none">{selectedProductData.name}</h2>
              <p className="text-sm text-brand-red italic font-bold">"{selectedProductData.tagline}"</p>
              <p className="text-sm text-text-body leading-relaxed">{selectedProductData.features}</p>
              
              <div className="border-t border-border-default pt-6 space-y-3 text-xs text-text-muted">
                <p className="font-bold text-text-primary uppercase">Technical Blending Recommendations:</p>
                <ul className="space-y-1.5 list-disc pl-4 font-body">
                  <li>OPC / PPC composition compliant with BIS IS-1489 specifications.</li>
                  <li>Low moisture permeability shields reinforcing steel rebar depth.</li>
                  <li>Fast hydraulic heat setting values allow rapid shuttering removal.</li>
                </ul>
              </div>

              <div className="pt-4 flex gap-4">
                <a 
                  href={`https://wa.me/919893156560?text=Hi%2C%20I%20am%20interested%20in%20direct%20CFA%20pricing%20for%20${encodeURIComponent(selectedProductData.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-whatsapp hover:bg-green-600 text-white px-6 py-3 rounded font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" /> Send WhatsApp Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC BLOG/GUIDE VIEW ROUTE */}
      {activeView === 'blog' && selectedBlogData && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-8">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </button>
          
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-black text-text-primary uppercase leading-tight">{selectedBlogData.title}</h2>
            <p className="text-xs text-text-muted font-semibold uppercase">Published by {selectedBlogData.author} · Guna Central Depot</p>
            <div className="aspect-[16/9] w-full bg-surface-dust rounded overflow-hidden shadow">
              <img src={selectedBlogData.img} alt={selectedBlogData.title} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 text-sm text-text-body font-body leading-relaxed">
              <p>{selectedBlogData.content}</p>
              <p>Ensuring concrete preservation is highly dependent on moisture protection scans. We stack fresh sealed bags on 15cm raised wooden platforms inside closed depots. Keep dry pallets isolated from subgrade walls. Complete structural rebar scanning on direct slab layouts before pour is recommended to secure maximum lifetime durability.</p>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC DISTRIBUTOR/DEALER ENQUIRY VIEW ROUTE */}
      {activeView === 'distributor-enquiry' && (
        <div className="max-w-3xl mx-auto px-4 py-16 text-left space-y-8">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </button>

          <div className="bg-white p-8 rounded border border-border-default shadow-lift space-y-6">
            <div>
              <h3 className="font-display text-3xl font-black text-text-primary uppercase leading-none">BECOME A BANGUR DEALER</h3>
              <p className="text-xs text-text-muted mt-2">Partner with Guna's 52-year legacy CFA direct dispatch depots. We call back within 24 hours.</p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto text-whatsapp"><Check className="w-6 h-6" /></div>
                <h4 className="font-display font-bold uppercase text-text-primary text-xl">Enquiry Saved</h4>
                <a href={getWhatsAppURL()} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-6 py-2.5 rounded font-semibold text-xs uppercase tracking-wider inline-block">Confirm via WhatsApp</a>
              </div>
            ) : (
              <form onSubmit={submitToFormAction} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">Full Name *</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded text-sm text-text-primary" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">Mobile Phone *</label>
                    <input type="tel" name="mobile" required pattern="[0-9]{10}" value={formData.mobile} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded text-sm text-text-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">City/Town *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded text-sm text-text-primary" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">Monthly volume capacity</label>
                  <select name="monthlyRequirement" value={formData.monthlyRequirement} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded text-sm text-text-primary">
                    <option value="<100">Less than 100 bags</option>
                    <option value="100-500">100 to 500 bags</option>
                    <option value="500-2000">500 to 2000 bags</option>
                    <option value="2000+">More than 2000 bags</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-brand-red text-white py-3 rounded font-semibold text-xs tracking-wider uppercase">Submit Form</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DYNAMIC CONTACT VIEW ROUTE */}
      {activeView === 'contact-us' && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-8">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </button>

          <div className="bg-white p-8 rounded border border-border-default shadow-lift space-y-6">
            <h3 className="font-display text-3xl font-black text-text-primary uppercase leading-none">LET'S TALK CEMENT</h3>
            <p className="text-xs text-text-muted font-semibold uppercase">Siddharth Cement Sales · Authorized Carrying & Forwarding Agent</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-display font-bold uppercase text-brand-red">Walk-In Depot Address:</h4>
                  <p className="text-text-body font-body mt-1">Lahoti Marg, Near Guna Bus Stand, Guna HO – 473001, Madhya Pradesh, India.</p>
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-brand-red">Contact CFA lines:</h4>
                  <p className="text-text-primary font-bold mt-1">Hotline: +91 98931 56560</p>
                  <p className="text-text-muted">Landline office: 07542 - 256560</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-display font-bold uppercase text-brand-red">Operational dispatch schedules:</h4>
                  <p className="text-text-muted font-body mt-1">Monday to Saturday: 9:00 AM to 8:00 PM</p>
                  <p className="text-text-muted font-body">Sunday: 10:00 AM to 2:00 PM</p>
                  <p className="text-brand-red font-bold font-body mt-1">★ Bulk dispatch trucks operating 24x7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* S15: Footer */}
      <footer className="bg-surface-dark text-white pt-16 pb-8 border-t border-gray-800 relative z-30 concrete-noise">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 text-left mb-12">
          
          <div className="lg:col-span-5 space-y-6">
            <Logo className="h-11 object-contain" light={true} />
            <p className="text-xs text-gray-400 max-w-sm font-body leading-relaxed pt-2">
              Siddharth Cement Sales (Est. 1973) is Guna district's Authorized Carrying & Forwarding Agent (CFA) representing Bangur Cement, a Shree Cement Ltd. brand. Factory-direct dispatches and clinker-fresh depot stocks.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-800/50">
              <BangurLogo light={true} className="h-8 object-contain animate-[pulse_3s_infinite]" />
              <div className="h-4 w-[1px] bg-gray-800" />
              <ShreeCementLogo className="h-8 object-contain brightness-0 invert animate-[pulse_3s_infinite]" />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 text-xs font-semibold uppercase">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand-red">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 font-mono">
              <li><button onClick={() => setActiveView('home')} className="hover:text-white outline-none">Home</button></li>
              <li><button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 100); }} className="hover:text-white outline-none">About Us</button></li>
              <li><button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('enquiry')?.scrollIntoView(), 100); }} className="hover:text-white outline-none">Become Dealer</button></li>
              <li><button onClick={() => setActiveView('contact-us')} className="hover:text-white outline-none">Contact</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4 text-xs">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-brand-red">Bangur Cement</h4>
            <ul className="space-y-2 text-gray-400 font-mono">
              <li><button onClick={() => navigateToProduct('Bangur Magna', 'The Premium Standard', IMAGES.rockstrong, 'Premium clinker RCC slab concrete')} className="hover:text-white outline-none">Bangur Magna</button></li>
              <li><button onClick={() => navigateToProduct('Bangur Roofon Plus', 'The Concrete Master', IMAGES.powermax, 'Specialized roof pouring concrete')} className="hover:text-white outline-none">Bangur Roofon Plus</button></li>
              <li><button onClick={() => navigateToProduct('Bangur Shree Jungrodhak', 'Ghar ki Dhaal', IMAGES.jungrodhak, 'Anti-rust steel protection concrete')} className="hover:text-white outline-none">Shree Jungrodhak</button></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4 text-xs font-semibold uppercase">
            <h4 className="font-display text-sm font-bold tracking-widest text-brand-red font-bold">Contact CFA</h4>
            <p className="text-gray-400 font-body normal-case">Lahoti Marg, Near Bus Stand, Guna, MP – 473001</p>
            <p className="text-gray-400 font-mono">Tel: +91 98931 56560</p>
            <div className="pt-2 text-[8px] text-gray-500 font-mono uppercase tracking-wider">
              Authorized Carrying & Forwarding Agent
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-800 my-6" />

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
          <p>© 2025 Siddharth Cement Sales. All rights reserved. Carrying & Forwarding Agent.</p>
          <p>Shree Cement Ltd founded 1979, capacity 46.4 MTPA. Slogans and packaging remain copyright property Shree Cement Ltd.</p>
        </div>
      </footer>

      {/* Persistent Floating WhatsApp badge */}
      <a
        href="https://wa.me/919893156560?text=Hi%2C%20I%20have%20reviewed%20your%20website%20and%20want%20to%20request%20CFA%20cement%20pricing."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-2xl z-50 hover:bg-green-600 transition-all focus:outline-none focus:ring-4 focus:ring-whatsapp/20"
        title="Chat on WhatsApp direct"
      >
        <span className="absolute inset-0 w-full h-full bg-whatsapp rounded-full animate-ping opacity-25" />
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>

    </div>
  );
}
