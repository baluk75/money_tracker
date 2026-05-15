import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import IncomeManager from './components/IncomeManager';
import ExpenseTracker from './components/ExpenseTracker';
import MonthlyReport from './components/MonthlyReport';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'income':
        return <IncomeManager />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'reports':
        return <MonthlyReport />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;