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
  console.log("🚀 ~ file: page.tsx:14 ~ Game ~ characterData:", characterData);

  return (
    <section className="pt-14">
      {/* <ActionPointsUpdate /> */}
      {/* {characterData?.player ? <CharacterInfo /> : <NewCharacter />} */}
      {characterData?.playerData ? <h1>player exists</h1> : <NewCharacter />}
    </section>
  );
};

export default Game;
