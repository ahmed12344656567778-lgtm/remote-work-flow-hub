import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, BellRing, CheckCircle, AlertCircle, MessageSquare, Calendar, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "مهمة جديدة مُعيّنة لك",
      message: "تم تعيين مهمة 'مراجعة التقرير الشهري' من قبل أحمد محمد",
      type: "task",
      time: "منذ 5 دقائق",
      read: false,
      icon: CheckCircle
    },
    {
      id: 2,
      title: "اجتماع قادم",
      message: "اجتماع الفريق الأسبوعي يبدأ خلال 15 دقيقة",
      type: "meeting",
      time: "منذ 10 دقائق",
      read: false,
      icon: Calendar
    },
    {
      id: 3,
      title: "رسالة جديدة",
      message: "رسالة جديدة من سارة أحمد في مجموعة المشروع الأساسي",
      type: "message",
      time: "منذ 20 دقيقة",
      read: true,
      icon: MessageSquare
    },
    {
      id: 4,
      title: "تحديث في المشروع",
      message: "تم تحديث حالة المشروع إلى 'قيد المراجعة'",
      type: "update",
      time: "منذ ساعة",
      read: true,
      icon: AlertCircle
    },
    {
      id: 5,
      title: "عضو جديد في الفريق",
      message: "انضم محمد سالم إلى فريق التطوير",
      type: "team",
      time: "منذ ساعتين",
      read: true,
      icon: Users
    }
  ]);

  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
    tasks: true,
    meetings: true,
    messages: true,
    updates: false
  });

  const { toast } = useToast();

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "تم تحديث الإشعارات",
      description: "تم وضع علامة 'مقروء' على جميع الإشعارات",
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      task: "bg-blue-100 text-blue-700",
      meeting: "bg-green-100 text-green-700",
      message: "bg-purple-100 text-purple-700",
      update: "bg-orange-100 text-orange-700",
      team: "bg-pink-100 text-pink-700"
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      task: "مهمة",
      meeting: "اجتماع",
      message: "رسالة",
      update: "تحديث",
      team: "فريق"
    };
    return labels[type as keyof typeof labels] || "عام";
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <section className="py-20 bg-feature-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-hero mb-6">
            نظام الإشعارات الذكي
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            ابقَ على اطلاع دائم بأهم التحديثات والمهام في فريقك مع نظام إشعارات متقدم وقابل للتخصيص.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Notifications List */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-text-hero">
                    <BellRing className="w-6 h-6 text-primary" />
                    الإشعارات
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {unreadCount}
                      </Badge>
                    )}
                  </CardTitle>
                  <Button 
                    onClick={markAllAsRead} 
                    variant="outline" 
                    size="sm"
                    disabled={unreadCount === 0}
                  >
                    وضع علامة مقروء للكل
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => {
                  const NotificationIcon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        notification.read 
                          ? 'bg-muted/50 border-border' 
                          : 'bg-card border-primary/20 shadow-sm'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <NotificationIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold text-sm ${
                              notification.read ? 'text-text-muted' : 'text-text-hero'
                            }`}>
                              {notification.title}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getTypeColor(notification.type)}`}
                            >
                              {getTypeLabel(notification.type)}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                          <p className={`text-xs mb-2 ${
                            notification.read ? 'text-text-muted' : 'text-text-muted'
                          }`}>
                            {notification.message}
                          </p>
                          <span className="text-xs text-text-muted">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <Card className="border-2 border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-text-hero">
                  <Settings className="w-6 h-6 text-primary" />
                  إعدادات الإشعارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-hero mb-4">طرق التنبيه:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">البريد الإلكتروني</span>
                      <Switch 
                        checked={settings.email}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, email: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">إشعارات فورية</span>
                      <Switch 
                        checked={settings.push}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, push: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">رسائل نصية</span>
                      <Switch 
                        checked={settings.sms}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, sms: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-hero mb-4">أنواع الإشعارات:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">المهام الجديدة</span>
                      <Switch 
                        checked={settings.tasks}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, tasks: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">الاجتماعات</span>
                      <Switch 
                        checked={settings.meetings}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, meetings: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">الرسائل</span>
                      <Switch 
                        checked={settings.messages}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, messages: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">تحديثات المشروع</span>
                      <Switch 
                        checked={settings.updates}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({ ...prev, updates: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2 border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-text-hero">
                  <Bell className="w-6 h-6 text-primary" />
                  إحصائيات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">غير مقروءة:</span>
                  <Badge variant="destructive">{unreadCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">اليوم:</span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">هذا الأسبوع:</span>
                  <Badge variant="secondary">24</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationSystem;