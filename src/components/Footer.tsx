import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-foreground">GuardianAI</span>
          <span className="text-xs text-muted-foreground">v1.0</span>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          Privacy-first AI defense. All inference runs locally on your device.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
