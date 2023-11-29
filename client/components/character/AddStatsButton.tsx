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
      className="py-2 flex flex-row justify-center items-center"
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
      <GiGoldBar className="inline text-amber-500 text-2xl" />
      <span>+ {skillCost * playerData[statName].amount}</span>{" "}
    </div>
  );
};

export default AddStatsButton;
