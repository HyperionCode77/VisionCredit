import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Download, FileText, Calendar, TrendingUp, Euro, Users, Building2 } from "lucide-react";
import { useState } from "react";

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  generatedDate: string;
  status: 'ready' | 'generating' | 'scheduled';
}

const availableReports: Report[] = [
  { id: '1', name: 'Balance de Situación', type: 'financial', period: 'Q2 2025', generatedDate: '2025-06-30', status: 'ready' },
  { id: '2', name: 'Cuenta de Resultados', type: 'financial', period: 'Q2 2025', generatedDate: '2025-06-30', status: 'ready' },
  { id: '3', name: 'Flujo de Caja', type: 'financial', period: 'Junio 2025', generatedDate: '2025-06-30', status: 'ready' },
  { id: '4', name: 'Informe Nóminas', type: 'payroll', period: 'Junio 2025', generatedDate: '2025-06-28', status: 'ready' },
  { id: '5', name: 'Declaración IVA', type: 'tax', period: 'Q2 2025', generatedDate: '2025-07-01', status: 'generating' },
  { id: '6', name: 'Resumen Anual Fiscal', type: 'tax', period: '2024', generatedDate: '2025-01-15', status: 'ready' },
];

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedType, setSelectedType] = useState('all');

  const filteredReports = availableReports.filter(report => {
    if (selectedType !== 'all' && report.type !== selectedType) return false;
    return true;
  });

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'financial': 'Financiero',
      'payroll': 'Nóminas',
      'tax': 'Fiscal'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'financial': 'bg-blue-100 text-blue-800',
      'payroll': 'bg-green-100 text-green-800',
      'tax': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Informes y Resúmenes</h2>
          <p className="text-gray-600">Genera y descarga informes financieros</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generar Nuevo Informe
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ingresos 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€328,000</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+18.2%</span> YoY
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Gastos 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€216,000</div>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-red-600">+12.5%</span> YoY
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Beneficio Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€112,000</div>
            <p className="text-xs text-gray-600 mt-1">Año hasta la fecha</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Margen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">34.1%</div>
            <p className="text-xs text-gray-600 mt-1">Margen de beneficio</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Período actual</SelectItem>
            <SelectItem value="q2-2025">Q2 2025</SelectItem>
            <SelectItem value="q1-2025">Q1 2025</SelectItem>
            <SelectItem value="2024">2024 completo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <FileText className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="financial">Financiero</SelectItem>
            <SelectItem value="payroll">Nóminas</SelectItem>
            <SelectItem value="tax">Fiscal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Informes Disponibles</CardTitle>
          <CardDescription>Descarga o visualiza tus informes generados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p>{report.name}</p>
                      <Badge className={getTypeColor(report.type)}>{getTypeLabel(report.type)}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{report.period}</p>
                    <p className="text-xs text-gray-500">Generado: {new Date(report.generatedDate).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === 'ready' && (
                    <>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </>
                  )}
                  {report.status === 'generating' && (
                    <Badge variant="outline">Generando...</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Euro className="h-5 w-5" />
              <CardTitle>Resumen Financiero</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Activos Totales</span>
                <span>€485,240</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Pasivos Totales</span>
                <span>€156,790</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span className="text-sm">Patrimonio Neto</span>
                <span>€328,450</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Descargar Balance
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>Resumen RR.HH.</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Empleados Activos</span>
                <span>24</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Coste Nómina Mensual</span>
                <span>€17,542</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span className="text-sm">Coste Total SS</span>
                <span>€5,413</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Descargar Nóminas
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <CardTitle>Resumen Fiscal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">IVA Q2 a Pagar</span>
                <span>€23,520</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">IRPF Retenido</span>
                <span>€8,550</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="text-sm">IS Estimado 2025</span>
                <span>€28,000</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Download className="h-4 w-4 mr-2" />
              Descargar Declaración
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Exportar Datos</CardTitle>
          <CardDescription>Exporta tus datos en diferentes formatos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>Exportar a PDF</span>
              <span className="text-xs text-gray-600 mt-1">Informes completos</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>Exportar a Excel</span>
              <span className="text-xs text-gray-600 mt-1">Datos tabulares</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>Exportar a CSV</span>
              <span className="text-xs text-gray-600 mt-1">Datos sin formato</span>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>API Export</span>
              <span className="text-xs text-gray-600 mt-1">Integración JSON</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
