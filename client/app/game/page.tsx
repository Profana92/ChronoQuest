"use server";

import { actionPointsNaturalRegeneration, healthPointsNaturalRegeneration } from "@/actions/playerActions";

import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";
import CharacterInfo from "@/components/character/CharacterInfo";
import NewCharacter from "@/components/character/NewCharacter";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

const Game = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player });
  const player = characterData?.playerData?.title;
  const intervalPerPoint = 60000;
  healthPointsNaturalRegeneration({ player, intervalPerPoint });
  actionPointsNaturalRegeneration({ player, intervalPerPoint });
  return (
    <section>
      {characterData?.playerData ? <ActionPointsUpdate playerData={JSON.stringify(characterData)} /> : ""}
    </section>
  );
};

export default Game;
