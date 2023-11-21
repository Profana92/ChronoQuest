"use client";
import { useEffect } from "react";
import { updateActionPoints } from "@/actions/playerActions";
import { updateHealthPoints } from "@/actions/playerActions";
import { useRouter } from "next/navigation";
const ActionPointsUpdate = () => {
  const router = useRouter();
  const intervalPerPoint = 60000;
  useEffect(() => {
    updateHealthPoints({ intervalPerPoint });
    updateActionPoints({ intervalPerPoint });
  });
  return (
    <button
      onClick={() => {
        updateHealthPoints({ intervalPerPoint, valueToRecover: -5 });
        router.refresh();
      }}
    >
      Lose 5
    </button>
  );
};

export default ActionPointsUpdate;
