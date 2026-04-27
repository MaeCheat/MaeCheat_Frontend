export interface MapleCharacterRequest {
  nickname: string;
}

export interface MapleCharacterResponse {
  character_name: string;
  character_image: string;
  character_level: number;
  character_class: string;
  world_name: string;
  character_guild_name?: string;
  ai_summary?: string;
}
