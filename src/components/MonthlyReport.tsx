import React from 'react';
import { BarChart3, Calendar, TrendingDown, AlertCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/storage';
import { getCategoryById } from '../utils/categories';

const MonthlyReport: React.FC = () => {
  const { currentMonth, getMonthlyStats, getCurrentMonthData } = useFinance();
  const stats = getMonthlyStats(currentMonth);
  const monthData = getCurrentMonthData();

  const formatMonthYear = (monthStr: string) => {
    const [year, month] = monthStr.split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const categoryBreakdown = Object.entries(stats.categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .map(([categoryId, amount]) => ({
      category: getCategoryById(categoryId),
      amount,
      percentage: (amount / stats.totalExpenses) * 100,
    }));

  const savingsRate = stats.totalIncome > 0 
    ? ((stats.balance / stats.totalIncome) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Monthly Report</h2>
            <p className="text-sm text-gray-500">{formatMonthYear(currentMonth)}</p>
          </div>
        </div>

        {stats.totalIncome === 0 ? (
          <div className="text-center py-12">
            <div className="p-4 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-lg text-gray-500 mb-2">No income set</p>
            <p className="text-sm text-gray-400">
              Add your monthly income to generate comprehensive reports
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">Total Income</p>
                <p className="text-xl font-bold text-green-900">
                  {formatCurrency(stats.totalIncome)}
                </p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm font-medium text-red-800">Total Expenses</p>
                <p className="text-xl font-bold text-red-900">
                  {formatCurrency(stats.totalExpenses)}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${stats.balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`text-sm font-medium ${stats.balance >= 0 ? 'text-blue-800' : 'text-red-800'}`}>
                  Net Balance
                </p>
                <p className={`text-xl font-bold ${stats.balance >= 0 ? 'text-blue-900' : 'text-red-900'}`}>
                  {formatCurrency(stats.balance)}
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${savingsRate >= 20 ? 'bg-green-50 border-green-200' : savingsRate >= 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`text-sm font-medium ${savingsRate >= 20 ? 'text-green-800' : savingsRate >= 0 ? 'text-yellow-800' : 'text-red-800'}`}>
                  Savings Rate
                </p>
                <p className={`text-xl font-bold ${savingsRate >= 20 ? 'text-green-900' : savingsRate >= 0 ? 'text-yellow-900' : 'text-red-900'}`}>
                  {savingsRate.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            {categoryBreakdown.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
                <div className="space-y-3">
                  {categoryBreakdown.map(({ category, amount, percentage }) => (
                    <div key={category?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${category?.color || 'bg-gray-400'}`} />
                        <span className="font-medium text-gray-700">
                          {category?.name || 'Unknown Category'}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(amount)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Health Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health Insights</h3>
              <div className="space-y-3 text-sm">
                {savingsRate >= 20 ? (
                  <div className="flex items-start space-x-2 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <p>Excellent! You're saving {savingsRate.toFixed(1)}% of your income. Keep up the great work!</p>
                  </div>
                ) : savingsRate >= 10 ? (
                  <div className="flex items-start space-x-2 text-yellow-800">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <p>Good savings rate at {savingsRate.toFixed(1)}%. Try to reach 20% for better financial security.</p>
                  </div>
                ) : savingsRate >= 0 ? (
                  <div className="flex items-start space-x-2 text-orange-800">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <p>Low savings rate at {savingsRate.toFixed(1)}%. Consider reducing expenses to increase savings.</p>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2 text-red-800">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <p>You're spending more than you earn. Review your expenses and consider budget adjustments.</p>
                  </div>
                )}
                
                <div className="flex items-start space-x-2 text-blue-800">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <p>You recorded {monthData.transactions.length} transactions this month.</p>
                </div>
                
                {categoryBreakdown.length > 0 && (
                  <div className="flex items-start space-x-2 text-blue-800">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <p>Your top spending category is {categoryBreakdown[0].category?.name} at {categoryBreakdown[0].percentage.toFixed(1)}% of expenses.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;