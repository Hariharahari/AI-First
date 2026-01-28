import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddOrderModal({ isOpen, onClose }: AddOrderModalProps) {
  const [order, setOrder] = useState({
    customer: '',
    total: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'Pending',
  });

  const addOrder = useStore((state) => state.addOrder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addOrder(order);
      onClose();
      setOrder({
        customer: '',
        total: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Order</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <Input
              id="customer"
              value={order.customer}
              onChange={(e) => setOrder({ ...order, customer: e.target.value })}
              required
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
              Order Total ($)
            </label>
            <Input
              id="total"
              type="number"
              value={order.total}
              onChange={(e) => setOrder({ ...order, total: parseFloat(e.target.value) || 0 })}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Order Date
            </label>
            <Input
              id="date"
              type="date"
              value={order.date}
              onChange={(e) => setOrder({ ...order, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={order.status}
              onChange={(e) => setOrder({ ...order, status: e.target.value as typeof order.status })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
            >
              Add Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}