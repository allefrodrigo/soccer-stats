'use client';

import React from 'react';

interface SummaryCardProps {
  totalBetAmount: number; // Total de valor apostado (sem contar free bets)
  totalProfit: number; // Total de lucros (ganho líquido das apostas)
  totalLost: number; // Total perdido
}

const SummaryCard: React.FC<SummaryCardProps> = ({ totalBetAmount, totalProfit, totalLost }) => {
  const netProfit = totalProfit;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-4">
      {/* Tag informativa */}
      <div className="mb-4">
        <p className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
          Card em construção — Dados contidos nele podem não refletir a realidade.
        </p>
      </div>

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
          <p>Lucro</p>
          <p className="font-bold">{formatCurrency(totalProfit)}</p>
        </div>
        <div>
          <p>Perdido</p>
          <p className="font-bold">{formatCurrency(totalLost)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
