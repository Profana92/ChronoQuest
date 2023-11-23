"use client";
import { useEffect } from "react";
import {
  actionPointsNaturalRegeneration,
  healthPointsNaturalRegeneration,
  updateHealthPoints,
  updateActionPoints,
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
        onClick={() => {
          updateActionPoints({ valueToRecover: -5 });
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
