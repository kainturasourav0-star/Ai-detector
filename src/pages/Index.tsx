import HeroSection from "@/components/HeroSection";
import DetectionModules from "@/components/DetectionModules";
import TextScanner from "@/components/TextScanner";
import MediaScanner from "@/components/MediaScanner";
import ArchitectureSection from "@/components/ArchitectureSection";
import Footer from "@/components/Footer";
import SecurityChatbot from "@/components/SecurityChatbot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <DetectionModules />
      <TextScanner />
      <MediaScanner />
      <ArchitectureSection />
      <Footer />
      <SecurityChatbot />
    </main>
  );
};

export default Index;
