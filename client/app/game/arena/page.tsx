"use client";

import { triggerBattlewithPlayer } from "@/actions/playerActions";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div>
      Arena
      <button
        onClick={() => {
          triggerBattlewithPlayer({ player: "Profanum", enemy: "Profa" });
          router.refresh();
        }}
      >
        TRIGGER
      </button>
    </div>
  );
};

export default page;
