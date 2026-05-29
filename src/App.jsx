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
  FileText,
  Wallet,
  Calendar,
  Users,
  Scale,
  TrendingUp,
  Leaf,
  Coins,
  Target
} from 'lucide-react';


// Brand tokens & correct cement-bag static assets
const IMAGES = {
  heroBg: '/01JP1W9X0MFN9K72YR09G16DAM.jpg',         // Construction golden hour
  sealOfQuality: '/01J7NRJT7YRX298Y1ARAJR5SF8.png',   // Bangur official seal
  
  // Generated high-fidelity section assets
  vintageShop: '/vintage_shop_1973.png',              // Vintage shop (Siddarth Sales)
  oldStorefrontBags: '/old_storefront_bags_new.png',  // Storefront with bags stacked
  vintageDelivery: '/vintage_delivery.png',          // Retro transport truck
  durabilityRebar: '/durability_rebar.png',          // Concrete structural steel rebar
  
  // Newly added assets for Round 3 Revisions
  shriGanesh: '/shri_ganesh_new.png',
  vintageMaterialsShop: '/vintage_materials_shop_new.png',
  modernMaterialsShop: '/modern_materials_shop_new.png',
  cementWarehouse: '/cement_warehouse.png',
  opcSpeed: '/opc_speed.png',
  ppcDurability: '/ppc_durability.png',
  testingVan: '/testing_van.png',
  rebarScan: '/rebar_scan.png',
  cubeCrusher: '/cube_crusher.png',
  
  // Guide thumbnail generated images
  guideOpcPpc: '/guide_opc_ppc.png',
  guideGrades: '/guide_grades.png',
  guideStorage: '/guide_storage.png',

  // Correct product cards assignments matching your prompt instructions
  magna: '/01JMFEBNCEBP13REHNWG2NDY7W (1).png',       // Bangur Magna bag photo (Magna bag)
  roofon: '/01JMFECZ87CZ5JVETAMNBNWJE4.png',          // Bangur Roofon Plus bag photo (yellow bag)
  jungrodhak: '/01J6VJJ6Q9AYYCGH24CH2G3X2N.png',      // Bangur Jungrodhak bag photo
  powermax: '/01J6FS8N4FM1KE03MWKFTX2S33.png',        // Bangur Powermax bag photo (orange/blue bag)
  rockstrong: '/01J6FJ1YJRESFMVXCC0545HGF4.png',      // Bangur Rockstrong bag photo (green/blue bag)
  marble: '/01JJ1RT20EZBS0WWPKSK3D92JN.png',          // Bangur Marble White bag photo
};

// Extremely detailed technical guides for home building, cement grades, and correct storage
const DETAILED_GUIDES = {
  opc_ppc_psc: {
    title: 'OPC vs PPC vs PSC Cement Comparison',
    author: 'SCS Technical Expert Team',
    category: 'Material Selection',
    lastUpdated: 'May 2026',
    sections: [
      {
        type: 'text',
        heading: '1. Understanding the Core Differences',
        content: 'Selecting the correct cement type is the most critical decision in home construction. Cement is not just a single binding agent; it comes in three primary mineral formulations engineered for specific chemical properties, hydration rates, and environment exposures: OPC (Ordinary Portland Cement), PPC (Portland Pozzolana Cement), and PSC (Portland Slag Cement).'
      },
      {
        type: 'table',
        heading: '2. Comparative Properties Matrix',
        headers: ['Property', 'OPC (Ord. Portland)', 'PPC (Pozzolana)', 'PSC (Slag)'],
        rows: [
          ['Composition', '95% Clinker + 5% Gypsum', 'Clinker + Gypsum + 15-35% Fly Ash', 'Clinker + Gypsum + 35-70% Granulated Slag'],
          ['Heat of Hydration', 'Very High (Rapid heat release)', 'Low (Slow, continuous curing)', 'Very Low (Ideal for hot weather/mass concrete)'],
          ['Setting Time', 'Initial: ~30 min | Final: <600 min', 'Initial: ~45 min | Final: <600 min', 'Initial: ~60 min | Final: <600 min'],
          ['28-Day Compressive Strength', 'Rapid early strength (high)', 'Progressive continuous strength gain', 'High ultimate strength (cures longer)'],
          ['Chemical Resistance', 'Moderate', 'High (Resistant to sulfate/chloride attacks)', 'Excellent (Ideal for marine & damp locations)'],
          ['Recommended Use', 'Heavy columns, slab casting, pre-cast blocks', 'Masonry brickwork, plastering, residential roofs', 'Basement foundations, sewage channels, water dams']
        ]
      },
      {
        type: 'points',
        heading: '3. Best Applications and Engineering Recommendations',
        points: [
          {
            title: 'Ordinary Portland Cement (OPC):',
            desc: 'Best suited for fast-paced structural members where swift shuttering removal is necessary (e.g., high-load concrete frame columns, beams, pre-cast concrete structures). Due to its high heat of hydration, it requires extensive, meticulous water curing to prevent micro-cracks.'
          },
          {
            title: 'Portland Pozzolana Cement (PPC):',
            desc: 'The gold standard for residential plastering, brick masonry, and general slab casting. The addition of reactive fly ash creates a highly cohesive, plastic mix that is highly resistant to water penetration and reduces overall structural heat gaps, leading to crack-free, smooth surface finishes.'
          },
          {
            title: 'Portland Slag Cement (PSC):',
            desc: 'Designed for high corrosion resistance. Use this for foundations, piling, basements, septic tanks, and areas subjected to high soil salinity or constant moisture. The slag content inhibits alkali-aggregate reactions and seals pores at a microscopic level.'
          }
        ]
      },
      {
        type: 'text',
        heading: '4. Bureau of Indian Standards (BIS) Reference Codes',
        content: 'Always check the packaging for official BIS quality markings. OPC is regulated under IS:269-2015. PPC is covered under IS:1489(Part 1)-2015 for fly ash base, and PSC is covered under IS:455-2015. Ensure you buy from an authorized dealer like Siddharth Cement Sales to guarantee genuine batch testing certificates.'
      }
    ]
  },
  grade_43_53: {
    title: '43 Grade vs 53 Grade Cement',
    author: 'SCS Civil Design Lab',
    category: 'Structural Design',
    lastUpdated: 'May 2026',
    sections: [
      {
        type: 'text',
        heading: '1. What Do the Numbers Mean?',
        content: 'The "Grade" rating printed on your cement bags is the official representation of its standard compressive strength measured in Megapascals (MPa) or Newtons per square millimeter (N/mm²). These values are measured by crushing standard 7.07cm mortar cubes cast from that batch after precisely 28 days of wet laboratory curing.'
      },
      {
        type: 'table',
        heading: '2. Major Structural Differences',
        headers: ['Feature', '43 Grade Cement', '53 Grade Cement'],
        rows: [
          ['28-Day Strength', 'Minimum 43 MPa (430 kg/cm²)', 'Minimum 53 MPa (530 kg/cm²)'],
          ['Early Strength (3 Days)', 'Quick initial gain (~23 MPa)', 'Extremely rapid early strength (~27 MPa)'],
          ['Hydration Temperature', 'Moderate temperature rise', 'Very high heat release (rapid curing required)'],
          ['Cracking Susceptibility', 'Lower risk of thermal micro-cracks', 'Higher risk if not wet-cured meticulously'],
          ['Optimal Utility', 'General brick masonry, plastering, low-rise frames', 'High-strength concrete, heavy foundations, columns, roofs'],
          ['Cost Profile', 'Economical standard pricing', 'Premium structural pricing']
        ]
      },
      {
        type: 'points',
        heading: '3. When to Choose 43 Grade vs. 53 Grade',
        points: [
          {
            title: 'Choose 43 Grade for:',
            desc: 'Wall plastering, floor screeds, bricklaying, tile fixing, boundary walls, and all general non-structural concrete works. It offers excellent workability, sets at a controlled rate, and is far more forgiving of slight delays in water curing.'
          },
          {
            title: 'Choose 53 Grade for:',
            desc: 'Load-bearing concrete slabs, foundational footings, high-stress structural columns, beams, multi-story frameworks, and pre-stressed concrete members. It allows builders to remove structural wooden formwork earlier due to rapid early-stage hardening.'
          }
        ]
      },
      {
        type: 'text',
        heading: '4. Critical Construction Rule: Curing is Mandatory',
        content: 'Because 53 Grade cement develops strength rapidly, it produces higher hydration heat. If this heat is not compensated with systematic water spray curing, the concrete will dry too fast and develop hairline cracks, compromising structural load capacities. Curing must start as soon as the concrete sets and be maintained continuously for at least 7 to 10 days.'
      }
    ]
  },
  storage_guide: {
    title: 'Correct Cement Storage Guidelines',
    author: 'SCS Logistics & Quality Cell',
    category: 'Site Logistics',
    lastUpdated: 'May 2026',
    sections: [
      {
        type: 'text',
        heading: '1. The Silent Enemy: Atmospheric Moisture',
        content: 'Cement is a highly hygroscopic powder, meaning it actively absorbs moisture and water vapor from the surrounding air. If cement gets even minor exposure to water before mixing, it triggers "pre-hydration". This premature chemical reaction consumes the binding agents, causing the cement to set partially in the bag. A pre-hydrated bag can lose up to 50% of its ultimate structural bonding strength!'
      },
      {
        type: 'points',
        heading: '2. The 5-Step Storage Checklist for Construction Sites',
        points: [
          {
            title: '1. Raised Wooden Pallets (Elevation):',
            desc: 'Never stack cement bags directly on dry concrete floors or bare soil. Water seeps through subgrade floor tiles. Always create a dry wooden pallet platform raised at least 15 to 20 cm above the ground.'
          },
          {
            title: '2. Wall Clearance (Offset):',
            desc: 'Exterior brick walls absorb rain moisture and transfer it directly to stacked bags. Keep your stack at least 30 to 45 cm (1.5 feet) away from any interior or exterior walls to maintain continuous dry airflow.'
          },
          {
            title: '3. Stack Height Limits (Pressure Prevention):',
            desc: 'Limit your stacking height to a maximum of 10 bags. Stacking higher than this causes "warehouse pack" at the bottom layers—where excessive compressive pressure compacts the cement powder into hard, unworkable lumps.'
          },
          {
            title: '4. Polyethylene Tarpaulins (Sealing):',
            desc: 'Wrap the stack entirely in a heavy 700-gauge polyethylene plastic sheet or waterproof tarpaulin. Tightly tuck the edges under the bottom pallet to seal the stack against humid night breezes.'
          },
          {
            title: '5. First-In, First-Out (FIFO Rotation):',
            desc: 'Always use cement bags in the order they arrived. Cement active shelf-life starts declining after 3 months from the manufacturing date. Bags stored longer than 90 days must be re-tested in a compression lab before structural casting.'
          }
        ]
      },
      {
        type: 'text',
        heading: '3. What to Do with "Lumpy" Cement?',
        content: 'Before mixing, inspect each bag. If you find small soft lumps that break easily between your fingers, the cement is safe to use for minor non-structural applications like pathways or garden borders. However, if the lumps are stone-hard and cannot be broken by hand, the batch has completed pre-hydration and must be rejected immediately for load-bearing slabs or columns.'
      }
    ]
  }
};

