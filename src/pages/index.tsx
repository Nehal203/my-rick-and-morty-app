import { useFetchData } from '../hooks/useFetchData';
import ErrorBoundary from '../components/ErrorBoundary';
import CharacterList from '../components/CharacterList';
import EpisodeList from '../components/EpisodeList';
import Skeleton from '../components/Skeleton';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from next/link

const Home = () => {
  const { data: episodes, loading, error } = useFetchData('https://rickandmortyapi.com/api/episode');
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [characters, setCharacters] = useState([]);

  const handleSelect = (episodeId: number) => {
    setSelectedEpisode(episodeId);
  };

  useEffect(() => {
    if (selectedEpisode) {
      const fetchCharacters = async () => {
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/episode/${selectedEpisode}`);
          const data = await response.json();
          const characterPromises = data.characters.map((url: string) => fetch(url));
          const characterResponses = await Promise.all(characterPromises);
          const characterData = await Promise.all(characterResponses.map(res => res.json()));
          setCharacters(characterData);
        } catch (err) {
          console.error('Failed to fetch characters', err);
        }
      };
      fetchCharacters();
    }
  }, [selectedEpisode]);

  if (loading) return <Skeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <ErrorBoundary>
      <Navbar />
      <h1 className="text-2xl font-bold text-center my-4">Rick and Morty Episodes</h1>
      <div className="text-center mb-4">
        {/* Link with cursor pointer */}
        <Link href="/episodes" className="text-blue-500 hover:underline cursor-pointer">
          View All Episodes
        </Link>
      </div>
      <EpisodeList episodes={episodes.results} selectedEpisode={selectedEpisode} onSelect={handleSelect} />
      {selectedEpisode && <CharacterList characters={characters} />}
    </ErrorBoundary>
  );
};

export default Home;
