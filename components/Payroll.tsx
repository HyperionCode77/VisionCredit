import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Download, DollarSign, FileText, Calculator } from "lucide-react";
import { useState } from "react";

interface PayrollEntry {
  employeeId: string;
  employeeName: string;
  grossSalary: number;
  socialSecurity: number;
  irpfRate: number;
  irpfAmount: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

const calculatePayroll = (annualSalary: number, irpfRate: number): PayrollEntry => {
  const monthlySalary = annualSalary / 12;
  // Seguridad Social empleado aprox 6.35%
  const socialSecurity = monthlySalary * 0.0635;
  const irpfAmount = monthlySalary * (irpfRate / 100);
  const netSalary = monthlySalary - socialSecurity - irpfAmount;
  
  return {
    employeeId: '',
    employeeName: '',
    grossSalary: monthlySalary,
    socialSecurity,
    irpfRate,
    irpfAmount,
    netSalary,
    status: 'pending'
  };
};

const mockPayroll: PayrollEntry[] = [
  { ...calculatePayroll(45000, 15), employeeId: '1', employeeName: 'María García López', status: 'paid' },
  { ...calculatePayroll(38000, 12), employeeId: '2', employeeName: 'Juan Martínez Ruiz', status: 'paid' },
  { ...calculatePayroll(42000, 15), employeeId: '3', employeeName: 'Ana Fernández Soto', status: 'paid' },
  { ...calculatePayroll(48000, 18), employeeId: '4', employeeName: 'Carlos Rodríguez Pérez', status: 'paid' },
  { ...calculatePayroll(35000, 12), employeeId: '5', employeeName: 'Laura Sánchez Gómez', status: 'paid' },
];

export function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('2025-06');
  const [payrollEntries] = useState<PayrollEntry[]>(mockPayroll);

  const totalGross = payrollEntries.reduce((sum, entry) => sum + entry.grossSalary, 0);
  const totalSS = payrollEntries.reduce((sum, entry) => sum + entry.socialSecurity, 0);
  const totalIRPF = payrollEntries.reduce((sum, entry) => sum + entry.irpfAmount, 0);
  const totalNet = payrollEntries.reduce((sum, entry) => sum + entry.netSalary, 0);
  
  // Empresa SS contribution approx 30%
  const employerSS = totalGross * 0.30;
  const totalCost = totalGross + employerSS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gestión de Nóminas</h2>
          <p className="text-gray-600">Procesamiento automático de pagos y retenciones IRPF</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-06">Junio 2025</SelectItem>
              <SelectItem value="2025-05">Mayo 2025</SelectItem>
              <SelectItem value="2025-04">Abril 2025</SelectItem>
              <SelectItem value="2025-03">Marzo 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Nóminas
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generar Nóminas
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Coste Total Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(totalCost).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Salarios + SS empresa</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Salarios Brutos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(totalGross).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">{payrollEntries.length} empleados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">IRPF Retenido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(totalIRPF).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">A declarar en Hacienda</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Seguridad Social</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(totalSS + employerSS).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Trabajador + empresa</p>
          </CardContent>
        </Card>
      </div>

      {/* IRPF Calculator */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            <CardTitle>Cálculo Automático IRPF</CardTitle>
          </div>
          <CardDescription>
            Las retenciones se calculan automáticamente según el salario y circunstancias personales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Total IRPF Retenido</p>
              <p className="text-2xl mt-1">€{Math.round(totalIRPF).toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-2">
                Este importe debe ingresarse a Hacienda mediante el modelo 111
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Tasa Media IRPF</p>
              <p className="text-2xl mt-1">{((totalIRPF / totalGross) * 100).toFixed(2)}%</p>
              <p className="text-xs text-gray-600 mt-2">
                Promedio ponderado de todas las retenciones
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">Próximo Pago</p>
              <p className="text-2xl mt-1">20 Jul 2025</p>
              <p className="text-xs text-gray-600 mt-2">
                Fecha límite modelo 111 - Retenciones de Junio
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Nóminas - {new Date(selectedMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead className="text-right">Salario Bruto</TableHead>
                <TableHead className="text-right">SS (6.35%)</TableHead>
                <TableHead className="text-right">IRPF</TableHead>
                <TableHead className="text-right">Retención</TableHead>
                <TableHead className="text-right">Salario Neto</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollEntries.map(entry => (
                <TableRow key={entry.employeeId}>
                  <TableCell>{entry.employeeName}</TableCell>
                  <TableCell className="text-right">€{Math.round(entry.grossSalary).toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{Math.round(entry.socialSecurity).toLocaleString()}</TableCell>
                  <TableCell className="text-right">{entry.irpfRate}%</TableCell>
                  <TableCell className="text-right">€{Math.round(entry.irpfAmount).toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{Math.round(entry.netSalary).toLocaleString()}</TableCell>
                  <TableCell>
                    {entry.status === 'paid' && (
                      <Badge className="bg-green-100 text-green-800">Pagado</Badge>
                    )}
                    {entry.status === 'processed' && (
                      <Badge className="bg-blue-100 text-blue-800">Procesado</Badge>
                    )}
                    {entry.status === 'pending' && (
                      <Badge variant="outline">Pendiente</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">€{Math.round(totalGross).toLocaleString()}</TableCell>
                <TableCell className="text-right">€{Math.round(totalSS).toLocaleString()}</TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">€{Math.round(totalIRPF).toLocaleString()}</TableCell>
                <TableCell className="text-right">€{Math.round(totalNet).toLocaleString()}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contributions Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Desglose de Cotizaciones a la Seguridad Social</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm">Aportación Trabajador (≈6.35%)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Contingencias comunes</span>
                  <span>4.70%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Desempleo</span>
                  <span>1.55%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Formación profesional</span>
                  <span>0.10%</span>
                </div>
                <div className="flex justify-between items-center p-3 border-t-2 pt-3">
                  <span>Total trabajador</span>
                  <span>€{Math.round(totalSS).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm">Aportación Empresa (≈30%)</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">Contingencias comunes</span>
                  <span>23.60%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">Desempleo</span>
                  <span>5.50%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">FOGASA</span>
                  <span>0.20%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">Formación profesional</span>
                  <span>0.60%</span>
                </div>
                <div className="flex justify-between items-center p-3 border-t-2 pt-3">
                  <span>Total empresa</span>
                  <span>€{Math.round(employerSS).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
