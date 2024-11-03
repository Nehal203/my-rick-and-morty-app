// import { useFetchData } from '../hooks/useFetchData';

// const { data: episodes, loading, error } = useFetchData('https://rickandmortyapi.com/api/episode');
// useFetchData.ts
import { useState, useEffect } from 'react';

export const useFetchData = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
