"use client";

import Image from "next/image";
import { equipItem } from "@/actions/playerActions";
import { itemType } from "@/types/itemType";
import { useRouter } from "next/navigation";

const ItemClient = ({ itemData, characterName }: { itemData: string; characterName: string }) => {
  const router = useRouter();
  const itemDataObj = JSON.parse(itemData) as itemType;
  if (itemData)
    return (
      <div className="w-24 h-24 relative group bg-Tetriary ">
        <Image
          src={itemDataObj?.image}
          alt={itemDataObj?.itemName}
          fill={true}
          className={`border border-solid ${
            itemDataObj?.rarity === 0
              ? "border-gray-400"
              : itemDataObj?.rarity === 1
              ? "border-green-400"
              : itemDataObj?.rarity === 2
              ? "border-blue-600"
              : itemDataObj?.rarity === 3
              ? "border-purple-600"
              : itemDataObj?.rarity === 4
              ? "border-orange-400"
              : ""
          }`}
        />

        <div
          className={`w-[200%] min-h-full left-full absolute p-5 bg-Tetriary hidden group-hover:flex border border-solid flex-col ${
            itemDataObj?.rarity === 0
              ? "border-gray-400"
              : itemDataObj?.rarity === 1
              ? "border-green-400"
              : itemDataObj?.rarity === 2
              ? "border-blue-600"
              : itemDataObj?.rarity === 3
              ? "border-purple-600"
              : itemDataObj?.rarity === 4
              ? "border-orange-400"
              : ""
          }`}
        >
          <p>{itemDataObj?.itemName}</p>
          <p
            className={`${
              itemDataObj?.rarity === 0
                ? "text-gray-400"
                : itemDataObj?.rarity === 1
                ? "text-green-400"
                : itemDataObj?.rarity === 2
                ? "text-blue-600"
                : itemDataObj?.rarity === 3
                ? "text-purple-600"
                : itemDataObj?.rarity === 4
                ? "text-orange-400"
                : ""
            }`}
          >
            {itemDataObj?.rarity === 0
              ? "Common"
              : itemDataObj?.rarity === 1
              ? "Uncommon"
              : itemDataObj?.rarity === 2
              ? "Rare"
              : itemDataObj?.rarity === 3
              ? "Epic"
              : "Legendary"}
          </p>
          <p>Slot: {itemDataObj?.slot}</p>
          <p>Item Level: {itemDataObj?.itemLevel}</p>
          <div className="">
            {itemDataObj?.stats?.attack ? (
              <p>
                Attack: {itemDataObj?.stats?.attack?.from}-{itemDataObj?.stats?.attack?.to}
              </p>
            ) : (
              ""
            )}
            {itemDataObj?.stats?.armor ? <p>Armor: {itemDataObj?.stats?.armor}</p> : ""}
            <p>Strength: {itemDataObj?.stats?.str}</p>
            <p>Dexterity: {itemDataObj?.stats?.dex}</p>
            <p>Intelligence: {itemDataObj?.stats?.int}</p>
            <p>Charisma: {itemDataObj?.stats?.cha}</p>
            <p>Speed: {itemDataObj?.stats?.spd}</p>
            <p>Accuracy: {itemDataObj?.stats?.acc}</p>
            <p>Value: {itemDataObj?.basisValue} Gold</p>
            <button
              className="border border-solid border-red-600 p-2 block mx-auto m-2"
              onClick={() => {
                equipItem({ characterName, itemToEquip: itemDataObj });
                router.refresh();
              }}
            >
              Equip
            </button>
          </div>
        </div>
      </div>
    );
  return <div className="w-24 h-24 relative group bg-Tetriary border border-solid border-white"></div>;
};

export default ItemClient;
