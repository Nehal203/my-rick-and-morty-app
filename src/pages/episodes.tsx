import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CharacterList from '../components/CharacterList';
import Navbar from '../components/Navbar';

const EpisodePage = () => {
  const router = useRouter();
  const { id } = router.query; // Get episode id from URL
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (id) {
      const fetchCharacters = async () => {
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
          const data = await response.json();
          const characterPromises = data.characters.map((url) => fetch(url));
          const characterResponses = await Promise.all(characterPromises);
          const characterData = await Promise.all(characterResponses.map(res => res.json()));
          setCharacters(characterData);
        } catch (err) {
          setError('Failed to fetch characters');
        } finally {
          setLoading(false);
        }
      };

      fetchCharacters();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
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
