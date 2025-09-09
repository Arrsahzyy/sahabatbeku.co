import Hero from "@/components/Hero";
import PainSolution from "@/components/PainSolution";
import MainBenefits from "@/components/MainBenefits";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PainSolution />
      <MainBenefits />
      <Features />
      <HowItWorks />
      <DemoSection />
    </div>
  );
};

export default Index;
