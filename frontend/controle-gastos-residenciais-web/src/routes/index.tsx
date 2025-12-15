import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Dashboard } from '../pages/Dashboard';
import { Pessoas } from '../pages/Pessoas';
import { Categorias } from '../pages/Categorias';
import { Transacoes } from '../pages/Transacoes';
import { RelatorioPessoas } from '../pages/RelatorioPessoas';
import { RelatorioCategorias } from '../pages/RelatorioCategorias';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/relatorios/pessoas" element={<RelatorioPessoas />} />
        <Route
          path="/relatorios/categorias"
          element={<RelatorioCategorias />}
        />
      </Routes>
    </Layout>
  );
}

