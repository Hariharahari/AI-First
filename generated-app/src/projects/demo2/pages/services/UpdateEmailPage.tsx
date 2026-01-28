import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { Button } from '@heroui/react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UpdateEmailPage() {
  const [formData, setFormData] = useState({
    currentEmail: 'rohan@icici.com',
    newEmail: '',
    confirmEmail: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newEmail !== formData.confirmEmail) {
      setError('Email addresses do not match');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Email updated successfully!');
      navigate('/services');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-bold text-gray-800">Update Email</h1>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Current Email
              </label>
              <input
                type="email"
                id="currentEmail"
                name="currentEmail"
                value={formData.currentEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>

            <div>
              <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-1">
                New Email
              </label>
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Email
              </label>
              <input
                type="email"
                id="confirmEmail"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password (for verification)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

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
                {isSubmitting ? 'Updating...' : 'Update Email'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}