import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Building2, Plus, RefreshCw, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

interface Connection {
  id: string;
  provider: string;
  accountName: string;
  accountNumber: string;
  balance: number;
  status: 'connected' | 'error' | 'syncing';
  lastSync: string;
  type: 'bank' | 'broker' | 'crypto';
}

const mockConnections: Connection[] = [
  {
    id: '1',
    provider: 'Santander',
    accountName: 'Cuenta Principal',
    accountNumber: 'ES79 0049 0001 5123 4567 8901',
    balance: 248450,
    status: 'connected',
    lastSync: 'hace 5 min',
    type: 'bank'
  },
  {
    id: '2',
    provider: 'BBVA',
    accountName: 'Cuenta Nóminas',
    accountNumber: 'ES21 0182 0000 4512 3456 7890',
    balance: 80000,
    status: 'connected',
    lastSync: 'hace 10 min',
    type: 'bank'
  },
  {
    id: '3',
    provider: 'XTB',
    accountName: 'Trading',
    accountNumber: 'Cuenta de inversión',
    balance: 15240,
    status: 'connected',
    lastSync: 'hace 1 hora',
    type: 'broker'
  },
  {
    id: '4',
    provider: 'Binance',
    accountName: 'Crypto Portfolio',
    accountNumber: 'Wallet principal',
    balance: 8500,
    status: 'error',
    lastSync: 'hace 2 días',
    type: 'crypto'
  }
];

const availableProviders = [
  { id: 'santander', name: 'Banco Santander', type: 'bank' },
  { id: 'bbva', name: 'BBVA', type: 'bank' },
  { id: 'caixabank', name: 'CaixaBank', type: 'bank' },
  { id: 'sabadell', name: 'Banco Sabadell', type: 'bank' },
  { id: 'bankinter', name: 'Bankinter', type: 'bank' },
  { id: 'xtb', name: 'XTB', type: 'broker' },
  { id: 'degiro', name: 'DeGiro', type: 'broker' },
  { id: 'interactive', name: 'Interactive Brokers', type: 'broker' },
  { id: 'binance', name: 'Binance', type: 'crypto' },
  { id: 'coinbase', name: 'Coinbase', type: 'crypto' },
];

export function BankConnections() {
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  const handleSync = (id: string) => {
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, status: 'syncing' as const } : conn
    ));
    // Simulate sync
    setTimeout(() => {
      setConnections(connections.map(conn => 
        conn.id === id ? { ...conn, status: 'connected' as const, lastSync: 'ahora mismo' } : conn
      ));
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
  };

  const getProviderColor = (provider: string) => {
    const colors: Record<string, string> = {
      'Santander': 'text-red-600',
      'BBVA': 'text-blue-600',
      'CaixaBank': 'text-blue-700',
      'XTB': 'text-orange-600',
      'Binance': 'text-yellow-600',
    };
    return colors[provider] || 'text-gray-600';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'bank': 'Banco',
      'broker': 'Bróker',
      'crypto': 'Crypto'
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Conexiones Bancarias y Brókers</h2>
          <p className="text-gray-600">Gestiona tus cuentas conectadas</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Añadir Conexión
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conectar Nueva Cuenta</DialogTitle>
              <DialogDescription>
                Conecta tu banco, bróker o exchange de criptomonedas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Proveedor</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProviders.map(provider => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name} ({getTypeLabel(provider.type)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key / Credenciales</Label>
                <Input id="apiKey" type="password" placeholder="Introduce tu API key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Nombre de la cuenta (opcional)</Label>
                <Input id="accountName" placeholder="ej. Cuenta Principal" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Conectar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total en Bancos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€328,450</div>
            <p className="text-xs text-gray-600 mt-1">{connections.filter(c => c.type === 'bank').length} cuentas conectadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total en Brókers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€15,240</div>
            <p className="text-xs text-gray-600 mt-1">{connections.filter(c => c.type === 'broker').length} cuenta conectada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total en Crypto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">€8,500</div>
            <p className="text-xs text-gray-600 mt-1">{connections.filter(c => c.type === 'crypto').length} exchange conectado</p>
          </CardContent>
        </Card>
      </div>

      {/* Connections List */}
      <Card>
        <CardHeader>
          <CardTitle>Cuentas Conectadas</CardTitle>
          <CardDescription>
            Gestiona y sincroniza tus cuentas bancarias, brókers y exchanges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {connections.map(connection => (
              <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <Building2 className={`h-6 w-6 ${getProviderColor(connection.provider)}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p>{connection.provider} - {connection.accountName}</p>
                      <Badge variant="outline">{getTypeLabel(connection.type)}</Badge>
                      {connection.status === 'connected' && (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                      {connection.status === 'error' && (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{connection.accountNumber}</p>
                    <p className="text-xs text-gray-500">Última sincronización: {connection.lastSync}</p>
                  </div>
                  <div className="text-right">
                    <p>€{connection.balance.toLocaleString()}</p>
                    {connection.status === 'error' && (
                      <p className="text-xs text-red-600">Error de conexión</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSync(connection.id)}
                    disabled={connection.status === 'syncing'}
                  >
                    <RefreshCw className={`h-4 w-4 ${connection.status === 'syncing' ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(connection.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
