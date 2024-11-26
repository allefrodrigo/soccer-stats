'use client';

import React from 'react';
import OpenBetsCard from './OpenBets';

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
    <div className="w-full bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6 flex">
      {/* Resumo de Apostas */}
      <div className="flex-1 pr-4">
        <div className="mb-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1">
            Card em construção — Dados contidos nele podem não refletir a realidade.
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-300 dark:bg-gray-700 p-3 rounded-full">
              <span className="text-black dark:text-white text-2xl font-bold">💰</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Resumo de Apostas
            </h2>
          </div>
        </div>

        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {formatCurrency(netProfit)}
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
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

      {/* Separador vertical */}
      <div className="w-px bg-gray-300 dark:bg-gray-700"></div>

      {/* Apostas em Andamento */}
      <div className="flex-1 pl-4">
        <OpenBetsCard />
      </div>
    </div>
  );
};

export default SummaryCard;
