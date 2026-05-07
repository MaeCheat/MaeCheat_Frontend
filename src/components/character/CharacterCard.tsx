import { useState } from "react";
import type { MapleCharacterResponse } from "../../types/maple-character";

interface CharacterCardProps {
  character: MapleCharacterResponse;
  onRequestHide: (reason: string) => void;
  isHideRequesting: boolean;
}

const CharacterCard = ({ character, onRequestHide, isHideRequesting }: CharacterCardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [reason, setReason] = useState("");

  const handleHideRequest = () => {
    if (!reason.trim()) return;
    onRequestHide(reason.trim());
    setShowConfirm(false);
    setReason("");
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col items-center text-center">
      <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-2xl bg-white/[0.06] border border-white/[0.15]">
        <img
          src={character.character_image}
          alt={character.character_name}
          className="scale-250 opacity-95"
        />
      </div>
      <p className="text-lg font-bold text-white mt-2">
        {character.character_name}
      </p>
      <p className="text-sm text-white/60 mt-0.5">
        Lv.{character.character_level} {character.character_class}
      </p>
      <div className="mt-3 flex items-center gap-2 flex-wrap justify-center">
        <span className="px-2.5 py-1 rounded-full bg-secondary/20 text-secondary-light text-xs font-medium">
          {character.world_name}
        </span>
        {character.character_guild_name && (
          <span className="px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium">
            {character.character_guild_name}
          </span>
        )}
      </div>

      {!character.owner_hidden && (
        <div className="mt-3 pt-3 border-t border-white/[0.08] w-full">
          {character.hide_pending ? (
            <p className="text-white/30 text-[11px]">숨김 요청 처리 대기 중</p>
          ) : !showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-white/25 text-[11px] hover:text-white/40 transition-colors cursor-pointer"
            >
              본인 캐릭터 숨김 요청
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="요청 사유를 입력해주세요"
                className="w-full px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-xs text-white placeholder-white/30 outline-none focus:border-white/25"
              />
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleHideRequest}
                  disabled={isHideRequesting || !reason.trim()}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isHideRequesting ? "처리 중..." : "숨김 요청"}
                </button>
                <button
                  onClick={() => { setShowConfirm(false); setReason(""); }}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white/60 transition-colors cursor-pointer"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterCard;
