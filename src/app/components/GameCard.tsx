import Image from "next/image";

interface GameCardProps {
  championship: string;
  teamHome: string;
  teamAway: string;
  gameTime: string;
  goalsHome: number | null;
  goalsAway: number | null;
  teamUrlLogoHome: string;
  teamUrlLogoAway: string;
  realtime?: boolean;
}

export default function GameCard({
  championship,
  teamHome,
  teamAway,
  gameTime,
  goalsHome,
  goalsAway,
  teamUrlLogoHome,
  teamUrlLogoAway,
  realtime = false,
}: GameCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      {/* Campeonato */}
      <h3 className="text-sm font-bold text-center text-gray-700 dark:text-gray-300 mb-2">
        {championship}
      </h3>
      {/* Times */}
      <div className="flex items-center justify-between">
        {/* Time da Casa */}
        <div className="flex flex-col items-center">
          <Image
            src={teamUrlLogoHome}
            alt={teamHome}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {teamHome}
          </span>
        </div>

        {/* Placar */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {goalsHome !== null ? goalsHome : "0"} -{" "}
            {goalsAway !== null ? goalsAway : "0"}
          </p>
          <span
            className={`text-sm ${
              realtime
                ? "text-red-500 font-semibold"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {gameTime}
          </span>
        </div>

        {/* Time Adversário */}
        <div className="flex flex-col items-center">
          <Image
            src={teamUrlLogoAway}
            alt={teamAway}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {teamAway}
          </span>
        </div>
      </div>
    </div>
  );
}
