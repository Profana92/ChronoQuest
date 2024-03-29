import { actionPointsNaturalRegeneration, healthPointsNaturalRegeneration } from "@/actions/playerActions";

import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";
import CharacterInfo from "@/components/character/CharacterInfo";
import NewCharacter from "@/components/character/NewCharacter";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

export const revalidate = 0;
const Game = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id });
  const player = characterData?.playerData?.title;
  const intervalPerPoint = 60000;
  if (characterData?.playerData) {
    healthPointsNaturalRegeneration({ player, intervalPerPoint });
    actionPointsNaturalRegeneration({ player, intervalPerPoint });
  }
  return (
    <section>
      {characterData?.playerData ? <ActionPointsUpdate playerData={JSON.stringify(characterData)} /> : ""}
    </section>
  );
};

export default Game;
