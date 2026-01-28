import { Button } from '@heroui/react';
import { User, Mail, Phone } from 'lucide-react';

export default function CustomersPage() {
  const customers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      orders: 5,
      totalSpent: 999.95
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      orders: 3,
      totalSpent: 499.97
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 (555) 345-6789",
      orders: 8,
      totalSpent: 1999.92
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 456-7890",
      orders: 2,
      totalSpent: 299.98
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 (555) 567-8901",
      orders: 6,
      totalSpent: 1499.94
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button className="bg-black text-white hover:bg-gray-800">
          Add Customer
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3 text-gray-400" />
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {customer.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.totalSpent.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}