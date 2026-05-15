import { Category } from '../types';

export const defaultCategories: Category[] = [
  // Income categories
  { id: 'salary', name: 'Salary', icon: 'Briefcase', color: 'bg-green-500', type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: 'Users', color: 'bg-emerald-500', type: 'income' },
  { id: 'investment', name: 'Investment', icon: 'TrendingUp', color: 'bg-teal-500', type: 'income' },
  { id: 'other-income', name: 'Other Income', icon: 'PlusCircle', color: 'bg-green-600', type: 'income' },
  
  // Expense categories
  { id: 'food', name: 'Food & Dining', icon: 'UtensilsCrossed', color: 'bg-orange-500', type: 'expense' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: 'bg-pink-500', type: 'expense' },
  { id: 'transportation', name: 'Transportation', icon: 'Car', color: 'bg-blue-500', type: 'expense' },
  { id: 'utilities', name: 'Utilities', icon: 'Zap', color: 'bg-yellow-500', type: 'expense' },
  { id: 'healthcare', name: 'Healthcare', icon: 'Heart', color: 'bg-red-500', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', color: 'bg-purple-500', type: 'expense' },
  { id: 'travel', name: 'Travel', icon: 'Plane', color: 'bg-indigo-500', type: 'expense' },
  { id: 'education', name: 'Education', icon: 'BookOpen', color: 'bg-amber-500', type: 'expense' },
  { id: 'insurance', name: 'Insurance', icon: 'Shield', color: 'bg-gray-500', type: 'expense' },
  { id: 'other-expense', name: 'Other', icon: 'MoreHorizontal', color: 'bg-slate-500', type: 'expense' },
];

export const getCategoryById = (id: string): Category | undefined => {
  return defaultCategories.find(cat => cat.id === id);
};

export const getIncomeCategories = (): Category[] => {
  return defaultCategories.filter(cat => cat.type === 'income');
};

export const getExpenseCategories = (): Category[] => {
  return defaultCategories.filter(cat => cat.type === 'expense');
};