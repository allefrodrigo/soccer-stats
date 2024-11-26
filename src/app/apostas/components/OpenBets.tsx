'use client';

import React, { useEffect, useState } from 'react';

const OpenBetsCard: React.FC = () => {
  const [openBets, setOpenBets] = useState<number[]>([]);

  useEffect(() => {
    const fetchOpenBets = async () => {
      const response = await import('../data/open.json');
      setOpenBets(response.default || response);
    };

    fetchOpenBets();
  }, []);

  return (
    <div className="w-full rounded-lg p-4">
      <h3 className="text-lg font-bold text-black mb-4">Apostas em Andamento</h3>
      <div className="flex flex-wrap gap-2">
        {openBets.length === 0 ? (
          <p className="text-sm text-gray-700">Nenhuma aposta em andamento no momento.</p>
        ) : (
          openBets.map((id) => (
            <a
              key={id}
              href={`https://br.betano.com/mybets/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full shadow hover:bg-gray-800 transition"
            >
              {id}
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default OpenBetsCard;
