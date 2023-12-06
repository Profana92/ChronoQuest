import { GiAxeSword, GiGoldBar, GiHealthNormal, GiTargetArrows } from "react-icons/gi";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

export default async function StatusBar() {
  const session = await getServerSession(authOptions);
  const characterData = (await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player }))
    ?.playerData;

  return (
    <div className="col-start-2 col-end-3 flex flex-wrap">
      <div className="flex-1 basis-40 flex-shrink-0 p-4 border border-white border-solid flex flex-row justify-start items-center">
        <p>
          <GiHealthNormal className="inline text-amber-500 text-2xl mr-2" /> HP: {characterData.health.amount}
        </p>
      </div>
      <div className="flex-1 basis-40 flex-shrink-0 p-4 border border-white border-solid flex flex-row justify-start items-center">
        <p>
          <GiAxeSword className="inline text-amber-500 text-2xl mr-2" /> AP: {characterData.ap.amount}
        </p>
      </div>
      <div className="flex-1 flex-shrink-0 basis-40 p-4 border border-white border-solid flex flex-row justify-start items-center">
        <p>
          <GiTargetArrows className="inline text-amber-500 text-2xl mr-2" /> XP: {characterData.xp}
        </p>
      </div>
      <div className="flex-1 basis-40 flex-shrink-0 p-4 border border-white border-solid flex flex-row justify-start items-center">
        <p>
          <GiGoldBar className="inline text-amber-500 text-2xl mr-2" /> Gold: {characterData.gold}
        </p>
      </div>
    </div>
  );
}
