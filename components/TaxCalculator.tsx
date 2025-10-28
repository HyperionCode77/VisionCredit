import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Calculator, FileText, Euro, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";

export function TaxCalculator() {
  const [revenue, setRevenue] = useState('328000');
  const [deductibleExpenses, setDeductibleExpenses] = useState('216000');
  const [ivaCollected, setIvaCollected] = useState('68880');
  const [ivaSupported, setIvaSupported] = useState('45360');

  // Corporate Tax (Impuesto de Sociedades)
  const calculateCorporateTax = () => {
    const rev = parseFloat(revenue) || 0;
    const exp = parseFloat(deductibleExpenses) || 0;
    const taxableBase = rev - exp;
    
    // Tipo general 25%, reducido para PYMEs en primeros años
    const taxRate = taxableBase < 300000 ? 0.25 : 0.25;
    const tax = taxableBase * taxRate;
    
    return { taxableBase, taxRate: taxRate * 100, tax };
  };

  // VAT (IVA)
  const calculateVAT = () => {
    const collected = parseFloat(ivaCollected) || 0;
    const supported = parseFloat(ivaSupported) || 0;
    const vatToPay = collected - supported;
    
    return { collected, supported, vatToPay };
  };

  const corpTax = calculateCorporateTax();
  const vat = calculateVAT();

  return (
    <div className="space-y-6">
      <div>
        <h2>Calculadora de Impuestos</h2>
        <p className="text-gray-600">Cálculo automático de IVA, Sociedades e IRPF</p>
      </div>

      <Tabs defaultValue="corporate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="corporate">Impuesto Sociedades</TabsTrigger>
          <TabsTrigger value="vat">IVA</TabsTrigger>
          <TabsTrigger value="irpf">IRPF</TabsTrigger>
        </TabsList>

        {/* Corporate Tax Tab */}
        <TabsContent value="corporate" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                <CardTitle>Impuesto sobre Sociedades</CardTitle>
              </div>
              <CardDescription>
                Calcula tu obligación fiscal anual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Ingresos Totales (€)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenses">Gastos Deducibles (€)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    value={deductibleExpenses}
                    onChange={(e) => setDeductibleExpenses(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4">Resultado</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Base Imponible</span>
                    <span>€{corpTax.taxableBase.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Tipo Impositivo</span>
                    <span>{corpTax.taxRate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg">
                    <span>Cuota a Pagar</span>
                    <span className="text-xl">€{Math.round(corpTax.tax).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  El tipo general del Impuesto sobre Sociedades en España es del 25%. Las empresas de nueva creación pueden aplicar un tipo reducido del 15% en los primeros años.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendario Fiscal - Impuesto Sociedades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Modelo 202 - 1er Pago Fraccionado</p>
                    <p className="text-sm text-gray-600">Abril 1-20</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completado</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Modelo 202 - 2º Pago Fraccionado</p>
                    <p className="text-sm text-gray-600">Octubre 1-20</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Modelo 200 - Declaración Anual</p>
                    <p className="text-sm text-gray-600">Julio (25 días naturales tras cierre)</p>
                  </div>
                  <Badge variant="outline">Pendiente</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VAT Tab */}
        <TabsContent value="vat" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                <CardTitle>Impuesto sobre el Valor Añadido (IVA)</CardTitle>
              </div>
              <CardDescription>
                Calcula tu IVA trimestral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ivaCollected">IVA Repercutido (€)</Label>
                  <Input
                    id="ivaCollected"
                    type="number"
                    value={ivaCollected}
                    onChange={(e) => setIvaCollected(e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-600">IVA cobrado en tus ventas</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ivaSupported">IVA Soportado (€)</Label>
                  <Input
                    id="ivaSupported"
                    type="number"
                    value={ivaSupported}
                    onChange={(e) => setIvaSupported(e.target.value)}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-600">IVA pagado en tus compras</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4">Resultado Trimestral</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span>IVA Repercutido</span>
                    <span>€{vat.collected.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span>IVA Soportado</span>
                    <span>€{vat.supported.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg">
                    <span>{vat.vatToPay >= 0 ? 'IVA a Ingresar' : 'IVA a Compensar'}</span>
                    <span className="text-xl">€{Math.abs(vat.vatToPay).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  El IVA se declara trimestralmente mediante el modelo 303. Los tipos en España son: 21% (general), 10% (reducido) y 4% (superreducido).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendario Fiscal - IVA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Modelo 303 - 1T 2025</p>
                    <p className="text-sm text-gray-600">Abril 1-20</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Presentado</Badge>
                    <p className="text-sm text-gray-600 mt-1">€5,240 ingresado</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                  <div>
                    <p>Modelo 303 - 2T 2025</p>
                    <p className="text-sm text-gray-600">Julio 1-20</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                    <p className="text-sm text-gray-600 mt-1">€{Math.round(vat.vatToPay).toLocaleString()} estimado</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p>Modelo 390 - Resumen Anual</p>
                    <p className="text-sm text-gray-600">Enero 1-30</p>
                  </div>
                  <Badge variant="outline">2026</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IRPF Tab */}
        <TabsContent value="irpf" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>IRPF - Retenciones de Trabajadores</CardTitle>
              </div>
              <CardDescription>
                Resumen de retenciones e ingresos a cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Retenciones 2T 2025</p>
                  <p className="text-2xl mt-1">€8,550</p>
                  <p className="text-xs text-gray-600 mt-2">Abril, Mayo, Junio</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Total Anual 2025</p>
                  <p className="text-2xl mt-1">€17,100</p>
                  <p className="text-xs text-gray-600 mt-2">Año hasta la fecha</p>
                </div>
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <p className="text-sm text-gray-600">Próximo Pago</p>
                  <p className="text-2xl mt-1">20 Jul</p>
                  <p className="text-xs text-gray-600 mt-2">Modelo 111 - 2T 2025</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4">Retenciones por Empleado (Mensual)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>María García López (15%)</span>
                    <span>€562</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Juan Martínez Ruiz (12%)</span>
                    <span>€380</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Ana Fernández Soto (15%)</span>
                    <span>€525</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Carlos Rodríguez Pérez (18%)</span>
                    <span>€720</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>Laura Sánchez Gómez (12%)</span>
                    <span>€350</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-100 rounded-lg border-t-2">
                    <span>Total Mensual</span>
                    <span className="text-xl">€2,537</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Las retenciones de IRPF se declaran trimestralmente con el modelo 111. El resumen anual se presenta con el modelo 190 en enero.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Retención IRPF</CardTitle>
              <CardDescription>Guía de porcentajes según situación personal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span>Soltero, sin hijos</span>
                    <Badge>12-15%</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Según salario y circunstancias</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span>Casado, 2 hijos</span>
                    <Badge>8-12%</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Reducción por familia numerosa</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span>Salario alto (&gt;60.000€)</span>
                    <Badge>18-24%</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Tramos superiores progresivos</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span>Retención mínima</span>
                    <Badge variant="outline">2%</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Para contratos especiales o becarios</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
