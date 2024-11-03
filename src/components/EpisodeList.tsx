import React from 'react';
import { useRouter } from 'next/router';

interface Episode {
  id: number;
  name: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  selectedEpisode: number | null;
  onSelect: (episodeId: number) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, selectedEpisode, onSelect }) => {
  const router = useRouter();

  const handleSelect = (episodeId: number) => {
    onSelect(episodeId);
    router.push(`/episodes?id=${episodeId}`); // Navigate to episode page
  };

  return (
    <ul>
      {episodes.map((episode) => (
        <li
          key={episode.id}
          onClick={() => handleSelect(episode.id)}
          className={`cursor-pointer p-2 my-1 rounded transition-all duration-200 ease-in-out ${
            selectedEpisode === episode.id ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          style={{
            border: selectedEpisode === episode.id ? '2px solid darkblue' : '2px solid transparent',
          }}
        >
          {episode.name}
        </li>
      ))}
    </ul>
  );
};

export default EpisodeList;
