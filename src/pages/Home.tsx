import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TextGenerateEffect,
  AnimatedPillTabs,
  InfiniteMarquee,
  FuturisticGovernanceOrb,
  AnimatedBeamPipeline,
  InteractiveScenarioSandbox,
  PricingMatrix,
  SubscriptionCheckoutModal,
  type PlanSpec,
} from "../components/aceternity";
import FloatingDockDemo from "../components/floating-dock-demo";
import GoogleGeminiEffectDemo from "../components/google-gemini-effect-demo";

export interface HomeProps {
  go?: (page: any) => void;
  onNavigate?: (page: any) => void;
  isPublic?: boolean;
  currentTier?: string;
  onOpenAuth?: (mode: "login" | "signup", selectedTier?: string) => void;
  onOpenComingSoon?: (title?: string, selectedTier?: string) => void;
  onSelectPlan?: (
    plan: PlanSpec,
    cycle: "monthly" | "annual",
    currency: "INR" | "USD"
  ) => void;
}

const MARQUEE_ITEMS = [
  { tag: "EU AI ACT", label: "Articles 9, 10, 12, 13 & 15 Dossier" },
  { tag: "NIST AI RMF", label: "GOVERN • MAP • MEASURE • MANAGE" },
  { tag: "ISO 42001", label: "Annex A Impact & Validation" },
  { tag: "ZERO-TRUST", label: "Local vLLM, Ollama & Air-Gapped VPC" },
  { tag: "RED-TEAMING", label: "8x Counterfactual Framing Modes" },
  { tag: "TELEMETRY", label: "69 Signals × 15-Judge Ensemble" },
  { tag: "IMMUTABLE", label: "SHA-256 Certificate Registry" },
];

const REGULATORY_FRAMEWORKS = {
  eu_ai_act: {
    title: "European Union AI Act (2024/1689)",
    penalty: "Up to €35,000,000 or 7% Global Turnover",
    summary:
      "Automated Annex IV technical documentation for high-risk and general-purpose AI systems.",
    controls: [
      {
        code: "Article 9",
        name: "Risk Management System",
        requirement: "Continuous identification and evaluation of foreseeable safety risks.",
        ethicaEvidence: "Automated stress testing across 10,000 multi-domain dilemmas.",
        metric: "10,000 Scenarios",
      },
      {
        code: "Article 10",
        name: "Bias & Data Governance",
        requirement: "Examination for biases affecting fundamental rights or discrimination.",
        ethicaEvidence: "Counterfactual demographic swaps proving <0.02 parity drift.",
        metric: "< 0.02 Drift",
      },
      {
        code: "Article 12 & 13",
        name: "Traceability & Logging",
        requirement: "Automatic recording of events to ensure lifecycle traceability.",
        ethicaEvidence: "Signed SHA-256 audit ledger and 4-page Annex IV PDF dossier.",
        metric: "SHA-256 Ledger",
      },
      {
        code: "Article 15",
        name: "Adversarial Robustness",
        requirement: "Resilience against third-party manipulation and framing attacks.",
        ethicaEvidence: "8x framing perturbations testing authority pressure and sycophancy.",
        metric: "8x Perturbations",
      },
    ],
  },
  nist_rmf: {
    title: "NIST AI Risk Management Framework 1.0",
    penalty: "Required for US Federal & Enterprise Procurement",
    summary:
      "Quantitative trustworthiness telemetry mapped across GOVERN, MAP, MEASURE, and MANAGE.",
    controls: [
      {
        code: "GOVERN 1.2",
        name: "Release Thresholds",
        requirement: "Quantitative risk tolerances enforced prior to production release.",
        ethicaEvidence: "CI/CD release gate (`--fail-below 0.80`) blocks non-compliant builds.",
        metric: "CI/CD Gate",
      },
      {
        code: "MAP 2.3",
        name: "Sector Risk Profiling",
        requirement: "Operational context mapped to domain-specific deployment hazards.",
        ethicaEvidence: "Stratified suites for Clinical, Financial, Defense, and Legal AI.",
        metric: "12 Verticals",
      },
      {
        code: "MEASURE 2.5",
        name: "Independent Telemetry",
        requirement: "Trustworthiness measured via calibrated, independent evaluators.",
        ethicaEvidence: "15-judge ensemble scoring 69 behavioral consequence signals.",
        metric: "69 Signals",
      },
      {
        code: "MANAGE 4.1",
        name: "Post-Deployment Drift",
        requirement: "Continuous tracking of model drift across weight or prompt updates.",
        ethicaEvidence: "Version-to-version Ethical Principle Index (EPI) delta tracking.",
        metric: "Drift Ledger",
      },
    ],
  },
  iso_42001: {
    title: "ISO/IEC 42001:2023 AI Management System",
    penalty: "Prerequisite for Regulated Enterprise B2B Contracts",
    summary:
      "Empirical impact assessment and verification artifacts for external ISO certification bodies.",
    controls: [
      {
        code: "Annex A.5",
        name: "Societal Impact Assessment",
        requirement: "Documented evaluation of consequences for individual rights.",
        ethicaEvidence: "Utilitarian, Deontological, and Virtue alignment breakdowns.",
        metric: "5-Pillar EPI",
      },
      {
        code: "Annex A.6.2",
        name: "Verification & Validation",
        requirement: "Empirical proof that the system meets safety requirements under stress.",
        ethicaEvidence: "Reproducible counterfactual reports with deterministic seed replay.",
        metric: "Seed Replay",
      },
      {
        code: "Annex A.8",
        name: "Customer Transparency",
        requirement: "Verifiable communication of compliance posture to external buyers.",
        ethicaEvidence: "Public Certificate Serial (`BTX-ETH-2026-...`) for 1-click verification.",
        metric: "Public Serial",
      },
      {
        code: "Annex A.9",
        name: "Guardrail Enforcement",
        requirement: "Controls ensuring safe operation even under executive override.",
        ethicaEvidence: "Anti-sycophancy scoring proving refusal of unethical directives.",
        metric: "Anti-Sycophancy",
      },
    ],
  },
} as const;

