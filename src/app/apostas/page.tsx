'use client';

import React, { useEffect, useState } from 'react';
import BetCard from './components/BetCard';
import SummaryCard from './components/SummaryCard';

interface Bet {
  id: number;
  date: string; // Formato: "21/11/2024"
  match: string;
  betAmount: number;
  status: 'Perdida' | 'Ganhou' | 'Cash Out' | 'Andamento';
  gain: number;
  isFreeBet?: boolean;
}

const Apostas: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await import('./data/bets.json');
      const betsData = (response.default || response) as Bet[];

      // Mapeia e ordena os dados
      const parsedBets: Bet[] = betsData
        .map((bet) => ({
          ...bet,
          status: bet.status as 'Perdida' | 'Ganhou' | 'Cash Out' | 'Andamento',
        }))
        .sort((a, b) => {
          // Converte a data para o formato YYYY/MM/DD para facilitar a comparação
          const dateA = new Date(a.date.split('/').reverse().join('-'));
          const dateB = new Date(b.date.split('/').reverse().join('-'));
          return dateB.getTime() - dateA.getTime(); // Ordena da mais recente para a mais antiga
        });

      setBets(parsedBets);
    };

    fetchData();
  }, []);

  // Cálculo do resumo
  const totalBetAmount = bets
    .filter((bet) => !bet.isFreeBet) // Exclui free bets
    .reduce((total, bet) => total + bet.betAmount, 0);

  const totalProfit = bets
    .filter((bet) => bet.status === 'Ganhou' || bet.status === 'Cash Out') // Lucro só em ganhos ou cash out
    .reduce((total, bet) => total + (bet.gain - bet.betAmount), 0);

  const totalLost = bets
    .filter((bet) => bet.status === 'Perdida') // Considera apenas as apostas perdidas
    .reduce((total, bet) => total + bet.betAmount, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          LBR BETS
        </h1>

        {/* Resumo */}
        <div className="mb-6">
          <SummaryCard
            totalBetAmount={totalBetAmount}
            totalProfit={totalProfit}
            totalLost={totalLost}
          />
        </div>

        {/* Lista de Apostas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bets.map((bet) => (
            <BetCard
              key={bet.id}
              date={bet.date}
              match={bet.match}
              betAmount={bet.betAmount}
              status={bet.status}
              gain={bet.gain}
              isFreeBet={bet.isFreeBet}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apostas;
