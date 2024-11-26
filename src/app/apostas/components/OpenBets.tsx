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
    <div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Apostas em Andamento
      </h3>
      <div className="flex flex-wrap gap-2">
        {openBets.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Nenhuma aposta em andamento no momento.
          </p>
        ) : (
          openBets.map((id) => (
            <a
              key={id}
              href={`https://br.betano.com/mybets/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white text-sm font-semibold rounded-full shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition"
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
