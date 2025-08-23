import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, BarChart3, MessageSquare, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamlessly collaborate with your remote team members through integrated communication tools and shared workspaces."
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor work hours, productivity, and project timelines with advanced time tracking and reporting features."
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Get detailed insights into team performance, project progress, and productivity metrics with comprehensive analytics."
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Centralize all team communications with chat, video calls, file sharing, and announcement features."
    },
    {
      icon: CheckCircle,
      title: "Task Management",
      description: "Organize, assign, and track tasks with powerful project management tools and workflow automation."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with end-to-end encryption, data protection, and compliance standards."
    }
  ];

  return (
    <section id="features" className="py-20 bg-feature-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-hero mb-6">
            Powerful Features for Remote Teams
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Everything you need to manage your remote team effectively, 
            boost productivity, and maintain seamless collaboration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow bg-card">
              <CardContent className="p-8">
                <div className="mb-4">
                  <feature.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-hero mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;