import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AccountsPage from './pages/AccountsPage';
import CardsPage from './pages/CardsPage';
import LoansPage from './pages/LoansPage';
import TransactionsPage from './pages/TransactionsPage';
import FundTransferPage from './pages/FundTransferPage';
import ServicesPage from './pages/ServicesPage';
import ProfilePage from './pages/ProfilePage';
import ComingSoon from './pages/ComingSoon';
import ChequeBookRequestPage from './pages/services/ChequeBookRequestPage';
import UpdateAddressPage from './pages/services/UpdateAddressPage';
import UpdateEmailPage from './pages/services/UpdateEmailPage';

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bank-accounts" element={<AccountsPage />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="loans" element={<LoansPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="fund-transfer" element={<FundTransferPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/cheque-book-request" element={<ChequeBookRequestPage />} />
            <Route path="services/update-address" element={<UpdateAddressPage />} />
            <Route path="services/update-email" element={<UpdateEmailPage />} />
            <Route path="deposits" element={<ComingSoon />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
    </Router>
  );
}