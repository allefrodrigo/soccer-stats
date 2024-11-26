'use client';
import { useEffect, useState, useRef } from "react";
import GameCard from "@/app/components/GameCard";
import { fetchGames } from "@/app/lib/fetchGames";


export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Função para carregar os jogos
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        if (data && data.length > 0) {
          setGames(data);
          setLoading(false);
          // Limpa o timeout de retry caso os dados tenham sido carregados
          if (retryTimeout.current) {
            clearTimeout(retryTimeout.current);
            retryTimeout.current = null;
          }
        } else {
          // Se os dados estiverem vazios, tenta novamente após 3 segundos
          if (!retryTimeout.current) {
            retryTimeout.current = setTimeout(loadGames, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        // Em caso de erro, tenta novamente após 3 segundos
        if (!retryTimeout.current) {
          retryTimeout.current = setTimeout(loadGames, 3000);
        }
      }
    };

    // Carrega os jogos inicialmente
    loadGames();

    // Configura o intervalo para atualizar os jogos a cada 10 segundos
    intervalId.current = setInterval(loadGames, 10000);

    // Cleanup na desmontagem do componente
    return () => {
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Jogos de Hoje
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              championship={game.championship}
              teamHome={game.teamInitialsHome}
              teamAway={game.teamInitialsAway}
              gameTime={game.gameTime}
              goalsHome={game.goalsHome}
              goalsAway={game.goalsAway}
              teamUrlLogoHome={game.teamUrlLogoHome}
              teamUrlLogoAway={game.teamUrlLogoAway}
              realtime={game.realtime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
