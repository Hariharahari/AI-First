import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { Landmark, IndianRupee, Eye, EyeOff } from 'lucide-react';

const DUMMY_ACCOUNTS = [
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
];

export default function AccountsPage() {
  const accounts = useBankingStore((state) => state.accounts);
  const displayAccounts = accounts?.length ? accounts : DUMMY_ACCOUNTS;
  const [showBalances, setShowBalances] = useState(false);

  const toggleBalances = () => setShowBalances(!showBalances);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Your Accounts</h1>
        <button
          onClick={toggleBalances}
          className="flex items-center space-x-1 text-orange-500 hover:text-orange-600"
        >
          {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          <span className="text-sm">{showBalances ? 'Hide balances' : 'Show balances'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayAccounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Landmark className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Account Type</div>
                  <div className="font-medium text-gray-800">{account.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Account Number</div>
                  <div className="font-medium text-gray-800">{account.maskedNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Available Balance</div>
                  <div className="text-2xl font-bold text-orange-500">
                    {showBalances ? `₹${account.balance.toLocaleString()}` : '••••••••'}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}