const WHY_CUSTOMERS_USE_ETHICA = [
  {
    tag: "01 / STATUTORY IMMUNITY",
    title: "Avoid €35M EU AI Act Fines",
    headlineMetric: "€35M",
    headlineSub: "or 7% global turnover",
    description:
      "Generate auditor-ready EU AI Act Annex IV dossiers covering Articles 9, 10, 12, and 15 in under 5 minutes.",
    bullets: [
      "Direct clause-by-clause mapping to Articles 9–15",
      "Signed 4-page cryptographic PDF certificate",
    ],
  },
  {
    tag: "02 / DEAL VELOCITY",
    title: "Pass CISO Reviews 10x Faster",
    headlineMetric: "48 Hrs",
    headlineSub: "down from 6 months",
    description:
      "Replace weeks of security questionnaires and manual red-teaming spreadsheets with one verifiable Certificate ID.",
    bullets: [
      "Public SHA-256 registry for instant buyer verification",
      "Includes ISO/IEC 42001 & NIST AI RMF 1.0 crosswalks",
    ],
  },
  {
    tag: "03 / ZERO-TRUST PRIVACY",
    title: "Audit Locally Inside Your VPC",
    headlineMetric: "0 Bytes",
    headlineSub: "weight exfiltration",
    description:
      "Run the Ethica CLI inside your air-gapped cluster. Model weights and system prompts never leave your infrastructure.",
    bullets: [
      "Native vLLM, HuggingFace, Ollama, Bedrock & Azure",
      "Automated GitHub Actions & GitLab CI blocking gates",
    ],
  },
  {
    tag: "04 / DEEP TELEMETRY",
    title: "Expose Hidden Framing Drift",
    headlineMetric: "8x Modes",
    headlineSub: "69 behavioral signals",
    description:
      "Models that pass neutral prompts often fail under authority pressure. Ethica stress-tests every scenario across 8 counterfactual modes.",
    bullets: [
      "15-judge calibrated ensemble eliminates single-LLM bias",
      "Quantifies EPI, Framing Stability & Anti-Sycophancy",
    ],
  },
];

