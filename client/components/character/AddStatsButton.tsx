"use client";

import { GiGoldBar } from "react-icons/gi";
import { buySkill } from "@/actions/playerActions";
import { useRouter } from "next/navigation";

const AddStatsButton = ({
  characterData,
  player,
  skillCost,
  statName,
  value,
}: {
  characterData: string;
  player: string;
  skillCost: number;
  statName: string;
  value: number;
}) => {
  const router = useRouter();
  const { playerData } = JSON.parse(characterData);
  return (
    <div
      role="button"
      className="py-[14px] w-full h-[70px] flex flex-row justify-center items-end mx-1"
      onClick={async () => {
        await buySkill({
          player: player,
          skillCost: skillCost,
          statsToUpdate: statName,
          pointsGain: value,
        });
        router.refresh();
      }}
    >
      <span>+ {skillCost * playerData[statName].basisValue}</span>
      <GiGoldBar className="inline text-amber-500 text-2xl" />
    </div>
  );
};

export default AddStatsButton;
