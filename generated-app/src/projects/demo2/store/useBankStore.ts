import { create } from 'zustand';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface Payee {
  id: string;
  name: string;
  accountNumber: string;
}

interface Deposit {
  id: string;
  type: 'FD' | 'RD';
  amount: number;
  interestRate: number;
  maturityDate: string;
}

interface Card {
  id: string;
  type: 'credit' | 'debit';
  name: string;
  number: string;
  expiry: string;
  limit?: number;
}

interface User {
  name: string;
  lastLogin: string;
}

interface DashboardData {
  savingsBalance: number;
  totalBalance: number;
  cibilScore: number;
}

interface BankStore {
  user: User;
  dashboard: DashboardData;
  transactions: Transaction[];
  payees: Payee[];
  deposits: Deposit[];
  cards: Card[];
  fetchDashboardData: () => Promise<void>;
}

export const useBankStore = create<BankStore>((set) => ({
  user: {
    name: 'Rohan Sharma',
    lastLogin: new Date().toLocaleString(),
  },
  dashboard: {
    savingsBalance: 125000,
    totalBalance: 250000,
    cibilScore: 785,
  },
  transactions: [
    {
      id: '1',
      date: '2023-05-01',
      description: 'Salary Credit',
      amount: 50000,
      type: 'credit',
    },
    {
      id: '2',
      date: '2023-05-02',
      description: 'Electricity Bill',
      amount: 2500,
      type: 'debit',
    },
  ],
  payees: [
    {
      id: '1',
      name: 'Electricity Board',
      accountNumber: '1234567890',
    },
  ],
  deposits: [
    {
      id: '1',
      type: 'FD',
      amount: 100000,
      interestRate: 7.5,
      maturityDate: '2025-05-01',
    },
  ],
  cards: [
    {
      id: '1',
      type: 'credit',
      name: 'Rohan Sharma',
      number: '**** **** **** 1234',
      expiry: '12/25',
      limit: 100000,
    },
    {
      id: '2',
      type: 'debit',
      name: 'Rohan Sharma',
      number: '**** **** **** 5678',
      expiry: '06/24',
    },
  ],
  fetchDashboardData: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      ...state,
      dashboard: {
        ...state.dashboard,
        savingsBalance: state.dashboard.savingsBalance + 1000, // Simulate balance update
      }
    }));
  },
}));