import { GiAxeSword, GiGoldBar, GiHealthNormal, GiTargetArrows } from "react-icons/gi";

import GameMenu from "@/components/global/GameMenu";
import StatusBar from "@/components/global/StatusBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

export default async function GameLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const characterData = (await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player }))
    ?.playerData;

  return (
    <div className="pt-[74px] grid grid-cols-[288px_1fr] grid-rows-[auto_1fr] gap-4 p-5 max-w-[1920px] mx-auto">
      <div className="row-start-1 row-end-3 border border-white border-solid">
        <GameMenu />
      </div>
      <StatusBar />
      <div className="border border-white border-solid">{children}</div>
    </div>
  );
}
