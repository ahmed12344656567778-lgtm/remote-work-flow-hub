import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Search, Grid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilesStats {
  totalFiles: number;
  totalSize: number;
  sharedFiles: number;
  totalDownloads: number;
}

interface FilesHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
  filterType: string;
  onFilterChange: (value: string) => void;
  onUploadClick: () => void;
  stats: FilesStats;
}

const FilesHeader = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  filterType,
  onFilterChange,
  onUploadClick,
  stats,
}: FilesHeaderProps) => {
  return (
    <>
      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">الملفات</h1>
          <p className="text-lg text-muted-foreground">إدارة ومشاركة ملفات المشاريع</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button className="flex items-center gap-2" onClick={onUploadClick}>
            <Upload className="h-4 w-4" />
            رفع ملف
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{stats.totalFiles}</p>
              <p className="text-sm text-muted-foreground">إجمالي الملفات</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{stats.totalSize.toFixed(1)} MB</p>
              <p className="text-sm text-muted-foreground">المساحة المستخدمة</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{stats.sharedFiles}</p>
              <p className="text-sm text-muted-foreground">ملفات مشتركة</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{stats.totalDownloads}</p>
              <p className="text-sm text-muted-foreground">إجمالي التحميلات</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الملفات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 text-right"
          />
        </div>
        <Select value={filterType} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="نوع الملف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            <SelectItem value="document">مستندات</SelectItem>
            <SelectItem value="image">صور</SelectItem>
            <SelectItem value="video">فيديو</SelectItem>
            <SelectItem value="design">تصميم</SelectItem>
            <SelectItem value="archive">أرشيف</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default FilesHeader;
