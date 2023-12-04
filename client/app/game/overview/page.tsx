"use server";

import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";
import CharacterInfo from "@/components/character/CharacterInfo";
import Image from "next/image";
import NewCharacter from "@/components/character/NewCharacter";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

const Game = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player });

  return (
    <section className="flex">
      {characterData?.playerData ? <CharacterInfo characterData={JSON.stringify(characterData)} /> : <NewCharacter />}
      {/* {characterData?.playerData ? <Image src={} alt="Character picture" /> : ""} */}
    </section>
  );
};

export default Game;
