import { useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import Home from "./pages/Home";
import {
  SubscriptionCheckoutModal,
  type PlanSpec,
} from "./components/aceternity";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="wordmark" aria-label="Ethica home">
      Ethica
    </button>
  );
}

export default function App() {
  const [checkoutPlan, setCheckoutPlan] = useState<PlanSpec | null>(null);
  const [checkoutCycle, setCheckoutCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [checkoutCurrency, setCheckoutCurrency] = useState<"INR" | "USD">(
    "INR"
  );
  const [comingSoonTitle, setComingSoonTitle] = useState<string | null>(null);

  return (
    <div className="app-shell min-h-screen text-white">
      <div className="app-shell__aurora app-shell__aurora--one" />
      <div className="app-shell__aurora app-shell__aurora--two" />
      <div className="app-shell__spotlight" />
      <div className="app-shell__grid" />

      {/* Sticky Translucent Glass Public Header */}
      <header className="global-nav">
        <div className="global-nav__inner">
          <div className="flex items-baseline gap-3">
            <Wordmark
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
              by Bugstex Technologies
            </span>
          </div>

          <div className="global-nav__actions">
            <button
              type="button"
              onClick={() =>
                setComingSoonTitle("Live Demo Console — Coming Soon")
              }
              className="hidden xl:inline-flex items-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.05] px-4 py-2.5 font-mono text-[13px] font-semibold text-slate-100 hover:border-white/[0.3] hover:text-white"
            >
              <Terminal className="w-4 h-4" />
              Live Demo Console
            </button>

            <button
              type="button"
              onClick={() =>
                setComingSoonTitle("Account Sign In — Coming Soon")
              }
              className="rounded-xl border border-white/[0.16] bg-white/[0.05] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-white/[0.1]"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() =>
                setComingSoonTitle("Account Sign Up — Coming Soon")
              }
              className="global-nav__new inline-flex"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="marketing-main">
        <Home
          go={() => setComingSoonTitle("Workspace Access — Coming Soon")}
          isPublic={true}
          onOpenAuth={(mode) =>
            setComingSoonTitle(
              mode === "login"
                ? "Account Sign In — Coming Soon"
                : "Account Sign Up — Coming Soon"
            )
          }
          onOpenComingSoon={(title) =>
            setComingSoonTitle(title || "Live Evaluation — Coming Soon")
          }
          onSelectPlan={(plan, cycle, currency) => {
            setCheckoutPlan(plan);
            setCheckoutCycle(cycle);
            setCheckoutCurrency(currency);
          }}
        />
      </main>

      <SubscriptionCheckoutModal
        open={Boolean(checkoutPlan || comingSoonTitle)}
        onClose={() => {
          setCheckoutPlan(null);
          setComingSoonTitle(null);
        }}
        selectedPlan={checkoutPlan}
        contextTitle={comingSoonTitle || undefined}
        cycle={checkoutCycle}
        currency={checkoutCurrency}
        isAuthenticated={false}
      />
    </div>
  );
}
