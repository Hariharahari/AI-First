import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { Button } from '@heroui/react';
import { IndianRupee, ArrowRightLeft } from 'lucide-react';

export default function FundTransferPage() {
  const [payeeName, setPayeeName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const accounts = useBankingStore((state) => state.accounts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to your transfer API
    console.log('Transfer initiated:', {
      payeeName,
      accountNumber,
      amount,
      fromAccount: selectedAccount
    });
    alert('Fund transfer initiated successfully!');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">Initiate Fund Transfer</h1>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="payeeName" className="block text-sm font-medium text-gray-700 mb-1">
                Payee Name
              </label>
              <input
                type="text"
                id="payeeName"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (INR)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  min="1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="debitFrom" className="block text-sm font-medium text-gray-700 mb-1">
                Debit From
              </label>
              <select
                id="debitFrom"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select Account</option>
                {accounts?.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.accountNumber}) - ₹{account.balance?.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Proceed to Pay
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}