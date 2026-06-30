import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import Orders from './Orders';
import Transactions from './Transactions';
import Help from './Help';

const AccountDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('orders');

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders />;
      case 'transactions':
        return <Transactions />;
      case 'help':
        return <Help />;
      default:
        return <Orders />;
    }
  };

  const tabs = ['orders', 'transactions', 'help', 'logout'];

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:flex">
      <div className="md:w-1/4 bg-gray-100 p-6">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-soydeli-lime to-soydeli-gold-dark rounded-full flex items-center justify-center text-white text-4xl font-black mx-auto">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
        <nav className="flex flex-col space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => (tab === 'logout' ? logout() : setActiveTab(tab))}
              className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-soydeli-gold text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}>
              {tab.replace('-', ' & ')}
            </button>
          ))}
        </nav>
      </div>
      <div className="md:w-3/4 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountDashboard;
