import { GiArmorPunch, GiAssassinPocket, GiBeamsAura, GiBullseye, GiTalk, GiWingfoot } from "react-icons/gi";

import AddStatsButton from "./AddStatsButton";
import ProgressBar from "./ProgressBar";

const CharacterGeneticsUpgrade = ({
  characterData,
  possibleToBuyPoints,
}: {
  characterData: string;
  possibleToBuyPoints: boolean;
}) => {
  const { playerData } = JSON.parse(characterData);
  return (
    <div className="flex flex-col w-96 p-6 text-sm">
      <div className="flex flex-row">
        <div className="flex flex-col flex-1">
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
            icon={<GiTalk className="inline text-amber-500 text-2xl mr-2" />}
            characterData={playerData.cha.amount}
            textContent="Charisma:"
            maxValue={playerData.cha.maxAmount}
            type="normal"
          />

          <ProgressBar
            icon={<GiWingfoot className="inline text-amber-500 text-2xl mr-2" />}
            characterData={playerData.spd.amount}
            textContent="Speed:"
            maxValue={playerData.spd.maxAmount}
            type="normal"
          />

          <ProgressBar
            icon={<GiBullseye className="inline text-amber-500 text-2xl mr-2" />}
            characterData={playerData.acc.amount}
            textContent="Accuracy:"
            maxValue={playerData.acc.maxAmount}
            type="normal"
          />
        </div>
        <div className={`${possibleToBuyPoints === true ? "block" : "hidden"}`}>
          <AddStatsButton
            characterData={characterData}
            player={playerData.title}
            skillCost={5}
            statName="str"
            value={1}
          />
          <AddStatsButton
            characterData={characterData}
            player={playerData.title}
            skillCost={5}
            statName="dex"
            value={1}
          />
          <AddStatsButton
            characterData={characterData}
            player={playerData.title}
            skillCost={5}
            statName="int"
            value={1}
          />
          <AddStatsButton
            characterData={characterData}
            player={playerData.title}
            skillCost={5}
            statName="cha"
            value={1}
          />
          <AddStatsButton
            characterData={characterData}
            player={playerData.title}
            skillCost={5}
            statName="spd"
            value={1}
          />
          <AddStatsButton
            characterData={characterData}
            player={playerData.title}
            skillCost={5}
            statName="acc"
            value={1}
          />
        </div>
      </div>
      {playerData.companion.companionName !== "none" ? <p>Companion: {playerData.companion.companionName}</p> : ""}
    </div>
  );
};

export default CharacterGeneticsUpgrade;
