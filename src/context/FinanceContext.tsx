import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MonthlyData, Transaction, MonthlyStats } from '../types';
import { saveData, loadData, getMonthKey, generateId } from '../utils/storage';
import { getCategoryById } from '../utils/categories';

interface FinanceContextType {
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
  monthlyData: MonthlyData[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateIncome: (month: string, income: number) => void;
  deleteTransaction: (transactionId: string) => void;
  getCurrentMonthData: () => MonthlyData;
  getMonthlyStats: (month: string) => MonthlyStats;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState<string>(getMonthKey(new Date()));
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const data = loadData();
    setMonthlyData(data);
  }, []);

  useEffect(() => {
    saveData(monthlyData);
  }, [monthlyData]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    const month = getMonthKey(new Date(transaction.date));
    
    setMonthlyData(prev => {
      const existingMonthIndex = prev.findIndex(m => m.month === month);
      
      if (existingMonthIndex >= 0) {
        const updated = [...prev];
        updated[existingMonthIndex] = {
          ...updated[existingMonthIndex],
          transactions: [...updated[existingMonthIndex].transactions, newTransaction],
        };
        return updated;
      } else {
        return [...prev, {
          month,
          income: 0,
          transactions: [newTransaction],
        }];
      }
    });
  };

  const updateIncome = (month: string, income: number) => {
    setMonthlyData(prev => {
      const existingMonthIndex = prev.findIndex(m => m.month === month);
      
      if (existingMonthIndex >= 0) {
        const updated = [...prev];
        updated[existingMonthIndex] = {
          ...updated[existingMonthIndex],
          income,
        };
        return updated;
      } else {
        return [...prev, {
          month,
          income,
          transactions: [],
        }];
      }
    });
  };

  const deleteTransaction = (transactionId: string) => {
    setMonthlyData(prev => 
      prev.map(monthData => ({
        ...monthData,
        transactions: monthData.transactions.filter(t => t.id !== transactionId),
      }))
    );
  };

  const getCurrentMonthData = (): MonthlyData => {
    return monthlyData.find(m => m.month === currentMonth) || {
      month: currentMonth,
      income: 0,
      transactions: [],
    };
  };

  const getMonthlyStats = (month: string): MonthlyStats => {
    const data = monthlyData.find(m => m.month === month);
    
    if (!data) {
      return {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        categoryBreakdown: {},
        dailySpending: {},
      };
    }

    const expenses = data.transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    
    const categoryBreakdown: Record<string, number> = {};
    expenses.forEach(transaction => {
      categoryBreakdown[transaction.category] = 
        (categoryBreakdown[transaction.category] || 0) + transaction.amount;
    });

    const dailySpending: Record<string, number> = {};
    expenses.forEach(transaction => {
      const day = transaction.date.split('T')[0];
      dailySpending[day] = (dailySpending[day] || 0) + transaction.amount;
    });

    return {
      totalIncome: data.income,
      totalExpenses,
      balance: data.income - totalExpenses,
      categoryBreakdown,
      dailySpending,
    };
  };

  return (
    <FinanceContext.Provider value={{
      currentMonth,
      setCurrentMonth,
      monthlyData,
      addTransaction,
      updateIncome,
      deleteTransaction,
      getCurrentMonthData,
      getMonthlyStats,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};