// Icon component lookup dictionary for dynamic building stage cards
const IconMap = {
  Target,
  Wallet,
  Users,
  Calendar,
  FileText,
  Building2,
  MapPin,
  Layers,
  Map,
  Shield,
  Coins,
  Clock,
  Scale,
  HardHat,
  Leaf,
  PackageCheck
};

// Comprehensive multi-stage guidance cards data
const BUILDING_STAGES_DATA = {
  Planning: [
    {
      title: 'Set Clear Objectives',
      desc: 'Outline the long-term design, functional requirements, and space plans for your household.',
      icon: 'Target',
      checklist: ['Define family bedroom count', 'Select vastu orientation', 'Map vehicle parking space'],
      proTip: 'Draft 2D room layouts prior to consulting architects to save layout alteration fees.'
    },
    {
      title: 'Secure Financing',
      desc: 'Plan credit lines, home loan approvals, and personal construction reserves systematically.',
      icon: 'Wallet',
      checklist: ['Submit home loan application', 'Verify interest rates', 'Set cash draw down schedule'],
      proTip: 'Keep 15% of your total loan value in liquid savings for upfront foundation and permit spends.'
    },
    {
      title: 'Hire Construction Team',
      desc: 'Engage certified civil contractors, structural architects, and experienced masonry leads.',
      icon: 'Users',
      checklist: ['Check past Guna projects', 'Review work contract agreements', 'Establish standard billing rates'],
      proTip: 'Always confirm that your lead contractor understands RCC frame casting shuttering timelines.'
    },
    {
      title: 'Create a Detailed Timeline',
      desc: 'Set strict milestones from soil excavation to concrete slab curing and finishing works.',
      icon: 'Calendar',
      checklist: ['Excavation timeline', 'Foundations and column casting', 'Slab curing block schedules'],
      proTip: 'Plan slab casting outside peak monsoon seasons to prevent rainwater washout of fresh concrete.'
    },
    {
      title: 'Sort Legal Permits',
      desc: 'Secure town country planning clearances, diversion certificates, and building map approvals.',
      icon: 'FileText',
      checklist: ['Municipal map sanction', 'Land diversion clearance', 'Water connection NOC'],
      proTip: 'Keep certified Khasra/Khatoni land documents ready in digital format for faster permit dispatches.'
    },
    {
      title: 'Structural Layout',
      desc: 'Finalize high-strength structural detailing and load calculations with registered civil engineers.',
      icon: 'Building2',
      checklist: ['Verify beam reinforcement details', 'Check structural column spans', 'Confirm load-bearing grids'],
      proTip: 'Never cut cost on structural detailing. A strong structural plan prevents column settlement cracks.'
    }
  ],
  'Land Selection': [
    {
      title: 'Assess Location Prospects',
      desc: 'Check proximity to arterial roads, public transportation, schools, and medical hubs.',
      icon: 'MapPin',
      checklist: ['Distance to Guna highway', 'Proximity to daily markets', 'Future zoning trends in Guna'],
      proTip: 'Check for elevated drainage levels to prevent water logging in front of your gate during storms.'
    },
    {
      title: 'Analyze Soil Quality',
      desc: 'Ensure solid bearing capacity of the soil to support load-bearing structural columns.',
      icon: 'Layers',
      checklist: ['Identify soil type (Clay/Black Cotton)', 'Perform basic moisture test', 'Verify water table levels'],
      proTip: 'Black cotton soil absorbs high water, expanding aggressively. It requires deeper foundation piling.'
    },
    {
      title: 'Land Size & Shape',
      desc: 'Match the length, breadth, and layout orientation of the plot to your vastu-compliant draft.',
      icon: 'Map',
      checklist: ['Measure boundaries physically', 'Confirm non-tapering angles', 'Vastu-compliant entry direction'],
      proTip: 'Standard rectangular shapes (e.g., 1:2 ratio) are highly efficient and minimize brick wall waste.'
    },
    {
      title: 'Legal Title Check',
      desc: 'Verify ownership records, registration deeds, and clear non-encumbrance records.',
      icon: 'FileText',
      checklist: ['Check Guna registrar office', 'Confirm Rin Pustika entry', 'Verify prior sale history'],
      proTip: 'Obtain a 30-year non-encumbrance certificate (EC) to guarantee zero prior mortgage liabilities.'
    },
    {
      title: 'Evaluate Zoning Regulations',
      desc: 'Verify municipal setback guidelines, maximum floor-area ratios, and vertical height bounds.',
      icon: 'Building2',
      checklist: ['Verify municipal boundary setbacks', 'Check local road widening rules', 'Vertical height limit compliance'],
      proTip: 'Leave front and side setbacks to ensure natural ventilation and bypass government notices.'
    },
    {
      title: 'Water & Utility Grid',
      desc: 'Confirm groundwater borewell prospects, municipal drinking water pipeline lines, and power lines.',
      icon: 'MapPin',
      checklist: ['Check neighborhood borewell depth', 'Inspect nearby power poles', 'Sewage discharge outlets'],
      proTip: 'Borewell drilling must be completed prior to excavation to ensure plenty of water is ready for curing.'
    }
  ],
  Budgeting: [
    {
      title: 'Estimate Overall Cost',
      desc: 'Track total outlays including material supply invoices, labor contract fees, and legal registration.',
      icon: 'Coins',
      checklist: ['Compile material rate charts', 'Estimate civil labour billing', 'Include plumbing/wiring spends'],
      proTip: 'Typically, grey structure (foundations + frames) consumes 60% of the total budget; finishing takes 40%.'
    },
    {
      title: 'Allocate Contingency Funds',
      desc: 'Set aside dedicated emergency savings to cover sudden cost increments or supply chain shifts.',
      icon: 'Shield',
      checklist: ['Material price escalation reserve', 'Unforeseen site excavation spends', 'Emergency labor extensions'],
      proTip: 'Maintain a strict 15% contingency buffer. Steel rebar and cement prices fluctuate due to seasonal loads.'
    },
    {
      title: 'Monitor Expenses Regularly',
      desc: 'Keep systematic tallies of daily spend, supplier advances, and civil labor workweek payouts.',
      icon: 'Clock',
      checklist: ['Daily logbook updates', 'Match invoices to received stock', 'Track milestones before releases'],
      proTip: 'Never release 100% advanced payment to contractors. Tie billing directly to completed concrete slabs.'
    },
    {
      title: 'Structural Integrity First',
      desc: 'Prioritize long-term strength items over expensive decorative interior finishes.',
      icon: 'Scale',
      checklist: ['Invest in premium structural cement', 'Select high-grade TMT steel rebars', 'Postpone luxury modular kitchen buys'],
      proTip: 'You can change tiles and wall paint 10 years later, but you can never fix structural concrete foundations.'
    }
  ],
  'Selection of Materials': [
    {
      title: 'Prioritize Local Conditions',
      desc: 'Match material grades directly to atmospheric moisture exposures and local summer heat profiles.',
      icon: 'MapPin',
      checklist: ['Select concrete blending mixes', 'Check soil sulfate index', 'Identify weather-proof coatings'],
      proTip: 'In Guna\'s intense summer heat, Pozzolana (PPC) and Slag (PSC) cements are ideal to avoid heat gaps.'
    },
    {
      title: 'Grade-Specific Cement',
      desc: 'Use different cement types for structural frames and finish works to maximize structural strength.',
      icon: 'PackageCheck',
      checklist: ['OPC 53 for structural columns & slabs', 'PPC for plastering & masonry jointing', 'PSC for waterlogging basements'],
      proTip: 'Using Bangur Magna or Powermax for structural roofing ensures maximum moisture sealant protection.'
    },
    {
      title: 'High-Yield TMT Rebars',
      desc: 'Choose high-tensile thermo-mechanically treated reinforcement grids to protect against earthquake tremors.',
      icon: 'HardHat',
      checklist: ['Select Fe-550D grade steel', 'Confirm uniform rib pattern', 'Verify zero surface rust scaling'],
      proTip: 'D-grade steel bars (like Fe-550D) offer superior ductility to safely absorb heavy bending loads.'
    },
    {
      title: 'Aggregates & Sand Quality',
      desc: 'Procure zone-II coarse river sand and crushed aggregates with low clay particles for ultimate concrete bonding.',
      icon: 'Layers',
      checklist: ['Check clay index in sand', 'Washed blue aggregates (10mm/20mm)', 'Avoid smooth round stones'],
      proTip: 'Clay or silt in sand reduces cement bonding by 40%. Do a simple water-jar test on-site to verify sand.'
    },
    {
      title: 'Choose Sustainability',
      desc: 'Incorporate environmentally conscious building materials like AAC blocks, fly ash brick blends, and rain collectors.',
      icon: 'Leaf',
      checklist: ['AAC blocks for heat isolation', 'Fly ash brick masonry', 'Rainwater recharge channels'],
      proTip: 'AAC blocks are 3 times lighter than red clay bricks, reducing structural dead loads and wall heat profiles.'
    },
    {
      title: 'Site Material Preservation',
      desc: 'Implement rigorous protection protocols for stored materials on-site against moisture and humidity.',
      icon: 'Shield',
      checklist: ['Elevated timber platforms for cement', 'Dry steel rebar racks', 'Weather cover tarpaulins'],
      proTip: 'Always store steel rebars off the ground to prevent moisture-induced corrosion before concrete pouring.'
    }
  ]
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
  { name: 'Bamori', x: '30%', y: '35%', status: 'Active Supply Route', info: 'Fast builder transport dispatched daily.' },
  { name: 'Chachoda', x: '18%', y: '76%', status: 'Sub-Depot Supply Route', info: 'Direct dispatch service for individual homebuilders.' },
  { name: 'Binaganj', x: '15%', y: '85%', status: 'Active Retail Network', info: 'Authorized Shree Cement dealerships active with same-day loading.' },
  { name: 'Mayana', x: '52%', y: '65%', status: 'CFA Secondary Depot', info: 'Stock loading hub for nearby village construction grids.' },
  { name: 'Badarwas', x: '62%', y: '34%', status: 'Rural Supply Corridor', info: 'TMT steel rebar and PPC cement delivery dispatched daily.' }
];

