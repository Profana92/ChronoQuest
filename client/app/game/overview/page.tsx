import { actionPointsNaturalRegeneration, healthPointsNaturalRegeneration } from "@/actions/playerActions";

import ActionPointsUpdate from "@/components/character/ActionPointsUpdate";
import CharacterInfo from "@/components/character/CharacterInfo";
import Image from "next/image";
import NewCharacter from "@/components/character/NewCharacter";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import femaleImg from "@/public/characters/female.png";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";
import maleImg from "@/public/characters/male.png";

export const revalidate = 0;
const page = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id });
  const player = characterData?.playerData?.title;
  const intervalPerPoint = 60000;
  if (characterData?.playerData) {
    healthPointsNaturalRegeneration({ player, intervalPerPoint });
    actionPointsNaturalRegeneration({ player, intervalPerPoint });
  }

  return (
    <section className="flex h-full">
      {characterData?.playerData ? (
        <div className="w-1/2 flex justify-center items-center">
          <CharacterInfo possibleToBuyPoints={false} characterData={JSON.stringify(characterData)} />
        </div>
      ) : (
        <NewCharacter />
      )}
      {characterData?.playerData.sex === "Male" ? (
        <div className="w-[50%] h-full bg-gradient-to-br from-orange-800 to-amber-300 flex justify-center">
          <Image
            src={maleImg}
            height={675}
            style={{ objectFit: "contain" }}
            className="object-bottom"
            alt="Character picture"
          />
        </div>
      ) : (
        <div className="w-[50%] h-full bg-gradient-to-br from-orange-800 to-amber-300 flex justify-center">
          <Image
            src={femaleImg}
            height={575}
            style={{ objectFit: "contain" }}
            className="object-bottom"
            alt="Character picture"
          />
        </div>
      )}
    </section>
  );
};

export default page;
