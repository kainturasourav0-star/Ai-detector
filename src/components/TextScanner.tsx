import { useState } from "react";
import { Shield, AlertTriangle, ShieldAlert, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeText, type ScanResult } from "@/lib/scam-engine";
import ScrollReveal from "@/components/ScrollReveal";

const EXAMPLES = [
  {
    label: "Lottery Scam",
    text: "CONGRATULATIONS! You won the $1,000,000 lottery! Click here to claim NOW: http://claim-prize-now.xyz. Act fast — this offer expires today!",
  },
  {
    label: "Voice Phishing",
    text: "This is the IRS. Your social security number has been suspended due to suspicious activity. Call us immediately to verify your identity or face legal action.",
  },
  {
    label: "Safe Message",
    text: "Hey, are we still on for dinner tomorrow? Let me know if 7pm works for you.",
  },
];

function getRiskColor(label: ScanResult["label"]) {
  switch (label) {
    case "Safe": return "text-safe";
    case "Low Risk": return "text-safe";
    case "Medium Risk": return "text-warning";
    case "High Risk": return "text-danger";
    case "Scam Blocked": return "text-danger";
  }
}

function getRiskBg(label: ScanResult["label"]) {
  switch (label) {
    case "Safe": return "bg-safe/10 border-safe/30";
    case "Low Risk": return "bg-safe/10 border-safe/30";
    case "Medium Risk": return "bg-warning/10 border-warning/30";
    case "High Risk": return "bg-danger/10 border-danger/30";
    case "Scam Blocked": return "bg-danger/10 border-danger/30";
  }
}

function getRiskIcon(label: ScanResult["label"]) {
  switch (label) {
    case "Safe": return ShieldCheck;
    case "Low Risk": return ShieldCheck;
    case "Medium Risk": return AlertTriangle;
    case "High Risk": return ShieldAlert;
    case "Scam Blocked": return ShieldX;
  }
}

function getMeterColor(score: number) {
  if (score < 35) return "bg-safe";
  if (score < 60) return "bg-warning";
  return "bg-danger";
}

const TextScanner = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!input.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeText(input));
      setScanning(false);
    }, 1200);
  };

  const loadExample = (text: string) => {
    setInput(text);
    setResult(null);
  };

  const Icon = result ? getRiskIcon(result.label) : Shield;

  return (
    <section id="scanner" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
              Live Text <span className="text-primary text-glow">Scanner</span>
            </h2>
            <p className="text-muted-foreground">
              Paste any suspicious message below. The NLP engine analyzes intent, urgency, and threat patterns.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-muted-foreground font-display pt-1.5">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => loadExample(ex.text)}
                className="text-xs px-3 py-1.5 rounded-md border border-border bg-secondary/50 text-secondary-foreground hover:border-primary/40 hover:text-primary transition-colors font-display"
              >
                {ex.label}
              </button>
            ))}
          </div>

          <div className="relative rounded-xl border border-border bg-card overflow-hidden">
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setResult(null); }}
              placeholder="Paste a suspicious message here..."
              rows={5}
              className="w-full bg-transparent p-5 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none font-body text-sm"
            />
            <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/20">
              <span className="text-xs text-muted-foreground font-display">
                {input.length} characters
              </span>
              <button
                onClick={handleScan}
                disabled={!input.trim() || scanning}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-sm disabled:opacity-40 hover:box-glow transition-shadow duration-300"
              >
                {scanning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                {scanning ? "Scanning..." : "Analyze"}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-display text-muted-foreground">Risk Assessment</span>
                  <div className={`flex items-center gap-2 ${getRiskColor(result.label)}`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-display font-bold">{result.label}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.riskScore}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full ${getMeterColor(result.riskScore)}`}
                  />
                </div>
                <div className="flex justify-between text-xs font-display text-muted-foreground">
                  <span>0%</span>
                  <span className={getRiskColor(result.label)}>{result.riskScore}%</span>
                  <span>100%</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className={`rounded-xl border p-5 ${getRiskBg(result.label)}`}
              >
                <p className="text-sm text-foreground font-body">{result.details}</p>
              </motion.div>

              {result.flags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <h4 className="text-sm font-display font-bold text-foreground mb-3">Threat Indicators</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.flags.map((flag, i) => (
                      <motion.span
                        key={flag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                        className="text-xs px-3 py-1 rounded-full border border-danger/30 bg-danger/10 text-danger font-display"
                      >
                        {flag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TextScanner;
