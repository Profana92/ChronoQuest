import React from "react";
import {
  GiGoldBar,
  GiAxeSword,
  GiAbdominalArmor,
  GiHealthPotion,
  GiRank3,
  GiArmorPunch,
  GiAssassinPocket,
  GiBeamsAura,
} from "react-icons/gi";
import ProgressBar from "./ProgressBar";
const CharacterInfo = ({ characterData }) => {
  return (
    <div className="flex flex-col w-96 p-6 border border-solid border-red-500 text-sm">
      <p className="block w-full text-center p-5 font-semibold font-oswald text-xl tracking-wide border border-solid border-red-500">
        {characterData.title}
      </p>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiHealthPotion className="inline text-amber-500 text-2xl mr-2" />
          <span>Health: {characterData.health.amount}</span>
        </p>
        <p>
          <span className="mr-2">Action Points: {characterData.ap.amount}</span>
          <GiAxeSword className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiGoldBar className="inline text-amber-500 text-2xl mr-2" />
          Gold: {characterData.gold}
        </p>
        <p>
          <span className="mr-2">Level: {characterData.level}</span>
          <GiRank3 className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiAbdominalArmor className="inline text-amber-500 text-2xl mr-2" />
          <span className="">Armor: {characterData.armor}</span>
        </p>
        <p>
          <span className="mr-2">XP: {characterData.xp}</span>
          <GiRank3 className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-col">
        <ProgressBar
          icon={<GiHealthPotion className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.health.amount}
          maxValue={characterData.health.maxAmount}
          textContent="Health:"
          type="percentage"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.str.amount}
          textContent="Strength:"
          maxValue={characterData.str.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiAssassinPocket className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.dex.amount}
          textContent="Dexterity:"
          maxValue={characterData.dex.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiBeamsAura className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.int.amount}
          textContent="Intelligence:"
          maxValue={characterData.int.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.cha.amount}
          textContent="Charisma:"
          maxValue={characterData.cha.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.spd.amount}
          textContent="Speed:"
          maxValue={characterData.spd.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={characterData.acc.amount}
          textContent="Accuracy:"
          maxValue={characterData.acc.maxAmount}
          type="normal"
        />
      </div>
      {characterData.companion.companionName !== "none" ? (
        <p>Companion: {characterData.companion.companionName}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default CharacterInfo;
