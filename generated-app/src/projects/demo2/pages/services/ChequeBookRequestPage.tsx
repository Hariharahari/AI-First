import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { Button } from '@heroui/react';
import { BookOpen, CreditCard, Calendar, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBankingStore } from '../../store/useBankingStore';

export default function ChequeBookRequestPage() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    chequeBookType: '25 leaves',
    deliveryAddress: 'registered',
    customAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const accounts = useBankingStore((state) => state.accounts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Cheque book request submitted successfully! You will receive it within 7 working days.');
      navigate('/services');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <BookOpen className="h-7 w-7 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">Cheque Book Request</h1>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Select Account
              </label>
              <select
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.accountNumber}>
                    {account.name} ({account.maskedNumber}) - ₹{account.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cheque Book Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chequeBookType"
                    value="25 leaves"
                    checked={formData.chequeBookType === '25 leaves'}
                    onChange={handleChange}
                    className="mr-2 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">25 leaves (Standard)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chequeBookType"
                    value="50 leaves"
                    checked={formData.chequeBookType === '50 leaves'}
                    onChange={handleChange}
                    className="mr-2 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">50 leaves</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chequeBookType"
                    value="100 leaves"
                    checked={formData.chequeBookType === '100 leaves'}
                    onChange={handleChange}
                    className="mr-2 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">100 leaves</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value="registered"
                    checked={formData.deliveryAddress === 'registered'}
                    onChange={handleChange}
                    className="mr-2 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Registered address</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    value="custom"
                    checked={formData.deliveryAddress === 'custom'}
                    onChange={handleChange}
                    className="mr-2 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Custom address</span>
                </label>
              </div>

              {formData.deliveryAddress === 'custom' && (
                <div className="mt-4">
                  <label htmlFor="customAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Address
                  </label>
                  <textarea
                    id="customAddress"
                    name="customAddress"
                    value={formData.customAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your custom delivery address"
                  />
                </div>
              )}
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-medium text-orange-800 mb-2 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2" />
                Important Information
              </h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Cheque book will be delivered within 7 working days</li>
                <li>• Standard delivery charges apply for custom addresses</li>
                <li>• First cheque book is free for new accounts</li>
                <li>• Ensure your address is correct to avoid delivery issues</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={() => navigate('/services')}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Request Cheque Book'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}