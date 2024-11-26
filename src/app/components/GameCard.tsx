'use client';

import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import SoccerHeatmap from "./Heatmap"; // Importe o componente SoccerHeatmap

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
  heatmapProps: {
    idChampionship: number;
    idHome: number;
    idMatch: number;
  }; // Novas props para o heatmap
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
  heatmapProps,
}: GameCardProps) {
  const [open, setOpen] = useState(false);

  // Determinar o lado vencedor
  const isHomeWinning =
    goalsHome !== null && goalsAway !== null && goalsHome > goalsAway;
  const isAwayWinning =
    goalsHome !== null && goalsAway !== null && goalsAway > goalsHome;

  // Funções para abrir e fechar o Dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      className={`rounded-lg shadow-md p-4 ${
        isHomeWinning
          ? "border-l-4 border-l-green-500"
          : isAwayWinning
          ? "border-r-4 border-r-green-500"
          : "border-transparent"
      } bg-white dark:bg-gray-800`}
    >
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

      {/* Link para abrir o Dialog */}
      <div className="text-center mt-4">
        <button
          onClick={handleOpen}
          className="text-blue-500 hover:underline text-sm font-semibold"
        >
          Ver Heat Map
        </button>
      </div>

      {/* Dialog com o heatmap */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Heatmap do Jogo</DialogTitle>
        <DialogContent>
        <SoccerHeatmap

  />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
