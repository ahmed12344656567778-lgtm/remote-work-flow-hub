import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MoreVertical,
  Mail,
  Phone,
  Shield,
  UserPlus,
  Users as UsersIcon,
  Edit,
  Trash2
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  createdAt: string;
}

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "موظف",
    password: ""
  });

  const users = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed.mohamed@company.com",
      phone: "+966501234567",
      role: "مشرف",
      status: "نشط",
      createdAt: "2023-01-15"
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima.ali@company.com",
      phone: "+966507654321",
      role: "مدير",
      status: "نشط",
      createdAt: "2023-03-20"
    },
    {
      id: 3,
      name: "محمد خالد",
      email: "mohamed.khaled@company.com",
      phone: "+966509876543",
      role: "موظف",
      status: "نشط",
      createdAt: "2022-11-10"
    },
    {
      id: 4,
      name: "سارة أحمد",
      email: "sara.ahmed@company.com",
      phone: "+966502468135",
      role: "موظف",
      status: "نشط",
      createdAt: "2023-05-08"
    },
    {
      id: 5,
      name: "عمر حسن",
      email: "omar.hassan@company.com",
      phone: "+966503691470",
      role: "مدير",
      status: "معطل",
      createdAt: "2023-02-14"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "مشرف":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "مدير":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "موظف":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "معطل":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const roles = ["مشرف", "مدير", "موظف"];

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        password: ""
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "موظف",
        password: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (!selectedUser && !formData.password) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كلمة المرور للمستخدم الجديد",
        variant: "destructive"
      });
      return;
    }

    setIsDialogOpen(false);
    toast({
      title: selectedUser ? "تم التحديث" : "تم الإضافة",
      description: selectedUser ? "تم تحديث بيانات المستخدم بنجاح" : "تم إضافة المستخدم بنجاح"
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "تم الحذف",
      description: "تم حذف المستخدم بنجاح"
    });
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">إدارة المستخدمين</h1>
          <p className="text-lg text-muted-foreground">إضافة وإدارة المستخدمين وأدوارهم</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => handleOpenDialog()}>
          <UserPlus className="h-4 w-4" />
          إضافة مستخدم جديد
        </Button>
      </div>

      {/* Users Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-foreground">{users.length}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المستخدمون النشطون</p>
                <p className="text-2xl font-bold text-foreground">
                  {users.filter(u => u.status === "نشط").length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المشرفون</p>
                <p className="text-2xl font-bold text-foreground">
                  {users.filter(u => u.role === "مشرف").length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في المستخدمين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأدوار</SelectItem>
            {roles.map(role => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">المستخدم</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">الدور</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenDialog(user)}>
                          <Edit className="h-4 w-4 ml-2" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "تعديل بيانات المستخدم" : "إضافة مستخدم جديد"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser 
                ? "قم بتعديل البيانات المطلوبة ثم اضغط حفظ"
                : "أدخل بيانات المستخدم الجديد"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم الكامل *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="أدخل الاسم الكامل"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@company.com"
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+966xxxxxxxxx"
                className="text-right"
              />
            </div>
            {!selectedUser && (
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="أدخل كلمة المرور"
                  className="text-right"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="role">الدور الوظيفي *</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({...formData, role: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مشرف">مشرف</SelectItem>
                  <SelectItem value="مدير">مدير</SelectItem>
                  <SelectItem value="موظف">موظف</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveUser}>
              {selectedUser ? "حفظ التعديلات" : "إضافة المستخدم"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف المستخدم نهائياً من النظام. لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Users;