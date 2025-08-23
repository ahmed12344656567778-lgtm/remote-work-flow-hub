import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users2, Zap } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Building2,
      title: "Enterprise Solutions",
      description: "Scalable solutions for large organizations with advanced security, compliance, and custom integrations.",
      features: ["Custom integrations", "Advanced security", "Dedicated support", "Compliance tools"]
    },
    {
      icon: Users2,
      title: "Small Teams",
      description: "Perfect for startups and small teams looking to improve remote collaboration and productivity.",
      features: ["Easy setup", "Core features", "Team chat", "Basic analytics"]
    },
    {
      icon: Zap,
      title: "Growing Companies",
      description: "Advanced features for mid-sized companies scaling their remote operations and team management.",
      features: ["Advanced analytics", "Workflow automation", "API access", "Priority support"]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-hero mb-6">
            Solutions for Every Team Size
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Whether you're a startup or enterprise, we have the right solution 
            to help your remote team succeed and grow.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-2 border-border hover:border-primary/20 transition-colors shadow-soft hover:shadow-medium">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <solution.icon className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-text-hero mb-4">
                  {solution.title}
                </h3>
                <p className="text-text-muted mb-6 leading-relaxed">
                  {solution.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-text-muted text-sm">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="shadow-button">
            Start Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Solutions;