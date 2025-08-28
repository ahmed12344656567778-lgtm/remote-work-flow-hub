import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Kanban
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "تصميم واجهة المستخدم الرئيسية",
      description: "إنشاء تصميم متجاوب وجذاب للصفحة الرئيسية",
      status: "قيد التنفيذ",
      priority: "عالية",
      assignee: "فاطمة علي",
      project: "تطوير موقع الشركة",
      dueDate: "2024-01-12",
      createdDate: "2024-01-08",
      tags: ["تصميم", "واجهة مستخدم"]
    },
    {
      id: 2,
      title: "اختبار الوحدة للمصادقة",
      description: "كتابة اختبارات الوحدة لنظام تسجيل الدخول",
      status: "مكتملة",
      priority: "متوسطة",
      assignee: "أحمد محمد",
      project: "تطبيق الهاتف المحمول",
      dueDate: "2024-01-10",
      createdDate: "2024-01-05",
      tags: ["اختبار", "برمجة"]
    },
    {
      id: 3,
      title: "إعداد قاعدة البيانات",
      description: "تكوين قاعدة البيانات وإنشاء الجداول الأساسية",
      status: "جديدة",
      priority: "عالية",
      assignee: "محمد خالد",
      project: "نظام إدارة المخزون",
      dueDate: "2024-01-15",
      createdDate: "2024-01-09",
      tags: ["قاعدة بيانات", "إعداد"]
    },
    {
      id: 4,
      title: "مراجعة كود الواجهة الخلفية",
      description: "مراجعة وتحسين كود APIs الخاصة بالنظام",
      status: "متأخرة",
      priority: "عالية",
      assignee: "سارة أحمد",
      project: "تطوير موقع الشركة",
      dueDate: "2024-01-08",
      createdDate: "2024-01-03",
      tags: ["مراجعة", "برمجة"]
    },
    {
      id: 5,
      title: "كتابة التوثيق الفني",
      description: "إعداد دليل المطور والتوثيق التقني للمشروع",
      status: "قيد التنفيذ",
      priority: "منخفضة",
      assignee: "عمر حسن",
      project: "تطبيق الهاتف المحمول",
      dueDate: "2024-01-20",
      createdDate: "2024-01-07",
      tags: ["توثيق", "كتابة"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتملة":
        return "bg-green-100 text-green-800";
      case "قيد التنفيذ":
        return "bg-blue-100 text-blue-800";
      case "متأخرة":
        return "bg-red-100 text-red-800";
      case "جديدة":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية":
        return "bg-red-100 text-red-800";
      case "متوسطة":
        return "bg-yellow-100 text-yellow-800";
      case "منخفضة":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "مكتملة":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "قيد التنفيذ":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "متأخرة":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const tasksByStatus = {
    "جديدة": filteredTasks.filter(task => task.status === "جديدة"),
    "قيد التنفيذ": filteredTasks.filter(task => task.status === "قيد التنفيذ"),
    "مكتملة": filteredTasks.filter(task => task.status === "مكتملة"),
    "متأخرة": filteredTasks.filter(task => task.status === "متأخرة")
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المهام</h1>
          <p className="text-muted-foreground">إدارة وتتبع جميع المهام والأنشطة</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("kanban")}
          >
            <Kanban className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            قائمة
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في المهام..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="تصفية بالحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع المهام</SelectItem>
            <SelectItem value="جديدة">جديدة</SelectItem>
            <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
            <SelectItem value="مكتملة">مكتملة</SelectItem>
            <SelectItem value="متأخرة">متأخرة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{status}</h3>
                <Badge variant="secondary">{tasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <Card key={task.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>تعديل</DropdownMenuItem>
                            <DropdownMenuItem>تعيين</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">حذف</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{task.assignee}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <h3 className="font-semibold text-foreground">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)} variant="outline">
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground">{task.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>موعد التسليم: {task.dueDate}</span>
                      </div>
                      <div>
                        <span>المشروع: {task.project}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>تعديل المهمة</DropdownMenuItem>
                      <DropdownMenuItem>تغيير الحالة</DropdownMenuItem>
                      <DropdownMenuItem>إضافة تعليق</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">لا توجد مهام</h3>
          <p className="mt-2 text-muted-foreground">لم يتم العثور على مهام تطابق معايير البحث</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;