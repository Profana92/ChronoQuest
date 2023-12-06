import CharacterGeneticsUpgrade from "@/components/character/CharacterGeneticsUpgrade";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import geneticsLab from "@/public/vendors/geneticslab.jpg";
import { getServerSession } from "next-auth/next";

const page = async () => {
  const session = await getServerSession(authOptions);
  const characterData = await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player });

  return (
    <section className="flex h-full justify-center">
      <div className="w-1/2 grid items-center justify-items-center min-w-[384px]">
        {characterData?.playerData ? (
          <CharacterGeneticsUpgrade possibleToBuyPoints={true} characterData={JSON.stringify(characterData)} />
        ) : (
          ""
        )}
      </div>
      <div className="w-1/2 relative border border-solid border-white">
        <Image
          src={geneticsLab}
          alt="Genetics Laboratory"
          fill={true}
          objectFit="cover"
          priority
          objectPosition="35%"
        />
      </div>
    </section>
  );
};

export default page;
