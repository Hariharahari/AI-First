import { create } from 'zustand';

interface Profile {
  name: string;
  id: string;
  email: string;
  phone: string;
}

interface Account {
  id: string;
  name: string;
  type: 'Savings' | 'Current' | 'Deposit';
  balance: number;
  accountNumber: string;
  maskedNumber: string;
}

interface Card {
  id: string;
  type: 'credit' | 'debit';
  name: string;
  number: string;
  expiry: string;
  variant: 'Coral' | 'Platinum';
}

interface Loan {
  id: string;
  type: 'Home Loan' | 'Personal Loan' | 'Car Loan';
  amount: number;
  remaining: number;
  interestRate: number;
  emi: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  referenceId: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface BankingStore {
  profile: Profile;
  accounts: Account[];
  cards: Card[];
  loans: Loan[];
  transactions: Transaction[];
  services: string[];
}

export const useBankingStore = create<BankingStore>((set) => ({
  profile: {
    name: 'Rohan Sharma',
    id: '8839221',
    email: 'rohan@icici.com',
    phone: '9876543210'
  },
  accounts: [
    {
      id: '1',
      name: 'Primary Savings',
      type: 'Savings',
      balance: 125000,
      accountNumber: '123456789012',
      maskedNumber: 'XXXX XXXX XXXX 7890'
    },
    {
      id: '2',
      name: 'Salary Account',
      type: 'Current',
      balance: 50000,
      accountNumber: '234567890123',
      maskedNumber: 'XXXX XXXX XXXX 8901'
    }
  ],
  cards: [
    {
      id: '1',
      type: 'credit',
      name: 'Rohan Sharma',
      number: '**** **** **** 1234',
      expiry: '12/31',
      variant: 'Coral'
    },
    {
      id: '2',
      type: 'debit',
      name: 'Rohan Sharma',
      number: '**** **** **** 5678',
      expiry: '06/32',
      variant: 'Platinum'
    }
  ],
  loans: [
    {
      id: '1',
      type: 'Home Loan',
      amount: 5000000,
      remaining: 3200000,
      interestRate: 8.5,
      emi: 28500
    },
    {
      id: '2',
      type: 'Personal Loan',
      amount: 250000,
      remaining: 120000,
      interestRate: 10.5,
      emi: 8500
    }
  ],
  transactions: [
    {
      id: '1',
      date: '2023-05-15',
      description: 'Salary Credit',
      referenceId: 'SAL05231234',
      amount: 50000,
      type: 'credit'
    },
    {
      id: '2',
      date: '2023-05-14',
      description: 'Electricity Bill',
      referenceId: 'BIL05235678',
      amount: 2500,
      type: 'debit'
    },
    {
      id: '3',
      date: '2023-05-13',
      description: 'Online Purchase',
      referenceId: 'ONL05239012',
      amount: 15000,
      type: 'debit'
    },
    {
      id: '4',
      date: '2023-05-12',
      description: 'Interest Credit',
      referenceId: 'INT05233456',
      amount: 1250,
      type: 'credit'
    },
    {
      id: '5',
      date: '2023-05-11',
      description: 'Mobile Recharge',
      referenceId: 'MOB05237890',
      amount: 500,
      type: 'debit'
    }
  ],
  services: [
    'Cheque Book Request',
    'Update Address',
    'Generate PIN',
    'Update Email',
    'Request Statement',
    'Add Beneficiary'
  ]
}));