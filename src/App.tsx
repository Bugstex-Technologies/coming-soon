import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import { BorderBeamCard } from "./components/aceternity";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="wordmark" aria-label="Ethica home">
      Ethica
    </button>
  );
}

function useSpotlightCursor() {
  useEffect(() => {
    let frame = 0;
    let point = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.18 };
    const updateSpotlight = () => {
      document.documentElement.style.setProperty("--cursor-x", `${point.x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${point.y}px`);
      frame = 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      point = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(updateSpotlight);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

export default function App() {
  useSpotlightCursor();

  const [modalState, setModalState] = useState<{
    open: boolean;
    title: string;
    tier?: string;
  }>({
    open: false,
    title: "Public Evaluation Console — Coming Soon",
  });

  const [orgName, setOrgName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [framework, setFramework] = useState("EU AI Act (Articles 9–15)");
  const [submitted, setSubmitted] = useState(false);

  const openComingSoon = (contextLabel?: string, selectedTier?: string) => {
    setSubmitted(false);
    setModalState({
      open: true,
      title: contextLabel || "Public Evaluation Console — Coming Soon",
      tier: selectedTier,
    });
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="app-shell min-h-screen text-white">
      <div className="app-shell__aurora app-shell__aurora--one" />
      <div className="app-shell__aurora app-shell__aurora--two" />
      <div className="app-shell__spotlight" />
      <div className="app-shell__grid" />

      {/* Sticky Translucent Glass Public Header */}
      <header className="global-nav">
        <div className="global-nav__inner">
          <div className="flex items-center gap-3">
            <Wordmark
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/[0.16] bg-white/[0.05] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PRE-RELEASE PREVIEW
            </span>
          </div>

          <div className="global-nav__actions">
            <button
              type="button"
              onClick={() =>
                openComingSoon("Subscriber Console — Coming Soon")
              }
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.05] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-white/[0.1]"
            >
              <Lock className="w-3.5 h-3.5 text-slate-300" />
              Evaluate (Coming Soon)
            </button>

            <button
              type="button"
              onClick={() => openComingSoon("Priority Early Access", "pro")}
              className="global-nav__new inline-flex"
            >
              Early Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="marketing-main">
        <Home onOpenComingSoon={openComingSoon} />
      </main>

      {/* =====================================================================
       * COMING SOON & PRE-INCORPORATION PRIORITY ACCESS MODAL
       * =================================================================== */}
      <AnimatePresence>
        {modalState.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-xl"
            >
              <BorderBeamCard innerClassName="p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-white/[0.12]">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      EVALUATION ENGINE COMING SOON
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {modalState.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setModalState((prev) => ({ ...prev, open: false }))
                    }
                    className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.14] text-slate-200 hover:text-white"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {submitted ? (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">
                      Priority Enclave Slot Reserved
                    </h4>
                    <p className="text-[16px] text-slate-200 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong className="text-white">{orgName}</strong>.
                      We have registered{" "}
                      <span className="font-mono text-white">{workEmail}</span> for
                      immediate onboarding as soon as Bugstex Technologies completes
                      formal incorporation and activates the live evaluation cluster.
                    </p>
                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() =>
                          setModalState((prev) => ({ ...prev, open: false }))
                        }
                        className="btn-primary px-8 py-3.5"
                      >
                        Return to Landing Page
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.12] text-[15px] text-slate-200 leading-relaxed">
                      <div className="flex items-center gap-2 text-white font-bold mb-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Pre-Incorporation Notice</span>
                      </div>
                      Live model evaluations, automated 4-page Sovereign PDF
                      certificates, and CLI API key provisioning are currently in
                      closed pre-release while{" "}
                      <strong className="text-white">
                        Bugstex Technologies
                      </strong>{" "}
                      finalizes formal incorporation. Reserve your priority
                      workspace slot below to receive instant access on launch day.
                    </div>

                    <div>
                      <label className="label block mb-2">
                        Organization / Startup Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme AI Systems"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="label block mb-2">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="founder@company.com"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="label block mb-2">
                        Primary Compliance Mandate
                      </label>
                      <select
                        value={framework}
                        onChange={(e) => setFramework(e.target.value)}
                        className="input-field bg-[#0b0d14]"
                      >
                        <option value="EU AI Act (Articles 9–15)">
                          EU AI Act (Articles 9–15 High-Risk & GPAI)
                        </option>
                        <option value="ISO/IEC 42001:2023">
                          ISO/IEC 42001:2023 Enterprise Certification
                        </option>
                        <option value="NIST AI RMF 1.0">
                          NIST AI Risk Management Framework 1.0
                        </option>
                      </select>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setModalState((prev) => ({ ...prev, open: false }))
                        }
                        className="btn-secondary"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn-primary">
                        Reserve Priority Access →
                      </button>
                    </div>
                  </form>
                )}
              </BorderBeamCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
