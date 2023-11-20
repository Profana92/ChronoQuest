"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
import NewCharacter from "@/components/character/NewCharacter";
import CharacterInfo from "@/components/character/CharacterInfo";

const ProtectedServerPage = async () => {
  const session = await getServerSession(authOptions);
  const characterExists = async () => {
    const characterData = await User.findOne({ _id: session.user._id });
    if (characterData.character.title) {
      return characterData.character;
    } else return null;
  };

  const characterData = await characterExists();

  return (
    <section className="pt-14">
      {characterData?.title ? <CharacterInfo characterData={characterData} /> : <NewCharacter />}
    </section>
  );
};

export default ProtectedServerPage;
