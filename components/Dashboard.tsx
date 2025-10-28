import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Euro, Users, Building2, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyRevenue = [
  { month: 'Ene', ingresos: 45000, gastos: 32000 },
  { month: 'Feb', ingresos: 52000, gastos: 35000 },
  { month: 'Mar', ingresos: 48000, gastos: 33000 },
  { month: 'Abr', ingresos: 61000, gastos: 38000 },
  { month: 'May', ingresos: 55000, gastos: 36000 },
  { month: 'Jun', ingresos: 67000, gastos: 42000 },
];

const expensesByCategory = [
  { name: 'Nóminas', value: 120000, color: '#3b82f6' },
  { name: 'Alquiler', value: 24000, color: '#8b5cf6' },
  { name: 'Servicios', value: 15000, color: '#ec4899' },
  { name: 'Marketing', value: 12000, color: '#f59e0b' },
  { name: 'Otros', value: 8000, color: '#10b981' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Panel de Control</h2>
        <p className="text-gray-600">Resumen de tus finanzas empresariales</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Balance Total</CardTitle>
            <Euro className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€328,450</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Ingresos (Jun)</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€67,000</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+21.8%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Gastos (Jun)</CardTitle>
            <TrendingDown className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€42,000</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-red-600">+16.7%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Empleados Activos</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">24</div>
            <p className="text-xs text-gray-600 mt-1">
              Nómina total: €120,000/año
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos vs Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} name="Ingresos" />
                <Line type="monotone" dataKey="gastos" stroke="#ef4444" strokeWidth={2} name="Gastos" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Cuentas Conectadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p>Santander - Cuenta Principal</p>
                  <p className="text-sm text-gray-600">ES79 0049 0001 5123 4567 8901</p>
                </div>
              </div>
              <div className="text-right">
                <p>€248,450</p>
                <p className="text-xs text-gray-600">Sincronizado hace 5 min</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-red-600" />
                <div>
                  <p>BBVA - Cuenta Nóminas</p>
                  <p className="text-sm text-gray-600">ES21 0182 0000 4512 3456 7890</p>
                </div>
              </div>
              <div className="text-right">
                <p>€80,000</p>
                <p className="text-xs text-gray-600">Sincronizado hace 10 min</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-orange-600" />
                <div>
                  <p>XTB - Trading</p>
                  <p className="text-sm text-gray-600">Cuenta de inversión</p>
                </div>
              </div>
              <div className="text-right">
                <p>€15,240</p>
                <p className="text-xs text-gray-600">Sincronizado hace 1 hora</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas y Notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-900">Declaración IVA Q2 2025 pendiente</p>
                <p className="text-sm text-yellow-700">Vence el 20 de Julio. Impuesto estimado: €4,250</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-blue-900">Nóminas de Junio procesadas</p>
                <p className="text-sm text-blue-700">IRPF retenido: €2,850. SS: €3,200</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
