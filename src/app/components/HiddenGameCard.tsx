import React from "react";
import { Eye } from "lucide-react"; // Ícone de restaurar
import Image from "next/image";
interface HiddenGameCardProps {
  teamHome: string;
  teamAway: string;
  teamUrlLogoHome: string;
  teamUrlLogoAway: string;
  onRestore: () => void;
}

export default function HiddenGameCard({
  teamHome,
  teamAway,
  teamUrlLogoHome,
  teamUrlLogoAway,
  onRestore,
}: HiddenGameCardProps) {
  return (
    <div
      className="flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
      onClick={onRestore}
    >
      <div className="flex items-center gap-2">
        <Image src={teamUrlLogoHome} alt={teamHome} className="w-6 h-6 rounded-full" />
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
          {teamHome} vs {teamAway}
        </p>
        <Image src={teamUrlLogoAway} alt={teamAway} className="w-6 h-6 rounded-full" />
      </div>
      <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
    </div>
  );
}
