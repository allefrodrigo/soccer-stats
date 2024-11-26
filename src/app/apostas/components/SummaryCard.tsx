'use client';

import React from 'react';

interface SummaryCardProps {
  totalBetAmount: number; // Total de valor apostado (sem contar free bets)
  totalGain: number; // Total de ganhos
}

const SummaryCard: React.FC<SummaryCardProps> = ({ totalBetAmount, totalGain }) => {
  const netProfit = totalGain - totalBetAmount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-orange-100 p-2 rounded-full">
          <span className="text-orange-600 text-xl font-bold">💰</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Resumo de Apostas
        </h2>
      </div>
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {formatCurrency(netProfit)}
      </div>
      <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
        <div>
          <p>Apostas</p>
          <p className="font-bold">{formatCurrency(totalBetAmount)}</p>
        </div>
        <div>
          <p>Ganhos</p>
          <p className="font-bold">{formatCurrency(totalGain)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
