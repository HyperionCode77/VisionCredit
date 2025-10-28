import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { useState } from "react";

const monthlyData = [
  { month: 'Ene', ingresos: 45000, gastos: 32000, beneficio: 13000, empleados: 20 },
  { month: 'Feb', ingresos: 52000, gastos: 35000, beneficio: 17000, empleados: 22 },
  { month: 'Mar', ingresos: 48000, gastos: 33000, beneficio: 15000, empleados: 22 },
  { month: 'Abr', ingresos: 61000, gastos: 38000, beneficio: 23000, empleados: 23 },
  { month: 'May', ingresos: 55000, gastos: 36000, beneficio: 19000, empleados: 24 },
  { month: 'Jun', ingresos: 67000, gastos: 42000, beneficio: 25000, empleados: 24 },
];

const categoryData = [
  { category: 'Nóminas', amount: 120000, percentage: 67 },
  { category: 'Alquiler', amount: 24000, percentage: 13 },
  { category: 'Servicios', amount: 15000, percentage: 8 },
  { category: 'Marketing', amount: 12000, percentage: 7 },
  { category: 'Otros', amount: 8000, percentage: 5 },
];

const cashFlowData = [
  { month: 'Ene', entradas: 52000, salidas: 38000, balance: 14000 },
  { month: 'Feb', entradas: 58000, salidas: 41000, balance: 31000 },
  { month: 'Mar', entradas: 54000, salidas: 39000, balance: 46000 },
  { month: 'Abr', entradas: 68000, salidas: 44000, balance: 70000 },
  { month: 'May', entradas: 62000, salidas: 42000, balance: 90000 },
  { month: 'Jun', entradas: 74000, salidas: 48000, balance: 116000 },
];

export function Analytics() {
  const [period, setPeriod] = useState('6months');

  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.ingresos, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.gastos, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Analíticas Financieras</h2>
          <p className="text-gray-600">Análisis detallado de tu rendimiento empresarial</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Últimos 3 meses</SelectItem>
            <SelectItem value="6months">Últimos 6 meses</SelectItem>
            <SelectItem value="12months">Último año</SelectItem>
            <SelectItem value="ytd">Año hasta hoy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+18.2%</span> vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Gastos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-red-600">+12.5%</span> vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Beneficio Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{totalProfit.toLocaleString()}</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+32.4%</span> vs período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Margen de Beneficio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{profitMargin.toFixed(1)}%</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+4.2pp</span> vs período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList>
          <TabsTrigger value="revenue">Ingresos y Gastos</TabsTrigger>
          <TabsTrigger value="profit">Beneficios</TabsTrigger>
          <TabsTrigger value="cashflow">Flujo de Caja</TabsTrigger>
          <TabsTrigger value="expenses">Análisis de Gastos</TabsTrigger>
        </TabsList>

        {/* Revenue and Expenses */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Ingresos y Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="ingresos" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Ingresos" />
                  <Area type="monotone" dataKey="gastos" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Gastos" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tasa de Crecimiento Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData.map((d, i) => ({
                    month: d.month,
                    crecimiento: i === 0 ? 0 : ((d.ingresos - monthlyData[i-1].ingresos) / monthlyData[i-1].ingresos * 100)
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Bar dataKey="crecimiento" fill="#3b82f6" name="Crecimiento %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ratio Gastos/Ingresos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData.map(d => ({
                    month: d.month,
                    ratio: (d.gastos / d.ingresos * 100)
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Line type="monotone" dataKey="ratio" stroke="#f59e0b" strokeWidth={2} name="Ratio %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profit Analysis */}
        <TabsContent value="profit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución del Beneficio</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                  <Area type="monotone" dataKey="beneficio" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Beneficio Neto" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Margen de Beneficio Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData.map(d => ({
                    month: d.month,
                    margen: (d.beneficio / d.ingresos * 100)
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Bar dataKey="margen" fill="#10b981" name="Margen %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Objetivos vs Realidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Beneficio Objetivo 2025</span>
                      <span className="text-sm">€150,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: `${(totalProfit / 150000) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{((totalProfit / 150000) * 100).toFixed(1)}% completado</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Ingresos Objetivo 2025</span>
                      <span className="text-sm">€600,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(totalRevenue / 600000) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{((totalRevenue / 600000) * 100).toFixed(1)}% completado</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Margen Objetivo</span>
                      <span className="text-sm">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-purple-600 h-3 rounded-full" style={{ width: `${(profitMargin / 30) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Actual: {profitMargin.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cash Flow */}
        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Flujo de Caja</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} name="Entradas" />
                  <Line type="monotone" dataKey="salidas" stroke="#ef4444" strokeWidth={2} name="Salidas" />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} name="Balance Acumulado" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Entradas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">€368,000</div>
                <p className="text-xs text-gray-600 mt-1">Últimos 6 meses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Salidas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">€252,000</div>
                <p className="text-xs text-gray-600 mt-1">Últimos 6 meses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Balance Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">€116,000</div>
                <p className="text-xs text-gray-600 mt-1">Liquidez disponible</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expense Analysis */}
        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                  <Bar dataKey="amount" fill="#3b82f6" name="Importe" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Categorías de Gasto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryData.map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{cat.category}</span>
                        <span className="text-sm">€{cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${cat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análisis de Eficiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Coste por Empleado</span>
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl">€7,458</div>
                    <p className="text-xs text-gray-600 mt-1">Promedio mensual (24 empleados)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Ingresos por Empleado</span>
                      <Target className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl">€11,167</div>
                    <p className="text-xs text-gray-600 mt-1">Productividad mensual</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Ratio Productividad</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl text-green-800">1.50x</div>
                    <p className="text-xs text-gray-600 mt-1">Ingresos / Coste laboral</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
