import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, TrendingDown, DollarSign, Users } from "lucide-react";

const CostCalculator = () => {
  const [employees, setEmployees] = useState(10);
  const [currentSolution, setCurrentSolution] = useState("traditional");
  const [results, setResults] = useState({
    currentCost: 0,
    fnwCost: 0,
    savings: 0,
    savingsPercent: 0
  });

  const solutionCosts = {
    traditional: { monthly: 150, setup: 500 },
    competitor: { monthly: 120, setup: 300 },
    manual: { monthly: 200, setup: 0 }
  };

  const fnwCost = { monthly: 25, setup: 0 };

  useEffect(() => {
    const currentMonthlyCost = solutionCosts[currentSolution as keyof typeof solutionCosts].monthly * employees;
    const currentSetupCost = solutionCosts[currentSolution as keyof typeof solutionCosts].setup;
    const currentYearlyCost = currentMonthlyCost * 12 + currentSetupCost;

    const fnwMonthlyCost = fnwCost.monthly * employees;
    const fnwYearlyCost = fnwMonthlyCost * 12 + fnwCost.setup;

    const savings = currentYearlyCost - fnwYearlyCost;
    const savingsPercent = ((savings / currentYearlyCost) * 100);

    setResults({
      currentCost: currentYearlyCost,
      fnwCost: fnwYearlyCost,
      savings: savings,
      savingsPercent: savingsPercent
    });
  }, [employees, currentSolution]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-20 bg-feature-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-hero mb-6">
            حاسبة توفير التكاليف
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            اكتشف كم يمكنك توفيره باستخدام FnW مقارنة بالحلول التقليدية لإدارة العمل عن بعد.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Calculator Inputs */}
          <Card className="border-2 border-border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-text-hero">
                <Calculator className="w-6 h-6 text-primary" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employees">عدد الموظفين</Label>
                <Input
                  id="employees"
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(parseInt(e.target.value) || 0)}
                  min="1"
                  max="1000"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution">الحل الحالي</Label>
                <Select value={currentSolution} onValueChange={setCurrentSolution}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">حلول تقليدية (Office 365 + Zoom + أدوات أخرى)</SelectItem>
                    <SelectItem value="competitor">منافسين آخرين</SelectItem>
                    <SelectItem value="manual">إدارة يدوية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-semibold text-text-hero mb-2">ما يشمله FnW:</h4>
                <ul className="text-sm text-text-muted space-y-1">
                  <li>✓ إدارة المشاريع والمهام</li>
                  <li>✓ تتبع الوقت والإنتاجية</li>
                  <li>✓ التواصل والمراسلة</li>
                  <li>✓ التقارير والتحليلات</li>
                  <li>✓ الأمان والخصوصية</li>
                  <li>✓ الدعم الفني 24/7</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="border-2 border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-text-hero">
                  <DollarSign className="w-6 h-6 text-primary" />
                  النتائج السنوية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-text-muted">التكلفة الحالية:</span>
                  <span className="font-bold text-text-hero">{formatCurrency(results.currentCost)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-text-muted">تكلفة FnW:</span>
                  <span className="font-bold text-primary">{formatCurrency(results.fnwCost)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-700">إجمالي التوفير:</span>
                  <span className="font-bold text-green-700 text-xl">{formatCurrency(results.savings)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 shadow-soft bg-green-50">
              <CardContent className="p-6 text-center">
                <TrendingDown className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">
                  توفير {results.savingsPercent.toFixed(0)}%
                </h3>
                <p className="text-green-600 mb-4">
                  مع FnW، ستوفر {formatCurrency(results.savings)} سنوياً
                </p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Users className="w-4 h-4 mr-2" />
                  ابدأ التجربة المجانية
                </Button>
              </CardContent>
            </Card>

            <div className="text-sm text-text-muted bg-card p-4 rounded-lg border">
              <p><strong>ملاحظة:</strong> التوفير المحسوب يشمل تكاليف التراخيص، الإعدادات، التدريب، والصيانة. النتائج تقديرية وقد تختلف حسب الاستخدام الفعلي.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;