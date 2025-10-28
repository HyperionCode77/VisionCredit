import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Plus, Download, Upload, Search, Filter } from "lucide-react";
import { useState } from "react";

interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  account: string;
  vat: number;
  deductible: boolean;
}

const mockExpenses: Expense[] = [
  { id: '1', date: '2025-06-15', description: 'Alquiler oficina Junio', category: 'Alquiler', amount: 2000, account: 'Santander', vat: 420, deductible: true },
  { id: '2', date: '2025-06-10', description: 'Licencias software', category: 'Servicios', amount: 890, account: 'BBVA', vat: 186.90, deductible: true },
  { id: '3', date: '2025-06-08', description: 'Material oficina', category: 'Suministros', amount: 245, account: 'Santander', vat: 51.45, deductible: true },
  { id: '4', date: '2025-06-05', description: 'Campaña Google Ads', category: 'Marketing', amount: 1500, account: 'BBVA', vat: 315, deductible: true },
  { id: '5', date: '2025-06-03', description: 'Nóminas Mayo', category: 'Nóminas', amount: 10000, account: 'BBVA', vat: 0, deductible: true },
  { id: '6', date: '2025-06-01', description: 'Seguridad Social Mayo', category: 'Seguridad Social', amount: 2800, account: 'Santander', vat: 0, deductible: true },
  { id: '7', date: '2025-05-28', description: 'Cena equipo', category: 'Otros', amount: 320, account: 'Santander', vat: 33.60, deductible: false },
];

const categories = [
  'Alquiler', 'Nóminas', 'Seguridad Social', 'Servicios', 'Suministros', 
  'Marketing', 'Formación', 'Viajes', 'Comidas', 'Otros'
];

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalVAT = filteredExpenses.reduce((sum, expense) => sum + expense.vat, 0);
  const deductibleExpenses = filteredExpenses.filter(e => e.deductible).reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gastos y Análisis</h2>
          <p className="text-gray-600">Gestiona y categoriza tus gastos empresariales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Añadir Gasto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
                <DialogDescription>
                  Añade un nuevo gasto a tu registro
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Importe (€)</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input id="description" placeholder="Descripción del gasto" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account">Cuenta</Label>
                    <Select>
                      <SelectTrigger id="account">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="santander">Santander</SelectItem>
                        <SelectItem value="bbva">BBVA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vat">IVA (%)</Label>
                  <Select>
                    <SelectTrigger id="vat">
                      <SelectValue placeholder="Selecciona tipo IVA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="21">21% (General)</SelectItem>
                      <SelectItem value="10">10% (Reducido)</SelectItem>
                      <SelectItem value="4">4% (Superreducido)</SelectItem>
                      <SelectItem value="0">0% (Exento)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Guardar Gasto
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">{filteredExpenses.length} registros</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">IVA Soportado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{totalVAT.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Deducible en IVA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Gastos Deducibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{deductibleExpenses.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Para Impuesto Sociedades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Promedio Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(totalExpenses / 6).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Últimos 6 meses</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar gastos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Cuenta</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead className="text-right">IVA</TableHead>
                <TableHead>Deducible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell>{new Date(expense.date).toLocaleDateString('es-ES')}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.category}</Badge>
                  </TableCell>
                  <TableCell>{expense.account}</TableCell>
                  <TableCell className="text-right">€{expense.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{expense.vat.toLocaleString()}</TableCell>
                  <TableCell>
                    {expense.deductible ? (
                      <Badge className="bg-green-100 text-green-800">Sí</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
