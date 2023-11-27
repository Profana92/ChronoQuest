"use client";
import {
  actionPointsNaturalRegeneration,
  healthPointsNaturalRegeneration,
  updateHealthPoints,
  updateActionPoints,
  updateStats,
  generateItem,
  adminAddNewBasisItem,
  adminRemoveBasisItem,
  addMessageToInbox,
  removeMessageFromInbox,
} from "@/actions/playerActions";
import { updateXpAndLevel } from "@/actions/playerActions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useState } from "react";
import { useEffect } from "react";
import User from "@/models/userModel";
const ActionPointsUpdate = ({ player }: { player: string }) => {
  // const { data: session, status, update } = useSession();

  const router = useRouter();
  const intervalPerPoint = 60000;
  const [fetchedDataStates, setfetchedDataStates] = useState(null);
  useEffect(() => {
    healthPointsNaturalRegeneration({ player, intervalPerPoint });
    actionPointsNaturalRegeneration({ player, intervalPerPoint });
  });
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   let res = await fetch("/api/player");
  //   res = await res.json();
  //   console.log(res?.character?.inbox);
  //   setfetchedDataStates(res);
  // };
  // if (fetchedDataStates?.character?.inbox) console.log(true);
  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col">
        <button
          onClick={async () => {
            updateHealthPoints({ player, valueToRecover: -5 });
            router.refresh();
          }}
        >
          Lose 5 HP
        </button>
        <button
          onClick={async () => {
            updateHealthPoints({ player, valueToRecover: 5 });
            router.refresh();
          }}
        >
          Gain 5 HP
        </button>
      </div>{" "}
      <div className="flex flex-col">
        <button
          onClick={async () => {
            const res = await updateActionPoints({ valueToRecover: -7 });
            if (res?.msg) alert(res?.msg);
            router.refresh();
          }}
        >
          Lose 5 AP
        </button>
        <button
          onClick={async () => {
            updateActionPoints({ valueToRecover: 5 });
            router.refresh();
          }}
        >
          Gain 5 AP
        </button>
      </div>
      {/* {fetchedDataStates?.character?.inbox &&
        fetchedDataStates?.character?.inbox.map((item, index) => {
          return <h1 key={index}>{item._id}</h1>;
        })} */}
      {/* <button onClick={fetchData}>FETCH</button> */}
      {/* <button
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
      <button
        onClick={async () => {
          const generatedItem = await generateItem({ itemBasis: "Short Sword" });
          router.refresh();
        }}
      >
        Generate item
      </button>
      <button
        onClick={async () => {
          updateStats({ statsToUpdate: "dex", pointsGain: -5 });
          router.refresh();
        }}
      >
        Lose 5 DEX
      </button>
      <button
        onClick={async () => {
          updateStats({ statsToUpdate: "dex", pointsGain: 5 });
          router.refresh();
        }}
      >
        Gain 5 DEX
      </button>
     
     
      <button
        onClick={async () => {
          updateXpAndLevel({ expirienceGain: 10 });
          router.refresh();
        }}
      >
        Gain 100 XP
      </button>
      <button
        onClick={async () => {
          updateXpAndLevel({ expirienceGain: -10 });
          router.refresh();
        }}
      >
        Lose 100 XP
      </button> */}
    </div>
  );
};

export default ActionPointsUpdate;
