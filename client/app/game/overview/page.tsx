"use server";

import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";
import CharacterInfo from "@/components/character/CharacterInfo";
import Image from "next/image";
import NewCharacter from "@/components/character/NewCharacter";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import femaleImg from "@/public/characters/female.png";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";
import maleImg from "@/public/characters/male.png";

const Game = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id });

  return (
    <section className="flex">
      {characterData?.playerData ? (
        <div className="w-1/2 flex justify-center">
          <CharacterInfo possibleToBuyPoints={false} characterData={JSON.stringify(characterData)} />
        </div>
      ) : (
        <NewCharacter />
      )}
      {characterData?.playerData.sex === "Male" ? (
        <div className="w-[50%] bg-gradient-to-br from-orange-800 to-amber-300 flex justify-center">
          <Image
            src={maleImg}
            height={675}
            style={{ objectFit: "contain" }}
            className="object-right"
            alt="Character picture"
          />
        </div>
      ) : (
        <div className="w-[50%] bg-gradient-to-br from-orange-800 to-amber-300 flex justify-center">
          <Image
            src={femaleImg}
            height={675}
            style={{ objectFit: "contain" }}
            className="object-right"
            alt="Character picture"
          />
        </div>
      )}
    </section>
  );
};

export default Game;
