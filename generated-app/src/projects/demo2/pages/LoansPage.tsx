import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { useBankingStore } from '../store/useBankingStore';
import { Wallet, IndianRupee, CreditCard, Calendar, Banknote } from 'lucide-react';
import { Button } from '@heroui/react';
import { Modal } from '@heroui/react';

const DUMMY_LOANS = [
  {
    id: '1',
    type: 'Personal Loan',
    amount: 250000,
    remaining: 120000,
    interestRate: 10.5,
    emi: 8500,
    tenure: 36,
    nextEmiDate: '2023-06-05',
    accountNumber: '123456789012'
  },
  {
    id: '2',
    type: 'Car Loan',
    amount: 800000,
    remaining: 400000,
    interestRate: 9.2,
    emi: 15000,
    tenure: 60,
    nextEmiDate: '2023-06-10',
    accountNumber: '234567890123'
  }
];

export default function LoansPage() {
  const loans = useBankingStore((state) => state.loans);
  const displayLoans = loans?.length ? loans : DUMMY_LOANS;
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const openPaymentModal = (loan: any) => {
    setSelectedLoan(loan);
    setPaymentAmount(loan.emi.toString());
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedLoan(null);
    setPaymentSuccess(false);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // In a real app, you would call your payment API here
      console.log('Payment processed:', {
        loanId: selectedLoan.id,
        amount: paymentAmount,
        date: paymentDate,
        account: paymentAccount
      });
    }, 2000);
  };

  const accounts = [
    {
      id: '1',
      name: 'Primary Savings',
      accountNumber: '123456789012',
      balance: 150000
    },
    {
      id: '2',
      name: 'Salary Account',
      accountNumber: '234567890123',
      balance: 75000
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Your Loans</h1>
      <p className="text-gray-600">Manage your loan repayments</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayLoans.map((loan) => (
          <Card key={loan.id}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-800">{loan.type}</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Loan Amount</span>
                  <span className="font-medium text-gray-800">₹{loan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Remaining</span>
                  <span className="font-medium text-gray-800">₹{loan.remaining.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Interest Rate</span>
                  <span className="font-medium text-orange-500">{loan.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Monthly EMI</span>
                  <span className="font-medium text-orange-500">₹{loan.emi.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Next EMI Date</span>
                  <span className="font-medium text-gray-800">{loan.nextEmiDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Paid</span>
                  <span className="text-gray-500">Outstanding</span>
                </div>
                <progress
                  value={loan.amount - loan.remaining}
                  max={loan.amount}
                  className="w-full h-3 rounded-full"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">₹{(loan.amount - loan.remaining).toLocaleString()}</span>
                  <span className="text-gray-500">₹{loan.remaining.toLocaleString()}</span>
                </div>
              </div>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                onClick={() => openPaymentModal(loan)}
              >
                <IndianRupee className="h-4 w-4 mr-2" />
                Pay EMI ₹{loan.emi.toLocaleString()}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isPaymentModalOpen} onClose={closePaymentModal}>
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
          {selectedLoan && (
            <>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Pay EMI</h2>
                <button
                  onClick={closePaymentModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!paymentSuccess ? (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h3 className="font-medium text-orange-800 mb-2">Loan Details</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Type:</span>
                        <span className="font-medium">{selectedLoan.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">EMI Amount:</span>
                        <span className="font-medium">₹{selectedLoan.emi.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next EMI Date:</span>
                        <span className="font-medium">{selectedLoan.nextEmiDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Amount
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        id="paymentAmount"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                        min={selectedLoan.emi}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        id="paymentDate"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="paymentAccount" className="block text-sm font-medium text-gray-700 mb-1">
                      Debit From
                    </label>
                    <select
                      id="paymentAccount"
                      value={paymentAccount}
                      onChange={(e) => setPaymentAccount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.accountNumber}>
                          {account.name} (₹{account.balance.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg text-sm text-yellow-700">
                    <p className="font-medium mb-1">Important:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Ensure you have sufficient balance in the selected account</li>
                      <li>Payment will be processed immediately</li>
                      <li>You will receive a confirmation via email and SMS</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Banknote className="h-4 w-4 mr-2" />
                        Pay ₹{paymentAmount}
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-green-100 rounded-full p-4">
                      <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-600">Payment Successful!</h3>
                  <p className="text-gray-600">Your EMI payment has been processed successfully.</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm text-left">
                    <p className="font-medium mb-1">Payment Details:</p>
                    <p>Amount: ₹{paymentAmount}</p>
                    <p>Date: {paymentDate}</p>
                    <p>From: {accounts.find(a => a.accountNumber === paymentAccount)?.name}</p>
                  </div>
                  <Button
                    onClick={closePaymentModal}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Close
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}