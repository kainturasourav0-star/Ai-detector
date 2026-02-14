import { Shield, Cpu, Lock, Wifi } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Multi-Modal Defense",
    desc: "Cross-references video, audio, and text signals for a unified confidence score.",
  },
  {
    icon: Cpu,
    title: "On-Device Inference",
    desc: "INT8 quantized models via ONNX Runtime. Sub-200ms latency, zero cloud dependency.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Privacy",
    desc: "All data processed in local RAM. No telemetry, no uploads, no logs.",
  },
  {
    icon: Wifi,
    title: "Air-Gap Ready",
    desc: "Full protection in airplane mode. No internet required for threat detection.",
  },
];

const ArchitectureSection = () => {
  return (
    <section className="py-24 px-6 gradient-cyber">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground">
            System <span className="text-primary text-glow">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Privacy-first design with on-device inference. Your data never leaves your hardware.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Risk table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-display font-bold text-foreground">Intervention Protocol</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-6 py-3 text-left font-display text-muted-foreground font-medium">Risk Level</th>
                  <th className="px-6 py-3 text-left font-display text-muted-foreground font-medium">Score</th>
                  <th className="px-6 py-3 text-left font-display text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-6 py-3 font-display text-safe">Low</td>
                  <td className="px-6 py-3 text-muted-foreground">&lt; 30%</td>
                  <td className="px-6 py-3 text-secondary-foreground">Background monitoring only</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-6 py-3 font-display text-warning">Medium</td>
                  <td className="px-6 py-3 text-muted-foreground">30% – 70%</td>
                  <td className="px-6 py-3 text-secondary-foreground">Display overlay: "Verify identity via secondary channel"</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-display text-danger">High</td>
                  <td className="px-6 py-3 text-muted-foreground">&gt; 70%</td>
                  <td className="px-6 py-3 text-secondary-foreground">Block / Mute. Show: "AI Scam Detected. Connection Terminated."</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
