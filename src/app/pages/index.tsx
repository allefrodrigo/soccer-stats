import { useEffect, useState } from "react";
import GameCard from "@/app/components/GameCard";
import { fetchGames } from "@/app/lib/fetchGames";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadGames() {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    }
    loadGames();
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