// SCS Animated Emblem Icon (56x60 standard bounds)
const LogoIcon = ({ className = "h-11 shrink-0" }) => (
  <svg viewBox="0 0 56 60" className={`${className} shrink-0`} fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <style>{`
      @keyframes logoStrokeDraw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes logoShieldScale {
        0% { fill: #C8102E; }
        100% { fill: #9E0C24; }
      }
    `}</style>
  </svg>
);

// Combined Siddharth Cement Sales Header Lockup
const Logo = ({ light = false, hideSub = false }) => (
  <div className="flex items-center gap-2.5 sm:gap-3.5 select-none shrink-0">
    <LogoIcon className="h-10 sm:h-12 lg:h-14 shrink-0 transition-all hover:scale-105" />
    <div className="flex flex-col text-left justify-center">
      <h1 className={`font-display text-sm sm:text-base md:text-lg lg:text-xl font-extrabold tracking-tight leading-none ${light ? "text-white" : "text-[#1A1A1A]"}`}>
        SIDDHARTH <span className="text-brand-red font-black">CEMENT SALES</span>
      </h1>
      {!hideSub && (
        <span className={`text-[7px] sm:text-[8px] lg:text-[9.5px] font-mono tracking-wider font-black uppercase mt-1 ${light ? "text-gray-400" : "text-[#444444]"}`}>
          Authorized Bangur Cement CFA · Est. 1973
        </span>
      )}
    </div>
  </div>
);

// Bangur Inline Brand logo (pointing to the real high-fidelity assets)
const BangurLogo = ({ className = "h-9", light = false }) => (
  <img 
    src={light ? "/01J7NRJT7YRX298Y1ARAJR5SF8.png" : "/01J7NR83P0AA7CQ6MXAK2J4JS1.png"} 
    alt="Bangur Cement Logo" 
    className={`${className} shrink-0`} 
  />
);

