import { create } from 'zustand';

type ProductStatus = "Active" | "Draft";
type OrderStatus = "Paid" | "Pending";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
}

interface Order {
  id: string;
  customer: string;
  total: number;
  date: string;
  status: OrderStatus;
}

interface Stats {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
}

interface StoreState {
  products: Product[];
  orders: Order[];
  stats: Stats;
  addProduct: (product: Omit<Product, 'id'>) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateStats: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  products: [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      stock: 50,
      status: "Active",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 199.99,
      stock: 30,
      status: "Active",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 59.99,
      stock: 75,
      status: "Draft",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "4",
      name: "Laptop Backpack",
      price: 49.99,
      stock: 20,
      status: "Active",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "5",
      name: "Wireless Charger",
      price: 29.99,
      stock: 100,
      status: "Active",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    },
  ],
  orders: [
    {
      id: "1",
      customer: "John Doe",
      total: 199.98,
      date: "2023-10-01",
      status: "Paid",
    },
    {
      id: "2",
      customer: "Jane Smith",
      total: 99.99,
      date: "2023-10-02",
      status: "Pending",
    },
    {
      id: "3",
      customer: "Robert Johnson",
      total: 299.97,
      date: "2023-10-03",
      status: "Paid",
    },
    {
      id: "4",
      customer: "Emily Davis",
      total: 149.98,
      date: "2023-10-04",
      status: "Paid",
    },
    {
      id: "5",
      customer: "Michael Brown",
      total: 59.99,
      date: "2023-10-05",
      status: "Pending",
    },
  ],
  stats: {
    totalSales: 12000,
    totalOrders: 450,
    averageOrderValue: 266.67,
  },
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    set((state) => ({
      products: [...state.products, newProduct],
    }));
    get().updateStats();
  },
  addOrder: (order) => {
    const newOrder = {
      ...order,
      id: Date.now().toString(),
    };
    set((state) => ({
      orders: [...state.orders, newOrder],
    }));
    get().updateStats();
  },
  updateStats: () => {
    set((state) => {
      const totalSales = state.orders.reduce((sum, order) => sum + order.total, 0);
      const totalOrders = state.orders.length;
      const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

      return {
        stats: {
          totalSales,
          totalOrders,
          averageOrderValue,
        },
      };
    });
  },
}));