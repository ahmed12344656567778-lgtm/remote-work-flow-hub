import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FilesHeader from "@/components/files/FilesHeader";
import FilesView, { FileItem } from "@/components/files/FilesView";
import { FileFormDialog, FileDeleteDialog, FileFormData } from "@/components/files/FilesDialogs";

const Files = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [filterType, setFilterType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<FileFormData>({
    name: "",
    type: "document",
    project: "",
    shared: false,
  });

  const files: FileItem[] = [
    {
      id: 1,
      name: "تصميم الواجهة الرئيسية.figma",
      type: "design",
      size: "2.5 MB",
      uploadDate: "2024-01-10",
      uploadedBy: "فاطمة علي",
      project: "تطوير موقع الشركة",
      downloads: 15,
      shared: true,
    },
    {
      id: 2,
      name: "متطلبات المشروع.pdf",
      type: "document",
      size: "1.2 MB",
      uploadDate: "2024-01-08",
      uploadedBy: "أحمد محمد",
      project: "تطوير موقع الشركة",
      downloads: 8,
      shared: false,
    },
    {
      id: 3,
      name: "عرض تقديمي للعميل.pptx",
      type: "presentation",
      size: "5.8 MB",
      uploadDate: "2024-01-12",
      uploadedBy: "سارة أحمد",
      project: "تطبيق الهاتف المحمول",
      downloads: 3,
      shared: true,
    },
    {
      id: 4,
      name: "كود المصدر النسخة 1.zip",
      type: "archive",
      size: "12.3 MB",
      uploadDate: "2024-01-05",
      uploadedBy: "محمد خالد",
      project: "نظام إدارة المخزون",
      downloads: 25,
      shared: false,
    },
    {
      id: 5,
      name: "لقطات شاشة التطبيق.png",
      type: "image",
      size: "800 KB",
      uploadDate: "2024-01-11",
      uploadedBy: "عمر حسن",
      project: "تطبيق الهاتف المحمول",
      downloads: 12,
      shared: true,
    },
    {
      id: 6,
      name: "فيديو توضيحي للمنتج.mp4",
      type: "video",
      size: "25.7 MB",
      uploadDate: "2024-01-13",
      uploadedBy: "ليلى محمود",
      project: "حملة التسويق الرقمي",
      downloads: 7,
      shared: true,
    },
    {
      id: 7,
      name: "قاعدة البيانات التصميمية.sql",
      type: "database",
      size: "3.1 MB",
      uploadDate: "2024-01-09",
      uploadedBy: "محمد خالد",
      project: "نظام إدارة المخزون",
      downloads: 5,
      shared: false,
    },
    {
      id: 8,
      name: "تقرير الأداء الشهري.xlsx",
      type: "spreadsheet",
      size: "1.5 MB",
      uploadDate: "2024-01-14",
      uploadedBy: "نور الدين",
      project: "تقارير الإدارة",
      downloads: 20,
      shared: true,
    },
  ];

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalSize = files.reduce((sum, file) => {
    const sizeInMB = parseFloat(file.size.replace(/[^\d.]/g, ""));
    return sum + (file.size.includes("KB") ? sizeInMB / 1024 : sizeInMB);
  }, 0);

  const stats = {
    totalFiles: files.length,
    totalSize,
    sharedFiles: files.filter((f) => f.shared).length,
    totalDownloads: files.reduce((sum, f) => sum + f.downloads, 0),
  };

  const handleOpenDialog = (file?: FileItem) => {
    if (file) {
      setSelectedFile(file);
      setFormData({
        name: file.name,
        type: file.type,
        project: file.project,
        shared: file.shared,
      });
    } else {
      setSelectedFile(null);
      setFormData({
        name: "",
        type: "document",
        project: "",
        shared: false,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveFile = () => {
    if (!formData.name || !formData.project) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsDialogOpen(false);
    toast({
      title: selectedFile ? "تم التحديث" : "تم الرفع",
      description: selectedFile ? "تم تحديث بيانات الملف بنجاح" : "تم رفع الملف بنجاح",
    });
  };

  const handleDeleteFile = (fileId: number) => {
    setFileToDelete(fileId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "تم الحذف",
      description: "تم حذف الملف بنجاح",
    });
  };

  return (
    <div className="space-y-8" dir="rtl">
      <FilesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filterType={filterType}
        onFilterChange={setFilterType}
        onUploadClick={() => handleOpenDialog()}
        stats={stats}
      />

      <FilesView
        files={filteredFiles}
        viewMode={viewMode}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteFile}
      />

      <FileFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedFile={selectedFile}
        formData={formData}
        onFormChange={setFormData}
        onSave={handleSaveFile}
      />

      <FileDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Files;
