import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    stock: 0,
    status: 'Active',
    image: '',
  });

  const addProduct = useStore((state) => state.addProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addProduct(product);
      onClose();
      setProduct({
        name: '',
        price: 0,
        stock: 0,
        status: 'Active',
        image: '',
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Product</h2>
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <Input
              id="price"
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <Input
              id="stock"
              type="number"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) || 0 })}
              required
              min="0"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={product.status}
              onChange={(e) => setProduct({ ...product, status: e.target.value as typeof product.status })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <Input
              id="image"
              value={product.image}
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
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
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}