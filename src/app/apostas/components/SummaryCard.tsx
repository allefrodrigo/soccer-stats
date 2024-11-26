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
    <div className="max-w-md w-full bg-gray-100 shadow-md rounded-lg overflow-hidden p-4">
      <div className="mb-4">
        <p className="text-xs text-black px-2 py-1">
          Card em construção — Dados contidos nele podem não refletir a realidade.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-300 p-2 rounded-full">
          <span className="text-black text-xl font-bold">💰</span>
        </div>
        <h2 className="text-lg font-bold text-black">
          Resumo de Apostas
        </h2>
      </div>
      <div className="text-2xl font-bold text-black mb-4">
        {formatCurrency(netProfit)}
      </div>
      <div className="flex justify-between text-sm text-black mb-4">
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

      {/* Apostas em Andamento */}
      <OpenBetsCard />
    </div>
  );
};

export default SummaryCard;
