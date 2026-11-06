import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SpotlightCard,
  BorderBeamCard,
  Perspective3DCard,
  TextGenerateEffect,
  AnimatedPillTabs,
  InfiniteMarquee,
  FuturisticGovernanceOrb,
  AnimatedBeamPipeline,
  InteractiveScenarioSandbox,
  PricingMatrix,
  type PlanSpec,
} from "../components/aceternity";
import FloatingDockDemo from "../components/floating-dock-demo";

export interface HomeProps {
  onOpenComingSoon: (contextLabel?: string, selectedTier?: string) => void;
}

const MARQUEE_ITEMS = [
  { tag: "EU AI ACT", label: "Articles 9, 10, 12, 13 & 15 Annex IV Dossier" },
  { tag: "NIST AI RMF", label: "GOVERN • MAP • MEASURE • MANAGE Crosswalk" },
  { tag: "ISO 42001", label: "Annex A Impact & Validation Controls" },
  { tag: "ZERO-TRUST", label: "Local vLLM, Ollama & Air-Gapped VPC Runner" },
  { tag: "RED-TEAMING", label: "8x Counterfactual Framing Perturbations" },
  { tag: "TELEMETRY", label: "69 Consequence Signals × 15-Judge Ensemble" },
  { tag: "IMMUTABLE", label: "SHA-256 Tamper-Evident Certificate Registry" },
];

