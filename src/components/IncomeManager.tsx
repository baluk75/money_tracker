import React, { useState } from 'react';
import { DollarSign, Plus, Edit2 } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/storage';

const IncomeManager: React.FC = () => {
  const { currentMonth, getCurrentMonthData, updateIncome } = useFinance();
  const monthData = getCurrentMonthData();
  const [isEditing, setIsEditing] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState(monthData.income.toString());

  const handleSave = () => {
    const amount = parseFloat(incomeAmount) || 0;
    updateIncome(currentMonth, amount);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIncomeAmount(monthData.income.toString());
    setIsEditing(false);
  };

  const formatMonthYear = (monthStr: string) => {
    const [year, month] = monthStr.split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Monthly Income</h2>
              <p className="text-sm text-gray-500">
                {formatMonthYear(currentMonth)}
              </p>
            </div>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {monthData.income > 0 ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{monthData.income > 0 ? 'Edit' : 'Add'} Income</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="income"
                  value={incomeAmount}
                  onChange={(e) => setIncomeAmount(e.target.value)}
                  className="block w-full pl-7 pr-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Income
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {monthData.income > 0 ? (
              <div>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(monthData.income)}
                </p>
                <p className="text-gray-500">Monthly income set for {formatMonthYear(currentMonth)}</p>
              </div>
            ) : (
              <div>
                <p className="text-xl text-gray-500 mb-2">No income set</p>
                <p className="text-sm text-gray-400">
                  Add your monthly income to start tracking your finances
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {monthData.income > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Income Management Tips</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Include all sources of income: salary, freelance, investments, etc.</p>
            <p>• Update your income monthly if it varies</p>
            <p>• Consider setting up automatic expense tracking once income is set</p>
            <p>• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeManager;