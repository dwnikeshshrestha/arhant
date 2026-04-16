import type { ElementType } from "react";
import {
  Activity,
  BarChart3,
  FileText,
  Globe,
  Layers,
  Phone,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

export type SolutionId = "life" | "general" | "aggregator" | "micro";

export interface Feature {
  icon: ElementType;
  label: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ClientLogo {
  name: string;
  initials: string;
}

export interface Solution {
  id: SolutionId;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: ElementType;
  gradient: string;
  glowColor: string;
  accentLight: string;
  badge: string;
  features: Feature[];
  stats: Stat[];
  clients: ClientLogo[];
  benefits: { title: string; description: string }[];
}

export const solutions: Solution[] = [
  {
    id: "life",
    slug: "life",
    title: "Life Insurance Platform",
    shortTitle: "Life Insurance",
    tagline: "End-to-end automation for life & health portfolios",
    description:
      "Our Life Insurance Platform delivers complete policy lifecycle management — from new business and underwriting to claims settlement and reinsurance. Built for scalability, it handles millions of policies with enterprise-grade reliability.",
    longDescription:
      "The IEnsure Life platform is the most comprehensive life and health insurance management system available in the Nepalese market. Engineered for carriers running high-volume individual and group business, it covers the full policy lifecycle — from agent-assisted or self-service new business, through sophisticated underwriting rules and medical data integration, to automated claims assessment and instant settlement. Built on a modern microservices architecture, IEnsure Life delivers unmatched reliability and scales elastically to meet peak demand without performance compromise.",
    icon: Activity,
    gradient: "from-blue-600 to-indigo-600",
    glowColor: "#1d4ed8",
    accentLight: "bg-blue-500/10",
    badge: "Life & Health",
    features: [
      { icon: FileText, label: "Policy Administration", description: "Full lifecycle management from issuance to maturity" },
      { icon: ShieldCheck, label: "Underwriting Engine", description: "Rules-based and AI-assisted risk evaluation" },
      { icon: RefreshCw, label: "Claims Management", description: "Automated claims intake, assessment and settlement" },
      { icon: BarChart3, label: "Reporting & Analytics", description: "Real-time dashboards and regulatory reports" },
      { icon: Settings, label: "Product Configurator", description: "No-code product builder for rapid market launch" },
      { icon: Zap, label: "Accounting Module", description: "Premium accounting, reconciliation and audit trails" },
    ],
    stats: [
      { value: "12,490", label: "Active Policies" },
      { value: "+14.2%", label: "YoY Growth" },
      { value: "99.9%", label: "Uptime SLA" },
    ],
    clients: [
      { name: "Nepal Life Insurance", initials: "NLI" },
      { name: "Life Insurance Corporation", initials: "LIC" },
      { name: "National Life", initials: "NL" },
    ],
    benefits: [
      { title: "Reduce Admin Costs by 35%", description: "Automated workflows eliminate manual data entry and paper-based processes across the full policy lifecycle." },
      { title: "Launch Products 10x Faster", description: "Our no-code product configurator lets actuaries build and launch new products in days, not months." },
      { title: "99.9% Guaranteed Uptime", description: "Multi-region deployment with automatic failover ensures your business never stops." },
      { title: "Regulatory Ready", description: "Pre-built reports for IRDAI and NRB ensure you are always audit-ready without manual effort." },
    ],
  },
  {
    id: "general",
    slug: "general",
    title: "General Insurance Suite",
    shortTitle: "General Insurance",
    tagline: "Flexible non-life platform for complex portfolios",
    description:
      "A highly configurable non-life insurance management system that powers motor, fire, marine, health and liability lines. Our configurable product engine lets you launch new products without writing a single line of code.",
    longDescription:
      "IEnsure General is a unified non-life insurance management platform purpose-built for the complexity of modern general insurance portfolios. Whether you run motor, fire, marine, engineering, liability or health lines — or all of them — IEnsure General's flexible product engine unifies your operations on a single platform. Its open API architecture ensures deep integration with existing core systems, payment gateways, survey tools and external data providers, giving your team a 360° view of every risk in your portfolio.",
    icon: ShieldCheck,
    gradient: "from-orange-500 to-red-600",
    glowColor: "#ea580c",
    accentLight: "bg-orange-500/10",
    badge: "Non-Life",
    features: [
      { icon: FileText, label: "Multi-Line Policy Engine", description: "Motor, fire, marine, liability and more" },
      { icon: ShieldCheck, label: "Risk Assessment", description: "Automated surveys and risk scoring tools" },
      { icon: RefreshCw, label: "Claims Processing", description: "Digital FNOL to settlement with SLA tracking" },
      { icon: BarChart3, label: "Portfolio Analytics", description: "Loss ratios, combined ratios and profitability" },
      { icon: Globe, label: "Agent Portal", description: "Self-service portal for agent quote and bind" },
      { icon: Settings, label: "Compliance Engine", description: "Built-in regulatory reporting for NRB and IRCN" },
    ],
    stats: [
      { value: "3,892", label: "Claims/day" },
      { value: "−5.1%", label: "TAT Reduction" },
      { value: "15+", label: "Insurer Clients" },
    ],
    clients: [
      { name: "Shikhar Insurance", initials: "SI" },
      { name: "Himalayan General", initials: "HG" },
      { name: "Prabhu Insurance", initials: "PI" },
    ],
    benefits: [
      { title: "Unified Portfolio View", description: "All lines of business — motor, fire, marine, health — managed in one system with consolidated reporting." },
      { title: "Digital FNOL to Settlement", description: "Customers and agents submit claims digitally. Automated triage routes claims to the right adjuster instantly." },
      { title: "Configurable Products", description: "Build complex rating tables and product structures without developer involvement." },
      { title: "Open Integration Layer", description: "REST APIs connect IEnsure General to payment gateways, IoT devices, and external data sources." },
    ],
  },
  {
    id: "aggregator",
    slug: "aggregator",
    title: "Insurance Aggregator",
    shortTitle: "Aggregator Platform",
    tagline: "Unified distribution gateway across all carriers",
    description:
      "Connect customers to multiple insurers through a single API gateway. Our aggregator platform enables real-time quote comparison, instant policy issuance and seamless data exchange across your entire distribution network.",
    longDescription:
      "The IEnsure Aggregator is the infrastructure layer powering Nepal's leading insurance comparison and distribution platforms. It connects fintechs, bancassurance platforms, e-commerce aggregators and enterprise HR portals to a normalized carrier API — abstracting the complexity of integrating with multiple insurers behind a single, standards-based interface. With sub-500ms response times and 99.9% uptime, the platform enables real-time, side-by-side quote comparison and frictionless digital policy issuance.",
    icon: Layers,
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "#059669",
    accentLight: "bg-emerald-500/10",
    badge: "Distribution",
    features: [
      { icon: Zap, label: "Real-Time Quoting", description: "Sub-second quotes from multiple carriers simultaneously" },
      { icon: Globe, label: "Multi-Carrier API", description: "Unified gateway with normalized data schema" },
      { icon: FileText, label: "Instant Issuance", description: "Bind and issue policies in a single digital flow" },
      { icon: BarChart3, label: "Conversion Analytics", description: "Funnel tracking and A/B optimization tools" },
      { icon: ShieldCheck, label: "Fraud Detection", description: "ML-powered anomaly detection at quote stage" },
      { icon: Settings, label: "White-Label Ready", description: "Fully brandable front-end and API layer" },
    ],
    stats: [
      { value: "450ms", label: "Avg Latency" },
      { value: "99.9%", label: "Uptime" },
      { value: "2M+", label: "Quotes/month" },
    ],
    clients: [
      { name: "eBeema", initials: "EB" },
      { name: "InsureNepal", initials: "IN" },
      { name: "PolicyBazaar NP", initials: "PB" },
    ],
    benefits: [
      { title: "One Integration, All Carriers", description: "Integrate once with IEnsure Aggregator and gain access to every carrier on our network — no individual integrations required." },
      { title: "Sub-500ms Responses", description: "Our optimized gateway architecture returns carrier quotes in under 500 milliseconds, keeping conversion rates high." },
      { title: "Full White-Label Control", description: "Deploy a fully branded comparison experience without any visible Arhant branding." },
      { title: "Built-in Fraud Detection", description: "ML-powered anomaly detection flags suspicious applications before policies are issued." },
    ],
  },
  {
    id: "micro",
    slug: "micro",
    title: "Micro Insurance Engine",
    shortTitle: "Micro Insurance",
    tagline: "Inclusive insurance for underserved markets",
    description:
      "Purpose-built for high-volume, low-premium micro insurance products. Our lightweight engine handles parametric triggers, mobile-first enrollment and instant payouts — making insurance accessible to the last mile.",
    longDescription:
      "IEnsure Micro is a purpose-built platform for designing, distributing and settling micro and parametric insurance products at scale. Whether the trigger is a weather index, a satellite data feed or a hospital admission, IEnsure Micro automates the entire journey — from mobile-first enrollment via USSD or smartphone app, to automated trigger monitoring, zero-paperwork claim settlement and instant payout to mobile wallets. With MFI, cooperative and NGO integration toolkits built-in, reaching the last mile has never been more straightforward.",
    icon: Users,
    gradient: "from-purple-500 to-fuchsia-600",
    glowColor: "#9333ea",
    accentLight: "bg-purple-500/10",
    badge: "Inclusive Finance",
    features: [
      { icon: Phone, label: "Mobile-First Enrollment", description: "Feature phone and smartphone compatible USSD/app flows" },
      { icon: Zap, label: "Parametric Triggers", description: "Automated payouts based on index or weather data" },
      { icon: RefreshCw, label: "Instant Claims", description: "Zero-paperwork, instant settlement to mobile wallets" },
      { icon: Globe, label: "Multi-Language", description: "Nepali, English and regional language support" },
      { icon: BarChart3, label: "Outreach Analytics", description: "Enrollment funnels, geographic heat-maps" },
      { icon: Settings, label: "Partner API", description: "MFI, cooperative and NGO integration toolkit" },
    ],
    stats: [
      { value: "1.2M", label: "Active Users" },
      { value: "+89K", label: "New/month" },
      { value: "<2s", label: "Claim Payout" },
    ],
    clients: [
      { name: "Grameen Bikas", initials: "GB" },
      { name: "Rural Finance", initials: "RF" },
      { name: "CommunityPay", initials: "CP" },
    ],
    benefits: [
      { title: "Reach 1M+ Users", description: "Lightweight enrollment flows work on even basic feature phones via USSD, breaking down the smartphone barrier." },
      { title: "Automated Parametric Triggers", description: "Connect to weather stations, satellite feeds or hospital databases. Claims are settled automatically — no human adjuster required." },
      { title: "Instant Mobile Wallet Payouts", description: "Integrate with eSewa, Khalti and other mobile wallets for sub-2-second claim settlements." },
      { title: "MFI & NGO Integration Kit", description: "Ready-made connectors for microfinance institutions, cooperatives and NGOs accelerate partner onboarding." },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
