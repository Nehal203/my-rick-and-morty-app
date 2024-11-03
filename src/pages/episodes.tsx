import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CharacterList from '../components/CharacterList';
import Navbar from '../components/Navbar';

interface Character {
  id: number;
  name: string;
  image: string;
  // Include other properties as needed
}

const EpisodePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get episode id from URL
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!id) return; // Ensure 'id' is available before proceeding

    const fetchCharacters = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched Episode Data:', data);

        // Validate if characters exist
        if (!data.characters || data.characters.length === 0) {
          throw new Error('No characters found for this episode');
        }

        // Fetch each character's data
        const characterPromises = data.characters.map((url: string) => fetch(url));
        const characterResponses = await Promise.all(characterPromises);

        // Fetch character data with type assertion
        const characterData: Character[] = await Promise.all(
          characterResponses.map((res) => res.json())
        );
        console.log('Fetched Characters Data:', characterData);

        setCharacters(characterData);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to fetch characters: ${err.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [id]);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <h1>Characters from Episode {id}</h1>
      <CharacterList characters={characters} />
    </div>
  );
};

export default EpisodePage;