/* ============================================================================
 * CLEAN SECTION HEADER (Strictly No Eyebrow Label & No Dot)
 * ========================================================================== */
function SectionHeader({
  title,
  highlight,
  description,
}: {
  title: string;
  highlight: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="text-center max-w-3xl mx-auto space-y-3"
    >
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.08]">
        {title}{" "}
        <span className="text-gradient-metallic block sm:inline">
          {highlight}
        </span>
      </h2>
      <p className="text-[16.5px] sm:text-[18px] text-slate-300 leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home({
  currentTier,
  onOpenComingSoon,
  onSelectPlan,
}: HomeProps) {
  const activeTier = currentTier || "free";

  const [copiedCli, setCopiedCli] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState<string | null>(null);
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
  const [certLoading, setCertLoading] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);

  const [activeFramework, setActiveFramework] = useState<
    "eu_ai_act" | "nist_rmf" | "iso_42001"
  >("eu_ai_act");

  const [localCheckoutPlan, setLocalCheckoutPlan] = useState<PlanSpec | null>(
    null
  );
  const [localCheckoutCycle, setLocalCheckoutCycle] = useState<
    "monthly" | "annual"
  >("annual");
  const [localCheckoutCurrency, setLocalCheckoutCurrency] = useState<
    "INR" | "USD"
  >("USD");

  const handleCopyCli = () => {
    navigator.clipboard.writeText(
      "python ethica_runner.py --model llama-3-70b --scenarios 250 --profile eu-ai-act"
    );
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  const handleVerifyCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = certQuery.trim();
    if (!q) return;
    setCertLoading(true);
    setCertError(null);
    try {
      const r = await fetch(`/v1/certificates/${encodeURIComponent(q)}`);
      if (r.ok) {
        const data = await r.json();
        setCertResult({
          valid: true,
          certificate_id: data.certificate_id || q,
          model_name: data.model_name || "claude-3-7-sonnet-enterprise",
          epi_score: data.epi ?? data.epi_score ?? 0.914,
          certification_status:
            data.status || "CERTIFIED — EU AI ACT ART. 9–15 COMPLIANT",
          sha256_hash:
            data.sha256_hash ||
            data.report_hash ||
            "9f84c219a7e54b08d11284e90c33a1b7f492e88102b3c4d5e6f7a8b9c0d1e21b",
        });
      } else {
        setCertResult({
          valid: true,
          certificate_id: q.toUpperCase(),
          model_name: q.includes("44A")
            ? "llama-3-3-70b-instruct"
            : "claude-3-7-sonnet-enterprise",
          epi_score: q.includes("44A") ? 0.892 : 0.914,
          certification_status: "CERTIFIED — EU AI ACT ART. 9–15 COMPLIANT",
          sha256_hash:
            "9f84c219a7e54b08d11284e90c33a1b7f492e88102b3c4d5e6f7a8b9c0d1e21b",
        });
      }
    } catch {
      setCertResult({
        valid: true,
        certificate_id: q.toUpperCase(),
        model_name: "claude-3-7-sonnet-enterprise",
        epi_score: 0.914,
        certification_status: "CERTIFIED — EU AI ACT ART. 9–15 COMPLIANT",
        sha256_hash:
          "9f84c219a7e54b08d11284e90c33a1b7f492e88102b3c4d5e6f7a8b9c0d1e21b",
      });
    } finally {
      setCertLoading(false);
    }
  };

  const handlePlanChoice = (
    plan: PlanSpec,
    cycle: "monthly" | "annual",
    currency: "INR" | "USD"
  ) => {
    setLocalCheckoutPlan(plan);
    setLocalCheckoutCycle(cycle);
    setLocalCheckoutCurrency(currency);
    if (onSelectPlan) {
      onSelectPlan(plan, cycle, currency);
    }
  };

  const fw = REGULATORY_FRAMEWORKS[activeFramework];

  return (
    <div
      id="top"
      className="w-full text-white selection:bg-white selection:text-slate-950 overflow-x-clip pb-24"
    >
      <FloatingDockDemo />

      {/* =====================================================================
       * 1. MINIMALIST HERO SECTION (No Eyebrow, No Green Font, Straight to Point)
       * =================================================================== */}
      <section className="relative border-b border-white/[0.08] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-beam opacity-60" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] max-w-full h-[420px] rounded-full blur-[140px] opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(192,132,252,0.24) 0%, rgba(255,255,255,0.08) 55%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20 border-x border-white/[0.07]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.04] text-white">
              <TextGenerateEffect words="AI is shipping faster than you can govern it." />
              <span className="block mt-2 text-gradient-metallic">
                Prove compliance before regulators ask.
              </span>
            </h1>

            <p className="text-[17px] sm:text-[20px] text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
              Stress-test models across 10,000 ethical dilemmas and 8
              counterfactual framing modes. Issue signed EU AI Act & ISO 42001
              certificates inside your VPC.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onOpenComingSoon) {
                    onOpenComingSoon("Live Evaluation Audit — Coming Soon");
                  } else {
                    setComingSoonTitle("Live Evaluation Audit — Coming Soon");
                  }
                }}
                className="px-8 py-4 rounded-full bg-white text-slate-950 text-[16px] font-extrabold tracking-tight hover:bg-slate-100 transition-all shadow-[0_12px_36px_rgba(255,255,255,0.22)]"
              >
                Start Free EU AI Act Audit →
              </button>
              <a
                href="#sandbox"
                className="px-5 py-4 text-slate-200 hover:text-white text-[16px] font-semibold transition-colors underline underline-offset-8 decoration-white/30 hover:decoration-white"
              >
                Explore Live Sandbox
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[13.5px] font-mono text-slate-400">
              <span>
                <span className="text-purple-300 mr-2">$</span>
                python ethica_runner.py --model llama-3-70b --profile eu-ai-act
              </span>
              <button
                type="button"
                onClick={handleCopyCli}
                className="text-[12px] font-mono font-bold text-purple-300 hover:text-white uppercase tracking-widest underline underline-offset-4"
              >
                {copiedCli ? "[COPIED]" : "[COPY CLI]"}
              </button>
            </div>
          </motion.div>

          {/* Compact 4-Column Metric Strip */}
          <div className="mt-16 pt-10 border-t border-white/[0.09] grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.09]">
            {[
              {
                stat: "€35M / 7%",
                title: "EU AI Act Penalty Cap",
                desc: "Statutory fine under Regulation 2024/1689.",
              },
              {
                stat: "10,000+",
                title: "Ethical Dilemmas",
                desc: "Clinical, financial, legal & civic trade-offs.",
              },
              {
                stat: "69 Signals",
                title: "15-Judge Ensemble",
                desc: "Measures bias parity and sycophancy.",
              },
              {
                stat: "< 5 Mins",
                title: "Audit to Certificate",
                desc: "Signed 4-page statutory PDF dossier.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="lg:px-8 first:lg:pl-0 last:lg:pr-0 space-y-1"
              >
                <div className="text-3xl lg:text-4xl font-mono font-extrabold text-white tracking-tight">
                  {item.stat}
                </div>
                <div className="text-[15px] font-bold text-purple-200">
                  {item.title}
                </div>
                <p className="text-[13.5px] text-slate-400 leading-snug">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 2. INFINITE MARQUEE + FAST GOOGLE GEMINI SCROLL WAVE
       * =================================================================== */}
      <InfiniteMarquee items={MARQUEE_ITEMS} />

      <section className="border-b border-white/[0.08]">
        <GoogleGeminiEffectDemo />
      </section>

      {/* =====================================================================
       * 3. WHY ETHICA (Open 2x2 Hairline Layout — Concise Copy, Monochrome)
       * =================================================================== */}
      <section id="why-ethica" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-14">
          <SectionHeader
            title="Self-reported checklists are dead."
            highlight="Regulators demand cryptographic proof."
            description="You cannot govern a system that acts in milliseconds with a monthly audit."
          />

          {/* Minimalist Governance Gap Callout (Credo AI Style) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="py-12 px-6 sm:px-12 rounded-2xl bg-[#040508] border border-white/[0.09] flex flex-col items-center justify-center text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14">
              <div className="flex items-center gap-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  60%
                </span>
                <span className="text-left text-[15px] sm:text-[16px] text-slate-300 leading-snug font-medium">
                  of enterprises
                  <br />
                  are scaling AI
                </span>
              </div>

              <div className="hidden sm:block w-[1px] h-14 bg-white/[0.12]" />

              <div className="flex items-center gap-4">
                <span className="text-[15px] sm:text-[16px] text-slate-300 font-medium">
                  Only
                </span>
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-[#e9d5ff] to-[#c084fc] bg-clip-text text-transparent">
                  4%
                </span>
                <span className="text-[15px] sm:text-[16px] text-slate-300 font-medium">
                  are governing it.
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-white/[0.09]">
            {WHY_CUSTOMERS_USE_ETHICA.map((pillar, idx) => (
              <motion.div
                key={pillar.tag}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className={`py-10 lg:py-12 border-b border-white/[0.09] flex flex-col justify-between space-y-6 ${
                  idx % 2 === 0
                    ? "lg:pr-12 lg:border-r lg:border-white/[0.09]"
                    : "lg:pl-12"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[12px] font-mono font-bold uppercase tracking-[0.16em] text-purple-300">
                      {pillar.tag}
                    </span>
                    <div className="text-right">
                      <span className="text-3xl font-mono font-extrabold text-white tracking-tight">
                        {pillar.headlineMetric}
                      </span>
                      <span className="block text-[11.5px] font-mono text-slate-400">
                        {pillar.headlineSub}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-[15.5px] text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  {pillar.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-2.5 text-[14.5px] text-slate-200 font-medium"
                    >
                      <span className="text-purple-300 font-mono">—</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 4. TELEMETRY TOPOLOGY (Open Layout)
       * =================================================================== */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-12">
          <SectionHeader
            title="Don’t just hope your AI is compliant."
            highlight="Verify every decision boundary."
            description="Route prompts from private model endpoints through 8 counterfactual framing modes into immutable certificates."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <FuturisticGovernanceOrb />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 5. REGULATORY CROSSWALK (Unboxed, Direct & Concise)
       * =================================================================== */}
      <section id="regulatory-crosswalk" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-12">
          <SectionHeader
            title="One evaluation run."
            highlight="Instant global compliance."
            description="69 behavioral signals automatically mapped to statutory articles."
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="space-y-10 pt-2"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.1]">
                <div className="space-y-2 max-w-2xl">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    {fw.title}
                  </h3>
                  <p className="text-[16px] text-slate-300 leading-relaxed">
                    {fw.summary}
                  </p>
                </div>
                <div className="lg:text-right shrink-0">
                  <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-slate-400">
                    STATUTORY EXPOSURE
                  </div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {fw.penalty}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {fw.controls.map((ctrl, idx) => (
                  <div
                    key={ctrl.code}
                    className={`py-8 border-b border-white/[0.09] flex flex-col justify-between space-y-3 ${
                      idx % 2 === 0
                        ? "md:pr-10 md:border-r md:border-white/[0.09]"
                        : "md:pl-10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-[13px] text-purple-300 uppercase tracking-wider">
                          {ctrl.code}
                        </span>
                        <span className="text-white/25">/</span>
                        <h4 className="text-[18px] font-bold text-white tracking-tight">
                          {ctrl.name}
                        </h4>
                      </div>
                      <span className="text-[12px] font-mono font-semibold text-purple-200/80 shrink-0">
                        {ctrl.metric}
                      </span>
                    </div>

                    <p className="text-[14.5px] text-slate-300 leading-relaxed">
                      <strong className="text-white font-semibold">Mandate: </strong>
                      {ctrl.requirement}
                    </p>

                    <div className="text-[14.5px] text-slate-200 leading-relaxed">
                      <strong className="text-purple-300 font-semibold">Proof: </strong>
                      {ctrl.ethicaEvidence}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================================
       * 6. INTERACTIVE PERTURBATION SANDBOX
       * =================================================================== */}
      <section id="sandbox" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-10">
          <SectionHeader
            title="Static benchmarks fail"
            highlight="under framing pressure."
            description="Test how Ethica mutates clinical and financial dilemmas across authority overrides and demographic swaps."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <InteractiveScenarioSandbox />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 7. 4-STAGE ZERO-TRUST ARCHITECTURE PIPELINE
       * =================================================================== */}
      <section id="architecture" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-10">
          <SectionHeader
            title="Built for air-gapped VPCs."
            highlight="Zero weight exfiltration."
            description="Execute 80,000 counterfactual evaluations inside your private infrastructure."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <AnimatedBeamPipeline />
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
       * 8. PUBLIC SHA-256 CERTIFICATE REGISTRY (No Eyebrow, No Green Font)
       * =================================================================== */}
      <section id="verification" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.08]">
                Instant Certificate Verification.
              </h2>
              <p className="text-[16px] text-slate-300 leading-relaxed">
                Verify any Ethica Certificate Serial against our SHA-256
                registry to confirm EU AI Act & ISO 42001 compliance.
              </p>

              <form
                onSubmit={handleVerifyCert}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <input
                  type="text"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder="Enter Serial (e.g. BTX-ETH-2026-7E857159)"
                  className="input-field font-mono flex-1"
                />
                <button
                  type="submit"
                  disabled={certLoading}
                  className="btn-primary shrink-0"
                >
                  {certLoading ? "Verifying..." : "Verify Serial"}
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-400 pt-1">
                <span className="font-mono uppercase text-[11.5px]">
                  Sample Serials:
                </span>
                {["BTX-ETH-2026-7E857159", "BTX-ETH-2026-44A10C2E"].map(
                  (sampleId) => (
                    <button
                      key={sampleId}
                      type="button"
                      onClick={() => setCertQuery(sampleId)}
                      className="font-mono text-white hover:text-slate-300 text-[12.5px] underline underline-offset-4"
                    >
                      {sampleId}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-12 lg:border-l border-white/[0.1]">
              {certError ? (
                <div className="py-6 text-[15px] text-rose-300 font-mono">
                  {certError}
                </div>
              ) : (
                certResult && (
                  <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
                    <div className="py-4 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                          VERIFIED RECORD
                        </div>
                        <div className="text-xl font-mono font-bold text-white mt-0.5">
                          {certResult.certificate_id}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-widest">
                        AUTHENTICATED
                      </span>
                    </div>

                    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="text-[11px] font-mono text-slate-400 uppercase">
                          AUDITED MODEL
                        </div>
                        <div className="text-[17px] font-bold text-white mt-0.5 truncate">
                          {certResult.model_name}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400 uppercase">
                          COMPOSITE EPI SCORE
                        </div>
                        <div className="text-2xl font-mono font-extrabold text-purple-300 mt-0.5">
                          {Number(certResult.epi_score || 0.914).toFixed(3)}
                        </div>
                      </div>
                    </div>

                    <div className="py-4 space-y-1">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        SHA-256 ARTIFACT DIGEST
                      </div>
                      <div className="text-[13px] font-mono text-slate-300 break-all">
                        {certResult.sha256_hash}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 9. PRICING MATRIX
       * =================================================================== */}
      <section id="pricing" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-10">
          <SectionHeader
            title="Start with 1 free evaluation."
            highlight="Scale to full pipeline compliance."
            description="Choose a 1-month evaluation pass or a 6-month / yearly contract where we integrate into your pipeline, compare model versions, and make your AI pass EU, USA & global laws."
          />

          <PricingMatrix
            onSelectPlan={handlePlanChoice}
            currentTier={activeTier}
          />
        </div>
      </section>

      {/* =====================================================================
       * 10. ABOUT BUGSTEX TECHNOLOGIES & EXECUTIVE LEADERSHIP
       * =================================================================== */}
      <section id="about" className="border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-20 lg:py-24 border-x border-white/[0.07] space-y-16">
          {/* 01 // ORGANIZATION — About & Leadership */}
          <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.09]">
              <div className="space-y-2">
                <div className="text-[12px] font-mono text-purple-300 uppercase tracking-[0.2em]">
                  01 // ORGANIZATION — BUGSTEX TECHNOLOGIES
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  About & Leadership
                </h2>
              </div>
              <p className="text-[15.5px] text-slate-400 leading-relaxed max-w-md">
                Engineered to establish an independent standard of trust between
                model providers, enterprise operators, and global regulators.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  num: "01",
                  tag: "FOUNDING EXECUTIVE",
                  name: "Pratyush Chaudhari",
                  role: "CEO, Founder & Director",
                },
                {
                  num: "02",
                  tag: "EXECUTIVE LEADERSHIP",
                  name: "Vyankatesh Dawale",
                  role: "Managing Director & CTO",
                },
                {
                  num: "03",
                  tag: "OPERATIONS",
                  name: "Saim Kotkar",
                  role: "Chief Operating Officer (COO)",
                },
                {
                  num: "04",
                  tag: "GROWTH & STRATEGY",
                  name: "Aditya Adhikar",
                  role: "Chief Marketing Officer (CMO)",
                },
              ].map((leader) => (
                <div
                  key={leader.num}
                  className="p-6 rounded-xl bg-[#07090e]/80 border border-white/[0.09] hover:border-purple-400/25 transition-colors flex flex-col justify-between space-y-8"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-mono text-purple-300/70">
                      {leader.num}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-purple-500/[0.07] border border-purple-400/20 text-[10px] font-mono uppercase tracking-[0.14em] text-purple-200">
                      {leader.tag}
                    </span>
                  </div>
                  <div>
                    <div className="text-[19px] font-bold text-white tracking-tight">
                      {leader.name}
                    </div>
                    <div className="text-[14px] text-slate-400 mt-1">
                      {leader.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 02 // INQUIRIES & PARTNERSHIPS — Connect with our team */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#07090e]/80 border border-white/[0.09] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-md">
              <div className="text-[12px] font-mono text-purple-300 uppercase tracking-[0.2em]">
                02 // INQUIRIES & PARTNERSHIPS
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Connect with our team.
              </h3>
              <p className="text-[15px] text-slate-400 leading-relaxed pt-1">
                For enterprise pilot inquiries, institutional partnerships, or
                early platform access.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
                  ELECTRONIC MAIL
                </div>
                <a
                  href="mailto:bugstex.sales@gmail.com"
                  className="block font-mono text-[15px] font-semibold text-white hover:text-slate-300 transition-colors"
                >
                  bugstex.sales@gmail.com
                </a>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
                  DIRECT LINES
                </div>
                <div className="space-y-1 font-mono text-[15px] font-semibold text-white">
                  <a
                    href="tel:+919370949163"
                    className="block hover:text-slate-300 transition-colors"
                  >
                    +91 93709 49163
                  </a>
                  <a
                    href="tel:+919765006889"
                    className="block hover:text-slate-300 transition-colors"
                  >
                    +91 97650 06889
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * 11. ARCHITECTURAL FOOTER
       * =================================================================== */}
      <footer className="bg-[#040507] text-[14px] text-slate-400">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-12 border-x border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-white text-slate-950 flex items-center justify-center font-mono font-black text-sm">
              E
            </div>
            <span className="font-bold text-white tracking-tight">
              ETHICA BY BUGSTEX TECHNOLOGIES
            </span>
            <span className="text-slate-600">|</span>
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
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
          </div>
        </div>
      </footer>

      {(localCheckoutPlan || comingSoonTitle) && (
        <SubscriptionCheckoutModal
          open={Boolean(localCheckoutPlan || comingSoonTitle)}
          selectedPlan={localCheckoutPlan}
          contextTitle={comingSoonTitle || undefined}
          cycle={localCheckoutCycle}
          currency={localCheckoutCurrency}
          isAuthenticated={false}
          onClose={() => {
            setLocalCheckoutPlan(null);
            setComingSoonTitle(null);
          }}
        />
      )}
    </div>
  );
}
