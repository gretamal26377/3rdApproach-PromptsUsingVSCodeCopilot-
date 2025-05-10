// GRL: Not finished yet
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  ShoppingBag,
  Store,
  Users,
  ShoppingCart,
  Package,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';
import AdminProductManagement from '../components/AdminProductManagement';

// ===============================
// Types & Schemas
// ===============================
// User Schema
const userSchema = z.object({
  id: z.number(),
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  isAdmin: z.boolean(),
});

// Store Schema
const storeSchema = z.object({
  id: z.number(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

// Order Schema
const orderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  orderDate: z.date(),
  totalAmount: z.number(),
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number()
  }))            
});

// ===============================
// Mock Data & API Functions
// ===============================
// Mock User Data
let mockUsers: z.infer<typeof userSchema>[] = [
  { id: 1, username: 'admin', email: 'admin@example.com', isAdmin: true },
  { id: 2, username: 'user1', email: 'user1@example.com', isAdmin: false },
  { id: 3, username: 'user2', email: 'user2@example.com', isAdmin: false },
];

// Mock Store Data
let mockStores: z.infer<typeof storeSchema>[] = [
  { id: 1, name: 'Store A', description: 'Description for Store A' },
  { id: 2, name: 'Store B', description: 'Description for Store B' },
];

// Mock Order Data
let mockOrders: z.infer<typeof orderSchema>[] = [
    { id: 1, userId: 1, orderDate: new Date(), totalAmount: 120.50, items: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }] },
    { id: 2, userId: 2, orderDate: new Date(), totalAmount: 50.00, items: [{ productId: 2, quantity: 5 }] },
];

// Mock API Functions (Simulated with delays)
const api = {
  // User API
  getUsers: async (): Promise<z.infer<typeof userSchema>[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUsers;
  },
  getUser: async (id: number): Promise<z.infer<typeof userSchema> | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockUsers.find((user) => user.id === id);
  },
  updateUser: async (id: number, data: Partial<z.infer<typeof userSchema>>): Promise<z.infer<typeof userSchema> | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const userIndex = mockUsers.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...data, id: id }; // Ensure ID is not overwritten
      return mockUsers[userIndex];
    }
    return undefined;
  },
  deleteUser: async (id: number): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    mockUsers = mockUsers.filter((user) => user.id !== id);
    return true;
  },

  // Store API
  getStores: async (): Promise<z.infer<typeof storeSchema>[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockStores;
  },
  getStore: async (id: number): Promise<z.infer<typeof storeSchema> | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockStores.find((store) => store.id === id);
  },
  updateStore: async (id: number, data: Partial<z.infer<typeof storeSchema>>): Promise<z.infer<typeof storeSchema> | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const storeIndex = mockStores.findIndex((store) => store.id === id);
    if (storeIndex > -1) {
      mockStores[storeIndex] = { ...mockStores[storeIndex], ...data, id: id };
      return mockStores[storeIndex];
    }
    return undefined;
  },
  deleteStore: async (id: number): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    mockStores = mockStores.filter((store) => store.id !== id);
    return true;
  },

    // Order API
    getOrders: async (): Promise<z.infer<typeof orderSchema>[]> => {
        await new Promi
