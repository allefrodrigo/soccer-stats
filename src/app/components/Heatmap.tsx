'use client';

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

interface Point {
  x: number;
  y: number;
}

const SoccerHeatmap = () => {
  const width = 800;
  const height = 500;

  // Estado para os pontos
  const [points, setPoints] = useState<Point[]>([]);

  // Gerar pontos de exemplo para simular dados dinâmicos
  useEffect(() => {
    const generateRandomPoints = () => {
      const newPoints: Point[] = Array.from({ length: 500 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
      setPoints(newPoints);
    };

    generateRandomPoints();
  }, []);

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);

  // Gerar contornos de densidade
  const density = d3
    .contourDensity<Point>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .size([width, height])
    .bandwidth(20)(points); // Ajuste o bandwidth para suavidade

  const colorScale = d3
    .scaleSequential(d3.interpolateYlOrRd)
    .domain([0, d3.max(density, (d) => d.value) || 1]);

  return (
    <svg width={width} height={height}>
      {/* Campo de Futebol */}
      <rect x={0} y={0} width={width} height={height} fill="#2b2b2b" />
      <rect x={width / 2 - 1} y={0} width={2} height={height} fill="#ffffff" />
      <circle cx={width / 2} cy={height / 2} r={50} stroke="#ffffff" fill="none" />
      
      {/* Densidade */}
      {density.map((contour, index) => (
        <path
          key={index}
          d={d3.geoPath()(contour) || ''}
          fill={colorScale(contour.value)}
          stroke="none"
          opacity={0.8}
        />
      ))}

      {/* Pontos (opcional, para visualização) */}
      {points.map((point, index) => (
        <circle
          key={index}
          cx={xScale(point.x)}
          cy={yScale(point.y)}
          r={2}
          fill="#00ff00"
          opacity={0.7}
        />
      ))}
    </svg>
  );
};

export default SoccerHeatmap;
