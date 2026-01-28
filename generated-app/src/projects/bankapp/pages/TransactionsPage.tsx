import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { ArrowRightLeft, IndianRupee } from 'lucide-react';

const DUMMY_TRANSACTIONS = [
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
    description: 'Netflix Subscription',
    referenceId: 'NET05235678',
    amount: 999,
    type: 'debit'
  },
  {
    id: '3',
    date: '2023-05-13',
    description: 'UPI Transfer to Friend',
    referenceId: 'UPI05239012',
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
];

export default function TransactionsPage() {
  const transactions = useBankingStore((state) => state.transactions);
  const displayTransactions = transactions?.length ? transactions : DUMMY_TRANSACTIONS;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Recent Transactions</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.referenceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'} ₹{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}