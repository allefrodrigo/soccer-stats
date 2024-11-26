'use client';

import React from 'react';

interface BetCardProps {
  date: string;
  match: string;
  betAmount: number;
  status: 'Perdida' | 'Ganhou' | 'Cash Out' | 'Andamento';
  gain: number;
  isFreeBet?: boolean; // Propriedade opcional para indicar se é uma Free Bet
}

const BetCard: React.FC<BetCardProps> = ({
  date,
  match,
  betAmount,
  status,
  gain,
  isFreeBet = false, // Valor padrão
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Classes de cor para o card
  const cardClass = {
    Perdida: 'bg-white dark:bg-gray-800',
    Ganhou: 'bg-green-50 dark:bg-green-900',
    'Cash Out': 'bg-blue-50 dark:bg-blue-900',
    Andamento: 'bg-yellow-50 dark:bg-yellow-900',
  };

  return (
    <div
      className={`max-w-md w-full shadow-md rounded-lg overflow-hidden p-4 ${cardClass[status]}`}
    >
      <div className="flex justify-between items-center mb-2">
        {/* Match e Free Bet */}
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 truncate">
            {match}
          </h2>
          {isFreeBet && (
            <span className="px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded">
              Free Bet
            </span>
          )}
        </div>
        {/* Status */}
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded ${
            status === 'Ganhou' || status === 'Cash Out'
              ? 'text-green-800 bg-green-100'
              : 'text-red-800 bg-red-100'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        <p>{date}</p>
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300">
        <p>
          <strong>Aposta:</strong> {formatCurrency(betAmount)}
        </p>
        <p>
          <strong>Ganhos:</strong> {formatCurrency(gain)}
        </p>
      </div>

      {/* Botão Compartilhar */}
      <div className="flex justify-end mt-3">
        <button className="text-blue-500 hover:underline text-xs font-medium">
          Compartilhar
        </button>
      </div>
    </div>
  );
};

export default BetCard;
