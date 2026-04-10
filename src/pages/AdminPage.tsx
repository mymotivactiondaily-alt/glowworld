import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Download, 
  CheckCircle, 
  XCircle, 
  Lock, 
  LayoutDashboard,
  Clock,
  User,
  Euro,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Translation, Order, DashboardStats } from '../types';

interface AdminPageProps {
  t: Translation;
}

export const AdminPage = ({ t }: AdminPageProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    sessionStorage.getItem('admin_access') === 'true'
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalOrders: 0,
    pendingExports: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Constants from env
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
  const ADMIN_SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_access', 'true');
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/orders', {
        headers: {
          'x-admin-key': ADMIN_SECRET_KEY || ''
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
        
        // Calculate stats
        const total = data.reduce((acc, order) => acc + (order.amount || 0), 0);
        const pending = data.filter(o => !o.exported).length;
        setStats({
          totalSales: total,
          totalOrders: data.length,
          pendingExports: pending
        });
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const handleExport = async () => {
    setExportLoading(true);
    try {
      const response = await fetch('/api/export-csv', {
        method: 'POST',
        headers: {
          'x-admin-key': ADMIN_SECRET_KEY || ''
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `commandes_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Refresh data
        await fetchData();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erreur lors de l’export');
      }
    } catch (err) {
      console.error('Export error:', err);
      alert('Erreur réseau lors de l’export');
    } finally {
      setExportLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <Helmet>
          <title>Admin Login | GlowWorld 2026</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-france-blue/20 rounded-xl">
              <Lock className="w-8 h-8 text-france-blue" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-2">Accès Administrateur</h1>
          <p className="text-slate-400 text-center mb-8">Veuillez saisir votre mot de passe pour continuer.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-france-blue"
                autoFocus
              />
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-france-blue hover:bg-france-blue/90 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24 px-6">
      <Helmet>
        <title>Admin Dashboard | GlowWorld 2026</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <LayoutDashboard className="text-france-blue" />
              Dashboard Admin
            </h1>
            <p className="text-slate-400">Gestion des commandes et performances.</p>
          </div>

          <button
            onClick={handleExport}
            disabled={exportLoading}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
              exportLoading 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-white text-slate-950 hover:scale-105 active:scale-95"
            )}
          >
            {exportLoading ? (
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 animate-spin" />
                Export en cours...
              </span>
            ) : (
              <>
                <FileSpreadsheet className="w-5 h-5" />
                Télécharger CSV des nouvelles commandes
              </>
            )}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            title="Ventes Totales" 
            value={`${stats.totalSales.toFixed(2)}€`} 
            icon={<Euro className="text-france-blue" />}
            subtitle="Chiffre d'affaires brut"
          />
          <StatCard 
            title="Commandes" 
            value={stats.totalOrders} 
            icon={<ShoppingBag className="text-france-red" />}
            subtitle="Total des transactions"
          />
          <StatCard 
            title="Non Exportées" 
            value={stats.pendingExports} 
            icon={<Clock className="text-yellow-500" />}
            subtitle="À traiter pour expédition"
            highlight={stats.pendingExports > 0}
          />
        </div>

        {/* Orders Table */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">20 Dernières Commandes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Produits</th>
                  <th className="px-6 py-4 font-medium">Montant</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Exporté</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {orders.map((order, idx) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-slate-300 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        {order.createdAt?.toDate 
                          ? new Date(order.createdAt.toDate()).toLocaleDateString('fr-FR')
                          : new Date().toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{order.shipping?.name || 'Client'}</span>
                          <span className="text-xs text-slate-500">{order.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs block max-w-xs truncate">
                          {order.items.map(i => `${i.name.fr || i.name} (x${i.qty})`).join(', ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {order.amount}€
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.exported ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {orders.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                      Aucune commande trouvée.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle: string;
  highlight?: boolean;
}

const StatCard = ({ title, value, icon, subtitle, highlight }: StatCardProps) => (
  <div className={cn(
    "p-6 rounded-2xl bg-slate-900 border border-white/10 shadow-lg",
    highlight && "ring-1 ring-yellow-500/50 bg-yellow-500/5"
  )}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-400 font-medium">{title}</span>
      <div className="p-2 bg-white/5 rounded-lg">
        {icon}
      </div>
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs text-slate-500">{subtitle}</div>
  </div>
);
