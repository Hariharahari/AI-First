import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { CreditCard, IndianRupee, Shield, Activity, Landmark, Eye, EyeOff, Smartphone, Receipt, Send, QrCode } from 'lucide-react';
import { Button } from '@heroui/react';

const QUICK_SERVICES = [
  { name: "Recharge", icon: Smartphone },
  { name: "Pay Bills", icon: Receipt },
  { name: "Send Money", icon: Send },
  { name: "Scan QR", icon: QrCode }
];

export default function Dashboard() {
  const { accounts, loans } = useBankingStore((state) => state);
  const [showBalances, setShowBalances] = useState(false);
  const [showCibil, setShowCibil] = useState(false);

  const toggleBalances = () => setShowBalances(!showBalances);
  const toggleCibil = () => setShowCibil(!showCibil);

  const displayAccounts = accounts?.length ? accounts : [
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

  const displayLoans = loans?.length ? loans : [
    {
      id: '1',
      type: 'Personal Loan',
      amount: 250000,
      remaining: 120000,
      interestRate: 10.5,
      emi: 8500
    },
    {
      id: '2',
      type: 'Car Loan',
      amount: 800000,
      remaining: 400000,
      interestRate: 9.2,
      emi: 15000
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                <Shield className="h-5 w-5 text-orange-500" />
                <span>Quick Services</span>
              </h3>
            </CardHeader>
            <CardBody className="grid grid-cols-2 gap-4">
              {QUICK_SERVICES.map((service) => (
                <Button
                  key={service.name}
                  variant="outline"
                  className="flex flex-col items-center space-y-2 p-4 border-orange-200 hover:bg-orange-50"
                >
                  <service.icon className="h-6 w-6 text-orange-500" />
                  <span className="text-sm text-gray-700">{service.name}</span>
                </Button>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Landmark className="h-5 w-5 text-orange-500" />
                  <span className="text-lg font-semibold text-gray-800">Your Accounts</span>
                </div>
                <button
                  onClick={toggleBalances}
                  className="text-orange-500 hover:text-orange-600"
                  title={showBalances ? 'Hide balances' : 'Show balances'}
                >
                  {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              {displayAccounts.map((account) => (
                <div key={account.id} className="flex justify-between items-center p-3 border rounded-lg border-gray-200 bg-white">
                  <div>
                    <div className="font-medium text-gray-800">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.maskedNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-500">
                      {showBalances ? `₹${account.balance.toLocaleString()}` : '••••••••'}
                    </div>
                    <div className="text-sm text-gray-500">{account.type}</div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  <span>Your Loans</span>
                </h3>
              </CardHeader>
              <CardBody className="space-y-3">
                {displayLoans.map((loan) => (
                  <div key={loan.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-gray-800">{loan.type}</div>
                      <div className="font-bold text-orange-500">₹{loan.emi.toLocaleString()}/mo</div>
                    </div>
                    <div className="text-sm text-gray-500">Remaining: ₹{loan.remaining.toLocaleString()}</div>
                    <progress
                      value={loan.amount - loan.remaining}
                      max={loan.amount}
                      className="w-full h-2 rounded-full"
                    />
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-orange-500" />
                    <span className="text-lg font-semibold text-gray-800">CIBIL Score</span>
                  </div>
                  <button
                    onClick={toggleCibil}
                    className="text-orange-500 hover:text-orange-600"
                    title={showCibil ? 'Hide CIBIL score' : 'Show CIBIL score'}
                  >
                    {showCibil ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </CardHeader>
              <CardBody className="text-center">
                <div className="text-4xl font-bold text-orange-500">
                  {showCibil ? '785' : '•••'}
                </div>
                {showCibil && (
                  <>
                    <div className="text-sm text-gray-600 mt-2">Excellent</div>
                    <div className="text-xs text-gray-400">Last updated: Today</div>
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}