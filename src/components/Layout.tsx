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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
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
              <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <PopoverTrigger asChild>
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
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-popover border border-border shadow-lg" align="end" dir="rtl">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">الإشعارات</h3>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                        <Check className="h-3 w-3 ml-1" />
                        تعليم الكل كمقروء
                      </Button>
                    )}
                  </div>
                  <ScrollArea className="h-80">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        لا توجد إشعارات
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-accent/50 transition-colors ${
                              !notification.read ? 'bg-accent/30' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => markAsRead(notification.id)}
                                    title="تعليم كمقروء"
                                  >
                                    <Check className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-destructive hover:text-destructive"
                                  onClick={() => deleteNotification(notification.id)}
                                  title="حذف"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                  <div className="p-3 border-t border-border">
                    <Button
                      variant="ghost"
                      className="w-full text-sm"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate("/notifications");
                      }}
                    >
                      عرض جميع الإشعارات
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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