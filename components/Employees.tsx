import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Plus, Mail, Phone, Euro, Calendar } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
  irpfRate: number;
}

const mockEmployees: Employee[] = [
  { id: '1', name: 'María García López', email: 'maria.garcia@empresa.com', phone: '+34 612 345 678', position: 'Desarrollador Senior', department: 'Tecnología', salary: 45000, startDate: '2023-01-15', status: 'active', irpfRate: 15 },
  { id: '2', name: 'Juan Martínez Ruiz', email: 'juan.martinez@empresa.com', phone: '+34 623 456 789', position: 'Diseñador UX/UI', department: 'Diseño', salary: 38000, startDate: '2023-03-01', status: 'active', irpfRate: 12 },
  { id: '3', name: 'Ana Fernández Soto', email: 'ana.fernandez@empresa.com', phone: '+34 634 567 890', position: 'Desarrollador Full Stack', department: 'Tecnología', salary: 42000, startDate: '2022-09-10', status: 'active', irpfRate: 15 },
  { id: '4', name: 'Carlos Rodríguez Pérez', email: 'carlos.rodriguez@empresa.com', phone: '+34 645 678 901', position: 'Marketing Manager', department: 'Marketing', salary: 48000, startDate: '2022-06-01', status: 'active', irpfRate: 18 },
  { id: '5', name: 'Laura Sánchez Gómez', email: 'laura.sanchez@empresa.com', phone: '+34 656 789 012', position: 'Contable', department: 'Finanzas', salary: 35000, startDate: '2023-02-15', status: 'active', irpfRate: 12 },
];

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const avgSalary = totalPayroll / employees.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gestión de Empleados</h2>
          <p className="text-gray-600">Administra tu equipo y nóminas</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Añadir Empleado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nuevo Empleado</DialogTitle>
              <DialogDescription>
                Añade un nuevo empleado a tu empresa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Nombre y apellidos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@empresa.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+34 600 000 000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Puesto</Label>
                  <Input id="position" placeholder="ej. Desarrollador" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tecnología</SelectItem>
                      <SelectItem value="design">Diseño</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finanzas</SelectItem>
                      <SelectItem value="hr">Recursos Humanos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salario Anual (€)</Label>
                  <Input id="salary" type="number" placeholder="35000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de Inicio</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irpf">Retención IRPF (%)</Label>
                  <Select>
                    <SelectTrigger id="irpf">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2% (Mínimo)</SelectItem>
                      <SelectItem value="8">8%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="21">21%</SelectItem>
                      <SelectItem value="24">24%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Guardar Empleado
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Empleados Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{activeEmployees}</div>
            <p className="text-xs text-gray-600 mt-1">Personal total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Nómina Total Anual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Salarios brutos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Salario Medio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(avgSalary).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Por empleado/año</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Nómina Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€{Math.round(totalPayroll / 12).toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Coste mensual aprox.</p>
          </CardContent>
        </Card>
      </div>

      {/* Employees List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
          <CardDescription>Información detallada de tu equipo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Puesto</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead className="text-right">Salario Anual</TableHead>
                <TableHead className="text-right">IRPF</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{employee.name}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(employee.startDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {employee.email}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {employee.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Euro className="h-4 w-4" />
                      {employee.salary.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{employee.irpfRate}%</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">Activo</Badge>
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
