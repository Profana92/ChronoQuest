"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
import NewCharacter from "@/components/character/NewCharacter";
import CharacterInfo from "@/components/character/CharacterInfo";
import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";

const Game = async () => {
  const session = await getServerSession(authOptions);

  const characterExists = async () => {
    const characterData = await User.findOne({ _id: session?.user?._id });
    if (characterData?.character?.title) {
      return characterData.character;
    } else return null;
  };
  const characterData = await characterExists();
  // const actionPoints = await updateActionPoints();

  return (
    <section className="pt-14">
      <ActionPointsUpdate />
      {characterData?.title ? <CharacterInfo characterData={characterData} /> : <NewCharacter />}
    </section>
  );
};

export default Game;
