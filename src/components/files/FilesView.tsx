import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Share,
  MoreVertical,
  File,
  FileText,
  FileImage,
  FileVideo,
  FolderOpen,
  Calendar,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FileItem {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  project: string;
  downloads: number;
  shared: boolean;
}

interface FilesViewProps {
  files: FileItem[];
  viewMode: string;
  onEdit: (file: FileItem) => void;
  onDelete: (fileId: number) => void;
}

export const getFileIcon = (type: string) => {
  switch (type) {
    case "document":
    case "presentation":
      return <FileText className="h-8 w-8 text-blue-600" />;
    case "image":
      return <FileImage className="h-8 w-8 text-green-600" />;
    case "video":
      return <FileVideo className="h-8 w-8 text-purple-600" />;
    default:
      return <File className="h-8 w-8 text-gray-600" />;
  }
};

export const getFileTypeColor = (type: string) => {
  switch (type) {
    case "document":
      return "bg-blue-100 text-blue-800";
    case "image":
      return "bg-green-100 text-green-800";
    case "video":
      return "bg-purple-100 text-purple-800";
    case "design":
      return "bg-pink-100 text-pink-800";
    case "archive":
      return "bg-orange-100 text-orange-800";
    case "database":
      return "bg-red-100 text-red-800";
    case "spreadsheet":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getFileTypeLabel = (type: string) => {
  switch (type) {
    case "document":
      return "مستند";
    case "image":
      return "صورة";
    case "video":
      return "فيديو";
    case "design":
      return "تصميم";
    case "archive":
      return "أرشيف";
    case "database":
      return "قاعدة بيانات";
    case "spreadsheet":
      return "جدول بيانات";
    case "presentation":
      return "عرض تقديمي";
    default:
      return "ملف";
  }
};

const FilesView = ({ files, viewMode, onEdit, onDelete }: FilesViewProps) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">لا توجد ملفات</h3>
        <p className="mt-2 text-muted-foreground">لم يتم العثور على ملفات تطابق معايير البحث</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file) => (
          <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{file.name}</h4>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 ml-2" />
                        تحميل
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(file)}>
                        تعديل البيانات
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="h-4 w-4 ml-2" />
                        مشاركة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => onDelete(file.id)}>
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <Badge className={getFileTypeColor(file.type)} variant="outline">
                    {getFileTypeLabel(file.type)}
                  </Badge>
                  {file.shared && <Badge variant="secondary">مشترك</Badge>}
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {file.uploadedBy}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {file.uploadDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {file.downloads} تحميل
                  </div>
                </div>

                <p className="text-xs text-muted-foreground truncate">{file.project}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // List View
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-right p-4 font-medium">الملف</th>
                <th className="text-right p-4 font-medium">النوع</th>
                <th className="text-right p-4 font-medium">الحجم</th>
                <th className="text-right p-4 font-medium">المشروع</th>
                <th className="text-right p-4 font-medium">رفع بواسطة</th>
                <th className="text-right p-4 font-medium">التاريخ</th>
                <th className="text-right p-4 font-medium">التحميلات</th>
                <th className="text-right p-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b hover:bg-accent/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        {file.shared && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            مشترك
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getFileTypeColor(file.type)} variant="outline">
                      {getFileTypeLabel(file.type)}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{file.size}</td>
                  <td className="p-4 text-sm text-muted-foreground">{file.project}</td>
                  <td className="p-4 text-sm text-muted-foreground">{file.uploadedBy}</td>
                  <td className="p-4 text-sm text-muted-foreground">{file.uploadDate}</td>
                  <td className="p-4 text-sm text-muted-foreground">{file.downloads}</td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 ml-2" />
                          تحميل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(file)}>
                          تعديل البيانات
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 ml-2" />
                          مشاركة
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => onDelete(file.id)}>
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilesView;
