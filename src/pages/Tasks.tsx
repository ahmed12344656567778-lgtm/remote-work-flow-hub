import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Kanban, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TaskCard, { Task } from "@/components/tasks/TaskCard";
import { TaskFormDialog, TaskDeleteDialog, TaskFormData } from "@/components/tasks/TaskDialog";

const Tasks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "جديدة",
    priority: "متوسطة",
    assignee: "",
    project: "",
    dueDate: "",
    tags: ""
  });

  const tasks: Task[] = [
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

  const handleOpenDialog = (task?: Task) => {
    if (task) {
      setSelectedTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee,
        project: task.project,
        dueDate: task.dueDate,
        tags: task.tags.join(", ")
      });
    } else {
      setSelectedTask(null);
      setFormData({
        title: "",
        description: "",
        status: "جديدة",
        priority: "متوسطة",
        assignee: "",
        project: "",
        dueDate: "",
        tags: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsDialogOpen(false);
    toast({
      title: selectedTask ? "تم التحديث" : "تم الإضافة",
      description: selectedTask ? "تم تحديث المهمة بنجاح" : "تم إضافة المهمة بنجاح"
    });
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "تم الحذف",
      description: "تم حذف المهمة بنجاح"
    });
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">المهام</h1>
          <p className="text-lg text-muted-foreground">إدارة وتتبع جميع المهام والأنشطة</p>
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
          <Button className="flex items-center gap-2" onClick={() => handleOpenDialog()}>
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
            className="pr-10 text-right"
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
          {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{status}</h3>
                <Badge variant="secondary">{statusTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {statusTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    variant="kanban"
                    onEdit={handleOpenDialog}
                    onDelete={handleDeleteTask}
                  />
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
            <TaskCard
              key={task.id}
              task={task}
              variant="list"
              onEdit={handleOpenDialog}
              onDelete={handleDeleteTask}
            />
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

      {/* Dialogs */}
      <TaskFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedTask={selectedTask}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSaveTask}
      />

      <TaskDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Tasks;
