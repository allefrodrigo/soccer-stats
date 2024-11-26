'use client';

import React from 'react';
import OpenBetsCard from './OpenBets';

interface SummaryCardProps {
  totalBetAmount: number; // Total de valor apostado
  totalProfit: number; // Total de ganhos (soma direta dos ganhos)
  totalLost: number; // Total perdido
}

const SummaryCard: React.FC<SummaryCardProps> = ({ totalBetAmount, totalProfit, totalLost }) => {
  const netProfit = totalProfit - totalBetAmount; // Lucro líquido: ganhos - perdas

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden p-6 flex flex-col lg:flex-row">
      {/* Resumo de Apostas */}
      <div className="flex-1 lg:pr-4 mb-4 lg:mb-0">
        <div className="mb-4">
          <p className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1">
            Valor real da carteira somente após conclusão de todas apostas em andamento.
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

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p>Total Apostado</p>
            <p className="font-bold">{formatCurrency(totalBetAmount)}</p>
          </div>
          <div>
            <p>Total de Ganhos</p>
            <p className="font-bold text-green-500">{formatCurrency(totalProfit)}</p>
          </div>
          <div>
            <p>Total Perdido</p>
            <p className="font-bold text-red-500">{formatCurrency(totalBetAmount)}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Lucro Líquido</p>
          <p
            className={`text-2xl font-bold ${
              netProfit >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {formatCurrency(netProfit)}
          </p>
        </div>
      </div>

      {/* Separador responsivo */}
      <div className="hidden lg:block w-px bg-gray-300 dark:bg-gray-700"></div>
      <div className="block lg:hidden h-px bg-gray-300 dark:bg-gray-700 my-4"></div>

      {/* Apostas em Andamento */}
      <div className="flex-1 lg:pl-4">
        <OpenBetsCard />
      </div>
    </div>
  );
};

export default SummaryCard;
