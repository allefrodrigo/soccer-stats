'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

interface Point {
  x: number;
  y: number;
}

const SoccerHeatmap = ({ parentWidth, parentHeight }: { parentWidth: number; parentHeight: number }) => {
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

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, parentWidth]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, parentHeight]);

  // Gerar contornos de densidade
  const density = d3
    .contourDensity<Point>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .size([parentWidth, parentHeight])
    .bandwidth(20)(points); // Ajuste o bandwidth para suavidade

  const colorScale = d3
    .scaleSequential(d3.interpolateYlOrRd)
    .domain([0, d3.max(density, (d) => d.value) || 1]);

  return (
    <svg width={parentWidth} height={parentHeight}>
      {/* Campo de Futebol */}
      <rect x={0} y={0} width={parentWidth} height={parentHeight} fill="#2b2b2b" />
      <rect x={parentWidth / 2 - 1} y={0} width={2} height={parentHeight} fill="#ffffff" />
      <circle cx={parentWidth / 2} cy={parentHeight / 2} r={50} stroke="#ffffff" fill="none" />
      
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
