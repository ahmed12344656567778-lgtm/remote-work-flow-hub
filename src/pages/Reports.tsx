import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  FolderOpen,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Activity,
  Users
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  Legend
} from "recharts";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  const projectStats = [
    { name: "تطوير موقع الشركة", completion: 75, tasksCompleted: 9, totalTasks: 12, status: "نشط" },
    { name: "تطبيق الهاتف المحمول", completion: 45, tasksCompleted: 9, totalTasks: 20, status: "نشط" },
    { name: "حملة التسويق الرقمي", completion: 100, tasksCompleted: 15, totalTasks: 15, status: "مكتمل" },
    { name: "نظام إدارة المخزون", completion: 30, tasksCompleted: 5, totalTasks: 18, status: "مؤجل" },
    { name: "تحديث البنية التحتية", completion: 60, tasksCompleted: 5, totalTasks: 8, status: "نشط" }
  ];

  const monthlyStats = {
    projectsCompleted: 3,
    projectsInProgress: 5,
    projectsOverdue: 2,
    tasksCompleted: 48,
    tasksPending: 15,
    tasksOverdue: 5,
    teamEfficiency: 82,
    budgetUtilization: 67
  };

  const taskStatusData = [
    { name: "مكتملة", value: monthlyStats.tasksCompleted, color: "hsl(142, 76%, 36%)" },
    { name: "قيد التنفيذ", value: monthlyStats.tasksPending, color: "hsl(217, 91%, 60%)" },
    { name: "متأخرة", value: monthlyStats.tasksOverdue, color: "hsl(0, 84%, 60%)" }
  ];

  const getBarColor = (completion: number) => {
    if (completion >= 80) return "hsl(142, 76%, 36%)";
    if (completion >= 50) return "hsl(217, 91%, 60%)";
    if (completion >= 30) return "hsl(45, 93%, 47%)";
    return "hsl(0, 84%, 60%)";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "نشط":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "مكتمل":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "مؤجل":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">التقارير</h1>
          <p className="text-lg text-muted-foreground">تحليل الأداء والإنتاجية</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">أسبوعي</SelectItem>
              <SelectItem value="month">شهري</SelectItem>
              <SelectItem value="quarter">ربع سنوي</SelectItem>
              <SelectItem value="year">سنوي</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المشاريع المكتملة</p>
                <p className="text-3xl font-bold text-foreground">{monthlyStats.projectsCompleted}</p>
                <p className="text-xs text-green-600">+20% من الشهر الماضي</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المشاريع النشطة</p>
                <p className="text-3xl font-bold text-foreground">{monthlyStats.projectsInProgress}</p>
                <p className="text-xs text-blue-600">مستقر</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المهام المكتملة</p>
                <p className="text-3xl font-bold text-foreground">{monthlyStats.tasksCompleted}</p>
                <p className="text-xs text-green-600">+15% من الشهر الماضي</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">كفاءة الفريق</p>
                <p className="text-3xl font-bold text-foreground">{monthlyStats.teamEfficiency}%</p>
                <p className="text-xs text-green-600">+5% من الشهر الماضي</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            تقدم المشاريع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectStats}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={150}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'نسبة الإنجاز']}
                  labelFormatter={(label) => label}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    direction: 'rtl'
                  }}
                />
                <Bar dataKey="completion" radius={[0, 4, 4, 0]} maxBarSize={40}>
                  {projectStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.completion)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {projectStats.map((project, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge className={getStatusColor(project.status)} variant="outline">
                  {project.name}: {project.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Status Distribution - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              توزيع حالة المهام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      direction: 'rtl'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              استغلال الميزانية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{monthlyStats.budgetUtilization}%</p>
                <p className="text-sm text-muted-foreground">من الميزانية المخصصة</p>
              </div>
              <Progress value={monthlyStats.budgetUtilization} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>متبقي: ${(100 - monthlyStats.budgetUtilization) * 10}K</span>
                <span>مستخدم: ${monthlyStats.budgetUtilization * 10}K</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              تقارير سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 ml-2" />
                تقرير الأداء الشهري
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Users className="h-4 w-4 ml-2" />
                تقرير إنتاجية الفريق
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FolderOpen className="h-4 w-4 ml-2" />
                تقرير حالة المشاريع
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Clock className="h-4 w-4 ml-2" />
                تقرير المهام المتأخرة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            الاتجاهات والتحليلات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">إنتاجية متزايدة</h4>
              <p className="text-sm text-green-600 mt-1">
                زيادة 15% في إكمال المهام هذا الشهر
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800">كفاءة الفريق</h4>
              <p className="text-sm text-blue-600 mt-1">
                متوسط كفاءة الفريق 82% هذا الشهر
              </p>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-semibold text-orange-800">نقاط التحسين</h4>
              <p className="text-sm text-orange-600 mt-1">
                5 مهام متأخرة تحتاج لمتابعة
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;