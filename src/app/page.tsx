"use client";

import { useEffect, useState } from "react";
import GameCard from "@/app/components/GameCard";
import HiddenGameCard from "@/app/components/HiddenGameCard";
import { fetchGames } from "@/app/lib/fetchGames";
import { EyeOff } from "lucide-react"; // Ícone de ocultar

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const [hiddenGames, setHiddenGames] = useState<any[]>([]); // Jogos ocultados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    }
    loadGames();
  }, []);

  // Oculta um jogo
  const hideGame = (gameId: number) => {
    const gameToHide = games.find((game) => game.id === gameId);
    setGames(games.filter((game) => game.id !== gameId));
    setHiddenGames([...hiddenGames, gameToHide]);
  };

  // Restaura um jogo ocultado
  const restoreGame = (gameId: number) => {
    const gameToRestore = hiddenGames.find((game) => game.id === gameId);
    setHiddenGames(hiddenGames.filter((game) => game.id !== gameId));
    setGames([...games, gameToRestore]);
  };

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
        {/* Lista de jogos visíveis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.id} className="relative">
              <GameCard
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
              {/* Botão para ocultar */}
              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                onClick={() => hideGame(game.id)}
              >
                <EyeOff className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          ))}
        </div>

         {/* Seção de jogos ocultados */}
         {hiddenGames.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                Jogos Ocultados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                {hiddenGames.map((game) => (
                  <HiddenGameCard
                    key={game.id}
                    teamHome={game.teamInitialsHome}
                    teamAway={game.teamInitialsAway}
                    teamUrlLogoHome={game.teamUrlLogoHome}
                    teamUrlLogoAway={game.teamUrlLogoAway}
                    onRestore={() => restoreGame(game.id)}
                  />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
