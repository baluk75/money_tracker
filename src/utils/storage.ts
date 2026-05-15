import { MonthlyData, Transaction } from '../types';

const STORAGE_KEY = 'finance-tracker-data';

export const saveData = (data: MonthlyData[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadData = (): MonthlyData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};