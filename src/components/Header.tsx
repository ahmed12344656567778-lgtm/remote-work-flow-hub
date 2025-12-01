import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-background border-b border-border shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            FnW
          </div>
          
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              المميزات
            </a>
            <a href="#solutions" className="text-foreground hover:text-primary transition-colors">
              الحلول
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              تواصل معنا
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              من نحن
            </a>
          </div>
          
          <div className="flex items-center space-x-reverse space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -left-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button 
              variant="default" 
              size="default" 
              className="shadow-button"
              onClick={() => navigate("/auth")}
            >
              تسجيل الدخول
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;