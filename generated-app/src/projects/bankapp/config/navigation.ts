import {
  Home,
  Landmark,
  IndianRupee,
  CreditCard,
  FileText,
  User,
  HelpCircle,
  ArrowRightLeft,
  List,
  Wallet,
  Shield,
} from 'lucide-react';

export const navigationConfig = [
  {
    title: 'Overview',
    path: '/',
    icon: Home,
  },
  {
    title: 'Bank Accounts',
    icon: Landmark,
    subItems: [
      {
        title: 'Accounts',
        path: '/bank-accounts',
        icon: ArrowRightLeft,
      },
      {
        title: 'Deposits',
        path: '/deposits',
        icon: Wallet,
      },
    ],
  },
  {
    title: 'Payments',
    icon: IndianRupee,
    subItems: [
      {
        title: 'Fund Transfer',
        path: '/fund-transfer',
        icon: ArrowRightLeft,
      },
      {
        title: 'Transactions',
        path: '/transactions',
        icon: List,
      },
    ],
  },
  {
    title: 'Cards',
    path: '/cards',
    icon: CreditCard,
  },
  {
    title: 'Loans',
    path: '/loans',
    icon: Wallet,
  },
  {
    title: 'Services',
    path: '/services',
    icon: HelpCircle,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
  },
];