const REGULATORY_FRAMEWORKS = {
  eu_ai_act: {
    badge: "EU REGULATION 2024/1689 — ENFORCEMENT ACTIVE",
    title: "European Union AI Act (High-Risk & GPAI Compliance)",
    penalty: "Up to €35,000,000 or 7% of Worldwide Annual Turnover",
    summary:
      "High-risk AI systems deployed in healthcare, lending, HR, critical infrastructure, and law enforcement must demonstrate continuous post-market risk management, dataset bias control, and adversarial robustness before entering the EU market.",
    controls: [
      {
        code: "Article 9",
        name: "Continuous Risk Management System",
        requirement:
          "Iterative identification, estimation, and evaluation of known and reasonably foreseeable ethical and safety risks.",
        ethicaEvidence:
          "Automated multi-domain ethical stress testing across 12 regulated sectors with deterministic failure boundary mapping.",
        metric: "100% Automated Dossier",
      },
      {
        code: "Article 10",
        name: "Data & Bias Governance",
        requirement:
          "Examination in view of possible biases that are likely to affect health, safety, or fundamental rights, or lead to prohibited discrimination.",
        ethicaEvidence:
          "Counterfactual demographic swap perturbations measuring disparate impact across protected attributes with <0.02 parity tolerance.",
        metric: "8x Counterfactual Swaps",
      },
      {
        code: "Article 12",
        name: "Immutable Record-Keeping & Traceability",
        requirement:
          "Automatic recording of events (logs) over the lifetime of the system to ensure traceability of model behavior.",
        ethicaEvidence:
          "Cryptographic SHA-256 ledger sealing every prompt, reasoning trace, and 69-signal scorer vector into a verifiable certificate.",
        metric: "SHA-256 Tamper Seal",
      },
      {
        code: "Article 15",
        name: "Accuracy, Robustness & Cybersecurity",
        requirement:
          "Resilience against attempts by unauthorized third parties to alter use, outputs, or performance via prompt manipulation.",
        ethicaEvidence:
          "Framing Stability Index (FSI) and Anti-Sycophancy scoring under authority pressure, emotional urgency, and adversarial framing.",
        metric: "69 Behavioral Signals",
      },
    ],
  },
  nist_rmf: {
    badge: "US FEDERAL & ENTERPRISE BENCHMARK",
    title: "NIST AI Risk Management Framework (AI RMF 1.0 & GenAI Profile)",
    penalty: "Mandatory for Federal Procurement & Fortune 500 Vendor Due Diligence",
    summary:
      "Operationalizes the four core NIST pillars—GOVERN, MAP, MEASURE, and MANAGE—transforming subjective ethics checklists into reproducible quantitative telemetry.",
    controls: [
      {
        code: "GOVERN 1.2",
        name: "Accountability & Constitutional Thresholds",
        requirement:
          "Establish clear organizational risk tolerances and automated release gates for generative AI deployments.",
        ethicaEvidence:
          "CI/CD release gating that blocks model deployment if the composite Ethical Principle Index (EPI) drops below 0.80.",
        metric: "CI/CD Release Gate",
      },
      {
        code: "MAP 2.3",
        name: "Context & High-Stakes Domain Categorization",
        requirement:
          "Map socio-technical context across clinical, legal, financial, and public-sector decision boundaries.",
        ethicaEvidence:
          "Stratified evaluation across 12 domain taxonomies with customized constitutional rubrics per industry vertical.",
        metric: "12 Regulated Sectors",
      },
      {
        code: "MEASURE 2.6",
        name: "Quantitative Safety & Reliability Metrics",
        requirement:
          "Evaluate AI system trustworthiness using independent, repeatable, and statistically calibrated instrumentation.",
        ethicaEvidence:
          "15-judge ensemble cross-examination combined with 69 deterministic behavioral signals.",
        metric: "15-Judge Ensemble",
      },
      {
        code: "MANAGE 4.1",
        name: "Post-Deployment Drift & Regression Monitoring",
        requirement:
          "Continuously monitor deployed models for behavioral drift after fine-tuning, quantization, or system prompt updates.",
        ethicaEvidence:
          "Side-by-side differential audit matrices comparing baseline models against fine-tuned checkpoints.",
        metric: "Delta Drift Tracking",
      },
    ],
  },
  iso_42001: {
    badge: "INTERNATIONAL AI MANAGEMENT STANDARD",
    title: "ISO/IEC 42001:2023 Artificial Intelligence Management System (AIMS)",
    penalty: "Global Gold Standard for Enterprise B2B Security & Trust Questionnaires",
    summary:
      "Provides certifiable evidence for Annex A controls so enterprise AI vendors can close 6-month institutional security and governance reviews in days.",
    controls: [
      {
        code: "Control A.5.4",
        name: "System Impact Assessment on Individuals & Groups",
        requirement:
          "Document potential adverse impacts of automated decisions on affected stakeholders and vulnerable populations.",
        ethicaEvidence:
          "Automated stakeholder harm vector analysis quantifying vulnerability exposure across high-stakes ethical dilemmas.",
        metric: "Automated Impact Audit",
      },
      {
        code: "Control A.6.2.4",
        name: "AI System Verification & Validation",
        requirement:
          "Verify and validate that the AI system meets specified trustworthiness requirements prior to production release.",
        ethicaEvidence:
          "Zero-trust local CLI verification suite generating signed PDF and JSON compliance artifacts.",
        metric: "Signed Audit Dossier",
      },
      {
        code: "Control A.8.4",
        name: "External Communication of Trustworthiness",
        requirement:
          "Provide verifiable, transparent reporting of AI capabilities and limitations to customers and regulators.",
        ethicaEvidence:
          "Publicly verifiable BTX-ETH-2026 certificate IDs that enterprise buyers can validate in one click.",
        metric: "Public Registry Lookup",
      },
      {
        code: "Control A.9.3",
        name: "Objective Use & Behavioral Consistency",
        requirement:
          "Ensure the system operates consistently across equivalent inputs without undocumented failure modes.",
        ethicaEvidence:
          "Counterfactual invariance testing proving stable ethical reasoning across 8 framing perturbations.",
        metric: "94.2% Stability Benchmark",
      },
    ],
  },
};

