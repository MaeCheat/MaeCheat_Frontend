import type { MapleCharacterResponse } from "../../types/maple-character";

interface CharacterCardProps {
  character: MapleCharacterResponse;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="bg-bg-primary rounded-2xl border border-border/50 shadow-sm p-6 flex items-center gap-5">
      <div className="w-24 h-24 rounded-xl bg-bg-tertiary flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={character.character_image}
          alt={character.character_name}
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <p className="text-xl font-bold text-text-primary">
          {character.character_name}
        </p>
        <p className="text-sm text-text-secondary mt-1">
          Lv.{character.character_level} {character.character_class}
        </p>
        <div className="mt-2 flex items-center gap-2">
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
    </div>
  );
};

export default CharacterCard;
