import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileItem } from "./FilesView";

export interface FileFormData {
  name: string;
  type: string;
  project: string;
  shared: boolean;
}

interface FileFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFile: FileItem | null;
  formData: FileFormData;
  onFormChange: (data: FileFormData) => void;
  onSave: () => void;
}

interface FileDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const FileFormDialog = ({
  open,
  onOpenChange,
  selectedFile,
  formData,
  onFormChange,
  onSave,
}: FileFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>{selectedFile ? "تعديل بيانات الملف" : "رفع ملف جديد"}</DialogTitle>
          <DialogDescription>
            {selectedFile ? "قم بتعديل معلومات الملف" : "قم بإدخال معلومات الملف الجديد"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!selectedFile && (
            <div className="space-y-2">
              <Label htmlFor="file">الملف *</Label>
              <Input id="file" type="file" className="cursor-pointer" />
              <p className="text-xs text-muted-foreground">
                الحد الأقصى لحجم الملف: 50 ميجابايت
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fileName">اسم الملف *</Label>
            <Input
              id="fileName"
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              placeholder="أدخل اسم الملف"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileType">نوع الملف</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => onFormChange({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">مستند</SelectItem>
                <SelectItem value="image">صورة</SelectItem>
                <SelectItem value="video">فيديو</SelectItem>
                <SelectItem value="design">تصميم</SelectItem>
                <SelectItem value="archive">أرشيف</SelectItem>
                <SelectItem value="database">قاعدة بيانات</SelectItem>
                <SelectItem value="spreadsheet">جدول بيانات</SelectItem>
                <SelectItem value="presentation">عرض تقديمي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">المشروع *</Label>
            <Input
              id="project"
              value={formData.project}
              onChange={(e) => onFormChange({ ...formData, project: e.target.value })}
              placeholder="اسم المشروع المرتبط بالملف"
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="shared"
              checked={formData.shared}
              onChange={(e) => onFormChange({ ...formData, shared: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="shared" className="cursor-pointer">
              مشاركة الملف مع الفريق
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={onSave}>
            {selectedFile ? "حفظ التعديلات" : "رفع الملف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const FileDeleteDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: FileDeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
          <AlertDialogDescription>
            سيتم حذف الملف نهائياً ولا يمكن التراجع عن هذا الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
