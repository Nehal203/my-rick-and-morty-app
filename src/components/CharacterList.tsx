import React from 'react';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {characters.map((character) => (
        <div key={character.id} className="border p-4 rounded shadow hover:shadow-lg transition">
          <img src={character.image} alt={character.name} className="w-full h-40 object-cover rounded" />
          <h2 className="text-center mt-2 font-semibold">{character.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
