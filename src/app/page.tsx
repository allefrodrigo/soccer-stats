'use client';
import { useEffect, useState, useRef } from "react";
import GameCard from "@/app/components/GameCard";
import { fetchGames } from "@/app/lib/fetchGames";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const retryTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const firstLoadDone = useRef(false);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        if (data && data.length > 0) {
          const order: Record<string, number> = {
            "1°T": 1,
            "2°T": 1,
            Int: 1,
            "Não Inic.": 2,
            Final: 3,
          };

          const sortedGames = data.sort((a:any, b:any) => {
            const aValue = order[a.gameTime as keyof typeof order] || 4;
            const bValue = order[b.gameTime as keyof typeof order] || 4;
            return aValue - bValue;
          });

          setGames(sortedGames);
          setLoading(false);
          firstLoadDone.current = true;

          setLastSynced(new Date().toLocaleString());

          if (retryTimeout.current) {
            clearTimeout(retryTimeout.current);
            retryTimeout.current = null;
          }

          if (!intervalId.current) {
            intervalId.current = setInterval(loadGames, 10000);
          }
        } else if (!firstLoadDone.current) {
          if (!retryTimeout.current) {
            retryTimeout.current = setTimeout(loadGames, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
        if (!firstLoadDone.current && !retryTimeout.current) {
          retryTimeout.current = setTimeout(loadGames, 3000);
        }
      }
    };

    loadGames();

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
              heatmapProps={{
                idChampionship: game.idChampionship,
                idHome: game.idHome,
                idMatch: game.id,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
