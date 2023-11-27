"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/userModel";
import Player from "@/models/playerModel";
import { getServerSession } from "next-auth/next";
import NewCharacter from "@/components/character/NewCharacter";
import CharacterInfo from "@/components/character/CharacterInfo";
import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";
import { fetchUserData } from "@/actions/playerActions";
const Game = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player });

  return (
    <section className="pt-14">
      {characterData?.playerData ? <ActionPointsUpdate player={session?.user?.player} /> : ""}
      {/* {characterData?.player ? <CharacterInfo /> : <NewCharacter />} */}
      {characterData?.playerData ? <CharacterInfo characterData={JSON.stringify(characterData)} /> : <NewCharacter />}
    </section>
  );
};

export default Game;
