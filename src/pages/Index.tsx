import HeroSection from "@/components/HeroSection";
import DetectionModules from "@/components/DetectionModules";
import TextScanner from "@/components/TextScanner";
import ArchitectureSection from "@/components/ArchitectureSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DetectionModules />
      <TextScanner />
      <ArchitectureSection />
      <Footer />
    </main>
  );
};

export default Index;
