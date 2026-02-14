import { Eye, AudioLines, FileText, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const modules = [
  {
    icon: Eye,
    title: "Video Guard",
    subtitle: "Deepfake Detection",
    model: "Vision Transformer + MesoNet",
    tells: [
      "Inconsistent eye reflections",
      "Unnatural blink frequency",
      "Edge ghosting at face boundaries",
      "Lighting mismatch analysis",
    ],
    accuracy: 96.2,
  },
  {
    icon: AudioLines,
    title: "Voice Guard",
    subtitle: "Clone Detection",
    model: "Wav2Vec 2.0 + MobileNetV2",
    tells: [
      "Missing vocal jitter & shimmer",
      "Robotic frequency consistency",
      "Digital silence patterns",
      "High-freq spectral cutoff",
    ],
    accuracy: 94.8,
  },
  {
    icon: FileText,
    title: "Text Guard",
    subtitle: "Social Engineering",
    model: "Fine-tuned BERT + Heuristics",
    tells: [
      "Urgency & pressure tactics",
      "Authority impersonation",
      "Suspicious URL patterns",
      "Reward-based manipulation",
    ],
    accuracy: 97.5,
  },
];

const DetectionModules = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
              Detection <span className="text-primary text-glow">Modules</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three specialized neural networks working in concert to provide total coverage against AI-generated threats.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <ScrollReveal key={mod.title} delay={i * 0.15}>
              <div className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:box-glow transition-all duration-500 h-full">
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-scan" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <mod.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-1">{mod.title}</h3>
                  <p className="text-sm text-primary font-display mb-4">{mod.subtitle}</p>

                  <div className="text-xs font-display text-muted-foreground bg-secondary/50 rounded px-3 py-1.5 inline-block mb-4">
                    {mod.model}
                  </div>

                  <div className="space-y-2 mb-6">
                    {mod.tells.map((tell) => (
                      <div key={tell} className="flex items-start gap-2 text-sm text-secondary-foreground">
                        <ArrowRight className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                        <span>{tell}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-display mb-1">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-primary">{mod.accuracy}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary risk-meter-fill"
                        style={{ width: `${mod.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetectionModules;
