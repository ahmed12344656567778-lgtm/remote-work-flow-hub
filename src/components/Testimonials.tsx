import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp",
      content: "FnW has revolutionized how we manage our remote team. The communication tools and progress tracking features have increased our productivity by 40%.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "CTO",
      company: "StartupX",
      content: "The seamless integration and user-friendly interface made the transition to remote work effortless. Our team collaboration has never been better.",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "Team Lead",
      company: "GlobalTech",
      content: "Outstanding platform for remote team management. The analytics and reporting features provide valuable insights into team performance.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-feature-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-hero mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Join thousands of teams worldwide who trust FnW to manage 
            their remote operations successfully.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-shadow bg-card">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-text-muted mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-text-hero">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-text-muted">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;