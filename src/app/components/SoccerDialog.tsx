'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import SoccerHeatmap from './Heatmap';

interface SoccerDialogProps {
  open: boolean;
  onClose: () => void;
}

const SoccerDialog: React.FC<SoccerDialogProps> = ({ open, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (dialogRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        const { width, height } = dialogRef.current!.getBoundingClientRect();
        setDimensions({ width, height });
      });

      resizeObserver.observe(dialogRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [dialogRef]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      {/* Ícone de fechar */}
      <IconButton
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
        }}
      >
        X
      </IconButton>

      {/* Conteúdo do Heatmap */}
      <DialogContent
        ref={dialogRef}
        style={{
          padding: 0, // Remove o padding para ocupar todo o espaço
          height: '100%',
        }}
      >
        {dimensions.width > 0 && dimensions.height > 0 && (
          <SoccerHeatmap parentWidth={dimensions.width} parentHeight={dimensions.height} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SoccerDialog;
