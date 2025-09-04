import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer id="contact" className="bg-text-hero text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold mb-4">FnW</div>
            <p className="text-gray-300 mb-6 max-w-md">
              تمكين الفرق عن بُعد بأدوات التعاون القوية وحلول الإدارة المتقدمة لبيئة العمل الحديثة.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <Input 
                placeholder="أدخل بريدك الإلكتروني" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
              />
              <Button variant="secondary">
                اشترك
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">المميزات</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">التعاون الجماعي</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تتبع الوقت</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تحليلات التقدم</a></li>
              <li><a href="#" className="hover:text-white transition-colors">إدارة المهام</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">الشركة</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-white transition-colors">من نحن</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
              <li><a href="#" className="hover:text-white transition-colors">المدونة</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            © 2024 FnW. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-reverse space-x-6 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;