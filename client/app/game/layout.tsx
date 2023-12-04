import GameMenu from "@/components/global/GameMenu";
import { GiGoldBar } from "react-icons/gi";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

export default async function GameLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const characterData = (await fetchUserData({ id: session?.user?._id, playerName: session?.user?.player }))
    ?.playerData;

  console.log(characterData);
  return (
    <div className="pt-[74px] grid grid-cols-[288px_1fr] grid-rows-[56px_1fr] gap-4 p-5 max-w-[1920px] mx-auto">
      <div className="row-start-1 row-end-3 border border-white border-solid">
        <GameMenu />
      </div>
      <div className="col-start-2 col-end-3 flex">
        <div className="flex-1  border border-white border-solid">
          <p>
            HP: <span>{characterData.health.amount}</span>
          </p>
        </div>
        <div className="flex-1  border border-white border-solid">
          <p>
            AP: <span>{characterData.ap.amount}</span>
          </p>
        </div>
        <div className="flex-1  border border-white border-solid">
          <p>
            XP: <span>{characterData.xp}</span>
          </p>
        </div>
        <div className="flex-1  border border-white border-solid">
          <p>
            Gold:
            <span>
              <GiGoldBar className="inline text-amber-500 text-2xl mr-2" /> {characterData.gold}
            </span>
          </p>
        </div>
      </div>
      <div className="border border-white border-solid">{children}</div>
    </div>
  );
}
