'use client';
import { useEffect, useState, useRef } from "react";
import GameCard from "@/app/components/GameCard";
import { fetchGames } from "@/app/lib/fetchGames";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string | null>(null); // Estado para última sincronização
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const firstLoadDone = useRef(false);

  useEffect(() => {
    // Função para carregar os jogos
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        if (data && data.length > 0) {
          setGames(data);
          setLoading(false);
          firstLoadDone.current = true;

          // Atualiza a última sincronização
          setLastSynced(new Date().toLocaleString());

          // Limpa o timeout de retry caso os dados tenham sido carregados
          if (retryTimeout.current) {
            clearTimeout(retryTimeout.current);
            retryTimeout.current = null;
          }

          // Configura o intervalo para atualizar os jogos a cada 10 segundos
          if (!intervalId.current) {
            intervalId.current = setInterval(loadGames, 10000);
          }
        } else if (!firstLoadDone.current) {
          // Se os dados estiverem vazios e ainda não foi carregado com sucesso
          if (!retryTimeout.current) {
            retryTimeout.current = setTimeout(loadGames, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        // Em caso de erro, tenta novamente após 3 segundos se ainda não carregou
        if (!firstLoadDone.current && !retryTimeout.current) {
          retryTimeout.current = setTimeout(loadGames, 3000);
        }
      }
    };

    // Carrega os jogos inicialmente
    loadGames();

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
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
          Jogos de Hoje
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-8">
          {lastSynced ? `Última sincronização: ${lastSynced}` : "Sincronizando dados..."}
        </p>
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
