import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  MoreVertical,
  FolderOpen,
  Archive
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  teamMembers: number;
  tasks: number;
  completedTasks: number;
}

const Projects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "نشط",
    startDate: "",
    endDate: "",
    teamMembers: "0"
  });

  const projects = [
    {
      id: 1,
      name: "تطوير موقع الشركة",
      description: "إنشاء موقع إلكتروني متجاوب وحديث للشركة",
      status: "نشط",
      progress: 75,
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      teamMembers: 5,
      tasks: 12,
      completedTasks: 9
    },
    {
      id: 2,
      name: "تطبيق الهاتف المحمول",
      description: "تطوير تطبيق iOS و Android للعملاء",
      status: "نشط",
      progress: 45,
      startDate: "2024-01-10",
      endDate: "2024-02-20",
      teamMembers: 8,
      tasks: 20,
      completedTasks: 9
    },
    {
      id: 3,
      name: "حملة التسويق الرقمي",
      description: "استراتيجية تسويق شاملة عبر وسائل التواصل",
      status: "مكتمل",
      progress: 100,
      startDate: "2023-12-01",
      endDate: "2024-01-10",
      teamMembers: 4,
      tasks: 15,
      completedTasks: 15
    },
    {
      id: 4,
      name: "نظام إدارة المخزون",
      description: "تطوير نظام إدارة المخزون والمبيعات",
      status: "مؤجل",
      progress: 30,
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      teamMembers: 6,
      tasks: 18,
      completedTasks: 5
    },
    {
      id: 5,
      name: "تحديث البنية التحتية",
      description: "ترقية الخوادم وتحسين الأمان",
      status: "نشط",
      progress: 60,
      startDate: "2024-01-05",
      endDate: "2024-01-25",
      teamMembers: 3,
      tasks: 8,
      completedTasks: 5
    },
    {
      id: 6,
      name: "برنامج تدريب الموظفين",
      description: "تطوير برنامج تدريبي شامل للموظفين الجدد",
      status: "مؤرشف",
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2023-12-15",
      teamMembers: 2,
      tasks: 10,
      completedTasks: 10
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800";
      case "مكتمل":
        return "bg-blue-100 text-blue-800";
      case "مؤجل":
        return "bg-yellow-100 text-yellow-800";
      case "مؤرشف":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        teamMembers: project.teamMembers.toString()
      });
    } else {
      setSelectedProject(null);
      setFormData({
        name: "",
        description: "",
        status: "نشط",
        startDate: "",
        endDate: "",
        teamMembers: "0"
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!formData.name || !formData.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsDialogOpen(false);
    toast({
      title: selectedProject ? "تم التحديث" : "تم الإضافة",
      description: selectedProject ? "تم تحديث المشروع بنجاح" : "تم إضافة المشروع بنجاح"
    });
  };

  const handleDeleteProject = (projectId: number) => {
    setProjectToDelete(projectId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "تم الحذف",
      description: "تم حذف المشروع بنجاح"
    });
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">المشاريع</h1>
          <p className="text-lg text-muted-foreground">إدارة وتتبع جميع مشاريع الشركة</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4" />
          مشروع جديد
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في المشاريع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
          >
            الكل
          </Button>
          <Button
            variant={filterStatus === "نشط" ? "default" : "outline"}
            onClick={() => setFilterStatus("نشط")}
          >
            نشط
          </Button>
          <Button
            variant={filterStatus === "مكتمل" ? "default" : "outline"}
            onClick={() => setFilterStatus("مكتمل")}
          >
            مكتمل
          </Button>
          <Button
            variant={filterStatus === "مؤجل" ? "default" : "outline"}
            onClick={() => setFilterStatus("مؤجل")}
          >
            مؤجل
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenDialog(project)}>تعديل</DropdownMenuItem>
                    <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                    <DropdownMenuItem>أرشفة</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project.id)}>حذف</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>التقدم</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{project.teamMembers} أعضاء</span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  المهام: {project.completedTasks}/{project.tasks}
                </span>
                <span className="text-muted-foreground">
                  {Math.round((project.completedTasks / project.tasks) * 100)}% مكتمل
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  عرض التفاصيل
                </Button>
                <Button size="sm" variant="outline">
                  <FolderOpen className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">لا توجد مشاريع</h3>
          <p className="mt-2 text-muted-foreground">لم يتم العثور على مشاريع تطابق معايير البحث</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>{selectedProject ? "تعديل المشروع" : "إضافة مشروع جديد"}</DialogTitle>
            <DialogDescription>
              {selectedProject ? "قم بتعديل بيانات المشروع" : "قم بإدخال تفاصيل المشروع الجديد"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم المشروع *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم المشروع"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="أدخل وصف المشروع"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">حالة المشروع</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="مكتمل">مكتمل</SelectItem>
                  <SelectItem value="مؤجل">مؤجل</SelectItem>
                  <SelectItem value="مؤرشف">مؤرشف</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">تاريخ البدء</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">تاريخ الانتهاء</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamMembers">عدد أعضاء الفريق</Label>
              <Input
                id="teamMembers"
                type="number"
                min="0"
                value={formData.teamMembers}
                onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveProject}>
              {selectedProject ? "حفظ التعديلات" : "إضافة المشروع"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المشروع نهائياً وجميع البيانات المرتبطة به ولا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Projects;