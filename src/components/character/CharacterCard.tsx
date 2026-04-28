import type { MapleCharacterResponse } from "../../types/maple-character";

interface CharacterCardProps {
  character: MapleCharacterResponse;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="bg-bg-primary rounded-2xl border-2 border-secondary p-5 flex flex-col items-center text-center">
      <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
        <img
          src={character.character_image}
          alt={character.character_name}
          className="scale-250"
        />
      </div>
      <p className="text-lg font-bold text-text-primary mt-2">
        {character.character_name}
      </p>
      <p className="text-sm text-text-secondary mt-0.5">
        Lv.{character.character_level} {character.character_class}
      </p>
      <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
        <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
          {character.world_name}
        </span>
        {character.character_guild_name && (
          <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
            {character.character_guild_name}
          </span>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
