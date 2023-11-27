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
const CharacterInfo = ({ characterData }: { characterData: string }) => {
  const { playerData } = JSON.parse(characterData);
  return (
    <div className="flex flex-col w-96 p-6 border border-solid border-red-500 text-sm">
      <p className="block w-full text-center p-5 font-semibold font-oswald text-xl tracking-wide border border-solid border-red-500">
        {playerData.title}
      </p>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiHealthPotion className="inline text-amber-500 text-2xl mr-2" />
          <span>Health: {playerData.health.amount}</span>
        </p>
        <p>
          <span className="mr-2">Action Points: {playerData.ap.amount}</span>
          <GiAxeSword className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiGoldBar className="inline text-amber-500 text-2xl mr-2" />
          Gold: {playerData.gold}
        </p>
        <p>
          <span className="mr-2">Level: {playerData.level}</span>
          <GiRank3 className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-row justify-between border border-solid border-red-500">
        <p>
          <GiAbdominalArmor className="inline text-amber-500 text-2xl mr-2" />
          <span className="">Armor: {playerData.armor}</span>
        </p>
        <p>
          <span className="mr-2">XP: {playerData.xp}</span>
          <GiRank3 className="inline text-amber-500 text-2xl" />
        </p>
      </div>
      <div className="flex flex-col">
        <ProgressBar
          icon={<GiHealthPotion className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.health.amount}
          maxValue={playerData.health.maxAmount}
          textContent="Health:"
          type="percentage"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.str.amount}
          textContent="Strength:"
          maxValue={playerData.str.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiAssassinPocket className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.dex.amount}
          textContent="Dexterity:"
          maxValue={playerData.dex.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiBeamsAura className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.int.amount}
          textContent="Intelligence:"
          maxValue={playerData.int.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.cha.amount}
          textContent="Charisma:"
          maxValue={playerData.cha.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.spd.amount}
          textContent="Speed:"
          maxValue={playerData.spd.maxAmount}
          type="normal"
        />
        <ProgressBar
          icon={<GiArmorPunch className="inline text-amber-500 text-2xl mr-2" />}
          characterData={playerData.acc.amount}
          textContent="Accuracy:"
          maxValue={playerData.acc.maxAmount}
          type="normal"
        />
      </div>
      {playerData.companion.companionName !== "none" ? <p>Companion: {playerData.companion.companionName}</p> : ""}
    </div>
  );
};

export default CharacterInfo;