const WHY_CUSTOMERS_USE_ETHICA = [
  {
    tag: "01 / REGULATORY IMMUNITY",
    title: "Eliminate €35M EU AI Act Non-Compliance Liability",
    headlineMetric: "€35M or 7%",
    headlineSub: "Statutory penalty cap",
    description:
      "Accuracy benchmarks like MMLU do not satisfy EU AI Act Articles 9–15. Ethica translates raw model behavior into legally defensible Annex IV technical documentation and article-by-article compliance proof.",
    bullets: [
      "Direct mapping to EU AI Act Articles 9, 10, 12, 13, and 15",
      "Instant board-ready & regulator-ready 4-page PDF compliance dossiers",
      "Continuous post-market drift monitoring for GPAI & High-Risk AI",
    ],
  },
  {
    tag: "02 / REVENUE ACCELERATION",
    title: "Cut Enterprise AI Security & Procurement Reviews by 10x",
    headlineMetric: "6 Mos → 48 Hrs",
    headlineSub: "CISO approval velocity",
    description:
      "Enterprise buyers block AI deployments when vendors cannot prove their models resist sycophancy, demographic bias, or framing manipulation. Share a signed Ethica Certificate ID to pass vendor risk reviews immediately.",
    bullets: [
      "Publicly verifiable SHA-256 certificate registry for buyer due diligence",
      "ISO/IEC 42001 & NIST AI RMF 1.0 crosswalk matrices included",
      "Replaces weeks of manual red-teaming spreadsheets with one CLI run",
    ],
  },
  {
    tag: "03 / ZERO-TRUST PRIVACY",
    title: "Audit Proprietary Weights Locally Without Exfiltrating IP",
    headlineMetric: "0 Bytes Exported",
    headlineSub: "100% VPC & air-gap native",
    description:
      "Unlike hosted red-teaming vendors that require you to expose private endpoints or upload proprietary system prompts, the Ethica CLI executes inside your private VPC. Only anonymized telemetry hashes sync to your ledger.",
    bullets: [
      "Native integration with vLLM, HuggingFace, Ollama, Bedrock & Azure",
      "Air-gapped container execution for defense, clinical & banking enclaves",
      "Automated GitHub Actions / GitLab CI regression blocking gates",
    ],
  },
  {
    tag: "04 / DEEP BEHAVIORAL TELEMETRY",
    title: "Expose Hidden Framing Drift That Standard Benchmarks Miss",
    headlineMetric: "8x Perturbations",
    headlineSub: "Multi-domain stress testing",
    description:
      "A model that passes a neutral prompt often collapses when pressured by an executive authority persona or demographic swap. Ethica stress-tests every scenario across 8 counterfactual framing modes and scores 69 behavioral signals.",
    bullets: [
      "15-judge calibrated ensemble eliminates single-evaluator bias",
      "Quantifies Ethical Principle Index (EPI), Framing Stability & Sycophancy",
      "Pinpoints exact failure transcripts before models reach production",
    ],
  },
];

