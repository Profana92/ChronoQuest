"use client";

import {
  actionPointsNaturalRegeneration,
  addMessageToInbox,
  adminAddNewBasisItem,
  adminRemoveBasisItem,
  generateItem,
  healthPointsNaturalRegeneration,
  removeMessageFromInbox,
  triggerBattle,
  updateActionPoints,
  updateHealthPoints,
  updateStats,
} from "@/actions/playerActions";

import { updateXpAndLevel } from "@/actions/playerActions";
import { useRouter } from "next/navigation";

const ActionPointsUpdate = ({ playerData }: { playerData: string }) => {
  const player = JSON.parse(playerData).playerData.title;
  const activePlayerData = JSON.parse(playerData).playerData;
  const router = useRouter();

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col">
        <button
          onClick={async () => {
            await updateHealthPoints({ player, valueToRecover: -5 });
            router.refresh();
          }}
        >
          Lose 5 HP
        </button>
        <button
          onClick={async () => {
            await updateHealthPoints({ player, valueToRecover: 5 });
            router.refresh();
          }}
        >
          Gain 5 HP
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            await updateActionPoints({ player, valueToRecover: -5 });
            router.refresh();
          }}
        >
          Lose 5 AP
        </button>
        <button
          onClick={async () => {
            await updateActionPoints({ player, valueToRecover: 5 });
            router.refresh();
          }}
        >
          Gain 5 AP
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            await updateXpAndLevel({ player, expirienceGain: 10 });
            router.refresh();
          }}
        >
          Gain 10 XP
        </button>
        <button
          onClick={async () => {
            await updateXpAndLevel({ player, expirienceGain: -10 });
            router.refresh();
          }}
        >
          Lose 10 XP
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            await updateStats({ player, statsToUpdate: "dex", pointsGain: -5 });
            router.refresh();
          }}
        >
          Lose 5 DEX
        </button>
        <button
          onClick={async () => {
            await updateStats({ player, statsToUpdate: "dex", pointsGain: 5 });
            router.refresh();
          }}
        >
          Gain 5 DEX
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            await updateStats({ player, statsToUpdate: "str", pointsGain: -5 });
            router.refresh();
          }}
        >
          Lose 5 STR
        </button>
        <button
          onClick={async () => {
            await updateStats({ player, statsToUpdate: "str", pointsGain: 5 });
            router.refresh();
          }}
        >
          Gain 5 STR
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            const createdItem = await adminAddNewBasisItem({
              itemName: "Short Sword",
              category: { itemType: "sword", itemCategory: "weapon" },
              rarity: 0,
              origin: "Shop",
              itemLevel: 5,
              stats: { str: 1, dex: 4, int: 5, cha: 6, spd: 1, acc: 2, armor: 55, attack: { from: 7, to: 9 } },
              basisValue: 5,
              image: "https://opengameart.org/sites/default/files/axe2.png",
            });
            if (createdItem?.msg) alert(createdItem?.msg);
            router.refresh();
          }}
        >
          ADMIN - Create new item
        </button>
        <button
          onClick={async () => {
            const deletedItem = await adminRemoveBasisItem({ itemName: "Short Sword" });
            if (deletedItem?.msg) alert(deletedItem?.msg);
            router.refresh();
          }}
        >
          ADMIN - Removeitem
        </button>
      </div>
      <button
        onClick={async () => {
          const generatedItem = await generateItem({ itemBasis: "Short Sword", origin: "Admin" });
          console.log(generatedItem);
          router.refresh();
        }}
      >
        Generate item from &quot;Short Sword&quot; basis
      </button>

      <div className="flex flex-col">
        <button
          onClick={async () => {
            const addedMessage = await addMessageToInbox({
              message: "THIS WORKS",
              recipient: "Profanum",
              itemBasis: null,
              sender: "Profanum",
            });
            if (addedMessage?.msg) alert(addedMessage?.msg);
            router.refresh();
          }}
        >
          Add message to inbox
        </button>
        <button
          onClick={async () => {
            const addedMessage = await addMessageToInbox({
              message: "THIS WORKS",
              recipient: "Profanum",
              itemBasis: "Short Sword",
              sender: "Profanum",
            });
            if (addedMessage?.msg) alert(addedMessage?.msg);
            router.refresh();
          }}
        >
          Add message to inbox with attachment
        </button>
      </div>
      <div className="flex flex-col">
        <button
          onClick={async () => {
            const addedMessage = await triggerBattle({ player, enemy: "Fox Anomaly" });
            if (addedMessage?.msg) alert(addedMessage?.msg);
            router.refresh();
          }}
        >
          triggerBattle
        </button>
      </div>
      {activePlayerData?.inbox &&
        activePlayerData?.inbox.map((item, index) => {
          return (
            <p
              key={index}
              onClick={async () => {
                await removeMessageFromInbox({ characterName: player, idToDelete: item._id });
                router.refresh();
              }}
            >
              {item._id}
            </p>
          );
        })}
    </div>
  );
};

export default ActionPointsUpdate;
