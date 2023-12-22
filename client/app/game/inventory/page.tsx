import { actionPointsNaturalRegeneration, healthPointsNaturalRegeneration } from "@/actions/playerActions";

import EquippedItemClient from "@/components/global/EquippedItemClient";
import Item from "@/components/global/Item";
import ItemClient from "@/components/global/ItemClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchUserData } from "@/actions/playerActions";
import { getServerSession } from "next-auth/next";

export const revalidate = 0;
const page = async () => {
  const session = await getServerSession(authOptions);
  const characterData = (await fetchUserData({ id: session?.user?._id }))?.playerData;

  const player = characterData?.title;
  const intervalPerPoint = 60000;
  if (player) {
    healthPointsNaturalRegeneration({ player, intervalPerPoint });
    actionPointsNaturalRegeneration({ player, intervalPerPoint });
  }

  const ItemList = characterData?.inventory.map((item) => (
    <ItemClient itemData={JSON.stringify(item)} key={item?._id} characterName={characterData.title} />
  ));

  return (
    <div className="flex h-full">
      <div className="w-1/2 h-full">
        <div className="max-w-[328px] mx-auto h-full flex flex-col justify-center">
          <p className="text-center py-5">Equipment:</p>
          <div className="w-[328px] grid grid-cols-3 gap-5">
            <div className="col-start-2 col-end-3">
              {characterData?.equipedItems?.head ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.head)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.head} />
              )}
            </div>
            <div className="col-start-3 col-end-4">
              {characterData?.equipedItems?.necklace ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.necklace)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.necklace} />
              )}
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-3">
              {characterData?.equipedItems?.rightArm ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.rightArm)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.rightArm} />
              )}
            </div>
            <div className="col-start-2 col-end-3 row-start-2 row-end-3">
              {characterData?.equipedItems?.chest ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.chest)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.chest} />
              )}
            </div>
            <div className="col-start-3 col-end-4 row-start-2 row-end-3">
              {characterData?.equipedItems?.leftArm ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.leftArm)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.leftArm} />
              )}
            </div>

            <div className="col-start-1 col-end-2 row-start-3 row-end-4">
              {characterData?.equipedItems?.belt ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.belt)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.belt} />
              )}
            </div>
            <div className="col-start-2 col-end-3 row-start-3 row-end-4">
              {characterData?.equipedItems?.legs ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.legs)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.legs} />
              )}
            </div>
            <div className="col-start-2 col-end-3 row-start-4 row-end-5">
              {characterData?.equipedItems?.feet ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.feet)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.feet} />
              )}
            </div>
            <div className="col-start-3 col-end-4 row-start-4 row-end-5">
              {characterData?.equipedItems?.ring ? (
                <EquippedItemClient
                  itemData={JSON.stringify(characterData?.equipedItems.ring)}
                  characterName={characterData.title}
                />
              ) : (
                <Item itemData={characterData?.equipedItems.ring} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 border border-solid border-white flex">
        <div className="flex gap-5 flex-wrap justify-center items-center self-center"> {ItemList}</div>
      </div>
    </div>
  );
};

export default page;
