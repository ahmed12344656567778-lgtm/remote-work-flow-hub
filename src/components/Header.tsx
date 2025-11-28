import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
          
          <Button 
            variant="default" 
            size="default" 
            className="shadow-button"
            onClick={() => navigate("/auth")}
          >
            تسجيل الدخول
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;