import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFetchData } from '../hooks/useFetchData';
import ErrorBoundary from '../components/ErrorBoundary';
import CharacterList from '../components/CharacterList';
import EpisodeList from '../components/EpisodeList';
import Skeleton from '../components/Skeleton';
import Navbar from '../components/Navbar';

// Episode ka interface define karte hain
interface Episode {
  id: number;
  name: string;
  air_date: string;
}

// Character ka interface define karte hain
interface Character {
  id: number;
  name: string;
  image: string;
}

// EpisodesData ka interface define karte hain, jo API response ke hisaab se match karega
interface EpisodesData {
  results: Episode[];
}

const Home = () => {
  // useFetchData hook ko bol rahe hain ki `EpisodesData` type ka data expect kar rahe hain
  const { data: episodesData, loading, error } = useFetchData<EpisodesData>('https://rickandmortyapi.com/api/episode');
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  // Jab koi episode select ho, toh uske ID ko set karo
  const handleSelect = (episodeId: number) => {
    setSelectedEpisode(episodeId);
  };

  // Jab bhi selectedEpisode change ho, characters ko fetch karo
  useEffect(() => {
    if (selectedEpisode) {
      const fetchCharacters = async () => {
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/episode/${selectedEpisode}`);
          const data = await response.json();

          // Selected episode ke characters ko fetch karte hain
          const characterPromises = data.characters.map((url: string) => fetch(url));
          const characterResponses = await Promise.all(characterPromises);
          const characterData: Character[] = await Promise.all(characterResponses.map(res => res.json()));
          
          setCharacters(characterData);
        } catch (err) {
          console.error('Failed to fetch characters', err);
        }
      };
      fetchCharacters();
    }
  }, [selectedEpisode]);

  if (loading) return <Skeleton />; // Agar loading ho raha hai toh Skeleton component dikhao
  if (error) return <div>Error: {error}</div>; // Agar error aaye toh error message dikhao

  return (
    <ErrorBoundary>
      <Navbar />
      <h1 className="text-2xl font-bold text-center my-4">Rick and Morty Episodes</h1>
      <div className="text-center mb-4">
        <Link href="/episodes" className="text-blue-500 hover:underline cursor-pointer">
          View All Episodes
        </Link>
      </div>
      {episodesData && (
        <EpisodeList
          episodes={episodesData.results}
          selectedEpisode={selectedEpisode}
          onSelect={handleSelect}
        />
      )}
      {selectedEpisode && <CharacterList characters={characters} />}
    </ErrorBoundary>
  );
};

export default Home;
