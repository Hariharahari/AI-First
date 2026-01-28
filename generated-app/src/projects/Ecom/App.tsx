import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './app/layouts/DashboardLayout';
import ProductsPage from './app/pages/ProductsPage';
import OrdersPage from './app/pages/OrdersPage';
import CustomersPage from './app/pages/CustomersPage';
import AnalyticsPage from './app/pages/AnalyticsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}