// Shree Inline Brand logo (pointing to the real high-fidelity asset)
const ShreeCementLogo = ({ className = "h-9" }) => (
  <img 
    src="/01J7NRKPB4EMFN0M0EFRV8RD89.png" 
    alt="Shree Cement Logo" 
    className={`${className} shrink-0`} 
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
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [activeBuildingTab, setActiveBuildingTab] = useState('Planning');

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
      title: 'Authorized SCS Partner',
      desc: 'Collaborating with prominent retail building material outlets, supplying clinker-fresh Bangur Cement and structural steel direct to Guna contractors.',
      img: IMAGES.shriGanesh,
      badge: 'Key Partner Showcase'
    },
    {
      title: 'Our Vintage SCS Depot',
      desc: 'A nostalgic look back at our early retail footprint in central MP, laying down the groundwork of trust, quality, and community value.',
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

  const navigateToBlog = (title, author, content, img, key = null) => {
    const detailedGuide = key ? DETAILED_GUIDES[key] : null;
    setSelectedBlogData({ 
      title, 
      author, 
      content, 
      img, 
      sections: detailedGuide ? detailedGuide.sections : null,
      category: detailedGuide ? detailedGuide.category : 'Home Building',
      lastUpdated: detailedGuide ? detailedGuide.lastUpdated : 'May 2026'
    });
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
          <div className="flex items-center justify-between h-20 gap-4">
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <a href="#" onClick={() => setActiveView('home')} className="flex items-center outline-none shrink-0">
                <Logo />
              </a>
              <div className="hidden 2xl:flex items-center gap-2 lg:gap-3 border-l-2 border-border-default pl-2 lg:pl-4 h-10 select-none shrink-0">
                <BangurLogo className="h-6 lg:h-7 object-contain" />
                <div className="h-5 w-[1px] bg-border-default shrink-0" />
                <ShreeCementLogo className="h-6 lg:h-7 object-contain" />
              </div>
            </div>
            
            <nav className="hidden xl:flex items-center gap-3 xl:gap-6 font-semibold text-xs xl:text-sm shrink-0">
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none whitespace-nowrap">About Us</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('products')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none whitespace-nowrap">Bangur Range</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('tech-support')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none whitespace-nowrap">Tech Support</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none whitespace-nowrap">CFA Workflow</button>
              <button onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('enquiry')?.scrollIntoView(), 100); }} className="hover:text-brand-red outline-none whitespace-nowrap">Become Dealer</button>
              <button onClick={() => setActiveView('contact-us')} className="hover:text-brand-red outline-none whitespace-nowrap">Contact</button>
            </nav>

            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <a 
                href="#enquiry"
                className="bg-brand-red hover:bg-text-inverse text-white px-3 py-2 xl:px-5 xl:py-2.5 rounded-md font-semibold text-[10px] xl:text-xs tracking-wider uppercase flex items-center gap-1.5 font-mono border-2 border-brand-red hover:border-text-inverse hover:-translate-y-0.5 transition-all shrink-0 shadow-sm"
              >
                <span>Become Partner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="xl:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-text-primary">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-t-2 border-brand-red p-6 space-y-4 shadow-xl animate-[slideDown_0.2s_ease-out] select-none font-mono">
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); }}
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-text-primary hover:text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-text-primary hover:text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                About Us
              </button>
              <button 
                onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-text-primary hover:text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                Bangur Range
              </button>
              <button 
                onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('tech-support')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-text-primary hover:text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                Tech Support
              </button>
              <button 
                onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-text-primary hover:text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                CFA Workflow
              </button>
              <button 
                onClick={() => { setActiveView('home'); setIsMobileMenuOpen(false); setTimeout(() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                Become Dealer / Partner
              </button>
              <button 
                onClick={() => { setActiveView('contact-us'); setIsMobileMenuOpen(false); }} 
                className="w-full text-left py-2.5 px-3 hover:bg-surface-muted text-text-primary hover:text-brand-red font-bold text-xs uppercase transition-colors border border-transparent hover:border-border-default rounded-none"
              >
                Contact
              </button>
            </div>

            <div className="pt-4 border-t border-border-default flex flex-col gap-3">
              <a 
                href="#enquiry"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-red hover:bg-text-inverse hover:border-text-inverse text-white px-5 py-3 rounded-md font-bold text-xs tracking-wider uppercase text-center block border-2 border-brand-red shadow-md transition-all"
              >
                Get a Quote
              </a>
              <a 
                href="https://wa.me/919893156560?text=Hi%2C%20I%27m%20interested%20in%20Bangur%20Cement.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white hover:bg-surface-muted text-whatsapp border-2 border-whatsapp px-5 py-3 rounded-md font-bold text-xs tracking-wider uppercase text-center block flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* VIEW ROUTER SWITCHER */}
      {activeView === 'home' && (
        <main>
          {/* B: Apple-style Hero Scroll scrub Sequence */}
          <HeroScrollScrub />

          {/* S3: Hero Copy Section */}
          <section className="py-20 md:py-28 bg-surface-base border-b border-border-default blueprint-pattern relative overflow-hidden">
            {/* Top decorative hazard hazard stripes indicator */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-red via-accent-yellow to-brand-red" />

            <div className="max-w-5xl mx-auto px-4 text-center space-y-10 relative z-10">
              {/* Monospaced CFA Accreditation Stamp */}
              <div className="inline-flex items-center gap-2.5 text-brand-red font-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs bg-brand-red/5 px-4 py-2 border-2 border-brand-red/10 shadow-sm rounded-xs select-none animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-ping" />
                <span>★ ACCREDITED CARRYING & FORWARDING AGENT (CFA)</span>
              </div>
              
              <div className="space-y-6">
                {/* Heavy Industrial Concrete Title Box */}
                <div className="block sm:inline-block max-w-full bg-gradient-to-r from-white via-[#F4F4F0] to-white border-2 border-border-default border-l-[10px] border-l-brand-red px-6 py-4 sm:px-10 sm:py-6 shadow-md hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300 rounded-lg select-none">
                  <h1 className="font-display text-[24px] min-[360px]:text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-none m-0 relative">
                    SIDDHARTH <span className="text-brand-red relative inline-block">CEMENT SALES
                      <span className="absolute bottom-[-4px] left-0 w-full h-[3px] bg-brand-red/10 rounded-full" />
                    </span>
                  </h1>
                </div>

                {/* Subheading with ESTD. 1973 glowing element */}
                <h2 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#333333] uppercase tracking-tight leading-tight pt-2 flex items-center justify-center gap-2 flex-wrap">
                  <span>BUILDING SOLID FOUNDATIONS</span>
                  <span className="text-brand-red font-mono text-xs sm:text-sm border-2 border-brand-red/20 px-2.5 py-0.5 rounded bg-brand-red/5 select-none shrink-0 font-bold tracking-widest animate-pulse">ESTD. 1973</span>
                </h2>
              </div>
              
              <p className="text-text-body text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-body leading-relaxed text-[#444444] border-l-2 border-border-default pl-4 md:pl-6 text-left md:text-center italic">
                Direct from <span className="font-bold text-brand-red">Shree Cement Ltd.</span> — India's 3rd largest cement producer. Authorized Guna CFA delivering factory-fresh OPC and PPC concrete formulations directly to your site with zero speculative markups.
              </p>

              {/* Trust Credentials Panel (3 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6 pb-2 text-left">
                {/* Trust Card 1 */}
                <div className="bg-white p-5 rounded-lg border border-border-default/80 relative shadow-sm hover:border-brand-red/30 transition-all duration-300 group flex items-start gap-4 hover:shadow-lift">
                  <div className="w-10 h-10 bg-brand-red/5 flex items-center justify-center border border-brand-red/20 shrink-0 rounded-xs group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                    <Award className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-text-primary">Authorized CFA Status</h4>
                    <p className="text-[10px] text-text-muted leading-relaxed font-body">Direct-from-plant dispatches representing Bangur Cement and Shree Cement networks.</p>
                  </div>
                </div>

                {/* Trust Card 2 */}
                <div className="bg-white p-5 rounded-lg border border-border-default/80 relative shadow-sm hover:border-brand-red/30 transition-all duration-300 group flex items-start gap-4 hover:shadow-lift">
                  <div className="w-10 h-10 bg-brand-red/5 flex items-center justify-center border border-brand-red/20 shrink-0 rounded-xs group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                    <Shield className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-text-primary">Lab-Tested Quality</h4>
                    <p className="text-[10px] text-text-muted leading-relaxed font-body">Fresh clinker-locked cement stacks. Grade 43/53 checked strictly for setting hydration speeds.</p>
                  </div>
                </div>

                {/* Trust Card 3 */}
                <div className="bg-white p-5 rounded-lg border border-border-default/80 relative shadow-sm hover:border-brand-red/30 transition-all duration-300 group flex items-start gap-4 hover:shadow-lift">
                  <div className="w-10 h-10 bg-brand-red/5 flex items-center justify-center border border-brand-red/20 shrink-0 rounded-xs group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                    <Users className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-text-primary">52-Year Guna Legacy</h4>
                    <p className="text-[10px] text-text-muted leading-relaxed font-body">Est. 1973. Supplying central MP developments and 15k+ home builders with pure trust.</p>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href="#enquiry"
                  className="bg-brand-red hover:bg-text-inverse text-white px-8 py-3.5 rounded-md font-semibold tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5 outline-none focus-visible:ring-2 font-mono border-2 border-brand-red hover:border-text-inverse"
                >
                  <span>BECOME A PARTNER</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/919893156560?text=Hi%2C%20I%27m%20interested%20in%20Bangur%20Cement.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-surface-muted text-whatsapp border-2 border-whatsapp px-8 py-3.5 rounded-md font-semibold tracking-wider uppercase text-center transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-md outline-none focus-visible:ring-2 font-mono"
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
              <div className="border-r border-gray-800">
                <StatCounter target="52" suffix="+" />
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Years Guna CFA Trust</p>
              </div>
              <div className="lg:border-r border-gray-800">
                <StatCounter target="10000" suffix="+" />
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Builders & Retailers</p>
              </div>
              <div className="border-r border-gray-800">
                <StatCounter target="6" />
                <div className="w-12 h-1 bg-brand-red mx-auto mt-2 mb-1" />
                <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Premium Bag Series</p>
              </div>
              <div className="border-none">
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
              <div className="lg:col-span-5 flex flex-col items-center w-full">
                <div className="relative w-[88vw] max-w-[270px] sm:max-w-[320px] h-[330px] sm:h-[380px] cursor-pointer group/deck" onClick={() => setStoryIndex(prev => (prev + 1) % storyDecks.length)}>
                  {storyDecks.map((card, idx) => {
                    const offset = (idx - storyIndex + storyDecks.length) % storyDecks.length;
                    const isActive = offset === 0;
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-0 bg-white border-2 rounded-lg overflow-hidden p-3 shadow-md hover:shadow-lift transition-all duration-500 ease-out select-none flex flex-col justify-between ${
                          isActive ? 'border-brand-red shadow-lg ring-4 ring-brand-red/5' : 'border-border-default opacity-85'
                        }`}
                        style={{
                          transform: `scale(${1 - offset * 0.05}) translate(${offset * 12}px, ${offset * 12}px) rotate(${offset * 0.8}deg)`,
                          zIndex: storyDecks.length - offset,
                          opacity: offset > 2 ? 0 : 1
                        }}
                      >
                        <div className="w-full h-[65%] bg-surface-dust rounded-md overflow-hidden relative border border-border-default/50">
                          <img 
                            src={card.img} 
                            alt={card.title} 
                            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover/deck:scale-103 ${
                              isActive ? 'grayscale-0' : 'grayscale contrast-125 brightness-95'
                            }`} 
                          />
                          <span className="absolute top-3 left-3 bg-brand-red text-white text-[8px] font-mono font-black uppercase px-2.5 py-0.5 rounded-xs shadow-sm select-none">
                            {card.badge}
                          </span>
                          <span className="absolute bottom-3 right-3 bg-surface-dark/85 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-0.5 rounded-xs select-none">
                            ESTD. 1973
                          </span>
                        </div>
                        <div className="p-3 text-left space-y-1.5 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className={`font-display font-bold uppercase text-base leading-none mt-1 transition-colors duration-300 ${
                              isActive ? 'text-brand-red' : 'text-text-primary'
                            }`}>
                              {card.title}
                            </h4>
                            <p className="text-[10px] text-text-muted leading-relaxed font-body mt-1.5 line-clamp-3">
                              {card.desc}
                            </p>
                          </div>
                          
                          {/* Mini footer details inside the active card */}
                          {isActive && (
                            <div className="pt-2 border-t border-border-default/50 flex items-center justify-between text-[8px] font-mono text-brand-red uppercase font-semibold">
                              <span>★ DIRECT DISPATCH COMPLIANT</span>
                              <span>FRAME {String(idx + 1).padStart(2, '0')}</span>
                            </div>
                          )}
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
                        className={`w-2.5 h-1.5 transition-colors cursor-pointer rounded-xs ${i === storyIndex ? 'bg-brand-red w-4' : 'bg-border-default'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-text-primary uppercase tracking-widest font-mono select-none">
                    Story Frame {String(storyIndex + 1).padStart(2, '0')} / {String(storyDecks.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
 
              {/* Story Description (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs font-mono">
                  <span className="w-6 h-[2px] bg-brand-red block animate-pulse" />
                  <span>52-YEAR UNBREAKABLE GUNA LEGACY</span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl font-black text-text-primary uppercase leading-tight tracking-tight">
                  FROM 1973 TO TODAY — STILL BUILDING <span className="text-brand-red">TRUST.</span>
                </h2>
                
                {/* Active Card Story Context Sub-box */}
                <div className="bg-white p-5 rounded-lg border-2 border-brand-red/10 shadow-sm relative overflow-hidden transition-all duration-500 hover:border-brand-red/35">
                  <div className="absolute top-0 right-0 bg-brand-red/5 px-3 py-1 font-mono text-[9px] font-bold text-brand-red uppercase rounded-bl-lg select-none">
                    Story Segment {String(storyIndex + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-display font-bold uppercase text-text-inverse text-lg tracking-tight select-none">
                    {storyDecks[storyIndex].title}
                  </h4>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed font-body">
                    {storyDecks[storyIndex].desc}
                  </p>
                </div>

                <p className="text-text-body text-sm font-body leading-relaxed">
                  Siddharth Cement Sales began operations in 1973 under the family trade banner **"Siddarth Sales"** in Guna. Over five decades, we have dispatched premium structural concrete loads for central MP major developments, maintaining Accredited Shree Cement CFA factory-direct pricing guidelines with zero speculative markups.
                </p>

                {/* Guna Trust Pillars - Storytelling process */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-default/85">
                  <div className="space-y-2 group">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center text-[11px] font-mono font-bold select-none group-hover:bg-brand-red group-hover:text-white transition-all duration-300">★</span>
                      <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-tight">1. 52-Year CFA Legacy</span>
                    </div>
                    <p className="text-[10px] text-text-muted leading-relaxed font-body">
                      Founded in 1973. Central MP structural dispatch pipeline with 15k+ happy individual builders.
                    </p>
                  </div>
                  <div className="space-y-2 group">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center text-[11px] font-mono font-bold select-none group-hover:bg-brand-red group-hover:text-white transition-all duration-300">★</span>
                      <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-tight">2. Direct Dispatch</span>
                    </div>
                    <p className="text-[10px] text-text-muted leading-relaxed font-body">
                      Fresh clinker loads direct from Shree Cement plants with absolute zero middleman markup.
                    </p>
                  </div>
                  <div className="space-y-2 group">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center text-[11px] font-mono font-bold select-none group-hover:bg-brand-red group-hover:text-white transition-all duration-300">★</span>
                      <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-tight">3. Quality Check</span>
                    </div>
                    <p className="text-[10px] text-text-muted leading-relaxed font-body">
                      Free structural cover scans, mobile labs, and slump cone tests at slab casting sites.
                    </p>
                  </div>
                </div>

                {/* Legacy Quote Badge */}
                <div className="border-l-4 border-brand-red bg-surface-muted pl-6 py-4 rounded-r-lg shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-sm font-black uppercase text-brand-red tracking-wider">
                      ★ BUILT ON TRUST. SEALED BY QUALITY.
                    </p>
                    <p className="text-[10px] text-text-muted mt-1 uppercase font-mono">
                      SIDDHARTH CEMENT SALES — GUNA'S PIONEER CEMENT SUPPLIER SINCE 1973
                    </p>
                  </div>
                  <HardHat className="w-8 h-8 text-brand-red/20 shrink-0 select-none animate-pulse" />
                </div>
              </div>

            </div>
          </section>
          <section id="products" className="py-20 md:py-28 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 space-y-12">
              
              {/* Bangur-Style Intro Block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left bg-white p-8 border-2 border-border-default rounded-lg shadow-sm blueprint-pattern">
                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-bold text-brand-red uppercase tracking-wider font-mono">OUR PRODUCT RANGE — CFA ACCREDITED</span>
                  <h2 className="font-display text-3xl sm:text-5xl font-black text-text-primary uppercase tracking-tight leading-none">
                    THE COMPLETE BANGUR CEMENT RANGE.
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Our product range is designed to meet every construction need. From crack-resistant and corrosion-resistant options to formulations tailored for roofs, columns, and foundations — we stock the complete Bangur range, factory-fresh, for individual home builders, contractors, and large projects across Guna.
                  </p>
                </div>
                <div className="lg:col-span-4 flex justify-start lg:justify-end">
                  <a 
                    href="#enquiry"
                    className="bg-brand-red hover:bg-text-inverse hover:border-text-inverse text-white px-8 py-4 rounded-md font-semibold text-sm tracking-wider uppercase flex items-center gap-2 border-2 border-brand-red hover:-translate-y-0.5 transition-all w-full lg:w-auto text-center justify-center font-mono shadow-md"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="space-y-4">
                <div className="text-left font-mono text-[10px] text-text-muted uppercase tracking-wider font-bold">
                  Filter by Cement Chemistry & Application
                </div>
                <div className="flex flex-wrap gap-2 justify-start">
                  {[
                    { label: 'All Products', value: 'All' },
                    { label: 'PSC — Portland Slag Cement', value: 'PSC' },
                    { label: 'PPC — Portland Pozzolana Cement', value: 'PPC' },
                    { label: 'CC — Composite Cement', value: 'CC' },
                    { label: 'OPC — Ordinary Portland Cement', value: 'OPC' },
                    { label: 'Non-Trade — Cement for Institutional Buyers', value: 'Non-Trade' }
                  ].map((chip) => (
                    <button
                      key={chip.value}
                      onClick={() => setActiveCategoryFilter(chip.value)}
                      className={`px-4 py-2 text-xs font-bold font-mono rounded-xs uppercase transition-all border outline-none focus-visible:ring-2 focus-visible:ring-brand-red select-none ${
                        activeCategoryFilter === chip.value
                          ? 'bg-brand-red text-white border-brand-red shadow-sm'
                          : 'bg-white hover:bg-surface-dust text-text-primary border-border-default'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Card Grid (Dynamic Filtering) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Bangur Magna', tagline: 'The Premium Standard', img: IMAGES.magna, desc: 'Premium clinker blend engineered for high strength concrete RCC slabs, columns, and solid support structural beams.', categories: ['PPC', 'CC'] },
                  { name: 'Bangur Roofon Plus', tagline: 'The Concrete Master', img: IMAGES.roofon, desc: 'Specialized concrete compound engineered for residential roof slabs pouring, ceilings, and smooth structural finishing.', categories: ['PPC'] },
                  { name: 'Bangur Shree Jungrodhak', tagline: 'Ghar ki Dhaal, Saalon Saal', img: IMAGES.jungrodhak, desc: 'Corrosion resistant formulation developed to protect internal rebar steel rebars from moisture dampness.', categories: ['PSC'] },
                  { name: 'Bangur Powermax', tagline: 'Power Grind Technology', img: IMAGES.powermax, desc: 'Processed with advanced grinds to guarantee maximum setting hydration speeds and structural crack resistance.', categories: ['PPC'] },
                  { name: 'Bangur Rockstrong', tagline: 'Rock-Like Strength', img: IMAGES.rockstrong, desc: 'Heavy load-bearing compound suited for heavy infrastructure bridges, commercial foundations, and industrial works.', categories: ['OPC', 'PSC'] },
                  { name: 'Bangur White Marble', tagline: 'Finish That Lasts', img: IMAGES.marble, desc: 'Prinstine white cement blend suited for white marble joint grouting, tile sealing, and smooth custom plaster works.', categories: ['Non-Trade'] }
                ].filter(product => activeCategoryFilter === 'All' || product.categories.includes(activeCategoryFilter)).map((product, idx) => (
                  <div key={idx} className="bg-white border-2 border-border-default rounded-lg flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lift transition-all duration-300 hover:-translate-y-1 group">
                    <div className="p-6 pb-2 text-left">
                      <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-xs font-bold uppercase tracking-wider font-mono">BIS Compliant</span>
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
                          className="flex-grow bg-surface-muted hover:bg-surface-dust text-text-primary text-center py-2.5 rounded-md font-semibold text-xs tracking-wider uppercase transition-colors"
                        >
                          Know More
                        </button>
                        <a 
                          href={`https://wa.me/919893156560?text=Hi%2C%20I%20want%20to%20enquire%20about%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand-red hover:bg-text-inverse text-white px-4 py-2.5 rounded-md flex items-center justify-center transition-colors shrink-0 animate-none"
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
            <div className="max-w-6xl mx-auto px-4 space-y-12">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider font-mono">TECHNICAL COMPARATIVE TOOL</span>
                <h3 className="font-display text-4xl font-black text-text-primary uppercase tracking-tight">OPC OR PPC? WE'LL HELP YOU CHOOSE.</h3>
                <p className="text-text-muted text-sm leading-relaxed font-body">
                  Different structural elements require specialized formulations. Toggle between OPC and PPC to understand the technical parameters, curing heat profiles, and ideal construction use cases.
                </p>
              </div>

              {/* Toggle switcher */}
              <div className="max-w-2xl mx-auto grid grid-cols-2 bg-surface-muted border border-border-default rounded-md overflow-hidden p-1 shadow-inner select-none">
                <button 
                  onClick={() => setSelectedCementType('OPC')} 
                  className={`py-3.5 rounded font-display font-bold uppercase tracking-wider text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer ${selectedCementType === 'OPC' ? 'bg-brand-red text-white shadow-md' : 'hover:bg-surface-dust text-text-muted hover:text-text-primary'}`}
                >
                  🏗️ OPC (Construction Speed)
                </button>
                <button 
                  onClick={() => setSelectedCementType('PPC')} 
                  className={`py-3.5 rounded font-display font-bold uppercase tracking-wider text-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer ${selectedCementType === 'PPC' ? 'bg-brand-red text-white shadow-md' : 'hover:bg-surface-dust text-text-muted hover:text-text-primary'}`}
                >
                  🛡️ PPC (Generational Durability)
                </button>
              </div>

              {/* Dynamic comparative layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch pt-4 text-left">
                {/* Left Side: Animated High-Fidelity Branded Visual (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="bg-white border-2 border-border-default rounded-lg overflow-hidden relative shadow-sm hover:shadow-lift transition-all duration-500 group flex items-center justify-center p-3 h-full aspect-[4/3] lg:aspect-auto min-h-[340px]">
                    <img 
                      src={selectedCementType === 'OPC' ? IMAGES.opcSpeed : IMAGES.ppcDurability} 
                      alt={selectedCementType} 
                      className="w-full h-full object-cover rounded-md group-hover:scale-102 transition-transform duration-700 select-none animate-[pulse_6s_infinite]" 
                    />
                    <div className="absolute bottom-4 left-4 bg-surface-dark/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-[10px] uppercase font-mono tracking-widest select-none border border-gray-700/50">
                      ★ Active: {selectedCementType} Visual rendering
                    </div>
                  </div>
                </div>

                {/* Right Side: Feature Breakdown & Technical Table (7 cols) */}
                <div className="lg:col-span-7 bg-white p-8 border-2 border-border-default rounded-lg shadow-sm flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-xs font-bold uppercase tracking-wider font-mono">
                      {selectedCementType === 'OPC' ? 'RAPID LOAD CAPACITY & FAST SHUTTERING' : 'IMPERMEABLE MOISTURE PRESERVATION & ANTI-CRACK'}
                    </span>
                    <h4 className="font-display font-black text-2xl text-text-primary uppercase leading-tight">
                      {selectedCementType === 'OPC' ? '🏗️ Ordinary Portland Cement (OPC)' : '🛡️ Portland Pozzolana Cement (PPC)'}
                    </h4>
                    <p className="text-xs text-text-body leading-relaxed font-body">
                      {selectedCementType === 'OPC' 
                        ? 'Ordinary Portland Cement (available in 43 and 53 Grade formulations) features rapid early chemical load strength. Best suited for columns, structural high-rise slabs, fast-track roads, and bridges where time-sensitive shuttering removal is required.' 
                        : 'Portland Pozzolana Cement is blended with high-activity fly ash particles to build an impermeable chemical barrier over generations. Best suited for residential masonry works, cellar foundations, underground water storage tanks, and heavy plasters.'
                      }
                    </p>
                  </div>

                  {/* Parametric comparative rows */}
                  <div className="border-t border-border-default pt-4 space-y-3 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-border-default/50">
                      <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Strength Timeline</span>
                      <span className="font-bold text-text-primary">
                        {selectedCementType === 'OPC' ? '3 to 7 Days (Rapid early strength)' : '28+ Days (Progressive strength growth)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border-default/50">
                      <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Hydration Heat Profile</span>
                      <span className="font-bold text-text-primary">
                        {selectedCementType === 'OPC' ? 'High heat generation (Fast setting)' : 'Low heat generation (Prevents micro-cracks)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border-default/50">
                      <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Best Recommended For</span>
                      <span className="font-bold text-text-primary">
                        {selectedCementType === 'OPC' ? 'RCC Beams, Columns, Slabs, Commercial Roads' : 'Cellar Foundations, Plasters, Water Tanks, Retaining Walls'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Accreditation Standards</span>
                      <span className="font-bold text-text-primary">
                        {selectedCementType === 'OPC' ? 'BIS IS-12269 (53 Grade) & IS-8112 (43)' : 'BIS IS-1489 Pozzolanic Blending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* S7C: Technical Support Section */}
          <section id="tech-support" className="py-20 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider block">★ ACCREDITED SITE QUALITY CONTROL SERVICES</span>
                <h3 className="font-display text-4xl font-black text-text-primary uppercase">TECHNICAL SUPPORT & SITE TESTING SERVICES</h3>
                <p className="text-xs text-text-muted max-w-2xl mx-auto font-mono uppercase">
                  SCS ON-SITE MOBILE LABS AND ENGINEERING EQUIPMENT FOR ULTIMATE CONCRETE ASSURANCE
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {/* Card 1: On-Site Testing Van */}
                <div className="group bg-white rounded-lg border border-border-default overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-lift transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full bg-surface-dust overflow-hidden border-b border-border-default">
                    <img 
                      src={IMAGES.testingVan} 
                      alt="On-Site Testing Van" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 right-4 bg-surface-muted/95 backdrop-blur-sm text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-xs text-text-muted border border-border-default uppercase select-none">
                      SERVICE 01
                    </span>
                    <div className="absolute -bottom-5 left-6 bg-white p-2.5 rounded-xs border border-border-default shadow-sm group-hover:border-brand-red transition-all duration-300 group-hover:scale-110">
                      <Truck className="w-6 h-6 text-brand-red" />
                    </div>
                  </div>
                  <div className="pt-8 p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-bold uppercase text-text-primary text-base tracking-tight group-hover:text-brand-red transition-colors duration-300">
                        On-Site Testing Van
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed">
                        Free workability checks, slump cone reviews, and mixing guidelines dispatched direct to slab concrete pour sites.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border-default flex items-center justify-between">
                      <span className="text-[9px] font-mono text-brand-red uppercase font-semibold">★ COMPLIMENTARY ON-SITE</span>
                      <button 
                        onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs font-bold text-text-inverse group-hover:text-brand-red transition-colors flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-brand-red rounded-xs"
                      >
                        <span>Request Van</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2: Rebar Cover Scan */}
                <div className="group bg-white rounded-lg border border-border-default overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-lift transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full bg-surface-dust overflow-hidden border-b border-border-default">
                    <img 
                      src={IMAGES.rebarScan} 
                      alt="Rebar Cover Scan" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 right-4 bg-surface-muted/95 backdrop-blur-sm text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-xs text-text-muted border border-border-default uppercase select-none">
                      SERVICE 02
                    </span>
                    <div className="absolute -bottom-5 left-6 bg-white p-2.5 rounded-xs border border-border-default shadow-sm group-hover:border-brand-red transition-all duration-300 group-hover:scale-110">
                      <Shield className="w-6 h-6 text-brand-red" />
                    </div>
                  </div>
                  <div className="pt-8 p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-bold uppercase text-text-primary text-base tracking-tight group-hover:text-brand-red transition-colors duration-300">
                        Rebar Cover Scan
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed">
                        Electromagnetic measurements checking concrete depth layers to shield rebar structural grids against moisture dampness.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border-default flex items-center justify-between">
                      <span className="text-[9px] font-mono text-brand-red uppercase font-semibold">★ HIGH-TECH SCANNING</span>
                      <button 
                        onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs font-bold text-text-inverse group-hover:text-brand-red transition-colors flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-brand-red rounded-xs"
                      >
                        <span>Book Scan</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3: Lab Cube Crusher */}
                <div className="group bg-white rounded-lg border border-border-default overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-lift transition-all duration-500">
                  <div className="relative aspect-[16/10] w-full bg-surface-dust overflow-hidden border-b border-border-default">
                    <img 
                      src={IMAGES.cubeCrusher} 
                      alt="Lab Cube Crusher" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 right-4 bg-surface-muted/95 backdrop-blur-sm text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-xs text-text-muted border border-border-default uppercase select-none">
                      SERVICE 03
                    </span>
                    <div className="absolute -bottom-5 left-6 bg-white p-2.5 rounded-xs border border-border-default shadow-sm group-hover:border-brand-red transition-all duration-300 group-hover:scale-110">
                      <Award className="w-6 h-6 text-brand-red" />
                    </div>
                  </div>
                  <div className="pt-8 p-6 flex-grow flex flex-col justify-between text-left space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-display font-bold uppercase text-text-primary text-base tracking-tight group-hover:text-brand-red transition-colors duration-300">
                        Lab Cube Crusher
                      </h4>
                      <p className="text-xs text-text-muted leading-relaxed">
                        Mortar cube strength testing checked after 7 and 28 days inside Guna testing facilities to verify design load compliance.
                      </p>
                    </div>
                    <div className="pt-3 border-t border-border-default flex items-center justify-between">
                      <span className="text-[9px] font-mono text-brand-red uppercase font-semibold">★ COMPLIANCE CERTIFIED</span>
                      <button 
                        onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-xs font-bold text-text-inverse group-hover:text-brand-red transition-colors flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-brand-red rounded-xs"
                      >
                        <span>Submit Sample</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
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
                  { key: 'opc_ppc_psc', title: 'OPC vs PPC vs PSC Cement Comparison', desc: 'Easy comparative parameters breakdown mapping appropriate grades to residential brickwork, columns, and plaster finishes.', img: IMAGES.guideOpcPpc },
                  { key: 'grade_43_53', title: '43 Grade vs 53 Grade Cement', desc: 'Demystifying concrete grade markings. Learn what numerical metrics indicate for curing timelines and heavy design loads.', img: IMAGES.guideGrades },
                  { key: 'storage_guide', title: 'Correct Cement Storage Guidelines', desc: 'Hydration protection steps. Stacking on robust dry wooden pallets, plastic sheeting, and weather shelter preservation.', img: IMAGES.guideStorage }
                ].map((blog, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-border-default overflow-hidden flex flex-col justify-between h-full group hover:shadow-lift transition-shadow duration-300">
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
                          onClick={() => navigateToBlog(blog.title, 'SCS Engineer team', blog.desc + ' This detailed article covers concrete moisture protection and BIS standards.', blog.img, blog.key)}
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

          {/* S11.2: Basics of Home Building — Bangur Style */}
          <section className="py-20 bg-surface-base border-b border-border-default scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 space-y-12">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-xs font-bold text-brand-red uppercase tracking-wider font-mono">TECHNICAL GUIDANCE & SERVICES</span>
                <h3 className="font-display text-4xl font-black text-text-primary uppercase tracking-tight">BASICS OF HOME BUILDING</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Building a home is a lifetime investment. Explore our step-by-step guides compiled by Siddharth Cement Sales engineering experts to make informed decisions at every stage of construction.
                </p>
              </div>

              {/* Responsive Tabs Navigation */}
              <div className="flex flex-row overflow-x-auto whitespace-nowrap sm:justify-center border-b border-border-default scrollbar-none py-1">
                {[
                  { id: 'Planning', label: '1. Planning', tagline: 'Take the essential first steps to building your dream home' },
                  { id: 'Land Selection', label: '2. Land Selection', tagline: 'Selecting the ideal plot lays the foundation for your future home' },
                  { id: 'Budgeting', label: '3. Budgeting', tagline: 'Plan your finances wisely' },
                  { id: 'Selection of Materials', label: '4. Selection of Materials', tagline: 'Choose quality materials' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBuildingTab(tab.id)}
                    className={`px-4 py-3 sm:px-6 sm:py-4 shrink-0 font-display font-bold uppercase tracking-wider text-xs border-b-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-red select-none text-center sm:text-left rounded-xs ${
                      activeBuildingTab === tab.id
                        ? 'border-brand-red text-brand-red bg-surface-muted/50'
                        : 'border-transparent text-text-muted hover:text-text-primary hover:bg-surface-dust'
                    }`}
                  >
                    <div className="font-mono text-[9px] text-text-muted">STAGE</div>
                    <div className="text-sm">{tab.label.split('. ')[1]}</div>
                  </button>
                ))}
              </div>

              {/* Sub-tagline for current tab */}
              <div className="text-center italic text-xs font-semibold text-text-muted py-2.5 bg-surface-muted border-l-4 border-brand-red max-w-2xl mx-auto rounded-xs">
                "
                {
                  activeBuildingTab === 'Planning' && 'Take the essential first steps to building your dream home' ||
                  activeBuildingTab === 'Land Selection' && 'Selecting the ideal plot lays the foundation for your future home' ||
                  activeBuildingTab === 'Budgeting' && 'Plan your finances wisely' ||
                  activeBuildingTab === 'Selection of Materials' && 'Choose quality materials'
                }
                "
              </div>

              {/* Tab Content Card Grid (Full Width Symmetrical Layout) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-stretch">
                {/* Grid of detailed Cards (Full Width 12 cols) */}
                <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(BUILDING_STAGES_DATA[activeBuildingTab] || []).map((card, idx) => {
                    const IconComponent = IconMap[card.icon] || HelpCircle;
                    return (
                      <div 
                        key={idx} 
                        className="group bg-white p-6 border-2 border-border-default rounded-lg shadow-sm flex flex-col justify-between gap-6 hover:border-brand-red hover:shadow-lift transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-red/5 flex items-center justify-center border border-brand-red/20 shrink-0 rounded-md group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                              <IconComponent className="w-5 h-5 text-brand-red group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-text-muted bg-surface-muted px-2 py-0.5 rounded-xs select-none">
                              STEP {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-display font-bold text-base uppercase text-text-primary group-hover:text-brand-red transition-colors duration-300">
                              {card.title}
                            </h4>
                            <p className="text-xs text-text-muted leading-relaxed">
                              {card.desc}
                            </p>
                          </div>

                          {/* Bullet checklist for details */}
                          {card.checklist && card.checklist.length > 0 && (
                            <div className="space-y-1.5 pt-2 border-t border-border-default/50">
                              <span className="text-[9px] font-mono font-bold tracking-wider text-text-inverse uppercase block">
                                ★ Site Checklist:
                              </span>
                              <ul className="space-y-1 list-none">
                                {card.checklist.map((item, cIdx) => (
                                  <li key={cIdx} className="text-[11px] text-text-body flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-brand-red/60 rounded-full shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Monospaced Professional Pro-Tip */}
                        {card.proTip && (
                          <div className="bg-surface-base p-3 rounded-xs border-l-2 border-brand-red text-[11px] font-mono text-text-muted leading-relaxed select-none">
                            <span className="font-bold text-brand-red">SCS ADVISORY:</span> {card.proTip}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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
                  <div className="flex items-start gap-3 bg-white p-4 border border-border-default rounded-md shadow-sm">
                    <Shield className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase text-text-primary">Accredited Pricing</h4>
                      <p className="text-xs text-text-muted mt-1">Zero middlemen speculative pricing markups. Authentic Shree Cement corporate rates.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 border border-border-default rounded-md shadow-sm">
                    <Truck className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-sm font-bold uppercase text-text-primary">12-24 Hour Transit Logistics</h4>
                      <p className="text-xs text-text-muted mt-1">Direct fleet dispatch from central Guna warehouse depots direct to your site coordinates.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Container (7 cols) */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 border-2 border-border-default rounded-lg shadow-sm relative">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-xs border border-green-200 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-black text-text-primary uppercase">Enquiry Received Successfully!</h3>
                    <p className="text-sm text-text-muted font-body max-w-md mx-auto">
                      Thank you. We'll call you within 24 hours. Your details have been logged in our CFA routing register.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="bg-brand-red hover:bg-text-inverse text-white px-6 py-2.5 rounded-md font-semibold text-xs tracking-wider uppercase transition-colors font-mono"
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
                           className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
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
                           className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
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
                           className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
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
                           className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
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
                           className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors animate-[select] duration-150"
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
                           className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors"
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
                        className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary focus:outline-none focus:border-brand-red transition-colors" 
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <button 
                        type="submit" 
                        className="bg-brand-red hover:bg-text-inverse text-white py-3.5 rounded-md font-semibold text-xs tracking-wider uppercase text-center transition-colors font-mono"
                      >
                        SUBMIT ENQUIRY
                      </button>
                      <a 
                        href={getWhatsAppURL()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-whatsapp hover:bg-green-600 text-white py-3.5 rounded-md font-semibold text-xs tracking-wider uppercase text-center transition-colors font-mono flex items-center justify-center gap-1.5"
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
              
              <div className="bg-white p-5 md:p-8 rounded-lg border border-border-default shadow-lift relative text-left min-h-[250px] flex flex-col justify-between">
                <span className="absolute top-4 right-6 text-7xl text-surface-muted select-none">“</span>
                <div className="space-y-4">
                  <div className="flex text-brand-red gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs font-semibold text-brand-red tracking-wider uppercase bg-brand-red/5 px-2 py-0.5 rounded-xs w-max">
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
                <button onClick={() => setCarouselIndex(prev => (prev - 1 + feedbackList.length) % feedbackList.length)} className="p-2 border rounded-md hover:bg-surface-muted"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={() => setCarouselIndex(prev => (prev + 1) % feedbackList.length)} className="p-2 border rounded-md hover:bg-surface-muted"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </section>

          {/* S13: Stylized regional map Guna */}
          <section className="py-20 bg-surface-muted border-b border-border-default concrete-noise">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider block">★ SCS DISPATCH RADAR MAP</span>
                <h3 className="font-display text-4xl font-black text-text-primary uppercase leading-tight">WE COVER THE WHOLE OF GUNA — AND BEYOND.</h3>
                <p className="text-xs text-text-muted leading-relaxed">Map dispatch route timings direct from central CFA warehousing nodes daily. Hover/click pins for logistics metrics.</p>
                
                <div className="relative aspect-video bg-white rounded-lg border border-border-default overflow-hidden flex items-center justify-center p-4 shadow-sm group">
                  <svg viewBox="0 0 400 300" className="w-full h-full stroke-border-default fill-surface-base pointer-events-none select-none z-10">
                    <style>{`
                      @keyframes dash {
                        to { stroke-dashoffset: -20; }
                      }
                      .animate-dash-lines {
                        stroke-dasharray: 5 5;
                        animation: dash 6s linear infinite;
                      }
                    `}</style>
                    {/* Animated dotted outer bounds line representing Shree Cement CFA service coverage area */}
                    <path 
                      d="M 120 40 C 220 20, 260 50, 310 90 C 350 120, 380 180, 360 220 C 330 270, 250 280, 180 270 C 130 260, 60 240, 50 180 C 40 120, 50 50, 120 40 Z" 
                      strokeWidth="2" 
                      className="stroke-brand-red/30 fill-none animate-dash-lines"
                    />
                  </svg>

                  {/* Dynamic Pins */}
                  {mapPins.map((pin, idx) => {
                    const isHQ = pin.name === 'Guna Head Office';
                    const isActive = activePin === idx;
                    return (
                      <div 
                        key={idx}
                        className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2"
                        style={{ left: pin.x, top: pin.y }}
                        onClick={() => setActivePin(activePin === idx ? null : idx)}
                        onMouseEnter={() => setActivePin(idx)}
                      >
                        {/* Ping Concentric Outer Wave */}
                        <span className={`absolute -left-2 -top-2 w-[28px] h-[28px] rounded-full ${isHQ ? 'bg-text-inverse/15' : 'bg-brand-red/20'} animate-ping`} />
                        
                        {/* Center Pin Button */}
                        <button
                          className={`w-[13px] h-[13px] rounded-full border-2 border-white shadow-md transition-all duration-300 transform outline-none focus-visible:ring-2 focus-visible:ring-brand-red hover:scale-125 cursor-pointer ${
                            isActive 
                              ? 'bg-brand-red scale-125 ring-4 ring-brand-red/25' 
                              : isHQ 
                                ? 'bg-text-inverse scale-110' 
                                : 'bg-brand-red'
                          }`}
                          aria-label={`Supply Point: ${pin.name}`}
                        />
                        
                        {/* Pin label (floating monospaced small) */}
                        <span className="absolute left-4 -top-1 px-1.5 py-0.5 bg-surface-dark/95 text-[7.5px] font-mono text-white rounded-xs opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 pointer-events-none select-none whitespace-nowrap shadow-sm">
                          {pin.name}
                        </span>
                      </div>
                    );
                  })}

                  {/* Active Pin Detailed Tooltip (overlaps map - Desktop only) */}
                  {activePin !== null && (
                    <div className="hidden md:block absolute bottom-4 left-4 right-4 bg-surface-dark text-white p-4 rounded-md shadow-xl border border-gray-800 text-left space-y-2 z-30 animate-fade-in md:bottom-auto md:top-4 md:left-4 md:right-auto md:max-w-xs">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
                        <h5 className="font-display font-bold uppercase text-brand-red text-xs tracking-wider">
                          {mapPins[activePin].name}
                        </h5>
                        <span className="text-[8px] font-mono bg-brand-red/20 text-brand-red px-1.5 py-0.5 rounded-xs font-bold uppercase">
                          {mapPins[activePin].name === 'Guna Head Office' ? 'BASE CFA' : 'ACTIVE CHANNEL'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-mono text-gray-300">
                          <span className="text-brand-red font-bold">● Status:</span> {mapPins[activePin].status}
                        </p>
                        <p className="text-[10px] font-body text-gray-400 leading-normal">
                          {mapPins[activePin].info}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Active Pin Detail Card (Mobile only) */}
                {activePin !== null && (
                  <div className="md:hidden mt-4 bg-surface-dark text-white p-5 rounded-lg border-2 border-brand-red/30 shadow-md text-left space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                      <h5 className="font-display font-bold uppercase text-brand-red text-sm tracking-wider">
                        {mapPins[activePin].name}
                      </h5>
                      <span className="text-[9px] font-mono bg-brand-red/20 text-brand-red px-2 py-0.5 rounded-xs font-bold uppercase">
                        {mapPins[activePin].name === 'Guna Head Office' ? 'BASE CFA' : 'ACTIVE CHANNEL'}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-mono text-gray-300">
                        <span className="text-brand-red font-bold">● Status:</span> {mapPins[activePin].status}
                      </p>
                      <p className="text-[11px] font-body text-gray-400 leading-normal">
                        {mapPins[activePin].info}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 text-left space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider block">★ DAILY DISPATCH DOMAIN</span>
                  <h4 className="font-display text-xl font-black text-text-primary uppercase border-b border-border-default pb-2">ACTIVE SUPPLY POINTS</h4>
                </div>
                
                {/* 13 Active supply point items (hover highlights pin) */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {mapPins.map((pin, idx) => {
                    const isHQ = pin.name === 'Guna Head Office';
                    const isActive = activePin === idx;
                    return (
                      <button
                        key={idx}
                        onMouseEnter={() => setActivePin(idx)}
                        onClick={() => setActivePin(idx)}
                        className={`flex items-center gap-1.5 py-1 px-2.5 rounded-xs border transition-all text-left outline-none cursor-pointer select-none font-mono ${
                          isActive 
                            ? 'bg-brand-red/10 border-brand-red text-brand-red font-bold translate-x-1' 
                            : isHQ 
                              ? 'bg-text-inverse/5 border-text-inverse/25 text-text-inverse font-bold' 
                              : 'bg-white border-border-default text-text-muted hover:border-text-primary hover:text-text-primary'
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-red' : isHQ ? 'text-text-inverse' : 'text-brand-red/60'}`} />
                        <span className="truncate text-[10.5px]">{pin.name}</span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Logistics Stats advisory box */}
                <div className="bg-surface-base p-4 border border-border-default rounded-xs font-mono text-[10px] text-text-muted space-y-1 select-none">
                  <p className="font-bold text-brand-red">★ SCS FLEET METRICS GUNA:</p>
                  <p>• Daily Active Logistics Trucks: <span className="text-text-primary font-bold">18 Heavy Dispatches</span></p>
                  <p>• Average Delivery Window: <span className="text-text-primary font-bold">6 to 12 Hours (Guna & Outer Channels)</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* S14: Contact segment */}
          <section className="py-20 bg-surface-base border-b border-border-default">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-6 rounded-lg border border-border-default relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red" />
                <h4 className="font-display font-bold uppercase text-text-primary text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-brand-red" /> Guna CFA Office</h4>
                <p className="text-xs text-text-muted leading-relaxed mt-4">Siddharth Cement Sales, Near Bus Stand, Lahoti Marg, Guna HO – 473001, MP.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border-default relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red" />
                <h4 className="font-display font-bold uppercase text-text-primary text-lg flex items-center gap-2"><Phone className="w-5 h-5 text-brand-red" /> Call Hotline</h4>
                <a href="tel:+919893156560" className="text-base font-bold text-text-primary block mt-4 hover:text-brand-red">+91 98931 56560</a>
                <p className="text-[10px] text-text-muted mt-1">CFA Office Landline: 07542-256560</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border-default relative">
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
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-white p-8 rounded-lg border border-border-default shadow-lift">
            <div className="md:col-span-5 flex justify-center">
              <img src={selectedProductData.img} alt={selectedProductData.name} className="h-[350px] object-contain" />
            </div>
            <div className="md:col-span-7 space-y-6">
              <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-xs font-bold uppercase tracking-wider">Authorized Guna CFA</span>
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
                  className="bg-whatsapp hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 shadow"
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
        <div className="max-w-4xl mx-auto px-4 py-16 text-left space-y-8 animate-fade-in">
          <button 
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-brand-red font-bold uppercase tracking-wider text-xs hover:underline outline-none focus-visible:ring-2 focus-visible:ring-brand-red p-1 rounded-xs select-none"
          >
            <ArrowLeft className="w-4 h-4 animate-pulse" /> Back to Homepage
          </button>
          
          <div className="space-y-8 bg-white p-8 md:p-12 rounded-lg border border-border-default shadow-lift">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-brand-red/10 text-brand-red text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-xs uppercase tracking-wider">
                  {selectedBlogData.category}
                </span>
                <span className="text-text-muted text-xs font-semibold">· Updated {selectedBlogData.lastUpdated}</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-black text-text-primary uppercase leading-tight tracking-tight">
                {selectedBlogData.title}
              </h2>
              <p className="text-xs text-text-muted font-mono uppercase tracking-wider">
                BY {selectedBlogData.author} · GUNA CENTRAL QUALITY DEPOT
              </p>
            </div>

            <div className="aspect-[16/9] w-full bg-surface-dust rounded-lg overflow-hidden border border-border-default shadow-sm relative group">
              <img src={selectedBlogData.img} alt={selectedBlogData.title} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700" />
            </div>

            {/* Structured Content Area */}
            {selectedBlogData.sections ? (
              <div className="space-y-8 text-text-body font-body leading-relaxed text-sm">
                {selectedBlogData.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4 border-b border-border-default/50 pb-6 last:border-0 last:pb-0">
                    {section.heading && (
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-text-inverse">
                        {section.heading}
                      </h3>
                    )}
                    
                    {/* Render paragraph texts */}
                    {section.type === 'text' && section.content && (
                      <p className="text-text-body leading-relaxed">{section.content}</p>
                    )}

                    {/* Render table comparisons */}
                    {section.type === 'table' && section.headers && section.rows && (
                      <div className="overflow-x-auto my-6 rounded-md border border-border-default">
                        <table className="min-w-full divide-y divide-border-default text-xs font-mono">
                          <thead className="bg-surface-muted">
                            <tr>
                              {section.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-3 text-left font-bold text-text-primary uppercase tracking-wider border-r border-border-default last:border-0">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-default bg-white">
                            {section.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-surface-base/50 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`px-4 py-3 border-r border-border-default last:border-0 ${cIdx === 0 ? 'font-bold text-text-primary' : 'text-text-muted'}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Render bullet / checklist items */}
                    {section.type === 'points' && section.points && (
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        {section.points.map((pt, ptIdx) => (
                          <div key={ptIdx} className="bg-surface-base p-4 rounded-xs border-l-4 border-brand-red border border-border-default flex flex-col space-y-1">
                            <h4 className="font-display font-bold uppercase text-text-primary text-sm tracking-tight">
                              {pt.title}
                            </h4>
                            <p className="text-xs text-text-muted leading-relaxed">
                              {pt.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Closing Advisory Notice */}
                <div className="bg-surface-muted p-5 rounded-xs border border-border-default mt-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div className="space-y-1">
                    <h5 className="font-display font-bold uppercase text-brand-red text-xs tracking-wider">
                      ★ FREE CIVIL ENGINEER CONSULTATION
                    </h5>
                    <p className="text-xs text-text-muted leading-normal">
                      Have questions regarding concrete casting timelines or soil pressure scanner checks in Guna? Speak to our team.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setActiveView('home'); setTimeout(() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                    className="shrink-0 bg-brand-red hover:bg-brand-red-dark text-white px-4 py-2 rounded-md font-display font-bold uppercase text-xs tracking-wider shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
                  >
                    Get Free Site Advice
                  </button>
                </div>
              </div>
            ) : (
              // Fallback simple content rendering (backward-compatible)
              <div className="space-y-4 text-sm text-text-body font-body leading-relaxed">
                <p>{selectedBlogData.content}</p>
                <p>Ensuring concrete preservation is highly dependent on moisture protection scans. We stack fresh sealed bags on 15cm raised wooden platforms inside closed depots. Keep dry pallets isolated from subgrade walls. Complete structural rebar scanning on direct slab layouts before pour is recommended to secure maximum lifetime durability.</p>
              </div>
            )}
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

          <div className="bg-white p-8 rounded-lg border border-border-default shadow-lift space-y-6">
            <div>
              <h3 className="font-display text-3xl font-black text-text-primary uppercase leading-none">BECOME A BANGUR DEALER</h3>
              <p className="text-xs text-text-muted mt-2">Partner with Guna's 52-year legacy CFA direct dispatch depots. We call back within 24 hours.</p>
            </div>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-whatsapp/10 rounded-xs flex items-center justify-center mx-auto text-whatsapp"><Check className="w-6 h-6" /></div>
                <h4 className="font-display font-bold uppercase text-text-primary text-xl">Enquiry Saved</h4>
                <a href={getWhatsAppURL()} target="_blank" rel="noopener noreferrer" className="bg-whatsapp text-white px-6 py-2.5 rounded-md font-semibold text-xs uppercase tracking-wider inline-block">Confirm via WhatsApp</a>
              </div>
            ) : (
              <form onSubmit={submitToFormAction} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">Full Name *</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">Mobile Phone *</label>
                    <input type="tel" name="mobile" required pattern="[0-9]{10}" value={formData.mobile} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">City/Town *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-text-primary uppercase tracking-wider mb-1">Monthly volume capacity</label>
                  <select name="monthlyRequirement" value={formData.monthlyRequirement} onChange={handleInputChange} className="w-full px-3 py-2 bg-surface-base border border-border-default rounded-xs text-sm text-text-primary">
                    <option value="<100">Less than 100 bags</option>
                    <option value="100-500">100 to 500 bags</option>
                    <option value="500-2000">500 to 2000 bags</option>
                    <option value="2000+">More than 2000 bags</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-brand-red text-white py-3 rounded-md font-semibold text-xs tracking-wider uppercase hover:bg-text-inverse transition-colors">Submit Form</button>
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

          <div className="bg-white p-8 rounded-lg border border-border-default shadow-lift space-y-6">
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
            <Logo light={true} />
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
              <li><button onClick={() => navigateToProduct('Bangur Magna', 'The Premium Standard', IMAGES.magna, 'Premium clinker RCC slab concrete')} className="hover:text-white outline-none">Bangur Magna</button></li>
              <li><button onClick={() => navigateToProduct('Bangur Roofon Plus', 'The Concrete Master', IMAGES.roofon, 'Specialized roof pouring concrete')} className="hover:text-white outline-none">Bangur Roofon Plus</button></li>
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