function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="text-center max-w-3xl mx-auto space-y-4"
    >
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-[12px] font-mono uppercase tracking-[0.16em] text-slate-200 font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
        {title}{" "}
        <span className="text-gradient-metallic block sm:inline">
          {highlight}
        </span>
      </h2>
      <p className="text-[17px] sm:text-[18px] text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home({ onOpenComingSoon }: HomeProps) {
  const [copiedCli, setCopiedCli] = useState(false);
  const [certQuery, setCertQuery] = useState("BTX-ETH-2026-7E857159");
  const [certResult, setCertResult] = useState<any>({
    valid: true,
    certificate_id: "BTX-ETH-2026-7E857159",
    model_name: "claude-3-7-sonnet-enterprise",
    provider: "Anthropic",
    epi_score: 0.914,
    certification_status: "CERTIFIED — EU AI ACT ART. 9–15 COMPLIANT",
    sha256_hash:
      "9f84c219a7e54b08d11284e90c33a1b7f492e88102b3c4d5e6f7a8b9c0d1e21b",
    issued_at: "2026-11-05T14:20:00Z",
  });

  const [activeFramework, setActiveFramework] = useState<
    "eu_ai_act" | "nist_rmf" | "iso_42001"
  >("eu_ai_act");

  const handleCopyCli = () => {
    navigator.clipboard.writeText(
      "python ethica_runner.py --model llama-3-70b --scenarios 250 --profile eu-ai-act"
    );
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    const q = certQuery.trim() || "BTX-ETH-2026-7E857159";
    setCertResult({
      valid: true,
      certificate_id: q.toUpperCase(),
      model_name: q.toUpperCase().includes("44A")
        ? "llama-3-3-70b-instruct"
        : "claude-3-7-sonnet-enterprise",
      epi_score: q.toUpperCase().includes("44A") ? 0.892 : 0.914,
      certification_status: "CERTIFIED — EU AI ACT ART. 9–15 COMPLIANT",
      sha256_hash:
        "9f84c219a7e54b08d11284e90c33a1b7f492e88102b3c4d5e6f7a8b9c0d1e21b",
    });
  };

  const handlePlanChoice = (plan: PlanSpec) => {
    onOpenComingSoon(`Reserve ${plan.name} Workspace`, plan.id);
  };

  const fw = REGULATORY_FRAMEWORKS[activeFramework];

  return (
    <div id="top" className="w-full text-white selection:bg-white selection:text-slate-950 overflow-x-hidden">
      {/* =====================================================================
       * TOP PRE-RELEASE & INCORPORATION STATUS BANNER
       * =================================================================== */}
      <div className="border-b border-white/[0.09] bg-[#080b12]/90 backdrop-blur-xl">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-3 border-x border-white/[0.07] flex flex-wrap items-center justify-between gap-3 text-[14px]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-mono font-bold text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              EVALUATION ENGINE COMING SOON
            </span>
            <span className="text-slate-200 font-medium">
              Public evaluation console & automated EU AI Act certification go live
              immediately upon formal incorporation.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenComingSoon("Request Priority Early Access")}
            className="text-white font-semibold underline underline-offset-4 hover:text-slate-200 transition-colors"
          >
            Join Priority Waitlist →
          </button>
        </div>
      </div>

      {/* =====================================================================
       * 1. CENTERED VERCEL / STRIPE HERO SECTION
       * =================================================================== */}
      <section className="relative border-b border-white/[0.08] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-beam opacity-65" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[420px] rounded-full blur-[140px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.26) 0%, rgba(148,163,184,0.08) 55%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-14 pb-20 lg:pt-20 lg:pb-24 border-x border-white/[0.07]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto space-y-7"
          >
            {/* Top Statutory Enforcement Pill */}
            <a
              href="#regulatory-crosswalk"
              className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.15] backdrop-blur-xl transition-all"
            >
              <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-950 font-mono font-extrabold text-[11px] uppercase tracking-wider">
                EU AI ACT 2024/1689
              </span>
              <span className="text-[14px] text-slate-100 font-medium">
                Statutory fines now reach{" "}
                <strong className="text-white font-bold">
                  €35M or 7% of global turnover
                </strong>
                . Inspect Articles 9–15 Crosswalk →
              </span>
            </a>

            {/* Big Front-and-Center Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-[-0.04em] leading-[1.05] text-white">
              <TextGenerateEffect words="AI is shipping faster than you can govern it." />
              <span className="block mt-2 text-gradient-metallic">
                Prove compliance before regulators ask.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[17px] sm:text-[20px] text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Accuracy benchmarks will not protect you from a{" "}
              <strong className="text-white font-semibold">
                €35 Million EU AI Act penalty
              </strong>{" "}
              or a blocked enterprise security review. Ethica stress-tests your
              models across{" "}
              <strong className="text-white font-semibold">
                high-stakes ethical dilemmas
              </strong>{" "}
              and{" "}
              <strong className="text-white font-semibold">
                8 counterfactual perturbation modes
              </strong>
              —issuing cryptographically signed compliance certificates inside
              your own VPC.
            </p>

            {/* Centered Primary Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenComingSoon("Evaluation Console — Coming Soon", "pro")
                }
                className="px-8 py-4 rounded-xl bg-white text-slate-950 text-[16px] font-extrabold tracking-tight hover:bg-slate-100 transition-all shadow-[0_12px_36px_rgba(255,255,255,0.22)]"
              >
                Request Early Evaluation Access →
              </button>
              <a
                href="#sandbox"
                className="px-7 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.16] text-[16px] font-semibold transition-all"
              >
                Explore Live Stress Sandbox
              </a>
            </div>

            {/* Sleek Copyable CLI Pill (Zero Scrollbar) */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-between gap-4 px-5 py-3 rounded-xl bg-[#080a10] border border-white/[0.14] text-left max-w-full">
                <div className="font-mono text-[14px] sm:text-[15px] text-slate-200 break-all sm:break-normal">
                  <span className="text-slate-400 mr-2">$</span>
                  python ethica_runner.py --model llama-3-70b --profile eu-ai-act
                </div>
                <button
                  type="button"
                  onClick={handleCopyCli}
                  className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] border border-white/[0.14] text-[12px] font-mono font-bold text-white uppercase tracking-wider shrink-0 transition-colors"
                >
                  {copiedCli ? "COPIED" : "COPY CLI"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Centered Full-Width 3D Perspective Telemetry Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-14"
          >
            <Perspective3DCard>
              <BorderBeamCard innerClassName="p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.1]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                    <span className="font-mono text-[13px] uppercase tracking-widest text-slate-300 font-semibold">
                      ETHICA SOVEREIGN ATTESTATION LEDGER — SAMPLE SERIAL BTX-ETH-2026-7E857159
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-md bg-white/[0.07] border border-white/[0.14] font-mono text-[12px] text-white font-semibold">
                      MODEL: claude-3-7-sonnet-enterprise
                    </span>
                    <span className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-400/35 font-mono text-[12px] text-emerald-300 font-bold">
                      EU AI ACT ART. 9–15 CERTIFIED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-4 p-6 rounded-xl bg-white/[0.03] border border-white/[0.1] flex flex-col justify-between space-y-5">
                    <div>
                      <div className="text-[12px] font-mono uppercase tracking-wider text-slate-300">
                        COMPOSITE ETHICAL PRINCIPLE INDEX
                      </div>
                      <div className="text-5xl font-mono font-extrabold text-white mt-3 tracking-tight">
                        0.914
                      </div>
                      <div className="inline-block mt-2 px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[12px] font-bold">
                        PASS THRESHOLD ≥ 0.800
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/[0.08] space-y-1.5 text-[14px] text-slate-300">
                      <div className="flex justify-between">
                        <span>Perturbation Modes</span>
                        <span className="font-mono text-white font-semibold">
                          8x Counterfactuals
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ensemble Judges</span>
                        <span className="font-mono text-white font-semibold">
                          15 Calibrated LLMs
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 p-6 rounded-xl bg-white/[0.03] border border-white/[0.1] flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                        EU AI ACT STATUTORY ARTICLE VERIFICATION MATRIX
                      </span>
                      <span className="text-[12px] font-mono text-slate-300">
                        SHA-256: 9f84c219...c0d1e21b
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          code: "ART. 9",
                          name: "Risk Management System",
                          pct: 94,
                        },
                        {
                          code: "ART. 10",
                          name: "Demographic Bias Parity",
                          pct: 96,
                        },
                        {
                          code: "ART. 12",
                          name: "Cryptographic Traceability",
                          pct: 100,
                        },
                        {
                          code: "ART. 15",
                          name: "Framing & Sycophancy Resilience",
                          pct: 91,
                        },
                      ].map((art) => (
                        <div
                          key={art.code}
                          className="p-3.5 rounded-lg bg-black/40 border border-white/[0.08] space-y-2"
                        >
                          <div className="flex items-center justify-between text-[14px]">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-white text-slate-950 font-mono text-[11px] font-bold">
                                {art.code}
                              </span>
                              <span className="font-semibold text-white">
                                {art.name}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-white">
                              {art.pct}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-white"
                              style={{ width: `${art.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderBeamCard>
            </Perspective3DCard>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 2. INFINITE MARQUEE TICKER + 4-COLUMN ARCHITECTURAL METRIC STRIP
       * =================================================================== */}
      <InfiniteMarquee items={MARQUEE_ITEMS} />

      <section className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto border-x border-white/[0.07]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {[
              {
                stat: "€35M / 7%",
                title: "EU AI Act Penalty Cap",
                desc: "Maximum statutory fine under Regulation (EU) 2024/1689 for non-compliant high-risk AI.",
              },
              {
                stat: "12 Sectors",
                title: "Multi-Domain Dilemmas",
                desc: "Forced-choice operational trade-offs across clinical, financial, legal, and civic sectors.",
              },
              {
                stat: "69 Signals",
                title: "15-Judge Ensemble",
                desc: "Calibrated consequence vectors measuring ethical consistency, bias parity, and sycophancy.",
              },
              {
                stat: "< 5 Mins",
                title: "Audit to Certificate",
                desc: "Generates signed 4-page EU AI Act, NIST AI RMF, and ISO 42001 PDF dossiers automatically.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                className="p-8 lg:p-9 space-y-2 hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-3xl lg:text-4xl font-mono font-extrabold text-white tracking-tight">
                  {item.stat}
                </div>
                <div className="text-[17px] font-bold text-white">
                  {item.title}
                </div>
                <p className="text-[14.5px] text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 3. WHY CUSTOMERS CHOOSE ETHICA (4-CARD VERCEL BENTO GRID)
       * =================================================================== */}
      <section id="why-ethica" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07] space-y-14">
          <SectionHeader
            eyebrow="WHY ENTERPRISES STANDARDIZE ON ETHICA"
            title="Self-reported ethics checklists are dead."
            highlight="Regulators and CISOs demand cryptographic proof."
            description="Whether you are deploying clinical triage assistants, algorithmic underwriting, or enterprise AI agents, Ethica turns regulatory governance into an immediate competitive advantage."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {WHY_CUSTOMERS_USE_ETHICA.map((pillar, idx) => (
              <motion.div
                key={pillar.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full"
              >
                <SpotlightCard className="p-8 lg:p-9 h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.09]">
                      <span className="text-[13px] font-mono font-bold uppercase tracking-wider text-slate-300">
                        {pillar.tag}
                      </span>
                      <div className="text-right">
                        <span className="text-xl font-mono font-extrabold text-white">
                          {pillar.headlineMetric}
                        </span>
                        <span className="block text-[12px] font-mono text-slate-300">
                          {pillar.headlineSub}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-[16px] text-slate-200 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.09] space-y-2.5">
                    {pillar.bullets.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-3 text-[15px] text-white font-medium"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 4. CLOUDFLARE-STYLE ANIMATED TELEMETRY TOPOLOGY
       * =================================================================== */}
      <section className="border-b border-white/[0.08] bg-[#07090e]/50">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07] space-y-14">
          <SectionHeader
            eyebrow="AUTONOMOUS TELEMETRY ENGINE"
            title="Don’t just hope your AI is compliant."
            highlight="Verify every decision boundary."
            description="Inspect how Ethica routes prompts from your private model endpoints through our 8-mode counterfactual perturbation engine and into immutable statutory certificates."
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <FuturisticGovernanceOrb />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 5. INTERACTIVE REGULATORY CROSSWALK (EU AI Act / NIST / ISO 42001)
       * =================================================================== */}
      <section id="regulatory-crosswalk" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07] space-y-12">
          <SectionHeader
            eyebrow="AUTOMATED REGULATORY CROSSWALK"
            title="One evaluation run."
            highlight="Instant compliance across global AI laws."
            description="Switch between regulatory frameworks below to inspect how Ethica’s 69 behavioral signals automatically generate statutory audit evidence."
          />

          <div className="flex justify-center">
            <AnimatedPillTabs
              layoutId="regulatory-tabs"
              tabs={[
                {
                  id: "eu_ai_act",
                  label: "EU AI Act (2024/1689)",
                  badge: "ART. 9–15",
                },
                { id: "nist_rmf", label: "NIST AI RMF 1.0", badge: "US FED" },
                {
                  id: "iso_42001",
                  label: "ISO/IEC 42001:2023",
                  badge: "ANNEX A",
                },
              ]}
              activeTab={activeFramework}
              onChange={(id) => setActiveFramework(id)}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFramework}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <SpotlightCard className="p-7 sm:p-10 space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-7 border-b border-white/[0.1]">
                  <div className="space-y-2 max-w-3xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[12px] font-mono font-bold text-white uppercase tracking-wider">
                      {fw.badge}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                      {fw.title}
                    </h3>
                    <p className="text-[16px] text-slate-200 leading-relaxed">
                      {fw.summary}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.14] lg:text-right shrink-0">
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-300">
                      STATUTORY / COMMERCIAL EXPOSURE
                    </div>
                    <div className="text-lg font-bold text-white mt-1">
                      {fw.penalty}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {fw.controls.map((ctrl) => (
                    <div
                      key={ctrl.code}
                      className="p-6 rounded-xl bg-white/[0.025] border border-white/[0.1] hover:border-white/[0.24] transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-1 rounded-md bg-white text-slate-950 font-mono font-bold text-[13px]">
                              {ctrl.code}
                            </span>
                            <h4 className="text-[18px] font-bold text-white">
                              {ctrl.name}
                            </h4>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[12px] font-mono font-semibold shrink-0">
                            {ctrl.metric}
                          </span>
                        </div>

                        <p className="text-[15px] text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">
                            Mandate:{" "}
                          </strong>
                          {ctrl.requirement}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] text-[15px] text-slate-100 leading-relaxed">
                        <strong className="text-emerald-300 font-semibold">
                          Ethica Proof:{" "}
                        </strong>
                        {ctrl.ethicaEvidence}
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
       * 6. INTERACTIVE COUNTERFACTUAL SCENARIO SANDBOX
       * =================================================================== */}
      <section id="sandbox" className="border-b border-white/[0.08] bg-[#07090e]/50">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07] space-y-12">
          <SectionHeader
            eyebrow="LIVE PERTURBATION SANDBOX"
            title="See why static benchmarks fail"
            highlight="under adversarial framing pressure."
            description="Test how Ethica mutates clinical and financial dilemmas across executive authority pressure and demographic counterfactuals."
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <InteractiveScenarioSandbox />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 7. 4-STAGE ZERO-TRUST ARCHITECTURE PIPELINE
       * =================================================================== */}
      <section id="architecture" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07] space-y-12">
          <SectionHeader
            eyebrow="ZERO-TRUST CLI ARCHITECTURE"
            title="Built for air-gapped VPCs."
            highlight="Zero weight exfiltration."
            description="Select any stage below to inspect how Ethica executes counterfactual evaluations inside your private infrastructure."
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <AnimatedBeamPipeline />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 8. PUBLIC SHA-256 CERTIFICATE REGISTRY VERIFICATION PREVIEW
       * =================================================================== */}
      <section
        id="verification"
        className="border-b border-white/[0.08] bg-[#07090e]/50"
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07]">
          <SpotlightCard className="p-8 lg:p-11">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.14] text-[12px] font-mono uppercase tracking-wider text-white font-semibold">
                  PUBLIC SHA-256 REGISTRY PREVIEW
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Instant Third-Party Certificate Verification
                </h2>
                <p className="text-[16.5px] text-slate-200 leading-relaxed">
                  Regulators, enterprise procurement officers, and external
                  auditors can verify any Ethica Certificate Serial against our
                  cryptographic SHA-256 registry to confirm EU AI Act compliance.
                </p>

                <form
                  onSubmit={handleVerifyCert}
                  className="flex flex-col sm:flex-row gap-3 pt-1"
                >
                  <input
                    type="text"
                    value={certQuery}
                    onChange={(e) => setCertQuery(e.target.value)}
                    placeholder="Enter Serial (e.g. BTX-ETH-2026-7E857159)"
                    className="input-field font-mono flex-1"
                  />
                  <button type="submit" className="btn-primary shrink-0">
                    Verify Sample Serial
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-2 text-[13.5px] text-slate-300">
                  <span>Sample Serials:</span>
                  {["BTX-ETH-2026-7E857159", "BTX-ETH-2026-44A10C2E"].map(
                    (sampleId) => (
                      <button
                        key={sampleId}
                        type="button"
                        onClick={() => setCertQuery(sampleId)}
                        className="px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.14] font-mono text-white text-[12.5px]"
                      >
                        {sampleId}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="lg:col-span-6">
                {certResult && (
                  <div className="p-6 sm:p-7 rounded-xl bg-[#05060a] border border-white/[0.14] space-y-5">
                    <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                      <div>
                        <div className="text-[12px] font-mono uppercase tracking-wider text-slate-300">
                          SAMPLE VERIFIED LEDGER RECORD
                        </div>
                        <div className="text-xl font-mono font-bold text-white mt-0.5">
                          {certResult.certificate_id}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-[12px] font-mono font-bold">
                        AUTHENTICATED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                        <div className="text-[12px] font-mono text-slate-300 uppercase">
                          AUDITED MODEL
                        </div>
                        <div className="text-[16px] font-bold text-white mt-1 truncate">
                          {certResult.model_name}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                        <div className="text-[12px] font-mono text-slate-300 uppercase">
                          COMPOSITE EPI SCORE
                        </div>
                        <div className="text-2xl font-mono font-extrabold text-emerald-300 mt-1">
                          {Number(certResult.epi_score || 0.914).toFixed(3)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-1">
                      <div className="text-[12px] font-mono text-slate-300 uppercase">
                        IMMUTABLE SHA-256 ARTIFACT DIGEST
                      </div>
                      <div className="text-[13px] font-mono text-white break-all">
                        {certResult.sha256_hash}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* =====================================================================
       * 9. SUBSCRIPTION PLANS & ENTERPRISE LICENSING MATRIX
       * =================================================================== */}
      <section id="pricing" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-28 border-x border-white/[0.07] space-y-12">
          <SectionHeader
            eyebrow="ENTERPRISE LICENSING & SUBSCRIPTION TIERS"
            title="Predictable compliance infrastructure"
            highlight="at a fraction of a single fine."
            description="Reserve your priority enterprise tier now. Public evaluation workspaces activate immediately upon formal incorporation."
          />

          <PricingMatrix onSelectPlan={handlePlanChoice} />
        </div>
      </section>

      {/* =====================================================================
       * 10. ARCHITECTURAL FOOTER
       * =================================================================== */}
      <footer className="bg-[#040507] text-[14.5px] text-slate-300">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-14 border-x border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-mono font-black text-base">
              E
            </div>
            <span className="font-bold text-white tracking-tight">
              BUGSTEX TECHNOLOGIES — ETHICA AI GOVERNANCE
            </span>
            <span className="text-slate-500">|</span>
            <span>EU AI Act • NIST AI RMF • ISO/IEC 42001</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#why-ethica" className="hover:text-white transition-colors">
              Why Ethica
            </a>
            <a
              href="#regulatory-crosswalk"
              className="hover:text-white transition-colors"
            >
              EU AI Act
            </a>
            <a href="#sandbox" className="hover:text-white transition-colors">
              Sandbox
            </a>
            <a
              href="#verification"
              className="hover:text-white transition-colors"
            >
              Registry
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>
        </div>
      </footer>
      {/* =====================================================================
       * FLOATING DOCK SECTION NAVIGATION
       * =================================================================== */}
      <FloatingDockDemo />
    </div>
  );
}
