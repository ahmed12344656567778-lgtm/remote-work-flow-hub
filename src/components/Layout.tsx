import { NavLink, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Calendar, 
  FileText, 
  BarChart3, 
  Users,
  MessageSquare,
  Menu,
  X,
  Home,
  Settings,
  User,
  Shield,
  Activity,
  Bell,
  Check,
  Trash2,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  time: string;
}

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "مهمة جديدة", message: "تم تعيين مهمة جديدة لك", type: "info", read: false, time: "منذ 5 دقائق" },
    { id: 2, title: "تم إكمال المشروع", message: "تم إكمال مشروع التصميم بنجاح", type: "success", read: false, time: "منذ ساعة" },
    { id: 3, title: "تنبيه موعد", message: "اجتماع الفريق بعد 30 دقيقة", type: "warning", read: false, time: "منذ ساعتين" },
    { id: 4, title: "رسالة جديدة", message: "لديك رسالة جديدة من أحمد", type: "info", read: true, time: "منذ 3 ساعات" },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const navigation = [
    { name: "الصفحة الرئيسية", href: "/", icon: Home },
    { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
    { name: "المشاريع", href: "/projects", icon: FolderOpen },
    { name: "المهام", href: "/tasks", icon: CheckSquare },
    { name: "التقويم", href: "/calendar", icon: Calendar },
    { name: "الملفات", href: "/files", icon: FileText },
    { name: "التقارير", href: "/reports", icon: BarChart3 },
    { name: "المستخدمين", href: "/users", icon: Users },
    { name: "الفريق", href: "/team", icon: Users },
    { name: "المحادثات", href: "/chat", icon: MessageSquare },
    { name: "الإشعارات", href: "/notifications", icon: Bell },
    { name: "الملف الشخصي", href: "/profile", icon: User },
    { name: "الإعدادات", href: "/settings", icon: Settings },
    { name: "الأدوار والصلاحيات", href: "/roles", icon: Shield },
    { name: "سجل الأنشطة", href: "/logs", icon: Activity },
  ];

  return (
    <div className="h-screen bg-background flex overflow-hidden" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header - Fixed */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border flex-shrink-0">
          <h1 className="text-xl font-bold text-primary">إدارة العمل</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Sidebar Navigation - Scrollable */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="ml-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed */}
        <header className="bg-card shadow-sm border-b border-border h-16 flex-shrink-0">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              
              <div className="text-sm text-muted-foreground hidden md:block">
                مرحباً بك في نظام إدارة العمل عن بُعد
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -left-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-96 p-0" dir="rtl">
                  <SheetHeader className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SheetTitle className="text-lg font-semibold">الإشعارات</SheetTitle>
                        {unreadCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {unreadCount} جديد
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead} 
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          تعليم الكل كمقروء
                        </Button>
                      )}
                      {notifications.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={deleteAllNotifications} 
                          className="text-xs text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3 ml-1" />
                          حذف الكل
                        </Button>
                      )}
                    </div>
                  </SheetHeader>
                  
                  <ScrollArea className="h-[calc(100vh-180px)]">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>لا توجد إشعارات</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 transition-colors ${
                              !notification.read ? 'bg-accent/30' : 'bg-background'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className={`text-sm font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => markAsRead(notification.id)}
                                    title="تعليم كمقروء"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => deleteNotification(notification.id)}
                                  title="حذف"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:text-primary"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate("/notifications");
                      }}
                    >
                      عرض جميع الإشعارات
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page content - Scrollable */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;