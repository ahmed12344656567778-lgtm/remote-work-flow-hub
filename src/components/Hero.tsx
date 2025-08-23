import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text-hero mb-6 leading-tight">
              Manage Your Remote Team Effectively
            </h1>
            <p className="text-lg lg:text-xl text-text-muted mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              System Helps You Streamline Communication, Track Progress, and 
              Ensure Everyone Stays Aligned, No Matter Where They are.
            </p>
            <Button size="lg" className="shadow-button text-lg px-8 py-4">
              Get Started
            </Button>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Remote work management dashboard"
                className="w-full h-auto rounded-lg shadow-medium"
              />
            </div>
            <div className="absolute inset-0 bg-hero-gradient rounded-lg opacity-10 transform translate-x-4 translate-y-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;