"use client";
import { useEffect } from "react";
import {
  actionPointsNaturalRegeneration,
  healthPointsNaturalRegeneration,
  updateHealthPoints,
  updateActionPoints,
  updateStats,
  generateItem,
  adminGenerateNewBasisItem,
} from "@/actions/playerActions";
import { updateXpAndLevel } from "@/actions/playerActions";
import { useRouter } from "next/navigation";
const ActionPointsUpdate = () => {
  const router = useRouter();
  const intervalPerPoint = 60000;
  useEffect(() => {
    healthPointsNaturalRegeneration({ intervalPerPoint });
    actionPointsNaturalRegeneration({ intervalPerPoint });
  });
  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={async () => {
          const createdItem = await adminGenerateNewBasisItem({
            name: "Short Sword",
            category: { itemType: "sword", itemCategory: "weapon" },
            rarity: 4,
            origin: "Shop",
            itemLevel: 5,
            stats: { str: 1, dex: 4, int: 5, cha: 6, spd: 1, acc: 2, armor: 55, attack: { from: 7, to: 9 } },
            basisValue: 5,
            image: "https://opengameart.org/sites/default/files/axe2.png",
          });

          router.refresh();
        }}
      >
        ADMIN - Create new item
      </button>
      <button
        onClick={async () => {
          const generatedItem = await generateItem({ itemBasis: "Short Sword" });
          console.log(generatedItem);
          router.refresh();
        }}
      >
        Generate item
      </button>
      <button
        onClick={() => {
          updateStats({ statsToUpdate: "dex", pointsGain: -5 });
          router.refresh();
        }}
      >
        Lose 5 DEX
      </button>
      <button
        onClick={() => {
          updateStats({ statsToUpdate: "dex", pointsGain: 5 });
          router.refresh();
        }}
      >
        Gain 5 DEX
      </button>
      <button
        onClick={async () => {
          const res = await updateActionPoints({ valueToRecover: -7 });
          if (res?.msg) alert(res?.msg);
          router.refresh();
        }}
      >
        Lose 5 AP
      </button>
      <button
        onClick={() => {
          updateActionPoints({ valueToRecover: 5 });
          router.refresh();
        }}
      >
        Gain 5 AP
      </button>
      <button
        onClick={() => {
          updateHealthPoints({ valueToRecover: -5 });
          router.refresh();
        }}
      >
        Lose 5 HP
      </button>
      <button
        onClick={() => {
          updateHealthPoints({ valueToRecover: 5 });
          router.refresh();
        }}
      >
        Gain 5 HP
      </button>
      <button
        onClick={() => {
          updateXpAndLevel({ expirienceGain: 10 });
          router.refresh();
        }}
      >
        Gain 100 XP
      </button>
      <button
        onClick={() => {
          updateXpAndLevel({ expirienceGain: -10 });
          router.refresh();
        }}
      >
        Lose 100 XP
      </button>
    </div>
  );
};

export default ActionPointsUpdate;
