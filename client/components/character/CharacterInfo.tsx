import React from "react";
import { GiGoldBar, GiAxeSword, GiAbdominalArmor, GiHealthPotion, GiRank3 } from "react-icons/gi";
const CharacterInfo = ({ characterData }) => {
  return (
    <div className="flex flex-col w-96 p-6 border border-solid border-red-500 text-sm">
      <p className="block w-full text-center p-5 font-semibold font-oswald text-xl tracking-wide border border-solid border-red-500">
        {characterData.title}
      </p>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiHealthPotion className="inline text-amber-500 text-2xl mr-2" />
          <span> Health: {characterData.health.amount}</span>
        </p>
        <p>
          <span className="mr-2">Action Points: {characterData.ap.amount}</span>
          <GiAxeSword className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiGoldBar className="inline text-amber-500 text-2xl  mr-2" /> Gold: {characterData.gold}
        </p>
        <p>
          <span className="mr-2">Level: {characterData.level}</span>
          <GiRank3 className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>XP: {characterData.xp}</p>
      </div>
      <div className="flex flex-col">
        <div className="mb-1 text-base font-medium text-green-700 dark:text-green-500 border border-solid border-red-500">
          <p className="align-middle">
            <GiHealthPotion className="inline text-amber-500 text-2xl mr-2" />
            Health:
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
              style={{ width: `${characterData.health.amount + "%"}` }}
            ></div>{" "}
            <p>{characterData.health.amount + "%"}</p>
          </div>
        </div>

        <p>
          <GiAbdominalArmor className="inline text-amber-500 text-2xl" />
          Armor: {characterData.armor}
        </p>

        <p>Str: {characterData.str}</p>
        <p>Dex: {characterData.dex}</p>
        <p>int: {characterData.int}</p>
        <p>cha: {characterData.cha}</p>
        <p>spd: {characterData.spd}</p>
        <p>acc: {characterData.acc}</p>
      </div>
      <div></div>

      <p>Class: {characterData.class}</p>
      <p>Companion: {characterData.companion}</p>
    </div>
  );
};

export default CharacterInfo;
