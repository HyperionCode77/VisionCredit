import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { BankConnections } from './components/BankConnections';
import { Expenses } from './components/Expenses';
import { Analytics } from './components/Analytics';
import { Employees } from './components/Employees';
import { Payroll } from './components/Payroll';
import { TaxCalculator } from './components/TaxCalculator';
import { Reports } from './components/Reports';
import { Button } from './components/ui/button';
import { 
  LayoutDashboard, 
  Building2, 
  Receipt, 
  TrendingUp, 
  Users, 
  Wallet, 
  Calculator, 
  FileText,
  Menu,
  X
} from 'lucide-react';

type Page = 'dashboard' | 'banks' | 'expenses' | 'analytics' | 'employees' | 'payroll' | 'tax' | 'reports';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'banks' as Page, name: 'Conexiones', icon: Building2 },
    { id: 'expenses' as Page, name: 'Gastos', icon: Receipt },
    { id: 'analytics' as Page, name: 'Analíticas', icon: TrendingUp },
    { id: 'employees' as Page, name: 'Empleados', icon: Users },
    { id: 'payroll' as Page, name: 'Nóminas', icon: Wallet },
    { id: 'tax' as Page, name: 'Impuestos', icon: Calculator },
    { id: 'reports' as Page, name: 'Informes', icon: FileText },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'banks':
        return <BankConnections />;
      case 'expenses':
        return <Expenses />;
      case 'analytics':
        return <Analytics />;
      case 'employees':
        return <Employees />;
      case 'payroll':
        return <Payroll />;
      case 'tax':
        return <TaxCalculator />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">VisionCredit</h1>
              <p className="text-xs text-gray-600">Gestión Empresarial</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <p className="text-sm">Mi Empresa S.L.</p>
            <p className="text-xs text-gray-600 mt-1">CIF: B12345678</p>
            <Button variant="outline" className="w-full mt-3" size="sm">
              Configuración
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <p className="text-sm text-gray-600">Bienvenido,</p>
                <p>Administrador</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Balance Total</p>
                <p className="text-xl">€328,450</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
